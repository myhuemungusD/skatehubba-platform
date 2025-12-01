// infra/firebase/functions/src/inventory.ts

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { z } from "zod";

// Initialize Firestore
const db = admin.firestore();

// Schema for trade acceptance
const AcceptTradeSchema = z.object({
  tradeId: z.string(),
});

// Schema for trade initiation
const InitiateTradeSchema = z.object({
  itemId: z.string(),
  recipientHandle: z.string(),
});

interface TradeRequest {
  id: string;
  fromUid: string;
  toUid: string;
  itemId: string;
  itemName: string;
  itemCategory: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  imageUrl: string;
  equipped: boolean;
}

interface UserInventory {
  items: InventoryItem[];
  equipped: Record<string, string>;
}

/**
 * Initiate a trade request with another user
 * Creates a pending trade document that the recipient can accept or reject
 */
export const initiateTrade = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Must be logged in to initiate a trade."
    );
  }

  const { itemId, recipientHandle } = InitiateTradeSchema.parse(request.data);
  const senderUid = request.auth.uid;

  return db.runTransaction(async (transaction) => {
    // 1. Find recipient by handle
    const usersQuery = await db
      .collection("users")
      .where("username", "==", recipientHandle)
      .limit(1)
      .get();

    if (usersQuery.empty) {
      throw new functions.https.HttpsError(
        "not-found",
        "User not found with that handle."
      );
    }

    const recipientDoc = usersQuery.docs[0];
    const recipientUid = recipientDoc.id;

    if (recipientUid === senderUid) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Cannot trade with yourself."
      );
    }

    // 2. Verify sender owns the item
    const senderInventoryRef = db.doc(`inventories/${senderUid}`);
    const senderInventorySnap = await transaction.get(senderInventoryRef);

    if (!senderInventorySnap.exists) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "You have no inventory."
      );
    }

    const senderInventory = senderInventorySnap.data() as UserInventory;
    const itemToTrade = senderInventory.items.find((item) => item.id === itemId);

    if (!itemToTrade) {
      throw new functions.https.HttpsError(
        "not-found",
        "Item not found in your inventory."
      );
    }

    // 3. Check if item is currently equipped (can't trade equipped items)
    const equippedCategory = senderInventory.equipped[itemToTrade.category];
    if (equippedCategory === itemId) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Cannot trade an equipped item. Unequip it first."
      );
    }

    // 4. Create trade request
    const tradeRef = db.collection("trades").doc();
    const tradeData: TradeRequest = {
      id: tradeRef.id,
      fromUid: senderUid,
      toUid: recipientUid,
      itemId: itemId,
      itemName: itemToTrade.name,
      itemCategory: itemToTrade.category,
      status: "pending",
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    };

    transaction.set(tradeRef, tradeData);

    return { success: true, tradeId: tradeRef.id };
  });
});

/**
 * Accept a pending trade request
 * Performs atomic swap of the item between users
 */
