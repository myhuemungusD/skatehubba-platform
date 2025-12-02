import {
  composeEventHandlers,
  getShorthandValue,
  getVariableValue,
  isWeb,
  shouldRenderNativePlatform,
  withStaticProperties
} from "@tamagui/core";

import { useSwitch } from "@tamagui/switch-headless";
import { useControllableState } from "@tamagui/use-controllable-state";
import * as React from "react";
import { Switch as NativeSwitch, View } from "react-native-web";
import { SwitchStyledContext } from "./StyledContext";
import { SwitchFrame as DefaultSwitchFrame, SwitchThumb } from "./Switch";
import { jsx, jsxs } from "react/jsx-runtime";
const SwitchContext = React.createContext({
  checked: !1,
  disabled: !1,
  frameWidth: 0
});
function createSwitch(createProps) {
  const {
    disableActiveTheme,
    Frame = DefaultSwitchFrame,
    Thumb = SwitchThumb
  } = createProps;
  process.env.NODE_ENV === "development" && (Frame !== DefaultSwitchFrame && Frame.staticConfig.context && Frame.staticConfig.context !== SwitchStyledContext || Thumb !== SwitchThumb && Thumb.staticConfig.context && Thumb.staticConfig.context !== SwitchStyledContext) && console.warn(
    "Warning: createSwitch() needs to control context to pass checked state from Frame to Thumb, any custom context passed will be overridden."
  ), Frame.staticConfig.context = SwitchStyledContext, Thumb.staticConfig.context = SwitchStyledContext;
  const SwitchThumbComponent = Thumb.styleable(
    function(props, forwardedRef) {
      const { size: sizeProp, unstyled: unstyledProp, nativeID, ...thumbProps } = props, context = React.useContext(SwitchContext), { checked, disabled, frameWidth } = context, styledContext = SwitchStyledContext.useStyledContext(), { unstyled: unstyledContext, size: sizeContext } = styledContext, unstyled = process.env.TAMAGUI_HEADLESS === "1" ? !0 : unstyledProp ?? unstyledContext ?? !1, size = sizeProp ?? sizeContext ?? "$true", initialChecked = React.useRef(checked).current, initialWidth = getVariableValue(props.width, "size"), [thumbWidth, setThumbWidth] = React.useState(
        typeof initialWidth == "number" ? initialWidth : 0
      ), distance = frameWidth - thumbWidth, x = initialChecked ? checked ? 0 : -distance : checked ? distance : 0;
      return /* @__PURE__ */ jsx(
        Thumb,
        {
          ref: forwardedRef,
          unstyled,
          ...unstyled === !1 && {
            size,
            ...!disableActiveTheme && !unstyled && {
              theme: checked ? "active" : null
            }
          },
          alignSelf: initialChecked ? "flex-end" : "flex-start",
          x,
          onLayout: composeEventHandlers(props.onLayout, (e) => {
            const next = e.nativeEvent.layout.width;
            next !== thumbWidth && setThumbWidth(next);
          }),
          checked,
          disabled,
          ...thumbProps
        }
      );
    }
  ), SwitchComponent = Frame.styleable(
    function(_props, forwardedRef) {
      const {
        native,
        nativeProps,
        checked: checkedProp,
        defaultChecked,
        onCheckedChange,
        ...props
      } = _props, [checked, setChecked] = useControllableState({
        prop: checkedProp,
        defaultProp: defaultChecked || !1,
        onChange: onCheckedChange,
        transition: !0
      }), styledContext = React.useContext(SwitchStyledContext.context);
      let estimatedInitialWidth = 0;
      const estWidth = getVariableValue(getShorthandValue(props, "width"), "size");
      if (estWidth) {
        const estPad = getShorthandValue(props, "paddingHorizontal") ?? getShorthandValue(props, "padding") ?? 0, estLeftPad = getShorthandValue(props, "paddingLeft") ?? estPad ?? 0, estRightPad = getShorthandValue(props, "paddingRight") ?? estPad ?? 0;
        estimatedInitialWidth = estWidth - (estLeftPad ? getVariableValue(estLeftPad, "size") : 0) - (estRightPad ? getVariableValue(estRightPad, "size") : 0);
      }
      const [frameWidth, setFrameInnerWidth] = React.useState(estimatedInitialWidth), { switchProps, bubbleInput, switchRef } = useSwitch(
        // @ts-ignore
        props,
        [checked, setChecked],
        // @ts-ignore TODO tamagui react 19 type error
        forwardedRef
      ), renderNative = shouldRenderNativePlatform(native);
      if (renderNative === "android" || renderNative === "ios")
        return /* @__PURE__ */ jsx(NativeSwitch, { value: checked, onValueChange: setChecked, ...nativeProps });
      const disabled = props.disabled, value = React.useMemo(
        () => ({ checked, disabled, frameWidth }),
        [checked, disabled, frameWidth]
      ), handleLayout = (e) => {
        const next = e.nativeEvent.layout.width;
        next !== frameWidth && setFrameInnerWidth(next);
      }, unstyled = styledContext.unstyled ?? props.unstyled ?? !1;
      return /* @__PURE__ */ jsxs(SwitchContext.Provider, { value, children: [
        /* @__PURE__ */ jsx(
          Frame,
          {
            ref: switchRef,
            tag: "button",
            ...isWeb && { type: "button" },
            ...!unstyled && {
              size: styledContext.size ?? props.size ?? "$true"
            },
            unstyled,
            ...props,
            ...switchProps,
            ...!disableActiveTheme && !props.unstyled && {
              theme: checked ? "active" : null
            },
            checked,
            disabled,
            children: /* @__PURE__ */ jsx(View, { style: measureContainerStyle, onLayout: handleLayout, children: frameWidth ? props.children : null })
          }
        ),
        bubbleInput
      ] });
    },
    {
      disableTheme: !0
    }
  );
  return withStaticProperties(SwitchComponent, {
    Thumb: SwitchThumbComponent
  });
}
const measureContainerStyle = {
  alignSelf: "stretch",
  flex: 1
};
export {
  SwitchContext,
  createSwitch
};
//# sourceMappingURL=createSwitch.js.map
