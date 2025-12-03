import { isClient } from "@tamagui/constants";
import { initialValue } from "./initialValue.mjs";
let lastSize = initialValue,
  docEl = null;
function getWindowSize() {
  if (!isClient) return initialValue;
  docEl ||= window.document.documentElement;
  const nextSize = {
    fontScale: 1,
    height: docEl.clientHeight,
    scale: window.devicePixelRatio || 1,
    width: docEl.clientWidth
  };
  return nextSize.height !== lastSize.height || nextSize.width !== lastSize.width || nextSize.scale !== lastSize.scale ? (lastSize = nextSize, nextSize) : lastSize;
}
const cbs = /* @__PURE__ */new Set();
if (isClient) {
  let flushUpdate = function () {
      lastUpdate = Date.now(), cbs.forEach(cb => cb(getWindowSize()));
    },
    lastUpdate = Date.now(),
    tm;
  const USER_MAX_MS = process.env.TAMAGUI_USE_WINDOW_DIMENSIONS_MAX_UPDATE_MS,
    updateMaxMs = USER_MAX_MS ? +USER_MAX_MS : 100,
    onResize = () => {
      clearTimeout(tm);
      const timeSinceLast = Date.now() - lastUpdate;
      timeSinceLast < updateMaxMs ? setTimeout(() => {
        flushUpdate();
      }, updateMaxMs - timeSinceLast) : flushUpdate();
    };
  window.addEventListener("resize", onResize);
}
function subscribe(cb) {
  return cbs.add(cb), () => cbs.delete(cb);
}
export { getWindowSize, subscribe };
//# sourceMappingURL=helpers.mjs.map
