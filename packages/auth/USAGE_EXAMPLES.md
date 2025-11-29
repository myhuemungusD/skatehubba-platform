# Usage Examples for @skatehubba/auth

This document provides complete, working examples for implementing unified authentication in both Next.js and Expo applications.

## Next.js Implementation

### 1. Configure NextAuth API Route

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth";
import { createNextAuthConfig } from "@skatehubba/auth";

const authConfig = createNextAuthConfig({
  firebaseConfig: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  },
  googleClientId: process.env.GOOGLE_CLIENT_ID!,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
```

### 2. Create a Sign-In Page

Create `app/sign-in/page.tsx`:

```typescript
"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Sign In to SkateHubba</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
```

### 3. Protect Routes with Middleware

Create `middleware.ts`:

```typescript
import { auth } from "next-auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

### 4. Use Session in Server Components

```typescript
import { auth } from "next-auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <img src={session.user.image || ""} alt="Profile" />
      <p>{session.user.email}</p>
    </div>
  );
}
```

### 5. Use Session in Client Components

```typescript
"use client";

import { useSession, signOut } from "next-auth/react";

export function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <div>
      <p>Signed in as {session.user.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

## Expo Implementation

### 1. Configure Auth on App Start

Update `app/_layout.tsx`:

```typescript
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import {
  configureExpoAuth,
  onAuthStateChanged,
  type User,
} from "@skatehubba/auth";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Configure auth on mount
    configureExpoAuth({
      firebaseConfig: {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY!,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN!,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID!,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET!,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID!,
      },
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
    });

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
```

### 2. Create Sign-In Screen

Create `app/sign-in.tsx`:

```typescript
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signInWithGoogle } from "@skatehubba/auth";

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const user = await signInWithGoogle();
      console.log("Signed in:", user);
      router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert("Sign-In Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SkateHubba</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleGoogleSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing in..." : "Sign in with Google"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
```

### 3. Create Auth Context Hook

Create `hooks/useAuth.tsx`:

```typescript
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithGoogle,
  signOut as authSignOut,
  getCurrentUser,
  type User,
} from "@skatehubba/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      return user;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authSignOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
}
```

### 4. Protected Route Example

Create `app/dashboard.tsx`:

```typescript
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function DashboardScreen() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/sign-in");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}!</Text>
      <Text style={styles.email}>{user.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#FF5252",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
```

## Firestore Data Structure

Both platforms save to the same Firestore collections:

### Users Collection: `users/{userId}`

```json
{
  "id": "abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "image": "https://...",
  "emailVerified": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### Accounts Collection: `accounts/{accountId}`

```json
{
  "id": "account123",
  "userId": "abc123",
  "type": "oauth",
  "provider": "google",
  "providerAccountId": "google-user-id",
  "access_token": "...",
  "refresh_token": "...",
  "expires_at": 1234567890
}
```

## Testing the Integration

### Verify Unified Authentication

1. Sign in via Next.js web app
2. Check Firestore console - you should see a user document
3. Sign in via Expo mobile app with the same Google account
4. The same user document should be updated/used
5. Both platforms should see the same user data

### Common Issues

**Issue**: "Play services not available" on Android
**Solution**: Ensure you have Google Play Services installed on your emulator/device

**Issue**: "No ID token returned from Google Sign-In"
**Solution**: Verify your `webClientId` matches your OAuth client ID from Google Cloud Console

**Issue**: NextAuth session not persisting
**Solution**: Check that your database strategy is set to `"database"` and Firestore adapter is configured

## Environment Variables Summary

### Next.js (.env.local)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
GOOGLE_CLIENT_ID=your-oauth-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-oauth-client-secret
```

### Expo (.env)
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-oauth-client-id.apps.googleusercontent.com
```

Note: The `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` should be your OAuth 2.0 Client ID from Google Cloud Console.
