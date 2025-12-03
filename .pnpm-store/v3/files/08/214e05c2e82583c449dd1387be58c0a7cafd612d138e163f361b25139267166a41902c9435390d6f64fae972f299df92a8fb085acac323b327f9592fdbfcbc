import React from "react";
import { isWeb } from "@tamagui/constants";
import { getWindowSize, subscribe } from "./helpers.mjs";
import { initialValue } from "./initialValue.mjs";
import { configureInitialWindowDimensions } from "./initialValue.mjs";
function useWindowDimensions({
  serverValue = initialValue
} = {}) {
  return React.useSyncExternalStore(subscribe, getWindowSize, () => isWeb ? serverValue : getWindowSize());
}
export { configureInitialWindowDimensions, useWindowDimensions };
//# sourceMappingURL=index.mjs.map
