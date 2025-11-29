import {
  GoogleSignin,
  statusCodes,
  type ConfigureParams,
} from "@react-native-google-signin/google-signin";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import type { AuthConfig, User } from "./types";

let firebaseApp: ReturnType<typeof initializeApp>;
let auth: ReturnType<typeof getAuth>;
let db: ReturnType<typeof getFirestore>;

export function configureExpoAuth(config: AuthConfig & { webClientId: string }) {
  GoogleSignin.configure({
    webClientId: config.webClientId,
    offlineAccess: true,
  });

  firebaseApp = !getApps().length
    ? initializeApp(config.firebaseConfig)
    : getApp();
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
}

async function saveUserToFirestore(firebaseUser: FirebaseUser): Promise<User> {
  const userRef = doc(db, "users", firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  const userData: User = {
    id: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName,
    image: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified ? new Date() : null,
    createdAt: userSnap.exists()
      ? new Date(userSnap.data().createdAt)
      : new Date(),
    updatedAt: new Date(),
  };

  await setDoc(userRef, {
    email: userData.email,
    name: userData.name,
    image: userData.image,
    emailVerified: userData.emailVerified?.toISOString() || null,
    createdAt: userData.createdAt.toISOString(),
    updatedAt: userData.updatedAt.toISOString(),
  }, { merge: true });

  const accountsRef = collection(db, "accounts");
  const accountQuery = query(
    accountsRef,
    where("userId", "==", firebaseUser.uid),
    where("provider", "==", "google")
  );
  const accountSnapshot = await getDocs(accountQuery);

  if (accountSnapshot.empty) {
    const accountRef = doc(collection(db, "accounts"));
    await setDoc(accountRef, {
      id: accountRef.id,
      userId: firebaseUser.uid,
      type: "oauth",
      provider: "google",
      providerAccountId: firebaseUser.uid,
    });
  }

  return userData;
}

export async function signInWithGoogle(): Promise<User> {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (!userInfo.data?.idToken) {
      throw new Error("No ID token returned from Google Sign-In");
    }

    const googleCredential = GoogleAuthProvider.credential(
      userInfo.data.idToken
    );
    const userCredential = await signInWithCredential(auth, googleCredential);

    const user = await saveUserToFirestore(userCredential.user);
    return user;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error("User cancelled the sign-in flow");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error("Sign-in is already in progress");
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error("Play services not available or outdated");
    } else {
      throw error;
    }
  }
}

export async function signOut(): Promise<void> {
  try {
    await GoogleSignin.signOut();
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;

  const userRef = doc(db, "users", firebaseUser.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const data = userSnap.data();
  return {
    id: firebaseUser.uid,
    email: data.email,
    name: data.name || null,
    image: data.image || null,
    emailVerified: data.emailVerified ? new Date(data.emailVerified) : null,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export function onAuthStateChanged(
  callback: (user: User | null) => void
): () => void {
  return auth.onAuthStateChanged(async (firebaseUser) => {
    if (firebaseUser) {
      const user = await saveUserToFirestore(firebaseUser);
      callback(user);
    } else {
      callback(null);
    }
  });
}

export { auth as getAuth, db as getFirestore };
