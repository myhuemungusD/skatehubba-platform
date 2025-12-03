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
var normalizeStyle_exports = {};
__export(normalizeStyle_exports, {
  normalizeStyle: () => normalizeStyle
});
module.exports = __toCommonJS(normalizeStyle_exports);
var import_expandStyle = require("./expandStyle.cjs"),
  import_expandStyles = require("./expandStyles.cjs"),
  import_isObj = require("./isObj.cjs"),
  import_normalizeValueWithProperty = require("./normalizeValueWithProperty.cjs"),
  import_pseudoDescriptors = require("./pseudoDescriptors.cjs");
function normalizeStyle(style, disableNormalize = !1) {
  const res = {};
  for (let key in style) {
    const prop = style[key];
    if (prop == null) continue;
    if (key in import_pseudoDescriptors.pseudoDescriptors ||
    // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && (0, import_isObj.isObj)(prop)) {
      res[key] = normalizeStyle(prop, disableNormalize);
      continue;
    }
    const value = disableNormalize ? prop : (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(prop, key),
      out = (0, import_expandStyle.expandStyle)(key, value);
    out ? Object.assign(res, Object.fromEntries(out)) : res[key] = value;
  }
  return (0, import_expandStyles.fixStyles)(res), res;
}