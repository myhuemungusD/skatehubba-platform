import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from "react";
import { isWeb, withStaticProperties } from "@tamagui/core";
import { RadioGroupFrame, RadioGroupIndicatorFrame, RadioGroupItemFrame } from "./RadioGroup.native.js";
import { useRadioGroup, useRadioGroupItem, useRadioGroupItemIndicator } from "@tamagui/radio-headless";
import { RovingFocusGroup } from "@tamagui/roving-focus";
var ensureContext = function (x) {
    x.context || (x.context = RadioGroupContext);
  },
  RadioGroupContext = /* @__PURE__ */React.createContext({}),
  RadioGroupItemContext = /* @__PURE__ */React.createContext({
    checked: !1,
    disabled: !1
  });
function createRadioGroup(createProps) {
  var {
    disableActiveTheme,
    Frame = RadioGroupFrame,
    Indicator = RadioGroupIndicatorFrame,
    Item = RadioGroupItemFrame
  } = createProps;
  ensureContext(Frame), ensureContext(Indicator), ensureContext(Item);
  var RadioGroupImp = Frame.styleable(function (props, ref) {
      var {
          value,
          defaultValue,
          onValueChange,
          required = !1,
          disabled = !1,
          name,
          native,
          accentColor,
          orientation = "vertical",
          ...rest
        } = props,
        {
          providerValue,
          frameAttrs,
          rovingFocusGroupAttrs
        } = useRadioGroup({
          orientation,
          name,
          defaultValue,
          value,
          onValueChange,
          required,
          disabled,
          native,
          accentColor
        });
      return /* @__PURE__ */_jsx(RadioGroupContext.Provider, {
        value: providerValue,
        children: /* @__PURE__ */_jsx(RovingFocusGroup, {
          ...rovingFocusGroupAttrs,
          children: /* @__PURE__ */_jsx(RadioGroupFrame, {
            ...frameAttrs,
            ref,
            ...rest
          })
        })
      });
    }),
    RadioGroupItemImp = Item.styleable(function (props, ref) {
      var {
          value,
          labelledBy,
          onPress,
          //@ts-expect-error
          onKeyDown,
          disabled,
          id,
          ...rest
        } = props,
        {
          providerValue,
          bubbleInput,
          rovingFocusGroupAttrs,
          frameAttrs,
          isFormControl,
          native
        } = useRadioGroupItem({
          radioGroupContext: RadioGroupContext,
          value,
          id,
          labelledBy,
          disabled,
          onPress,
          onKeyDown
        });
      return /* @__PURE__ */_jsx(RadioGroupItemContext.Provider, {
        value: providerValue,
        children: isWeb && native ? bubbleInput : /* @__PURE__ */_jsxs(_Fragment, {
          children: [/* @__PURE__ */_jsx(RovingFocusGroup.Item, {
            ...rovingFocusGroupAttrs,
            children: /* @__PURE__ */_jsx(RadioGroupItemFrame, {
              ...frameAttrs,
              ref,
              ...rest
            })
          }), isFormControl && bubbleInput]
        })
      });
    });
  RadioGroupItemImp.displayName = "RadioGroupItem";
  var RadioIndicator = Indicator.styleable(function (props, forwardedRef) {
    var {
        forceMount,
        disabled,
        ...indicatorProps
      } = props,
      {
        checked,
        ...useIndicatorRest
      } = useRadioGroupItemIndicator({
        radioGroupItemContext: RadioGroupItemContext,
        disabled
      });
    return forceMount || checked ? /* @__PURE__ */_jsx(Indicator, {
      ...useIndicatorRest,
      ref: forwardedRef,
      ...indicatorProps
    }) : null;
  });
  RadioIndicator.displayName = "RadioIndicator";
  var RadioGroup = withStaticProperties(RadioGroupImp, {
    Item: RadioGroupItemImp,
    Indicator: RadioIndicator
  });
  return RadioGroup.displayName = "RadioGroup", RadioGroup;
}
export { createRadioGroup };
//# sourceMappingURL=createRadioGroup.native.js.map
