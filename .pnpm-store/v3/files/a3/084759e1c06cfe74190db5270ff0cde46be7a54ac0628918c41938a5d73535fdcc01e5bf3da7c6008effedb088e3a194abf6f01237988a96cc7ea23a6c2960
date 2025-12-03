import React from "react";
import { isWeb, withStaticProperties } from "@tamagui/core";
import {
  RadioGroupFrame,
  RadioGroupIndicatorFrame,
  RadioGroupItemFrame
} from "./RadioGroup";
import {
  useRadioGroup,
  useRadioGroupItem,
  useRadioGroupItemIndicator
} from "@tamagui/radio-headless";
import { RovingFocusGroup } from "@tamagui/roving-focus";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
const ensureContext = (x) => {
  x.context || (x.context = RadioGroupContext);
}, RadioGroupContext = React.createContext({}), RadioGroupItemContext = React.createContext({
  checked: !1,
  disabled: !1
});
function createRadioGroup(createProps) {
  const {
    disableActiveTheme,
    Frame = RadioGroupFrame,
    Indicator = RadioGroupIndicatorFrame,
    Item = RadioGroupItemFrame
  } = createProps;
  ensureContext(Frame), ensureContext(Indicator), ensureContext(Item);
  const RadioGroupImp = Frame.styleable((props, ref) => {
    const {
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
    } = props, { providerValue, frameAttrs, rovingFocusGroupAttrs } = useRadioGroup({
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
    return /* @__PURE__ */ jsx(RadioGroupContext.Provider, { value: providerValue, children: /* @__PURE__ */ jsx(RovingFocusGroup, { ...rovingFocusGroupAttrs, children: /* @__PURE__ */ jsx(RadioGroupFrame, { ...frameAttrs, ref, ...rest }) }) });
  }), RadioGroupItemImp = Item.styleable((props, ref) => {
    const {
      value,
      labelledBy,
      onPress,
      //@ts-expect-error
      onKeyDown,
      disabled,
      id,
      ...rest
    } = props, {
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
    return /* @__PURE__ */ jsx(RadioGroupItemContext.Provider, { value: providerValue, children: isWeb && native ? bubbleInput : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(RovingFocusGroup.Item, { ...rovingFocusGroupAttrs, children: /* @__PURE__ */ jsx(RadioGroupItemFrame, { ...frameAttrs, ref, ...rest }) }),
      isFormControl && bubbleInput
    ] }) });
  });
  RadioGroupItemImp.displayName = "RadioGroupItem";
  const RadioIndicator = Indicator.styleable(
    (props, forwardedRef) => {
      const { forceMount, disabled, ...indicatorProps } = props, { checked, ...useIndicatorRest } = useRadioGroupItemIndicator({
        radioGroupItemContext: RadioGroupItemContext,
        disabled
      });
      return forceMount || checked ? /* @__PURE__ */ jsx(Indicator, { ...useIndicatorRest, ref: forwardedRef, ...indicatorProps }) : null;
    }
  );
  RadioIndicator.displayName = "RadioIndicator";
  const RadioGroup = withStaticProperties(RadioGroupImp, {
    Item: RadioGroupItemImp,
    Indicator: RadioIndicator
  });
  return RadioGroup.displayName = "RadioGroup", RadioGroup;
}
export {
  createRadioGroup
};
//# sourceMappingURL=createRadioGroup.js.map
