import { jsx as _jsx } from "react/jsx-runtime";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { LayoutMeasurementController, View as TamaguiView, createStyledContext, getVariableValue, styled, useProps } from "@tamagui/core";
import { arrow, autoUpdate, flip, offset as offsetFn, platform, shift, useFloating } from "@tamagui/floating";
import { getSpace } from "@tamagui/get-token";
import { ThemeableStack, YStack } from "@tamagui/stacks";
import { startTransition } from "@tamagui/start-transition";
import * as React from "react";
import { Keyboard, useWindowDimensions } from "react-native";
function _instanceof(left, right) {
  return right != null && typeof Symbol < "u" && right[Symbol.hasInstance] ? !!right[Symbol.hasInstance](left) : left instanceof right;
}
var PopperContextFast = createStyledContext(
  // since we always provide this we can avoid setting here
  {}, "Popper__"),
  PopperPositionContext = createStyledContext,
  {
    useStyledContext: usePopperContext,
    Provider: PopperProviderFast
  } = PopperContextFast,
  PopperContextSlow = createStyledContext(
  // since we always provide this we can avoid setting here
  {}, "PopperSlow__"),
  {
    useStyledContext: usePopperContextSlow,
    Provider: PopperProviderSlow
  } = PopperContextSlow,
  PopperProvider = function (param) {
    var {
        scope,
        children,
        ...context
      } = param,
      slowContext = getContextSlow(context);
    return /* @__PURE__ */_jsx(PopperProviderFast, {
      scope,
      ...context,
      children: /* @__PURE__ */_jsx(PopperProviderSlow, {
        scope,
        ...slowContext,
        children
      })
    });
  };
function getContextSlow(context) {
  return {
    refs: context.refs,
    size: context.size,
    arrowRef: context.arrowRef,
    arrowStyle: context.arrowStyle,
    onArrowSize: context.onArrowSize,
    hasFloating: context.hasFloating,
    strategy: context.strategy,
    update: context.update,
    context: context.context,
    getFloatingProps: context.getFloatingProps,
    getReferenceProps: context.getReferenceProps,
    open: context.open
  };
}
var checkFloating = {
    name: "checkFloating",
    fn(data) {
      return {
        data: {
          hasFloating: !!data.rects.floating.width
        }
      };
    }
  },
  setupOptions = {};
