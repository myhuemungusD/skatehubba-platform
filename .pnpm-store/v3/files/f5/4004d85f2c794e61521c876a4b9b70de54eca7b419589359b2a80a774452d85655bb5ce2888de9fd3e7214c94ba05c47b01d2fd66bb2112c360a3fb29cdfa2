
import { AnimatePresence } from "@tamagui/animate-presence";
import { useComposedRefs } from "@tamagui/compose-refs";
import {
  currentPlatform,
  isClient,
  isWeb,
  useIsomorphicLayoutEffect
} from "@tamagui/constants";
import {
  LayoutMeasurementController,
  Stack,
  Theme,
  useConfiguration,
  useDidFinishSSR,
  useEvent,
  useThemeName
} from "@tamagui/core";
import { Portal, USE_NATIVE_PORTAL } from "@tamagui/portal";
import React, { useState } from "react";
import { Dimensions, Keyboard, PanResponder, View } from "react-native-web";
import { ParentSheetContext, SheetInsideSheetContext } from "./contexts";
import { resisted } from "./helpers";
import { SheetProvider } from "./SheetContext";
import { useSheetOpenState } from "./useSheetOpenState";
import { useSheetProviderProps } from "./useSheetProviderProps";
import { jsx, jsxs } from "react/jsx-runtime";
const hiddenSize = 10000.1;
let sheetHiddenStyleSheet = null;
const relativeDimensionTo = isWeb ? "window" : "screen", SheetImplementationCustom = React.forwardRef(
  function(props, forwardedRef) {
    const parentSheet = React.useContext(ParentSheetContext), {
      animation,
      animationConfig: animationConfigProp,
      modal = !1,
      zIndex = parentSheet.zIndex + 1,
      moveOnKeyboardChange = !1,
      unmountChildrenWhenHidden = !1,
      portalProps,
      containerComponent: ContainerComponent = React.Fragment
    } = props, state = useSheetOpenState(props), [overlayComponent, setOverlayComponent] = React.useState(null), providerProps = useSheetProviderProps(props, state, {
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
    } = providerProps, { open, controller, isHidden } = state, sheetRef = React.useRef(void 0), ref = useComposedRefs(forwardedRef, sheetRef, providerProps.contentRef), { animationDriver } = useConfiguration();
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
    })(), [isShowingInnerSheet, setIsShowingInnerSheet] = React.useState(!1), shouldHideParentSheet = !isWeb && modal && isShowingInnerSheet && // if not using weird portal limitation we dont need to hide parent sheet
    USE_NATIVE_PORTAL, sheetInsideSheet = React.useContext(SheetInsideSheetContext), onInnerSheet = React.useCallback((hasChild) => {
      setIsShowingInnerSheet(hasChild);
    }, []), stableFrameSize = React.useRef(frameSize);
    React.useEffect(() => {
      open && frameSize && (stableFrameSize.current = frameSize);
    }, [open, frameSize]);
    const positions = React.useMemo(
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
    ), { useAnimatedNumber, useAnimatedNumberStyle, useAnimatedNumberReaction } = animationDriver, AnimatedView = animationDriver.View ?? Stack;
    useIsomorphicLayoutEffect(() => {
      if (sheetInsideSheet && open)
        return sheetInsideSheet(!0), () => {
          sheetInsideSheet(!1);
        };
    }, [sheetInsideSheet, open]);
    const nextParentContext = React.useMemo(
      () => ({
        zIndex
      }),
      [zIndex]
    ), startPosition = useDidFinishSSR() && screenSize ? screenSize : hiddenSize, animatedNumber = useAnimatedNumber(startPosition), at = React.useRef(startPosition), hasntMeasured = at.current === hiddenSize, [disableAnimation, setDisableAnimation] = useState(hasntMeasured), hasScrollView = React.useRef(!1);
    useAnimatedNumberReaction(
      {
        value: animatedNumber,
        hostRef: sheetRef
      },
      React.useCallback(
        (value) => {
          at.current = value, scrollBridge.paneY = value;
        },
        [animationDriver]
      )
    );
    function stopSpring() {
      animatedNumber.stop(), scrollBridge.onFinishAnimate && (scrollBridge.onFinishAnimate(), scrollBridge.onFinishAnimate = void 0);
    }
    const animateTo = useEvent((position2) => {
      if (frameSize === 0) return;
      let toValue = isHidden || position2 === -1 ? screenSize : positions[position2];
      at.current !== toValue && (at.current = toValue, stopSpring(), animatedNumber.setValue(toValue, {
        type: "spring",
        ...animationConfig
      }));
    });
    useIsomorphicLayoutEffect(() => {
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
    const disableDrag = props.disableDrag ?? controller?.disableDrag, themeName = useThemeName(), [isDragging, setIsDragging] = React.useState(!1), panResponder = React.useMemo(() => {
      if (disableDrag || !frameSize || isShowingInnerSheet) return;
      const minY = positions[0];
      scrollBridge.paneMinY = minY;
      let startY = at.current;
      function setPanning(val) {
        setIsDragging(val), isClient && (sheetHiddenStyleSheet || (sheetHiddenStyleSheet = document.createElement("style"), typeof document.head < "u" && document.head.appendChild(sheetHiddenStyleSheet)), val ? sheetHiddenStyleSheet.innerText = ":root * { user-select: none !important; -webkit-user-select: none !important; }" : sheetHiddenStyleSheet.innerText = "");
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
        animatedNumber.setValue(resisted(to, minY), { type: "direct" });
      }, scrollBridge.release = release, PanResponder.create({
        onMoveShouldSetPanResponder: onMoveShouldSet,
        onPanResponderGrant: grant,
        onPanResponderMove: (_e, { dy }) => {
          const toFull = dy + startY, to = resisted(toFull, minY);
          to <= minY ? scrollBridge.setParentDragging(!1) : scrollBridge.setParentDragging(!0), animatedNumber.setValue(to, { type: "direct" });
        },
        onPanResponderEnd: finish,
        onPanResponderTerminate: finish,
        onPanResponderRelease: finish
      });
    }, [disableDrag, isShowingInnerSheet, animateTo, frameSize, positions, setPosition]), handleAnimationViewLayout = React.useCallback(
      (e) => {
        if (!open && stableFrameSize.current !== 0)
          return;
        const next = Math.min(
          e.nativeEvent?.layout.height,
          Dimensions.get(relativeDimensionTo).height
        );
        next && setFrameSize(next);
      },
      [open]
    ), handleMaxContentViewLayout = React.useCallback((e) => {
      const next = Math.min(
        e.nativeEvent?.layout.height,
        Dimensions.get(relativeDimensionTo).height
      );
      next && setMaxContentSize(next);
    }, []), animatedStyle = useAnimatedNumberStyle(animatedNumber, (val) => {
      "worklet";
      return {
        transform: [{ translateY: frameSize === 0 ? hiddenSize : val }]
      };
    }), sizeBeforeKeyboard = React.useRef(null);
    React.useEffect(() => {
      if (isWeb || !moveOnKeyboardChange) return;
      const keyboardShowListener = Keyboard.addListener(
        currentPlatform === "ios" ? "keyboardWillShow" : "keyboardDidShow",
        (e) => {
          sizeBeforeKeyboard.current === null && (sizeBeforeKeyboard.current = isHidden || position === -1 ? screenSize : positions[position], animatedNumber.setValue(
            Math.max(sizeBeforeKeyboard.current - e.endCoordinates.height, 0),
            {
              type: "timing",
              duration: 250
            }
          ));
        }
      ), keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
        sizeBeforeKeyboard.current !== null && (animatedNumber.setValue(sizeBeforeKeyboard.current, {
          type: "timing",
          duration: 250
        }), sizeBeforeKeyboard.current = null);
      });
      return () => {
        keyboardDidHideListener.remove(), keyboardShowListener.remove();
      };
    }, [moveOnKeyboardChange, positions, position, isHidden]);
    const [opacity, setOpacity] = React.useState(open ? 1 : 0);
    open && opacity === 0 && setOpacity(1), React.useEffect(() => {
      if (!open) {
        const tm = setTimeout(() => {
          setOpacity(0);
        }, 400);
        return () => {
          clearTimeout(tm);
        };
      }
    }, [open]);
    const forcedContentHeight = hasFit ? void 0 : snapPointsMode === "percent" ? `${maxSnapPoint}${isWeb ? "dvh" : "%"}` : maxSnapPoint, setHasScrollView = React.useCallback((val) => {
      hasScrollView.current = val;
    }, []);
    let contents = /* @__PURE__ */ jsx(LayoutMeasurementController, { disable: !open, children: /* @__PURE__ */ jsx(ParentSheetContext.Provider, { value: nextParentContext, children: /* @__PURE__ */ jsxs(SheetProvider, { ...providerProps, setHasScrollView, children: [
      /* @__PURE__ */ jsx(AnimatePresence, { custom: { open }, children: shouldHideParentSheet || !open ? null : overlayComponent }),
      snapPointsMode !== "percent" && /* @__PURE__ */ jsx(
        View,
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
      /* @__PURE__ */ jsx(
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
      const modalContents = /* @__PURE__ */ jsx(Portal, { stackZIndex: zIndex, ...portalProps, children: shouldMountChildren && /* @__PURE__ */ jsx(ContainerComponent, { children: /* @__PURE__ */ jsx(Theme, { contain: !0, forceClassName: !0, name: themeName, children: contents }) }) });
      return isWeb ? modalContents : /* @__PURE__ */ jsx(SheetInsideSheetContext.Provider, { value: onInnerSheet, children: modalContents });
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
export {
  SheetImplementationCustom
};
//# sourceMappingURL=SheetImplementationCustom.js.map
