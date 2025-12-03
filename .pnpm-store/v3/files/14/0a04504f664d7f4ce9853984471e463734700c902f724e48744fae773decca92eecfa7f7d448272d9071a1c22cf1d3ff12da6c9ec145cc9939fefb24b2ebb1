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
var v3_exports = {};
__export(v3_exports, {
  animations: () => import_v3_animations2.animations,
  config: () => config,
  fonts: () => import_fonts2.fonts,
  media: () => import_media2.media,
  mediaQueryDefaultActive: () => import_media2.mediaQueryDefaultActive,
  selectionStyles: () => selectionStyles,
  shorthands: () => import_v22.shorthands,
  themes: () => import_v3_themes2.themes,
  tokens: () => import_v3_themes2.tokens
});
module.exports = __toCommonJS(v3_exports);
var import_v2 = require("@tamagui/shorthands/v2"),
  import_v3_themes = require("@tamagui/themes/v3-themes"),
  import_v3_animations = require("./v3-animations.cjs"),
  import_fonts = require("./fonts.cjs"),
  import_media = require("./media.cjs"),
  import_v3_animations2 = require("./v3-animations.cjs"),
  import_v3_themes2 = require("@tamagui/themes/v3-themes"),
  import_v22 = require("@tamagui/shorthands/v2"),
  import_fonts2 = require("./fonts.cjs"),
  import_media2 = require("./media.cjs");
globalThis.global ||= globalThis;
const selectionStyles = theme => theme.color5 ? {
    backgroundColor: theme.color5,
    color: theme.color11
  } : null,
  themes2 = process.env.TAMAGUI_OPTIMIZE_THEMES === "true" ? {} : import_v3_themes.themes,
  config = {
    animations: import_v3_animations.animations,
    themes: themes2,
    media: import_media.media,
    shorthands: import_v2.shorthands,
    tokens: import_v3_themes.tokens,
    fonts: import_fonts.fonts,
    selectionStyles,
    settings: {
      mediaQueryDefaultActive: import_media.mediaQueryDefaultActive,
      defaultFont: "body",
      fastSchemeChange: !0,
      shouldAddPrefersColorThemes: !0,
      themeClassNameOnRoot: !0
    }
  };