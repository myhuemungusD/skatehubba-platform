import { getConfig, isVariable } from "@tamagui/core";
const getFontSize = (inSize, opts) => {
    const res = getFontSizeVariable(inSize, opts);
    return isVariable(res) ? +res.val : res ? +res : 16;
  },
  getFontSizeVariable = (inSize, opts) => {
    const token = getFontSizeToken(inSize, opts);
    if (!token) return inSize;
    const conf = getConfig();
    return conf.fontsParsed[opts?.font || conf.defaultFontToken]?.size[token];
  },
  getFontSizeToken = (inSize, opts) => {
    if (typeof inSize == "number") return null;
    const relativeSize = opts?.relativeSize || 0,
      conf = getConfig(),
      fontSize = conf.fontsParsed[opts?.font || conf.defaultFontToken]?.size ||
      // fallback to size tokens
      conf.tokensParsed.size,
      size = (inSize === "$true" && !("$true" in fontSize) ? "$4" : inSize) ?? ("$true" in fontSize ? "$true" : "$4"),
      sizeTokens = Object.keys(fontSize);
    let foundIndex = sizeTokens.indexOf(size);
    foundIndex === -1 && size.endsWith(".5") && (foundIndex = sizeTokens.indexOf(size.replace(".5", ""))), process.env.NODE_ENV === "development" && foundIndex === -1 && console.warn("No font size found", size, opts, "in size tokens", sizeTokens);
    const tokenIndex = Math.min(Math.max(0, foundIndex + relativeSize), sizeTokens.length - 1);
    return sizeTokens[tokenIndex] ?? size;
  };
export { getFontSize, getFontSizeToken, getFontSizeVariable };
//# sourceMappingURL=getFontSize.mjs.map
