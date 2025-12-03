import { useRef } from "react";
import { getThemeProxied } from "./getThemeProxied.native.js";
import { useThemeState } from "./useThemeState.native.js";
var useTheme = function () {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      [theme] = useThemeWithState(props),
      res = theme;
    return res;
  },
  useThemeWithState = function (props) {
    var isRoot = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
      keys = useRef(null),
      themeState = useThemeState(props, isRoot, keys);
    process.env.NODE_ENV === "development" && !props.passThrough && !themeState?.theme && process.env.TAMAGUI_DISABLE_NO_THEME_WARNING !== "1" && console.error(`[tamagui] No theme found, this could be due to an invalid theme name (given theme props ${JSON.stringify(props)}).

If this is intended and you are using Tamagui without any themes, you can disable this warning by setting the environment variable TAMAGUI_DISABLE_NO_THEME_WARNING=1`);
    var themeProxied = props.passThrough ? {} : getThemeProxied(props, themeState, keys);
    return [themeProxied, themeState];
  };
export { useTheme, useThemeWithState };
//# sourceMappingURL=useTheme.native.js.map
