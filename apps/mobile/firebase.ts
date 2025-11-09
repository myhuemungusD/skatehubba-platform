import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "skatehubba.firebaseapp.com",
  projectId: "skatehubba",
  storageBucket: "skatehubba.appspot.com",
  messagingSenderId: "123",
  appId: "1:123:ios:abc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
