"use strict";

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
var import_jsx_runtime = require("react/jsx-runtime"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_core = require("@tamagui/core"),
  import_scroll_view = require("@tamagui/scroll-view"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  import_react = __toESM(require("react"), 1),
  import_SheetContext = require("./SheetContext.native.js"),
  SHEET_SCROLL_VIEW_NAME = "SheetScrollView",
  SheetScrollView = /* @__PURE__ */import_react.default.forwardRef(
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
      context = (0, import_SheetContext.useSheetContext)(SHEET_SCROLL_VIEW_NAME, __scopeSheet),
      {
        scrollBridge,
        setHasScrollView
      } = context,
      [scrollEnabled, setScrollEnabled_] = (0, import_use_controllable_state.useControllableState)({
        prop: scrollEnabledProp,
        defaultProp: !0
      }),
      scrollRef = import_react.default.useRef(null),
      setScrollEnabled = function (next) {
        var _scrollRef_current_setNativeProps, _scrollRef_current;
        (_scrollRef_current = scrollRef.current) === null || _scrollRef_current === void 0 || (_scrollRef_current_setNativeProps = _scrollRef_current.setNativeProps) === null || _scrollRef_current_setNativeProps === void 0 || _scrollRef_current_setNativeProps.call(_scrollRef_current, {
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
    (0, import_react.useEffect)(function () {
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
    (0, import_react.useEffect)(function () {
      var _scrollRef_current;
      if (import_core.isClient && scrollRef.current) {
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
    var [hasScrollableContent, setHasScrollableContent] = (0, import_react.useState)(!0),
      parentHeight = (0, import_react.useRef)(0),
      contentHeight = (0, import_react.useRef)(0),
      setIsScrollable = function () {
        parentHeight.current && contentHeight.current && setHasScrollableContent(contentHeight.current > parentHeight.current);
      };
    return (0, import_react.useEffect)(function () {
      scrollBridge.hasScrollableContent = hasScrollableContent;
    }, [hasScrollableContent]), /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_scroll_view.ScrollView, {
      onLayout: function (e) {
        parentHeight.current = Math.ceil(e.nativeEvent.layout.height), setIsScrollable();
      },
      ref: (0, import_compose_refs.composeRefs)(scrollRef, ref),
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
        scrollBridge.y = y, import_core.isWeb && (scrollBridge.scrollLock = y > 0), y > 0 && (scrollBridge.scrollStartY = -1), onScroll?.(e);
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
        if (import_core.isWeb) {
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
      /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.View, {
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
//# sourceMappingURL=SheetScrollView.native.js.map
