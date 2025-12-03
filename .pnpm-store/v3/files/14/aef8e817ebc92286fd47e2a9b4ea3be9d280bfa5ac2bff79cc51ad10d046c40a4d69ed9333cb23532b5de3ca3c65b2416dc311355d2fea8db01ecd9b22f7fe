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
var v4_default_exports = {};
__export(v4_default_exports, {
  themes: () => themes
});
module.exports = __toCommonJS(v4_default_exports);
var Colors = __toESM(require("@tamagui/colors"), 1),
  import_theme_builder = require("@tamagui/theme-builder");
const darkPalette = ["#050505", "#151515", "#191919", "#232323", "#282828", "#323232", "#424242", "#494949", "#545454", "#626262", "#a5a5a5", "#fff"],
  lightPalette = ["#fff", "#f2f2f2", "hsl(0, 0%, 93%)", "hsl(0, 0%, 91%)", "hsl(0, 0%, 88%)", "hsl(0, 0%, 85%)", "hsl(0, 0%, 82%)", "hsl(0, 0%, 76%)", "hsl(0, 0%, 56%)", "hsl(0, 0%, 50%)", "hsl(0, 0%, 42%)", "hsl(0, 0%, 9%)"],
  lightShadows = {
    shadow1: "rgba(0,0,0,0.04)",
    shadow2: "rgba(0,0,0,0.08)",
    shadow3: "rgba(0,0,0,0.16)",
    shadow4: "rgba(0,0,0,0.24)",
    shadow5: "rgba(0,0,0,0.32)",
    shadow6: "rgba(0,0,0,0.4)"
  },
  darkShadows = {
    shadow1: "rgba(0,0,0,0.2)",
    shadow2: "rgba(0,0,0,0.3)",
    shadow3: "rgba(0,0,0,0.4)",
    shadow4: "rgba(0,0,0,0.5)",
    shadow5: "rgba(0,0,0,0.6)",
    shadow6: "rgba(0,0,0,0.7)"
  },
  blackColors = {
    black1: darkPalette[0],
    black2: darkPalette[1],
    black3: darkPalette[2],
    black4: darkPalette[3],
    black5: darkPalette[4],
    black6: darkPalette[5],
    black7: darkPalette[6],
    black8: darkPalette[7],
    black9: darkPalette[8],
    black10: darkPalette[9],
    black11: darkPalette[10],
    black12: darkPalette[11]
  },
  whiteColors = {
    white1: lightPalette[0],
    white2: lightPalette[1],
    white3: lightPalette[2],
    white4: lightPalette[3],
    white5: lightPalette[4],
    white6: lightPalette[5],
    white7: lightPalette[6],
    white8: lightPalette[7],
    white9: lightPalette[8],
    white10: lightPalette[9],
    white11: lightPalette[10],
    white12: lightPalette[11]
  },
  generatedThemes = (0, import_theme_builder.createThemes)({
    componentThemes: import_theme_builder.defaultComponentThemes,
    base: {
      palette: {
        dark: darkPalette,
        light: lightPalette
      },
      // for values we don't want being inherited onto sub-themes
      extra: {
        light: {
          ...Colors.blue,
          ...Colors.green,
          ...Colors.red,
          ...Colors.yellow,
          ...lightShadows,
          ...blackColors,
          ...whiteColors,
          shadowColor: lightShadows.shadow1
        },
        dark: {
          ...Colors.blueDark,
          ...Colors.greenDark,
          ...Colors.redDark,
          ...Colors.yellowDark,
          ...darkShadows,
          ...blackColors,
          ...whiteColors,
          shadowColor: darkShadows.shadow1
        }
      }
    },
    // inverse accent theme
    accent: {
      palette: {
        dark: lightPalette,
        light: darkPalette
      }
    },
    childrenThemes: {
      black: {
        palette: {
          dark: Object.values(blackColors),
          light: Object.values(blackColors)
        }
      },
      white: {
        palette: {
          dark: Object.values(whiteColors),
          light: Object.values(whiteColors)
        }
      },
      blue: {
        palette: {
          dark: Object.values(Colors.blueDark),
          light: Object.values(Colors.blue)
        }
      },
      red: {
        palette: {
          dark: Object.values(Colors.redDark),
          light: Object.values(Colors.red)
        }
      },
      yellow: {
        palette: {
          dark: Object.values(Colors.yellowDark),
          light: Object.values(Colors.yellow)
        }
      },
      green: {
        palette: {
          dark: Object.values(Colors.greenDark),
          light: Object.values(Colors.green)
        }
      }
    }
  }),
  themes = generatedThemes;