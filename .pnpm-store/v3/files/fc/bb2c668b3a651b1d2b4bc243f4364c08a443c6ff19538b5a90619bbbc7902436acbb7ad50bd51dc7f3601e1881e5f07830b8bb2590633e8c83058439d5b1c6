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
var Popper_exports = {};
__export(Popper_exports, {
  Popper: () => Popper,
  PopperAnchor: () => PopperAnchor,
  PopperArrow: () => PopperArrow,
  PopperArrowFrame: () => PopperArrowFrame,
  PopperContent: () => PopperContent,
  PopperContentFrame: () => PopperContentFrame,
  PopperContextFast: () => PopperContextFast,
  PopperContextSlow: () => PopperContextSlow,
  PopperPositionContext: () => PopperPositionContext,
  PopperProvider: () => PopperProvider,
  PopperProviderFast: () => PopperProviderFast,
  PopperProviderSlow: () => PopperProviderSlow,
  setupPopper: () => setupPopper,
  usePopperContext: () => usePopperContext,
  usePopperContextSlow: () => usePopperContextSlow
});
module.exports = __toCommonJS(Popper_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_floating = require("@tamagui/floating"),
  import_get_token = require("@tamagui/get-token"),
  import_stacks = require("@tamagui/stacks"),
  import_start_transition = require("@tamagui/start-transition"),
  React = __toESM(require("react"), 1),
  import_react_native = require("react-native");
function _instanceof(left, right) {
  return right != null && typeof Symbol < "u" && right[Symbol.hasInstance] ? !!right[Symbol.hasInstance](left) : left instanceof right;
}
var PopperContextFast = (0, import_core.createStyledContext)(
  // since we always provide this we can avoid setting here
  {}, "Popper__"),
  PopperPositionContext = import_core.createStyledContext,
  {
    useStyledContext: usePopperContext,
    Provider: PopperProviderFast
  } = PopperContextFast,
  PopperContextSlow = (0, import_core.createStyledContext)(
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
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopperProviderFast, {
      scope,
      ...context,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopperProviderSlow, {
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
    floating = (0, import_floating.useFloating)({
      open: isOpen,
      strategy,
      placement,
      sameScrollView: !1,
      // this only takes effect on native
      whileElementsMounted: isOpen ? import_floating.autoUpdate : void 0,
      platform: disableRTL ?? setupOptions.disableRTL ? {
        ...import_floating.platform,
        isRTL(element) {
          return !1;
        }
      } : import_floating.platform,
      middleware: [stayInFrame ? (0, import_floating.shift)(typeof stayInFrame == "boolean" ? {} : stayInFrame) : null, allowFlip ? (0, import_floating.flip)(typeof allowFlip == "boolean" ? {} : allowFlip) : null, arrowEl ? (0, import_floating.arrow)({
        element: arrowEl
      }) : null, typeof offsetOptions < "u" ? (0, import_floating.offset)(offsetOptions) : null, checkFloating, null].filter(Boolean)
    }),
    {
      middlewareData
    } = floating,
    dimensions = (0, import_react_native.useWindowDimensions)(),
    [keyboardOpen, setKeyboardOpen] = React.useState(!1);
  React.useEffect(function () {
    var showSubscription = import_react_native.Keyboard.addListener("keyboardDidShow", function () {
        (0, import_start_transition.startTransition)(function () {
          setKeyboardOpen(!0);
        });
      }),
      hideSubscription = import_react_native.Keyboard.addListener("keyboardDidHide", function () {
        (0, import_start_transition.startTransition)(function () {
          setKeyboardOpen(!1);
        });
      });
    return function () {
      showSubscription.remove(), hideSubscription.remove();
    };
  }, []), (0, import_constants.useIsomorphicLayoutEffect)(function () {
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
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.LayoutMeasurementController, {
    disable: !isOpen,
    children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopperProvider, {
      scope,
      ...popperContext,
      children
    })
  });
}
var PopperAnchor = import_stacks.YStack.extractable(/* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
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
      shouldHandleInHover = import_constants.isWeb && scope,
      composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, ref,
      // web handles this onMouseEnter below so it can support multiple targets + hovering
      shouldHandleInHover ? void 0 : refs.setReference);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.View, {
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
  PopperContentFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
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
      contentRefs = (0, import_compose_refs.useComposedRefs)(refs.setFloating, forwardedRef),
      [needsMeasure, setNeedsMeasure] = React.useState(enableAnimationForPositionChange);
    (0, import_constants.useIsomorphicLayoutEffect)(function () {
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
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.View, {
      passThrough,
      ref: contentRefs,
      contain: "layout style",
      ...(passThrough ? null : floatingProps),
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopperContentFrame, {
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
  PopperArrowFrame = (0, import_core.styled)(import_stacks.YStack, {
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
  PopperArrowOuterFrame = (0, import_core.styled)(import_stacks.YStack, {
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
      props = (0, import_core.useProps)(rest),
      {
        offset,
        size: sizeProp,
        borderWidth = 0,
        ...arrowProps
      } = props,
      context = usePopperContext(scope),
      sizeVal = typeof sizeProp == "number" ? sizeProp : (0, import_core.getVariableValue)((0, import_get_token.getSpace)(sizeProp ?? context.size, {
        shift: -2,
        bounds: [2]
      })),
      size = Math.max(0, +sizeVal),
      {
        placement
      } = context,
      refs = (0, import_compose_refs.useComposedRefs)(context.arrowRef, forwardedRef),
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
      oppSide && (arrowStyle[oppSide] = -size, innerArrowStyle[oppSide] = size / 2), (oppSide === "top" || oppSide === "bottom") && (arrowStyle.left = 0), (oppSide === "left" || oppSide === "right") && (arrowStyle.top = 0), (0, import_constants.useIsomorphicLayoutEffect)(function () {
        var _context_onArrowSize;
        (_context_onArrowSize = context.onArrowSize) === null || _context_onArrowSize === void 0 || _context_onArrowSize.call(context, size);
      }, [size, context.onArrowSize]);
    }
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopperArrowOuterFrame, {
      ref: refs,
      ...arrowStyle,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopperArrowFrame, {
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
//# sourceMappingURL=Popper.native.js.map
