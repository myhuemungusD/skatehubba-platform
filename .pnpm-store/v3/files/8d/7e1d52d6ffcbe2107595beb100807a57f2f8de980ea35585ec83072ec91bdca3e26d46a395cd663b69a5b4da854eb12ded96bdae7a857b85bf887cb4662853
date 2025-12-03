import { currentPlatform } from "@tamagui/constants";
function isActivePlatform(key) {
  if (!key.startsWith("$platform")) return !0;
  var platform = key.slice(10);
  return (
    // web, ios, android
    platform === currentPlatform ||
    // web, native
    platform === "native"
  );
}
export { isActivePlatform };
//# sourceMappingURL=isActivePlatform.native.js.map
