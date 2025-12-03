import "@tamagui/constants";
import { getConfig } from "../config.mjs";
import { getVariable } from "../createVariable.mjs";
import "../helpers/getDynamicVal.mjs";
import "./doesRootSchemeMatchSystem.mjs";
const cache = /* @__PURE__ */new Map();
let curKeys, curProps, curState;
const emptyObject = {};
function getThemeProxied(_props, _state, _keys) {
  if (!_state?.theme) return emptyObject;
  if (curKeys = _keys, curProps = _props, curState = _state, cache.has(curState.theme)) return cache.get(curState.theme);
  const config = getConfig();
  function track(key) {
    curKeys && (curKeys.current || (curKeys.current = /* @__PURE__ */new Set()), curKeys.current.add(key), process.env.NODE_ENV === "development" && curProps.debug && console.info(` \u{1F3A8} useTheme() tracking new key: ${key}`, curKeys));
  }
  const proxied = Object.fromEntries(Object.entries(_state.theme).flatMap(([key, value]) => {
    const proxied2 = {
      ...value,
      get val() {
        return globalThis.tamaguiAvoidTracking || track(key), value.val;
      },
      get(platform) {
        if (!curState) return;
        const outVal = getVariable(value),
          {
            name,
            scheme,
            inverses
          } = curState;
        return outVal;
      }
    };
    return [[key, proxied2], [`$${key}`, proxied2]];
  }));
  return cache.set(_state.theme, proxied), proxied;
}
export { getThemeProxied };
//# sourceMappingURL=getThemeProxied.mjs.map
