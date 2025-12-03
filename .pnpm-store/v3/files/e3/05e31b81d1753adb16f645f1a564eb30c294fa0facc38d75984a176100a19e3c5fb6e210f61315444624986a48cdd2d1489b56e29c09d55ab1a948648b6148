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
var webToNativeProps_native_exports = {};
__export(webToNativeProps_native_exports, {
  webToNativeDynamicExpansion: () => webToNativeDynamicExpansion,
  webToNativeExpansion: () => webToNativeExpansion
});
module.exports = __toCommonJS(webToNativeProps_native_exports);
var _loop = function (parent) {
    var _exec,
      _exec_index,
      prefix = parent.slice(0, (_exec_index = (_exec = /[A-Z]/.exec(parent)) === null || _exec === void 0 ? void 0 : _exec.index) !== null && _exec_index !== void 0 ? _exec_index : parent.length);
    expansionsNoPrefix[parent] = expansionsNoPrefix[parent].map(function (k) {
      return `${prefix}${k}`;
    });
  },
  resizeModeMap = {
    fill: "stretch",
    none: "center",
    "scale-down": "contain",
    contain: "contain",
    cover: "cover"
  },
  verticalAlignMap = {
    top: "top",
    middle: "center",
    bottom: "bottom",
    auto: "auto"
  },
  webToNativeDynamicExpansion = {
    objectFit: function (val) {
      var resizeMode = resizeModeMap[val] || "cover";
      return [["resizeMode", resizeMode]];
    },
    verticalAlign: function (val) {
      return [["textAlignVertical", verticalAlignMap[val] || "auto"]];
    }
  },
  vert = ["Top", "Bottom"],
  es = ["End", "Start"],
  t = ["Top"],
  b = ["Bottom"],
  s = ["Start"],
  e = ["End"],
  h = ["Height"],
  w = ["Width"],
  expansionsNoPrefix = {
    borderBlockColor: ["TopColor", "BottomColor"],
    borderInlineColor: ["EndColor", "StartColor"],
    borderBlockWidth: ["TopWidth", "BottomWidth"],
    borderInlineWidth: ["EndWidth", "StartWidth"],
    borderBlockStyle: ["TopStyle", "BottomStyle"],
    borderInlineStyle: ["EndStyle", "StartStyle"],
    marginBlock: vert,
    marginInline: es,
    paddingBlock: vert,
    paddingInline: es,
    borderBlockStartColor: ["TopColor"],
    borderBlockEndColor: ["BottomColor"],
    borderInlineStartColor: ["StartColor"],
    borderInlineEndColor: ["EndColor"],
    borderBlockStartWidth: ["TopWidth"],
    borderBlockEndWidth: ["BottomWidth"],
    borderInlineStartWidth: ["StartWidth"],
    borderInlineEndWidth: ["EndWidth"],
    borderBlockStartStyle: ["TopStyle"],
    borderBlockEndStyle: ["BottomStyle"],
    borderInlineStartStyle: ["StartStyle"],
    borderInlineEndStyle: ["EndStyle"],
    marginBlockStart: t,
    marginBlockEnd: b,
    marginInlineStart: s,
    marginInlineEnd: e,
    paddingBlockStart: t,
    paddingBlockEnd: b,
    paddingInlineStart: s,
    paddingInlineEnd: e,
    minBlockSize: h,
    maxBlockSize: h,
    minInlineSize: w,
    maxInlineSize: w
  };
for (var parent in expansionsNoPrefix) _loop(parent);
var expansions = {
    inset: ["top", "right", "bottom", "left"],
    insetBlock: ["top", "bottom"],
    insetBlockStart: ["top"],
    insetBlockEnd: ["bottom"],
    insetInlineStart: ["left"],
    insetInlineEnd: ["right"],
    blockSize: ["height"],
    inlineSize: ["width"]
  },
  webToNativeExpansion = Object.assign(expansionsNoPrefix, expansions);
//# sourceMappingURL=webToNativeProps.native.js.map
