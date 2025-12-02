import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { composeRefs } from "@tamagui/compose-refs";
import { isClient, isWeb, View } from "@tamagui/core";
import { ScrollView } from "@tamagui/scroll-view";
import { useControllableState } from "@tamagui/use-controllable-state";
import React, { useEffect, useRef, useState } from "react";
import { useSheetContext } from "./SheetContext.native.js";
var SHEET_SCROLL_VIEW_NAME = "SheetScrollView",
  SheetScrollView = /* @__PURE__ */React.forwardRef(
  // we disallow customizing it because we want to let people know it doens't work well with out measuring of inner content
  // height using a view
  function (param, ref) {
    var {
        __scopeSheet,
        children,
        onScroll,
        scrollEnabled: scrollEnabledProp,
        ...props
      } = param,
      context = useSheetContext(SHEET_SCROLL_VIEW_NAME, __scopeSheet),
      {
        scrollBridge,
        setHasScrollView
      } = context,
      [scrollEnabled, setScrollEnabled_] = useControllableState({
        prop: scrollEnabledProp,
        defaultProp: !0
      }),
      scrollRef = React.useRef(null),
      setScrollEnabled = function (next) {
        var _scrollRef_current_setNativeProps, _scrollRef_current;
        (_scrollRef_current = scrollRef.current) === null || _scrollRef_current === void 0 || (_scrollRef_current_setNativeProps = _scrollRef_current.setNativeProps) === null || _scrollRef_current_setNativeProps === void 0 || _scrollRef_current_setNativeProps.call(_scrollRef_current, {
          scrollEnabled: next
        }), setScrollEnabled_(next);
      },
      state = React.useRef({
        lastPageY: 0,
        dragAt: 0,
        dys: [],
        // store a few recent dys to get velocity on release
        isScrolling: !1,
        isDraggingScrollArea: !1
      });
    useEffect(function () {
      return setHasScrollView(!0), function () {
        setHasScrollView(!1);
      };
    }, []);
    var release = function () {
        if (state.current.isDraggingScrollArea) {
          state.current.isDraggingScrollArea = !1, scrollBridge.scrollStartY = -1, scrollBridge.scrollLock = !1, state.current.isScrolling = !1, setScrollEnabled(!0);
          var vy = 0;
          if (state.current.dys.length) {
            var recentDys = state.current.dys.slice(-10),
              dist = recentDys.length ? recentDys.reduce(function (a, b) {
                return a + b;
              }, 0) : 0,
              avgDy = dist / recentDys.length;
            vy = avgDy * 0.04;
          }
          state.current.dys = [], scrollBridge.release({
            dragAt: state.current.dragAt,
            vy
          });
        }
      },
      scrollable = scrollEnabled;
    useEffect(function () {
      var _scrollRef_current;
      if (isClient && scrollRef.current) {
        var controller = new AbortController(),
          node = (_scrollRef_current = scrollRef.current) === null || _scrollRef_current === void 0 ? void 0 : _scrollRef_current.getScrollableNode();
        if (node) {
          node.addEventListener("touchmove", function (e) {
            scrollBridge.isParentDragging && node.scrollTo({
              top: scrollBridge.y,
              behavior: "instant"
            });
          },
          // can't preventdefault its not cancellable
          {
            signal: controller.signal,
            passive: !1
          });
          var disposeBridgeListen = scrollBridge.onParentDragging(function (val) {});
          return function () {
            disposeBridgeListen(), controller.abort();
          };
        }
      }
    }, [scrollRef]);
    var [hasScrollableContent, setHasScrollableContent] = useState(!0),
      parentHeight = useRef(0),
      contentHeight = useRef(0),
      setIsScrollable = function () {
        parentHeight.current && contentHeight.current && setHasScrollableContent(contentHeight.current > parentHeight.current);
      };
    return useEffect(function () {
      scrollBridge.hasScrollableContent = hasScrollableContent;
    }, [hasScrollableContent]), /* @__PURE__ */_jsxs(ScrollView, {
      onLayout: function (e) {
        parentHeight.current = Math.ceil(e.nativeEvent.layout.height), setIsScrollable();
      },
      ref: composeRefs(scrollRef, ref),
      flex: 1,
      scrollEventThrottle: 8,
      onResponderRelease: release,
      className: "_ovs-contain",
      scrollEnabled: scrollable,
      // {...(Platform.OS === 'android' && {
      //   pointerEvents: scrollable ? undefined : 'none',
      // })}
      onScroll: function (e) {
        var {
          y
        } = e.nativeEvent.contentOffset;
        scrollBridge.y = y, isWeb && (scrollBridge.scrollLock = y > 0), y > 0 && (scrollBridge.scrollStartY = -1), onScroll?.(e);
      },
      // This assures that we do not skip the "scrollBridge" values processing
      // when passing this prop into a <Sheet.ScrollView /> overriding it here
      // Useful when using this ScrollView with lists such as "FlashList", i.e.
      // ```
      // renderScrollComponent={Sheet.ScrollView}
      // ```
      onStartShouldSetResponder: function () {
        return scrollBridge.scrollStartY = -1, state.current.isDraggingScrollArea = !0, scrollable;
      },
      // setting to false while onResponderMove is disabled
      onMoveShouldSetResponder: function (e) {
        return scrollable;
      },
      contentContainerStyle: {
        minHeight: "100%"
      },
      onResponderMove: function (e) {
        if (isWeb) {
          var {
            pageY
          } = e.nativeEvent;
          state.current.isScrolling || scrollBridge.scrollStartY === -1 && (scrollBridge.scrollStartY = pageY, state.current.lastPageY = pageY);
          var dragAt = pageY - scrollBridge.scrollStartY,
            dy = pageY - state.current.lastPageY;
          state.current.lastPageY = pageY;
          var isDraggingUp = dy < 0,
            isPaneAtTop = scrollBridge.paneY <= scrollBridge.paneMinY,
            shouldScrollLock = hasScrollableContent && (dy === 0 || isDraggingUp) && isPaneAtTop;
          if (shouldScrollLock && !state.current.isScrolling) {
            state.current.isScrolling = !0, scrollBridge.scrollLock = !0, setScrollEnabled(!0);
            return;
          }
          var isDraggingUpFromTopOnFirstScroll = !state.current.isScrolling && dy > 0 && scrollBridge.y === 0;
          if (!isDraggingUpFromTopOnFirstScroll && scrollBridge.y >= 0) return;
          setScrollEnabled(!1), scrollBridge.drag(dragAt), state.current.dragAt = dragAt, state.current.dys.push(dy), state.current.dys.length > 100 && (state.current.dys = state.current.dys.slice(-10));
        }
      },
      ...props,
      children: [/* content height measurer */
      /* @__PURE__ */_jsx(View, {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: -1,
        onLayout: function (e) {
          contentHeight.current = Math.floor(e.nativeEvent.layout.height), setIsScrollable();
        }
      }), children]
    });
  });
export { SheetScrollView };
//# sourceMappingURL=SheetScrollView.native.js.map
