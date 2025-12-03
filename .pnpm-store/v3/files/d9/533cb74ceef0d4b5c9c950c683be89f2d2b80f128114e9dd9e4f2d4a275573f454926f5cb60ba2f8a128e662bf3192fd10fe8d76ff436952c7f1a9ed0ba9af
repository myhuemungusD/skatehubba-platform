var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var useDisableScroll_exports = {};
__export(useDisableScroll_exports, {
  useDisableBodyScroll: () => useDisableBodyScroll
});
module.exports = __toCommonJS(useDisableScroll_exports);
var import_react = require("react");
const canUseDOM = () => typeof window < "u" && !!window.document && !!window.document.createElement;
let refCount = 0, previousBodyStyle = null;
const useDisableBodyScroll = (enabled) => {
  (0, import_react.useEffect)(() => {
    if (!enabled || !canUseDOM())
      return;
    const bodyEl = document.documentElement;
    return ++refCount === 1 && (previousBodyStyle = {
      scrollbarGutter: bodyEl.style.scrollbarGutter,
      overflow: bodyEl.style.overflow
    }, bodyEl.style.scrollbarGutter = "stable", bodyEl.style.overflow = "hidden"), () => {
      --refCount === 0 && previousBodyStyle && (Object.assign(bodyEl.style, previousBodyStyle), previousBodyStyle = null);
    };
  }, [enabled]);
};
//# sourceMappingURL=useDisableScroll.js.map
