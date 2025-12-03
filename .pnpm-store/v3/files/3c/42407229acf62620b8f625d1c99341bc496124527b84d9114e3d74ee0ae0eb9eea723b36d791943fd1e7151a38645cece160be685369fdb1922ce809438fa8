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
var createGenericFont_exports = {};
__export(createGenericFont_exports, {
  createGenericFont: () => createGenericFont
});
module.exports = __toCommonJS(createGenericFont_exports);
var import_web = require("@tamagui/web"),
  genericFontSizes = {
    1: 10,
    2: 11,
    3: 12,
    4: 14,
    5: 15,
    6: 16,
    7: 20,
    8: 22,
    9: 30,
    10: 42,
    11: 52,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 124
  };
function createGenericFont(family) {
  var font = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    {
      sizeLineHeight = function (val) {
        return val * 1.35;
      }
    } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    size = font.size || genericFontSizes;
  return (0, import_web.createFont)({
    family,
    size,
    lineHeight: Object.fromEntries(Object.entries(size).map(function (param) {
      var [k, v] = param;
      return [k, sizeLineHeight(+v)];
    })),
    weight: {
      0: "300"
    },
    letterSpacing: {
      4: 0
    },
    ...font
  });
}
//# sourceMappingURL=createGenericFont.native.js.map
