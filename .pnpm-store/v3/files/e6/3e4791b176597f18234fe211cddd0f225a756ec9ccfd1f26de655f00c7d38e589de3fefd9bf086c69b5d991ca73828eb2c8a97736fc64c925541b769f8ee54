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
}, __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var index_exports = {};
__export(index_exports, {
  LayoutMeasurementController: () => import_use_element_layout2.LayoutMeasurementController,
  Stack: () => Stack,
  TamaguiProvider: () => TamaguiProvider,
  Text: () => Text,
  View: () => View,
  createTamagui: () => createTamagui,
  setOnLayoutStrategy: () => import_use_element_layout2.setOnLayoutStrategy
});
module.exports = __toCommonJS(index_exports);
__reExport(index_exports, require("@tamagui/web"), module.exports);
var import_react_native_media_driver = require("@tamagui/react-native-media-driver"), import_react_native_use_responder_events = require("@tamagui/react-native-use-responder-events"), import_use_element_layout = require("@tamagui/use-element-layout"), import_web = require("@tamagui/web"), import_addNativeValidStyles = require("./addNativeValidStyles"), import_createOptimizedView = require("./createOptimizedView"), import_getBaseViews = require("./getBaseViews"), import_Pressability = require("./vendor/Pressability"), import_use_element_layout2 = require("@tamagui/use-element-layout");
__reExport(index_exports, require("./reactNativeTypes"), module.exports);
var import_jsx_runtime = require("react/jsx-runtime");
(0, import_addNativeValidStyles.addNativeValidStyles)();
const TamaguiProvider = (props) => ((0, import_web.useIsomorphicLayoutEffect)(() => {
  (0, import_use_element_layout.enable)();
}, []), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_web.TamaguiProvider, { ...props })), createTamagui = (conf) => (0, import_web.createTamagui)(conf), baseViews = (0, import_getBaseViews.getBaseViews)();
(0, import_web.setupHooks)({
  getBaseViews: import_getBaseViews.getBaseViews,
  setElementProps: (node) => {
    node && !node.measure && (node.measure ||= (0, import_use_element_layout.createMeasure)(node), node.measureInWindow ||= (0, import_use_element_layout.createMeasureInWindow)(node), node.measureLayout ||= (0, import_use_element_layout.createMeasureLayout)(node));
  },
  usePropsTransform(elementType, propsIn, stateRef, willHydrate) {
    {
      const isDOM = typeof elementType == "string", {
        // remove event props handles by useResponderEvents
        onMoveShouldSetResponder,
        onMoveShouldSetResponderCapture,
        onResponderEnd,
        onResponderGrant,
        onResponderMove,
        onResponderReject,
        onResponderRelease,
        onResponderStart,
        onResponderTerminate,
        onResponderTerminationRequest,
        onScrollShouldSetResponder,
        onScrollShouldSetResponderCapture,
        onSelectionChangeShouldSetResponder,
        onSelectionChangeShouldSetResponderCapture,
        onStartShouldSetResponder,
        onStartShouldSetResponderCapture,
        // android
        collapsable,
        focusable,
        // deprecated,
        accessible,
        accessibilityDisabled,
        onLayout,
        hrefAttrs,
        ...plainDOMProps
      } = propsIn;
      if ((willHydrate || isDOM) && ((0, import_use_element_layout.useElementLayout)(stateRef, isDOM ? onLayout : void 0), (0, import_react_native_use_responder_events.useResponderEvents)(stateRef, isDOM ? propsIn : void 0)), isDOM) {
        if (plainDOMProps.href && hrefAttrs) {
          const { download, rel, target } = hrefAttrs;
          download != null && (plainDOMProps.download = download), rel && (plainDOMProps.rel = rel), typeof target == "string" && (plainDOMProps.target = target.charAt(0) !== "_" ? `_${target}` : target);
        }
        return plainDOMProps;
      }
    }
  },
  useEvents(viewProps, events, splitStyles, setStateShallow, staticConfig) {
  }
});
const View = import_web.View, Stack = import_web.Stack, Text = import_web.Text;
//# sourceMappingURL=index.js.map
