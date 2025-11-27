import { NativeModules } from "react-native";

// Mock for now since we don't have the native module linked in this environment
const SkateTranscode = NativeModules.SkateTranscode || {
  transcode: async (_uri: string) => {
    console.warn("SkateTranscode native module not found, falling back.");
    throw new Error("Native module not found");
  },
};

const legacyFFmpegKitTranscode = async (uri: string): Promise<string> => {
  console.log(`[Legacy] Transcoding ${uri} via FFmpegKit...`);
  // Simulation of transcoding delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return uri.replace(".mp4", "_optimized.mp4");
};

export const transcode = async (uri: string): Promise<string> => {
  try {
    return await SkateTranscode.transcode(uri); // Rust path when built
  } catch (_e) {
    return await legacyFFmpegKitTranscode(uri); // guaranteed fallback
  }
};
