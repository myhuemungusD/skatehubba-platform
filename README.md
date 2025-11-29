# SkateHubba™ - Production Turborepo Monorepo

**The world's first authentic skate culture platform** featuring one-take challenges, AI-powered Heshur chat, 3D spot check-ins, avatar progression, Quest/Session system, and referral rewards.

## 🏗️ Architecture

```
skatehubba/
├── apps/
│   ├── web/           # Next.js 15 App Router (main web app)
│   ├── expo/          # React Native Expo 52 (iOS + Android)
│   ├── landing/       # Next.js 14 marketing site with PostHog waitlist
│   ├── admin/         # Next.js 14 admin dashboard
│   └── server/        # Express REST API (port 8080)
├── packages/
│   ├── ui/            # shadcn/ui + Tailwind + Radix (shared components)
│   ├── auth/          # NextAuth v5 + Expo Google sign-in (unified auth)
│   ├── db/            # Firebase + Firestore types + security rules
│   ├── config/        # Shared TypeScript, ESLint, Biome configs
│   ├── api/           # API utilities
│   ├── utils/         # Shared utilities
│   └── types/         # Shared TypeScript types
└── infra/             # Infrastructure as Code
```

## ⚡ Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment variables
cp .env.example .env.local
# Fill in Firebase credentials from Firebase Console

# 3. Start all apps
pnpm dev
# → API server on :8080
# → Web app on :5000
# → Landing on :3000
# → Admin on :3001
# → Expo on :8081
```

## 🔑 Environment Setup

### Required Firebase Variables

Get these from [Firebase Console](https://console.firebase.google.com/) → Project Settings:

```env
# Public (safe to commit)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=skatehubba.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=skatehubba
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=skatehubba.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Server-only (Replit Secrets)
FIREBASE_PROJECT_ID=skatehubba
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@skatehubba.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

### Google OAuth (for authentication)

Get from [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

```env
GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-here
```

See `.env.example` for complete documentation.

## 📦 Shared Packages

### `@skatehubba/ui`
Shared React components using shadcn/ui + Tailwind + Radix:
- Button, Card, Input, Label, Avatar
- Works across web (Next.js) and can be adapted for React Native

### `@skatehubba/auth`
Unified authentication for web and mobile:
- **Web:** NextAuth v5 with Google OAuth provider
- **Mobile:** Expo Google Sign-In
- Both save to the same Firestore `users` collection

### `@skatehubba/db`
Central Firebase package:
- Firestore client and collection references
- TypeScript types for all collections (User, Quest, Referral, Badge, etc.)
- Zod validation schemas
- Security rules (packages/db/firestore.rules)

## 🎯 Key Features

### 1. Unified Authentication
Users can sign in with Google on web or mobile and have the same account:

```typescript
// Web (Next.js)
import { signIn } from '@skatehubba/auth'
await signIn('google')

// Mobile (Expo)
import { signInWithGoogle } from '@skatehubba/auth'
await signInWithGoogle()
```

Both methods save user data to Firestore `users/{userId}`.

### 2. Sticker Endpoint
GET `/api/sticker/:userId` returns a 300 DPI PNG sticker (4"x4") with:
- User's name and @handle
- QR code linking to their profile
- Professional SkateHubba branding
- Print-ready for physical stickers

### 3. Referral System
- Each user gets a unique referral code
- Invite friends via email: `POST /api/referrals/invite`
- When 3 friends sign up, unlock "free deck" badge
- Track referrals: `GET /api/referrals/:userId`

### 4. Quest/Session System
- RPG-style skateboarding missions with gold/XP rewards
- Real-time Firestore backend
- Two quest types: FILM_CLIP and TRICK_BATTLE

## 🚀 Deployment

### Vercel (Web Apps)

**Deploy Next.js apps to Vercel:**

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy web app
pnpm deploy:web

# Deploy landing page
pnpm deploy:landing

# Deploy admin dashboard
cd apps/admin && vercel --prod
```

**Configuration:**
- Root directory: `apps/web` (or `apps/landing`, `apps/admin`)
- Build command: `cd ../.. && pnpm build --filter=@skatehubba/web`
- Output directory: `.next`
- Install command: `pnpm install`
- Environment variables: Add all `NEXT_PUBLIC_*` vars in Vercel dashboard

### Expo (Mobile)

**Deploy to Expo Application Services (EAS):**

```bash
# Install EAS CLI (already included in devDependencies)
pnpm add -g eas-cli

# Login to Expo
eas login

# Configure build
cd apps/expo
eas build:configure

# Build for production
pnpm build:expo
# Or build preview:
pnpm preview

# Submit to App Store & Play Store
pnpm submit
```

**EAS Build Profiles:**
- `development` - Development builds with dev client
- `preview` - Internal testing builds
- `production` - App Store/Play Store builds

### API Server (Express)

**Deploy to Railway, Render, or Fly.io:**

```bash
# Example for Render:
1. Connect your GitHub repo to Render
2. Create a new Web Service
3. Set build command: pnpm install && pnpm build --filter=@skatehubba/server
4. Set start command: cd apps/server && node dist/index.js
5. Add environment variables (FIREBASE_*, DATABASE_URL, etc.)
6. Deploy
```

## 🛠️ Development

### Run individual apps:

```bash
pnpm dev:web      # Next.js web app only
pnpm dev:expo     # Expo mobile app only
pnpm dev:api      # Express API server only
```

### Build all apps:

```bash
pnpm build        # Build all apps in parallel
```

### Linting & Type Checking:

```bash
pnpm lint         # Lint all apps with Biome
pnpm typecheck    # TypeScript type checking
pnpm format       # Format all code with Biome
```

### Testing:

```bash
pnpm test         # Run all tests
pnpm test:watch   # Watch mode
pnpm test:e2e     # End-to-end tests (Detox for mobile)
```

### Clean:

```bash
pnpm clean        # Remove all build artifacts
pnpm fresh        # Clean + fresh install
```

## 📱 Mobile Development

### iOS:

```bash
pnpm ios          # Run on iOS simulator
```

### Android:

```bash
pnpm android      # Run on Android emulator
```

## 🔐 Firebase Setup

### 1. Create Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (sk8hub-d7806)
3. Click **Firestore Database** → **Create database**
4. Select **Production mode**
5. Choose location: `us-central1` (recommended)
6. Click **Enable**

### 2. Deploy Security Rules

```bash
cd packages/db
firebase deploy --only firestore:rules
```

### 3. Enable Authentication

1. Firebase Console → **Authentication** → **Sign-in method**
2. Enable **Google** provider
3. Add authorized domains (skatehubba.com, your Vercel domain)
4. Add OAuth client IDs for web and Android/iOS

## 📊 Monitoring

- **PostHog:** Product analytics (landing page waitlist)
- **Sentry:** Error tracking (web + mobile)
- **Firebase Analytics:** User behavior tracking

## 🎨 Design System

- **Colors:** `#FFD700` (gold), `#FF9100` (orange) - RPG aesthetic
- **Typography:** Clean, modern sans-serif
- **Components:** shadcn/ui with Tailwind + Radix
- **Dark Mode:** Supported via Tailwind

## 🤝 Contributing

This is a monorepo managed with pnpm + Turborepo:
- All packages are in `packages/`
- All apps are in `apps/`
- Shared configs in `packages/config/`
- Use `workspace:*` protocol for internal dependencies

## 📝 License

UNLICENSED - Proprietary software

## 🛹 Let's Go!

**Status:** ✅ Production-ready  
**Ship Date:** November 29, 2025

Grind eternal. 🚀
