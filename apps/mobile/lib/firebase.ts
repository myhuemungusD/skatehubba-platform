import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export { auth };
export const GoogleAuthProvider = auth.GoogleAuthProvider;
export const db = firestore();
export const doc = firestore().doc;
export const getDoc = async (docRef: any) => {
  const snapshot = await docRef.get();
  return {
    data: () => snapshot.data(),
    exists: snapshot.exists,
  };
};
export const setDoc = async (docRef: any, data: any, options?: any) => {
  return docRef.set(data, options);
};
