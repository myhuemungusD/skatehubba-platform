import { currentPlatform } from "@tamagui/constants";
function isActivePlatform(key) {
  if (!key.startsWith("$platform")) return !0;
  const platform = key.slice(10);
  return (
    // web, ios, android
    platform === currentPlatform ||
    // web, native
    platform === "web"
  );
}
export { isActivePlatform };
//# sourceMappingURL=isActivePlatform.mjs.map