function setupPopper(options) {
  Object.assign(setupOptions, options);
}
function Popper(props) {
  var {
      children,
      size,
      strategy = "absolute",
      placement = "bottom",
      stayInFrame,
      allowFlip,
      offset,
      disableRTL,
      resize,
      passThrough,
      open,
      scope
    } = props,
    [arrowEl, setArrow] = React.useState(null),
    [arrowSize, setArrowSize] = React.useState(0),
    offsetOptions = offset ?? arrowSize,
    floatingStyle = React.useRef({}),
    isOpen = passThrough ? !1 : open || !0,
    floating = useFloating({
      open: isOpen,
      strategy,
      placement,
      sameScrollView: !1,
      // this only takes effect on native
      whileElementsMounted: isOpen ? autoUpdate : void 0,
      platform: disableRTL ?? setupOptions.disableRTL ? {
        ...platform,
        isRTL(element) {
          return !1;
        }
      } : platform,
      middleware: [stayInFrame ? shift(typeof stayInFrame == "boolean" ? {} : stayInFrame) : null, allowFlip ? flip(typeof allowFlip == "boolean" ? {} : allowFlip) : null, arrowEl ? arrow({
        element: arrowEl
      }) : null, typeof offsetOptions < "u" ? offsetFn(offsetOptions) : null, checkFloating, null].filter(Boolean)
    }),
    {
      middlewareData
    } = floating,
    dimensions = useWindowDimensions(),
    [keyboardOpen, setKeyboardOpen] = React.useState(!1);
  React.useEffect(function () {
    var showSubscription = Keyboard.addListener("keyboardDidShow", function () {
        startTransition(function () {
          setKeyboardOpen(!0);
        });
      }),
      hideSubscription = Keyboard.addListener("keyboardDidHide", function () {
        startTransition(function () {
          setKeyboardOpen(!1);
        });
      });
    return function () {
      showSubscription.remove(), hideSubscription.remove();
    };
  }, []), useIsomorphicLayoutEffect(function () {
    passThrough || floating.update();
  }, [passThrough, dimensions, keyboardOpen]);
  var popperContext = React.useMemo(function () {
    var _middlewareData_checkFloating;
    return {
      size,
      arrowRef: setArrow,
      arrowStyle: middlewareData.arrow,
      onArrowSize: setArrowSize,
      hasFloating: (_middlewareData_checkFloating = middlewareData.checkFloating) === null || _middlewareData_checkFloating === void 0 ? void 0 : _middlewareData_checkFloating.hasFloating,
      open: !!open,
      ...floating
    };
  }, [open, size, floating.x, floating.y, floating.placement, JSON.stringify(middlewareData.arrow || null), floating.isPositioned]);
  return /* @__PURE__ */_jsx(LayoutMeasurementController, {
    disable: !isOpen,
    children: /* @__PURE__ */_jsx(PopperProvider, {
      scope,
      ...popperContext,
      children
    })
  });
}
var PopperAnchor = YStack.extractable(/* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        virtualRef,
        scope,
        ...anchorProps
      } = props,
      context = usePopperContextSlow(scope),
      {
        getReferenceProps,
        refs,
        update
      } = context,
      ref = React.useRef(null);
    React.useEffect(function () {
      virtualRef && refs.setReference(virtualRef.current);
    }, [virtualRef]);
    var stackProps = anchorProps,
      refProps = getReferenceProps ? getReferenceProps(stackProps) : null,
      shouldHandleInHover = isWeb && scope,
      composedRefs = useComposedRefs(forwardedRef, ref,
      // web handles this onMouseEnter below so it can support multiple targets + hovering
      shouldHandleInHover ? void 0 : refs.setReference);
    return /* @__PURE__ */_jsx(TamaguiView, {
      ...stackProps,
      ...refProps,
      ref: composedRefs,
      ...(shouldHandleInHover && {
        // this helps us with handling scoped poppers with many different targets
        // basically we wait for mouseEnter to ever set a reference and remove it on leave
        // otherwise floating ui gets confused by having >1 reference
        onMouseEnter: function (e) {
          if (_instanceof(ref.current, HTMLElement)) {
            var _refProps_onPointerEnter;
            refs.setReference(ref.current), (_refProps_onPointerEnter = refProps.onPointerEnter) === null || _refProps_onPointerEnter === void 0 || _refProps_onPointerEnter.call(refProps, e), update();
          }
        },
        onMouseLeave: function (e) {
          var _refProps_onMouseLeave;
          refProps == null || (_refProps_onMouseLeave = refProps.onMouseLeave) === null || _refProps_onMouseLeave === void 0 || _refProps_onMouseLeave.call(refProps, e);
        }
      })
    });
  })),
  PopperContentFrame = styled(ThemeableStack, {
    name: "PopperContent",
    variants: {
      unstyled: {
        false: {
          size: "$true",
          backgroundColor: "$background",
          alignItems: "center",
          radiused: !0
        }
      },
      size: {
        "...size": function (val, param) {
          var {
            tokens
          } = param;
          return {
            padding: tokens.space[val],
            borderRadius: tokens.radius[val]
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  PopperContent = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        scope,
        enableAnimationForPositionChange,
        children,
        passThrough,
        ...rest
      } = props,
      context = usePopperContext(scope),
      {
        strategy,
        placement,
        refs,
        x,
        y,
        getFloatingProps,
        size,
        isPositioned
      } = context,
      contentRefs = useComposedRefs(refs.setFloating, forwardedRef),
      [needsMeasure, setNeedsMeasure] = React.useState(enableAnimationForPositionChange);
    useIsomorphicLayoutEffect(function () {
      needsMeasure && x && y && setNeedsMeasure(!1);
    }, [needsMeasure, enableAnimationForPositionChange, x, y]);
    var hide = x === 0 && y === 0,
      disableAnimationProp =
      // if they want to animate also when re-positioning allow it
      enableAnimationForPositionChange === "even-when-repositioning" ? needsMeasure : !isPositioned || needsMeasure,
      [disableAnimation, setDisableAnimation] = React.useState(disableAnimationProp);
    React.useEffect(function () {
      setDisableAnimation(disableAnimationProp);
    }, [disableAnimationProp]);
    var frameProps = {
        ref: contentRefs,
        x: x || 0,
        y: y || 0,
        top: 0,
        left: 0,
        position: strategy,
        opacity: 1,
        ...(enableAnimationForPositionChange && {
          animation: rest.animation,
          animateOnly: disableAnimation ? [] : rest.animateOnly,
          // apply animation but disable it on initial render to avoid animating from 0 to the first position
          animatePresence: !1
        }),
        ...(hide && {
          opacity: 0,
          animateOnly: []
        })
      },
      {
        style,
        ...floatingProps
      } = getFloatingProps ? getFloatingProps(frameProps) : frameProps;
    return /* @__PURE__ */_jsx(TamaguiView, {
      passThrough,
      ref: contentRefs,
      contain: "layout style",
      ...(passThrough ? null : floatingProps),
      children: /* @__PURE__ */_jsx(PopperContentFrame, {
        passThrough,
        ...(!passThrough && {
          "data-placement": placement,
          "data-strategy": strategy,
          size,
          ...style,
          ...rest
        }),
        children
      }, "popper-content-frame")
    });
  }),
  PopperArrowFrame = styled(YStack, {
    name: "PopperArrow",
    variants: {
      unstyled: {
        false: {
          borderColor: "$borderColor",
          backgroundColor: "$background",
          position: "relative"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  PopperArrowOuterFrame = styled(YStack, {
    name: "PopperArrowOuter",
    variants: {
      unstyled: {
        false: {
          position: "absolute",
          zIndex: 1e6,
          pointerEvents: "none",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  opposites = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  },
  PopperArrow = /* @__PURE__ */React.forwardRef(function (propsIn, forwardedRef) {
    var _context_arrowStyle,
      _context_arrowStyle1,
      {
        scope,
        ...rest
      } = propsIn,
      props = useProps(rest),
      {
        offset,
        size: sizeProp,
        borderWidth = 0,
        ...arrowProps
      } = props,
      context = usePopperContext(scope),
      sizeVal = typeof sizeProp == "number" ? sizeProp : getVariableValue(getSpace(sizeProp ?? context.size, {
        shift: -2,
        bounds: [2]
      })),
      size = Math.max(0, +sizeVal),
      {
        placement
      } = context,
      refs = useComposedRefs(context.arrowRef, forwardedRef),
      x = ((_context_arrowStyle = context.arrowStyle) === null || _context_arrowStyle === void 0 ? void 0 : _context_arrowStyle.x) || 0,
      y = ((_context_arrowStyle1 = context.arrowStyle) === null || _context_arrowStyle1 === void 0 ? void 0 : _context_arrowStyle1.y) || 0,
      primaryPlacement = placement ? placement.split("-")[0] : "top",
      arrowStyle = {
        x,
        y,
        width: size,
        height: size
      },
      innerArrowStyle = {},
      isVertical = primaryPlacement === "bottom" || primaryPlacement === "top";
    if (primaryPlacement) {
      arrowStyle[isVertical ? "width" : "height"] = size * 2;
      var oppSide = opposites[primaryPlacement];
      oppSide && (arrowStyle[oppSide] = -size, innerArrowStyle[oppSide] = size / 2), (oppSide === "top" || oppSide === "bottom") && (arrowStyle.left = 0), (oppSide === "left" || oppSide === "right") && (arrowStyle.top = 0), useIsomorphicLayoutEffect(function () {
        var _context_onArrowSize;
        (_context_onArrowSize = context.onArrowSize) === null || _context_onArrowSize === void 0 || _context_onArrowSize.call(context, size);
      }, [size, context.onArrowSize]);
    }
    return /* @__PURE__ */_jsx(PopperArrowOuterFrame, {
      ref: refs,
      ...arrowStyle,
      children: /* @__PURE__ */_jsx(PopperArrowFrame, {
        width: size,
        height: size,
        ...arrowProps,
        ...innerArrowStyle,
        rotate: "45deg",
        ...(primaryPlacement === "bottom" && {
          borderLeftWidth: borderWidth,
          borderTopWidth: borderWidth
        }),
        ...(primaryPlacement === "top" && {
          borderBottomWidth: borderWidth,
          borderRightWidth: borderWidth
        }),
        ...(primaryPlacement === "right" && {
          borderLeftWidth: borderWidth,
          borderBottomWidth: borderWidth
        }),
        ...(primaryPlacement === "left" && {
          borderTopWidth: borderWidth,
          borderRightWidth: borderWidth
        })
      })
    });
  });
export { Popper, PopperAnchor, PopperArrow, PopperArrowFrame, PopperContent, PopperContentFrame, PopperContextFast, PopperContextSlow, PopperPositionContext, PopperProvider, PopperProviderFast, PopperProviderSlow, setupPopper, usePopperContext, usePopperContextSlow };
//# sourceMappingURL=Popper.native.js.map
