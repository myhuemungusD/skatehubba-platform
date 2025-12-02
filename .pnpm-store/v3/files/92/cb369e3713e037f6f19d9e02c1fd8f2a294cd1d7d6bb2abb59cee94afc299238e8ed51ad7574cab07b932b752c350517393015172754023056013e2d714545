import { PresenceContext, ResetPresence, usePresence } from "@tamagui/use-presence";
import {
  getSplitStyles,
  hooks,
  isWeb,
  Text,
  useComposedRefs,
  useThemeWithState,
  View
} from "@tamagui/core";
import { useMotify } from "moti/author";
import React, { forwardRef, useMemo, useRef } from "react";
import Animated_, {
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { jsx } from "react/jsx-runtime";
const safeESModule = (a) => {
  const b = a;
  return (b.__esModule || b[Symbol.toStringTag] === "Module" ? b.default : b) || a;
}, Animated = safeESModule(Animated_);
function createTamaguiAnimatedComponent(defaultTag = "div") {
  const isText = defaultTag === "span", Component = Animated.createAnimatedComponent(
    forwardRef((propsIn, ref) => {
      const { forwardedRef, animation, tag = defaultTag, ...propsRest } = propsIn, hostRef = useRef(null), composedRefs = useComposedRefs(forwardedRef, ref, hostRef), stateRef = useRef(null);
      stateRef.current || (stateRef.current = {
        get host() {
          return hostRef.current;
        }
      });
      const [_, state] = useThemeWithState({}), props = getSplitStyles(
        propsRest,
        isText ? Text.staticConfig : View.staticConfig,
        state?.theme,
        state?.name,
        {
          unmounted: !1
        },
        {
          isAnimated: !1,
          noClass: !0
        }
      )?.viewProps || {}, Element = tag, transformedProps = hooks.usePropsTransform?.(tag, props, stateRef, !1);
      return /* @__PURE__ */ jsx(Element, { ...transformedProps, ref: composedRefs });
    })
  );
  return Component.acceptTagProp = !0, Component;
}
const AnimatedView = createTamaguiAnimatedComponent("div"), AnimatedText = createTamaguiAnimatedComponent("span"), onlyAnimateKeys = {
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
    View: isWeb ? AnimatedView : Animated.View,
    Text: isWeb ? AnimatedText : Animated.Text,
    // View: Animated.View,
    // Text: Animated.Text,
    isReactNative: !0,
    supportsCSS: !1,
    animations,
    usePresence,
    ResetPresence,
    useAnimatedNumber(initial) {
      const sharedValue = useSharedValue(initial);
      return React.useMemo(
        () => ({
          getInstance() {
            "worklet";
            return sharedValue;
          },
          getValue() {
            "worklet";
            return sharedValue.value;
          },
          setValue(next, config = { type: "spring" }, onFinish) {
            "worklet";
            config.type === "direct" ? (sharedValue.value = next, onFinish?.()) : config.type === "spring" ? sharedValue.value = withSpring(
              next,
              config,
              onFinish ? () => {
                "worklet";
                runOnJS(onFinish)();
              } : void 0
            ) : sharedValue.value = withTiming(
              next,
              config,
              onFinish ? () => {
                "worklet";
                runOnJS(onFinish)();
              } : void 0
            );
          },
          stop() {
            "worklet";
            cancelAnimation(sharedValue);
          }
        }),
        [sharedValue]
      );
    },
    useAnimatedNumberReaction({ value }, onValue) {
      const instance = value.getInstance();
      return useAnimatedReaction(
        () => instance.value,
        (next, prev) => {
          prev !== next && runOnJS(onValue)(next);
        },
        // dependency array is very important here
        [onValue, instance]
      );
    },
    /**
     * `getStyle` must be a worklet
     */
    useAnimatedNumberStyle(val, getStyle) {
      const instance = val.getInstance(), derivedValue = useDerivedValue(() => instance.value, [instance, getStyle]);
      return useAnimatedStyle(() => getStyle(derivedValue.value), [val, getStyle, derivedValue, instance]);
    },
    useAnimations: (animationProps) => {
      const { props, presence, style, componentState } = animationProps, animationKey = Array.isArray(props.animation) ? props.animation[0] : props.animation, isHydrating = componentState.unmounted === !0, disableAnimation = isHydrating || !animationKey, presenceContext = React.useContext(PresenceContext), { dontAnimate, motiProps } = useMemo(() => {
        let animate = {}, dontAnimate2 = {};
        if (disableAnimation)
          dontAnimate2 = style;
        else {
          const animateOnly = props.animateOnly;
          for (const key in style) {
            const value = style[key];
            !onlyAnimateKeys[key] || value === "auto" || typeof value == "string" && value.startsWith("calc") || animateOnly && !animateOnly.includes(key) ? dontAnimate2[key] = value : animate[key] = value;
          }
        }
        componentState.unmounted === "should-enter" && (dontAnimate2 = style);
        const styles = animate, isExiting = !!presence?.[1], usePresenceValue = presence || void 0;
        let transition = isHydrating ? { type: "transition", duration: 0 } : animations[animationKey], hasClonedTransition = !1;
        if (Array.isArray(props.animation)) {
          const config = props.animation[1];
          if (config && typeof config == "object")
            for (const key in config) {
              const val = config[key];
              hasClonedTransition || (transition = Object.assign({}, transition), hasClonedTransition = !0), typeof val == "string" ? transition[key] = animations[val] : transition[key] = val;
            }
        }
        return {
          dontAnimate: dontAnimate2,
          motiProps: {
            animate: isExiting || componentState.unmounted === !0 ? {} : styles,
            transition: componentState.unmounted ? { duration: 0 } : transition,
            usePresenceValue,
            presenceContext,
            exit: isExiting ? styles : void 0
          }
        };
      }, [
        presenceContext,
        presence,
        animationKey,
        componentState.unmounted,
        JSON.stringify(style),
        presenceContext
      ]), moti = useMotify(motiProps);
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
export {
  createAnimations
};
//# sourceMappingURL=createAnimations.js.map
