const noAnimationDriver = method => {
    console.warn(`No animation driver configured. To use ${method}, you must pass \`animations\` to createTamagui. See: https://tamagui.dev/docs/core/animations`);
  },
  createEmptyAnimationDriver = () => ({
    isReactNative: !1,
    supportsCSS: !0,
    classNameAnimation: !0,
    isStub: !0,
    animations: {},
    useAnimations: () => noAnimationDriver("animations"),
    usePresence: () => noAnimationDriver("usePresence"),
    ResetPresence: () => noAnimationDriver("ResetPresence"),
    useAnimatedNumber: () => noAnimationDriver("useAnimatedNumber"),
    useAnimatedNumberStyle: () => noAnimationDriver("useAnimatedNumberStyle"),
    useAnimatedNumberReaction: () => noAnimationDriver("useAnimatedNumberReaction")
  }),
  defaultAnimationDriver = createEmptyAnimationDriver();
export { defaultAnimationDriver };
//# sourceMappingURL=defaultAnimationDriver.mjs.map
