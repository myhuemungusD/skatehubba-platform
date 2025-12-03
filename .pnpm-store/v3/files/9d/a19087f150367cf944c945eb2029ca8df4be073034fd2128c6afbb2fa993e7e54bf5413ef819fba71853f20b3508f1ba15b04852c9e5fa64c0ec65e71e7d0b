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
  AnimatedText: () => AnimatedText,
  AnimatedView: () => AnimatedView,
  createAnimations: () => createAnimations,
  useAnimatedNumber: () => useAnimatedNumber,
  useAnimatedNumberReaction: () => useAnimatedNumberReaction,
  useAnimatedNumberStyle: () => useAnimatedNumberStyle
});
module.exports = __toCommonJS(createAnimations_exports);
var import_constants = require("@tamagui/constants"),
  import_use_presence = require("@tamagui/use-presence"),
  import_web = require("@tamagui/web"),
  import_react = __toESM(require("react"), 1),
  import_react_native = require("react-native"),
  animatedStyleKey = {
    transform: !0,
    opacity: !0
  },
  colorStyleKey = {
    backgroundColor: !0,
    color: !0,
    borderColor: !0,
    borderLeftColor: !0,
    borderRightColor: !0,
    borderTopColor: !0,
    borderBottomColor: !0
  },
  costlyToAnimateStyleKey = {
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
  },
  AnimatedView = import_react_native.Animated.View,
  AnimatedText = import_react_native.Animated.Text;
