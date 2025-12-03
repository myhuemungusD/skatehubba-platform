import { isServer, isWeb } from "@tamagui/constants";
import { useCreateShallowSetState } from "@tamagui/is-equal-shallow";
import { useDidFinishSSR, useIsClientOnly } from "@tamagui/use-did-finish-ssr";
import { useRef, useState } from "react";
import { defaultComponentState, defaultComponentStateMounted, defaultComponentStateShouldEnter } from "../defaultComponentState.mjs";
import { isObj } from "../helpers/isObj.mjs";
import { log } from "../helpers/log.mjs";
const useComponentState = (props, animationDriver, staticConfig, config) => {
  const isHydrated = useDidFinishSSR(),
    needsHydration = !useIsClientOnly(),
    useAnimations = animationDriver?.isStub ? void 0 : animationDriver?.useAnimations,
    {
      isHOC
    } = staticConfig,
    stateRef = useRef(
    // performance: avoid creating object every render
    void 0);
  stateRef.current || (stateRef.current = {
    startedUnhydrated: needsHydration && !isHydrated
  });
  const hasAnimationProp = !!(!isHOC && "animation" in props || props.style && hasAnimatedStyleValue(props.style)),
    supportsCSS = animationDriver?.supportsCSS,
    curStateRef = stateRef.current;
  !needsHydration && hasAnimationProp && (curStateRef.hasAnimated = !0);
  const willBeAnimatedClient = !!(!!(hasAnimationProp && !isHOC && useAnimations) || curStateRef.hasAnimated),
    willBeAnimated = !isServer && willBeAnimatedClient;
  willBeAnimated && !curStateRef.hasAnimated && (curStateRef.hasAnimated = !0);
  const {
      disableClassName
    } = props,
    presence = !isHOC && willBeAnimated && props.animatePresence !== !1 && animationDriver?.usePresence?.() || null,
    presenceState = presence?.[2],
    isExiting = presenceState?.isPresent === !1,
    isEntering = presenceState?.isPresent === !0 && presenceState.initial !== !1,
    hasEnterStyle = !!props.enterStyle,
    hasAnimationThatNeedsHydrate = hasAnimationProp && !isHydrated && (animationDriver?.isReactNative || !supportsCSS),
    initialState = !isHOC && (hasEnterStyle || isEntering || hasAnimationThatNeedsHydrate ||
    // disableClassName doesnt work server side, only client, so needs hydrate
    // this is just for a better ux, supports css variables for light/dark, media queries, etc
    disableClassName) ?
    // on the very first render we switch all spring animation drivers to css rendering
    // this is because we need to use css variables, which they don't support to do proper SSR
    // without flickers of the wrong colors.
    // but once we do that initial hydration and we are in client side rendering mode,
    // we can avoid the extra re-render on mount
    hasEnterStyle || isEntering ? defaultComponentStateShouldEnter : defaultComponentState : defaultComponentStateMounted,
    disabled = isDisabled(props);
  disabled != null && (initialState.disabled = disabled);
  const states = useState(initialState),
    state = props.forceStyle ? {
      ...states[0],
      [props.forceStyle]: !0
    } : states[0],
    setState = states[1];
  let isAnimated = willBeAnimated;
  isWeb && hasAnimationThatNeedsHydrate && !staticConfig.isHOC && !isHydrated && (isAnimated = !1, curStateRef.willHydrate = !0), disabled !== state.disabled && (disabled && Object.assign(state, defaultComponentStateMounted), state.disabled = disabled, setState(_ => ({
    ...state
  })));
  const groupName = props.group,
    setStateShallow = useCreateShallowSetState(setState, props.debug);
  if (presenceState && isAnimated && isHydrated && staticConfig.variants) {
    process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(`has presenceState ${JSON.stringify(presenceState)}`);
    const {
      enterVariant,
      exitVariant,
      enterExitVariant,
      custom
    } = presenceState;
    isObj(custom) && Object.assign(props, custom);
    const exv = exitVariant ?? enterExitVariant,
      env = enterVariant ?? enterExitVariant;
    state.unmounted && env && staticConfig.variants[env] ? (process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(`Animating presence ENTER "${env}"`), props[env] = !0) : isExiting && exv && (process.env.NODE_ENV === "development" && props.debug === "verbose" && console.warn(`Animating presence EXIT "${exv}"`), props[exv] = exitVariant !== enterExitVariant);
  }
  let noClass = !isWeb || !!props.forceStyle;
  if (!isHydrated) noClass = !1;else if (isWeb && isHydrated) {
    const isAnimatedAndHydrated = isAnimated && isHydrated,
      isClassNameDisabled = !staticConfig.acceptsClassName && (config.disableSSR || !state.unmounted),
      isDisabledManually = disableClassName && !state.unmounted;
    // Only disable className for animation drivers that need inline styles
    (isAnimatedAndHydrated && !animationDriver?.classNameAnimation || isDisabledManually || isClassNameDisabled) && (noClass = !0, process.env.NODE_ENV === "development" && props.debug === "verbose" && log("avoiding className", {
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
  return Object.keys(style).some(k => {
    const val = style[k];
    return val && typeof val == "object" && "_animation" in val;
  });
}
const isDisabled = props => props.disabled || props.passThrough || props.accessibilityState?.disabled || props["aria-disabled"] || props.accessibilityDisabled || !1;
export { useComponentState };
//# sourceMappingURL=useComponentState.mjs.map
