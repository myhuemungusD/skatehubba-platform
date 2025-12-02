import { styled } from "@tamagui/core";
import { YStack } from "./Stacks.mjs";
import { bordered, circular, elevate, focusTheme, hoverTheme, padded, pressTheme, radiused } from "./variants.mjs";
const chromelessStyle = {
    backgroundColor: "transparent",
    borderColor: "transparent",
    shadowColor: "transparent",
    hoverStyle: {
      borderColor: "transparent"
    }
  },
  themeableVariants = {
    backgrounded: {
      true: {
        backgroundColor: "$background"
      }
    },
    radiused,
    hoverTheme,
    pressTheme,
    focusTheme,
    circular,
    padded,
    elevate,
    bordered,
    transparent: {
      true: {
        backgroundColor: "transparent"
      }
    },
    chromeless: {
      true: chromelessStyle,
      all: {
        ...chromelessStyle,
        hoverStyle: chromelessStyle,
        pressStyle: chromelessStyle,
        focusStyle: chromelessStyle
      }
    }
  },
  ThemeableStack = styled(YStack, {
    variants: themeableVariants
  });
export { ThemeableStack, themeableVariants };
//# sourceMappingURL=ThemeableStack.mjs.map
