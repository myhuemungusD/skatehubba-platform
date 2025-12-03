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
