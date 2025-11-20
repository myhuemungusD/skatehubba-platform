# Testing Native Google Authentication

## Prerequisites

1. **Firebase Configuration**
   - ✅ `google-services.json` in `android/app/` (already present)
   - ✅ Google Sign-In enabled in Firebase Console
   - ✅ SHA-1 fingerprint added to Firebase project

2. **Installed Packages**
   - ✅ `@react-native-firebase/app` & `@react-native-firebase/auth`
   - ✅ `@react-native-google-signin/google-signin`
   - ✅ `expo-dev-client` for custom native builds
   - ✅ `zustand` for state management
   - ✅ `expo-router` for file-based navigation

## Building and Running

### Option 1: Expo Dev Client (Recommended for Replit)

```bash
cd apps/mobile

# For Android (requires Android Studio or Emulator)
npx expo run:android

# For iOS (requires macOS + Xcode)
npx expo run:ios
```

**First Build**: Takes ~2-5 minutes to compile native modules
**Subsequent Builds**: Much faster (~30 seconds)

### Option 2: EAS Build (Cloud Build)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo account
eas login

# Build for Android
eas build --platform android --profile development

# Build for iOS
eas build --platform ios --profile development
```

## Testing the Auth Flow

### Expected Flow

1. **App Launch** → Loading screen (Firebase initialization)
2. **No User** → Redirects to Sign-In screen
3. **Tap "Sign in with Google"** → Google account picker
4. **Select Account** → Google OAuth consent
5. **Success** → Redirects to Map screen
6. **Tap "Sign Out"** → Redirects back to Sign-In screen

### Success Indicators

✅ No redirect loops
✅ User info displayed on Map screen (name, email)
✅ Sign-out works and clears session
✅ App remembers user on reload (persisted auth state)

### Console Logs to Watch For

```
🔥 Auth: Google user synced <uid>
✅ User authenticated, redirecting to map
🔒 No user, redirecting to sign-in
```

## Common Issues

### 1. "Google Sign-In failed"

**Cause**: SHA-1 fingerprint mismatch or Play Services issue

**Fix**:
```bash
cd android
./gradlew signingReport
# Copy SHA-1 from output and add to Firebase Console
```

### 2. "Play Services not available"

**Cause**: Emulator doesn't have Google Play Services

**Fix**: Use an emulator with Google Play (not AOSP image)

### 3. Redirect Loop

**Cause**: Auth gate logic error

**Fix**: Check console logs for repeated navigation attempts. Auth guard now uses `hasNavigated` flag to prevent loops.

### 4. "No ID token received"

**Cause**: Google Sign-In configuration issue

**Fix**: Verify `webClientId` in `lib/auth.ts` matches OAuth client ID from Firebase Console

## Testing Checklist

- [ ] App launches without crashing
- [ ] Sign-in screen displays
- [ ] Google Sign-In button works
- [ ] Google account picker appears
- [ ] User redirects to Map screen after sign-in
- [ ] User info displays correctly (name, email)
- [ ] Sign-out button works
- [ ] User redirects to Sign-In screen after sign-out
- [ ] App remembers user on reload (if previously signed in)
- [ ] No redirect loops or infinite navigation

## Debugging Tips

### View Zustand Store State

Add this to any component:
```typescript
import { useAuthStore } from '../lib/auth';

const { user, loading, error } = useAuthStore();
console.log('Auth State:', { user, loading, error });
```

### View Current Route

```typescript
import { useSegments } from 'expo-router';

const segments = useSegments();
console.log('Current route:', segments);
```

### Check Firebase Auth Status

```typescript
import { auth } from '../lib/firebase';

auth().onAuthStateChanged((user) => {
  console.log('Firebase user:', user?.uid, user?.email);
});
```

## Architecture Overview

```
┌─────────────────────────────────────────┐
│  App Launch                              │
│  └─> _layout.tsx (AuthGate)             │
│      └─> Initialize Zustand store       │
│      └─> Listen to Firebase auth state  │
└─────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    No User              Has User
        │                     │
        ▼                     ▼
  ┌──────────┐          ┌──────────┐
  │ Sign-In  │          │   Map    │
  │  Screen  │          │  Screen  │
  └──────────┘          └──────────┘
        │                     │
        │  Google Sign-In     │  Sign Out
        │                     │
        └──────────┬──────────┘
                   │
          ┌────────▼────────┐
          │  lib/auth.ts    │
          │  (Zustand)      │
          │                 │
          │  • signInWith   │
          │    Google()     │
          │  • signOut()    │
          │  • init()       │
          └─────────────────┘
                   │
          ┌────────▼────────┐
          │ Firebase Auth   │
          │ (Native SDK)    │
          └─────────────────┘
```

## Key Files

- **lib/auth.ts**: Zustand store with Google Sign-In logic
- **lib/firebase.ts**: Native Firebase initialization
- **app/_layout.tsx**: Auth guard and routing logic
- **app/sign-in.tsx**: Sign-in screen with Google button
- **app/map.tsx**: Post-auth landing page
- **app.json**: Native plugins and deep linking config

## Next Steps After Testing

Once auth is working:

1. Add real map functionality (Mapbox integration)
2. Implement S.K.A.T.E game screens
3. Add Firestore data sync
4. Implement push notifications
5. Add video recording for trick challenges
6. Build production app with EAS Build
