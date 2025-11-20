# 🎒 SkateHubba Closet System

## Overview

The Closet (aka "Backpack") is the avatar customization and inventory management system where users can:
- **View their collection** of unlocked items
- **Equip items** to customize their avatar
- **Browse by category** (clothing, deck parts, accessories)
- **See equipped items** reflected on their avatar in real-time

---

## 📁 File Structure

```
apps/mobile/
├── app/
│   └── closet/
│       └── index.tsx                 ← Main closet screen
├── components/
│   └── closet/
│       ├── AvatarRenderer.tsx        ← 3D-style avatar with equipped items
│       ├── EquippedDisplay.tsx       ← Shows equipped hardware/bearings count
│       ├── CategoryTabs.tsx          ← Category selection tabs
│       ├── ItemGrid.tsx              ← Grid of owned items
│       ├── types.ts                  ← TypeScript types
│       └── index.ts                  ← Barrel export
└── assets/
    └── closet/
        └── shop-interior.jpg         ← Background image (add this)
```

---

## 🎯 Features

### 1. **Avatar Renderer** (`AvatarRenderer.tsx`)

Displays a simplified avatar with:
- **Head** (skin tone)
- **Torso** (equipped top clothing)
- **Legs** (equipped bottom clothing)
- **Skateboard** with deck, trucks, wheels
- **Stickers** overlaid on deck

**Props:**
```tsx
<AvatarRenderer
  equipped={{
    top: 'hoodie_black',
    bottom: 'jeans_blue',
    deck: 'classic_deck',
    trucks: 'standard_trucks',
    wheels: 'street_wheels_52mm',
  }}
  size={400}
/>
```

### 2. **Equipped Display** (`EquippedDisplay.tsx`)

Shows count of equipped consumable items:
- **Hardware** (bolts/screws)
- **Bearings** (ABEC-7, ABEC-9, etc.)

### 3. **Category Tabs** (`CategoryTabs.tsx`)

Horizontal scrollable tabs for:
- TOP (shirts, hoodies, jackets)
- BOTTOM (pants, shorts)
- DECK (skateboard decks)
- TRUCKS (skateboard trucks)
- WHEELS (skateboard wheels)
- BEARINGS (skateboard bearings)
- HARDWARE (bolts, screws)
- STICKERS (decorative stickers)

### 4. **Item Grid** (`ItemGrid.tsx`)

Grid layout showing:
- ✅ **Owned items** for selected category
- ✅ **Equipped badge** on currently equipped item
- ✅ **Tap to equip** (if own closet)
- ✅ **Empty state** if no items in category

---

## 🔄 Data Flow

### **Firestore Schema**

#### User Equipment (Public)
```
users/{uid}/public/equipment
{
  equipped: {
    top: "hoodie_black",
    bottom: "jeans_blue",
    deck: "classic_deck",
    trucks: "standard_trucks",
    wheels: "street_wheels_52mm",
    bearings: "abec_7",
    hardware: "allen_bolts",
    stickers: "brand_sticker_001"
  }
}
```

#### User Closet (Private Inventory)
```
closet/{uid}
{
  owned: {
    top: ["plain_tee", "hoodie_black", "jacket_red"],
    bottom: ["jeans_blue", "shorts_black"],
    deck: ["classic_deck", "street_deck"],
    trucks: ["standard_trucks"],
    wheels: ["street_wheels_52mm", "cruiser_wheels_60mm"],
    bearings: ["abec_7"],
    hardware: ["allen_bolts"],
    stickers: ["brand_sticker_001", "custom_sticker_002"]
  },
  equipped: { /* same as above */ }
}
```

### **Query Flow**

1. **Load closet data** (owned items)
   ```tsx
   useQuery(['closet', uid], async () => {
     const snap = await getDoc(doc(db, 'closet', uid));
     return snap.data();
   });
   ```

2. **Load equipped items** (public data for other users)
   ```tsx
   useQuery(['equipped', uid], async () => {
     const snap = await getDoc(doc(db, 'users', uid, 'public', 'equipment'));
     return snap.data()?.equipped;
   });
   ```

3. **Equip item mutation**
   ```tsx
   useMutation({
     mutationFn: async ({ category, itemId }) => {
       await setDoc(doc(db, 'users', uid, 'public', 'equipment'), {
         equipped: { ...equipped, [category]: itemId }
       }, { merge: true });
     }
   });
   ```

---

## 🎨 UI/UX Features

