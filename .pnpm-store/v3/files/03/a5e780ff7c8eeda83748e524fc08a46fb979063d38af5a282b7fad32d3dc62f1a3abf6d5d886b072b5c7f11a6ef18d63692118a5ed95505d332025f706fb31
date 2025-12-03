import { View, styled } from "@tamagui/core";
import { getElevation } from "./getElevation.native.js";
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var fullscreenStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  getInset = function (val) {
    return val && (typeof val > "u" ? "undefined" : _type_of(val)) === "object" ? val : {
      top: val,
      left: val,
      bottom: val,
      right: val
    };
  },
  variants = {
    fullscreen: {
      true: fullscreenStyle
    },
    elevation: {
      "...size": getElevation,
      ":number": getElevation
    },
    inset: getInset
  },
  YStack = styled(View, {
    flexDirection: "column",
    variants
  });
YStack.displayName = "YStack";
var XStack = styled(View, {
  flexDirection: "row",
  variants
});
XStack.displayName = "XStack";
var ZStack = styled(YStack, {
  position: "relative"
}, {
  neverFlatten: !0,
  isZStack: !0
});
ZStack.displayName = "ZStack";
export { XStack, YStack, ZStack, fullscreenStyle };
//# sourceMappingURL=Stacks.native.js.map
