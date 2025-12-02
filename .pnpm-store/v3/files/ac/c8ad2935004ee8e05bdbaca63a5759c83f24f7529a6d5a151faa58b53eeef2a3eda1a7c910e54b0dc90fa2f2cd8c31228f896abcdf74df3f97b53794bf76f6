import { useContext, useEffect, useId, useMemo } from "react";
import { ZIndexHardcodedContext, ZIndexStackContext } from "./context.native.js";
var ZIndicesByContext = {},
  CurrentPortalZIndices = {},
  useStackedZIndex = function (props) {
    if (process.env.TAMAGUI_STACK_Z_INDEX_GLOBAL) {
      var {
          stackZIndex,
          zIndex: zIndexProp
        } = props,
        id = useId(),
        zIndex = useMemo(function () {
          if (stackZIndex && stackZIndex !== "global" && zIndexProp === void 0) {
            var highest = Object.values(CurrentPortalZIndices).reduce(function (acc, cur) {
              return Math.max(acc, cur);
            }, 0);
            return Math.max(stackZIndex === !0 ? 1 : stackZIndex, highest + 1);
          }
          return zIndexProp ?? 1e3;
        }, [stackZIndex]);
      return useEffect(function () {
        if (typeof stackZIndex == "number") return CurrentPortalZIndices[id] = stackZIndex, function () {
          delete CurrentPortalZIndices[id];
        };
      }, [stackZIndex]), zIndex;
    } else {
      var _ZIndicesByContext,
        _stackLayer,
        {
          stackZIndex: stackZIndex1,
          zIndex: zIndexProp1
        } = props,
        id1 = useId(),
        stackingContextLevel = useContext(ZIndexStackContext),
        stackLayer = stackZIndex1 === "global" ? 0 : stackingContextLevel,
        hardcoded = useContext(ZIndexHardcodedContext);
      (_ZIndicesByContext = ZIndicesByContext)[_stackLayer = stackLayer] || (_ZIndicesByContext[_stackLayer] = {});
      var stackContext = ZIndicesByContext[stackLayer],
        zIndex1 = useMemo(function () {
          if (typeof zIndexProp1 == "number") return zIndexProp1;
          if (stackZIndex1) {
            if (hardcoded) return hardcoded + 1;
            var highest = Object.values(stackContext).reduce(function (acc, cur) {
                return Math.max(acc, cur);
              }, 0),
              found = stackLayer * 5e3 + highest + 1;
            return typeof stackZIndex1 == "number" ? stackZIndex1 + found : found;
          }
          return 1;
        }, [stackLayer, zIndexProp1, stackZIndex1]);
      return useEffect(function () {
        if (stackZIndex1) return stackContext[id1] = zIndex1, function () {
          delete stackContext[id1];
        };
      }, [zIndex1]), zIndex1;
    }
  };
export { useStackedZIndex };
//# sourceMappingURL=useStackedZIndex.native.js.map
