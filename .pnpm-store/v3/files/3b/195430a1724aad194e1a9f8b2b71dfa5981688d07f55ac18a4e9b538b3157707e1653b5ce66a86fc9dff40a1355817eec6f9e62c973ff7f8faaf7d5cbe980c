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
var useAsyncEffect_exports = {};
__export(useAsyncEffect_exports, {
  useAsyncEffect: () => useAsyncEffect,
  useAsyncEffectOfType: () => useAsyncEffectOfType,
  useAsyncLayoutEffect: () => useAsyncLayoutEffect
});
module.exports = __toCommonJS(useAsyncEffect_exports);
var import_react = require("react"),
  import_errors = require("./errors.native.js");
function _instanceof(left, right) {
  return right != null && typeof Symbol < "u" && right[Symbol.hasInstance] ? !!right[Symbol.hasInstance](left) : left instanceof right;
}
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var DEBUG_LEVEL = 0;
function useAsyncEffect(cb) {
  var deps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  useAsyncEffectOfType(import_react.useEffect, cb, deps);
}
function useAsyncLayoutEffect(cb) {
  var deps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  useAsyncEffectOfType(import_react.useLayoutEffect, cb, deps);
}
function useAsyncEffectOfType(type, cb) {
  var deps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  type(function () {
    var controller = new AbortController(),
      signal = controller.signal;
    try {
      var value = cb(signal, ...deps);
      Promise.resolve(value).then(async function (res) {
        if (res && typeof res == "function") {
          if (signal.aborted) return res();
          signal.addEventListener("abort", res);
        }
      }).catch(handleError);
    } catch (error) {
      handleError(error);
    }
    function handleError(error) {
      if (_instanceof(error, import_errors.AbortError)) return DEBUG_LEVEL > 2 && console.info(`\u{1F41B} useAsyncEffect aborted: ${error.message}`), null;
      if ((typeof error > "u" ? "undefined" : _type_of(error)) === "object" && error.name === "AbortError") return null;
      throw error;
    }
    return function () {
      signal.aborted || controller.abort();
    };
  }, deps);
}
//# sourceMappingURL=useAsyncEffect.native.js.map
