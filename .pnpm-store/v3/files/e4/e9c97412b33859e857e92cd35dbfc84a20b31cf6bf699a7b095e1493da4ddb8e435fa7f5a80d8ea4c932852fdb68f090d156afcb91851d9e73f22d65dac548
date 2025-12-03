var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var getFontSize_exports = {};
__export(getFontSize_exports, {
  getFontSize: () => getFontSize,
  getFontSizeToken: () => getFontSizeToken,
  getFontSizeVariable: () => getFontSizeVariable
});
module.exports = __toCommonJS(getFontSize_exports);
var import_core = require("@tamagui/core");
const getFontSize = (inSize, opts) => {
  const res = getFontSizeVariable(inSize, opts);
  return (0, import_core.isVariable)(res) ? +res.val : res ? +res : 16;
}, getFontSizeVariable = (inSize, opts) => {
  const token = getFontSizeToken(inSize, opts);
  if (!token)
    return inSize;
  const conf = (0, import_core.getConfig)();
  return conf.fontsParsed[opts?.font || conf.defaultFontToken]?.size[token];
}, getFontSizeToken = (inSize, opts) => {
  if (typeof inSize == "number")
    return null;
  const relativeSize = opts?.relativeSize || 0, conf = (0, import_core.getConfig)(), fontSize = conf.fontsParsed[opts?.font || conf.defaultFontToken]?.size || // fallback to size tokens
  conf.tokensParsed.size, size = (inSize === "$true" && !("$true" in fontSize) ? "$4" : inSize) ?? ("$true" in fontSize ? "$true" : "$4"), sizeTokens = Object.keys(fontSize);
  let foundIndex = sizeTokens.indexOf(size);
  foundIndex === -1 && size.endsWith(".5") && (foundIndex = sizeTokens.indexOf(size.replace(".5", ""))), process.env.NODE_ENV === "development" && foundIndex === -1 && console.warn("No font size found", size, opts, "in size tokens", sizeTokens);
  const tokenIndex = Math.min(
    Math.max(0, foundIndex + relativeSize),
    sizeTokens.length - 1
  );
  return sizeTokens[tokenIndex] ?? size;
};
//# sourceMappingURL=getFontSize.js.map
