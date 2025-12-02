var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var SheetScrollView_exports = {};
__export(SheetScrollView_exports, {
  SheetScrollView: () => SheetScrollView
});
module.exports = __toCommonJS(SheetScrollView_exports);
var import_compose_refs = require("@tamagui/compose-refs"),
  import_core = require("@tamagui/core"),
  import_scroll_view = require("@tamagui/scroll-view"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  import_react = __toESM(require("react"), 1),
  import_SheetContext = require("./SheetContext.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const SHEET_SCROLL_VIEW_NAME = "SheetScrollView",
  SheetScrollView = import_react.default.forwardRef(({
    __scopeSheet,
    children,
    onScroll,
    scrollEnabled: scrollEnabledProp,
    ...props
  }, ref) => {
    const context = (0, import_SheetContext.useSheetContext)(SHEET_SCROLL_VIEW_NAME, __scopeSheet),
      {
        scrollBridge,
        setHasScrollView
      } = context,
      [scrollEnabled, setScrollEnabled_] = (0, import_use_controllable_state.useControllableState)({
        prop: scrollEnabledProp,
        defaultProp: !0
      }),
      scrollRef = import_react.default.useRef(null),
      setScrollEnabled = next => {
        scrollRef.current?.setNativeProps?.({
          scrollEnabled: next
        }), setScrollEnabled_(next);
      },
      state = import_react.default.useRef({
        lastPageY: 0,
        dragAt: 0,
        dys: [],
        // store a few recent dys to get velocity on release
        isScrolling: !1,
        isDraggingScrollArea: !1
      });
    (0, import_react.useEffect)(() => (setHasScrollView(!0), () => {
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
    (0, import_react.useEffect)(() => {
      if (!import_core.isClient || !scrollRef.current) return;
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
    const [hasScrollableContent, setHasScrollableContent] = (0, import_react.useState)(!0),
      parentHeight = (0, import_react.useRef)(0),
      contentHeight = (0, import_react.useRef)(0),
      setIsScrollable = () => {
        parentHeight.current && contentHeight.current && setHasScrollableContent(contentHeight.current > parentHeight.current);
      };
    return (0, import_react.useEffect)(() => {
      scrollBridge.hasScrollableContent = hasScrollableContent;
    }, [hasScrollableContent]), /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_scroll_view.ScrollView, {
      onLayout: e => {
        parentHeight.current = Math.ceil(e.nativeEvent.layout.height), setIsScrollable();
      },
      ref: (0, import_compose_refs.composeRefs)(scrollRef, ref),
      flex: 1,
      scrollEventThrottle: 8,
      onResponderRelease: release,
      className: "_ovs-contain",
      scrollEnabled: scrollable,
      onScroll: e => {
        const {
          y
        } = e.nativeEvent.contentOffset;
        scrollBridge.y = y, import_core.isWeb && (scrollBridge.scrollLock = y > 0), y > 0 && (scrollBridge.scrollStartY = -1), onScroll?.(e);
      },
      onStartShouldSetResponder: () => (scrollBridge.scrollStartY = -1, state.current.isDraggingScrollArea = !0, scrollable),
      onMoveShouldSetResponder: e => scrollable,
      contentContainerStyle: {
        minHeight: "100%"
      },
      onResponderMove: e => {
        if (import_core.isWeb) {
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
      children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.View, {
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