import { objectFromEntries, objectKeys } from "./helpers.native.js";
import { colorTokens } from "./tokens.native.js";
var palettes = function () {
  var lightTransparent = "rgba(255,255,255,0)",
    darkTransparent = "rgba(10,10,10,0)",
    transparent = function (hsl) {
      var opacity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return hsl.replace("%)", `%, ${opacity})`).replace("hsl(", "hsla(");
    },
    getColorPalette = function (colors) {
      var color = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : colors[0],
        colorPalette = Object.values(colors),
        [head, tail] = [colorPalette.slice(0, 6), colorPalette.slice(colorPalette.length - 5)];
      return [transparent(colorPalette[0]), ...head, ...tail, color, transparent(colorPalette[colorPalette.length - 1])];
    },
    lightColor = "hsl(0, 0%, 9.0%)",
    lightPalette = [lightTransparent, "#fff", "#f8f8f8", "hsl(0, 0%, 96.3%)", "hsl(0, 0%, 94.1%)", "hsl(0, 0%, 92.0%)", "hsl(0, 0%, 90.0%)", "hsl(0, 0%, 88.5%)", "hsl(0, 0%, 81.0%)", "hsl(0, 0%, 56.1%)", "hsl(0, 0%, 50.3%)", "hsl(0, 0%, 42.5%)", lightColor, darkTransparent],
    darkColor = "#fff",
    darkPalette = [darkTransparent, "#050505", "#151515", "#191919", "#232323", "#282828", "#323232", "#424242", "#494949", "#545454", "#626262", "#a5a5a5", darkColor, lightTransparent],
    lightPalettes = objectFromEntries(objectKeys(colorTokens.light).map(function (key) {
      return [`light_${key}`, getColorPalette(colorTokens.light[key], lightColor)];
    })),
    darkPalettes = objectFromEntries(objectKeys(colorTokens.dark).map(function (key) {
      return [`dark_${key}`, getColorPalette(colorTokens.dark[key], darkColor)];
    })),
    colorPalettes = {
      ...lightPalettes,
      ...darkPalettes
    };
  return {
    light: lightPalette,
    dark: darkPalette,
    ...colorPalettes
  };
}();
export { palettes };
//# sourceMappingURL=palettes.native.js.map
