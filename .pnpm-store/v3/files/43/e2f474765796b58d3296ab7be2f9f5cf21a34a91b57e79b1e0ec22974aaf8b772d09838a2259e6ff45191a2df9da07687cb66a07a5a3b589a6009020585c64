var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var shouldRenderNativePlatform_exports = {};
__export(shouldRenderNativePlatform_exports, {
  shouldRenderNativePlatform: () => shouldRenderNativePlatform
});
module.exports = __toCommonJS(shouldRenderNativePlatform_exports);
var import_constants = require("@tamagui/constants");
const ALL_PLATFORMS = ["web", "android", "ios"];
function shouldRenderNativePlatform(nativeProp) {
  if (!nativeProp)
    return null;
  const userRequestedPlatforms = resolvePlatformNames(nativeProp);
  for (const platform of ALL_PLATFORMS)
    if (platform === import_constants.currentPlatform && userRequestedPlatforms.has(platform))
      return platform;
  return null;
}
function resolvePlatformNames(nativeProp) {
  const platforms = nativeProp === !0 ? ALL_PLATFORMS : nativeProp === !1 ? [] : Array.isArray(nativeProp) ? nativeProp : [nativeProp], set = new Set(platforms);
  return set.has("mobile") && (set.add("android"), set.add("ios"), set.delete("mobile")), set;
}
//# sourceMappingURL=shouldRenderNativePlatform.js.map
