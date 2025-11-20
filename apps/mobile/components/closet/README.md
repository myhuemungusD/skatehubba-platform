# Closet Components

React Native components for the SkateHubba closet/avatar customization system.

## Components

### `<AvatarRenderer />`
Displays a stylized 3D avatar with equipped items.

```tsx
import { AvatarRenderer } from '@/components/closet';

<AvatarRenderer
  equipped={{
    top: 'hoodie_black',
    bottom: 'jeans_blue',
    deck: 'classic_deck',
    trucks: 'standard_trucks',
    wheels: 'street_wheels_52mm'
  }}
  size={400}
/>
```

### `<EquippedDisplay />`
Shows equipment stats (hardware/bearings count).

```tsx
import { EquippedDisplay } from '@/components/closet';

<EquippedDisplay
  equipped={{
    hardware: 'allen_bolts',
    bearings: 'abec_7'
  }}
/>
```

### `<CategoryTabs />`
Horizontal scrollable category selector.

```tsx
import { CategoryTabs } from '@/components/closet';

<CategoryTabs
  categories={['TOP', 'BOTTOM', 'DECK', 'TRUCKS']}
  selected="TOP"
  onSelect={(category) => console.log(category)}
/>
```

### `<ItemGrid />`
Grid of owned items with tap-to-equip.

```tsx
import { ItemGrid } from '@/components/closet';

<ItemGrid
  category="top"
  ownedItems={['plain_tee', 'hoodie_black', 'jacket_red']}
  equippedId="hoodie_black"
  onEquip={(itemId) => equipItem(itemId)}
  disabled={false}
/>
```

## Types

```typescript
import type { Category, ClosetItem, UserCloset, EquippedItems } from '@/components/closet';

type Category = 'top' | 'bottom' | 'deck' | 'trucks' | 'wheels' | 'bearings' | 'hardware' | 'stickers';

interface ClosetItem {
  id: string;
  category: Category;
  name: string;
  price: number;
}

interface UserCloset {
  userId: string;
  owned: Partial<Record<Category, string[]>>;
  equipped: Partial<Record<Category, string>>;
}
```

## Usage in Screen

See `app/closet/index.tsx` for complete implementation example.
