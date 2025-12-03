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
var matchQuery_exports = {};
__export(matchQuery_exports, {
  matchQuery: () => matchQuery,
  parseQuery: () => parseQuery
});
module.exports = __toCommonJS(matchQuery_exports);
var RE_MEDIA_QUERY = /(?:(only|not)?\s*([^\s\(\)]+)(?:\s*and)?\s*)?(.+)?/i,
  RE_MQ_EXPRESSION = /\(\s*([^\s\:\)]+)\s*(?:\:\s*([^\s\)]+))?\s*\)/,
  RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/,
  RE_LENGTH_UNIT = /(em|rem|px|cm|mm|in|pt|pc)?$/,
  RE_RESOLUTION_UNIT = /(dpi|dpcm|dppx)?$/;
function matchQuery(mediaQuery, values) {
  return parseQuery(mediaQuery).some(function (query) {
    if (query) {
      var inverse = query.inverse,
        typeMatch = query.type === "all" || values.type === query.type;
      if (typeMatch && inverse || !(typeMatch || inverse)) return !1;
      var expressionsMatch = query.expressions.every(function (expression) {
        var feature = expression.feature,
          modifier = expression.modifier,
          expValue = expression.value,
          value = values[feature];
        if (!value) return !1;
        switch (feature) {
          case "orientation":
          case "scan":
            return value.toLowerCase() === expValue.toLowerCase();
          case "width":
          case "height":
          case "device-width":
          case "device-height":
            expValue = toPx(expValue), value = toPx(value);
            break;
          case "resolution":
            expValue = toDpi(expValue), value = toDpi(value);
            break;
          case "aspect-ratio":
          case "device-aspect-ratio":
          case /* Deprecated */
          "device-pixel-ratio":
            expValue = toDecimal(expValue), value = toDecimal(value);
            break;
          case "grid":
          case "color":
          case "color-index":
          case "monochrome":
            expValue = Number.parseInt(expValue, 10) || 1, value = Number.parseInt(value, 10) || 0;
            break;
        }
        switch (modifier) {
          case "min":
            return value >= expValue;
          case "max":
            return value <= expValue;
          default:
            return value === expValue;
        }
      });
      return expressionsMatch && !inverse || !expressionsMatch && inverse;
    }
  });
}
function parseQuery(mediaQuery) {
  return mediaQuery.split(",").map(function (query) {
    query = query.trim();
    var captures = query.match(RE_MEDIA_QUERY);
    if (!captures) return null;
    var modifier = captures[1],
      type = captures[2],
      expressionsCapture = captures[3] || "",
      expressions = expressionsCapture.match(/\([^\)]+\)/g) || [];
    return {
      inverse: !!modifier && modifier.toLowerCase() === "not",
      type: type ? type.toLowerCase() : "all",
      expressions: expressions.map(function (expression) {
        var captures2 = expression.match(RE_MQ_EXPRESSION),
          feature = captures2[1].toLowerCase().match(RE_MQ_FEATURE);
        return {
          modifier: feature[1],
          feature: feature[2],
          value: captures2[2]
        };
      })
    };
  });
}
function toDecimal(ratio) {
  var decimal = Number(ratio),
    numbers;
  return decimal || (numbers = ratio.match(/^(\d+)\s*\/\s*(\d+)$/), decimal = numbers[1] / numbers[2]), decimal;
}
function toDpi(resolution) {
  var _String_match,
    value = Number.parseFloat(resolution),
    units = (_String_match = String(resolution).match(RE_RESOLUTION_UNIT)) === null || _String_match === void 0 ? void 0 : _String_match[1];
  switch (units) {
    case "dpcm":
      return value / 2.54;
    case "dppx":
      return value * 96;
    default:
      return value;
  }
}
function toPx(length) {
  var _String_match,
    value = Number.parseFloat(length),
    units = (_String_match = String(length).match(RE_LENGTH_UNIT)) === null || _String_match === void 0 ? void 0 : _String_match[1];
  switch (units) {
    case "em":
      return value * 16;
    case "rem":
      return value * 16;
    case "cm":
      return value * 96 / 2.54;
    case "mm":
      return value * 96 / 2.54 / 10;
    case "in":
      return value * 96;
    case "pt":
      return value * 72;
    case "pc":
      return value * 72 / 12;
    default:
      return value;
  }
}
//# sourceMappingURL=matchQuery.native.js.map
