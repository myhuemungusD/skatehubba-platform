import { isClient, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { useId } from "react";
import { getSetting } from "../config.mjs";
import { THEME_CLASSNAME_PREFIX } from "../constants/constants.mjs";
import { Theme } from "./Theme.mjs";
import { jsx } from "react/jsx-runtime";
const ThemeProvider = props => {
  const disableRootThemeClass = props.disableRootThemeClass ?? getSetting("disableRootThemeClass"),
    themeClassNameOnRoot = props.themeClassNameOnRoot ?? getSetting("themeClassNameOnRoot");
  return isClient && useIsomorphicLayoutEffect(() => {
    if (disableRootThemeClass) return;
    const cn = `${THEME_CLASSNAME_PREFIX}${props.defaultTheme}`,
      target = themeClassNameOnRoot ? document.documentElement : document.body;
    return target.classList.add(cn), () => {
      target.classList.remove(cn);
    };
  }, [props.defaultTheme, disableRootThemeClass, themeClassNameOnRoot]), /* @__PURE__ */jsx(Theme, {
    className: props.className,
    name: props.defaultTheme,
    forceClassName: !disableRootThemeClass && !themeClassNameOnRoot,
    _isRoot: useId,
    children: props.children
  });
};
export { ThemeProvider };
//# sourceMappingURL=ThemeProvider.mjs.map
