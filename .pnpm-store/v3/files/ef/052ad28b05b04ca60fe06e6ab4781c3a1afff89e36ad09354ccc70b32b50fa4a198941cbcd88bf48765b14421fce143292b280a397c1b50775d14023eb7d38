import { composeRefs } from "@tamagui/compose-refs";
import { isClient, isWeb, View } from "@tamagui/core";
import { ScrollView } from "@tamagui/scroll-view";
import { useControllableState } from "@tamagui/use-controllable-state";
import React, { useEffect, useRef, useState } from "react";
import { useSheetContext } from "./SheetContext.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
const SHEET_SCROLL_VIEW_NAME = "SheetScrollView",
  SheetScrollView = React.forwardRef(({
    __scopeSheet,
    children,
    onScroll,
    scrollEnabled: scrollEnabledProp,
    ...props
  }, ref) => {
    const context = useSheetContext(SHEET_SCROLL_VIEW_NAME, __scopeSheet),
      {
        scrollBridge,
        setHasScrollView
      } = context,
      [scrollEnabled, setScrollEnabled_] = useControllableState({
        prop: scrollEnabledProp,
        defaultProp: !0
      }),
      scrollRef = React.useRef(null),
      setScrollEnabled = next => {
        scrollRef.current?.setNativeProps?.({
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
    useEffect(() => (setHasScrollView(!0), () => {
      setHasScrollView(!1);
    }), []);
    const release = () => {
        if (!state.current.isDraggingScrollArea) return;
        state.current.isDraggingScrollArea = !1, scrollBridge.scrollStartY = -1, scrollBridge.scrollLock = !1, state.current.isScrolling = !1, setScrollEnabled(!0);
        let vy = 0;
        if (state.current.dys.length) {
          const recentDys = state.current.dys.slice(-10);
          vy = (recentDys.length ? recentDys.reduce((a, b) => a + b, 0) : 0) / recentDys.length * 0.04;
        }
        state.current.dys = [], scrollBridge.release({
          dragAt: state.current.dragAt,
          vy
        });
      },
      scrollable = scrollEnabled;
    useEffect(() => {
      if (!isClient || !scrollRef.current) return;
      const controller = new AbortController(),
        node = scrollRef.current?.getScrollableNode();
      if (!node) return;
      node.addEventListener("touchmove", e => {
        scrollBridge.isParentDragging && node.scrollTo({
          top: scrollBridge.y,
          behavior: "instant"
        });
      }, {
        signal: controller.signal,
        passive: !1
      });
      const disposeBridgeListen = scrollBridge.onParentDragging(val => {});
      return () => {
        disposeBridgeListen(), controller.abort();
      };
    }, [scrollRef]);
    const [hasScrollableContent, setHasScrollableContent] = useState(!0),
      parentHeight = useRef(0),
      contentHeight = useRef(0),
      setIsScrollable = () => {
        parentHeight.current && contentHeight.current && setHasScrollableContent(contentHeight.current > parentHeight.current);
      };
    return useEffect(() => {
      scrollBridge.hasScrollableContent = hasScrollableContent;
    }, [hasScrollableContent]), /* @__PURE__ */jsxs(ScrollView, {
      onLayout: e => {
        parentHeight.current = Math.ceil(e.nativeEvent.layout.height), setIsScrollable();
      },
      ref: composeRefs(scrollRef, ref),
      flex: 1,
      scrollEventThrottle: 8,
      onResponderRelease: release,
      className: "_ovs-contain",
      scrollEnabled: scrollable,
      onScroll: e => {
        const {
          y
        } = e.nativeEvent.contentOffset;
        scrollBridge.y = y, isWeb && (scrollBridge.scrollLock = y > 0), y > 0 && (scrollBridge.scrollStartY = -1), onScroll?.(e);
      },
      onStartShouldSetResponder: () => (scrollBridge.scrollStartY = -1, state.current.isDraggingScrollArea = !0, scrollable),
      onMoveShouldSetResponder: e => scrollable,
      contentContainerStyle: {
        minHeight: "100%"
      },
      onResponderMove: e => {
        if (isWeb) {
          const {
            pageY
          } = e.nativeEvent;
          state.current.isScrolling || scrollBridge.scrollStartY === -1 && (scrollBridge.scrollStartY = pageY, state.current.lastPageY = pageY);
          const dragAt = pageY - scrollBridge.scrollStartY,
            dy = pageY - state.current.lastPageY;
          state.current.lastPageY = pageY;
          const isDraggingUp = dy < 0,
            isPaneAtTop = scrollBridge.paneY <= scrollBridge.paneMinY;
          if (hasScrollableContent && (dy === 0 || isDraggingUp) && isPaneAtTop && !state.current.isScrolling) {
            state.current.isScrolling = !0, scrollBridge.scrollLock = !0, setScrollEnabled(!0);
            return;
          }
          if (!(!state.current.isScrolling && dy > 0 && scrollBridge.y === 0) && scrollBridge.y >= 0) return;
          setScrollEnabled(!1), scrollBridge.drag(dragAt), state.current.dragAt = dragAt, state.current.dys.push(dy), state.current.dys.length > 100 && (state.current.dys = state.current.dys.slice(-10));
        }
      },
      ...props,
      children: [/* @__PURE__ */jsx(View, {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: -1,
        onLayout: e => {
          contentHeight.current = Math.floor(e.nativeEvent.layout.height), setIsScrollable();
        }
      }), children]
    });
  });
export { SheetScrollView };
//# sourceMappingURL=SheetScrollView.mjs.map
