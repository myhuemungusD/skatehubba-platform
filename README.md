SkateHubba™ Monorepo

A full-stack, cross-platform skateboarding ecosystem built with Turborepo, Next.js, Expo, Firebase, Drizzle ORM, and modern TypeScript tooling.

This monorepo powers all SkateHubba™ apps:
Web Hub, Mobile App, SKATE Game Engine, Admin Panel, AR integrations, Database, and all shared internal packages.

🧠 Architectural Overview

The SkateHubba™ system uses a modular monorepo architecture optimized for:

High-speed development

Shared logic across all platforms

Unified type safety

Predictable CI/CD

Turborepo handles build orchestration and caching.
pnpm workspaces manage dependencies efficiently.

🗺️ Architecture Diagram (Conceptual)
               ┌────────────────────────────┐
               │          Clients            │
               │  web | mobile | admin       │
               └─────────────┬──────────────┘
                             │
                    Shared Business Logic
                             │
        ┌──────────────────────────────┬──────────────────────────────┐
        │                              │                              │
   @skatehubba/ui              @skatehubba/api-sdk            @skatehubba/skate-engine
   Cross-platform UI           Typed API Client                Pure SKATE Game Logic
        │                              │                              │
        └───────────────┬──────────────┴───────────────┬─────────────┘
                        Backend / Data Layer
                                │
                    apps/server (Express API)
                                │
                        @skatehubba/db
                        Drizzle ORM / Postgres
                                │
                        Firebase Auth / Functions

🔗 Dependency Graph (Concept)
Package / App	Depends On	Description
@skatehubba/mobile	ui, api-sdk, types, utils	Expo mobile client
@skatehubba/web	ui, api-sdk, types, utils	Next.js main web app
@skatehubba/server	db, skate-engine, types, utils	Express backend
@skatehubba/api-sdk	types	Typed client for server API
@skatehubba/skate-engine	types, utils	Pure functional SKATE logic
@skatehubba/db	types	Drizzle schema + migrations

Rule:
Packages never depend on apps. Apps depend on packages.

📦 Repository Structure
skatehubba-monorepo/
├── apps/
│   ├── web/            # Next.js 14 — Main Web Client
│   ├── mobile/         # Expo/React Native
│   ├── server/         # Express API Backend
│   ├── landing/        # Marketing Site
│   ├── ar/             # Unity AR Foundation build output
│   ├── admin/          # Internal Admin Dashboard
│   └── studio/         # Drizzle Studio
│
├── packages/
│   ├── skate-engine/   # SKATE rules, scoring engine
│   ├── ui/             # Shared React + RN components
│   ├── api-sdk/        # Typed API client
│   ├── firebase/       # Firebase client + Admin SDK
│   ├── db/             # Drizzle schema + migrations
│   ├── types/          # Shared TypeScript types
│   └── utils/          # Helpers, geo, misc utilities
│
├── .env.example        # Environment template
├── turbo.json          # Turborepo pipeline config
├── package.json        # Workspace root
└── README.md

⚙️ Prerequisites
Tool	Version	Notes
Node.js	v20.x LTS	Required
pnpm	8.15+	Required for workspaces
Git	Latest	—
Expo CLI	npm i -g expo-cli	Mobile tooling
Java	17	Android builds
Android Studio	Latest	Emulators + SDK
Xcode	Latest	iOS builds
Unity	2023 LTS	AR Foundation
🔐 Environment Variables

Each app loads its own .env.
Start by copying the example file:

cp .env.example .env

.env.example
# Firebase
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

# Web (Next.js)
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=

# Mobile (Expo)
EXPO_PUBLIC_API_URL=
EXPO_PUBLIC_FIREBASE_API_KEY=

# Server API
API_PORT=8000
DATABASE_URL=

# Drizzle
POSTGRES_URL=

🚀 Getting Started
Install dependencies
pnpm install

Run all apps in parallel
pnpm dev

Run a single app
pnpm dev:web
pnpm dev:mobile
pnpm dev:server

Mobile Development
cd apps/mobile
npx expo install --fix
npx expo start

⚙️ Build & Test Matrix
Build everything
pnpm build

Type-check
pnpm typecheck

Lint
pnpm lint

Tests
pnpm test

Clean workspace
pnpm clean

🔄 CI/CD Pipeline (GitHub Actions + EAS)
Stage	Trigger	Action	Output
1. CI Validation	push / PR to main	build, typecheck, lint, test	PR must pass
2. Deploy Web	merge to main	Vercel deploy	Live Web Hub
3. Deploy API	merge to main	Render/Railway deploy	Live API
4. Deploy Mobile	merge to main	Expo EAS build + submit	TestFlight / Play Store
5. Firebase Deploy	merge to main	Functions + Rules	Live endpoints
🌿 Branching Strategy
Branches

main — Production-ready

feature/* — New feature

fix/* — Bug fixes

hotfix/* — Urgent patches

Rules

Never commit directly to main

All changes go through PRs

PRs must pass CI

📐 Code Standards
TypeScript

strict: true everywhere

No any, no @ts-ignore

Linting

ESLint + Prettier

No console logs in production

Testing

Unit + E2E tests required

Target: 80%+ coverage

Performance

Next.js Cold Start < 2.5s

Mobile target: 60 fps on mid-range devices

📝 Commit Conventions (Conventional Commits)
Type	Description
feat	New feature
fix	Bug fix
perf	Performance improvement
refactor	Cleanup that doesn't add features
docs	Documentation changes
chore	Tooling, deps, configs
test	Tests only

Example:

feat(mobile): add spot discovery map

⚠️ Troubleshooting
Problem	Root Cause	Fix
Cached builds not updating	Turbo cache stale	pnpm clean
Expo errors	Dependency mismatch	npx expo install --fix
Web API 500 errors	Missing env vars	Verify .env + server running
Schema mismatch	Drizzle out-of-sync	pnpm generate && pnpm migrate
🧑‍💻 Developer Onboarding

Install prerequisites

Clone repo

pnpm install

Copy .env.example → .env

Run dev: pnpm dev

Create a feature branch

Follow commit rules

Open PR

📄 License

Proprietary — © Design Mainline LLC. All Rights Reserved.

✨ SkateHubba™

Own Your Tricks.
Real spots. Real skaters. Real community.
Powered by Design Mainline LLC.

If you want, I can now generate:

A matching CONTRIBUTING.md

A SECURITY.md

A full architecture diagram SVG for GitHub

A developer onboarding PDF

A full CI/CD GitHub Actions workflow

Just tell me what you want next.
