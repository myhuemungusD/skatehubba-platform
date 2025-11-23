import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Define Challenge type locally if not available in shared types yet, or import it
// import type { Challenge } from '../../types'; 
export interface Challenge {
  id: string;
  createdBy: string;
  clipA?: string;
  clipB?: string;
  rules?: any;
}

export const useChallenge = (id: string) => useQuery<Challenge>({
  queryKey: ['challenge', id],
  queryFn: async () => {
    const snap = await getDoc(doc(db, 'challenges', id));
    return snap.data() as Challenge;
  },
  enabled: !!id,
});

export const useCreateChallenge = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Challenge>) => {
      const id = crypto.randomUUID();
      await setDoc(doc(db, 'challenges', id), { ...data, id });
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['challenges'] }),
  });
};

export const useReplyChallenge = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, clipB }: { id: string; clipB: string }) => await updateDoc(doc(db, 'challenges', id), { clipB }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['challenge'] }),
  });
};
