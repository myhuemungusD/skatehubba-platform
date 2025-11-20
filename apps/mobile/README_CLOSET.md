# 🎒 Closet System - Quick Reference

## What You Just Got

A complete **avatar customization and inventory management system** for your React Native mobile app.

### 🎯 Features
- ✅ **Avatar Renderer** - Displays user's equipped items in real-time
- ✅ **8 Item Categories** - Tops, bottoms, deck, trucks, wheels, bearings, hardware, stickers
- ✅ **3D Rotation Animation** - Avatar spins when equipping items
- ✅ **Category Tabs** - Swipe through item categories
- ✅ **Item Grid** - View owned items, tap to equip
- ✅ **Firebase Integration** - Firestore for persistence
- ✅ **React Query** - Smart data fetching and caching

---

## 📁 Files Created

```
apps/mobile/
├── app/
│   └── closet/
│       └── index.tsx                 ← Main screen
├── components/
│   └── closet/
│       ├── AvatarRenderer.tsx        ← 3D avatar display
│       ├── EquippedDisplay.tsx       ← Equipment stats overlay
│       ├── CategoryTabs.tsx          ← Category selector
│       ├── ItemGrid.tsx              ← Item grid with tap-to-equip
│       ├── types.ts                  ← TypeScript types
│       └── index.ts                  ← Barrel exports
├── assets/
│   └── closet/
│       ├── README.md                 ← Asset guide
│       └── shop-interior.jpg.placeholder  ← Replace with real image
├── lib/
│   └── firebase.ts                   ← Firebase helpers (updated)
├── CLOSET_SYSTEM.md                  ← Full documentation
├── SETUP_CLOSET.md                   ← Setup guide
└── README_CLOSET.md                  ← This file
```

---

## 🚀 Quick Start

### 1. Add Background Image
Replace the placeholder:
```
apps/mobile/assets/closet/shop-interior.jpg
```

Get a free skate shop image from:
- Unsplash: https://unsplash.com/s/photos/skate-shop
- Pexels: https://www.pexels.com/search/skateboard%20shop/

### 2. Navigate to Closet
```tsx
import { router } from 'expo-router';

// Open closet
router.push('/closet');
```

### 3. Add Test Data (Firebase Console)
```javascript
// User's owned items
closet/{userId}
{
  owned: {
    top: ["plain_tee", "hoodie_black"],
    bottom: ["jeans_blue"],
    deck: ["classic_deck"]
  }
}

// User's equipped items
users/{userId}/public/equipment
{
  equipped: {
    top: "hoodie_black",
    bottom: "jeans_blue",
    deck: "classic_deck"
  }
}
```

---

## 🎮 How It Works

### User Flow
1. User opens closet (`/closet`)
2. Sees their avatar with equipped items
3. Swipes through categories
4. Taps item to equip it
5. Avatar rotates 360° (animation)
6. Item is equipped and saved to Firebase

### Data Flow
```
Firestore
   ↓
React Query (cache)
   ↓
Components (UI)
   ↓
User taps item
   ↓
Mutation (Firebase update)
   ↓
Query invalidation
   ↓
UI updates + animation
```

---

## 🛠️ Already Configured

✅ **React Query** - Wrapped in `app/_layout.tsx`  
✅ **Firestore** - Installed and configured  
✅ **Reanimated** - Installed for 3D rotation  
✅ **Route** - Registered in Stack navigator  
✅ **Theme** - Using `@skatehubba/ui` SKATE theme

---

## 📱 Navigation

### Own Closet
```tsx
router.push('/closet');
```

### Other User's Closet (view-only)
```tsx
router.push(`/closet?uid=${otherUserId}`);
```

---

## 🎨 Customization

### Change Colors
Edit `packages/ui/src/theme.ts`:
```typescript
export const SKATE = {
  colors: {
    gold: "#e3c300",   // Change this
    neon: "#39ff14",   // Or this
  }
};
```

### Add New Category
1. Add to `type Category` in `components/closet/types.ts`
2. Update `categories` array in `app/closet/index.tsx`
3. Add rendering logic in `AvatarRenderer.tsx`

---

## 🐛 Troubleshooting

**"Background image not found"**
→ Add `shop-interior.jpg` to `assets/closet/`

**"No items showing"**
→ Add test data to Firestore (see Quick Start #3)

**"Can't equip items"**
→ Make sure you're viewing your own closet, not another user's

**"Avatar not updating"**
→ Check Firebase data structure matches schema in docs

---

## 📖 Full Documentation

- **CLOSET_SYSTEM.md** - Complete system documentation
- **SETUP_CLOSET.md** - Detailed setup instructions
- **assets/closet/README.md** - Asset specifications

---

## 🎯 Next Steps

1. **Add shop screen** - Where users buy items with Hubba Bucks
2. **Add item images** - Real assets instead of placeholders
3. **Improve avatar** - Better graphics and animations
4. **Add rarity system** - Common, rare, epic, legendary items

---

**Ready to customize! 🛹**
