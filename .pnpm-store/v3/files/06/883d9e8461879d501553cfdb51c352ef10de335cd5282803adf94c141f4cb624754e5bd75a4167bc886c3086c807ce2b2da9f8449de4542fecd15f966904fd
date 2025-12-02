var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var defaultAnimationDriver_exports = {};
__export(defaultAnimationDriver_exports, {
  defaultAnimationDriver: () => defaultAnimationDriver
});
module.exports = __toCommonJS(defaultAnimationDriver_exports);
const noAnimationDriver = (method) => {
  console.warn(
    `No animation driver configured. To use ${method}, you must pass \`animations\` to createTamagui. See: https://tamagui.dev/docs/core/animations`
  );
}, createEmptyAnimationDriver = () => ({
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
}), defaultAnimationDriver = createEmptyAnimationDriver();
//# sourceMappingURL=defaultAnimationDriver.js.map
