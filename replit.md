# SkateHubba™ Monorepo

## Overview
Full-stack skateboarding social platform with React Native mobile app, Next.js web app, Express API backend, and Unity AR integration. Built as a modern monorepo using pnpm workspaces and Turborepo.

## Recent Changes (November 20, 2025)
- **Web App Authentication Fully Functional**: Google OAuth working with popup + redirect fallback
  - Fixed OAuth flow to handle both popup and redirect methods
  - Updated all sign-in redirects to go to `/shop` (Hubba Shop)
  - Email/password login, Google OAuth, and phone auth all redirect to shop after sign-in
  - Firebase domain authorized: `123befe2-ef9e-44d2-bd98-d9ac095d8429-00-fv9kiszcdkp8.worf.replit.dev`
  - Fixed critical bug: auth/routes.ts was importing firebase-admin directly instead of initialized admin with FIREBASE_ADMIN_KEY
- **Mobile App Native Authentication Implemented**: React Native Google Sign-In with Firebase
  - Installed native packages: @react-native-firebase/app, @react-native-firebase/auth, @react-native-google-signin/google-signin
  - Created Zustand auth store with Google Sign-In integration (lib/auth.ts)
  - Set up Expo Router with auth guards and no-loop navigation (app/_layout.tsx)
  - Built sign-in screen with native Google button (app/sign-in.tsx)
  - Created post-auth landing screen (app/map.tsx)
  - Configured app.json with expo-dev-client, deep linking, and native plugins
  - Fixed critical issues: added accessToken for Android, prevented redirect loops, added error handling
  - Ready for testing with `npx expo run:android` (requires dev client build)
- **Database Setup Complete**: Created unified schema at `apps/server/db/schema.ts` with 12 tables
  - Successfully ran migrations with drizzle-kit
  - All tables created: users, spots, challenges, check_ins, sessions, subscribers, donations, etc.
- **Firebase Configuration Unified**: Systematically resolved all Firebase config mismatches
  - Updated mobile app Firebase config with correct credentials
  - Aligned iOS bundle ID (`com.skatehubba.app`) with Firebase
  - Aligned Android package (`com.skathubba.app`) with Firebase
  - Created server `.env` file with all Firebase environment variables
  - Added SHA-1 fingerprint to Firebase Console for Android app
  - Placed `google-services.json` in correct location: `apps/mobile/android/app/`

## Previous Changes (November 18, 2025)
- **Major restructure**: Converted to complete monorepo architecture
- Created 7 app directories: web, mobile, server, landing, ar, admin, studio
- Created 7 package directories: gameundici, ui, api-sdk, firebase, db, types, utils
- Migrated Firebase infrastructure from `infra/` to `packages/firebase`
- Added Turborepo for efficient task running and build orchestration
- Established workspace dependencies and proper package naming conventions
- **Added 28 complete page components** including auth, map, game, shop, and more
- **Integrated Firebase Auth** with working credentials
- **Created helper utilities**: geolocation hook, distance calculations, AR components
- **Server running** on port 5000 with Vite dev server and hot reload

## Project Architecture

### Apps
- **web** (`apps/web`): Main Next.js web application (port 5000)
- **mobile** (`apps/mobile`): React Native/Expo mobile app for iOS & Android
- **server** (`apps/server`): Express REST API backend (port 8000)
- **landing** (`apps/landing`): Marketing website (port 3000)
- **ar** (`apps/ar`): Unity AR experience build output directory
- **admin** (`apps/admin`): Internal admin dashboard (port 3001)
- **studio** (`apps/studio`): Drizzle Studio for database management

### Packages
- **gameundici** (`packages/gameundici`): Core SKATE game logic and state management
- **ui** (`packages/ui`): Shared React Native components and theme system
- **api-sdk** (`packages/api-sdk`): Type-safe TypeScript client for API
- **firebase** (`packages/firebase`): Firebase client, admin SDK, and Cloud Functions
- **db** (`packages/db`): Drizzle ORM schemas and migrations
- **types** (`packages/types`): Shared TypeScript types and Zod validators
- **utils** (`packages/utils`): Common utilities (geo calculations, helpers)

## Directory Structure
```
skatehubba-monorepo/
├── apps/              (Application projects)
├── packages/          (Shared libraries)
├── turbo.json         (Turborepo config)
├── package.json       (Workspace root)
└── tsconfig.json      (Root TypeScript config)
```

