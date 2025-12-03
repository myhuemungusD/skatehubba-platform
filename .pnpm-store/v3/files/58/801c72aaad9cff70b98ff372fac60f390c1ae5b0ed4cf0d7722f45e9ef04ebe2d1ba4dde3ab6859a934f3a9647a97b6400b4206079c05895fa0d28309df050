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
var Stacks_exports = {};
__export(Stacks_exports, {
  XStack: () => XStack,
  YStack: () => YStack,
  ZStack: () => ZStack,
  fullscreenStyle: () => fullscreenStyle
});
module.exports = __toCommonJS(Stacks_exports);
var import_core = require("@tamagui/core"),
  import_getElevation = require("./getElevation.native.js");
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var fullscreenStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  getInset = function (val) {
    return val && (typeof val > "u" ? "undefined" : _type_of(val)) === "object" ? val : {
      top: val,
      left: val,
      bottom: val,
      right: val
    };
  },
  variants = {
    fullscreen: {
      true: fullscreenStyle
    },
    elevation: {
      "...size": import_getElevation.getElevation,
      ":number": import_getElevation.getElevation
    },
    inset: getInset
  },
  YStack = (0, import_core.styled)(import_core.View, {
    flexDirection: "column",
    variants
  });
YStack.displayName = "YStack";
var XStack = (0, import_core.styled)(import_core.View, {
  flexDirection: "row",
  variants
});
XStack.displayName = "XStack";
var ZStack = (0, import_core.styled)(YStack, {
  position: "relative"
}, {
  neverFlatten: !0,
  isZStack: !0
});
ZStack.displayName = "ZStack";
//# sourceMappingURL=Stacks.native.js.map
