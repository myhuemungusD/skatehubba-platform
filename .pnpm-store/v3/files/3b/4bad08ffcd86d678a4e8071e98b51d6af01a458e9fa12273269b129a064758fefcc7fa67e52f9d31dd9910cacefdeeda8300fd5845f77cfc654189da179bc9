import { IS_REACT_19, isClient, isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { ClientOnly } from "@tamagui/use-did-finish-ssr";
import React from "react";
import { getSetting } from "../config.mjs";
import { ComponentContext } from "../contexts/ComponentContext.mjs";
import { stopAccumulatingRules } from "../helpers/insertStyleRule.mjs";
import { updateMediaListeners } from "../hooks/useMedia.mjs";
import { ThemeProvider } from "./ThemeProvider.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  IS_REACT_19 || isClient && useIsomorphicLayoutEffect(() => {
    if (config && !disableInjectCSS) {
      const style = document.createElement("style");
      return style.appendChild(document.createTextNode(config.getCSS())), document.head.appendChild(style), () => {
        document.head.removeChild(style);
      };
    }
  }, [config, disableInjectCSS]), useIsomorphicLayoutEffect(() => {
    stopAccumulatingRules(), updateMediaListeners();
  }, []);
  let contents = /* @__PURE__ */jsx(UnmountedClassName, {
    children: /* @__PURE__ */jsx(ComponentContext.Provider, {
      animationDriver: config?.animations,
      children: /* @__PURE__ */jsx(ThemeProvider, {
        themeClassNameOnRoot: themeClassNameOnRoot ?? getSetting("themeClassNameOnRoot"),
        disableRootThemeClass: disableRootThemeClass ?? getSetting("disableRootThemeClass"),
        defaultTheme: defaultTheme ?? (config ? Object.keys(config.themes)[0] : ""),
        reset,
        className,
        children
      })
    })
  });
  return getSetting("disableSSR") && (contents = /* @__PURE__ */jsx(ClientOnly, {
    enabled: !0,
    children: contents
  })), /* @__PURE__ */jsxs(Fragment, {
    children: [contents, IS_REACT_19 && config && !disableInjectCSS && /* @__PURE__ */jsx("style", {
      precedence: "default",
      href: "tamagui-css",
      children: config.getCSS()
    }, "tamagui-css")]
  });
}
function UnmountedClassName(props) {
  const [mounted, setMounted] = React.useState(!1);
  return React.useEffect(() => {
    setMounted(!0);
  }, []), isWeb ? /* @__PURE__ */jsx("span", {
    style: {
      display: "contents"
    },
    className: mounted ? "" : "t_unmounted",
    children: props.children
  }) : props.children;
}
TamaguiProvider.displayName = "TamaguiProvider";
export { TamaguiProvider };
//# sourceMappingURL=TamaguiProvider.mjs.map
