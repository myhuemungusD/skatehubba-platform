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
  },
  __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
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
var import_jsx_runtime = require("react/jsx-runtime");
__reExport(index_exports, require("@tamagui/web"), module.exports);
var import_react_native_media_driver = require("@tamagui/react-native-media-driver"),
  import_react_native_use_responder_events = require("@tamagui/react-native-use-responder-events"),
  import_use_element_layout = require("@tamagui/use-element-layout"),
  import_web = require("@tamagui/web"),
  import_addNativeValidStyles = require("./addNativeValidStyles.native.js"),
  import_createOptimizedView = require("./createOptimizedView.native.js"),
  import_getBaseViews = require("./getBaseViews.native.js"),
  import_Pressability = require("./vendor/Pressability.native.js"),
  import_use_element_layout2 = require("@tamagui/use-element-layout");
__reExport(index_exports, require("./reactNativeTypes.native.js"), module.exports);
(0, import_addNativeValidStyles.addNativeValidStyles)();
var TamaguiProvider = function (props) {
    return (0, import_web.useIsomorphicLayoutEffect)(function () {
      (0, import_use_element_layout.enable)();
    }, []), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_web.TamaguiProvider, {
      ...props
    });
  },
  createTamagui = function (conf) {
    return conf.media && (conf.media = (0, import_react_native_media_driver.createMedia)(conf.media)), (0, import_web.createTamagui)(conf);
  },
  baseViews = (0, import_getBaseViews.getBaseViews)();
(0, import_web.setupHooks)({
  getBaseViews: import_getBaseViews.getBaseViews,
  setElementProps: function (node) {
    if (0 && node && !node.measure) var _node, _node1, _node2;
  },
  usePropsTransform(elementType, propsIn, stateRef, willHydrate) {
    if (0) {
      var isDOM, onMoveShouldSetResponder, onMoveShouldSetResponderCapture, onResponderEnd, onResponderGrant, onResponderMove, onResponderReject, onResponderRelease, onResponderStart, onResponderTerminate, onResponderTerminationRequest, onScrollShouldSetResponder, onScrollShouldSetResponderCapture, onSelectionChangeShouldSetResponder, onSelectionChangeShouldSetResponderCapture, onStartShouldSetResponder, onStartShouldSetResponderCapture, collapsable, focusable, accessible, accessibilityDisabled, onLayout, hrefAttrs, plainDOMProps;
      if (isDOM && plainDOMProps.href && hrefAttrs) var download, rel, target;
    }
  },
  useEvents(viewProps, events, splitStyles, setStateShallow, staticConfig) {
    if (events && (events.onFocus && (viewProps.onFocus = events.onFocus), events.onBlur && (viewProps.onBlur = events.onBlur)), staticConfig.isInput) {
      if (events) {
        var {
            onPressIn,
            onPressOut,
            onPress
          } = events,
          inputEvents = {
            onPressIn,
            onPressOut: onPressOut || onPress
          };
        onPressOut && onPress && (inputEvents.onPressOut = (0, import_web.composeEventHandlers)(onPress, onPressOut)), Object.assign(viewProps, inputEvents);
      }
    } else {
      events && viewProps.hitSlop && (events.hitSlop = viewProps.hitSlop);
      var pressability = (0, import_Pressability.usePressability)(events);
      if (events && (process.env.NODE_ENV === "development" && viewProps.debug && console.info(`Checking for press ${!!events.onPress} then applying pressability props: ${Object.keys(pressability || {})}`), events.onPress)) for (var key in pressability) {
        var og = viewProps[key],
          val = pressability[key];
        viewProps[key] = og && !dontComposePressabilityKeys[key] ? (0, import_web.composeEventHandlers)(og, val) : val;
      }
    }
  },
  useChildren(elementType, children, viewProps) {
    if (process.env.NODE_ENV !== "test" && elementType === baseViews.View && baseViews.TextAncestor) return (0, import_createOptimizedView.createOptimizedView)(children, viewProps, baseViews);
  }
});
var dontComposePressabilityKeys = {
    onClick: !0
  },
  View = import_web.View,
  Stack = import_web.Stack,
  Text = import_web.Text;
//# sourceMappingURL=index.native.js.map
