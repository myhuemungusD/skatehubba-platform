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
var getExpandedShorthands_exports = {};
__export(getExpandedShorthands_exports, {
  getExpandedShorthand: () => getExpandedShorthand,
  getExpandedShorthands: () => getExpandedShorthands
});
module.exports = __toCommonJS(getExpandedShorthands_exports);
var import_config = require("../config.native.js");
function getExpandedShorthands(props) {
  var shorthands = (0, import_config.getConfig)().shorthands;
  if (!shorthands) return props;
  var res = {};
  for (var key in props) res[shorthands[key] || key] = props[key];
  return res;
}
function getExpandedShorthand(propKey, props) {
  var shorthands = (0, import_config.getConfig)().inverseShorthands,
    _props_propKey;
  return (_props_propKey = props[propKey]) !== null && _props_propKey !== void 0 ? _props_propKey : props[shorthands[propKey]];
}
//# sourceMappingURL=getExpandedShorthands.native.js.map
