"use strict";

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
  import_config = require("../config.native.js"),
  import_createVariable = require("../createVariable.native.js"),
  import_getDynamicVal = require("../helpers/getDynamicVal.native.js"),
  import_doesRootSchemeMatchSystem = require("./doesRootSchemeMatchSystem.native.js"),
  cache = /* @__PURE__ */new Map(),
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
  var config = (0, import_config.getConfig)();
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
            var outVal = (0, import_createVariable.getVariable)(value),
              {
                name,
                scheme,
                inverses
              } = curState,
              shouldOptimize = scheme && platform !== "web" && import_constants.isIos && !curProps.deopt && (0, import_config.getSetting)("fastSchemeChange") && inverses === 0 && (0, import_doesRootSchemeMatchSystem.doesRootSchemeMatchSystem)();
            if (shouldOptimize) {
              var _config_themes_name,
                _config_themes_oppositeName,
                oppositeScheme = scheme === "dark" ? "light" : "dark",
                oppositeName = name.replace(scheme, oppositeScheme),
                color = (0, import_createVariable.getVariable)((_config_themes_name = config.themes[name]) === null || _config_themes_name === void 0 ? void 0 : _config_themes_name[key]),
                oppositeColor = (0, import_createVariable.getVariable)((_config_themes_oppositeName = config.themes[oppositeName]) === null || _config_themes_oppositeName === void 0 ? void 0 : _config_themes_oppositeName[key]),
                dynamicVal = (0, import_getDynamicVal.getDynamicVal)({
                  scheme,
                  val: color,
                  oppositeVal: oppositeColor
                });
              return dynamicVal;
            }
            return process.env.NODE_ENV === "development" && curProps.debug && console.info(` \u{1F3A8} useTheme() tracking new key because of: 
                not web: ${platform !== "web"}
                isIOS: ${import_constants.isIos}
                deopt: ${curProps.deopt}
                fastScheme: ${(0, import_config.getSetting)("fastSchemeChange")}
              `), track(key), outVal;
          }
        }
      };
    return [[key, proxied2], [`$${key}`, proxied2]];
  }));
  return cache.set(_state.theme, proxied1), proxied1;
}
//# sourceMappingURL=getThemeProxied.native.js.map
