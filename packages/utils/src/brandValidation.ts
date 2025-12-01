export const BRAND_MAP: Record<string, { name: string; vibe: 'gritty' | 'refined' | 'chaos' }> = {
  'PD': { name: 'Piss Drunk', vibe: 'chaos' },
  'Hours is Yours': { name: 'HIY', vibe: 'refined' },
  'Shake Junt': { name: 'Shake Junt', vibe: 'gritty' },
  Baker: { name: 'Baker', vibe: 'gritty' },
};

export function getBrandVibe(brandId: string): 'gritty' | 'refined' | 'chaos' {
  return BRAND_MAP[brandId]?.vibe || 'gritty';
}
