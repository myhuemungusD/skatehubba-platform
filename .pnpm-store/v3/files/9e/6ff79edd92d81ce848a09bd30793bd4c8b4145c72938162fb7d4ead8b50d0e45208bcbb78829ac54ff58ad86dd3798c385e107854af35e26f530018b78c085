import { currentPlatform } from "@tamagui/constants";
const ALL_PLATFORMS = ["web", "android", "ios"];
function shouldRenderNativePlatform(nativeProp) {
  if (!nativeProp) return null;
  const userRequestedPlatforms = resolvePlatformNames(nativeProp);
  for (const platform of ALL_PLATFORMS) if (platform === currentPlatform && userRequestedPlatforms.has(platform)) return platform;
  return null;
}
function resolvePlatformNames(nativeProp) {
  const platforms = nativeProp === !0 ? ALL_PLATFORMS : nativeProp === !1 ? [] : Array.isArray(nativeProp) ? nativeProp : [nativeProp],
    set = new Set(platforms);
  return set.has("mobile") && (set.add("android"), set.add("ios"), set.delete("mobile")), set;
}
export { shouldRenderNativePlatform };
//# sourceMappingURL=shouldRenderNativePlatform.mjs.map
