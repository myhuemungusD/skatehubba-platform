"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var constants_native_exports = {};
__export(constants_native_exports, {
  IS_REACT_19: () => IS_REACT_19,
  currentPlatform: () => currentPlatform,
  isAndroid: () => isAndroid,
  isChrome: () => isChrome,
  isClient: () => isClient,
  isIos: () => isIos,
  isServer: () => isServer,
  isTouchable: () => isTouchable,
  isWeb: () => isWeb,
  isWebTouchable: () => isWebTouchable,
  isWindowDefined: () => isWindowDefined,
  useIsomorphicLayoutEffect: () => useIsomorphicLayoutEffect
});
module.exports = __toCommonJS(constants_native_exports);
var import_react = __toESM(require("react"), 1),
  import_react_native = require("react-native"),
  IS_REACT_19 = typeof import_react.default.use < "u",
  isWeb = !1,
  isWindowDefined = !1,
  isServer = !1,
  isClient = !1,
  useIsomorphicLayoutEffect = import_react.useLayoutEffect,
  isChrome = !1,
  isWebTouchable = !1,
  isTouchable = !0,
  isAndroid = import_react_native.Platform.OS === "android" || process.env.TEST_NATIVE_PLATFORM === "android",
  isIos = import_react_native.Platform.OS === "ios" || process.env.TEST_NATIVE_PLATFORM === "ios",
  platforms = {
    ios: "ios",
    android: "android"
  },
  currentPlatform = platforms[import_react_native.Platform.OS] || "native";
//# sourceMappingURL=constants.native.js.map
