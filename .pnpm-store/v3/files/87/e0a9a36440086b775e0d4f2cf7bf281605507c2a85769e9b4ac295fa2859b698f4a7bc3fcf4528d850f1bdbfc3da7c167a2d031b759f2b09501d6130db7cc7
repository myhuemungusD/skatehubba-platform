import { jsx as _jsx } from "react/jsx-runtime";
import { isClient, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { useId } from "react";
import { getSetting } from "../config.native.js";
import { THEME_CLASSNAME_PREFIX } from "../constants/constants.native.js";
import { Theme } from "./Theme.native.js";
var ThemeProvider = function (props) {
  var _props_disableRootThemeClass,
    disableRootThemeClass = (_props_disableRootThemeClass = props.disableRootThemeClass) !== null && _props_disableRootThemeClass !== void 0 ? _props_disableRootThemeClass : getSetting("disableRootThemeClass"),
    _props_themeClassNameOnRoot,
    themeClassNameOnRoot = (_props_themeClassNameOnRoot = props.themeClassNameOnRoot) !== null && _props_themeClassNameOnRoot !== void 0 ? _props_themeClassNameOnRoot : getSetting("themeClassNameOnRoot");
  return isClient && useIsomorphicLayoutEffect(function () {
    if (!disableRootThemeClass) {
      var cn = `${THEME_CLASSNAME_PREFIX}${props.defaultTheme}`,
        target = themeClassNameOnRoot ? document.documentElement : document.body;
      return target.classList.add(cn), function () {
        target.classList.remove(cn);
      };
    }
  }, [props.defaultTheme, disableRootThemeClass, themeClassNameOnRoot]), /* @__PURE__ */_jsx(Theme, {
    className: props.className,
    name: props.defaultTheme,
    // if root class disabled, force class here
    forceClassName: !disableRootThemeClass && !themeClassNameOnRoot,
    // @ts-expect-error
    _isRoot: useId,
    children: props.children
  });
};
export { ThemeProvider };
//# sourceMappingURL=ThemeProvider.native.js.map
