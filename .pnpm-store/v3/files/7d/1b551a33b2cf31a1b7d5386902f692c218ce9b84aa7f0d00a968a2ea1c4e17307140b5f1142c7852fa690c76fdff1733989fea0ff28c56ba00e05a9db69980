import { View, styled } from "@tamagui/core";
import { getElevation } from "./getElevation.mjs";
const fullscreenStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  getInset = val => val && typeof val == "object" ? val : {
    top: val,
    left: val,
    bottom: val,
    right: val
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
const XStack = styled(View, {
  flexDirection: "row",
  variants
});
XStack.displayName = "XStack";
const ZStack = styled(YStack, {
  position: "relative"
}, {
  neverFlatten: !0,
  isZStack: !0
});
ZStack.displayName = "ZStack";
export { XStack, YStack, ZStack, fullscreenStyle };
//# sourceMappingURL=Stacks.mjs.map
