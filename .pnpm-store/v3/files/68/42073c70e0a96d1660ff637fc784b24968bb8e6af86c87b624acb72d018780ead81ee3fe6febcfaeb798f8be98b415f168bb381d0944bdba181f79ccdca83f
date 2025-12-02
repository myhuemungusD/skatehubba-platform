import { jsx as _jsx } from "react/jsx-runtime";
export * from "@tamagui/web";
import { createMedia } from "@tamagui/react-native-media-driver";
import "@tamagui/react-native-use-responder-events";
import { enable } from "@tamagui/use-element-layout";
import { Stack as WebStack, TamaguiProvider as WebTamaguiProvider, Text as WebText, View as WebView, composeEventHandlers, createTamagui as createTamaguiWeb, setupHooks, useIsomorphicLayoutEffect } from "@tamagui/web";
import { addNativeValidStyles } from "./addNativeValidStyles.native.js";
import { createOptimizedView } from "./createOptimizedView.native.js";
import { getBaseViews } from "./getBaseViews.native.js";
import { usePressability } from "./vendor/Pressability.native.js";
import { LayoutMeasurementController, setOnLayoutStrategy } from "@tamagui/use-element-layout";
export * from "./reactNativeTypes.native.js";
addNativeValidStyles();
var TamaguiProvider = function (props) {
    return useIsomorphicLayoutEffect(function () {
      enable();
    }, []), /* @__PURE__ */_jsx(WebTamaguiProvider, {
      ...props
    });
  },
  createTamagui = function (conf) {
    return conf.media && (conf.media = createMedia(conf.media)), createTamaguiWeb(conf);
  },
  baseViews = getBaseViews();
setupHooks({
  getBaseViews,
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
        onPressOut && onPress && (inputEvents.onPressOut = composeEventHandlers(onPress, onPressOut)), Object.assign(viewProps, inputEvents);
      }
    } else {
      events && viewProps.hitSlop && (events.hitSlop = viewProps.hitSlop);
      var pressability = usePressability(events);
      if (events && (process.env.NODE_ENV === "development" && viewProps.debug && console.info(`Checking for press ${!!events.onPress} then applying pressability props: ${Object.keys(pressability || {})}`), events.onPress)) for (var key in pressability) {
        var og = viewProps[key],
          val = pressability[key];
        viewProps[key] = og && !dontComposePressabilityKeys[key] ? composeEventHandlers(og, val) : val;
      }
    }
  },
  useChildren(elementType, children, viewProps) {
    if (process.env.NODE_ENV !== "test" && elementType === baseViews.View && baseViews.TextAncestor) return createOptimizedView(children, viewProps, baseViews);
  }
});
var dontComposePressabilityKeys = {
    onClick: !0
  },
  View = WebView,
  Stack = WebStack,
  Text = WebText;
export { LayoutMeasurementController, Stack, TamaguiProvider, Text, View, createTamagui, setOnLayoutStrategy };
//# sourceMappingURL=index.native.js.map