## Development Workflow

### Getting Started
```bash
pnpm install           # Install all dependencies
pnpm dev              # Run all apps in parallel
```

### Run Specific Apps
```bash
pnpm dev:web          # Next.js web app
pnpm dev:mobile       # Expo mobile app
pnpm dev:server       # Express API
pnpm dev:landing      # Marketing site
pnpm dev:admin        # Admin dashboard
pnpm dev:studio       # Drizzle Studio
```

### Package Management
- Uses **pnpm workspaces** for dependency management
- All packages use `workspace:*` protocol for internal dependencies
- Package naming convention: `@skatehubba/<name>`

## Technology Stack
- **Frontend**: Next.js 14, React Native/Expo
- **Backend**: Express, Node.js
- **Database**: Drizzle ORM (PostgreSQL) - Replit-hosted Neon database
- **Firebase**: Authentication, Firestore, Cloud Functions, Storage
- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **Language**: TypeScript

## Firebase Configuration

### Project Details
- **Project ID**: `sk8hub-d7806`
- **Project Number**: `665573979824`
- **Storage Bucket**: `sk8hub-d7806.firebasestorage.app`
- **Auth Domain**: `sk8hub-d7806.firebaseapp.com`

### Application Identifiers
- **Android Package**: `com.skathubba.app`
- **iOS Bundle ID**: `com.skatehubba.app`
- **SHA-1 Fingerprint**: `89:C5:C8:A6:B3:90:81:D7:49:AB:32:33:F2:E9:6B:C4:A6:A2:30:12`

### Configuration Locations

#### Client-Side (Public - Safe to Commit)
1. **Mobile App** (`apps/mobile/firebase.ts`): Hardcoded Firebase config
   - ✅ Safe to hardcode - Firebase API keys are public for client apps
   - Protected by Firebase Security Rules, not API key secrecy
2. **Server Client** (`apps/server/client/src/lib/firebase.ts`): Uses VITE_ environment variables
   - Loads from `.env` file during build process
3. **Android Config** (`apps/mobile/android/app/google-services.json`): Google Services configuration
   - ✅ Safe to commit - Required for Android Firebase SDK

#### Server-Side (Environment Variables Required)
4. **Packages Firebase** (`packages/firebase/src/index.ts`): 
   - ⚠️ Requires environment variables - NO hardcoded fallbacks
   - Set `FIREBASE_*` env vars (without VITE_ prefix)
5. **Server Admin** (`apps/server/server/admin.ts`):
   - ⚠️ FIREBASE_ADMIN_KEY must be in Replit Secrets
   - This is the only truly sensitive credential

### Environment Variables Setup

#### For `apps/server/.env` (Client-side, bundled into frontend):
```bash
# These are PUBLIC - bundled into client JavaScript
VITE_FIREBASE_API_KEY=AIzaSyBvxRdM9YufW01yATOKmpUmp2zJJxaogH4
VITE_FIREBASE_AUTH_DOMAIN=sk8hub-d7806.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=sk8hub-d7806
VITE_FIREBASE_STORAGE_BUCKET=sk8hub-d7806.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=665573979824
VITE_FIREBASE_APP_ID=1:665573979824:android:5eab00edc09ceb9fee2d75
```

#### For `packages/firebase` (Server-side Node.js - if used):
```bash
# Only required if using packages/firebase package directly
# Set these in your Node.js runtime environment
FIREBASE_API_KEY=AIzaSyBvxRdM9YufW01yATOKmpUmp2zJJxaogH4
FIREBASE_AUTH_DOMAIN=sk8hub-d7806.firebaseapp.com
FIREBASE_PROJECT_ID=sk8hub-d7806
FIREBASE_STORAGE_BUCKET=sk8hub-d7806.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=665573979824
FIREBASE_APP_ID=1:665573979824:android:5eab00edc09ceb9fee2d75
```

#### For Replit Secrets (Required for Firebase Admin SDK):
**⚠️ CRITICAL SECURITY**: The following credential is **SENSITIVE** and must **ONLY** be stored in Replit Secrets:

**How to add Firebase Admin Key to Replit Secrets:**
1. Open Replit Secrets (🔒 lock icon in left sidebar, or Tools → Secrets)
2. Click "New Secret"
3. Key: `FIREBASE_ADMIN_KEY`
4. Value: Paste your Firebase service account JSON as a **single-line string**
   - Get from: Firebase Console → Project Settings → Service Accounts → "Generate New Private Key"