export const acceptTrade = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Must be logged in to accept a trade."
    );
  }

  const { tradeId } = AcceptTradeSchema.parse(request.data);
  const acceptorUid = request.auth.uid;

  return db.runTransaction(async (transaction) => {
    // 1. Get the trade request
    const tradeRef = db.doc(`trades/${tradeId}`);
    const tradeSnap = await transaction.get(tradeRef);

    if (!tradeSnap.exists) {
      throw new functions.https.HttpsError("not-found", "Trade not found.");
    }

    const trade = tradeSnap.data() as TradeRequest;

    // 2. Validate trade recipient
    if (trade.toUid !== acceptorUid) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "This trade is not for you."
      );
    }

    // 3. Validate trade is still pending
    if (trade.status !== "pending") {
      throw new functions.https.HttpsError(
        "failed-precondition",
        `Trade is already ${trade.status}.`
      );
    }

    // 4. Get both inventories
    const senderInventoryRef = db.doc(`inventories/${trade.fromUid}`);
    const recipientInventoryRef = db.doc(`inventories/${trade.toUid}`);

    const [senderInventorySnap, recipientInventorySnap] = await Promise.all([
      transaction.get(senderInventoryRef),
      transaction.get(recipientInventoryRef),
    ]);

    if (!senderInventorySnap.exists) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Sender no longer has an inventory."
      );
    }

    const senderInventory = senderInventorySnap.data() as UserInventory;
    const recipientInventory = recipientInventorySnap.exists
      ? (recipientInventorySnap.data() as UserInventory)
      : { items: [], equipped: {} };

    // 5. Find and validate the item still exists in sender's inventory
    const itemIndex = senderInventory.items.findIndex(
      (item) => item.id === trade.itemId
    );

    if (itemIndex === -1) {
      // Mark trade as cancelled since item no longer exists
      transaction.update(tradeRef, {
        status: "cancelled",
        updatedAt: admin.firestore.Timestamp.now(),
      });
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Item is no longer available for trade."
      );
    }

    const tradedItem = senderInventory.items[itemIndex];

    // 6. Check item is not equipped
    if (senderInventory.equipped[tradedItem.category] === tradedItem.id) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Sender has equipped this item and cannot trade it."
      );
    }

    // 7. Perform the atomic swap
    // Remove item from sender
    const updatedSenderItems = [...senderInventory.items];
    updatedSenderItems.splice(itemIndex, 1);

    // Add item to recipient
    const updatedRecipientItems = [...recipientInventory.items, tradedItem];

    // 8. Update both inventories
    transaction.update(senderInventoryRef, {
      items: updatedSenderItems,
      updatedAt: admin.firestore.Timestamp.now(),
    });

    if (recipientInventorySnap.exists) {
      transaction.update(recipientInventoryRef, {
        items: updatedRecipientItems,
        updatedAt: admin.firestore.Timestamp.now(),
      });
    } else {
      transaction.set(recipientInventoryRef, {
        items: updatedRecipientItems,
        equipped: {},
        createdAt: admin.firestore.Timestamp.now(),
        updatedAt: admin.firestore.Timestamp.now(),
      });
    }

    // 9. Update trade status
    transaction.update(tradeRef, {
      status: "accepted",
      updatedAt: admin.firestore.Timestamp.now(),
    });

    // 10. Create activity records for both users
    const activityBatch = [
      {
        ref: db.collection("activity").doc(),
        data: {
          uid: trade.fromUid,
          type: "trade_completed",
          message: `Your ${tradedItem.name} was traded successfully`,
          tradeId: tradeId,
          createdAt: admin.firestore.Timestamp.now(),
        },
      },
      {
        ref: db.collection("activity").doc(),
        data: {
          uid: trade.toUid,
          type: "trade_received",
          message: `You received ${tradedItem.name} from a trade`,
          tradeId: tradeId,
          createdAt: admin.firestore.Timestamp.now(),
        },
      },
    ];

    for (const activity of activityBatch) {
      transaction.set(activity.ref, activity.data);
    }

    return { success: true, itemReceived: tradedItem.name };
  });
});

/**
 * Reject a pending trade request
 */
export const rejectTrade = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Must be logged in to reject a trade."
    );
  }

  const { tradeId } = AcceptTradeSchema.parse(request.data);
  const rejecterUid = request.auth.uid;

  const tradeRef = db.doc(`trades/${tradeId}`);
  const tradeSnap = await tradeRef.get();

  if (!tradeSnap.exists) {
    throw new functions.https.HttpsError("not-found", "Trade not found.");
  }

  const trade = tradeSnap.data() as TradeRequest;

  if (trade.toUid !== rejecterUid) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "This trade is not for you."
    );
  }

  if (trade.status !== "pending") {
    throw new functions.https.HttpsError(
      "failed-precondition",
      `Trade is already ${trade.status}.`
    );
  }

  await tradeRef.update({
    status: "rejected",
    updatedAt: admin.firestore.Timestamp.now(),
  });

  return { success: true };
});

/**
 * Cancel a trade request (by the initiator)
 */
export const cancelTrade = functions.https.onCall(async (request) => {
  if (!request.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Must be logged in to cancel a trade."
    );
  }

  const { tradeId } = AcceptTradeSchema.parse(request.data);
  const cancellerUid = request.auth.uid;

  const tradeRef = db.doc(`trades/${tradeId}`);
  const tradeSnap = await tradeRef.get();

  if (!tradeSnap.exists) {
    throw new functions.https.HttpsError("not-found", "Trade not found.");
  }

  const trade = tradeSnap.data() as TradeRequest;

  if (trade.fromUid !== cancellerUid) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only the trade initiator can cancel it."
    );
  }

  if (trade.status !== "pending") {
    throw new functions.https.HttpsError(
      "failed-precondition",
      `Trade is already ${trade.status}.`
    );
  }

  await tradeRef.update({
    status: "cancelled",
    updatedAt: admin.firestore.Timestamp.now(),
  });

  return { success: true };
});
