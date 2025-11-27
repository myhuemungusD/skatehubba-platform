import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";

export interface AuthState {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return { user, loading };
};
