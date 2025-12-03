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
var import_use_presence = require("@tamagui/use-presence"),
  import_core = require("@tamagui/core"),
  import_author = require("moti/author"),
  import_react = __toESM(require("react"), 1),
  import_react_native_reanimated = __toESM(require("react-native-reanimated"), 1),
  import_jsx_runtime = require("react/jsx-runtime");
const safeESModule = a => {
    const b = a;
    return (b.__esModule || b[Symbol.toStringTag] === "Module" ? b.default : b) || a;
  },
  Animated = safeESModule(import_react_native_reanimated.default);
function createTamaguiAnimatedComponent(defaultTag = "div") {
  const isText = defaultTag === "span",
    Component = Animated.createAnimatedComponent((0, import_react.forwardRef)((propsIn, ref) => {
      const {
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
      const [_, state] = (0, import_core.useThemeWithState)({}),
        props = (0, import_core.getSplitStyles)(propsRest, isText ? import_core.Text.staticConfig : import_core.View.staticConfig, state?.theme, state?.name, {
          unmounted: !1
        }, {
          isAnimated: !1,
          noClass: !0
        })?.viewProps || {},
        Element = tag,
        transformedProps = import_core.hooks.usePropsTransform?.(tag, props, stateRef, !1);
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Element, {
        ...transformedProps,
        ref: composedRefs
      });
    }));
  return Component.acceptTagProp = !0, Component;
}
const AnimatedView = createTamaguiAnimatedComponent("div"),
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
      const sharedValue = (0, import_react_native_reanimated.useSharedValue)(initial);
      return import_react.default.useMemo(() => ({
        getInstance() {
          "worklet";

          return sharedValue;
        },
        getValue() {
          "worklet";

          return sharedValue.value;
        },
        setValue(next, config = {
          type: "spring"
        }, onFinish) {
          "worklet";

          config.type === "direct" ? (sharedValue.value = next, onFinish?.()) : config.type === "spring" ? sharedValue.value = (0, import_react_native_reanimated.withSpring)(next, config, onFinish ? () => {
            "worklet";

            (0, import_react_native_reanimated.runOnJS)(onFinish)();
          } : void 0) : sharedValue.value = (0, import_react_native_reanimated.withTiming)(next, config, onFinish ? () => {
            "worklet";

            (0, import_react_native_reanimated.runOnJS)(onFinish)();
          } : void 0);
        },
        stop() {
          "worklet";

          (0, import_react_native_reanimated.cancelAnimation)(sharedValue);
        }
      }), [sharedValue]);
    },
    useAnimatedNumberReaction({
      value
    }, onValue) {
      const instance = value.getInstance();
      return (0, import_react_native_reanimated.useAnimatedReaction)(() => instance.value, (next, prev) => {
        prev !== next && (0, import_react_native_reanimated.runOnJS)(onValue)(next);
      },
      // dependency array is very important here
      [onValue, instance]);
    },
    /**
     * `getStyle` must be a worklet
     */
    useAnimatedNumberStyle(val, getStyle) {
      const instance = val.getInstance(),
        derivedValue = (0, import_react_native_reanimated.useDerivedValue)(() => instance.value, [instance, getStyle]);
      return (0, import_react_native_reanimated.useAnimatedStyle)(() => getStyle(derivedValue.value), [val, getStyle, derivedValue, instance]);
    },
    useAnimations: animationProps => {
      const {
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
        } = (0, import_react.useMemo)(() => {
          let animate = {},
            dontAnimate2 = {};
          if (disableAnimation) dontAnimate2 = style;else {
            const animateOnly = props.animateOnly;
            for (const key in style) {
              const value = style[key];
              !onlyAnimateKeys[key] || value === "auto" || typeof value == "string" && value.startsWith("calc") || animateOnly && !animateOnly.includes(key) ? dontAnimate2[key] = value : animate[key] = value;
            }
          }
          componentState.unmounted === "should-enter" && (dontAnimate2 = style);
          const styles = animate,
            isExiting = !!presence?.[1],
            usePresenceValue = presence || void 0;
          let transition = isHydrating ? {
              type: "transition",
              duration: 0
            } : animations[animationKey],
            hasClonedTransition = !1;
          if (Array.isArray(props.animation)) {
            const config = props.animation[1];
            if (config && typeof config == "object") for (const key in config) {
              const val = config[key];
              hasClonedTransition || (transition = Object.assign({}, transition), hasClonedTransition = !0), typeof val == "string" ? transition[key] = animations[val] : transition[key] = val;
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