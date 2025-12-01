# @skatehubba/ui

**The single source of truth for SkateHubba™ design system** — shared across **mobile (Expo) AND web (Next.js)**.

One brand. One vibe. Zero duplication.

## Philosophy

> **"If it doesn't look like Baker x Shake Junt in 2025, it's not SkateHubba."**

Every button, card, text style, color, and animation lives here — and is used **identically** on:
- iOS
- Android
- Web (desktop + mobile web)
- PWA

## What's Inside

| Export              | Description                                   |
|---------------------|-----------------------------------------------|
| `SKATE`             | Full design tokens (colors, radius, timing)   |
| `GrittyButton`      | The blood-red, neon-bordered button           |
| `SpotCard`          | 3D spot preview with check-in count           |
| `Avatar`            | Skater avatar with outfit + deck              |
| `Toast`             | Global toast with grime texture               |
| `theme/`            | Tailwind + React Native styles                |

## Usage (Mobile + Web)

```tsx
import { GrittyButton, SKATE } from '@skatehubba/ui';

<GrittyButton>
  START S.K.A.T.E.
</GrittyButton>
