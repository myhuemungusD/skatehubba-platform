import * as React from "react";
function setRef(ref, value) {
  typeof ref == "function" ? ref(value) : ref && (ref.current = value);
}
function composeRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) refs[_key] = arguments[_key];
  return function (node) {
    return refs.forEach(function (ref) {
      return setRef(ref, node);
    });
  };
}
function useComposedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) refs[_key] = arguments[_key];
  return React.useCallback(composeRefs(...refs), refs);
}
export { composeRefs, setRef, useComposedRefs };
//# sourceMappingURL=compose-refs.native.js.map
