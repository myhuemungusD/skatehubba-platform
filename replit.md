# SkateHubba™ Monorepo

### Overview
SkateHubba™ is a full-stack skateboarding social platform comprising a React Native mobile app, a Next.js web app, an Express API backend, and Unity AR integration. It aims to be a comprehensive platform for skateboarders to connect, engage in S.K.A.T.E. challenges, discover spots, and track progress. The project is built as a modern monorepo utilizing pnpm workspaces and Turborepo for efficient development and deployment. The platform includes a secure challenge adjudication system, robust authentication, and a scalable backend infrastructure designed for a growing user base and future features.

**Architecture Status:** ✅ Production-ready monorepo with clean separation of concerns - apps/server is a pure Express API backend (56MB), packages/db provides shared TypeScript-compiled database schemas, and client apps (web/landing/mobile) run independently.

### User Preferences
- **Clean Architecture:** Maintain strict separation between API backend (apps/server) and client apps (web/landing/mobile)
- **Dependency Management:** Remove client-only dependencies from server; keep bundle size under 70MB
- **Build Pipeline:** Use TypeScript compilation with tsup for workspace packages; generate .d.ts type declarations

### System Architecture
The project employs a monorepo structure with pnpm workspaces and Turborepo for managing multiple applications and packages.

**UI/UX Decisions:**
- **Web App**: Built with Next.js 14, utilizing a full header menu and a complete shadcn/ui component library for consistent UI.
- **Mobile App**: Developed with React Native/Expo for iOS & Android, featuring native Google Sign-In and Expo Router for navigation.
- **Design Approach**: Focuses on interactive elements such as an interactive spot map, a S.K.A.T.E game UI, and user profile pages.

**Technical Implementations:**
- **Monorepo Structure**: Organizes code into `apps/` (web, mobile, server, landing, ar, admin, studio) and `packages/` (gameundici, ui, api-sdk, firebase, db, types, utils) directories.
- **Authentication**: Firebase Authentication with Email/password, Google OAuth (popup and redirect), and phone authentication across web and mobile platforms. Secure server-side handling of sensitive credentials via Replit Secrets.
- **Database**: PostgreSQL managed by Drizzle ORM, with a unified schema defined in `packages/db/src/schema.ts` (compiled to JavaScript with TypeScript declarations). Migrations are handled via `npm run db:push`.
- **Backend**: Pure Express REST API (`apps/server`) for core functionalities, running on port 5000. Stripped of all client-side dependencies (React, Vite, Radix UI removed). Uses compiled `@skatehubba/db` workspace package for type-safe database access. Firebase Cloud Functions handle server-side logic including challenge adjudication, voting systems, and scheduled tasks.
- **Build System**: Turborepo orchestrates parallel builds and development. TypeScript workspace packages (e.g., `@skatehubba/db`) compile via tsup to JavaScript with .d.ts declarations.
- **Game Logic**: Core SKATE game logic and state management are encapsulated in `packages/gameundici`.
- **Shared Utilities**: Common functionalities like geolocation, distance calculations, and API types are shared via `packages/utils`, `packages/types`, and `packages/api-sdk`.
- **Firebase Integration**: Comprehensive Firebase setup including Firestore for data storage, Cloud Functions for backend logic, Storage for media, and Security Rules for access control.
- **AR Integration**: Unity AR experience build output directory (`apps/ar`) for augmented reality features.

**Feature Specifications:**
- **Core Features**: Landing page, full authentication, interactive map with spot management, S.K.A.T.E. game challenges, leaderboards, in-app shop, user closets, and interactive tutorials.
- **Challenge System**: Secure, server-validated challenge adjudication with anti-self-vote mechanisms, deadlines, and rewards (Hubba Bucks).
- **Spot Management**: Users can check-in at spots, add new spots, and receive rewards.
- **AI Integration**: Heshur Chat, a Gemini AI-powered skate mentor proxy.

### External Dependencies
- **Frontend Frameworks**: Next.js 14, React Native/Expo
- **Backend Framework**: Express, Node.js
- **Database**: PostgreSQL (Replit-hosted Neon database) managed by Drizzle ORM
- **Cloud Services**: Firebase (Authentication, Firestore, Cloud Functions, Storage)
    - Project ID: `sk8hub-d7806`
    - Storage Bucket: `sk8hub-d7806.firebasestorage.app`
    - Auth Domain: `sk8hub-d7806.firebaseapp.com`
- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **UI Libraries**: shadcn/ui (web), `@react-native-firebase/app`, `@react-native-firebase/auth`, `@react-native-google-signin/google-signin` (mobile)
- **AI**: Gemini AI (for Heshur Chat)