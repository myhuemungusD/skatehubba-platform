import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import type { Spot, CheckIn } from '@skatehubba/types';

export async function getSpotById(id: string): Promise<Spot | null> {
  const snap = await getDoc(doc(db, 'spots', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } as Spot : null;
}

export async function getSpotCheckIns(spotId: string): Promise<CheckIn[]> {
  const q = query(collection(db, 'checkins'), where('spotId', '==', spotId));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as CheckIn));
}
