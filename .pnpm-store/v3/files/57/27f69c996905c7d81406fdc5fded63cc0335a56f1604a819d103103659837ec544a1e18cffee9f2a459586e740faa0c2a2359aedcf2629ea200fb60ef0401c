import { jsx as _jsx } from "react/jsx-runtime";
import { getFontSize } from "@tamagui/font-size";
import { getButtonSized } from "@tamagui/get-button-sized";
import { withStaticProperties } from "@tamagui/helpers";
import { useGetThemedIcon } from "@tamagui/helpers-tamagui";
import { ButtonNestingContext, ThemeableStack } from "@tamagui/stacks";
import { SizableText, wrapChildrenInText } from "@tamagui/text";
import { createStyledContext, getVariableValue, spacedChildren, styled, useProps } from "@tamagui/web";
import { useContext } from "react";
var ButtonContext = createStyledContext({
    // keeping these here means they work with styled() passing down color to text
    color: void 0,
    ellipse: void 0,
    fontFamily: void 0,
    fontSize: void 0,
    fontStyle: void 0,
    fontWeight: void 0,
    letterSpacing: void 0,
    maxFontSizeMultiplier: void 0,
    size: void 0,
    textAlign: void 0,
    variant: void 0
  }),
  BUTTON_NAME = "Button",
  ButtonFrame = styled(ThemeableStack, {
    name: BUTTON_NAME,
    tag: "button",
    context: ButtonContext,
    role: "button",
    focusable: !0,
    // forces runtime pressStyle so it passes through context text colors
    disableClassName: !0,
    variants: {
      unstyled: {
        false: {
          size: "$true",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          flexDirection: "row",
          cursor: "pointer",
          hoverTheme: !0,
          pressTheme: !0,
          backgrounded: !0,
          borderWidth: 1,
          borderColor: "transparent",
          focusVisibleStyle: {
            outlineColor: "$outlineColor",
            outlineStyle: "solid",
            outlineWidth: 2
          }
        }
      },
      variant: {
        outlined: {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: "$borderColor",
          hoverStyle: {
            backgroundColor: "transparent",
            borderColor: "$borderColorHover"
          },
          pressStyle: {
            backgroundColor: "transparent",
            borderColor: "$borderColorPress"
          },
          focusVisibleStyle: {
            backgroundColor: "transparent",
            borderColor: "$borderColorFocus"
          }
        }
      },
      size: {
        "...size": getButtonSized,
        ":number": getButtonSized
      },
      disabled: {
        true: {
          pointerEvents: "none"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  ButtonText = styled(SizableText, {
    name: "Button",
    context: ButtonContext,
    variants: {
      unstyled: {
        false: {
          userSelect: "none",
          cursor: "pointer",
          // flexGrow 1 leads to inconsistent native style where text pushes to start of view
          flexGrow: 0,
          flexShrink: 1,
          ellipse: !0,
          color: "$color"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  ButtonIcon = function (props) {
    var {
        children,
        scaleIcon = 1
      } = props,
      {
        size,
        color
      } = useContext(ButtonContext),
      iconSize = (typeof size == "number" ? size * 0.5 : getFontSize(size)) * scaleIcon,
      getThemedIcon = useGetThemedIcon({
        size: iconSize,
        color
      });
    return getThemedIcon(children);
  },
  ButtonComponent = ButtonFrame.styleable(function (props, ref) {
    var {
      props: buttonProps
    } = useButton(props);
    return /* @__PURE__ */_jsx(ButtonFrame, {
      "data-disable-theme": !0,
      ...buttonProps,
      ref
    });
  }),
  Button2 = withStaticProperties(ButtonComponent, {
    Text: ButtonText,
    Icon: ButtonIcon
  });
function useButton(param) {
  var {
      textProps,
      ...propsIn
    } = param,
    {
      Text = Button2.Text
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      Text: Button2.Text
    },
    isNested = useContext(ButtonNestingContext),
    propsActive = useProps(propsIn, {
      noNormalize: !0,
      noExpand: !0
    }),
    {
      icon,
      iconAfter,
      space,
      spaceFlex,
      scaleIcon = 1,
      scaleSpace = 0.66,
      separator,
      noTextWrap,
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      letterSpacing,
      tag,
      ellipse,
      maxFontSizeMultiplier,
      ...restProps
    } = propsActive,
    size = propsActive.size || (propsActive.unstyled ? void 0 : "$true"),
    color = propsActive.color,
    iconSize = (typeof size == "number" ? size * 0.5 : getFontSize(size, {
      font: fontFamily?.[0] === "$" ? fontFamily : void 0
    })) * scaleIcon,
    getThemedIcon = useGetThemedIcon({
      size: iconSize,
      color
    }),
    [themedIcon, themedIconAfter] = [icon, iconAfter].map(getThemedIcon),
    spaceSize = space ?? getVariableValue(iconSize) * scaleSpace,
    contents = noTextWrap ? [propsIn.children] : wrapChildrenInText(Text, {
      children: propsIn.children,
      color,
      fontFamily,
      fontSize,
      textProps,
      fontWeight,
      fontStyle,
      letterSpacing,
      ellipse,
      maxFontSizeMultiplier
    }, Text === ButtonText && propsActive.unstyled !== !0 ? {
      unstyled: process.env.TAMAGUI_HEADLESS === "1",
      size
    } : void 0),
    inner = spacedChildren({
      // a bit arbitrary but scaling to font size is necessary so long as button does
      space: spaceSize === !1 ? 0 : spaceSize == !0 ? "$true" : spaceSize,
      spaceFlex,
      ensureKeys: !0,
      separator,
      direction: propsActive.flexDirection === "column" || propsActive.flexDirection === "column-reverse" ? "vertical" : "horizontal",
      // for keys to stay the same we keep indices as similar a possible
      // so even if icons are undefined we still pass them
      children: [themedIcon, ...contents, themedIconAfter]
    }),
    props = {
      size,
      ...(propsIn.disabled && {
        // in rnw - false still has keyboard tabIndex, undefined = not actually focusable
        focusable: void 0,
        // even with tabIndex unset, it will keep focusVisibleStyle on web so disable it here
        focusVisibleStyle: {
          borderColor: "$background"
        }
      }),
      // fixes SSR issue + DOM nesting issue of not allowing button in button
      tag: tag ?? (isNested ? "span" :
      // defaults to <a /> when accessibilityRole = link
      // see https://github.com/tamagui/tamagui/issues/505
      propsActive.accessibilityRole === "link" || propsActive.role === "link" ? "a" : "button"),
      ...restProps,
      children: /* @__PURE__ */_jsx(ButtonNestingContext.Provider, {
        value: !0,
        children: inner
      }),
      // forces it to be a runtime pressStyle so it passes through context text colors
      disableClassName: !0
    };
  return {
    spaceSize,
    isNested,
    props
  };
}
export { Button2 as Button, ButtonContext, ButtonFrame, ButtonIcon, ButtonText, useButton };
//# sourceMappingURL=Button.native.js.map
