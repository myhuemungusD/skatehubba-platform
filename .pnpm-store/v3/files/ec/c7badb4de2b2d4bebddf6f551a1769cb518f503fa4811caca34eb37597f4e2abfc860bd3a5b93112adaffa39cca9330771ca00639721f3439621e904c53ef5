"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var shouldRenderNativePlatform_exports = {};
__export(shouldRenderNativePlatform_exports, {
  shouldRenderNativePlatform: () => shouldRenderNativePlatform
});
module.exports = __toCommonJS(shouldRenderNativePlatform_exports);
var import_constants = require("@tamagui/constants"),
  ALL_PLATFORMS = ["web", "android", "ios"];
function shouldRenderNativePlatform(nativeProp) {
  if (!nativeProp) return null;
  var userRequestedPlatforms = resolvePlatformNames(nativeProp),
    _iteratorNormalCompletion = !0,
    _didIteratorError = !1,
    _iteratorError = void 0;
  try {
    for (var _iterator = ALL_PLATFORMS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var platform = _step.value;
      if (platform === import_constants.currentPlatform && userRequestedPlatforms.has(platform)) return platform;
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
//# sourceMappingURL=shouldRenderNativePlatform.native.js.map
