# SkateHubba™ — Production App

## Setup
1. `pnpm i`
2. `cd apps/mobile && npx expo install --fix`
3. `pnpm dev` (Metro + web preview)

## Ship
`eas build --platform all --profile production`
`eas submit --platform all`

## Tests
`pnpm test` (Unit)
`pnpm e2e` (Detox)

Firebase: Deploy rules/functions via `firebase deploy`.
Assets: Drop SkateHubbaWEB010.zip into `apps/mobile/assets/`.

## Ship Commands (Run in skatehubba/)
```bash
# Install
pnpm i

# Dev (iOS/Android/Web)
pnpm dev

# Build & Submit
eas build --platform all --profile production
eas submit --platform all --latest

# Deploy Firebase
cd infra/firebase
firebase deploy --only firestore:rules,functions
```
