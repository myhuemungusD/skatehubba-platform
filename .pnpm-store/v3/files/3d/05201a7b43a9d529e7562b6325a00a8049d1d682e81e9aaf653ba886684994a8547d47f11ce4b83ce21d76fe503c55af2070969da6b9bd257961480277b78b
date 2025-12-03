import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { composeEventHandlers, getShorthandValue, getVariableValue, isWeb, shouldRenderNativePlatform, withStaticProperties } from "@tamagui/core";
import { registerFocusable } from "@tamagui/focusable";
import { useSwitch } from "@tamagui/switch-headless";
import { useControllableState } from "@tamagui/use-controllable-state";
import * as React from "react";
import { Switch as NativeSwitch, View } from "react-native";
import { SwitchStyledContext } from "./StyledContext.native.js";
import { SwitchFrame as DefaultSwitchFrame, SwitchThumb } from "./Switch.native.js";
var SwitchContext = /* @__PURE__ */React.createContext({
  checked: !1,
  disabled: !1,
  frameWidth: 0
});
function createSwitch(createProps) {
  var {
    disableActiveTheme,
    Frame = DefaultSwitchFrame,
    Thumb = SwitchThumb
  } = createProps;
  process.env.NODE_ENV === "development" && (Frame !== DefaultSwitchFrame && Frame.staticConfig.context && Frame.staticConfig.context !== SwitchStyledContext || Thumb !== SwitchThumb && Thumb.staticConfig.context && Thumb.staticConfig.context !== SwitchStyledContext) && console.warn("Warning: createSwitch() needs to control context to pass checked state from Frame to Thumb, any custom context passed will be overridden."), Frame.staticConfig.context = SwitchStyledContext, Thumb.staticConfig.context = SwitchStyledContext;
  var SwitchThumbComponent = Thumb.styleable(function (props, forwardedRef) {
      var {
          size: sizeProp,
          unstyled: unstyledProp,
          nativeID,
          ...thumbProps
        } = props,
        context = React.useContext(SwitchContext),
        {
          checked,
          disabled,
          frameWidth
        } = context,
        styledContext = SwitchStyledContext.useStyledContext(),
        {
          unstyled: unstyledContext,
          size: sizeContext
        } = styledContext,
        _ref,
        unstyled = process.env.TAMAGUI_HEADLESS === "1" ? !0 : (_ref = unstyledProp ?? unstyledContext) !== null && _ref !== void 0 ? _ref : !1,
        _ref1,
        size = (_ref1 = sizeProp ?? sizeContext) !== null && _ref1 !== void 0 ? _ref1 : "$true",
        initialChecked = React.useRef(checked).current,
        initialWidth = getVariableValue(props.width, "size"),
        [thumbWidth, setThumbWidth] = React.useState(typeof initialWidth == "number" ? initialWidth : 0),
        distance = frameWidth - thumbWidth,
        x = initialChecked ? checked ? 0 : -distance : checked ? distance : 0;
      return /* @__PURE__ */_jsx(Thumb, {
        ref: forwardedRef,
        unstyled,
        ...(unstyled === !1 && {
          size,
          ...(!disableActiveTheme && !unstyled && {
            theme: checked ? "active" : null
          })
        }),
        alignSelf: initialChecked ? "flex-end" : "flex-start",
        x,
        onLayout: composeEventHandlers(props.onLayout, function (e) {
          var next = e.nativeEvent.layout.width;
          next !== thumbWidth && setThumbWidth(next);
        }),
        // expected variants
        checked,
        disabled,
        ...thumbProps
      });
    }),
    SwitchComponent = Frame.styleable(function (_props, forwardedRef) {
      var {
          native,
          nativeProps,
          checked: checkedProp,
          defaultChecked,
          onCheckedChange,
          ...props
        } = _props,
        [checked, setChecked] = useControllableState({
          prop: checkedProp,
          defaultProp: defaultChecked || !1,
          onChange: onCheckedChange,
          transition: !0
        }),
        styledContext = React.useContext(SwitchStyledContext.context),
        estimatedInitialWidth = 0,
        estWidth = getVariableValue(getShorthandValue(props, "width"), "size");
      if (estWidth) {
        var _getShorthandValue,
          _ref,
          estPad = (_ref = (_getShorthandValue = getShorthandValue(props, "paddingHorizontal")) !== null && _getShorthandValue !== void 0 ? _getShorthandValue : getShorthandValue(props, "padding")) !== null && _ref !== void 0 ? _ref : 0,
          _getShorthandValue1,
          _ref1,
          estLeftPad = (_ref1 = (_getShorthandValue1 = getShorthandValue(props, "paddingLeft")) !== null && _getShorthandValue1 !== void 0 ? _getShorthandValue1 : estPad) !== null && _ref1 !== void 0 ? _ref1 : 0,
          _getShorthandValue2,
          _ref2,
          estRightPad = (_ref2 = (_getShorthandValue2 = getShorthandValue(props, "paddingRight")) !== null && _getShorthandValue2 !== void 0 ? _getShorthandValue2 : estPad) !== null && _ref2 !== void 0 ? _ref2 : 0;
        estimatedInitialWidth = estWidth - (estLeftPad ? getVariableValue(estLeftPad, "size") : 0) - (estRightPad ? getVariableValue(estRightPad, "size") : 0);
      }
      var [frameWidth, setFrameInnerWidth] = React.useState(estimatedInitialWidth),
        {
          switchProps,
          bubbleInput,
          switchRef
        } = useSwitch(
        // @ts-ignore
        props, [checked, setChecked],
        // @ts-ignore TODO tamagui react 19 type error
        forwardedRef);
      React.useEffect(function () {
        if (props.id && !props.disabled) return registerFocusable(props.id, {
          focusAndSelect: function () {
            setChecked?.(function (value2) {
              return !value2;
            });
          },
          focus: function () {}
        });
      }, [props.id, props.disabled]);
      var renderNative = shouldRenderNativePlatform(native);
      if (renderNative === "android" || renderNative === "ios") return /* @__PURE__ */_jsx(NativeSwitch, {
        value: checked,
        onValueChange: setChecked,
        ...nativeProps
      });
      var disabled = props.disabled,
        value = React.useMemo(function () {
          return {
            checked,
            disabled,
            frameWidth
          };
        }, [checked, disabled, frameWidth]),
        handleLayout = function (e) {
          var next = e.nativeEvent.layout.width;
          next !== frameWidth && setFrameInnerWidth(next);
        },
        _styledContext_unstyled,
        _ref3,
        unstyled = (_ref3 = (_styledContext_unstyled = styledContext.unstyled) !== null && _styledContext_unstyled !== void 0 ? _styledContext_unstyled : props.unstyled) !== null && _ref3 !== void 0 ? _ref3 : !1,
        _styledContext_size,
        _ref4;
      return /* @__PURE__ */_jsxs(SwitchContext.Provider, {
        value,
        children: [/* @__PURE__ */_jsx(Frame, {
          ref: switchRef,
          tag: "button",
          ...(isWeb && {
            type: "button"
          }),
          ...(!unstyled && {
            size: (_ref4 = (_styledContext_size = styledContext.size) !== null && _styledContext_size !== void 0 ? _styledContext_size : props.size) !== null && _ref4 !== void 0 ? _ref4 : "$true"
          }),
          unstyled,
          ...props,
          ...switchProps,
          ...(!disableActiveTheme && !props.unstyled && {
            theme: checked ? "active" : null
          }),
          // expected variants
          checked,
          disabled,
          children: /* @__PURE__ */_jsx(View, {
            style: measureContainerStyle,
            onLayout: handleLayout,
            children: frameWidth ? props.children : null
          })
        }), bubbleInput]
      });
    }, {
      disableTheme: !0
    });
  return withStaticProperties(SwitchComponent, {
    Thumb: SwitchThumbComponent
  });
}
var measureContainerStyle = {
  alignSelf: "stretch",
  flex: 1
};
export { SwitchContext, createSwitch };
//# sourceMappingURL=createSwitch.native.js.map
