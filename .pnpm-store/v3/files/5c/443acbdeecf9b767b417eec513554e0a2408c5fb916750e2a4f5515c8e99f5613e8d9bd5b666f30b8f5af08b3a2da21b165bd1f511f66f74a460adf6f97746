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
var getElevation_exports = {};
__export(getElevation_exports, {
  getElevation: () => getElevation,
  getSizedElevation: () => getSizedElevation
});
module.exports = __toCommonJS(getElevation_exports);
var import_core = require("@tamagui/core"),
  getElevation = function (size, extras) {
    if (size) {
      var {
          tokens
        } = extras,
        token = tokens.size[size],
        sizeNum = (0, import_core.isVariable)(token) ? +token.val : size;
      return getSizedElevation(sizeNum, extras);
    }
  },
  getSizedElevation = function (val, param) {
    var {
        theme,
        tokens
      } = param,
      num = 0;
    if (val === !0) {
      var _$val = (0, import_core.getVariableValue)(tokens.size.true);
      typeof _$val == "number" ? num = _$val : num = 10;
    } else num = +val;
    if (num !== 0) {
      var [height, shadowRadius] = [Math.round(num / 4 + 1), Math.round(num / 2 + 2)],
        shadow = {
          shadowColor: theme.shadowColor,
          shadowRadius,
          shadowOffset: {
            height,
            width: 0
          },
          ...(import_core.isAndroid ? {
            elevationAndroid: 2 * height
          } : {})
        };
      return shadow;
    }
  };
//# sourceMappingURL=getElevation.native.js.map
