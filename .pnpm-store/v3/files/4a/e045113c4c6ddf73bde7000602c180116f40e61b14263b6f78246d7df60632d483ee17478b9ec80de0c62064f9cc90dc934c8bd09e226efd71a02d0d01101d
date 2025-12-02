import React, { useEffect, useLayoutEffect } from "react";
const IS_REACT_19 = typeof React.use < "u",
  isWeb = !0,
  isWindowDefined = typeof window < "u",
  isServer = isWeb && !isWindowDefined,
  isClient = isWeb && isWindowDefined,
  useIsomorphicLayoutEffect = isServer ? useEffect : useLayoutEffect,
  isChrome = typeof navigator < "u" && /Chrome/.test(navigator.userAgent || ""),
  isWebTouchable = isClient && ("ontouchstart" in window || navigator.maxTouchPoints > 0),
  isTouchable = !isWeb || isWebTouchable,
  isAndroid = !1,
  isIos = process.env.TEST_NATIVE_PLATFORM === "ios",
  currentPlatform = "web";
export { IS_REACT_19, currentPlatform, isAndroid, isChrome, isClient, isIos, isServer, isTouchable, isWeb, isWebTouchable, isWindowDefined, useIsomorphicLayoutEffect };
//# sourceMappingURL=constants.mjs.map
