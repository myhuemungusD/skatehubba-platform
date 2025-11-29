# @skatehubba/auth

Unified authentication package for Next.js (NextAuth v5) and Expo (Google Sign-In). Provides a single auth interface that works identically on both platforms, saving users to the same Firestore collection.

## Installation

This package is part of the SkateHubba monorepo and is already configured as a workspace dependency.

## Configuration

### Next.js Setup

```typescript
// app/api/auth/[...nextauth]/route.ts
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

```typescript
// app/layout.tsx or middleware.ts
import { getServerSession } from "@skatehubba/auth";

export default async function RootLayout() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/sign-in");
  }
  
  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
    </div>
  );
}
```

### Expo Setup

```typescript
// app/_layout.tsx
import { useEffect, useState } from "react";
import {
  configureExpoAuth,
  signInWithGoogle,
  signOut,
  getCurrentUser,
  onAuthStateChanged,
  type User,
} from "@skatehubba/auth";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Configure on app start
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

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <SignInButton onPress={handleSignIn} />;
  }

  return (
    <View>
      <Text>Welcome, {user.name}!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
```

## Unified Data Structure

Both Next.js and Expo save users to the same Firestore collections:

### Collections

#### `users`
```typescript
{
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  emailVerified: string | null; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
```

#### `accounts`
```typescript
{
  id: string;
  userId: string;
  type: string; // "oauth"
  provider: string; // "google"
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}
```

#### `sessions` (NextAuth only)
```typescript
{
  id: string;
  sessionToken: string;
  userId: string;
  expires: string; // ISO date string
}
```

## API Reference

### Next.js Functions

#### `createNextAuthConfig(config: AuthConfig)`
Creates NextAuth v5 configuration with Google provider and Firestore adapter.

#### `getServerSession()`
Gets the current session from server components or API routes.

### Expo Functions

#### `configureExpoAuth(config: AuthConfig & { webClientId: string })`
Configures Google Sign-In and Firebase for Expo.

#### `signInWithGoogle(): Promise<User>`
Initiates Google Sign-In flow and returns the authenticated user.

#### `signOut(): Promise<void>`
Signs out the current user from both Google and Firebase.

#### `getCurrentUser(): Promise<User | null>`
Gets the currently authenticated user.

#### `onAuthStateChanged(callback: (user: User | null) => void): () => void`
Listens for authentication state changes. Returns an unsubscribe function.

### Types

```typescript
interface User {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Session {
  user: {
    id: string;
    email: string | null;
    name: string | null;
    image: string | null;
  };
  expires: string;
}
```

## Environment Variables

### Next.js (.env.local)
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Expo (.env)
```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=
```

## Features

- ✅ Single authentication interface for Next.js and Expo
- ✅ Users saved to same Firestore collection
- ✅ Google OAuth on both platforms
- ✅ Session management with NextAuth v5
- ✅ Real-time auth state changes in Expo
- ✅ TypeScript support with shared types
- ✅ Automatic account linking
