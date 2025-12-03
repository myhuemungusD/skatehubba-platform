"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var createSwitch_exports = {};
__export(createSwitch_exports, {
  SwitchContext: () => SwitchContext,
  createSwitch: () => createSwitch
});
module.exports = __toCommonJS(createSwitch_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_core = require("@tamagui/core"),
  import_focusable = require("@tamagui/focusable"),
  import_switch_headless = require("@tamagui/switch-headless"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  React = __toESM(require("react"), 1),
  import_react_native = require("react-native"),
  import_StyledContext = require("./StyledContext.native.js"),
  import_Switch = require("./Switch.native.js"),
  SwitchContext = /* @__PURE__ */React.createContext({
    checked: !1,
    disabled: !1,
    frameWidth: 0
  });
function createSwitch(createProps) {
  var {
    disableActiveTheme,
    Frame = import_Switch.SwitchFrame,
    Thumb = import_Switch.SwitchThumb
  } = createProps;
  process.env.NODE_ENV === "development" && (Frame !== import_Switch.SwitchFrame && Frame.staticConfig.context && Frame.staticConfig.context !== import_StyledContext.SwitchStyledContext || Thumb !== import_Switch.SwitchThumb && Thumb.staticConfig.context && Thumb.staticConfig.context !== import_StyledContext.SwitchStyledContext) && console.warn("Warning: createSwitch() needs to control context to pass checked state from Frame to Thumb, any custom context passed will be overridden."), Frame.staticConfig.context = import_StyledContext.SwitchStyledContext, Thumb.staticConfig.context = import_StyledContext.SwitchStyledContext;
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
        styledContext = import_StyledContext.SwitchStyledContext.useStyledContext(),
        {
          unstyled: unstyledContext,
          size: sizeContext
        } = styledContext,
        _ref,
        unstyled = process.env.TAMAGUI_HEADLESS === "1" ? !0 : (_ref = unstyledProp ?? unstyledContext) !== null && _ref !== void 0 ? _ref : !1,
        _ref1,
        size = (_ref1 = sizeProp ?? sizeContext) !== null && _ref1 !== void 0 ? _ref1 : "$true",
        initialChecked = React.useRef(checked).current,
        initialWidth = (0, import_core.getVariableValue)(props.width, "size"),
        [thumbWidth, setThumbWidth] = React.useState(typeof initialWidth == "number" ? initialWidth : 0),
        distance = frameWidth - thumbWidth,
        x = initialChecked ? checked ? 0 : -distance : checked ? distance : 0;
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Thumb, {
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
        onLayout: (0, import_core.composeEventHandlers)(props.onLayout, function (e) {
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
        [checked, setChecked] = (0, import_use_controllable_state.useControllableState)({
          prop: checkedProp,
          defaultProp: defaultChecked || !1,
          onChange: onCheckedChange,
          transition: !0
        }),
        styledContext = React.useContext(import_StyledContext.SwitchStyledContext.context),
        estimatedInitialWidth = 0,
        estWidth = (0, import_core.getVariableValue)((0, import_core.getShorthandValue)(props, "width"), "size");
      if (estWidth) {
        var _getShorthandValue,
          _ref,
          estPad = (_ref = (_getShorthandValue = (0, import_core.getShorthandValue)(props, "paddingHorizontal")) !== null && _getShorthandValue !== void 0 ? _getShorthandValue : (0, import_core.getShorthandValue)(props, "padding")) !== null && _ref !== void 0 ? _ref : 0,
          _getShorthandValue1,
          _ref1,
          estLeftPad = (_ref1 = (_getShorthandValue1 = (0, import_core.getShorthandValue)(props, "paddingLeft")) !== null && _getShorthandValue1 !== void 0 ? _getShorthandValue1 : estPad) !== null && _ref1 !== void 0 ? _ref1 : 0,
          _getShorthandValue2,
          _ref2,
          estRightPad = (_ref2 = (_getShorthandValue2 = (0, import_core.getShorthandValue)(props, "paddingRight")) !== null && _getShorthandValue2 !== void 0 ? _getShorthandValue2 : estPad) !== null && _ref2 !== void 0 ? _ref2 : 0;
        estimatedInitialWidth = estWidth - (estLeftPad ? (0, import_core.getVariableValue)(estLeftPad, "size") : 0) - (estRightPad ? (0, import_core.getVariableValue)(estRightPad, "size") : 0);
      }
      var [frameWidth, setFrameInnerWidth] = React.useState(estimatedInitialWidth),
        {
          switchProps,
          bubbleInput,
          switchRef
        } = (0, import_switch_headless.useSwitch)(
        // @ts-ignore
        props, [checked, setChecked],
        // @ts-ignore TODO tamagui react 19 type error
        forwardedRef);
      React.useEffect(function () {
        if (props.id && !props.disabled) return (0, import_focusable.registerFocusable)(props.id, {
          focusAndSelect: function () {
            setChecked?.(function (value2) {
              return !value2;
            });
          },
          focus: function () {}
        });
      }, [props.id, props.disabled]);
      var renderNative = (0, import_core.shouldRenderNativePlatform)(native);
      if (renderNative === "android" || renderNative === "ios") return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_native.Switch, {
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
      return /* @__PURE__ */(0, import_jsx_runtime.jsxs)(SwitchContext.Provider, {
        value,
        children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(Frame, {
          ref: switchRef,
          tag: "button",
          ...(import_core.isWeb && {
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
          children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_native.View, {
            style: measureContainerStyle,
            onLayout: handleLayout,
            children: frameWidth ? props.children : null
          })
        }), bubbleInput]
      });
    }, {
      disableTheme: !0
    });
  return (0, import_core.withStaticProperties)(SwitchComponent, {
    Thumb: SwitchThumbComponent
  });
}
var measureContainerStyle = {
  alignSelf: "stretch",
  flex: 1
};
//# sourceMappingURL=createSwitch.native.js.map
