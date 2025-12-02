import { getTokenValue } from "@tamagui/web";
var getStackedZIndexProps = function (propsIn) {
    return {
      stackZIndex: propsIn.stackZIndex,
      zIndex: resolveViewZIndex(propsIn.zIndex)
    };
  },
  resolveViewZIndex = function (zIndex) {
    return typeof zIndex > "u" || zIndex === "unset" ? void 0 : typeof zIndex == "number" ? zIndex : getTokenValue(zIndex, "zIndex");
  };
export { getStackedZIndexProps, resolveViewZIndex };
//# sourceMappingURL=helpers.native.js.map
