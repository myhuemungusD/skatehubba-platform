import { currentPlatform } from "@tamagui/constants";
var ALL_PLATFORMS = ["web", "android", "ios"];
function shouldRenderNativePlatform(nativeProp) {
  if (!nativeProp) return null;
  var userRequestedPlatforms = resolvePlatformNames(nativeProp),
    _iteratorNormalCompletion = !0,
    _didIteratorError = !1,
    _iteratorError = void 0;
  try {
    for (var _iterator = ALL_PLATFORMS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var platform = _step.value;
      if (platform === currentPlatform && userRequestedPlatforms.has(platform)) return platform;
    }
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError) throw _iteratorError;
    }
  }
  return null;
}
function resolvePlatformNames(nativeProp) {
  var platforms = nativeProp === !0 ?
    // all native platforms
    ALL_PLATFORMS : nativeProp === !1 ?
    // no native platform
    [] : Array.isArray(nativeProp) ? nativeProp : [nativeProp],
    set = new Set(platforms);
  return set.has("mobile") && (set.add("android"), set.add("ios"), set.delete("mobile")), set;
}
export { shouldRenderNativePlatform };
//# sourceMappingURL=shouldRenderNativePlatform.native.js.map