### **Avatar 3D Rotation Animation**
When user equips an item, the avatar spins 360°:
```tsx
const rotateY = useSharedValue(0);
rotateY.value = withTiming(360, { duration: 600 });
```

### **Own vs. Other User Closets**
```tsx
const isOwnCloset = !uid || uid === user?.uid;

// Show equip button only for own closet
{isOwnCloset && <Button>EQUIP</Button>}
```

### **Empty State**
If user has no items in a category:
```
┌─────────────────────────┐
│                         │
│   No top items yet      │
│   Visit the shop to     │
│   get gear!             │
│                         │
└─────────────────────────┘
```

---

## 🛒 Shopping Integration

The closet screen has a "GO TO SHOP" button:
```tsx
<Pressable onPress={() => router.push('/shop')}>
  <Text>GO TO SHOP</Text>
</Pressable>
```

This navigates to the in-app shop where users can:
- Browse items for purchase
- Spend Hubba Bucks to unlock items
- Add items to their closet

---

## 📱 Navigation

### **Route Structure**
```
/closet                    ← Own closet
/closet?uid={userId}       ← Other user's closet (view-only)
```

### **Accessing Closet**
```tsx
// Navigate to own closet
router.push('/closet');

// Navigate to another user's closet
router.push(`/closet?uid=${otherUserId}`);

// Go back
router.back();
```

---

## 🎭 Item Categories Explained

| Category | Description | Examples |
|----------|-------------|----------|
| **TOP** | Upper body clothing | T-shirts, hoodies, jackets |
| **BOTTOM** | Lower body clothing | Jeans, shorts, joggers |
| **DECK** | Skateboard deck | Classic, street, cruiser |
| **TRUCKS** | Skateboard trucks | Standard, hollow, colored |
| **WHEELS** | Skateboard wheels | Street (52mm), cruiser (60mm) |
| **BEARINGS** | Wheel bearings | ABEC-7, ABEC-9, ceramic |
| **HARDWARE** | Mounting bolts | Allen, Phillips, colored |
| **STICKERS** | Decorative stickers | Brand logos, custom art |

---

## 🔧 Adding New Items

### **1. Add Item to Firestore**
```javascript
// In shop or admin panel
await addDoc(collection(db, 'shop_items'), {
  id: 'hoodie_neon_green',
  category: 'top',
  name: 'Neon Green Hoodie',
  price: 500, // Hubba Bucks
  rarity: 'rare',
  imageUrl: 'https://...'
});
```

### **2. Add Item to User's Closet** (after purchase)
```javascript
await setDoc(doc(db, 'closet', uid), {
  owned: {
    top: arrayUnion('hoodie_neon_green')
  }
}, { merge: true });
```

### **3. Add Item Image**
Place image at:
```
apps/mobile/assets/closet/tops/hoodie_neon_green.png
```

---

## 🎯 Next Steps

### **Immediate**
- [x] Create closet components
- [x] Set up Firestore queries
- [x] Add category tabs
- [x] Add item grid
- [ ] Add placeholder background image

### **Short-term**
- [ ] Create shop screen (`/shop`)
- [ ] Add purchase flow (Hubba Bucks → unlock items)
- [ ] Add real item images
- [ ] Improve avatar renderer (better graphics)

### **Long-term**
- [ ] Add item rarity system (common, rare, epic, legendary)
- [ ] Add item stats (deck speed, wheel grip, etc.)
- [ ] Add animation when equipping items
- [ ] Add sharing (screenshot equipped avatar)
- [ ] Add seasonal/limited items

---

## 🐛 Troubleshooting

### **Issue: "No items showing"**
**Solution:** Check Firestore data structure matches schema above

### **Issue: "Can't equip items"**
**Solution:** Verify `isOwnCloset` is true and user is authenticated

### **Issue: "Background image not loading"**
**Solution:** Add `shop-interior.jpg` to `apps/mobile/assets/closet/`

### **Issue: "Avatar not rendering"**
**Solution:** Check equipped item IDs match owned items in closet

---

## 🎨 Styling Theme

Uses **SkateHubba UI Theme** (`@skatehubba/ui`):

```typescript
SKATE.colors = {
  ink: "#0a0a0a",      // Black background
  paper: "#f5f3ef",    // Off-white text
  neon: "#39ff14",     // Neon green accents
  grime: "#1c1c1c",    // Dark gray
  blood: "#b80f0a",    // Red alerts
  gold: "#e3c300"      // Gold highlights/buttons
}
```

**Font:** `BakerScript` (graffiti/street style)

---

**Built with 🛹 for SkateHubba™**
