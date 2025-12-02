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
var insertFont_exports = {};
__export(insertFont_exports, {
  insertFont: () => insertFont,
  parseFont: () => parseFont,
  registerFontVariables: () => registerFontVariables,
  updateFont: () => updateFont
});
module.exports = __toCommonJS(insertFont_exports);
var import_config = require("./config.native.js"),
  import_constants = require("./constants/constants.native.js"),
  import_createFont = require("./createFont.native.js"),
  import_createVariables = require("./createVariables.native.js"),
  import_registerCSSVariable = require("./helpers/registerCSSVariable.native.js");
function insertFont(name, fontIn) {
  var font = (0, import_createFont.createFont)(fontIn),
    tokened = (0, import_createVariables.createVariables)(font, name),
    parsed = parseFont(tokened);
  if (0) var fontVars, styleElement;
  return (0, import_config.setConfigFont)(name, tokened, parsed), parsed;
}
var updateFont = insertFont;
function parseFont(definition) {
  var parsed = {};
  for (var attrKey in definition) {
    var attr = definition[attrKey];
    if (attrKey === "family" || attrKey === "face") parsed[attrKey] = attr;else {
      parsed[attrKey] = {};
      for (var key in attr) {
        var _val_val,
          val = attr[key];
        ((_val_val = val.val) === null || _val_val === void 0 ? void 0 : _val_val[0]) === "$" && (val = val.val), parsed[attrKey][`$${key}`] = val;
      }
    }
  }
  return parsed;
}
function registerFontVariables(parsedFont) {
  var response = [];
  for (var fkey in parsedFont) if (fkey !== "face") if (fkey === "family") {
    var val = parsedFont[fkey];
    (0, import_registerCSSVariable.registerCSSVariable)(val), response.push((0, import_registerCSSVariable.variableToCSS)(val));
  } else for (var fskey in parsedFont[fkey]) {
    var fval = parsedFont[fkey][fskey];
    if (typeof fval != "string") {
      var val1 = parsedFont[fkey][fskey];
      (0, import_registerCSSVariable.registerCSSVariable)(val1), response.push((0, import_registerCSSVariable.variableToCSS)(val1));
    }
  }
  return response;
}
//# sourceMappingURL=insertFont.native.js.map
