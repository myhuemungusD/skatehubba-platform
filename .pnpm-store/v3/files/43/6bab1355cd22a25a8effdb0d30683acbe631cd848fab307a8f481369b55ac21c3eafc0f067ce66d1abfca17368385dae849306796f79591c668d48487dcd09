import { isMinusZero } from "./isMinusZero.native.js";
import { setThemeInfo } from "./themeInfo.native.js";
var identityCache = /* @__PURE__ */new Map();
function createThemeWithPalettes(palettes, defaultPalette, definition, options, name) {
  var skipCache = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !1;
  if (!palettes[defaultPalette]) throw new Error(`No pallete: ${defaultPalette}`);
  var newDef = {
    ...definition
  };
  for (var key in definition) {
    var val = definition[key];
    if (typeof val == "string" && val[0] === "$") {
      var [altPaletteName$, altPaletteIndex] = val.split("."),
        altPaletteName = altPaletteName$.slice(1),
        parentName = defaultPalette.split("_")[0],
        altPalette = palettes[altPaletteName] || palettes[`${parentName}_${altPaletteName}`];
      if (altPalette) {
        var next = getValue(altPalette, +altPaletteIndex);
        typeof next < "u" && (newDef[key] = next);
      }
    }
  }
  return createTheme(palettes[defaultPalette], newDef, options, name, skipCache);
}
function createTheme(palette, definition, options, name) {
  var skipCache = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1,
    cacheKey = skipCache ? "" : JSON.stringify([name, palette, definition, options]);
  if (!skipCache && identityCache.has(cacheKey)) return identityCache.get(cacheKey);
  var theme = {
    ...Object.fromEntries(Object.entries(definition).map(function (param) {
      var [key, offset] = param;
      return [key, getValue(palette, offset)];
    })),
    ...options?.nonInheritedValues
  };
  return setThemeInfo(theme, {
    palette,
    definition,
    options,
    name
  }), cacheKey && identityCache.set(cacheKey, theme), theme;
}
var getValue = function (palette, value) {
  if (!palette) throw new Error("No palette!");
  if (typeof value == "string") return value;
  var max = palette.length - 1,
    isPositive = value === 0 ? !isMinusZero(value) : value >= 0,
    next = isPositive ? value : max + value,
    index = Math.min(Math.max(0, next), max);
  return palette[index];
};
function addChildren(themes, getChildren) {
  var out = {
    ...themes
  };
  for (var key in themes) {
    var subThemes = getChildren(key, themes[key]);
    for (var sKey in subThemes) out[`${key}_${sKey}`] = subThemes[sKey];
  }
  return out;
}
export { addChildren, createTheme, createThemeWithPalettes };
//# sourceMappingURL=createTheme.native.js.map
