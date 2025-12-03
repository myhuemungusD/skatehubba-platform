import { useCallback } from "react";
function useCreateShallowSetState(setter, debug) {
  return useCallback(stateOrGetState => {
    setter(prev => {
      const next = typeof stateOrGetState == "function" ? stateOrGetState(prev) : stateOrGetState,
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
  for (const key in next) if (prev[key] !== next[key]) return !1;
  return !0;
}
export { isEqualShallow, mergeIfNotShallowEqual, useCreateShallowSetState };
//# sourceMappingURL=index.mjs.map
