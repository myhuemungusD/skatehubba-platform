var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var createAnimations_exports = {};
__export(createAnimations_exports, {
  AnimatedText: () => AnimatedText,
  AnimatedView: () => AnimatedView,
  createAnimations: () => createAnimations,
  useAnimatedNumber: () => useAnimatedNumber,
  useAnimatedNumberReaction: () => useAnimatedNumberReaction,
  useAnimatedNumberStyle: () => useAnimatedNumberStyle
});
module.exports = __toCommonJS(createAnimations_exports);
var import_constants = require("@tamagui/constants"), import_use_presence = require("@tamagui/use-presence"), import_web = require("@tamagui/web"), import_react = __toESM(require("react"), 1), import_react_native = require("react-native-web");
const animatedStyleKey = {
  transform: !0,
  opacity: !0
}, colorStyleKey = {
  backgroundColor: !0,
  color: !0,
  borderColor: !0,
  borderLeftColor: !0,
  borderRightColor: !0,
  borderTopColor: !0,
  borderBottomColor: !0
}, costlyToAnimateStyleKey = {
  borderRadius: !0,
  borderTopLeftRadius: !0,
  borderTopRightRadius: !0,
  borderBottomLeftRadius: !0,
  borderBottomRightRadius: !0,
  borderWidth: !0,
  borderLeftWidth: !0,
  borderRightWidth: !0,
  borderTopWidth: !0,
  borderBottomWidth: !0,
  ...colorStyleKey
  // TODO for other keys like height or width, it's better to not add them here till layout animations are ready
}, AnimatedView = import_react_native.Animated.View, AnimatedText = import_react_native.Animated.Text;
function useAnimatedNumber(initial) {
  const state = import_react.default.useRef(
    null
  );
  return state.current || (state.current = {
    composite: null,
    val: new import_react_native.Animated.Value(initial),
    strategy: { type: "spring" }
  }), {
    getInstance() {
      return state.current.val;
    },
    getValue() {
      return state.current.val._value;
    },
    stop() {
      state.current.composite?.stop(), state.current.composite = null;
    },
    setValue(next, { type, ...config } = { type: "spring" }, onFinish) {
      const val = state.current.val, handleFinish = onFinish ? ({ finished }) => finished ? onFinish() : null : void 0;
      if (type === "direct")
        val.setValue(next);
      else if (type === "spring") {
        state.current.composite?.stop();
        const composite = import_react_native.Animated.spring(val, {
          ...config,
          toValue: next,
          useNativeDriver: !import_constants.isWeb
        });
        composite.start(handleFinish), state.current.composite = composite;
      } else {
        state.current.composite?.stop();
        const composite = import_react_native.Animated.timing(val, {
          ...config,
          toValue: next,
          useNativeDriver: !import_constants.isWeb
        });
        composite.start(handleFinish), state.current.composite = composite;
      }
    }
  };
}
const useAnimatedNumberReaction = ({ value }, onValue) => {
  const onChange = (0, import_web.useEvent)((current) => {
    onValue(current.value);
  });
  import_react.default.useEffect(() => {
    const id = value.getInstance().addListener(onChange);
    return () => {
      value.getInstance().removeListener(id);
    };
  }, [value, onChange]);
}, useAnimatedNumberStyle = (value, getStyle) => getStyle(value.getInstance());
function createAnimations(animations) {
  return {
    isReactNative: !0,
    animations,
    View: AnimatedView,
    Text: AnimatedText,
    useAnimatedNumber,
    useAnimatedNumberReaction,
    useAnimatedNumberStyle,
    usePresence: import_use_presence.usePresence,
    ResetPresence: import_use_presence.ResetPresence,
    useAnimations: ({ props, onDidAnimate, style, componentState, presence }) => {
      const isDisabled = import_constants.isWeb && componentState.unmounted === !0, isExiting = presence?.[0] === !1, sendExitComplete = presence?.[1], animateStyles = import_react.default.useRef({}), animatedTranforms = import_react.default.useRef([]), animationsState = import_react.default.useRef(
        /* @__PURE__ */ new WeakMap()
      ), animateOnly = props.animateOnly || [], hasAnimateOnly = !!props.animateOnly, args = [JSON.stringify(style), componentState, isExiting, !!onDidAnimate], isThereNoNativeStyleKeys = import_react.default.useMemo(() => import_constants.isWeb ? !0 : Object.keys(style).some((key) => animateOnly ? !animatedStyleKey[key] && animateOnly.indexOf(key) === -1 : !animatedStyleKey[key]), args), res = import_react.default.useMemo(() => {
        const runners = [], completions = [], nonAnimatedStyle = {};
        for (const key in style) {
          const val = style[key];
          if (!isDisabled) {
            if (animatedStyleKey[key] == null && !costlyToAnimateStyleKey[key]) {
              nonAnimatedStyle[key] = val;
              continue;
            }
            if (hasAnimateOnly && !animateOnly.includes(key)) {
              nonAnimatedStyle[key] = val;
              continue;
            }
            if (key !== "transform") {
              animateStyles.current[key] = update(key, animateStyles.current[key], val);
              continue;
            }
            if (val) {
              if (typeof val == "string") {
                console.warn("Warning: Tamagui can't animate string transforms yet!");
                continue;
              }
              for (const [index, transform] of val.entries()) {
                if (!transform) continue;
                const tkey = Object.keys(transform)[0], currentTransform = animatedTranforms.current[index]?.[tkey];
                animatedTranforms.current[index] = {
                  [tkey]: update(tkey, currentTransform, transform[tkey])
                }, animatedTranforms.current = [...animatedTranforms.current];
              }
            }
          }
        }
        const animatedStyle = {
          ...Object.fromEntries(
            Object.entries(animateStyles.current).map(([k, v]) => [
              k,
              animationsState.current.get(v)?.interpolation || v
            ])
          ),
          transform: animatedTranforms.current.map((r) => {
            const key = Object.keys(r)[0], val = animationsState.current.get(r[key])?.interpolation || r[key];
            return { [key]: val };
          })
        };
        return {
          runners,
          completions,
          style: [nonAnimatedStyle, animatedStyle]
        };
        function update(key, animated, valIn) {
          const isColorStyleKey = colorStyleKey[key], [val, type] = isColorStyleKey ? [0, void 0] : getValue(valIn);
          let animateToValue = val;
          const value = animated || new import_react_native.Animated.Value(val), curInterpolation = animationsState.current.get(value);
          let interpolateArgs;
          if (type && (interpolateArgs = getInterpolated(
            curInterpolation?.current ?? value._value,
            val,
            type
          ), animationsState.current.set(value, {
            interpolation: value.interpolate(interpolateArgs),
            current: val
          })), isColorStyleKey && (animateToValue = curInterpolation?.animateToValue ? 0 : 1, interpolateArgs = getColorInterpolated(
            curInterpolation?.current,
            // valIn is the next color
            valIn,
            animateToValue
          ), animationsState.current.set(value, {
            current: valIn,
            interpolation: value.interpolate(interpolateArgs),
            animateToValue: curInterpolation?.animateToValue ? 0 : 1
          })), value) {
            const animationConfig = getAnimationConfig(key, animations, props.animation);
            let resolve;
            const promise = new Promise((res2) => {
              resolve = res2;
            });
            completions.push(promise), runners.push(() => {
              value.stopAnimation();
              function getAnimation() {
                return import_react_native.Animated[animationConfig.type || "spring"](value, {
                  toValue: animateToValue,
                  useNativeDriver: !import_constants.isWeb && !isThereNoNativeStyleKeys,
                  ...animationConfig
                });
              }
              (animationConfig.delay ? import_react_native.Animated.sequence([
                import_react_native.Animated.delay(animationConfig.delay),
                getAnimation()
              ]) : getAnimation()).start(({ finished }) => {
                finished && resolve();
              });
            });
          }
          return process.env.NODE_ENV === "development" && props.debug === "verbose" && console.info(
            " \u{1F4A0} animate",
            key,
            `from (${value._value}) to`,
            valIn,
            `(${val})`,
            "type",
            type,
            "interpolate",
            interpolateArgs
          ), value;
        }
      }, args);
      return (0, import_constants.useIsomorphicLayoutEffect)(() => {
        res.runners.forEach((r) => r());
        let cancel = !1;
        return Promise.all(res.completions).then(() => {
          cancel || (onDidAnimate?.(), isExiting && sendExitComplete?.());
        }), () => {
          cancel = !0;
        };
      }, args), process.env.NODE_ENV === "development" && props.debug === "verbose" && console.info("Animated", { response: res, inputStyle: style, isExiting }), res;
    }
  };
}
function getColorInterpolated(currentColor, nextColor, animateToValue) {
  const inputRange = [0, 1], outputRange = [currentColor || nextColor, nextColor];
  return animateToValue === 0 && outputRange.reverse(), {
    inputRange,
    outputRange
  };
}
function getInterpolated(current, next, postfix = "deg") {
  next === current && (current = next - 1e-9);
  const inputRange = [current, next], outputRange = [`${current}${postfix}`, `${next}${postfix}`];
  return next < current && (inputRange.reverse(), outputRange.reverse()), {
    inputRange,
    outputRange
  };
}
function getAnimationConfig(key, animations, animation) {
  if (typeof animation == "string")
    return animations[animation];
  let type = "", extraConf;
  const shortKey = transformShorthands[key];
  if (Array.isArray(animation)) {
    type = animation[0];
    const conf = animation[1]?.[key] ?? animation[1]?.[shortKey];
    conf && (typeof conf == "string" ? type = conf : (type = conf.type || type, extraConf = conf));
  } else {
    const val = animation?.[key] ?? animation?.[shortKey];
    type = val?.type, extraConf = val;
  }
  return {
    ...animations[type],
    ...extraConf
  };
}
const transformShorthands = {
  x: "translateX",
  y: "translateY",
  translateX: "x",
  translateY: "y"
};
function getValue(input, isColor = !1) {
  if (typeof input != "string")
    return [input];
  const [_, number, after] = input.match(/([-0-9]+)(deg|%|px)/) ?? [];
  return [+number, after];
}
//# sourceMappingURL=createAnimations.js.map
