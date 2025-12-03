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
var index_exports = {};
__export(index_exports, {
  getDefaultTamaguiConfig: () => getDefaultTamaguiConfig
});
module.exports = __toCommonJS(index_exports);
var import_shorthands = require("@tamagui/shorthands"),
  import_web = require("@tamagui/web"),
  import_animations = require("./animations.native.js"),
  import_animations2 = require("./animations.native");
function getDefaultTamaguiConfig() {
  var platform = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "web",
    headingFont = (0, import_web.createFont)({
      family: "Heading",
      size: {
        1: 15
      },
      lineHeight: {
        1: 15
      },
      transform: {},
      weight: {
        1: "400"
      },
      color: {
        1: "$color"
      },
      letterSpacing: {
        1: 0
      }
    }),
    font = (0, import_web.createFont)({
      family: "System",
      size: {
        1: 15
      },
      lineHeight: {
        1: 15
      },
      transform: {},
      weight: {
        1: "400"
      },
      color: {
        1: "$color"
      },
      letterSpacing: {
        1: 0
      }
    }),
    size = {
      0: 0,
      0.25: 2,
      0.5: 4,
      0.75: 8,
      1: 20,
      1.5: 24,
      2: 28,
      2.5: 32,
      3: 36,
      3.5: 40,
      4: 44,
      true: 44,
      4.5: 48,
      5: 52,
      5.5: 59,
      6: 64,
      6.5: 69,
      7: 74,
      7.6: 79,
      8: 84,
      8.5: 89,
      9: 94,
      9.5: 99,
      10: 104,
      11: 124,
      12: 144,
      13: 164,
      14: 184,
      15: 204,
      16: 224,
      17: 224,
      18: 244,
      19: 264,
      20: 284
    },
    spaces = Object.entries(size).map(function (param) {
      var [k, v] = param;
      return [k, Math.max(0, v <= 16 ? Math.round(v * 0.333) : Math.floor(v * 0.7 - 12))];
    }),
    spacesNegative = spaces.slice(1).map(function (param) {
      var [k, v] = param;
      return [`-${k}`, -v];
    }),
    space = {
      ...Object.fromEntries(spaces),
      ...Object.fromEntries(spacesNegative)
    },
    zIndex = {
      0: 0,
      1: 100,
      2: 200,
      3: 300,
      4: 400,
      5: 500
    },
    radius = {
      0: 0,
      1: 3,
      2: 5,
      3: 7,
      4: 9,
      5: 10,
      6: 16,
      7: 19,
      8: 22,
      9: 26,
      10: 34,
      11: 42,
      12: 50
    },
    tokens = (0, import_web.createTokens)({
      color: {
        white: "#fff",
        black: "#000"
      },
      radius,
      zIndex,
      space,
      size
    }),
    themes = {
      light: {
        background: tokens.color.white,
        color: tokens.color.black
      },
      dark: {
        background: tokens.color.black,
        color: tokens.color.white
      },
      // most of these used for testing:
      dark_blue: {
        background: "blue",
        color: "white"
      },
      dark_Card: {
        background: "dark",
        color: "card"
      },
      dark_Button: {
        background: "dark",
        color: "button"
      },
      dark_blue_Button: {
        background: "blue",
        color: "white"
      },
      dark_red: {
        background: "darkred",
        color: "white"
      },
      dark_red_alt1: {
        background: "darkred",
        color: "white"
      },
      dark_red_Button: {
        background: "darkred",
        color: "#ccc"
      },
      dark_yellow_Button: {
        background: "brown",
        color: "#ccc"
      },
      dark_red_active_ListItem: {
        background: "darkred",
        color: "red"
      },
      dark_red_alt2: {
        background: "darkred",
        color: "#555"
      },
      dark_red_alt2_Button: {
        background: "darkred",
        color: "#444"
      },
      red: {
        background: "red",
        color: "red"
      }
    },
    fonts = {
      heading: headingFont,
      body: font
    },
    media = {
      xs: {
        maxWidth: 660
      },
      sm: {
        maxWidth: 800
      },
      md: {
        maxWidth: 1020
      },
      lg: {
        maxWidth: 1280
      },
      xl: {
        maxWidth: 1420
      },
      xxl: {
        maxWidth: 1600
      },
      gtXs: {
        minWidth: 661
      },
      gtSm: {
        minWidth: 801
      },
      gtMd: {
        minWidth: 1021
      },
      gtLg: {
        minWidth: 1281
      },
      short: {
        maxHeight: 820
      },
      tall: {
        minHeight: 820
      },
      hoverNone: {
        hover: "none"
      },
      pointerCoarse: {
        pointer: "coarse"
      }
    };
  return {
    animations: platform === "web" ? import_animations.animations : import_animations2.animations,
    shorthands: import_shorthands.shorthands,
    fonts,
    themes,
    tokens,
    media,
    settings: {
      shouldAddPrefersColorThemes: !0,
      defaultFont: "body",
      themeClassNameOnRoot: !0
    }
  };
}
//# sourceMappingURL=index.native.js.map
