// infra/firebase/functions/src/inventory.ts
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import {
  getFirestore,
  FieldValue,
} from 'firebase-admin/firestore';

const db = getFirestore();

interface TradePayload {
  fromUid: string;
  toUid: string;
  fromItem: {
    id: string;
    [key: string]: any;
  };
  toItem: {
    id: string;
    [key: string]: any;
  };
  status: 'pending' | 'accepted' | 'rejected' | string;
}

export const acceptTrade = onDocumentUpdated('trades/{tradeId}', async (event) => {
  const after = event.data?.after?.data() as TradePayload | undefined;
  if (!after || after.status !== 'accepted') return;

  const trade = after;

  const fromRef = db.collection('users').doc(trade.fromUid);
  const toRef = db.collection('users').doc(trade.toUid);

  await db.runTransaction(async (tx) => {
    const [fromSnap, toSnap] = await Promise.all([
      tx.get(fromRef),
      tx.get(toRef),
    ]);

    if (!fromSnap.exists || !toSnap.exists) {
      return;
    }

    const fromData = fromSnap.data() || {};
    const toData = toSnap.data() || {};

    const fromItems = Array.isArray(fromData.items)
      ? fromData.items
      : [];
    const toItems = Array.isArray(toData.items)
      ? toData.items
      : [];

    // defensive: ensure each side actually owns the item it’s trading
    const fromOwnsFromItem = fromItems.some(
      (i: any) => i.id === trade.fromItem.id,
    );
    const toOwnsToItem = toItems.some(
      (i: any) => i.id === trade.toItem.id,
    );
    if (!fromOwnsFromItem || !toOwnsToItem) return;

    // swap arrays
    const newFromItems = [
      ...fromItems.filter(
        (i: any) =>
          i.id !== trade.fromItem.id && i.id !== trade.toItem.id,
      ),
      trade.toItem,
    ];

    const newToItems = [
      ...toItems.filter(
        (i: any) =>
          i.id !== trade.fromItem.id && i.id !== trade.toItem.id,
      ),
      trade.fromItem,
    ];

    tx.update(fromRef, { items: newFromItems });
    tx.update(toRef, { items: newToItems });
  });
});
