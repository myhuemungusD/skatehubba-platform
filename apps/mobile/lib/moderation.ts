import { addDoc, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function reportContent(
  reporterUid: string,
  contentId: string,
  contentType: 'skate_game' | 'video' | 'user',
  reason: string,
  reportedUserId?: string
) {
  try {
    await addDoc(collection(db, 'reports'), {
      reporterUid,
      contentId,
      contentType,
      reason,
      reportedUserId,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error reporting content:', error);
    throw error;
  }
}

export async function blockUser(blockerUid: string, blockedUid: string) {
  try {
    // Add to a subcollection of blocked users for the blocker
    await setDoc(doc(db, 'users', blockerUid, 'blocked', blockedUid), {
      blockedUid,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
}
