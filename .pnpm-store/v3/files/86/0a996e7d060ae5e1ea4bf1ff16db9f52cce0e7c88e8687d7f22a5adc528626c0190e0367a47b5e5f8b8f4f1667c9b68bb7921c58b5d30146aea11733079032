import { useContext, useEffect, useId, useMemo } from "react";
import { ZIndexHardcodedContext, ZIndexStackContext } from "./context";
const ZIndicesByContext = {}, CurrentPortalZIndices = {}, useStackedZIndex = (props) => {
  if (process.env.TAMAGUI_STACK_Z_INDEX_GLOBAL) {
    const { stackZIndex, zIndex: zIndexProp } = props, id = useId(), zIndex = useMemo(() => {
      if (stackZIndex && stackZIndex !== "global" && zIndexProp === void 0) {
        const highest = Object.values(CurrentPortalZIndices).reduce(
          (acc, cur) => Math.max(acc, cur),
          0
        );
        return Math.max(stackZIndex === !0 ? 1 : stackZIndex, highest + 1);
      }
      return zIndexProp ?? 1e3;
    }, [stackZIndex]);
    return useEffect(() => {
      if (typeof stackZIndex == "number")
        return CurrentPortalZIndices[id] = stackZIndex, () => {
          delete CurrentPortalZIndices[id];
        };
    }, [stackZIndex]), zIndex;
  } else {
    const { stackZIndex, zIndex: zIndexProp } = props, id = useId(), stackingContextLevel = useContext(ZIndexStackContext), stackLayer = stackZIndex === "global" ? 0 : stackingContextLevel, hardcoded = useContext(ZIndexHardcodedContext);
    ZIndicesByContext[stackLayer] ||= {};
    const stackContext = ZIndicesByContext[stackLayer], zIndex = useMemo(() => {
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
    return useEffect(() => {
      if (stackZIndex)
        return stackContext[id] = zIndex, () => {
          delete stackContext[id];
        };
    }, [zIndex]), zIndex;
  }
};
export {
  useStackedZIndex
};
//# sourceMappingURL=useStackedZIndex.js.map
