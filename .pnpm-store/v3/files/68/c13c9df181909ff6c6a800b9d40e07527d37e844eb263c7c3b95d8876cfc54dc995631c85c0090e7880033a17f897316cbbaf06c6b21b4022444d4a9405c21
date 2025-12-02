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
var createAnimations_exports = {};
__export(createAnimations_exports, {
  createAnimations: () => createAnimations
});
module.exports = __toCommonJS(createAnimations_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_use_presence = require("@tamagui/use-presence"),
  import_core = require("@tamagui/core"),
  import_author = require("moti/author"),
  import_react = __toESM(require("react"), 1),
  import_react_native_reanimated = __toESM(require("react-native-reanimated"), 1);
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var safeESModule = function (a) {
    var b = a,
      out = b.__esModule || b[Symbol.toStringTag] === "Module" ? b.default : b;
    return out || a;
  },
  Animated = safeESModule(import_react_native_reanimated.default);
function createTamaguiAnimatedComponent() {
  var defaultTag = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "div",
    isText = defaultTag === "span",
    Component = Animated.createAnimatedComponent(/* @__PURE__ */(0, import_react.forwardRef)(function (propsIn, ref) {
      var _hooks_usePropsTransform,
        {
          forwardedRef,
          animation,
          tag = defaultTag,
          ...propsRest
        } = propsIn,
        hostRef = (0, import_react.useRef)(null),
        composedRefs = (0, import_core.useComposedRefs)(forwardedRef, ref, hostRef),
        stateRef = (0, import_react.useRef)(null);
      stateRef.current || (stateRef.current = {
        get host() {
          return hostRef.current;
        }
      });
      var [_, state] = (0, import_core.useThemeWithState)({}),
        result = (0, import_core.getSplitStyles)(propsRest, isText ? import_core.Text.staticConfig : import_core.View.staticConfig, state?.theme, state?.name, {
          unmounted: !1
        }, {
          isAnimated: !1,
          noClass: !0
        }),
        props = result?.viewProps || {},
        Element = tag,
        transformedProps = (_hooks_usePropsTransform = import_core.hooks.usePropsTransform) === null || _hooks_usePropsTransform === void 0 ? void 0 : _hooks_usePropsTransform.call(import_core.hooks, tag, props, stateRef, !1);
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Element, {
        ...transformedProps,
        ref: composedRefs
      });
    }));
  return Component.acceptTagProp = !0, Component;
}
var AnimatedView = createTamaguiAnimatedComponent("div"),
  AnimatedText = createTamaguiAnimatedComponent("span"),
  onlyAnimateKeys = {
    transform: !0,
    opacity: !0,
    height: !0,
    width: !0,
    backgroundColor: !0,
    borderColor: !0,
    borderLeftColor: !0,
    borderRightColor: !0,
    borderTopColor: !0,
    borderBottomColor: !0,
    borderRadius: !0,
    borderTopLeftRadius: !0,
    borderTopRightRadius: !0,
    borderBottomLeftRadius: !0,
    borderBottomRightRadius: !0,
    borderLeftWidth: !0,
    borderRightWidth: !0,
    borderTopWidth: !0,
    borderBottomWidth: !0,
    color: !0,
    left: !0,
    right: !0,
    top: !0,
    bottom: !0,
    fontSize: !0,
    fontWeight: !0,
    lineHeight: !0,
    letterSpacing: !0
  };
