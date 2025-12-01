// infra/firebase/functions/src/tradeEngine.ts

import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { db } from './index';

export const acceptTrade = onDocumentUpdated('trades/{tradeId}', async (event) => {
  const after = event.data?.after.data();
  if (!after || after.status !== 'accepted') return;

  const tradeId = event.params.tradeId;
  const { fromUid, toUid, fromItem, toItem } = after;

  try {
    await runTransaction(db, async (transaction) => {
      const fromRef = doc(db, 'users', fromUid);
      const toRef = doc(db, 'users', toUid);

      const [fromSnap, toSnap] = await Promise.all([
        transaction.get(fromRef),
        transaction.get(toRef),
      ]);

      if (!fromSnap.exists() || !toSnap.exists()) {
        throw new Error('One or both users not found');
      }

      const fromItems: string[] = fromSnap.data()?.items || [];
      const toItems: string[] = toSnap.data()?.items || [];

      // Safety: ensure both users actually own the items they're trading
      if (!fromItems.includes(fromItem) || !toItems.includes(toItem)) {
        throw new Error('Trade validation failed: item not owned item missing');
      }

      // Atomic swap
      transaction.update(fromRef, {
        items: [
          ...fromItems.filter((id: string) => id !== fromItem),
          toItem,
        ],
      });

      transaction.update(toRef, {
        items: [
          ...toItems.filter((id: string) => id !== toItem),
          fromItem,
        ],
      });
    });

    console.log(`Trade ${tradeId} completed: ${fromUid} ↔ ${toUid}`);
  } catch (error) {
    console.error('Trade failed:', error);
    // Optional: mark trade as failed
    await updateDoc(doc(db, 'trades', tradeId), {
      status: 'failed',
      error: (error as Error).message,
    });
  }
});
