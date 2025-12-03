import { useRef } from "react";
import { getThemeProxied } from "./getThemeProxied.mjs";
import { useThemeState } from "./useThemeState.mjs";
const useTheme = (props = {}) => {
    const [theme] = useThemeWithState(props);
    return theme;
  },
  useThemeWithState = (props, isRoot = !1) => {
    const keys = useRef(null),
      themeState = useThemeState(props, isRoot, keys);
    return process.env.NODE_ENV === "development" && !props.passThrough && !themeState?.theme && process.env.TAMAGUI_DISABLE_NO_THEME_WARNING !== "1" && console.error(`[tamagui] No theme found, this could be due to an invalid theme name (given theme props ${JSON.stringify(props)}).

If this is intended and you are using Tamagui without any themes, you can disable this warning by setting the environment variable TAMAGUI_DISABLE_NO_THEME_WARNING=1`), [props.passThrough ? {} : getThemeProxied(props, themeState, keys), themeState];
  };
export { useTheme, useThemeWithState };
//# sourceMappingURL=useTheme.mjs.map
