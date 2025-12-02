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
var ThemeProvider_exports = {};
__export(ThemeProvider_exports, {
  ThemeProvider: () => ThemeProvider
});
module.exports = __toCommonJS(ThemeProvider_exports);
var import_constants = require("@tamagui/constants"),
  import_react = require("react"),
  import_config = require("../config.cjs"),
  import_constants2 = require("../constants/constants.cjs"),
  import_Theme = require("./Theme.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const ThemeProvider = props => {
  const disableRootThemeClass = props.disableRootThemeClass ?? (0, import_config.getSetting)("disableRootThemeClass"),
    themeClassNameOnRoot = props.themeClassNameOnRoot ?? (0, import_config.getSetting)("themeClassNameOnRoot");
  return import_constants.isClient && (0, import_constants.useIsomorphicLayoutEffect)(() => {
    if (disableRootThemeClass) return;
    const cn = `${import_constants2.THEME_CLASSNAME_PREFIX}${props.defaultTheme}`,
      target = themeClassNameOnRoot ? document.documentElement : document.body;
    return target.classList.add(cn), () => {
      target.classList.remove(cn);
    };
  }, [props.defaultTheme, disableRootThemeClass, themeClassNameOnRoot]), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_Theme.Theme, {
    className: props.className,
    name: props.defaultTheme,
    forceClassName: !disableRootThemeClass && !themeClassNameOnRoot,
    _isRoot: import_react.useId,
    children: props.children
  });
};