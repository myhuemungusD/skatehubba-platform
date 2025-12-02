import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { IS_REACT_19, isClient, isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { ClientOnly } from "@tamagui/use-did-finish-ssr";
import React from "react";
import { getSetting } from "../config.native.js";
import { ComponentContext } from "../contexts/ComponentContext.native.js";
import { stopAccumulatingRules } from "../helpers/insertStyleRule.native.js";
import { updateMediaListeners } from "../hooks/useMedia.native.js";
import { ThemeProvider } from "./ThemeProvider.native.js";
function TamaguiProvider(param) {
  var {
    children,
    disableInjectCSS,
    config,
    className,
    defaultTheme,
    disableRootThemeClass,
    reset,
    themeClassNameOnRoot
  } = param;
  IS_REACT_19 || isClient && useIsomorphicLayoutEffect(function () {
    if (config && !disableInjectCSS) {
      var style = document.createElement("style");
      return style.appendChild(document.createTextNode(config.getCSS())), document.head.appendChild(style), function () {
        document.head.removeChild(style);
      };
    }
  }, [config, disableInjectCSS]), useIsomorphicLayoutEffect(function () {
    stopAccumulatingRules(), updateMediaListeners();
  }, []);
  var contents = /* @__PURE__ */_jsx(UnmountedClassName, {
    children: /* @__PURE__ */_jsx(ComponentContext.Provider, {
      animationDriver: config?.animations,
      children: /* @__PURE__ */_jsx(ThemeProvider, {
        themeClassNameOnRoot: themeClassNameOnRoot ?? getSetting("themeClassNameOnRoot"),
        disableRootThemeClass: disableRootThemeClass ?? getSetting("disableRootThemeClass"),
        defaultTheme: defaultTheme ?? (config ? Object.keys(config.themes)[0] : ""),
        reset,
        className,
        children
      })
    })
  });
  return getSetting("disableSSR") && (contents = /* @__PURE__ */_jsx(ClientOnly, {
    enabled: !0,
    children: contents
  })), /* @__PURE__ */_jsxs(_Fragment, {
    children: [contents, !1]
  });
}
function UnmountedClassName(props) {
  var [mounted, setMounted] = React.useState(!1);
  return React.useEffect(function () {
    setMounted(!0);
  }, []), isWeb ? /* @__PURE__ */_jsx("span", {
    style: {
      display: "contents"
    },
    className: mounted ? "" : "t_unmounted",
    children: props.children
  }) : props.children;
}
TamaguiProvider.displayName = "TamaguiProvider";
export { TamaguiProvider };
//# sourceMappingURL=TamaguiProvider.native.js.map
