import { jsx as _jsx } from "react/jsx-runtime";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";
import { createContext } from "@tamagui/create-context";
import { focusFocusable } from "@tamagui/focusable";
import { getButtonSized } from "@tamagui/get-button-sized";
import { getFontSized } from "@tamagui/get-font-sized";
import { SizableText } from "@tamagui/text";
import { styled, themeable } from "@tamagui/web";
import * as React from "react";
var NAME = "Label",
  [LabelProvider, useLabelContextImpl] = createContext(NAME, {
    id: void 0,
    controlRef: {
      current: null
    }
  }),
  LabelFrame = styled(SizableText, {
    name: "Label",
    tag: "label",
    variants: {
      unstyled: {
        false: {
          size: "$true",
          color: "$color",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          userSelect: "none",
          cursor: "default",
          pressStyle: {
            color: "$colorPress"
          }
        }
      },
      size: {
        "...size": function (val, extras) {
          var buttonStyle = getButtonSized(val, extras),
            buttonHeight = buttonStyle?.height,
            fontStyle = getFontSized(val, extras);
          return {
            ...fontStyle,
            lineHeight: buttonHeight ? extras.tokens.size[buttonHeight] : void 0
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  LabelComponent = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        htmlFor,
        id: idProp,
        ...labelProps
      } = props,
      controlRef = React.useRef(null),
      ref = React.useRef(null),
      composedRefs = useComposedRefs(forwardedRef, ref),
      backupId = React.useId(),
      id = idProp ?? backupId;
    return isWeb && React.useEffect(function () {
      if (htmlFor) {
        var element = document.getElementById(htmlFor),
          label = ref.current;
        if (label && element) {
          var getAriaLabel = function () {
              return element.getAttribute("aria-labelledby");
            },
            ariaLabelledBy = [id, getAriaLabel()].filter(Boolean).join(" ");
          return element.setAttribute("aria-labelledby", ariaLabelledBy), controlRef.current = element, function () {
            var _getAriaLabel;
            if (id) {
              var ariaLabelledBy2 = (_getAriaLabel = getAriaLabel()) === null || _getAriaLabel === void 0 ? void 0 : _getAriaLabel.replace(id, "");
              ariaLabelledBy2 === "" ? element.removeAttribute("aria-labelledby") : ariaLabelledBy2 && element.setAttribute("aria-labelledby", ariaLabelledBy2);
            }
          };
        }
      }
    }, [id, htmlFor]), /* @__PURE__ */_jsx(LabelProvider, {
      id,
      controlRef,
      children: /* @__PURE__ */_jsx(LabelFrame, {
        id,
        // @ts-ignore
        htmlFor,
        ...labelProps,
        ref: composedRefs,
        onMouseDown: function (event) {
          var _props_onMouseDown;
          (_props_onMouseDown = props.onMouseDown) === null || _props_onMouseDown === void 0 || _props_onMouseDown.call(props, event), !event.defaultPrevented && event.detail > 1 && event.preventDefault();
        },
        onPress: function (event) {
          var _props_onPress;
          if ((_props_onPress = props.onPress) === null || _props_onPress === void 0 || _props_onPress.call(props, event), isWeb) {
            if (htmlFor || !controlRef.current || event.defaultPrevented) return;
            var isClickingControl = controlRef.current.contains(event.target),
              isUserClick = event.isTrusted === !0;
            !isClickingControl && isUserClick && (controlRef.current.click(), controlRef.current.focus());
          } else props.htmlFor && focusFocusable(props.htmlFor);
        }
      })
    });
  });
LabelComponent.displayName = NAME;
var Label = LabelFrame.extractable(themeable(LabelComponent)),
  useLabelContext = function (element) {
    var context = useLabelContextImpl("LabelConsumer"),
      {
        controlRef
      } = context;
    return React.useEffect(function () {
      element && (controlRef.current = element);
    }, [element, controlRef]), context.id;
  };
export { Label, LabelFrame, useLabelContext };
//# sourceMappingURL=Label.native.js.map
