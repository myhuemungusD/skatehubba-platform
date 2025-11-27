import { useState } from "react";
import { Button } from "../components/ui/button";
import { loginWithGoogle } from "../lib/auth";
import { auth } from "../lib/firebase";

export default function TestAuthPage() {
  const [status, setStatus] = useState<string>("Ready to test");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  async function testFirebaseInit() {
    setStatus("Testing Firebase initialization...");
    try {
      setStatus(`✅ Firebase app initialized: ${auth.app.name}`);
      setStatus(
        (prev) => `${prev}\n✅ Auth domain: ${auth.app.options.authDomain}`,
      );
      setStatus(
        (prev) => `${prev}\n✅ Project ID: ${auth.app.options.projectId}`,
      );
      setError(null);
    } catch (err: any) {
      setError(`❌ Firebase init error: ${err.message}`);
      setStatus("Failed");
    }
  }

  async function testGoogleSignIn() {
    setStatus("Testing Google Sign-In...");
    setError(null);
    try {
      const result = await loginWithGoogle();
      setUser(result);
      setStatus("✅ Google Sign-In successful!");
    } catch (err: any) {
      setError(`❌ Google Sign-In error: ${err.message}\n${err.code || ""}`);
      setStatus("Failed");
      console.error("Full error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔥 Firebase Auth Test</h1>

        <div className="space-y-4 mb-8">
          <Button onClick={testFirebaseInit} className="w-full">
            Test Firebase Initialization
          </Button>

          <Button
            onClick={testGoogleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Test Google Sign-In
          </Button>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2">Status:</h2>
          <pre className="whitespace-pre-wrap text-sm text-green-400">
            {status}
          </pre>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 p-6 rounded-lg mb-4">
            <h2 className="text-xl font-semibold mb-2">Error:</h2>
            <pre className="whitespace-pre-wrap text-sm text-red-300">
              {error}
            </pre>
          </div>
        )}

        {user && (
          <div className="bg-green-900/50 border border-green-500 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">User Data:</h2>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-800 rounded">
          <h3 className="font-semibold mb-2">Environment Check:</h3>
          <p className="text-sm">Current URL: {window.location.href}</p>
          <p className="text-sm">Protocol: {window.location.protocol}</p>
        </div>
      </div>
    </div>
  );
}
