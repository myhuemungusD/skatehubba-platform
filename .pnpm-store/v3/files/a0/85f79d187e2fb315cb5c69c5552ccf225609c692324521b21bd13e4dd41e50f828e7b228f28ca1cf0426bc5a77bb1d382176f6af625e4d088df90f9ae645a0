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
var constants_exports = {};
__export(constants_exports, {
  FONT_DATA_ATTRIBUTE_NAME: () => FONT_DATA_ATTRIBUTE_NAME,
  MISSING_THEME_MESSAGE: () => MISSING_THEME_MESSAGE,
  THEME_CLASSNAME_PREFIX: () => THEME_CLASSNAME_PREFIX,
  THEME_NAME_SEPARATOR: () => THEME_NAME_SEPARATOR,
  stackDefaultStyles: () => stackDefaultStyles,
  webViewFlexCompatStyles: () => webViewFlexCompatStyles
});
module.exports = __toCommonJS(constants_exports);
const THEME_NAME_SEPARATOR = "_",
  THEME_CLASSNAME_PREFIX = "t_",
  FONT_DATA_ATTRIBUTE_NAME = "data-tamagui-font",
  stackDefaultStyles = {},
  webViewFlexCompatStyles = {
    display: "flex",
    alignItems: "stretch",
    flexDirection: "column",
    flexBasis: "auto",
    boxSizing: "border-box",
    position: process.env.TAMAGUI_POSITION_STATIC === "1" ? "static" : "relative",
    minHeight: 0,
    minWidth: 0,
    flexShrink: 0
  };
Object.assign(stackDefaultStyles, webViewFlexCompatStyles);
const MISSING_THEME_MESSAGE = process.env.NODE_ENV === "development" ? `Can't find Tamagui configuration.
    
99% of the time this is due to having mis-matched versions of Tamagui dependencies.
Ensure that every "tamagui" and "@tamagui/*" dependency is pinned to exactly the same version.

We have a CLI tool to help check this: 

  npx @tamagui/cli check
` : "Missing theme.";