function useAnimatedNumber(initial) {
  var state = import_react.default.useRef(null);
  return state.current || (state.current = {
    composite: null,
    val: new import_react_native.Animated.Value(initial),
    strategy: {
      type: "spring"
    }
  }), {
    getInstance() {
      return state.current.val;
    },
    getValue() {
      return state.current.val._value;
    },
    stop() {
      var _state_current_composite;
      (_state_current_composite = state.current.composite) === null || _state_current_composite === void 0 || _state_current_composite.stop(), state.current.composite = null;
    },
    setValue(next) {
      var {
          type,
          ...config
        } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
          type: "spring"
        },
        onFinish = arguments.length > 2 ? arguments[2] : void 0,
        val = state.current.val,
        handleFinish = onFinish ? function (param) {
          var {
            finished
          } = param;
          return finished ? onFinish() : null;
        } : void 0;
      if (type === "direct") val.setValue(next);else if (type === "spring") {
        var _state_current_composite;
        (_state_current_composite = state.current.composite) === null || _state_current_composite === void 0 || _state_current_composite.stop();
        var composite = import_react_native.Animated.spring(val, {
          ...config,
          toValue: next,
          useNativeDriver: !import_constants.isWeb
        });
        composite.start(handleFinish), state.current.composite = composite;
      } else {
        var _state_current_composite1;
        (_state_current_composite1 = state.current.composite) === null || _state_current_composite1 === void 0 || _state_current_composite1.stop();
        var composite1 = import_react_native.Animated.timing(val, {
          ...config,
          toValue: next,
          useNativeDriver: !import_constants.isWeb
        });
        composite1.start(handleFinish), state.current.composite = composite1;
      }
    }
  };
}
var useAnimatedNumberReaction = function (param, onValue) {
    var {
        value
      } = param,
      onChange = (0, import_web.useEvent)(function (current) {
        onValue(current.value);
      });
    import_react.default.useEffect(function () {
      var id = value.getInstance().addListener(onChange);
      return function () {
        value.getInstance().removeListener(id);
      };
    }, [value, onChange]);
  },
  useAnimatedNumberStyle = function (value, getStyle) {
    return getStyle(value.getInstance());
  };
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
    useAnimations: function (param) {
      var {
          props,
          onDidAnimate,
          style,
          componentState,
          presence
        } = param,
        isDisabled = import_constants.isWeb && componentState.unmounted === !0,
        isExiting = presence?.[0] === !1,
        sendExitComplete = presence?.[1],
        animateStyles = import_react.default.useRef({}),
        animatedTranforms = import_react.default.useRef([]),
        animationsState = import_react.default.useRef(/* @__PURE__ */new WeakMap()),
        animateOnly = props.animateOnly || [],
        hasAnimateOnly = !!props.animateOnly,
        args = [JSON.stringify(style), componentState, isExiting, !!onDidAnimate],
        isThereNoNativeStyleKeys = import_react.default.useMemo(function () {
          return import_constants.isWeb ? !0 : Object.keys(style).some(function (key) {
            return animateOnly ? !animatedStyleKey[key] && animateOnly.indexOf(key) === -1 : !animatedStyleKey[key];
          });
        }, args),
        res = import_react.default.useMemo(function () {
          var runners = [],
            completions = [],
            nonAnimatedStyle = {};
          for (var key in style) {
            var val = style[key];
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
                var _iteratorNormalCompletion = !0,
                  _didIteratorError = !1,
                  _iteratorError = void 0;
                try {
                  for (var _iterator = val.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                    var [index, transform] = _step.value,
                      _animatedTranforms_current_index;
                    if (transform) {
                      var tkey = Object.keys(transform)[0],
                        currentTransform = (_animatedTranforms_current_index = animatedTranforms.current[index]) === null || _animatedTranforms_current_index === void 0 ? void 0 : _animatedTranforms_current_index[tkey];
                      animatedTranforms.current[index] = {
                        [tkey]: update(tkey, currentTransform, transform[tkey])
                      }, animatedTranforms.current = [...animatedTranforms.current];
                    }
                  }
                } catch (err) {
                  _didIteratorError = !0, _iteratorError = err;
                } finally {
                  try {
                    !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
                  } finally {
                    if (_didIteratorError) throw _iteratorError;
                  }
                }
              }
            }
          }
          var animatedStyle = {
            ...Object.fromEntries(Object.entries(animateStyles.current).map(function (param2) {
              var [k, v] = param2,
                _animationsState_current_get;
              return [k, ((_animationsState_current_get = animationsState.current.get(v)) === null || _animationsState_current_get === void 0 ? void 0 : _animationsState_current_get.interpolation) || v];
            })),
            transform: animatedTranforms.current.map(function (r) {
              var _animationsState_current_get,
                key2 = Object.keys(r)[0],
                val2 = ((_animationsState_current_get = animationsState.current.get(r[key2])) === null || _animationsState_current_get === void 0 ? void 0 : _animationsState_current_get.interpolation) || r[key2];
              return {
                [key2]: val2
              };
            })
          };
          return {
            runners,
            completions,
            style: [nonAnimatedStyle, animatedStyle]
          };
          function update(key2, animated, valIn) {
            var isColorStyleKey = colorStyleKey[key2],
              [val2, type] = isColorStyleKey ? [0, void 0] : getValue(valIn),
              animateToValue = val2,
              value = animated || new import_react_native.Animated.Value(val2),
              curInterpolation = animationsState.current.get(value),
              interpolateArgs;
            if (type) {
              var _curInterpolation_current;
              interpolateArgs = getInterpolated((_curInterpolation_current = curInterpolation?.current) !== null && _curInterpolation_current !== void 0 ? _curInterpolation_current : value._value, val2, type), animationsState.current.set(value, {
                interpolation: value.interpolate(interpolateArgs),
                current: val2
              });
            }
            if (isColorStyleKey && (animateToValue = curInterpolation?.animateToValue ? 0 : 1, interpolateArgs = getColorInterpolated(curInterpolation?.current,
            // valIn is the next color
            valIn, animateToValue), animationsState.current.set(value, {
              current: valIn,
              interpolation: value.interpolate(interpolateArgs),
              animateToValue: curInterpolation?.animateToValue ? 0 : 1
            })), value) {
              var animationConfig = getAnimationConfig(key2, animations, props.animation),
                resolve,
                promise = new Promise(function (res2) {
                  resolve = res2;
                });
              completions.push(promise), runners.push(function () {
                value.stopAnimation();
                function getAnimation() {
                  return import_react_native.Animated[animationConfig.type || "spring"](value, {
                    toValue: animateToValue,
                    useNativeDriver: !import_constants.isWeb && !isThereNoNativeStyleKeys,
                    ...animationConfig
                  });
                }
                var animation = animationConfig.delay ? import_react_native.Animated.sequence([import_react_native.Animated.delay(animationConfig.delay), getAnimation()]) : getAnimation();
                animation.start(function (param2) {
                  var {
                    finished
                  } = param2;
                  finished && resolve();
                });
              });
            }
            return process.env.NODE_ENV === "development" && props.debug === "verbose" && console.info(" \u{1F4A0} animate", key2, `from (${value._value}) to`, valIn, `(${val2})`, "type", type, "interpolate", interpolateArgs), value;
          }
        }, args);
      return (0, import_constants.useIsomorphicLayoutEffect)(function () {
        res.runners.forEach(function (r) {
          return r();
        });
        var cancel = !1;
        return Promise.all(res.completions).then(function () {
          cancel || (onDidAnimate?.(), isExiting && sendExitComplete?.());
        }), function () {
          cancel = !0;
        };
      }, args), process.env.NODE_ENV === "development" && props.debug === "verbose" && console.info("Animated", {
        response: res,
        inputStyle: style,
        isExiting
      }), res;
    }
  };
}
function getColorInterpolated(currentColor, nextColor, animateToValue) {
  var inputRange = [0, 1],
    outputRange = [currentColor || nextColor, nextColor];
  return animateToValue === 0 && outputRange.reverse(), {
    inputRange,
    outputRange
  };
}
function getInterpolated(current, next) {
  var postfix = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "deg";
  next === current && (current = next - 1e-9);
  var inputRange = [current, next],
    outputRange = [`${current}${postfix}`, `${next}${postfix}`];
  return next < current && (inputRange.reverse(), outputRange.reverse()), {
    inputRange,
    outputRange
  };
}
function getAnimationConfig(key, animations, animation) {
  if (typeof animation == "string") return animations[animation];
  var type = "",
    extraConf,
    shortKey = transformShorthands[key];
  if (Array.isArray(animation)) {
    var _animation_, _animation_1;
    type = animation[0];
    var _animation__key,
      conf = (_animation__key = (_animation_ = animation[1]) === null || _animation_ === void 0 ? void 0 : _animation_[key]) !== null && _animation__key !== void 0 ? _animation__key : (_animation_1 = animation[1]) === null || _animation_1 === void 0 ? void 0 : _animation_1[shortKey];
    conf && (typeof conf == "string" ? type = conf : (type = conf.type || type, extraConf = conf));
  } else {
    var _animation_key,
      val = (_animation_key = animation?.[key]) !== null && _animation_key !== void 0 ? _animation_key : animation?.[shortKey];
    type = val?.type, extraConf = val;
  }
  var found = animations[type];
  return {
    ...found,
    ...extraConf
  };
}
var transformShorthands = {
  x: "translateX",
  y: "translateY",
  translateX: "x",
  translateY: "y"
};
function getValue(input) {
  var isColor = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  if (typeof input != "string") return [input];
  var _input_match,
    [_, number, after] = (_input_match = input.match(/([-0-9]+)(deg|%|px)/)) !== null && _input_match !== void 0 ? _input_match : [];
  return [+number, after];
}
//# sourceMappingURL=createAnimations.native.js.map
