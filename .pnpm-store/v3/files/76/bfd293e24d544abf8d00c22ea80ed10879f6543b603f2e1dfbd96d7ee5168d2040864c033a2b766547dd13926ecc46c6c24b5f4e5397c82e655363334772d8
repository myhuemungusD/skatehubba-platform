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
var createTheme_exports = {};
__export(createTheme_exports, {
  addChildren: () => addChildren,
  createTheme: () => createTheme,
  createThemeWithPalettes: () => createThemeWithPalettes
});
module.exports = __toCommonJS(createTheme_exports);
var import_isMinusZero = require("./isMinusZero"), import_themeInfo = require("./themeInfo");
const identityCache = /* @__PURE__ */ new Map();
function createThemeWithPalettes(palettes, defaultPalette, definition, options, name, skipCache = !1) {
  if (!palettes[defaultPalette])
    throw new Error(`No pallete: ${defaultPalette}`);
  const newDef = { ...definition };
  for (const key in definition) {
    let val = definition[key];
    if (typeof val == "string" && val[0] === "$") {
      const [altPaletteName$, altPaletteIndex] = val.split("."), altPaletteName = altPaletteName$.slice(1), parentName = defaultPalette.split("_")[0], altPalette = palettes[altPaletteName] || palettes[`${parentName}_${altPaletteName}`];
      if (altPalette) {
        const next = getValue(altPalette, +altPaletteIndex);
        typeof next < "u" && (newDef[key] = next);
      }
    }
  }
  return createTheme(palettes[defaultPalette], newDef, options, name, skipCache);
}
function createTheme(palette, definition, options, name, skipCache = !1) {
  const cacheKey = skipCache ? "" : JSON.stringify([name, palette, definition, options]);
  if (!skipCache && identityCache.has(cacheKey))
    return identityCache.get(cacheKey);
  const theme = {
    ...Object.fromEntries(
      Object.entries(definition).map(([key, offset]) => [key, getValue(palette, offset)])
    ),
    ...options?.nonInheritedValues
  };
  return (0, import_themeInfo.setThemeInfo)(theme, { palette, definition, options, name }), cacheKey && identityCache.set(cacheKey, theme), theme;
}
const getValue = (palette, value) => {
  if (!palette)
    throw new Error("No palette!");
  if (typeof value == "string")
    return value;
  const max = palette.length - 1, next = (value === 0 ? !(0, import_isMinusZero.isMinusZero)(value) : value >= 0) ? value : max + value, index = Math.min(Math.max(0, next), max);
  return palette[index];
};
function addChildren(themes, getChildren) {
  const out = { ...themes };
  for (const key in themes) {
    const subThemes = getChildren(key, themes[key]);
    for (const sKey in subThemes)
      out[`${key}_${sKey}`] = subThemes[sKey];
  }
  return out;
}
//# sourceMappingURL=createTheme.js.map
