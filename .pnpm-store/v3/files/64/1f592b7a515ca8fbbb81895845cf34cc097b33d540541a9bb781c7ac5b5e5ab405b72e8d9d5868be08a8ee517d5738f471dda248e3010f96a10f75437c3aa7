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
  isEqualShallow: () => isEqualShallow,
  mergeIfNotShallowEqual: () => mergeIfNotShallowEqual,
  useCreateShallowSetState: () => useCreateShallowSetState
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
function useCreateShallowSetState(setter, debug) {
  return (0, import_react.useCallback)(function (stateOrGetState) {
    setter(function (prev) {
      var next = typeof stateOrGetState == "function" ? stateOrGetState(prev) : stateOrGetState,
        update = mergeIfNotShallowEqual(prev, next);
      if (process.env.NODE_ENV === "development" && debug && update !== prev && (console.groupCollapsed("setStateShallow CHANGE", "=>", update), console.info("previously", prev), console.trace(), console.groupEnd(), debug === "break")) debugger;
      return update;
    });
  }, [setter, debug]);
}
function mergeIfNotShallowEqual(prev, next) {
  return !prev || !next || isEqualShallow(prev, next) ? prev || next : {
    ...prev,
    ...next
  };
}
function isEqualShallow(prev, next) {
  for (var key in next) if (prev[key] !== next[key]) return !1;
  return !0;
}
//# sourceMappingURL=index.native.js.map
