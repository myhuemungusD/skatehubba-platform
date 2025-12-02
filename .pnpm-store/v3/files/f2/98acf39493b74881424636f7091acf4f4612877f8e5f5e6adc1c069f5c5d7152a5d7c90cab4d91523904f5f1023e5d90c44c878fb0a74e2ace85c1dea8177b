import { useEffect, useLayoutEffect } from "react";
import { AbortError } from "./errors.native.js";
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
  useAsyncEffectOfType(useEffect, cb, deps);
}
function useAsyncLayoutEffect(cb) {
  var deps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  useAsyncEffectOfType(useLayoutEffect, cb, deps);
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
      if (_instanceof(error, AbortError)) return DEBUG_LEVEL > 2 && console.info(`\u{1F41B} useAsyncEffect aborted: ${error.message}`), null;
      if ((typeof error > "u" ? "undefined" : _type_of(error)) === "object" && error.name === "AbortError") return null;
      throw error;
    }
    return function () {
      signal.aborted || controller.abort();
    };
  }, deps);
}
export { useAsyncEffect, useAsyncEffectOfType, useAsyncLayoutEffect };
//# sourceMappingURL=useAsyncEffect.native.js.map
