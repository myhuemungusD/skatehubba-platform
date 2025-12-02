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
var palettes_exports = {};
__export(palettes_exports, {
  palettes: () => palettes
});
module.exports = __toCommonJS(palettes_exports);
var import_helpers = require("./helpers"), import_tokens = require("./tokens");
const palettes = (() => {
  const lightTransparent = "rgba(255,255,255,0)", darkTransparent = "rgba(10,10,10,0)", transparent = (hsl, opacity = 0) => hsl.replace("%)", `%, ${opacity})`).replace("hsl(", "hsla("), getColorPalette = (colors, color = colors[0]) => {
    const colorPalette = Object.values(colors), [head, tail] = [
      colorPalette.slice(0, 6),
      colorPalette.slice(colorPalette.length - 5)
    ];
    return [
      transparent(colorPalette[0]),
      ...head,
      ...tail,
      color,
      transparent(colorPalette[colorPalette.length - 1])
    ];
  }, lightColor = "hsl(0, 0%, 9.0%)", lightPalette = [
    lightTransparent,
    "#fff",
    "#f8f8f8",
    "hsl(0, 0%, 96.3%)",
    "hsl(0, 0%, 94.1%)",
    "hsl(0, 0%, 92.0%)",
    "hsl(0, 0%, 90.0%)",
    "hsl(0, 0%, 88.5%)",
    "hsl(0, 0%, 81.0%)",
    "hsl(0, 0%, 56.1%)",
    "hsl(0, 0%, 50.3%)",
    "hsl(0, 0%, 42.5%)",
    lightColor,
    darkTransparent
  ], darkColor = "#fff", darkPalette = [
    darkTransparent,
    "#050505",
    "#151515",
    "#191919",
    "#232323",
    "#282828",
    "#323232",
    "#424242",
    "#494949",
    "#545454",
    "#626262",
    "#a5a5a5",
    darkColor,
    lightTransparent
  ], lightPalettes = (0, import_helpers.objectFromEntries)(
    (0, import_helpers.objectKeys)(import_tokens.colorTokens.light).map(
      (key) => [`light_${key}`, getColorPalette(import_tokens.colorTokens.light[key], lightColor)]
    )
  ), darkPalettes = (0, import_helpers.objectFromEntries)(
    (0, import_helpers.objectKeys)(import_tokens.colorTokens.dark).map(
      (key) => [`dark_${key}`, getColorPalette(import_tokens.colorTokens.dark[key], darkColor)]
    )
  ), colorPalettes = {
    ...lightPalettes,
    ...darkPalettes
  };
  return {
    light: lightPalette,
    dark: darkPalette,
    ...colorPalettes
  };
})();
//# sourceMappingURL=palettes.js.map
