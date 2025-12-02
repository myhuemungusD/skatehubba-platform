import * as React from "react";
function usePrevious(value) {
  var ref = React.useRef({
    value,
    previous: value
  });
  return React.useMemo(function () {
    return ref.current.value !== value && (ref.current.previous = ref.current.value, ref.current.value = value), ref.current.previous;
  }, [value]);
}
export { usePrevious };
//# sourceMappingURL=index.native.js.map
