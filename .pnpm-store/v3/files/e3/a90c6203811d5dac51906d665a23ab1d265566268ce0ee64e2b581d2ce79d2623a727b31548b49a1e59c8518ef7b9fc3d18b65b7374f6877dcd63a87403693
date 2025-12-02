import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import * as React from "react";
function useGet(currentValue, initialValue, forwardToFunction) {
  var curRef = React.useRef(initialValue ?? currentValue);
  return useIsomorphicLayoutEffect(function () {
    curRef.current = currentValue;
  }), React.useCallback(forwardToFunction ? function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    var _curRef_current;
    return (_curRef_current = curRef.current) === null || _curRef_current === void 0 ? void 0 : _curRef_current.apply(null, args);
  } : function () {
    return curRef.current;
  }, []);
}
export { useGet };
//# sourceMappingURL=useGet.native.js.map
