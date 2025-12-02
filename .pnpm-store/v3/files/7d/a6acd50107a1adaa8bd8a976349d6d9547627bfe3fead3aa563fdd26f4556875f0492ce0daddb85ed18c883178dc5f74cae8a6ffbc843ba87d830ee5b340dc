import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProvideAdaptContext, useAdaptContext } from "@tamagui/adapt";
import { AnimatePresence } from "@tamagui/animate-presence";
import { useComposedRefs } from "@tamagui/compose-refs";
import { currentPlatform, isClient, isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { LayoutMeasurementController, Stack, Theme, useConfiguration, useDidFinishSSR, useEvent, useThemeName } from "@tamagui/core";
import { Portal, USE_NATIVE_PORTAL } from "@tamagui/portal";
import React, { useState } from "react";
import { Dimensions, Keyboard, PanResponder, View } from "react-native";
import { ParentSheetContext, SheetInsideSheetContext } from "./contexts.native.js";
import { resisted } from "./helpers.native.js";
import { SheetProvider } from "./SheetContext.native.js";
import { useSheetOpenState } from "./useSheetOpenState.native.js";
import { useSheetProviderProps } from "./useSheetProviderProps.native.js";
var hiddenSize = 10000.1,
  sheetHiddenStyleSheet = null,
  relativeDimensionTo = isWeb ? "window" : "screen",
  SheetImplementationCustom = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var parentSheet = React.useContext(ParentSheetContext),
      {
        animation,
        animationConfig: animationConfigProp,
        modal = !1,
        zIndex = parentSheet.zIndex + 1,
        moveOnKeyboardChange = !1,
        unmountChildrenWhenHidden = !1,
        portalProps,
        containerComponent: ContainerComponent = React.Fragment
      } = props,
      state = useSheetOpenState(props),
      [overlayComponent, setOverlayComponent] = React.useState(null),
      providerProps = useSheetProviderProps(props, state, {
        onOverlayComponent: setOverlayComponent
      }),
      {
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
      } = providerProps,
      {
        open,
        controller,
        isHidden
      } = state,
      sheetRef = React.useRef(void 0),
      ref = useComposedRefs(forwardedRef, sheetRef, providerProps.contentRef),
      {
        animationDriver
      } = useConfiguration();
    if (!animationDriver) throw new Error("Sheet reqiures an animation driver to be set");
    var animationConfig = function () {
        if (animationDriver.supportsCSS) return {};
        var [animationProp, animationPropConfig] = animation ? Array.isArray(animation) ? animation : [animation] : [];
        return animationConfigProp ?? (animationProp ? {
          ...animationDriver.animations[animationProp],
          ...animationPropConfig
        } : null);
      }(),
      [isShowingInnerSheet, setIsShowingInnerSheet] = React.useState(!1),
      shouldHideParentSheet = !isWeb && modal && isShowingInnerSheet &&
      // if not using weird portal limitation we dont need to hide parent sheet
      USE_NATIVE_PORTAL,
      sheetInsideSheet = React.useContext(SheetInsideSheetContext),
      onInnerSheet = React.useCallback(function (hasChild) {
        setIsShowingInnerSheet(hasChild);
      }, []),
      stableFrameSize = React.useRef(frameSize);
    React.useEffect(function () {
      open && frameSize && (stableFrameSize.current = frameSize);
    }, [open, frameSize]);
    var positions = React.useMemo(function () {
        return snapPoints.map(function (point) {
          return (
            // FIX: Use stable frameSize when closing to prevent position jumps
            getYPositions(snapPointsMode, point, screenSize, open ? frameSize : stableFrameSize.current)
          );
        });
      }, [screenSize, frameSize, snapPoints, snapPointsMode, open]),
      {
        useAnimatedNumber,
        useAnimatedNumberStyle,
        useAnimatedNumberReaction
      } = animationDriver,
      _animationDriver_View,
      AnimatedView = (_animationDriver_View = animationDriver.View) !== null && _animationDriver_View !== void 0 ? _animationDriver_View : Stack;
    useIsomorphicLayoutEffect(function () {
      if (sheetInsideSheet && open) return sheetInsideSheet(!0), function () {
        sheetInsideSheet(!1);
      };
    }, [sheetInsideSheet, open]);
    var nextParentContext = React.useMemo(function () {
        return {
          zIndex
        };
      }, [zIndex]),
      isMounted = useDidFinishSSR(),
      startPosition = isMounted && screenSize ? screenSize : hiddenSize,
      animatedNumber = useAnimatedNumber(startPosition),
      at = React.useRef(startPosition),
      hasntMeasured = at.current === hiddenSize,
      [disableAnimation, setDisableAnimation] = useState(hasntMeasured),
      hasScrollView = React.useRef(!1);
    useAnimatedNumberReaction({
      value: animatedNumber,
      hostRef: sheetRef
    }, React.useCallback(function (value) {
      at.current = value, scrollBridge.paneY = value;
    }, [animationDriver]));
    function stopSpring() {
      animatedNumber.stop(), scrollBridge.onFinishAnimate && (scrollBridge.onFinishAnimate(), scrollBridge.onFinishAnimate = void 0);
    }
    var animateTo = useEvent(function (position2) {
      if (frameSize !== 0) {
        var toValue = isHidden || position2 === -1 ? screenSize : positions[position2];
        at.current !== toValue && (at.current = toValue, stopSpring(), animatedNumber.setValue(toValue, {
          type: "spring",
          ...animationConfig
        }));
      }
    });
    useIsomorphicLayoutEffect(function () {
      if (hasntMeasured && screenSize && frameSize) {
        at.current = screenSize, animatedNumber.setValue(screenSize, {
          type: "timing",
          duration: 0
        }, function () {
          setTimeout(function () {
            setDisableAnimation(!1);
          }, 10);
        });
        return;
      }
      disableAnimation || !frameSize || !screenSize || isHidden || hasntMeasured && !open || (animateTo(position), position === -1 && (scrollBridge.scrollLock = !1, scrollBridge.scrollStartY = -1));
    }, [hasntMeasured, disableAnimation, isHidden, frameSize, screenSize, open, position]);
    var _props_disableDrag,
      disableDrag = (_props_disableDrag = props.disableDrag) !== null && _props_disableDrag !== void 0 ? _props_disableDrag : controller?.disableDrag,
      themeName = useThemeName(),
      [isDragging, setIsDragging] = React.useState(!1),
      panResponder = React.useMemo(function () {
        if (disableDrag || !frameSize || isShowingInnerSheet) return;
        var minY = positions[0];
        scrollBridge.paneMinY = minY;
        var startY = at.current;
        function setPanning(val) {
          setIsDragging(val), isClient && (sheetHiddenStyleSheet || (sheetHiddenStyleSheet = document.createElement("style"), typeof document.head < "u" && document.head.appendChild(sheetHiddenStyleSheet)), val ? sheetHiddenStyleSheet.innerText = ":root * { user-select: none !important; -webkit-user-select: none !important; }" : sheetHiddenStyleSheet.innerText = "");
        }
        var release = function (param) {
            var {
              vy,
              dragAt
            } = param;
            if (scrollBridge.setParentDragging(!1), !scrollBridge.scrollLock) {
              isExternalDrag = !1, previouslyScrolling = !1, setPanning(!1);
              for (var at2 = dragAt + startY, end = at2 + frameSize * vy * 0.2, closestPoint = 0, dist = Number.POSITIVE_INFINITY, i = 0; i < positions.length; i++) {
                var position2 = positions[i],
                  curDist = end > position2 ? end - position2 : position2 - end;
                curDist < dist && (dist = curDist, closestPoint = i);
              }
              setPosition(closestPoint), animateTo(closestPoint);
            }
          },
          finish = function (_e, state2) {
            release({
              vy: state2.vy,
              dragAt: state2.dy
            });
          },
          previouslyScrolling = !1,
          onMoveShouldSet = function (e, param) {
            var {
              dy
            } = param;
            function getShouldSet() {
              if (e.target === providerProps.handleRef.current) return !0;
              if (scrollBridge.hasScrollableContent === !0) {
                if (scrollBridge.scrollLock) return !1;
                var isScrolled = scrollBridge.y !== 0,
                  isDraggingUp = dy < 0,
                  isNearTop = scrollBridge.paneY - 5 <= scrollBridge.paneMinY;
                if (isScrolled) return previouslyScrolling = !0, !1;
                if (isNearTop && hasScrollView.current && isDraggingUp) return !1;
              }
              return Math.abs(dy) > 10;
            }
            var granted = getShouldSet();
            return granted && scrollBridge.setParentDragging(!0), granted;
          },
          grant = function () {
            setPanning(!0), stopSpring(), startY = at.current;
          },
          isExternalDrag = !1;
        return scrollBridge.drag = function (dy) {
          isExternalDrag || (isExternalDrag = !0, grant());
          var to = dy + startY;
          animatedNumber.setValue(resisted(to, minY), {
            type: "direct"
          });
        }, scrollBridge.release = release, PanResponder.create({
          onMoveShouldSetPanResponder: onMoveShouldSet,
          onPanResponderGrant: grant,
          onPanResponderMove: function (_e, param) {
            var {
                dy
              } = param,
              toFull = dy + startY,
              to = resisted(toFull, minY),
              isAtTop = to <= minY;
            isAtTop ? scrollBridge.setParentDragging(!1) : scrollBridge.setParentDragging(!0), animatedNumber.setValue(to, {
              type: "direct"
            });
          },
          onPanResponderEnd: finish,
          onPanResponderTerminate: finish,
          onPanResponderRelease: finish
        });
      }, [disableDrag, isShowingInnerSheet, animateTo, frameSize, positions, setPosition]),
      handleAnimationViewLayout = React.useCallback(function (e) {
        var _e_nativeEvent;
        if (!(!open && stableFrameSize.current !== 0)) {
          var next = Math.min((_e_nativeEvent = e.nativeEvent) === null || _e_nativeEvent === void 0 ? void 0 : _e_nativeEvent.layout.height, Dimensions.get(relativeDimensionTo).height);
          next && setFrameSize(next);
        }
      }, [open]),
      handleMaxContentViewLayout = React.useCallback(function (e) {
        var _e_nativeEvent,
          next = Math.min((_e_nativeEvent = e.nativeEvent) === null || _e_nativeEvent === void 0 ? void 0 : _e_nativeEvent.layout.height, Dimensions.get(relativeDimensionTo).height);
        next && setMaxContentSize(next);
      }, []),
      animatedStyle = useAnimatedNumberStyle(animatedNumber, function (val) {
        "worklet";

        var translateY = frameSize === 0 ? hiddenSize : val;
        return {
          transform: [{
            translateY
          }]
        };
      }),
      sizeBeforeKeyboard = React.useRef(null);
    React.useEffect(function () {
      if (!(isWeb || !moveOnKeyboardChange)) {
        var keyboardShowListener = Keyboard.addListener(currentPlatform === "ios" ? "keyboardWillShow" : "keyboardDidShow", function (e) {
            sizeBeforeKeyboard.current === null && (sizeBeforeKeyboard.current = isHidden || position === -1 ? screenSize : positions[position], animatedNumber.setValue(Math.max(sizeBeforeKeyboard.current - e.endCoordinates.height, 0), {
              type: "timing",
              duration: 250
            }));
          }),
          keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", function () {
            sizeBeforeKeyboard.current !== null && (animatedNumber.setValue(sizeBeforeKeyboard.current, {
              type: "timing",
              duration: 250
            }), sizeBeforeKeyboard.current = null);
          });
        return function () {
          keyboardDidHideListener.remove(), keyboardShowListener.remove();
        };
      }
    }, [moveOnKeyboardChange, positions, position, isHidden]);
    var [opacity, setOpacity] = React.useState(open ? 1 : 0);
    open && opacity === 0 && setOpacity(1), React.useEffect(function () {
      if (!open) {
        var tm = setTimeout(function () {
          setOpacity(0);
        }, 400);
        return function () {
          clearTimeout(tm);
        };
      }
    }, [open]);
    var forcedContentHeight = hasFit ? void 0 : snapPointsMode === "percent" ? `${maxSnapPoint}${isWeb ? "dvh" : "%"}` : maxSnapPoint,
      setHasScrollView = React.useCallback(function (val) {
        hasScrollView.current = val;
      }, []),
      contents = /* @__PURE__ */_jsx(LayoutMeasurementController, {
        disable: !open,
        children: /* @__PURE__ */_jsx(ParentSheetContext.Provider, {
          value: nextParentContext,
          children: /* @__PURE__ */_jsxs(SheetProvider, {
            ...providerProps,
            setHasScrollView,
            children: [/* @__PURE__ */_jsx(AnimatePresence, {
              custom: {
                open
              },
              children: shouldHideParentSheet || !open ? null : overlayComponent
            }), snapPointsMode !== "percent" && /* @__PURE__ */_jsx(View, {
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
            }), /* @__PURE__ */_jsx(AnimatedView, {
              ref,
              ...panResponder?.panHandlers,
              onLayout: handleAnimationViewLayout,
              // @ts-ignore for CSS driver this is necessary to attach the transition
              // also motion driver at least though i suspect all drivers?
              animation: isDragging || disableAnimation ? null : animation,
              // @ts-ignore
              disableClassName: !0,
              style: [{
                position: "absolute",
                zIndex,
                width: "100%",
                height: forcedContentHeight,
                minHeight: forcedContentHeight,
                opacity: shouldHideParentSheet ? 0 : opacity,
                ...((shouldHideParentSheet || !open) && {
                  pointerEvents: "none"
                })
              }, animatedStyle],
              children: (/* <AdaptProvider>{props.children}</AdaptProvider> */
              props.children)
            })]
          })
        })
      });
    if (!USE_NATIVE_PORTAL) {
      var adaptContext = useAdaptContext();
      contents = /* @__PURE__ */_jsx(ProvideAdaptContext, {
        ...adaptContext,
        children: (/* @ts-ignore */
        contents)
      });
    }
    var shouldMountChildren = unmountChildrenWhenHidden ? !!opacity : !0;
    if (modal) {
      var modalContents = /* @__PURE__ */_jsx(Portal, {
        stackZIndex: zIndex,
        ...portalProps,
        children: shouldMountChildren && /* @__PURE__ */_jsx(ContainerComponent, {
          children: /* @__PURE__ */_jsx(Theme, {
            contain: !0,
            forceClassName: !0,
            name: themeName,
            children: contents
          })
        })
      });
      return isWeb ? modalContents : /* @__PURE__ */_jsx(SheetInsideSheetContext.Provider, {
        value: onInnerSheet,
        children: modalContents
      });
    }
    return contents;
  });
function getYPositions(mode, point, screenSize, frameSize) {
  if (!screenSize || !frameSize) return 0;
  if (mode === "mixed") {
    if (typeof point == "number") return screenSize - Math.min(screenSize, Math.max(0, point));
    if (point === "fit") return screenSize - Math.min(screenSize, frameSize);
    if (point.endsWith("%")) {
      var pct = Math.min(100, Math.max(0, Number(point.slice(0, -1)))) / 100;
      if (Number.isNaN(pct)) return console.warn("Invalid snapPoint percentage string"), 0;
      var next = Math.round(screenSize - pct * screenSize);
      return next;
    }
    return console.warn("Invalid snapPoint unknown value"), 0;
  }
  if (mode === "fit") return point === 0 ? screenSize : screenSize - Math.min(screenSize, frameSize);
  if (mode === "constant" && typeof point == "number") return screenSize - Math.min(screenSize, Math.max(0, point));
  var pct1 = Math.min(100, Math.max(0, Number(point))) / 100;
  return Number.isNaN(pct1) ? (console.warn("Invalid snapPoint percentage"), 0) : Math.round(screenSize - pct1 * screenSize);
}
export { SheetImplementationCustom };
//# sourceMappingURL=SheetImplementationCustom.native.js.map
