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
var getShorthandValue_exports = {};
__export(getShorthandValue_exports, {
  getShorthandValue: () => getShorthandValue
});
module.exports = __toCommonJS(getShorthandValue_exports);
var import_config = require("../config.native.js"),
  inverseShorthands = null,
  getShorthandValue = function (props, key) {
    inverseShorthands || (inverseShorthands = (0, import_config.getConfig)().inverseShorthands);
    var _props_key;
    return (_props_key = props[key]) !== null && _props_key !== void 0 ? _props_key : inverseShorthands ? props[inverseShorthands[key]] : void 0;
  };
//# sourceMappingURL=getShorthandValue.native.js.map
