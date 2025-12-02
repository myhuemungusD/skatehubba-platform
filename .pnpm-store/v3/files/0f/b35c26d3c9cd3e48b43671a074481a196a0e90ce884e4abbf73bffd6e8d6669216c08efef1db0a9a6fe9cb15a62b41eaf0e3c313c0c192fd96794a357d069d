const cache = /* @__PURE__ */ new Map();
let cacheSize = 0;
const simpleHash = (strIn, hashMin = 10) => {
  if (cache.has(strIn))
    return cache.get(strIn);
  let str = strIn;
  str[0] === "v" && str.startsWith("var(") && (str = str.slice(6, str.length - 1));
  let hash = 0, valids = "", added = 0;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    if (hashMin !== "strict" && added <= hashMin) {
      const char = str.charCodeAt(i);
      if (char === 46) {
        valids += "--";
        continue;
      }
      if (isValidCSSCharCode(char)) {
        added++, valids += str[i];
        continue;
      }
    }
    hash = hashChar(hash, str[i]);
  }
  const res = valids + (hash ? Math.abs(hash) : "");
  return cacheSize > 1e4 && (cache.clear(), cacheSize = 0), cache.set(strIn, res), cacheSize++, res;
}, hashChar = (hash, c) => Math.imul(31, hash) + c.charCodeAt(0) | 0;
function isValidCSSCharCode(code) {
  return (
    // A-Z
    code >= 65 && code <= 90 || // a-z
    code >= 97 && code <= 122 || // _
    code === 95 || // -
    code === 45 || // 0-9
    code >= 48 && code <= 57
  );
}
export {
  simpleHash
};
//# sourceMappingURL=index.js.map
