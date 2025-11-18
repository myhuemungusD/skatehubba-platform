# SkateHubba™ Monorepo

## Overview
Full-stack skateboarding social platform with React Native mobile app, Next.js web app, Express API backend, and Unity AR integration. Built as a modern monorepo using pnpm workspaces and Turborepo.

## Recent Changes (November 18, 2025)
- **Major restructure**: Converted to complete monorepo architecture
- Created 7 app directories: web, mobile, server, landing, ar, admin, studio
- Created 7 package directories: gameundici, ui, api-sdk, firebase, db, types, utils
- Migrated Firebase infrastructure from `infra/` to `packages/firebase`
- Added Turborepo for efficient task running and build orchestration
- Established workspace dependencies and proper package naming conventions

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
- **Database**: Drizzle ORM (PostgreSQL)
- **Firebase**: Authentication, Firestore, Cloud Functions, Storage
- **Build Tool**: Turborepo
- **Package Manager**: pnpm
- **Language**: TypeScript

## User Preferences
- None documented yet

## Key Features
- SKATE game mechanics (one-on-one trick challenges)
- 3D map with geofenced check-ins (60m radius)
- 15-second one-take video challenges
- Firebase-based authentication and storage
- Real-time challenge notifications
- AI skate coach (Heshur) using Gemini
