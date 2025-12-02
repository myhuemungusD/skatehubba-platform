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
var index_exports = {};
__export(index_exports, {
  getButtonSized: () => getButtonSized
});
module.exports = __toCommonJS(index_exports);
var import_get_token = require("@tamagui/get-token"),
  getButtonSized = function (val, param) {
    var {
      tokens,
      props
    } = param;
    if (!(!val || props.circular)) {
      if (typeof val == "number") return {
        paddingHorizontal: val * 0.25,
        height: val,
        borderRadius: props.circular ? 1e5 : val * 0.2
      };
      var xSize = (0, import_get_token.getSpace)(val),
        _tokens_radius_val,
        radiusToken = (_tokens_radius_val = tokens.radius[val]) !== null && _tokens_radius_val !== void 0 ? _tokens_radius_val : tokens.radius.$true;
      return {
        paddingHorizontal: xSize,
        height: val,
        borderRadius: props.circular ? 1e5 : radiusToken
      };
    }
  };
//# sourceMappingURL=index.native.js.map
