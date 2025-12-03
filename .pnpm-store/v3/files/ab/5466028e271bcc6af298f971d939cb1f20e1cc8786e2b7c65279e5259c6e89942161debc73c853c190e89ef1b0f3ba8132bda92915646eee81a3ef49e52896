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
var applyMask_exports = {};
__export(applyMask_exports, {
  applyMask: () => applyMask,
  applyMaskStateless: () => applyMaskStateless
});
module.exports = __toCommonJS(applyMask_exports);
var import_createTheme = require("./createTheme.cjs"),
  import_themeInfo = require("./themeInfo.cjs");
function applyMask(theme, mask, options = {}, parentName, nextName) {
  const info = (0, import_themeInfo.getThemeInfo)(theme, parentName);
  if (!info) throw new Error(process.env.NODE_ENV !== "production" ? "No info found for theme, you must pass the theme created by createThemeFromPalette directly to extendTheme" : "\u274C Err2");
  const next = applyMaskStateless(info, mask, options, parentName);
  return (0, import_themeInfo.setThemeInfo)(next.theme, {
    definition: next.definition,
    palette: info.palette,
    name: nextName
  }), next.theme;
}
function applyMaskStateless(info, mask, options = {}, parentName) {
  const skip = {
    ...options.skip
  };
  if (info.options?.nonInheritedValues) for (const key in info.options.nonInheritedValues) skip[key] = 1;
  const maskOptions = {
      parentName,
      palette: info.palette,
      ...options,
      skip
    },
    template = mask.mask(info.definition, maskOptions),
    theme = (0, import_createTheme.createTheme)(info.palette, template);
  return {
    ...info,
    cache: /* @__PURE__ */new Map(),
    definition: template,
    theme
  };
}