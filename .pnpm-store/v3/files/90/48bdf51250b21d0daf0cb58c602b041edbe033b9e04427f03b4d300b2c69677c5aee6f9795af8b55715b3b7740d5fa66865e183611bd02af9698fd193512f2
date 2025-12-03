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
var Button_exports = {};
__export(Button_exports, {
  Button: () => Button2,
  ButtonContext: () => ButtonContext,
  ButtonFrame: () => ButtonFrame,
  ButtonIcon: () => ButtonIcon,
  ButtonText: () => ButtonText,
  useButton: () => useButton
});
module.exports = __toCommonJS(Button_exports);
var import_font_size = require("@tamagui/font-size"),
  import_get_button_sized = require("@tamagui/get-button-sized"),
  import_helpers = require("@tamagui/helpers"),
  import_helpers_tamagui = require("@tamagui/helpers-tamagui"),
  import_stacks = require("@tamagui/stacks"),
  import_text = require("@tamagui/text"),
  import_web = require("@tamagui/web"),
  import_react = require("react"),
  import_jsx_runtime = require("react/jsx-runtime");
const ButtonContext = (0, import_web.createStyledContext)({
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
  ButtonFrame = (0, import_web.styled)(import_stacks.ThemeableStack, {
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
        "...size": import_get_button_sized.getButtonSized,
        ":number": import_get_button_sized.getButtonSized
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
  ButtonText = (0, import_web.styled)(import_text.SizableText, {
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
  ButtonIcon = props => {
    const {
        children,
        scaleIcon = 1
      } = props,
      {
        size,
        color
      } = (0, import_react.useContext)(ButtonContext),
      iconSize = (typeof size == "number" ? size * 0.5 : (0, import_font_size.getFontSize)(size)) * scaleIcon;
    return (0, import_helpers_tamagui.useGetThemedIcon)({
      size: iconSize,
      color
    })(children);
  },
  ButtonComponent = ButtonFrame.styleable(function (props, ref) {
    const {
      props: buttonProps
    } = useButton(props);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(ButtonFrame, {
      "data-disable-theme": !0,
      ...buttonProps,
      ref
    });
  }),
  Button2 = (0, import_helpers.withStaticProperties)(ButtonComponent, {
    Text: ButtonText,
    Icon: ButtonIcon
  });
function useButton({
  textProps,
  ...propsIn
}, {
  Text = Button2.Text
} = {
  Text: Button2.Text
}) {
  const isNested = (0, import_react.useContext)(import_stacks.ButtonNestingContext),
    propsActive = (0, import_web.useProps)(propsIn, {
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
    iconSize = (typeof size == "number" ? size * 0.5 : (0, import_font_size.getFontSize)(size, {
      font: fontFamily?.[0] === "$" ? fontFamily : void 0
    })) * scaleIcon,
    getThemedIcon = (0, import_helpers_tamagui.useGetThemedIcon)({
      size: iconSize,
      color
    }),
    [themedIcon, themedIconAfter] = [icon, iconAfter].map(getThemedIcon),
    spaceSize = space ?? (0, import_web.getVariableValue)(iconSize) * scaleSpace,
    contents = noTextWrap ? [propsIn.children] : (0, import_text.wrapChildrenInText)(Text, {
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
    inner = (0, import_web.spacedChildren)({
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
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_stacks.ButtonNestingContext.Provider, {
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