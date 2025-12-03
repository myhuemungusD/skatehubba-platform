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
var index_exports = {};
__export(index_exports, {
  createSilkscreenFont: () => createSilkscreenFont
});
module.exports = __toCommonJS(index_exports);
var import_core = require("@tamagui/core");
const createSilkscreenFont = (font = {}) => (0, import_core.createFont)({
  family: import_core.isWeb ? "Silkscreen, Fira Code, Monaco, Consolas, Ubuntu Mono, monospace" : "Silkscreen",
  size,
  lineHeight: Object.fromEntries(
    Object.entries(font.size || size).map(([k, v]) => [
      k,
      typeof v == "number" ? Math.round(v * 1.2 + 6) : v
    ])
  ),
  weight: {
    4: "300"
  },
  letterSpacing: {
    4: 1,
    5: 3,
    6: 3,
    9: -2,
    10: -3,
    12: -4
  },
  ...font
}), size = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  5: 15,
  6: 16,
  7: 18,
  8: 21,
  9: 28,
  10: 42,
  11: 52,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 124
};
//# sourceMappingURL=index.js.map
