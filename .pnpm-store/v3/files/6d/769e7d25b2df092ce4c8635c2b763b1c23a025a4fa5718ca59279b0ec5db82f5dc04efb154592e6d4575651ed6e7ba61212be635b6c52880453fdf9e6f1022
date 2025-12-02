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
var TamaguiProvider_exports = {};
__export(TamaguiProvider_exports, {
  TamaguiProvider: () => TamaguiProvider
});
module.exports = __toCommonJS(TamaguiProvider_exports);
var import_constants = require("@tamagui/constants"),
  import_use_did_finish_ssr = require("@tamagui/use-did-finish-ssr"),
  import_react = __toESM(require("react"), 1),
  import_config = require("../config.cjs"),
  import_ComponentContext = require("../contexts/ComponentContext.cjs"),
  import_insertStyleRule = require("../helpers/insertStyleRule.cjs"),
  import_useMedia = require("../hooks/useMedia.cjs"),
  import_ThemeProvider = require("./ThemeProvider.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
function TamaguiProvider({
  children,
  disableInjectCSS,
  config,
  className,
  defaultTheme,
  disableRootThemeClass,
  reset,
  themeClassNameOnRoot
}) {
  import_constants.IS_REACT_19 || import_constants.isClient && (0, import_constants.useIsomorphicLayoutEffect)(() => {
    if (config && !disableInjectCSS) {
      const style = document.createElement("style");
      return style.appendChild(document.createTextNode(config.getCSS())), document.head.appendChild(style), () => {
        document.head.removeChild(style);
      };
    }
  }, [config, disableInjectCSS]), (0, import_constants.useIsomorphicLayoutEffect)(() => {
    (0, import_insertStyleRule.stopAccumulatingRules)(), (0, import_useMedia.updateMediaListeners)();
  }, []);
  let contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(UnmountedClassName, {
    children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_ComponentContext.ComponentContext.Provider, {
      animationDriver: config?.animations,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_ThemeProvider.ThemeProvider, {
        themeClassNameOnRoot: themeClassNameOnRoot ?? (0, import_config.getSetting)("themeClassNameOnRoot"),
        disableRootThemeClass: disableRootThemeClass ?? (0, import_config.getSetting)("disableRootThemeClass"),
        defaultTheme: defaultTheme ?? (config ? Object.keys(config.themes)[0] : ""),
        reset,
        className,
        children
      })
    })
  });
  return (0, import_config.getSetting)("disableSSR") && (contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_use_did_finish_ssr.ClientOnly, {
    enabled: !0,
    children: contents
  })), /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [contents, import_constants.IS_REACT_19 && config && !disableInjectCSS && /* @__PURE__ */(0, import_jsx_runtime.jsx)("style", {
      precedence: "default",
      href: "tamagui-css",
      children: config.getCSS()
    }, "tamagui-css")]
  });
}
function UnmountedClassName(props) {
  const [mounted, setMounted] = import_react.default.useState(!1);
  return import_react.default.useEffect(() => {
    setMounted(!0);
  }, []), import_constants.isWeb ? /* @__PURE__ */(0, import_jsx_runtime.jsx)("span", {
    style: {
      display: "contents"
    },
    className: mounted ? "" : "t_unmounted",
    children: props.children
  }) : props.children;
}
TamaguiProvider.displayName = "TamaguiProvider";