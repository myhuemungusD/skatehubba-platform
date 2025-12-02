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
var SliderImpl_exports = {};
__export(SliderImpl_exports, {
  SliderFrame: () => SliderFrame,
  SliderImpl: () => SliderImpl
});
module.exports = __toCommonJS(SliderImpl_exports);
var import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_get_token = require("@tamagui/get-token"),
  import_helpers = require("@tamagui/helpers"),
  import_stacks = require("@tamagui/stacks"),
  React = __toESM(require("react"), 1),
  import_constants2 = require("./constants.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const SliderFrame = (0, import_core.styled)(import_stacks.YStack, {
    position: "relative",
    variants: {
      orientation: {
        horizontal: {},
        vertical: {}
      },
      size: (val, extras) => {
        if (!val) return;
        const orientation = extras.props.orientation,
          size = Math.round((0, import_core.getVariableValue)((0, import_get_token.getSize)(val)) / 6);
        return orientation === "horizontal" ? {
          height: size,
          borderRadius: size,
          justifyContent: "center"
        } : {
          width: size,
          borderRadius: size,
          alignItems: "center"
        };
      }
    }
  }),
  SliderImpl = React.forwardRef((props, forwardedRef) => {
    const {
        __scopeSlider,
        onSlideStart,
        onSlideMove,
        onSlideEnd,
        onHomeKeyDown,
        onEndKeyDown,
        onStepKeyDown,
        ...sliderProps
      } = props,
      context = (0, import_constants2.useSliderContext)(__scopeSlider);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(SliderFrame, {
      size: "$4",
      ...sliderProps,
      "data-orientation": sliderProps.orientation,
      ref: forwardedRef,
      ...(import_constants.isWeb && {
        onKeyDown: event => {
          event.key === "Home" ? (onHomeKeyDown(event), event.preventDefault()) : event.key === "End" ? (onEndKeyDown(event), event.preventDefault()) : import_constants2.PAGE_KEYS.concat(import_constants2.ARROW_KEYS).includes(event.key) && (onStepKeyDown(event), event.preventDefault());
        }
      }),
      onMoveShouldSetResponderCapture: () => !0,
      onScrollShouldSetResponder: () => !0,
      onScrollShouldSetResponderCapture: () => !0,
      onMoveShouldSetResponder: () => !0,
      onStartShouldSetResponder: () => !0,
      onResponderTerminationRequest: () => !1,
      onResponderGrant: (0, import_helpers.composeEventHandlers)(props.onResponderGrant, event => {
        const target = event.target,
          thumbIndex = context.thumbs.get(target),
          isStartingOnThumb = thumbIndex !== void 0;
        import_constants.isWeb && target instanceof HTMLElement && context.thumbs.has(target) && target.focus(), !import_constants.isWeb && isStartingOnThumb && (context.valueIndexToChangeRef.current = thumbIndex), onSlideStart(event, isStartingOnThumb ? "thumb" : "track");
      }),
      onResponderMove: (0, import_helpers.composeEventHandlers)(props.onResponderMove, event => {
        event.stopPropagation(), onSlideMove(event);
      }),
      onResponderRelease: (0, import_helpers.composeEventHandlers)(props.onResponderRelease, event => {
        onSlideEnd(event);
      })
    });
  });