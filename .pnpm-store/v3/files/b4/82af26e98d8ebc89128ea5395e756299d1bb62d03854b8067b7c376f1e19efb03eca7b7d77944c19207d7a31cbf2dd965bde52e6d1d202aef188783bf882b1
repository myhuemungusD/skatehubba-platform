import { getVariableValue, styled } from "@tamagui/core";
import { getSize } from "@tamagui/get-token";
import { ThemeableStack } from "@tamagui/stacks";
import { CheckboxStyledContext } from "./CheckboxStyledContext.native.js";
var INDICATOR_NAME = "CheckboxIndicator",
  CheckboxIndicatorFrame = styled(ThemeableStack, {
    // use Checkbox for easier themes
    name: INDICATOR_NAME,
    context: CheckboxStyledContext,
    variants: {
      unstyled: {
        false: {}
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  CHECKBOX_NAME = "Checkbox",
  CheckboxFrame = styled(ThemeableStack, {
    name: CHECKBOX_NAME,
    tag: "button",
    context: CheckboxStyledContext,
    variants: {
      unstyled: {
        false: {
          size: "$true",
          backgroundColor: "$background",
          alignItems: "center",
          justifyContent: "center",
          pressTheme: !0,
          focusable: !0,
          borderWidth: 1,
          borderColor: "$borderColor",
          hoverStyle: {
            borderColor: "$borderColorHover"
          },
          focusStyle: {
            borderColor: "$borderColorFocus"
          },
          focusVisibleStyle: {
            outlineStyle: "solid",
            outlineWidth: 2,
            outlineColor: "$outlineColor"
          }
        }
      },
      disabled: {
        true: {
          pointerEvents: "none",
          userSelect: "none",
          cursor: "not-allowed",
          hoverStyle: {
            borderColor: "$borderColor",
            backgroundColor: "$background"
          },
          pressStyle: {
            borderColor: "$borderColor",
            backgroundColor: "$background"
          },
          focusStyle: {
            outlineWidth: 0
          }
        }
      },
      size: {
        "...size": function (val) {
          var radiusToken = getVariableValue(getSize(val)) / 8;
          return {
            borderRadius: radiusToken
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  });
export { CheckboxFrame, CheckboxIndicatorFrame };
//# sourceMappingURL=Checkbox.native.js.map
