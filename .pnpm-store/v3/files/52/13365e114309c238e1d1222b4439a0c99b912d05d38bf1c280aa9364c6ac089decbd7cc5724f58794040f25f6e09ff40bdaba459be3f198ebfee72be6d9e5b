import { getVariableValue, styled } from "@tamagui/core";
import { getSize } from "@tamagui/get-token";
import { ThemeableStack, YStack } from "@tamagui/stacks";
var SwitchThumb = styled(ThemeableStack, {
    name: "SwitchThumb",
    variants: {
      unstyled: {
        false: {
          size: "$true",
          backgroundColor: "$background",
          borderRadius: 1e3
        }
      },
      checked: {
        true: {}
      },
      size: {
        "...size": function (val) {
          var size = getSwitchHeight(val);
          return {
            height: size,
            width: size
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  getSwitchHeight = function (val) {
    return Math.round(getVariableValue(getSize(val)) * 0.65);
  },
  getSwitchWidth = function (val) {
    return getSwitchHeight(val) * 2;
  },
  SwitchFrame = styled(YStack, {
    name: "Switch",
    tag: "button",
    tabIndex: 0,
    variants: {
      unstyled: {
        false: {
          borderRadius: 1e3,
          backgroundColor: "$background",
          borderWidth: 2,
          borderColor: "$background",
          focusVisibleStyle: {
            outlineColor: "$outlineColor",
            outlineStyle: "solid",
            outlineWidth: 2
          }
        }
      },
      checked: {
        true: {}
      },
      size: {
        "...size": function (val) {
          var height = getSwitchHeight(val) + 4,
            width = getSwitchWidth(val) + 4;
          return {
            height,
            minHeight: height,
            width
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  });
export { SwitchFrame, SwitchThumb };
//# sourceMappingURL=Switch.native.js.map
