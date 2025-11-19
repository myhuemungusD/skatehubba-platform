import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBvxRdM9YufW01yATOKmpUmp2zJJxaogH4",
  authDomain: "sk8hub-d7806.firebaseapp.com",
  projectId: "sk8hub-d7806",
  storageBucket: "sk8hub-d7806.firebasestorage.app",
  messagingSenderId: "665573979824",
  appId: "1:665573979824:android:5eab00edc09ceb9fee2d75"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
