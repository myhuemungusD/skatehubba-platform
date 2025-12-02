import * as React from "react";
function useCallbackRef(callback) {
  var callbackRef = React.useRef(callback);
  return React.useEffect(function () {
    callbackRef.current = callback;
  }), React.useMemo(function () {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      var _callbackRef_current;
      return (_callbackRef_current = callbackRef.current) === null || _callbackRef_current === void 0 ? void 0 : _callbackRef_current.call(callbackRef, ...args);
    };
  }, []);
}
export { useCallbackRef };
//# sourceMappingURL=index.native.js.map
