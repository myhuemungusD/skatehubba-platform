import * as React from "react";
function useConstant(fn) {
  if (typeof document > "u") return React.useMemo(function () {
    return fn();
  }, []);
  var ref = React.useRef(void 0);
  return ref.current || (ref.current = {
    v: fn()
  }), ref.current.v;
}
export { useConstant };
//# sourceMappingURL=index.native.js.map
