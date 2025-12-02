import { getConfig, isVariable } from "@tamagui/core";
var getFontSize = function (inSize, opts) {
    var res = getFontSizeVariable(inSize, opts);
    return isVariable(res) ? +res.val : res ? +res : 16;
  },
  getFontSizeVariable = function (inSize, opts) {
    var token = getFontSizeToken(inSize, opts);
    if (!token) return inSize;
    var conf = getConfig(),
      font = conf.fontsParsed[opts?.font || conf.defaultFontToken];
    return font?.size[token];
  },
  getFontSizeToken = function (inSize, opts) {
    if (typeof inSize == "number") return null;
    var relativeSize = opts?.relativeSize || 0,
      conf = getConfig(),
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
export { getFontSize, getFontSizeToken, getFontSizeVariable };
//# sourceMappingURL=getFontSize.native.js.map
