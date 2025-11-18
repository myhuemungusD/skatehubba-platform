# SkateHubba™ Monorepo

A full-stack skateboarding social platform built with modern tooling and Turborepo.

## 📁 Monorepo Structure

```
skatehubba-monorepo/
├── apps/
│   ├── web/             ← Next.js main web app
│   ├── mobile/          ← React Native/Expo mobile app
│   ├── server/          ← Express API backend
│   ├── landing/         ← Marketing site
│   ├── ar/              ← Unity AR build output
│   ├── admin/           ← Admin dashboard
│   └── studio/          ← Drizzle Studio dev tools
│
├── packages/
│   ├── gameundici/      ← Shared SKATE game engine & rules
│   ├── ui/              ← Shared UI components (React Native)
│   ├── api-sdk/         ← TypeScript API client
│   ├── firebase/        ← Firebase client + admin SDK
│   ├── db/              ← Drizzle ORM schema
│   ├── types/           ← Shared TypeScript types & Zod schemas
│   └── utils/           ← Shared utilities (geo, helpers)
│
├── turbo.json           ← Turborepo pipeline config
├── package.json         ← Workspace root
└── README.md
```

## 🚀 Quick Start

### Installation
```bash
pnpm install
```

### Development

Run all apps in parallel:
```bash
pnpm dev
```

Run specific apps:
```bash
pnpm dev:web        # Next.js web app (port 5000)
pnpm dev:mobile     # Expo mobile app
pnpm dev:server     # Express API (port 8000)
pnpm dev:landing    # Marketing site (port 3000)
pnpm dev:admin      # Admin dashboard (port 3001)
pnpm dev:studio     # Drizzle Studio
```

### Mobile Setup
```bash
cd apps/mobile
npx expo install --fix
npx expo start
```

## 🏗️ Build & Deploy

### Build All
```bash
pnpm build
```

### Type Checking
```bash
pnpm typecheck
```

### Linting
```bash
pnpm lint
```

## 📱 Mobile App Ship

```bash
# Build for production
eas build --platform all --profile production

# Submit to app stores
eas submit --platform all --latest
```

## 🔥 Firebase Deployment

```bash
cd packages/firebase
pnpm deploy:functions
pnpm deploy:rules
```

## 🗄️ Database

```bash
# Open Drizzle Studio
pnpm dev:studio

# Generate migrations
cd packages/db
pnpm generate

# Run migrations
pnpm migrate
```

## 📦 Package Management

This monorepo uses **pnpm workspaces** and **Turborepo** for efficient package management and task running.

### Adding Dependencies

```bash
# Add to specific app
pnpm add <package> --filter @skatehubba/web

# Add to specific package
pnpm add <package> --filter @skatehubba/ui

# Add to root (dev tools only)
pnpm add -D <package> -w
```

## 🧹 Clean

Remove all node_modules and build artifacts:
```bash
pnpm clean
```

## 🎯 Apps Overview

- **web**: Main Next.js web application
- **mobile**: React Native/Expo mobile app for iOS & Android
- **server**: Express REST API backend
- **landing**: Marketing website
- **ar**: Unity AR experience build output
- **admin**: Internal admin dashboard
- **studio**: Database management tools

## 📚 Packages Overview

- **gameundici**: SKATE game logic & state management
- **ui**: Shared React Native components & theme
- **api-sdk**: Type-safe API client for all apps
- **firebase**: Firebase configuration & Cloud Functions
- **db**: Drizzle ORM schemas & migrations
- **types**: Shared TypeScript interfaces & Zod validators
- **utils**: Common utilities (geo calculations, etc.)