5. Click "Add Secret"

**⚠️ NEVER add FIREBASE_ADMIN_KEY to `.env` files** - This would expose your private key in version control!

Example format (DO NOT commit this):
```json
{
  "type": "service_account",
  "project_id": "sk8hub-d7806",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-...@sk8hub-d7806.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token"
}
```

**Used by**:
- `packages/firebase/src/index.ts` (admin SDK initialization)
- `apps/server/server/admin.ts` (server-side Firebase operations)

### Important Security Notes
- ✅ **Firebase Client API Keys are PUBLIC** - They're designed to be embedded in apps
- ✅ **google-services.json is safe to commit** - It contains public configuration
- ⚠️ **FIREBASE_ADMIN_KEY is SENSITIVE** - Store in Replit Secrets only
- 🔒 **Security is enforced by Firebase Security Rules**, not by hiding API keys

## Database Configuration

### Current Status
- ✅ **Database provisioned**: Replit PostgreSQL (Neon) - `DATABASE_URL` in environment
- ✅ **Schema file created**: `apps/server/db/schema.ts` (unified from multiple sources)
- ✅ **Migration generated**: `apps/server/drizzle/0000_deep_otto_octavius.sql` (committed to repo)
- ✅ **Tables created**: **VERIFIED** via SQL query:
  ```sql
  SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';
  -- Result: 12 tables
  ```
- ⚠️ **Legacy schemas exist** but NOT used for active migrations:
  - `packages/db/src/index.ts` (original spots/challenges/check-ins definitions)
  - `apps/server/shared/schema.ts` (Zod schemas and additional auth tables)

### Active Schema
**Location**: `apps/server/db/schema.ts`  
**Source of Truth**: This file drives all database migrations via Drizzle Kit

### Drizzle Configuration
- **Config File**: `apps/server/drizzle.config.ts` (points to `./db/schema.ts`)
- **Migrations Dir**: `apps/server/drizzle/` (auto-generated SQL migrations)
- **Database**: Uses `DATABASE_URL` from Replit environment

### Database Tables (12 total - VERIFIED CREATED)
1. **users** - User profiles with UUID primary keys
2. **spots** - Skate spot locations (geo coordinates, creator)
3. **challenges** - S.K.A.T.E game challenges (rules, clips, status)
4. **check_ins** - User check-ins at spots (with proof videos)
5. **sessions** - Express session storage
6. **tutorial_steps** - Interactive tutorial content
7. **user_progress** - User tutorial completion tracking
8. **subscribers** - Email newsletter subscribers
9. **donations** - Payment/donation records
10. **custom_users** - Custom email/password auth users
11. **auth_sessions** - JWT session tokens
12. **feedback** - User feedback submissions

### Running Migrations
```bash
cd apps/server
npx drizzle-kit generate   # Generate SQL migration files
npm run db:push            # Push schema changes to database
npm run db:push --force    # Force push if data loss warnings
npm run db:studio          # Open Drizzle Studio UI (visual DB admin)
```

### Migration Best Practices
- **Never manually write SQL migrations** - Let Drizzle Kit generate them
- **Never change primary key types** (serial ↔ varchar) - This breaks existing data
- **Use `--force` flag** when prompted about data loss during development
- **Check existing schema** before making changes to avoid type conflicts

## User Preferences
- None documented yet

## Key Features

### ✅ Fully Functional (Frontend + Backend)
- **Landing Page**: Hero section, features, email signup
- **Authentication**: Email/password, Google OAuth, phone auth with Firebase
- **Navigation**: Full header menu with all routes
- **UI Components**: Complete shadcn/ui component library

### ⚠️ Functional Frontend (Needs Backend APIs)
- **Map Page**: Interactive spot map with geolocation, check-ins, add spots
- **S.K.A.T.E Game**: Full game UI with create/join/play logic
- **Leaderboard**: Rankings and stats display
- **Shop**: Product listings, cart, checkout flow
- **Closet**: User inventory management
- **Tutorial**: Onboarding flow
- **Profile Pages**: User profiles and stats

### 🚧 Needs Implementation
- Database migrations for spots, games, users, products tables
- Backend API endpoints: `/api/spots`, `/api/games`, `/api/products`
- Real-time game state management
- Video upload and storage for trick challenges
- Payment integration for shop checkout
