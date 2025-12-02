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
var normalizeStyle_exports = {};
__export(normalizeStyle_exports, {
  normalizeStyle: () => normalizeStyle
});
module.exports = __toCommonJS(normalizeStyle_exports);
var import_expandStyle = require("./expandStyle.native.js"),
  import_expandStyles = require("./expandStyles.native.js"),
  import_isObj = require("./isObj.native.js"),
  import_normalizeValueWithProperty = require("./normalizeValueWithProperty.native.js"),
  import_pseudoDescriptors = require("./pseudoDescriptors.native.js");
function normalizeStyle(style) {
  var disableNormalize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
    res = {};
  for (var key in style) {
    var prop = style[key];
    if (prop != null) {
      if (key in import_pseudoDescriptors.pseudoDescriptors ||
      // this should capture all parent-based styles like media, group, etc
      key[0] === "$" && (0, import_isObj.isObj)(prop)) {
        res[key] = normalizeStyle(prop, disableNormalize);
        continue;
      }
      var value = disableNormalize ? prop : (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(prop, key),
        out = (0, import_expandStyle.expandStyle)(key, value);
      out ? Object.assign(res, Object.fromEntries(out)) : res[key] = value;
    }
  }
  return (0, import_expandStyles.fixStyles)(res), res;
}
//# sourceMappingURL=normalizeStyle.native.js.map
