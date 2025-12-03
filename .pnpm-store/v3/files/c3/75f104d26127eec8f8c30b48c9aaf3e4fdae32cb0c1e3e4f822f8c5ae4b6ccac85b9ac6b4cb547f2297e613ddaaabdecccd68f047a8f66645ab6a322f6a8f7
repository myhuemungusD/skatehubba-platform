import { useEffect, useLayoutEffect } from "react";
import { AbortError } from "./errors.mjs";
const DEBUG_LEVEL = 0;
function useAsyncEffect(cb, deps = []) {
  useAsyncEffectOfType(useEffect, cb, deps);
}
function useAsyncLayoutEffect(cb, deps = []) {
  useAsyncEffectOfType(useLayoutEffect, cb, deps);
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
      if (error instanceof AbortError) return DEBUG_LEVEL > 2 && console.info(`\u{1F41B} useAsyncEffect aborted: ${error.message}`), null;
      if (typeof error == "object" && error.name === "AbortError") return null;
      throw error;
    }
    return () => {
      signal.aborted || controller.abort();
    };
  }, deps);
}
export { useAsyncEffect, useAsyncEffectOfType, useAsyncLayoutEffect };
//# sourceMappingURL=useAsyncEffect.mjs.map
