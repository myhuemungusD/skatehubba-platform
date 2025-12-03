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
var useStackedZIndex_exports = {};
__export(useStackedZIndex_exports, {
  useStackedZIndex: () => useStackedZIndex
});
module.exports = __toCommonJS(useStackedZIndex_exports);
var import_react = require("react"), import_context = require("./context");
const ZIndicesByContext = {}, CurrentPortalZIndices = {}, useStackedZIndex = (props) => {
  if (process.env.TAMAGUI_STACK_Z_INDEX_GLOBAL) {
    const { stackZIndex, zIndex: zIndexProp } = props, id = (0, import_react.useId)(), zIndex = (0, import_react.useMemo)(() => {
      if (stackZIndex && stackZIndex !== "global" && zIndexProp === void 0) {
        const highest = Object.values(CurrentPortalZIndices).reduce(
          (acc, cur) => Math.max(acc, cur),
          0
        );
        return Math.max(stackZIndex === !0 ? 1 : stackZIndex, highest + 1);
      }
      return zIndexProp ?? 1e3;
    }, [stackZIndex]);
    return (0, import_react.useEffect)(() => {
      if (typeof stackZIndex == "number")
        return CurrentPortalZIndices[id] = stackZIndex, () => {
          delete CurrentPortalZIndices[id];
        };
    }, [stackZIndex]), zIndex;
  } else {
    const { stackZIndex, zIndex: zIndexProp } = props, id = (0, import_react.useId)(), stackingContextLevel = (0, import_react.useContext)(import_context.ZIndexStackContext), stackLayer = stackZIndex === "global" ? 0 : stackingContextLevel, hardcoded = (0, import_react.useContext)(import_context.ZIndexHardcodedContext);
    ZIndicesByContext[stackLayer] ||= {};
    const stackContext = ZIndicesByContext[stackLayer], zIndex = (0, import_react.useMemo)(() => {
      if (typeof zIndexProp == "number")
        return zIndexProp;
      if (stackZIndex) {
        if (hardcoded)
          return hardcoded + 1;
        const highest = Object.values(stackContext).reduce(
          (acc, cur) => Math.max(acc, cur),
          0
        ), found = stackLayer * 5e3 + highest + 1;
        return typeof stackZIndex == "number" ? stackZIndex + found : found;
      }
      return 1;
    }, [stackLayer, zIndexProp, stackZIndex]);
    return (0, import_react.useEffect)(() => {
      if (stackZIndex)
        return stackContext[id] = zIndex, () => {
          delete stackContext[id];
        };
    }, [zIndex]), zIndex;
  }
};
//# sourceMappingURL=useStackedZIndex.js.map
