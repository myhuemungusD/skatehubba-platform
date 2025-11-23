import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useWallet = (uid: string) => useQuery({
  queryKey: ['wallet', uid],
  queryFn: async () => {
    if (!uid) return 0;
    const snap = await getDoc(doc(db, 'wallets', uid));
    return snap.data()?.hubbaBucks ?? 0;
  },
  enabled: !!uid,
});
