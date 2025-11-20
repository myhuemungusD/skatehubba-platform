export type Category = 'top' | 'bottom' | 'deck' | 'trucks' | 'wheels' | 'bearings' | 'hardware' | 'stickers';

export interface ClosetItem {
  id: string;
  category: Category;
  name: string;
  description?: string;
  price: number;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  imageUrl?: string;
}

export interface UserCloset {
  userId: string;
  owned: Partial<Record<Category, string[]>>;
  equipped: Partial<Record<Category, string>>;
}

export interface EquippedItems {
  top?: string;
  bottom?: string;
  deck?: string;
  trucks?: string;
  wheels?: string;
  bearings?: string;
  hardware?: string;
  stickers?: string;
}
