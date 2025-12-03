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
var normalizeColor_exports = {};
__export(normalizeColor_exports, {
  getRgba: () => getRgba,
  normalizeColor: () => normalizeColor,
  rgba: () => import_normalize_css_color2.rgba
});
module.exports = __toCommonJS(normalizeColor_exports);
var import_normalize_css_color = require("@tamagui/normalize-css-color"),
  import_normalize_css_color2 = require("@tamagui/normalize-css-color");
const normalizeColor = (color, opacity) => {
    if (color) {
      if (color[0] === "$") return color;
      if (color.startsWith("var(")) {
        if (typeof opacity == "number" && opacity < 1) return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
      } else {
        const rgba3 = getRgba(color);
        if (rgba3) {
          const colors = `${rgba3.r},${rgba3.g},${rgba3.b}`;
          return opacity === 1 ? `rgb(${colors})` : `rgba(${colors},${opacity ?? rgba3.a ?? 1})`;
        }
      }
      return color;
    }
  },
  getRgba = color => {
    const colorNum = (0, import_normalize_css_color.normalizeCSSColor)(color);
    if (colorNum != null) return (0, import_normalize_css_color.rgba)(colorNum);
  };