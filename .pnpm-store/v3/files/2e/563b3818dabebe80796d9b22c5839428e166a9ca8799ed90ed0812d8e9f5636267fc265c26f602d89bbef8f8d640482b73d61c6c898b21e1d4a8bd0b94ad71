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
var SheetImplementationCustom_exports = {};
__export(SheetImplementationCustom_exports, {
  SheetImplementationCustom: () => SheetImplementationCustom
});
module.exports = __toCommonJS(SheetImplementationCustom_exports);
var import_adapt = require("@tamagui/adapt"), import_animate_presence = require("@tamagui/animate-presence"), import_compose_refs = require("@tamagui/compose-refs"), import_constants = require("@tamagui/constants"), import_core = require("@tamagui/core"), import_portal = require("@tamagui/portal"), import_react = __toESM(require("react"), 1), import_react_native = require("react-native-web"), import_contexts = require("./contexts"), import_helpers = require("./helpers"), import_SheetContext = require("./SheetContext"), import_useSheetOpenState = require("./useSheetOpenState"), import_useSheetProviderProps = require("./useSheetProviderProps"), import_jsx_runtime = require("react/jsx-runtime");
const hiddenSize = 10000.1;
let sheetHiddenStyleSheet = null;
const relativeDimensionTo = import_constants.isWeb ? "window" : "screen", SheetImplementationCustom = import_react.default.forwardRef(
  function(props, forwardedRef) {
    const parentSheet = import_react.default.useContext(import_contexts.ParentSheetContext), {
      animation,
      animationConfig: animationConfigProp,
      modal = !1,
      zIndex = parentSheet.zIndex + 1,
      moveOnKeyboardChange = !1,
      unmountChildrenWhenHidden = !1,
      portalProps,
      containerComponent: ContainerComponent = import_react.default.Fragment
    } = props, state = (0, import_useSheetOpenState.useSheetOpenState)(props), [overlayComponent, setOverlayComponent] = import_react.default.useState(null), providerProps = (0, import_useSheetProviderProps.useSheetProviderProps)(props, state, {
      onOverlayComponent: setOverlayComponent
    }), {
      frameSize,
      setFrameSize,
      snapPoints,
      snapPointsMode,
      hasFit,
      position,
      setPosition,
      scrollBridge,
      screenSize,
      setMaxContentSize,
      maxSnapPoint
    } = providerProps, { open, controller, isHidden } = state, sheetRef = import_react.default.useRef(void 0), ref = (0, import_compose_refs.useComposedRefs)(forwardedRef, sheetRef, providerProps.contentRef), { animationDriver } = (0, import_core.useConfiguration)();
    if (!animationDriver)
      throw new Error("Sheet reqiures an animation driver to be set");
    const animationConfig = (() => {
      if (animationDriver.supportsCSS)
        return {};
      const [animationProp, animationPropConfig] = animation ? Array.isArray(animation) ? animation : [animation] : [];
      return animationConfigProp ?? (animationProp ? {
        ...animationDriver.animations[animationProp],
        ...animationPropConfig
      } : null);
    })(), [isShowingInnerSheet, setIsShowingInnerSheet] = import_react.default.useState(!1), shouldHideParentSheet = !import_constants.isWeb && modal && isShowingInnerSheet && // if not using weird portal limitation we dont need to hide parent sheet
    import_portal.USE_NATIVE_PORTAL, sheetInsideSheet = import_react.default.useContext(import_contexts.SheetInsideSheetContext), onInnerSheet = import_react.default.useCallback((hasChild) => {
      setIsShowingInnerSheet(hasChild);
    }, []), stableFrameSize = import_react.default.useRef(frameSize);
    import_react.default.useEffect(() => {
      open && frameSize && (stableFrameSize.current = frameSize);
    }, [open, frameSize]);
    const positions = import_react.default.useMemo(
      () => snapPoints.map(
        (point) => (
          // FIX: Use stable frameSize when closing to prevent position jumps
          getYPositions(
            snapPointsMode,
            point,
            screenSize,
            open ? frameSize : stableFrameSize.current
          )
        )
      ),
      [screenSize, frameSize, snapPoints, snapPointsMode, open]
    ), { useAnimatedNumber, useAnimatedNumberStyle, useAnimatedNumberReaction } = animationDriver, AnimatedView = animationDriver.View ?? import_core.Stack;
    (0, import_constants.useIsomorphicLayoutEffect)(() => {
      if (sheetInsideSheet && open)
        return sheetInsideSheet(!0), () => {
          sheetInsideSheet(!1);
        };
    }, [sheetInsideSheet, open]);
    const nextParentContext = import_react.default.useMemo(
      () => ({
        zIndex
      }),
      [zIndex]
    ), startPosition = (0, import_core.useDidFinishSSR)() && screenSize ? screenSize : hiddenSize, animatedNumber = useAnimatedNumber(startPosition), at = import_react.default.useRef(startPosition), hasntMeasured = at.current === hiddenSize, [disableAnimation, setDisableAnimation] = (0, import_react.useState)(hasntMeasured), hasScrollView = import_react.default.useRef(!1);
    useAnimatedNumberReaction(
      {
        value: animatedNumber,
        hostRef: sheetRef
      },
      import_react.default.useCallback(
        (value) => {
          at.current = value, scrollBridge.paneY = value;
        },
        [animationDriver]
      )
    );
    function stopSpring() {
      animatedNumber.stop(), scrollBridge.onFinishAnimate && (scrollBridge.onFinishAnimate(), scrollBridge.onFinishAnimate = void 0);
    }
    const animateTo = (0, import_core.useEvent)((position2) => {
      if (frameSize === 0) return;
      let toValue = isHidden || position2 === -1 ? screenSize : positions[position2];
      at.current !== toValue && (at.current = toValue, stopSpring(), animatedNumber.setValue(toValue, {
        type: "spring",
        ...animationConfig
      }));
    });
    (0, import_constants.useIsomorphicLayoutEffect)(() => {
      if (hasntMeasured && screenSize && frameSize) {
        at.current = screenSize, animatedNumber.setValue(
          screenSize,
          {
            type: "timing",
            duration: 0
          },
          () => {
            setTimeout(() => {
              setDisableAnimation(!1);
            }, 10);
          }
        );
        return;
      }
      disableAnimation || !frameSize || !screenSize || isHidden || hasntMeasured && !open || (animateTo(position), position === -1 && (scrollBridge.scrollLock = !1, scrollBridge.scrollStartY = -1));
    }, [hasntMeasured, disableAnimation, isHidden, frameSize, screenSize, open, position]);
    const disableDrag = props.disableDrag ?? controller?.disableDrag, themeName = (0, import_core.useThemeName)(), [isDragging, setIsDragging] = import_react.default.useState(!1), panResponder = import_react.default.useMemo(() => {
      if (disableDrag || !frameSize || isShowingInnerSheet) return;
      const minY = positions[0];
      scrollBridge.paneMinY = minY;
      let startY = at.current;
      function setPanning(val) {
        setIsDragging(val), import_constants.isClient && (sheetHiddenStyleSheet || (sheetHiddenStyleSheet = document.createElement("style"), typeof document.head < "u" && document.head.appendChild(sheetHiddenStyleSheet)), val ? sheetHiddenStyleSheet.innerText = ":root * { user-select: none !important; -webkit-user-select: none !important; }" : sheetHiddenStyleSheet.innerText = "");
      }
      const release = ({ vy, dragAt }) => {
        if (scrollBridge.setParentDragging(!1), scrollBridge.scrollLock)
          return;
        isExternalDrag = !1, previouslyScrolling = !1, setPanning(!1);
        const end = dragAt + startY + frameSize * vy * 0.2;
        let closestPoint = 0, dist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < positions.length; i++) {
          const position2 = positions[i], curDist = end > position2 ? end - position2 : position2 - end;
          curDist < dist && (dist = curDist, closestPoint = i);
        }
        setPosition(closestPoint), animateTo(closestPoint);
      }, finish = (_e, state2) => {
        release({
          vy: state2.vy,
          dragAt: state2.dy
        });
      };
      let previouslyScrolling = !1;
      const onMoveShouldSet = (e, { dy }) => {
        function getShouldSet() {
          if (e.target === providerProps.handleRef.current)
            return !0;
          if (scrollBridge.hasScrollableContent === !0) {
            if (scrollBridge.scrollLock)
              return !1;
            const isScrolled = scrollBridge.y !== 0, isDraggingUp = dy < 0, isNearTop = scrollBridge.paneY - 5 <= scrollBridge.paneMinY;
            if (isScrolled)
              return previouslyScrolling = !0, !1;
            if (isNearTop && hasScrollView.current && isDraggingUp)
              return !1;
          }
          return Math.abs(dy) > 10;
        }
        const granted = getShouldSet();
        return granted && scrollBridge.setParentDragging(!0), granted;
      }, grant = () => {
        setPanning(!0), stopSpring(), startY = at.current;
      };
      let isExternalDrag = !1;
      return scrollBridge.drag = (dy) => {
        isExternalDrag || (isExternalDrag = !0, grant());
        const to = dy + startY;
        animatedNumber.setValue((0, import_helpers.resisted)(to, minY), { type: "direct" });
      }, scrollBridge.release = release, import_react_native.PanResponder.create({
        onMoveShouldSetPanResponder: onMoveShouldSet,
        onPanResponderGrant: grant,
        onPanResponderMove: (_e, { dy }) => {
          const toFull = dy + startY, to = (0, import_helpers.resisted)(toFull, minY);
          to <= minY ? scrollBridge.setParentDragging(!1) : scrollBridge.setParentDragging(!0), animatedNumber.setValue(to, { type: "direct" });
        },
        onPanResponderEnd: finish,
        onPanResponderTerminate: finish,
        onPanResponderRelease: finish
      });
    }, [disableDrag, isShowingInnerSheet, animateTo, frameSize, positions, setPosition]), handleAnimationViewLayout = import_react.default.useCallback(
      (e) => {
        if (!open && stableFrameSize.current !== 0)
          return;
        const next = Math.min(
          e.nativeEvent?.layout.height,
          import_react_native.Dimensions.get(relativeDimensionTo).height
        );
        next && setFrameSize(next);
      },
      [open]
    ), handleMaxContentViewLayout = import_react.default.useCallback((e) => {
      const next = Math.min(
        e.nativeEvent?.layout.height,
        import_react_native.Dimensions.get(relativeDimensionTo).height
      );
      next && setMaxContentSize(next);
    }, []), animatedStyle = useAnimatedNumberStyle(animatedNumber, (val) => {
      "worklet";
      return {
        transform: [{ translateY: frameSize === 0 ? hiddenSize : val }]
      };
    }), sizeBeforeKeyboard = import_react.default.useRef(null);
    import_react.default.useEffect(() => {
      if (import_constants.isWeb || !moveOnKeyboardChange) return;
      const keyboardShowListener = import_react_native.Keyboard.addListener(
        import_constants.currentPlatform === "ios" ? "keyboardWillShow" : "keyboardDidShow",
        (e) => {
          sizeBeforeKeyboard.current === null && (sizeBeforeKeyboard.current = isHidden || position === -1 ? screenSize : positions[position], animatedNumber.setValue(
            Math.max(sizeBeforeKeyboard.current - e.endCoordinates.height, 0),
            {
              type: "timing",
              duration: 250
            }
          ));
        }
      ), keyboardDidHideListener = import_react_native.Keyboard.addListener("keyboardDidHide", () => {
        sizeBeforeKeyboard.current !== null && (animatedNumber.setValue(sizeBeforeKeyboard.current, {
          type: "timing",
          duration: 250
        }), sizeBeforeKeyboard.current = null);
      });
      return () => {
        keyboardDidHideListener.remove(), keyboardShowListener.remove();
      };
    }, [moveOnKeyboardChange, positions, position, isHidden]);
    const [opacity, setOpacity] = import_react.default.useState(open ? 1 : 0);
    open && opacity === 0 && setOpacity(1), import_react.default.useEffect(() => {
      if (!open) {
        const tm = setTimeout(() => {
          setOpacity(0);
        }, 400);
        return () => {
          clearTimeout(tm);
        };
      }
    }, [open]);
    const forcedContentHeight = hasFit ? void 0 : snapPointsMode === "percent" ? `${maxSnapPoint}${import_constants.isWeb ? "dvh" : "%"}` : maxSnapPoint, setHasScrollView = import_react.default.useCallback((val) => {
      hasScrollView.current = val;
    }, []);
    let contents = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.LayoutMeasurementController, { disable: !open, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_contexts.ParentSheetContext.Provider, { value: nextParentContext, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_SheetContext.SheetProvider, { ...providerProps, setHasScrollView, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_animate_presence.AnimatePresence, { custom: { open }, children: shouldHideParentSheet || !open ? null : overlayComponent }),
      snapPointsMode !== "percent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_native.View,
        {
          style: {
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none"
          },
          onLayout: handleMaxContentViewLayout
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        AnimatedView,
        {
          ref,
          ...panResponder?.panHandlers,
          onLayout: handleAnimationViewLayout,
          animation: isDragging || disableAnimation ? null : animation,
          disableClassName: !0,
          style: [
            {
              position: "absolute",
              zIndex,
              width: "100%",
              height: forcedContentHeight,
              minHeight: forcedContentHeight,
              opacity: shouldHideParentSheet ? 0 : opacity,
              ...(shouldHideParentSheet || !open) && {
                pointerEvents: "none"
              }
            },
            animatedStyle
          ],
          children: props.children
        }
      )
    ] }) }) });
    const shouldMountChildren = unmountChildrenWhenHidden ? !!opacity : !0;
    if (modal) {
      const modalContents = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_portal.Portal, { stackZIndex: zIndex, ...portalProps, children: shouldMountChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContainerComponent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.Theme, { contain: !0, forceClassName: !0, name: themeName, children: contents }) }) });
      return import_constants.isWeb ? modalContents : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_contexts.SheetInsideSheetContext.Provider, { value: onInnerSheet, children: modalContents });
    }
    return contents;
  }
);
function getYPositions(mode, point, screenSize, frameSize) {
  if (!screenSize || !frameSize) return 0;
  if (mode === "mixed") {
    if (typeof point == "number")
      return screenSize - Math.min(screenSize, Math.max(0, point));
    if (point === "fit")
      return screenSize - Math.min(screenSize, frameSize);
    if (point.endsWith("%")) {
      const pct2 = Math.min(100, Math.max(0, Number(point.slice(0, -1)))) / 100;
      return Number.isNaN(pct2) ? (console.warn("Invalid snapPoint percentage string"), 0) : Math.round(screenSize - pct2 * screenSize);
    }
    return console.warn("Invalid snapPoint unknown value"), 0;
  }
  if (mode === "fit")
    return point === 0 ? screenSize : screenSize - Math.min(screenSize, frameSize);
  if (mode === "constant" && typeof point == "number")
    return screenSize - Math.min(screenSize, Math.max(0, point));
  const pct = Math.min(100, Math.max(0, Number(point))) / 100;
  return Number.isNaN(pct) ? (console.warn("Invalid snapPoint percentage"), 0) : Math.round(screenSize - pct * screenSize);
}
//# sourceMappingURL=SheetImplementationCustom.js.map
