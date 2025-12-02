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
var mergeProps_exports = {};
__export(mergeProps_exports, {
  mergeComponentProps: () => mergeComponentProps,
  mergeProps: () => mergeProps
});
module.exports = __toCommonJS(mergeProps_exports);
var import_pseudoDescriptors = require("./pseudoDescriptors.native.js");
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var mergeProps = function (defaultProps, props) {
    var out = {};
    for (var key in defaultProps) key in props || (out[key] = defaultProps[key]);
    for (var key1 in props) mergeProp(out, defaultProps, props, key1);
    return out;
  },
  mergeComponentProps = function (defaultProps, contextProps, props) {
    var overriddenContext = null;
    if (!defaultProps && !contextProps) return [props, overriddenContext];
    if (defaultProps && !contextProps) return [mergeProps(defaultProps, props), overriddenContext];
    var out = {};
    for (var key in defaultProps) key in props || (out[key] = defaultProps[key]);
    for (var key1 in contextProps) if (!(key1 in props)) {
      var contextValue = contextProps[key1];
      contextValue !== void 0 && (out[key1] = contextValue);
    }
    for (var key2 in props) mergeProp(out, defaultProps, props, key2), contextProps && key2 in contextProps && (overriddenContext || (overriddenContext = {}), overriddenContext[key2] = props[key2]);
    return [out, overriddenContext];
  };
function mergeProp(out, defaultProps, props, key) {
  var val = props[key];
  if (defaultProps && key in defaultProps && (key in import_pseudoDescriptors.pseudoDescriptors || key[0] === "$") && val && (typeof val > "u" ? "undefined" : _type_of(val)) === "object") {
    var defaultVal = defaultProps[key];
    defaultVal && (typeof defaultVal > "u" ? "undefined" : _type_of(defaultVal)) === "object" && (val = mergeProps(defaultVal, val));
  }
  out[key] = val;
}
//# sourceMappingURL=mergeProps.native.js.map
