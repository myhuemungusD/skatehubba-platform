import type { Adapter } from "next-auth/adapters";
import { getFirestore, collection, doc, getDoc, setDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import type { FirebaseApp } from "firebase/app";

export function FirestoreAdapter(app: FirebaseApp): Adapter {
  const db = getFirestore(app);

  return {
    async createUser(user) {
      const userRef = doc(collection(db, "users"));
      const userData = {
        ...user,
        id: userRef.id,
        emailVerified: user.emailVerified?.toISOString() || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userRef, userData);
      return {
        ...userData,
        emailVerified: userData.emailVerified ? new Date(userData.emailVerified) : null,
        createdAt: new Date(userData.createdAt),
        updatedAt: new Date(userData.updatedAt),
      };
    },

    async getUser(id) {
      const userDoc = await getDoc(doc(db, "users", id));
      if (!userDoc.exists()) return null;
      const data = userDoc.data();
      return {
        id: userDoc.id,
        email: data.email,
        emailVerified: data.emailVerified ? new Date(data.emailVerified) : null,
        name: data.name || null,
        image: data.image || null,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };
    },

    async getUserByEmail(email) {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      const userDoc = snapshot.docs[0];
      if (!userDoc) return null;
      const data = userDoc.data();
      return {
        id: userDoc.id,
        email: data.email,
        emailVerified: data.emailVerified ? new Date(data.emailVerified) : null,
        name: data.name || null,
        image: data.image || null,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const accountsRef = collection(db, "accounts");
      const q = query(
        accountsRef,
        where("provider", "==", provider),
        where("providerAccountId", "==", providerAccountId)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty || !snapshot.docs[0]) return null;
      const accountData = snapshot.docs[0].data();
      return this.getUser!(accountData.userId);
    },

    async updateUser(user) {
      const userRef = doc(db, "users", user.id);
      const existing = await getDoc(userRef);
      const existingData = existing.data() || {};
      
      const updateData = {
        email: user.email || existingData.email || "",
        name: user.name || existingData.name || null,
        image: user.image || existingData.image || null,
        emailVerified: user.emailVerified?.toISOString() || existingData.emailVerified || null,
        createdAt: existingData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await setDoc(userRef, updateData, { merge: true });
      
      return {
        id: user.id,
        email: updateData.email,
        name: updateData.name,
        image: updateData.image,
        emailVerified: updateData.emailVerified ? new Date(updateData.emailVerified) : null,
      };
    },

    async deleteUser(userId) {
      await deleteDoc(doc(db, "users", userId));
      const accountsRef = collection(db, "accounts");
      const q = query(accountsRef, where("userId", "==", userId));
      const snapshot = await getDocs(q);
      await Promise.all(snapshot.docs.map((doc) => deleteDoc(doc.ref)));
      const sessionsRef = collection(db, "sessions");
      const sessionsQuery = query(sessionsRef, where("userId", "==", userId));
      const sessionsSnapshot = await getDocs(sessionsQuery);
      await Promise.all(sessionsSnapshot.docs.map((doc) => deleteDoc(doc.ref)));
    },

    async linkAccount(account) {
      const accountRef = doc(collection(db, "accounts"));
      const accountData = {
        id: accountRef.id,
        userId: account.userId,
        type: account.type,
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        refresh_token: account.refresh_token,
        access_token: account.access_token,
        expires_at: account.expires_at,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
        session_state: account.session_state,
      };
      await setDoc(accountRef, accountData);
      return accountData;
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const accountsRef = collection(db, "accounts");
      const q = query(
        accountsRef,
        where("provider", "==", provider),
        where("providerAccountId", "==", providerAccountId)
      );
      const snapshot = await getDocs(q);
      await Promise.all(snapshot.docs.map((doc) => deleteDoc(doc.ref)));
    },

    async createSession({ sessionToken, userId, expires }) {
      const sessionRef = doc(collection(db, "sessions"));
      const sessionData = {
        id: sessionRef.id,
        sessionToken,
        userId,
        expires: expires.toISOString(),
      };
      await setDoc(sessionRef, sessionData);
      return {
        sessionToken,
        userId,
        expires,
      };
    },

    async getSessionAndUser(sessionToken) {
      const sessionsRef = collection(db, "sessions");
      const q = query(sessionsRef, where("sessionToken", "==", sessionToken));
      const snapshot = await getDocs(q);
      if (snapshot.empty || !snapshot.docs[0]) return null;
      const sessionData = snapshot.docs[0].data();
      const expires = new Date(sessionData.expires);
      if (expires < new Date()) {
        await deleteDoc(snapshot.docs[0].ref);
        return null;
      }
      const user = await this.getUser!(sessionData.userId);
      if (!user) return null;
      return {
        session: {
          sessionToken: sessionData.sessionToken,
          userId: sessionData.userId,
          expires,
        },
        user,
      };
    },

    async updateSession({ sessionToken, ...session }) {
      const sessionsRef = collection(db, "sessions");
      const q = query(sessionsRef, where("sessionToken", "==", sessionToken));
      const snapshot = await getDocs(q);
      if (snapshot.empty || !snapshot.docs[0]) return null;
      const sessionRef = snapshot.docs[0].ref;
      const updateData = {
        ...session,
        expires: session.expires?.toISOString(),
      };
      await setDoc(sessionRef, updateData, { merge: true });
      return {
        sessionToken,
        userId: session.userId || snapshot.docs[0].data().userId,
        expires: session.expires || new Date(),
      };
    },

    async deleteSession(sessionToken) {
      const sessionsRef = collection(db, "sessions");
      const q = query(sessionsRef, where("sessionToken", "==", sessionToken));
      const snapshot = await getDocs(q);
      await Promise.all(snapshot.docs.map((doc) => deleteDoc(doc.ref)));
    },

    async createVerificationToken({ identifier, expires, token }) {
      const tokenRef = doc(collection(db, "verification_tokens"));
      const tokenData = {
        identifier,
        token,
        expires: expires.toISOString(),
      };
      await setDoc(tokenRef, tokenData);
      return {
        identifier,
        token,
        expires,
      };
    },

    async useVerificationToken({ identifier, token }) {
      const tokensRef = collection(db, "verification_tokens");
      const q = query(
        tokensRef,
        where("identifier", "==", identifier),
        where("token", "==", token)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty || !snapshot.docs[0]) return null;
      const tokenData = snapshot.docs[0].data();
      await deleteDoc(snapshot.docs[0].ref);
      return {
        identifier: tokenData.identifier,
        token: tokenData.token,
        expires: new Date(tokenData.expires),
      };
    },
  };
}
