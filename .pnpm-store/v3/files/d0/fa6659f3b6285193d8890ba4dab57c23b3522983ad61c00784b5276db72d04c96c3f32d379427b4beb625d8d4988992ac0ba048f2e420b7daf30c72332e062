import { getVariableValue, styled } from "@tamagui/core";
import { getSize } from "@tamagui/get-token";
import { ThemeableStack } from "@tamagui/stacks";
var RADIO_GROUP_ITEM_NAME = "RadioGroupItem",
  RadioGroupItemFrame = styled(ThemeableStack, {
    name: RADIO_GROUP_ITEM_NAME,
    tag: "button",
    variants: {
      unstyled: {
        false: {
          size: "$true",
          borderRadius: 1e3,
          backgroundColor: "$background",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "$borderColor",
          padding: 0,
          hoverStyle: {
            borderColor: "$borderColorHover",
            backgroundColor: "$backgroundHover"
          },
          focusStyle: {
            borderColor: "$borderColorHover",
            backgroundColor: "$backgroundHover"
          },
          focusVisibleStyle: {
            outlineStyle: "solid",
            outlineWidth: 2,
            outlineColor: "$outlineColor"
          },
          pressStyle: {
            borderColor: "$borderColorFocus",
            backgroundColor: "$backgroundFocus"
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
          focusVisibleStyle: {
            outlineWidth: 0
          }
        }
      },
      size: {
        "...size": function (value, param) {
          var {
              props
            } = param,
            _props_scaleSize,
            size = Math.floor(getVariableValue(getSize(value)) * ((_props_scaleSize = props.scaleSize) !== null && _props_scaleSize !== void 0 ? _props_scaleSize : 0.5));
          return {
            width: size,
            height: size
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  RADIO_GROUP_INDICATOR_NAME = "RadioGroupIndicator",
  RadioGroupIndicatorFrame = styled(ThemeableStack, {
    name: RADIO_GROUP_INDICATOR_NAME,
    variants: {
      unstyled: {
        false: {
          width: "33%",
          height: "33%",
          borderRadius: 1e3,
          backgroundColor: "$color",
          pressTheme: !0
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  RADIO_GROUP_NAME = "RadioGroup",
  RadioGroupFrame = styled(ThemeableStack, {
    name: RADIO_GROUP_NAME,
    variants: {
      orientation: {
        horizontal: {
          flexDirection: "row",
          spaceDirection: "horizontal"
        },
        vertical: {
          flexDirection: "column",
          spaceDirection: "vertical"
        }
      }
    }
  });
export { RadioGroupFrame, RadioGroupIndicatorFrame, RadioGroupItemFrame };
//# sourceMappingURL=RadioGroup.native.js.map
