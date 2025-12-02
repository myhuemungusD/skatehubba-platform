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
var transformsToString_exports = {};
__export(transformsToString_exports, {
  transformsToString: () => transformsToString
});
module.exports = __toCommonJS(transformsToString_exports);
var import_normalizeValueWithProperty = require("./normalizeValueWithProperty.native.js");
function transformsToString(transforms) {
  return transforms.map(
  // { scale: 2 } => 'scale(2)'
  // { translateX: 20 } => 'translateX(20px)'
  // { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
  // { perspective: 1000 } => perspective(1000px)
  function (transform) {
    var type = Object.keys(transform)[0],
      value = transform[type];
    return type === "matrix" || type === "matrix3d" ? `${type}(${value.join(",")})` : `${type}(${(0, import_normalizeValueWithProperty.normalizeValueWithProperty)(value, type)})`;
  }).join(" ");
}
//# sourceMappingURL=transformsToString.native.js.map
