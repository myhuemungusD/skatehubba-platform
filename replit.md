# SkateHubba™ Monorepo

### Overview
SkateHubba™ is a full-stack skateboarding social platform comprising a React Native mobile app with avatar customization and S.K.A.T.E. video challenges, Next.js web apps (landing, admin), a Vite user-facing web app, and an Express API backend with PostgreSQL/Drizzle ORM and Firebase integration. Production-ready monorepo with clean separation of concerns and PlayStore standards.

**Architecture Status:** ✅ Production-ready monorepo - Apps/server is pure Express API (production-grade), packages/db provides shared TypeScript schemas, client apps run independently.

### User Preferences
- **Clean Architecture:** Strict separation between API backend (apps/server) and client apps (web/landing/mobile)
- **Production Standards:** Backend optimized for PlayStore/enterprise deployment (health checks, graceful shutdown, request tracing)
- **Fast Builds:** TypeScript compilation with tsup; pnpm workspaces + Turborepo

### System Architecture

**Backend (apps/server):**
- Pure Express REST API on port 8000 (or configurable via PORT env var)
- Health endpoints: `/api/health`, `/api/ready` (readiness), `/api/live` (liveness)
- Request ID tracing for distributed logging
- Graceful shutdown with 30-second connection timeout
- Helmet + CORS + compression for production security
- PostgreSQL via Drizzle ORM with Neon serverless
- Firebase Admin SDK for authentication & Firestore
- Environment validation on startup (Zod schemas)

**Frontend Apps:**
- Landing: Next.js 14 with Vercel deployment
- Admin: Next.js 14 dashboard with Tailwind
- Web: Vite SPA for user-facing features
- Mobile: React Native/Expo for iOS & Android (EAS builds)

**Database:** PostgreSQL managed by Drizzle ORM with unified schema in packages/db

**Build System:** Turborepo orchestrates parallel builds; TypeScript workspace packages compile via tsup

**CI/CD:** GitHub Actions workflow for Vercel deployments + EAS mobile builds

### Recent Changes (Session: Nov 21, 2025)
- ✅ Fixed Vercel deployment configuration (vercel.json with proper root/outputDirectory)
- ✅ Cleaned root package.json (removed invalid pnpm overrides)
- ✅ Updated admin app with Next.js dependencies
- ✅ Added GitHub Actions CI/CD workflow
- ✅ Implemented production-grade backend: health probes, request tracing, graceful shutdown
- ✅ Fixed TypeScript imports (drizzle-orm exports, storage utilities)
- ✅ Deprecated legacy routes.ts in favor of index.js production entry point
- ✅ Created production middleware for operational readiness

### Key Features
- **Mobile Avatar Closet:** 22 real skate products, 3D rotation, Firebase persistence
- **S.K.A.T.E. Challenges:** 15-second one-take video validation (planned)
- **Spot Management:** Check-ins with rewards
- **Authentication:** Firebase Auth (Email, OAuth, Phone)
- **AI Chat:** Heshur Chat with Gemini AI
- **Marketplace:** In-app shop with Stripe integration

### External Dependencies
- **Frontend:** Next.js 14, React 18, React Native/Expo, Vite
- **Backend:** Express 4, Drizzle ORM, Zod, bcryptjs, Stripe, Resend
- **Cloud:** Firebase (Auth, Firestore, Storage, Cloud Functions), Neon PostgreSQL
- **Build:** Turborepo, pnpm, TypeScript

### Deployment
- **Web:** Vercel (vercel.json configured for monorepo)
- **Mobile:** EAS Build (iOS .ipa, Android .aab)
- **Functions:** Firebase Cloud Functions (auto-deploy via CI/CD)
