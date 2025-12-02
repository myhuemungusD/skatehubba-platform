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
var getFontSize_exports = {};
__export(getFontSize_exports, {
  getFontSize: () => getFontSize,
  getFontSizeToken: () => getFontSizeToken,
  getFontSizeVariable: () => getFontSizeVariable
});
module.exports = __toCommonJS(getFontSize_exports);
var import_core = require("@tamagui/core"),
  getFontSize = function (inSize, opts) {
    var res = getFontSizeVariable(inSize, opts);
    return (0, import_core.isVariable)(res) ? +res.val : res ? +res : 16;
  },
  getFontSizeVariable = function (inSize, opts) {
    var token = getFontSizeToken(inSize, opts);
    if (!token) return inSize;
    var conf = (0, import_core.getConfig)(),
      font = conf.fontsParsed[opts?.font || conf.defaultFontToken];
    return font?.size[token];
  },
  getFontSizeToken = function (inSize, opts) {
    if (typeof inSize == "number") return null;
    var relativeSize = opts?.relativeSize || 0,
      conf = (0, import_core.getConfig)(),
      font = conf.fontsParsed[opts?.font || conf.defaultFontToken],
      fontSize = font?.size ||
      // fallback to size tokens
      conf.tokensParsed.size,
      _ref,
      size = (_ref = inSize === "$true" && !("$true" in fontSize) ? "$4" : inSize) !== null && _ref !== void 0 ? _ref : "$true" in fontSize ? "$true" : "$4",
      sizeTokens = Object.keys(fontSize),
      foundIndex = sizeTokens.indexOf(size);
    foundIndex === -1 && size.endsWith(".5") && (foundIndex = sizeTokens.indexOf(size.replace(".5", ""))), process.env.NODE_ENV === "development" && foundIndex === -1 && console.warn("No font size found", size, opts, "in size tokens", sizeTokens);
    var tokenIndex = Math.min(Math.max(0, foundIndex + relativeSize), sizeTokens.length - 1),
      _sizeTokens_tokenIndex;
    return (_sizeTokens_tokenIndex = sizeTokens[tokenIndex]) !== null && _sizeTokens_tokenIndex !== void 0 ? _sizeTokens_tokenIndex : size;
  };
//# sourceMappingURL=getFontSize.native.js.map
