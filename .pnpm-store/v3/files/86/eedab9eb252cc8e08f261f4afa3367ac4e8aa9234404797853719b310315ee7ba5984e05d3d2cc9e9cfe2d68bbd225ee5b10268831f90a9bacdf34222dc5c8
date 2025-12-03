"use strict";

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
var useStackedZIndex_exports = {};
__export(useStackedZIndex_exports, {
  useStackedZIndex: () => useStackedZIndex
});
module.exports = __toCommonJS(useStackedZIndex_exports);
var import_react = require("react"),
  import_context = require("./context.native.js"),
  ZIndicesByContext = {},
  CurrentPortalZIndices = {},
  useStackedZIndex = function (props) {
    if (process.env.TAMAGUI_STACK_Z_INDEX_GLOBAL) {
      var {
          stackZIndex,
          zIndex: zIndexProp
        } = props,
        id = (0, import_react.useId)(),
        zIndex = (0, import_react.useMemo)(function () {
          if (stackZIndex && stackZIndex !== "global" && zIndexProp === void 0) {
            var highest = Object.values(CurrentPortalZIndices).reduce(function (acc, cur) {
              return Math.max(acc, cur);
            }, 0);
            return Math.max(stackZIndex === !0 ? 1 : stackZIndex, highest + 1);
          }
          return zIndexProp ?? 1e3;
        }, [stackZIndex]);
      return (0, import_react.useEffect)(function () {
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
        id1 = (0, import_react.useId)(),
        stackingContextLevel = (0, import_react.useContext)(import_context.ZIndexStackContext),
        stackLayer = stackZIndex1 === "global" ? 0 : stackingContextLevel,
        hardcoded = (0, import_react.useContext)(import_context.ZIndexHardcodedContext);
      (_ZIndicesByContext = ZIndicesByContext)[_stackLayer = stackLayer] || (_ZIndicesByContext[_stackLayer] = {});
      var stackContext = ZIndicesByContext[stackLayer],
        zIndex1 = (0, import_react.useMemo)(function () {
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
      return (0, import_react.useEffect)(function () {
        if (stackZIndex1) return stackContext[id1] = zIndex1, function () {
          delete stackContext[id1];
        };
      }, [zIndex1]), zIndex1;
    }
  };
//# sourceMappingURL=useStackedZIndex.native.js.map
