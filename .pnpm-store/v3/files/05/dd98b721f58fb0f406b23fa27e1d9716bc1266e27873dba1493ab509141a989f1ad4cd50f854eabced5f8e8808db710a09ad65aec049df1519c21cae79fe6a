import { isIos } from "@tamagui/constants";
import { getConfig, getSetting } from "../config.native.js";
import { getVariable } from "../createVariable.native.js";
import { getDynamicVal } from "../helpers/getDynamicVal.native.js";
import { doesRootSchemeMatchSystem } from "./doesRootSchemeMatchSystem.native.js";
var cache = /* @__PURE__ */new Map(),
  curKeys,
  curProps,
  curState,
  emptyObject = {};
function getThemeProxied(_props, _state, _keys) {
  if (!_state?.theme) return emptyObject;
  if (curKeys = _keys, curProps = _props, curState = _state, cache.has(curState.theme)) {
    var proxied = cache.get(curState.theme);
    return proxied;
  }
  var config = getConfig();
  function track(key) {
    curKeys && (curKeys.current || (curKeys.current = /* @__PURE__ */new Set()), curKeys.current.add(key), process.env.NODE_ENV === "development" && curProps.debug && console.info(` \u{1F3A8} useTheme() tracking new key: ${key}`, curKeys));
  }
  var proxied1 = Object.fromEntries(Object.entries(_state.theme).flatMap(function (param) {
    var [key, value] = param,
      proxied2 = {
        ...value,
        get val() {
          return globalThis.tamaguiAvoidTracking || track(key), value.val;
        },
        get(platform) {
          if (curState) {
            var outVal = getVariable(value),
              {
                name,
                scheme,
                inverses
              } = curState,
              shouldOptimize = scheme && platform !== "web" && isIos && !curProps.deopt && getSetting("fastSchemeChange") && inverses === 0 && doesRootSchemeMatchSystem();
            if (shouldOptimize) {
              var _config_themes_name,
                _config_themes_oppositeName,
                oppositeScheme = scheme === "dark" ? "light" : "dark",
                oppositeName = name.replace(scheme, oppositeScheme),
                color = getVariable((_config_themes_name = config.themes[name]) === null || _config_themes_name === void 0 ? void 0 : _config_themes_name[key]),
                oppositeColor = getVariable((_config_themes_oppositeName = config.themes[oppositeName]) === null || _config_themes_oppositeName === void 0 ? void 0 : _config_themes_oppositeName[key]),
                dynamicVal = getDynamicVal({
                  scheme,
                  val: color,
                  oppositeVal: oppositeColor
                });
              return dynamicVal;
            }
            return process.env.NODE_ENV === "development" && curProps.debug && console.info(` \u{1F3A8} useTheme() tracking new key because of: 
                not web: ${platform !== "web"}
                isIOS: ${isIos}
                deopt: ${curProps.deopt}
                fastScheme: ${getSetting("fastSchemeChange")}
              `), track(key), outVal;
          }
        }
      };
    return [[key, proxied2], [`$${key}`, proxied2]];
  }));
  return cache.set(_state.theme, proxied1), proxied1;
}
export { getThemeProxied };
//# sourceMappingURL=getThemeProxied.native.js.map
