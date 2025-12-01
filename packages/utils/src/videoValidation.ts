// import { Asset } from 'expo-media-library'; // If needed for local validation
// Mocking Asset type for now to avoid dependency issues if not installed in utils
interface Asset {
  duration: number;
  fileSize?: number;
  mediaType: string;
  width: number;
  height: number;
}

export function validateVideoAsset(asset: Asset): boolean {
  const isValidDuration = asset.duration >= 14.5 && asset.duration <= 15.5;
  const isValidSize = (asset.fileSize || 0) <= 8 * 1024 * 1024;
  const isValidCodec = asset.mediaType === 'video' && asset.width >= 1280 && asset.height >= 720; // 720p min
  return isValidDuration && isValidSize && isValidCodec;
}
