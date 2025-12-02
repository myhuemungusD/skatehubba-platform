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
var getDynamicVal_exports = {};
__export(getDynamicVal_exports, {
  extractValueFromDynamic: () => extractValueFromDynamic,
  getDynamicVal: () => getDynamicVal,
  getOppositeScheme: () => getOppositeScheme
});
module.exports = __toCommonJS(getDynamicVal_exports);
function getOppositeScheme(scheme) {
  return scheme === "dark" ? "light" : "dark";
}
function getDynamicVal(param) {
  var {
      scheme,
      val,
      oppositeVal
    } = param,
    oppositeScheme = getOppositeScheme(scheme);
  return {
    dynamic: {
      [scheme]: val,
      [oppositeScheme]: oppositeVal
    }
  };
}
function extractValueFromDynamic(val, scheme) {
  return val?.dynamic ? val.dynamic[scheme] : val;
}
//# sourceMappingURL=getDynamicVal.native.js.map
