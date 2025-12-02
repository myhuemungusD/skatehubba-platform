import { composeEventHandlers } from "@tamagui/helpers";
import { ThemeableStack } from "@tamagui/stacks";
import { useControllableState } from "@tamagui/use-controllable-state";
import { createStyledContext, styled } from "@tamagui/web";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
const context = createStyledContext({
    color: ""
  }),
  NAME = "Toggle",
  ToggleFrame = styled(ThemeableStack, {
    name: NAME,
    tag: "button",
    context,
    variants: {
      unstyled: {
        false: {
          pressTheme: !0,
          backgroundColor: "$background",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          borderColor: "$borderColor",
          borderWidth: 1,
          margin: -1,
          hoverStyle: {
            backgroundColor: "$backgroundHover"
          },
          pressStyle: {
            backgroundColor: "$backgroundPress"
          },
          focusStyle: {
            borderColor: "$borderColorFocus"
          },
          focusVisibleStyle: {
            outlineColor: "$outlineColor",
            outlineWidth: 2,
            outlineStyle: "solid"
          }
        }
      },
      color: {
        "...color": () => ({})
      },
      active: {
        true: {
          zIndex: 1,
          hoverStyle: {
            backgroundColor: "$background"
          },
          focusStyle: {
            borderColor: "$borderColor",
            backgroundColor: "$background"
          }
        }
      },
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
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  Toggle = React.forwardRef(function (props, forwardedRef) {
    const {
        pressed: pressedProp,
        defaultPressed = !1,
        onPressedChange,
        ...buttonProps
      } = props,
      [pressed = !1, setPressed] = useControllableState({
        prop: pressedProp,
        onChange: onPressedChange,
        defaultProp: defaultPressed
      });
    return /* @__PURE__ */jsx(ToggleFrame, {
      ...(!props.unstyled && {
        theme: pressed ? "active" : null,
        themeShallow: !0
      }),
      active: props.unstyled ? void 0 : pressed,
      "aria-pressed": pressed,
      "data-state": pressed ? "on" : "off",
      "data-disabled": props.disabled ? "" : void 0,
      ...buttonProps,
      ref: forwardedRef,
      onPress: composeEventHandlers(props.onPress ?? void 0, () => {
        props.disabled || setPressed(!pressed);
      })
    });
  });
export { Toggle, ToggleFrame, context };
//# sourceMappingURL=Toggle.mjs.map
