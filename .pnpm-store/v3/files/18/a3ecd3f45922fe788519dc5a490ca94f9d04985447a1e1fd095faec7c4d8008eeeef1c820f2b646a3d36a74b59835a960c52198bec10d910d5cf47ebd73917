"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var useComponentState_exports = {};
__export(useComponentState_exports, {
  useComponentState: () => useComponentState
});
module.exports = __toCommonJS(useComponentState_exports);
var import_constants = require("@tamagui/constants"),
  import_is_equal_shallow = require("@tamagui/is-equal-shallow"),
  import_use_did_finish_ssr = require("@tamagui/use-did-finish-ssr"),
  import_react = require("react"),
  import_defaultComponentState = require("../defaultComponentState.native.js"),
  import_isObj = require("../helpers/isObj.native.js"),
  import_log = require("../helpers/log.native.js");
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var useComponentState = function (props, animationDriver, staticConfig, config) {
  var _animationDriver_usePresence,
    isHydrated = (0, import_use_did_finish_ssr.useDidFinishSSR)(),
    needsHydration = !(0, import_use_did_finish_ssr.useIsClientOnly)(),
    useAnimations = animationDriver?.isStub ? void 0 : animationDriver?.useAnimations,
    {
      isHOC
    } = staticConfig,
    stateRef = (0, import_react.useRef)(
    // performance: avoid creating object every render
    void 0);
  stateRef.current || (stateRef.current = {
    startedUnhydrated: needsHydration && !isHydrated
  });
  var hasAnimationProp = !!(!isHOC && "animation" in props || props.style && hasAnimatedStyleValue(props.style)),
    supportsCSS = animationDriver?.supportsCSS,
    curStateRef = stateRef.current;
  !needsHydration && hasAnimationProp && (curStateRef.hasAnimated = !0);
  var willBeAnimatedClient = function () {
      var next = !!(hasAnimationProp && !isHOC && useAnimations);
      return !!(next || curStateRef.hasAnimated);
    }(),
    willBeAnimated = !import_constants.isServer && willBeAnimatedClient;
  willBeAnimated && !curStateRef.hasAnimated && (curStateRef.hasAnimated = !0);
  var {
      disableClassName
    } = props,
    presence = !isHOC && willBeAnimated && props.animatePresence !== !1 && (animationDriver == null || (_animationDriver_usePresence = animationDriver.usePresence) === null || _animationDriver_usePresence === void 0 ? void 0 : _animationDriver_usePresence.call(animationDriver)) || null,
    presenceState = presence?.[2],
    isExiting = presenceState?.isPresent === !1,
    isEntering = presenceState?.isPresent === !0 && presenceState.initial !== !1,
    hasEnterStyle = !!props.enterStyle,
    hasAnimationThatNeedsHydrate = hasAnimationProp && !isHydrated && (animationDriver?.isReactNative || !supportsCSS),
    canImmediatelyEnter = hasEnterStyle || isEntering,
    shouldEnter = !isHOC && (hasEnterStyle || isEntering || hasAnimationThatNeedsHydrate ||
    // disableClassName doesnt work server side, only client, so needs hydrate
    // this is just for a better ux, supports css variables for light/dark, media queries, etc
    disableClassName),
    initialState = shouldEnter ?
    // on the very first render we switch all spring animation drivers to css rendering
    // this is because we need to use css variables, which they don't support to do proper SSR
    // without flickers of the wrong colors.
    // but once we do that initial hydration and we are in client side rendering mode,
    // we can avoid the extra re-render on mount
    canImmediatelyEnter ? import_defaultComponentState.defaultComponentStateShouldEnter : import_defaultComponentState.defaultComponentState : import_defaultComponentState.defaultComponentStateMounted,
    disabled = isDisabled(props);
  disabled != null && (initialState.disabled = disabled);
  var states = (0, import_react.useState)(initialState),
    state = props.forceStyle ? {
      ...states[0],
      [props.forceStyle]: !0
    } : states[0],
    setState = states[1],
    isAnimated = willBeAnimated;
  import_constants.isWeb && hasAnimationThatNeedsHydrate && !staticConfig.isHOC && !isHydrated && (isAnimated = !1, curStateRef.willHydrate = !0), disabled !== state.disabled && (disabled && Object.assign(state, import_defaultComponentState.defaultComponentStateMounted), state.disabled = disabled, setState(function (_) {
    return {
      ...state
    };
  }));
  var groupName = props.group,
    setStateShallow = (0, import_is_equal_shallow.useCreateShallowSetState)(setState, props.debug);
  if (presenceState && isAnimated && isHydrated && staticConfig.variants) {
    process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(`has presenceState ${JSON.stringify(presenceState)}`);
    var {
      enterVariant,
      exitVariant,
      enterExitVariant,
      custom
    } = presenceState;
    (0, import_isObj.isObj)(custom) && Object.assign(props, custom);
    var exv = exitVariant ?? enterExitVariant,
      env = enterVariant ?? enterExitVariant;
    state.unmounted && env && staticConfig.variants[env] ? (process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(`Animating presence ENTER "${env}"`), props[env] = !0) : isExiting && exv && (process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(`Animating presence EXIT "${exv}"`), props[exv] = exitVariant !== enterExitVariant);
  }
  var noClass = !import_constants.isWeb || !!props.forceStyle;
  if (!isHydrated) noClass = !1;else if (import_constants.isWeb && isHydrated) {
    var isAnimatedAndHydrated = isAnimated && isHydrated,
      isClassNameDisabled = !staticConfig.acceptsClassName && (config.disableSSR || !state.unmounted),
      isDisabledManually = disableClassName && !state.unmounted;
    // Only disable className for animation drivers that need inline styles
    (isAnimatedAndHydrated && !animationDriver?.classNameAnimation || isDisabledManually || isClassNameDisabled) && (noClass = !0, process.env.NODE_ENV === "development" && props.debug === "verbose" && (0, import_log.log)("avoiding className", {
      isAnimatedAndHydrated,
      isDisabledManually,
      isClassNameDisabled
    }));
  }
  return {
    startedUnhydrated: curStateRef.startedUnhydrated,
    curStateRef,
    disabled,
    groupName,
    hasAnimationProp,
    hasEnterStyle,
    isAnimated,
    isExiting,
    isHydrated,
    presence,
    presenceState,
    setState,
    setStateShallow,
    noClass,
    state,
    stateRef,
    supportsCSS,
    willBeAnimated,
    willBeAnimatedClient
  };
};
function hasAnimatedStyleValue(style) {
  return Object.keys(style).some(function (k) {
    var val = style[k];
    return val && (typeof val > "u" ? "undefined" : _type_of(val)) === "object" && "_animation" in val;
  });
}
var isDisabled = function (props) {
  var _props_accessibilityState;
  return props.disabled || props.passThrough || ((_props_accessibilityState = props.accessibilityState) === null || _props_accessibilityState === void 0 ? void 0 : _props_accessibilityState.disabled) || props["aria-disabled"] || props.accessibilityDisabled || !1;
};
//# sourceMappingURL=useComponentState.native.js.map
