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
var themeInfo_exports = {};
__export(themeInfo_exports, {
  getThemeInfo: () => getThemeInfo,
  setThemeInfo: () => setThemeInfo
});
module.exports = __toCommonJS(themeInfo_exports);
const THEME_INFO = /* @__PURE__ */new Map(),
  getThemeInfo = (theme, name) => THEME_INFO.get(name || JSON.stringify(theme)),
  setThemeInfo = (theme, info) => {
    const next = {
      ...info,
      cache: /* @__PURE__ */new Map()
    };
    THEME_INFO.set(info.name || JSON.stringify(theme), next), THEME_INFO.set(JSON.stringify(info.definition), next);
  };