import React from "react";
import { isWeb } from "@tamagui/constants";
import { getWindowSize, subscribe } from "./helpers.native.js";
import { initialValue } from "./initialValue.native.js";
import { configureInitialWindowDimensions } from "./initialValue.native.js";
function useWindowDimensions() {
  var {
    serverValue = initialValue
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return React.useSyncExternalStore(subscribe, getWindowSize, function () {
    return isWeb ? serverValue : getWindowSize();
  });
}
export { configureInitialWindowDimensions, useWindowDimensions };
//# sourceMappingURL=index.native.js.map
