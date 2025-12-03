plan-skatehubbaAlignment.prompt.md
Then run it with the Workspace Agent.
=============================================
SKATEHUBBA PRODUCTION MONOREPO CONSTRUCTOR
=============================================
You are the GitHub Codespaces Workspace Agent.
Your mission is to convert the repository skatehubba-platform into a full, production-grade monorepo matching the SkateHubba Master Blueprint.
Follow these rules:
Do not delete functional code.
Do not overwrite working logic.
Do not move Unity build folders.
Do not duplicate Zustand or Firebase initializers.
Show all diffs before applying.
Ask for confirmation after each major phase.
🔥 MASTER BLUEPRINT REQUIREMENTS
APPS (must exist and be scaffolded)
apps/web → Next.js 14 (App Router)
apps/mobile → Expo + React Native
apps/server → Express + Drizzle
apps/admin
apps/landing
apps/ar → Unity AR Foundation project placeholder
SHARED PACKAGES (must exist and be aligned)
packages/db → Drizzle ORM schema + migrations
packages/types → Shared TS models
packages/firebase → Central Firebase initializer (auth, firestore, storage, messaging, appCheck)

packages/api-sdk → Shared API client

packages/skate-engine → Game logic for S.K.A.T.E.

packages/ui → Shared RN components

packages/utils → Helper utilities (geo, dates, ids, video, errors)

🔥 DATABASE (Drizzle + Neon Postgres)

Create /packages/db with:

Tables:

users

profiles

spots

checkins

skate_challenges

trick_attempts

avatars

inventory

notifications

Relations:

profiles.uid → users.uid

checkins.uid → users.uid

checkins.spot_id → spots.id

skate_challenges.challenger_uid → users.uid

skate_challenges.opponent_uid → users.uid

trick_attempts.challenge_id → skate_challenges.id

inventory.uid → users.uid

inventory.item_id → avatars.id

Drizzle Config:

connection via environment variable DATABASE_URL

output directory for migrations

TypeScript schema

Use this masked connection string for generating structure:

postgresql://neondb_owner:***@ep-noisy-boat-afbqmhef-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require


Do NOT insert the real password.
Leave *** and generate .env.example entries.

🔥 TYPES (packages/types)

Create or update types:

UserProfile
AvatarItem
SkateChallenge
TrickAttempt
Spot
CheckIn
LeaderboardEntry

Ensure schema ↔ types ↔ API responses all match.

🔥 FIREBASE (packages/firebase)

Create a unified Firebase initializer:

Exports must include:

app
auth
firestore
storage
messaging
appCheck


Replace all Firebase initializers in apps/web and apps/mobile with imports from this package.

🔥 API SDK (packages/api-sdk)

Create:

users.ts

spots.ts

challenges.ts

leaderboard.ts

Each module exports typed functions that call the Express backend.

🔥 EXPRESS BACKEND (apps/server)

Generate:

Routes:
/auth/verify
/users/:uid
/spots/nearby
/spots/checkin
/challenges/start
/challenges/turn
/challenges/complete
/leaderboard/global
/leaderboard/local

Middleware:

Firebase ID token verification

Error handler

Input validation

Controllers using Drizzle ORM.
🔥 WEB (apps/web)

Scaffold missing pages:

app/page.tsx
app/profile/page.tsx
app/spots/page.tsx
app/challenges/[id]/page.tsx


Use shared types + api-sdk + zustand.

Apply SkateHubba UI theme (dark THPS vibe).

🔥 MOBILE (apps/mobile)

Fix imports to use:

shared firebase

shared api-sdk

shared types

shared zustand stores

Scaffold missing screens:

app/profile/index.tsx
app/challenges/[id].tsx
app/spots/index.tsx


Enable FCM + AppCheck.

🔥 UTILITIES (packages/utils)

Create:

geo helpers

id generator

date formatting

firebase error mapping

video helpers

🔥 TURBO / PNPM / TS

Fix:

turbo.json

pnpm-workspace.yaml

root tsconfig.json

Ensure all apps and packages included.

===============================
EXECUTION PLAN (Agent Instructions)
===============================
PHASE 1: SCAN

Scan the repo and output a detailed mismatch report.

PHASE 2: PLAN

Propose the exact patch list for:

files to add

files to modify

imports to fix

routes to scaffold

schema files to create

Wait for confirmation.

PHASE 3: DIFF GENERATION

Generate diffs grouped by folder:

packages/db

apps/server

packages/api-sdk

apps/web

apps/mobile

configs

Wait for confirmation.

PHASE 4: APPLY

Apply changes after explicit yes.

PHASE 5: SUMMARY

Output a final summary:

files added

files updated

schema created

backend operational

===============================
START NOW
===============================

Begin with PHASE 1: SCAN.
Scan the repository and produce the mismatch report.

Do NOT apply changes until instructed.