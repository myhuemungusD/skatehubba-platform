# @skatehubba/web

The official **SkateHubba™ web platform** — built with **Next.js 14 App Router**, SSR, and deployed on Vercel.

Live at → https://skatehubba.com

## Features

- Full SSR + SEO (spot pages, profiles, leaderboards)
- Real-time data via Firebase
- Shared UI, types, and state with mobile app
- PWA ready (installable)
- Deep linking (`/spot/el-toro`, `/user/jason`)
- Gritty Baker-era design system

---

## 🛠️ Development

To start the web application (Next.js) and begin development, you must run the development script from the **monorepo root** directory.

### 1. Launch Web Only

This command starts **only the Next.js development server**.

```bash
# From monorepo root:
pnpm dev --filter @skatehubba/web
