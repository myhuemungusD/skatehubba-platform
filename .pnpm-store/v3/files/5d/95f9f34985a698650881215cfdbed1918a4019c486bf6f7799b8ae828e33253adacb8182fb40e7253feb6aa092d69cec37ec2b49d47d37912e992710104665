import React, { useMemo } from "react";

import { isIndeterminate, useCheckbox } from "@tamagui/checkbox-headless";
import {
  getVariableValue,
  shouldRenderNativePlatform,
  useProps,
  useTheme,
  withStaticProperties
} from "@tamagui/core";
import { getFontSize } from "@tamagui/font-size";
import { getSize } from "@tamagui/get-token";
import { useGetThemedIcon } from "@tamagui/helpers-tamagui";
import { useControllableState } from "@tamagui/use-controllable-state";
import { CheckboxFrame, CheckboxIndicatorFrame } from "./Checkbox";
import { CheckboxStyledContext } from "./CheckboxStyledContext";
import { jsx, jsxs } from "react/jsx-runtime";
const CheckboxContext = React.createContext({
  checked: !1,
  disabled: !1
}), ensureContext = (x) => {
  x.context || (x.context = CheckboxContext);
};
function createCheckbox(createProps) {
  const {
    disableActiveTheme,
    Frame = CheckboxFrame,
    Indicator = CheckboxIndicatorFrame
  } = createProps;
  ensureContext(Frame), ensureContext(Indicator);
  const FrameComponent = Frame.styleable(
    function(_props, forwardedRef) {
      const {
        scaleSize = 0.45,
        sizeAdjust = 0,
        scaleIcon,
        checked: checkedProp,
        defaultChecked,
        onCheckedChange,
        native,
        unstyled = !1,
        ...props
      } = _props, propsActive = useProps(props), styledContext = React.useContext(CheckboxStyledContext);
      let adjustedSize = 0, size = 0;
      unstyled || (adjustedSize = getVariableValue(
        getSize(propsActive.size ?? styledContext?.size ?? "$true", {
          shift: sizeAdjust
        })
      ), size = scaleSize ? Math.round(adjustedSize * scaleSize) : adjustedSize);
      const [checked = !1, setChecked] = useControllableState({
        prop: checkedProp,
        defaultProp: defaultChecked,
        onChange: onCheckedChange
      }), { checkboxProps, checkboxRef, bubbleInput } = useCheckbox(
        // @ts-ignore
        propsActive,
        [checked, setChecked],
        forwardedRef
      );
      if (shouldRenderNativePlatform(native) === "web")
        return /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            defaultChecked: isIndeterminate(checked) ? !1 : checked,
            tabIndex: -1,
            ref: checkboxRef,
            disabled: checkboxProps.disabled,
            style: {
              appearance: "auto",
              accentColor: "var(--color6)",
              ...checkboxProps.style
              // TODO: any
            }
          }
        );
      const memoizedContext = useMemo(
        () => ({
          checked,
          disabled: checkboxProps.disabled
        }),
        [checked, checkboxProps.disabled]
      );
      return /* @__PURE__ */ jsx(CheckboxContext.Provider, { value: memoizedContext, children: /* @__PURE__ */ jsxs(
        CheckboxStyledContext.Provider,
        {
          size: propsActive.size ?? styledContext?.size ?? "$true",
          scaleIcon: scaleIcon ?? styledContext?.scaleIcon ?? 1,
          children: [
            /* @__PURE__ */ jsx(
              Frame,
              {
                ...!unstyled && {
                  width: size,
                  height: size
                },
                tag: "button",
                ref: checkboxRef,
                unstyled,
                ...unstyled === !1 && {
                  size,
                  theme: checked ? "active" : null
                },
                checked,
                disabled: checkboxProps.disabled,
                ...checkboxProps,
                style: checkboxProps.style,
                children: propsActive.children
              }
            ),
            bubbleInput
          ]
        }
      ) });
    }
  ), IndicatorComponent = Indicator.styleable(
    (props, forwardedRef) => {
      const {
        // __scopeCheckbox,
        children: childrenProp,
        forceMount,
        disablePassStyles,
        unstyled = !1,
        ...indicatorProps
      } = props, styledContext = React.useContext(CheckboxStyledContext);
      let children = childrenProp;
      if (!unstyled) {
        const iconSize = (typeof styledContext.size == "number" ? styledContext.size * 0.65 : getFontSize(styledContext.size)) * styledContext.scaleIcon, theme = useTheme(), getThemedIcon = useGetThemedIcon({ size: iconSize, color: theme.color });
        children = React.Children.toArray(childrenProp).map((child) => disablePassStyles || !React.isValidElement(child) ? child : getThemedIcon(child));
      }
      const context = React.useContext(CheckboxContext);
      return forceMount || isIndeterminate(context.checked) || context.checked === !0 ? /* @__PURE__ */ jsx(Indicator, { pointerEvents: "none", ...indicatorProps, ref: forwardedRef, children }) : null;
    }
  );
  return withStaticProperties(FrameComponent, {
    Indicator: IndicatorComponent
  });
}
export {
  CheckboxContext,
  createCheckbox
};
//# sourceMappingURL=createCheckbox.js.map
