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
  import_errors = require("./errors.cjs");
const DEBUG_LEVEL = 0;
function useAsyncEffect(cb, deps = []) {
  useAsyncEffectOfType(import_react.useEffect, cb, deps);
}
function useAsyncLayoutEffect(cb, deps = []) {
  useAsyncEffectOfType(import_react.useLayoutEffect, cb, deps);
}
function useAsyncEffectOfType(type, cb, deps = []) {
  type(() => {
    const controller = new AbortController(),
      signal = controller.signal;
    try {
      const value = cb(signal, ...deps);
      Promise.resolve(value).then(async res => {
        if (res && typeof res == "function") {
          if (signal.aborted) return res();
          signal.addEventListener("abort", res);
        }
      }).catch(handleError);
    } catch (error) {
      handleError(error);
    }
    function handleError(error) {
      if (error instanceof import_errors.AbortError) return DEBUG_LEVEL > 2 && console.info(`\u{1F41B} useAsyncEffect aborted: ${error.message}`), null;
      if (typeof error == "object" && error.name === "AbortError") return null;
      throw error;
    }
    return () => {
      signal.aborted || controller.abort();
    };
  }, deps);
}