# 🚀 Closet Setup Guide

## Quick Start

Your closet system is ready! Here's what you need to do:

### 1️⃣ Install Missing Dependencies (if needed)

```bash
cd apps/mobile

# Install required packages
pnpm add react-native-reanimated
pnpm add @tanstack/react-query
pnpm add @react-native-firebase/firestore
```

### 2️⃣ Add Background Image

Add a shop interior background image:
```
apps/mobile/assets/closet/shop-interior.jpg
```

**Find free images:**
- Unsplash: https://unsplash.com/s/photos/skate-shop
- Pexels: https://www.pexels.com/search/skateboard%20shop/

Or use a dark gradient as placeholder.

### 3️⃣ Configure React Native Reanimated

Add to `babel.config.js`:
```javascript
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Must be last!
  ],
};
```

### 4️⃣ Set Up React Query Provider

Wrap your app with `QueryClientProvider` in `app/_layout.tsx`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app content */}
    </QueryClientProvider>
  );
}
```

### 5️⃣ Initialize Sample Data (Development)

Add test items to your Firestore:

```javascript
// Run this in Firebase Console or a script
const uid = 'your-user-id';

// Add owned items
await setDoc(doc(db, 'closet', uid), {
  owned: {
    top: ['plain_tee', 'hoodie_black'],
    bottom: ['jeans_blue', 'shorts_black'],
    deck: ['classic_deck'],
    trucks: ['standard_trucks'],
    wheels: ['street_wheels_52mm'],
  }
});

// Set equipped items
await setDoc(doc(db, 'users', uid, 'public', 'equipment'), {
  equipped: {
    top: 'hoodie_black',
    bottom: 'jeans_blue',
    deck: 'classic_deck',
    trucks: 'standard_trucks',
    wheels: 'street_wheels_52mm',
  }
});
```

### 6️⃣ Navigate to Closet

Add navigation to your app:

```tsx
import { router } from 'expo-router';

<Button onPress={() => router.push('/closet')}>
  Open Closet
</Button>
```

---

## 📁 What Was Created

```
apps/mobile/
├── app/
│   └── closet/
│       └── index.tsx                 ✅ Main closet screen
├── components/
│   └── closet/
│       ├── AvatarRenderer.tsx        ✅ Avatar display
│       ├── EquippedDisplay.tsx       ✅ Equipment stats
│       ├── CategoryTabs.tsx          ✅ Category selector
│       ├── ItemGrid.tsx              ✅ Item grid
│       ├── types.ts                  ✅ TypeScript types
│       └── index.ts                  ✅ Exports
├── assets/
│   └── closet/
│       └── README.md                 ✅ Asset guide
├── lib/
│   └── firebase.ts                   ✅ Firebase helpers (updated)
├── CLOSET_SYSTEM.md                  ✅ Full documentation
└── SETUP_CLOSET.md                   ✅ This guide
```

---

## ✅ Checklist

- [ ] Install `react-native-reanimated`
- [ ] Install `@tanstack/react-query`
- [ ] Install `@react-native-firebase/firestore`
- [ ] Add background image
- [ ] Configure Reanimated in `babel.config.js`
- [ ] Add `QueryClientProvider` to `_layout.tsx`
- [ ] Add sample data to Firestore
- [ ] Test navigation to `/closet`

---

## 🎯 Next Steps

1. **Add Shop Screen** - Where users buy items
2. **Add Item Images** - Real assets for each item
3. **Improve Avatar** - Better rendering with actual clothing
4. **Add Purchase Flow** - Hubba Bucks → Unlock items

---

## 🐛 Common Issues

**"Cannot find module 'react-native-reanimated'"**
→ Run `pnpm add react-native-reanimated`

**"Cannot find module '@tanstack/react-query'"**
→ Run `pnpm add @tanstack/react-query`

**"Cannot read property 'rotateY' of undefined"**
→ Add Reanimated plugin to `babel.config.js`

**"Background image not found"**
→ Add `shop-interior.jpg` to `assets/closet/`

---

**Ready to skate! 🛹**
