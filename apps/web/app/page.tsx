"use client";

import { useState, useEffect } from "react";
import { auth } from "../src/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useProfile } from "../src/hooks/useProfile";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const profileQuery = useProfile();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        profileQuery.refetch();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>🛹 SkateHubba Protected Endpoint Test</h1>
      
      {!user ? (
        <div style={{ marginTop: "2rem" }}>
          <h2>Sign In / Sign Up</h2>
          <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "0.5rem", fontSize: "1rem" }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: "0.5rem", fontSize: "1rem" }}
              required
            />
            <div style={{ display: "flex", gap: "1rem" }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
              <button 
                type="button"
                onClick={handleSignUp}
                disabled={loading}
                style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </div>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <h2>✅ Signed In</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.uid}</p>
          <button onClick={handleSignOut} style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer", marginTop: "1rem" }}>
            Sign Out
          </button>

          <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
            <h3>📊 Profile Data from Protected Endpoint</h3>
            {profileQuery.isLoading && <p>Loading profile...</p>}
            {profileQuery.isError && <p style={{ color: "red" }}>Error: {(profileQuery.error as Error).message}</p>}
            {profileQuery.isSuccess && (
              <pre style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
                {JSON.stringify(profileQuery.data, null, 2)}
              </pre>
            )}
            <button 
              onClick={() => profileQuery.refetch()}
              style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer", marginTop: "1rem" }}
            >
              Refresh Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
