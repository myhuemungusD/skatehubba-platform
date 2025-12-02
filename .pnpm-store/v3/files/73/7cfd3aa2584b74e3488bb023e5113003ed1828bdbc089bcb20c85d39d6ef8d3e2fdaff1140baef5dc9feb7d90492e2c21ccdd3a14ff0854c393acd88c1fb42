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
var getThemeProxied_exports = {};
__export(getThemeProxied_exports, {
  getThemeProxied: () => getThemeProxied
});
module.exports = __toCommonJS(getThemeProxied_exports);
var import_constants = require("@tamagui/constants"),
  import_config = require("../config.cjs"),
  import_createVariable = require("../createVariable.cjs"),
  import_getDynamicVal = require("../helpers/getDynamicVal.cjs"),
  import_doesRootSchemeMatchSystem = require("./doesRootSchemeMatchSystem.cjs");
const cache = /* @__PURE__ */new Map();
let curKeys, curProps, curState;
const emptyObject = {};
function getThemeProxied(_props, _state, _keys) {
  if (!_state?.theme) return emptyObject;
  if (curKeys = _keys, curProps = _props, curState = _state, cache.has(curState.theme)) return cache.get(curState.theme);
  const config = (0, import_config.getConfig)();
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
        const outVal = (0, import_createVariable.getVariable)(value),
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