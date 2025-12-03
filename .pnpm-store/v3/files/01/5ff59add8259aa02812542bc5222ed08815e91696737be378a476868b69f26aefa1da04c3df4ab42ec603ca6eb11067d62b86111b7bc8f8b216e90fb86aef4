var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var helpers_exports = {};
__export(helpers_exports, {
  getWindowSize: () => getWindowSize,
  subscribe: () => subscribe
});
module.exports = __toCommonJS(helpers_exports);
var import_constants = require("@tamagui/constants"),
  import_initialValue = require("./initialValue.cjs");
let lastSize = import_initialValue.initialValue,
  docEl = null;
function getWindowSize() {
  if (!import_constants.isClient) return import_initialValue.initialValue;
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
if (import_constants.isClient) {
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