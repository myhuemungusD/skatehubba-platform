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
  simpleHash: () => simpleHash
});
module.exports = __toCommonJS(index_exports);
var cache = /* @__PURE__ */new Map(),
  cacheSize = 0,
  simpleHash = function (strIn) {
    var hashMin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 10;
    if (cache.has(strIn)) return cache.get(strIn);
    var str = strIn;
    str[0] === "v" && str.startsWith("var(") && (str = str.slice(6, str.length - 1));
    for (var hash = 0, valids = "", added = 0, len = str.length, i = 0; i < len; i++) {
      if (hashMin !== "strict" && added <= hashMin) {
        var char = str.charCodeAt(i);
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
    var res = valids + (hash ? Math.abs(hash) : "");
    return cacheSize > 1e4 && (cache.clear(), cacheSize = 0), cache.set(strIn, res), cacheSize++, res;
  },
  hashChar = function (hash, c) {
    return Math.imul(31, hash) + c.charCodeAt(0) | 0;
  };
function isValidCSSCharCode(code) {
  return (
    // A-Z
    code >= 65 && code <= 90 ||
    // a-z
    code >= 97 && code <= 122 ||
    // _
    code === 95 ||
    // -
    code === 45 ||
    // 0-9
    code >= 48 && code <= 57
  );
}
//# sourceMappingURL=index.native.js.map
