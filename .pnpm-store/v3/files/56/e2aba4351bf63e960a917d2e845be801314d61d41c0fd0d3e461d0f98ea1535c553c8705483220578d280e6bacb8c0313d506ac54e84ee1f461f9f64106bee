import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from "react";
import { registerFocusable } from "@tamagui/focusable";
import { isIndeterminate, useCheckbox } from "@tamagui/checkbox-headless";
import { getVariableValue, shouldRenderNativePlatform, useProps, useTheme, withStaticProperties } from "@tamagui/core";
import { getFontSize } from "@tamagui/font-size";
import { getSize } from "@tamagui/get-token";
import { useGetThemedIcon } from "@tamagui/helpers-tamagui";
import { useControllableState } from "@tamagui/use-controllable-state";
import { CheckboxFrame, CheckboxIndicatorFrame } from "./Checkbox.native.js";
import { CheckboxStyledContext } from "./CheckboxStyledContext.native.js";
var CheckboxContext = /* @__PURE__ */React.createContext({
    checked: !1,
    disabled: !1
  }),
  ensureContext = function (x) {
    x.context || (x.context = CheckboxContext);
  };
function createCheckbox(createProps) {
  var {
    disableActiveTheme,
    Frame = CheckboxFrame,
    Indicator = CheckboxIndicatorFrame
  } = createProps;
  ensureContext(Frame), ensureContext(Indicator);
  var FrameComponent = Frame.styleable(function (_props, forwardedRef) {
      var {
          scaleSize = 0.45,
          sizeAdjust = 0,
          scaleIcon,
          checked: checkedProp,
          defaultChecked,
          onCheckedChange,
          native,
          unstyled = !1,
          ...props
        } = _props,
        propsActive = useProps(props),
        styledContext = React.useContext(CheckboxStyledContext),
        adjustedSize = 0,
        size = 0;
      if (!unstyled) {
        var _propsActive_size, _ref;
        adjustedSize = getVariableValue(getSize((_ref = (_propsActive_size = propsActive.size) !== null && _propsActive_size !== void 0 ? _propsActive_size : styledContext?.size) !== null && _ref !== void 0 ? _ref : "$true", {
          shift: sizeAdjust
        })), size = scaleSize ? Math.round(adjustedSize * scaleSize) : adjustedSize;
      }
      var [checked = !1, setChecked] = useControllableState({
          prop: checkedProp,
          defaultProp: defaultChecked,
          onChange: onCheckedChange
        }),
        {
          checkboxProps,
          checkboxRef,
          bubbleInput
        } = useCheckbox(
        // @ts-ignore
        propsActive, [checked, setChecked], forwardedRef);
      React.useEffect(function () {
        if (props.id && !props.disabled) return registerFocusable(props.id, {
          focusAndSelect: function () {
            setChecked?.(function (value) {
              return !value;
            });
          },
          focus: function () {}
        });
      }, [props.id, props.disabled]);
      var renderNative = shouldRenderNativePlatform(native);
      if (renderNative === "web") return /* @__PURE__ */_jsx("input", {
        type: "checkbox",
        defaultChecked: isIndeterminate(checked) ? !1 : checked,
        tabIndex: -1,
        ref: checkboxRef,
        disabled: checkboxProps.disabled,
        style: {
          appearance: "auto",
          accentColor: "var(--color6)",
          ...checkboxProps.style
        }
      });
      var memoizedContext = useMemo(function () {
          return {
            checked,
            disabled: checkboxProps.disabled
          };
        }, [checked, checkboxProps.disabled]),
        _propsActive_size1,
        _ref1,
        _ref2;
      return /* @__PURE__ */_jsx(CheckboxContext.Provider, {
        value: memoizedContext,
        children: /* @__PURE__ */_jsxs(CheckboxStyledContext.Provider, {
          size: (_ref1 = (_propsActive_size1 = propsActive.size) !== null && _propsActive_size1 !== void 0 ? _propsActive_size1 : styledContext?.size) !== null && _ref1 !== void 0 ? _ref1 : "$true",
          scaleIcon: (_ref2 = scaleIcon ?? styledContext?.scaleIcon) !== null && _ref2 !== void 0 ? _ref2 : 1,
          children: [/* @__PURE__ */_jsx(Frame, {
            ...(!unstyled && {
              width: size,
              height: size
            }),
            tag: "button",
            ref: checkboxRef,
            unstyled,
            ...(unstyled === !1 && {
              size,
              theme: checked ? "active" : null
            }),
            // potential variant
            checked,
            disabled: checkboxProps.disabled,
            ...checkboxProps,
            // react 76 style prop mis-match, but should be fine
            style: checkboxProps.style,
            children: propsActive.children
          }), bubbleInput]
        })
      });
    }),
    IndicatorComponent = Indicator.styleable(function (props, forwardedRef) {
      var {
          // __scopeCheckbox,
          children: childrenProp,
          forceMount,
          disablePassStyles,
          unstyled = !1,
          ...indicatorProps
        } = props,
        styledContext = React.useContext(CheckboxStyledContext),
        children = childrenProp;
      if (!unstyled) {
        var iconSize = (typeof styledContext.size == "number" ? styledContext.size * 0.65 : getFontSize(styledContext.size)) * styledContext.scaleIcon,
          theme = useTheme(),
          getThemedIcon = useGetThemedIcon({
            size: iconSize,
            color: theme.color
          }),
          childrens = React.Children.toArray(childrenProp);
        children = childrens.map(function (child) {
          return disablePassStyles || ! /* @__PURE__ */React.isValidElement(child) ? child : getThemedIcon(child);
        });
      }
      var context = React.useContext(CheckboxContext);
      return forceMount || isIndeterminate(context.checked) || context.checked === !0 ? /* @__PURE__ */_jsx(Indicator, {
        pointerEvents: "none",
        ...indicatorProps,
        ref: forwardedRef,
        children
      }) : null;
    });
  return withStaticProperties(FrameComponent, {
    Indicator: IndicatorComponent
  });
}
export { CheckboxContext, createCheckbox };
//# sourceMappingURL=createCheckbox.native.js.map
