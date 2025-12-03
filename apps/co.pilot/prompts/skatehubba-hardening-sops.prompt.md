You are operating inside the SkateHubba PNPM + Turborepo monorepo.

GOAL
- Enforce strict TypeScript across all workspaces.
- Add CI so typecheck + lint + tests must pass before merge.
- Do NOT change features, APIs, or folder structure.
- Do NOT introduce new app logic or refactor business code.

Do the following steps exactly:

--------------------------------
1) Create root TS strict config
--------------------------------

Create or replace `/tsconfig.base.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUncheckedIndexedAccess": true,
    "useUnknownInCatchVariables": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    "skipLibCheck": false,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}
If any framework (Next.js, Expo, etc.) complains about moduleResolution, adjust for that app ONLY, but keep strict: true and the other strictness flags.

Make workspaces extend the base

Update these (only if they exist):

apps/mobile/tsconfig.json

apps/web/tsconfig.json

apps/server/tsconfig.json

packages/api-sdk/tsconfig.json

packages/db/tsconfig.json

packages/types/tsconfig.json

functions/tsconfig.json (Firebase functions, if present)

For each, make the file look like this (fix the extends path if depth is different):

{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}


If a workspace already has framework-specific options (like jsx, paths, types), keep them and merge them into compilerOptions instead of deleting them.

Add root scripts for checks

In /package.json, under "scripts", ensure these exist:

"scripts": {
  "typecheck": "tsc --noEmit",
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "test": "jest --passWithNoTests"
}


Do NOT remove any existing scripts. Only add/merge these three.

Configure Turbo pipelines

Edit /turbo.json and make sure it has at least:

{
  "pipeline": {
    "typecheck": { "outputs": [] },
    "lint":      { "outputs": [] },
    "test":      { "outputs": [] },
    "build":     { "dependsOn": ["^build"] },
    "dev":       { "cache": false }
  }
}


If pipeline already has entries, merge these keys into it instead of replacing the whole object.

Add CI workflow for type/lint/test

Create or replace .github/workflows/ci.yml with:

name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Type check
        run: pnpm turbo run typecheck --continue
      - name: Lint
        run: pnpm turbo run lint --continue
      - name: Run tests
        run: pnpm turbo run test --continue


(Optional) EAS submit workflow

You can only just add this if SkateHubba mobile is actually ready to build and submit.

Create .github/workflows/eas-submit.yml:

Name: EAS Build & Submit

On:
  workflow_dispatch:

Jobs:
  Build:
    runs-on: ubuntu-latest

    Steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Expo login
        run: expo login -u ${{ secrets.EXPO_USERNAME }} -p ${{ secrets.EXPO_PASSWORD }}
      - name: Build iOS
        run: pnpm --filter apps/mobile eas build --platform ios --non-interactive
      - name: Submit to App Store
        run: pnpm --filter apps/mobile eas submit -p ios --non-interactive


Firebase functions strict mode (if present)

If/functions/functions/tsconfig.json exists, set it to:

{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitOverride": true,
    "types": ["firebase-functions"]
  },
  "include": ["src"]
}


Run and fix the checks.

After updating all configs, run these from the repo root:

pnpm turbo run typecheck
pnpm turbo run lint
pnpm turbo run test


Fix any TypeScript and ESLint errors by:

Adding missing types.

Handling undefined/null.

Fixing unknown catch variables.

Cleaning unused variables and imports.

DO NOT:

Turn off strict.

Remove noUncheckedIndexedAccess.

Loosen types just to “make it pass”.

Comment out checks.

The goal is a strict, passing codebase with CI enforcing these checks on every push and pull request.


---

This is the version I’d actually trust in your repo:

- It’s **tighter** than the previous ones.
- It’s **focused exactly on your priorities**.
- It tells Copilot what to change and what **not** to touch.
- It minimises the risk of it doing something wild.

If you want, the next step I can give you:

- A tiny one-liner you say to Copilot in Codespaces to make it actually use this plan file.
::contentReference[oaicite:0]{index=0}
