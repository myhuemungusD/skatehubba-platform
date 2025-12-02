import React from "react";
import { isWeb } from "@tamagui/constants";
import { getWindowSize, subscribe } from "./helpers";
import { initialValue } from "./initialValue";
import { configureInitialWindowDimensions } from "./initialValue";
function useWindowDimensions({
  serverValue = initialValue
} = {}) {
  return React.useSyncExternalStore(
    subscribe,
    getWindowSize,
    () => isWeb ? serverValue : getWindowSize()
  );
}
export {
  configureInitialWindowDimensions,
  useWindowDimensions
};
//# sourceMappingURL=index.js.map
