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
var useTheme_exports = {};
__export(useTheme_exports, {
  useTheme: () => useTheme,
  useThemeWithState: () => useThemeWithState
});
module.exports = __toCommonJS(useTheme_exports);
var import_react = require("react"), import_getThemeProxied = require("./getThemeProxied"), import_useThemeState = require("./useThemeState");
const useTheme = (props = {}) => {
  const [theme] = useThemeWithState(props);
  return theme;
}, useThemeWithState = (props, isRoot = !1) => {
  const keys = (0, import_react.useRef)(null), themeState = (0, import_useThemeState.useThemeState)(props, isRoot, keys);
  return process.env.NODE_ENV === "development" && !props.passThrough && !themeState?.theme && process.env.TAMAGUI_DISABLE_NO_THEME_WARNING !== "1" && console.error(
    `[tamagui] No theme found, this could be due to an invalid theme name (given theme props ${JSON.stringify(
      props
    )}).

If this is intended and you are using Tamagui without any themes, you can disable this warning by setting the environment variable TAMAGUI_DISABLE_NO_THEME_WARNING=1`
  ), [props.passThrough ? {} : (0, import_getThemeProxied.getThemeProxied)(props, themeState, keys), themeState];
};
//# sourceMappingURL=useTheme.js.map
