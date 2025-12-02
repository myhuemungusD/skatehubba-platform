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
var useProps_exports = {};
__export(useProps_exports, {
  useProps: () => useProps,
  usePropsAndStyle: () => usePropsAndStyle,
  useStyle: () => useStyle
});
module.exports = __toCommonJS(useProps_exports);
var import_constants = require("@tamagui/constants"), import_react = __toESM(require("react"), 1), import_config = require("../config"), import_ComponentContext = require("../contexts/ComponentContext"), import_GroupContext = require("../contexts/GroupContext"), import_getSplitStyles = require("../helpers/getSplitStyles"), import_subscribeToContextGroup = require("../helpers/subscribeToContextGroup"), import_Stack = require("../views/Stack"), import_useComponentState = require("./useComponentState"), import_useMedia = require("./useMedia"), import_useTheme = require("./useTheme");
function useProps(props, opts) {
  const [propsOut, styleOut] = usePropsAndStyle(props, {
    ...opts,
    noExpand: !0,
    noNormalize: !0,
    resolveValues: "none"
  });
  return {
    ...propsOut,
    ...styleOut
  };
}
function useStyle(props, opts) {
  return usePropsAndStyle(props, opts)[1] || {};
}
function usePropsAndStyle(props, opts) {
  const staticConfig = opts?.forComponent?.staticConfig ?? import_Stack.Stack.staticConfig, [theme, themeState] = (0, import_useTheme.useThemeWithState)({
    componentName: staticConfig.componentName,
    name: "theme" in props ? props.theme : void 0,
    inverse: "themeInverse" in props ? props.themeInverse : void 0,
    needsUpdate() {
      return !0;
    }
  }), componentContext = import_react.default.useContext(import_ComponentContext.ComponentContext), groupContext = import_react.default.useContext(import_GroupContext.GroupContext), { state, disabled, setStateShallow } = (0, import_useComponentState.useComponentState)(
    props,
    componentContext.animationDriver,
    staticConfig,
    (0, import_config.getConfig)()
  ), mediaStateNow = opts?.noMedia ? (
    // not safe to use mediaState but really marginal to hit this
    import_useMedia.mediaState
  ) : (0, import_useMedia.useMedia)(), splitStyles = (0, import_getSplitStyles.useSplitStyles)(
    props,
    staticConfig,
    theme,
    themeState?.name || "",
    state,
    {
      isAnimated: !1,
      mediaState: mediaStateNow,
      noSkip: !0,
      noMergeStyle: !0,
      noClass: !0,
      resolveValues: "auto",
      ...opts
    },
    null,
    componentContext,
    groupContext
  ), { mediaGroups, pseudoGroups } = splitStyles || {};
  return (0, import_constants.useIsomorphicLayoutEffect)(() => {
    if (!disabled) {
      if (state.unmounted) {
        setStateShallow({ unmounted: !1 });
        return;
      }
      if (groupContext)
        return (0, import_subscribeToContextGroup.subscribeToContextGroup)({
          groupContext,
          setStateShallow,
          mediaGroups,
          pseudoGroups
        });
    }
  }, [
    disabled,
    groupContext,
    pseudoGroups ? Object.keys([...pseudoGroups]).join("") : 0,
    mediaGroups ? Object.keys([...mediaGroups]).join("") : 0
  ]), [
    splitStyles?.viewProps || {},
    splitStyles?.style || {},
    theme,
    import_useMedia.mediaState
  ];
}
//# sourceMappingURL=useProps.js.map
