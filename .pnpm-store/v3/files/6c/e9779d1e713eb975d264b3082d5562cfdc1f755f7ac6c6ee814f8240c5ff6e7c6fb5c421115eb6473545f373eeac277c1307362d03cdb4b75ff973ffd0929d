import * as React from "react";
function usePrevious(value) {
  const ref = React.useRef({
    value,
    previous: value
  });
  return React.useMemo(() => (ref.current.value !== value && (ref.current.previous = ref.current.value, ref.current.value = value), ref.current.previous), [value]);
}
export { usePrevious };
//# sourceMappingURL=index.mjs.map
