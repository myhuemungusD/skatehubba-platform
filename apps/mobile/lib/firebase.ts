import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storageModule from '@react-native-firebase/storage';
import functionsModule from '@react-native-firebase/functions';

export { auth };
export const GoogleAuthProvider = auth.GoogleAuthProvider;
export const db = firestore();
export const storage = storageModule();
export const functions = functionsModule();

// Firestore helpers
export const doc = (path: string, ...segments: string[]) => {
  return firestore().doc([path, ...segments].join('/'));
};

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

export const serverTimestamp = () => firestore.FieldValue.serverTimestamp();

// Storage helpers
export const ref = (path: string) => storage.ref(path);
export const uploadBytesResumable = (storageRef: any, blob: Blob) => {
  return storageRef.put(blob);
};
export const getDownloadURL = async (storageRef: any) => {
  return storageRef.getDownloadURL();
};

// Functions helpers
export const httpsCallable = (functionsInstance: any, name: string) => {
  return functionsInstance.httpsCallable(name);
};
