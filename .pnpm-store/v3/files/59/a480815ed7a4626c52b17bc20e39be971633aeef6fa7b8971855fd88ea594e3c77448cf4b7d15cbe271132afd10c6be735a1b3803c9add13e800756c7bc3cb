import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import * as React from "react";
function useGet(currentValue, initialValue, forwardToFunction) {
  const curRef = React.useRef(initialValue ?? currentValue);
  return useIsomorphicLayoutEffect(() => {
    curRef.current = currentValue;
  }), React.useCallback(
    forwardToFunction ? (...args) => curRef.current?.apply(null, args) : () => curRef.current,
    []
  );
}
export {
  useGet
};
//# sourceMappingURL=useGet.js.map
