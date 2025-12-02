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
var loadDuplicatedConfig_exports = {};
__export(loadDuplicatedConfig_exports, {
  loadDuplicatedConfig: () => loadDuplicatedConfig
});
module.exports = __toCommonJS(loadDuplicatedConfig_exports);
let hasLogged = !1;
function loadDuplicatedConfig() {
  return process.env.NODE_ENV !== "production" && globalThis.__tamaguiConfig ? (hasLogged = !0, hasLogged || console.warn(`Warning: You have duplicate Tamagui dependencies which can cause major, confusing issues.
    In dev/test, we're working around this by loading a previously loaded config.
    In production, this will error.`), globalThis.__tamaguiConfig) : null;
}