function createAnimations(animations) {
  return {
    View: import_core.isWeb ? AnimatedView : Animated.View,
    Text: import_core.isWeb ? AnimatedText : Animated.Text,
    // View: Animated.View,
    // Text: Animated.Text,
    isReactNative: !0,
    supportsCSS: !1,
    animations,
    usePresence: import_use_presence.usePresence,
    ResetPresence: import_use_presence.ResetPresence,
    useAnimatedNumber(initial) {
      var sharedValue = (0, import_react_native_reanimated.useSharedValue)(initial);
      return import_react.default.useMemo(function () {
        return {
          getInstance() {
            "worklet";

            return sharedValue;
          },
          getValue() {
            "worklet";

            return sharedValue.value;
          },
          setValue(next) {
            "worklet";

            var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                type: "spring"
              },
              onFinish = arguments.length > 2 ? arguments[2] : void 0;
            config.type === "direct" ? (sharedValue.value = next, onFinish?.()) : config.type === "spring" ? sharedValue.value = (0, import_react_native_reanimated.withSpring)(next, config, onFinish ? function () {
              "worklet";

              (0, import_react_native_reanimated.runOnJS)(onFinish)();
            } : void 0) : sharedValue.value = (0, import_react_native_reanimated.withTiming)(next, config, onFinish ? function () {
              "worklet";

              (0, import_react_native_reanimated.runOnJS)(onFinish)();
            } : void 0);
          },
          stop() {
            "worklet";

            (0, import_react_native_reanimated.cancelAnimation)(sharedValue);
          }
        };
      }, [sharedValue]);
    },
    useAnimatedNumberReaction(param, onValue) {
      var {
          value
        } = param,
        instance = value.getInstance();
      return (0, import_react_native_reanimated.useAnimatedReaction)(function () {
        return instance.value;
      }, function (next, prev) {
        prev !== next && (0, import_react_native_reanimated.runOnJS)(onValue)(next);
      },
      // dependency array is very important here
      [onValue, instance]);
    },
    /**
    * `getStyle` must be a worklet
    */
    useAnimatedNumberStyle(val, getStyle) {
      var instance = val.getInstance(),
        derivedValue = (0, import_react_native_reanimated.useDerivedValue)(function () {
          return instance.value;
        },
        // dependency array is very important here
        [instance, getStyle]);
      return (0, import_react_native_reanimated.useAnimatedStyle)(function () {
        return getStyle(derivedValue.value);
      },
      // dependency array is very important here
      [val, getStyle, derivedValue, instance]);
    },
    useAnimations: function (animationProps) {
      var {
          props,
          presence,
          style,
          componentState
        } = animationProps,
        animationKey = Array.isArray(props.animation) ? props.animation[0] : props.animation,
        isHydrating = componentState.unmounted === !0,
        disableAnimation = isHydrating || !animationKey,
        presenceContext = import_react.default.useContext(import_use_presence.PresenceContext),
        {
          dontAnimate,
          motiProps
        } = (0, import_react.useMemo)(function () {
          var animate = {},
            dontAnimate2 = {};
          if (disableAnimation) dontAnimate2 = style;else {
            var animateOnly = props.animateOnly;
            for (var key in style) {
              var value = style[key];
              !onlyAnimateKeys[key] || value === "auto" || typeof value == "string" && value.startsWith("calc") || animateOnly && !animateOnly.includes(key) ? dontAnimate2[key] = value : animate[key] = value;
            }
          }
          componentState.unmounted === "should-enter" && (dontAnimate2 = style);
          var styles = animate,
            isExiting = !!presence?.[1],
            usePresenceValue = presence || void 0,
            transition = isHydrating ? {
              type: "transition",
              duration: 0
            } : animations[animationKey],
            hasClonedTransition = !1;
          if (Array.isArray(props.animation)) {
            var config = props.animation[1];
            if (config && (typeof config > "u" ? "undefined" : _type_of(config)) === "object") for (var key1 in config) {
              var val = config[key1];
              hasClonedTransition || (transition = Object.assign({}, transition), hasClonedTransition = !0), typeof val == "string" ? transition[key1] = animations[val] : transition[key1] = val;
            }
          }
          return {
            dontAnimate: dontAnimate2,
            motiProps: {
              animate: isExiting || componentState.unmounted === !0 ? {} : styles,
              transition: componentState.unmounted ? {
                duration: 0
              } : transition,
              usePresenceValue,
              presenceContext,
              exit: isExiting ? styles : void 0
            }
          };
        }, [presenceContext, presence, animationKey, componentState.unmounted, JSON.stringify(style), presenceContext]),
        moti = (0, import_author.useMotify)(motiProps);
      return process.env.NODE_ENV === "development" && props.debug && props.debug !== "profile" && console.info("useMotify(", JSON.stringify(motiProps, null, 2) + ")", {
        "componentState.unmounted": componentState.unmounted,
        animationProps,
        motiProps,
        moti,
        style: [dontAnimate, moti.style]
      }), {
        style: [dontAnimate, moti.style]
      };
    }
  };
}
//# sourceMappingURL=createAnimations.native.js.map
