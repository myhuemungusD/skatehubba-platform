import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "@tamagui/polyfill-dev";
import { Adapt, AdaptParent, AdaptPortalContents, ProvideAdaptContext, useAdaptContext, useAdaptIsActive } from "@tamagui/adapt";
import { Animate } from "@tamagui/animate";
import { ResetPresence } from "@tamagui/animate-presence";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isAndroid, isIos, isWeb } from "@tamagui/constants";
import { createStyledContext, Stack, styled, Theme, useCreateShallowSetState, useEvent, useGet, useThemeName, View } from "@tamagui/core";
import { FloatingOverrideContext } from "@tamagui/floating";
import { FocusScopeController } from "@tamagui/focus-scope";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
import { Popper, PopperAnchor, PopperArrow, PopperArrowFrame, PopperContent, PopperContentFrame, PopperProvider, usePopperContext } from "@tamagui/popper";
import { Portal, resolveViewZIndex, USE_NATIVE_PORTAL } from "@tamagui/portal";
import "@tamagui/remove-scroll";
import { ScrollView } from "@tamagui/scroll-view";
import { Sheet, SheetController } from "@tamagui/sheet";
import { YStack } from "@tamagui/stacks";
import { useControllableState } from "@tamagui/use-controllable-state";
import { StackZIndexContext } from "@tamagui/z-index-stack";
import * as React from "react";
import { useFloatingContext } from "./useFloatingContext.native.js";
var needsRepropagation = isAndroid || isIos && !USE_NATIVE_PORTAL,
  PopoverContext = createStyledContext(
  // since we always provide this we can avoid setting here
  {}, "Popover__"),
  usePopoverContext = PopoverContext.useStyledContext,
  PopoverAnchor = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        scope,
        ...rest
      } = props,
      context = usePopoverContext(scope),
      {
        onCustomAnchorAdd,
        onCustomAnchorRemove
      } = context || {};
    return React.useEffect(function () {
      return onCustomAnchorAdd(), function () {
        return onCustomAnchorRemove();
      };
    }, [onCustomAnchorAdd, onCustomAnchorRemove]), /* @__PURE__ */_jsx(PopperAnchor, {
      scope,
      ...rest,
      ref: forwardedRef
    });
  }),
  PopoverTrigger = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        scope,
        ...rest
      } = props,
      context = usePopoverContext(scope),
      anchorTo = context.anchorTo,
      composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    if (!props.children) return null;
    var trigger = /* @__PURE__ */_jsx(View, {
        "aria-expanded": context.open,
        // TODO not matching
        // aria-controls={context.contentId}
        "data-state": getState(context.open),
        ...rest,
        // @ts-ignore
        ref: composedTriggerRef,
        onPress: composeEventHandlers(props.onPress, context.onOpenToggle)
      }),
      virtualRef = React.useMemo(function () {
        return anchorTo ? {
          current: {
            getBoundingClientRect: function () {
              return isWeb ? DOMRect.fromRect(anchorTo) : anchorTo;
            },
            ...(!isWeb && {
              measure: function (c) {
                return c(anchorTo?.x, anchorTo?.y, anchorTo?.width, anchorTo?.height);
              },
              measureInWindow: function (c) {
                return c(anchorTo?.x, anchorTo?.y, anchorTo?.width, anchorTo?.height);
              }
            })
          }
        } : null;
      }, [context.anchorTo, anchorTo?.x, anchorTo?.y, anchorTo?.x, anchorTo?.height, anchorTo?.width]);
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */_jsx(PopperAnchor, {
      ...(virtualRef && {
        virtualRef
      }),
      scope,
      asChild: !0,
      children: trigger
    });
  }),
  PopoverContentFrame = styled(PopperContentFrame, {
    name: "Popover"
  }),
  PopoverContent = PopoverContentFrame.extractable(/* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        trapFocus,
        enableRemoveScroll = !1,
        zIndex,
        scope,
        ...contentImplProps
      } = props,
      context = usePopoverContext(scope),
      contentRef = React.useRef(null),
      composedRefs = useComposedRefs(forwardedRef, contentRef),
      isRightClickOutsideRef = React.useRef(!1),
      [isFullyHidden, setIsFullyHidden] = React.useState(!context.open);
    if (context.open && isFullyHidden && setIsFullyHidden(!1), !context.keepChildrenMounted && isFullyHidden) return null;
    var _contentImplProps_pointerEvents;
    return /* @__PURE__ */_jsx(PopoverPortal, {
      passThrough: context.breakpointActive,
      context,
      zIndex,
      children: /* @__PURE__ */_jsx(Stack, {
        passThrough: context.breakpointActive,
        pointerEvents: context.open ? (_contentImplProps_pointerEvents = contentImplProps.pointerEvents) !== null && _contentImplProps_pointerEvents !== void 0 ? _contentImplProps_pointerEvents : "auto" : "none",
        children: /* @__PURE__ */_jsx(PopoverContentImpl, {
          ...contentImplProps,
          context,
          enableRemoveScroll,
          ref: composedRefs,
          setIsFullyHidden,
          scope,
          // we make sure we're not trapping once it's been closed
          // (closed !== unmounted when animating out)
          trapFocus: trapFocus ?? context.open,
          disableOutsidePointerEvents: !0,
          onCloseAutoFocus: props.onCloseAutoFocus === !1 ? void 0 : composeEventHandlers(props.onCloseAutoFocus, function (event) {
            var _context_triggerRef_current;
            event.defaultPrevented || (event.preventDefault(), isRightClickOutsideRef.current || (_context_triggerRef_current = context.triggerRef.current) === null || _context_triggerRef_current === void 0 || _context_triggerRef_current.focus());
          }),
          onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, function (event) {
            var originalEvent = event.detail.originalEvent,
              ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === !0,
              isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            isRightClickOutsideRef.current = isRightClick;
          }, {
            checkDefaultPrevented: !1
          }),
          // When focus is trapped, a `focusout` event may still happen.
          // We make sure we don't trigger our `onDismiss` in such case.
          onFocusOutside: composeEventHandlers(props.onFocusOutside, function (event) {
            return event.preventDefault();
          }, {
            checkDefaultPrevented: !1
          })
        })
      })
    });
  })),
  useParentContexts = function (scope) {
    var context = usePopoverContext(scope),
      popperContext = usePopperContext(scope),
      adaptContext = useAdaptContext(context.adaptScope);
    return {
      popperContext,
      adaptContext,
      context
    };
  };
function RepropagateParentContexts(param) {
  var {
    adaptContext,
    children,
    context,
    popperContext
  } = param;
  return /* @__PURE__ */_jsx(PopperProvider, {
    scope: context.popoverScope,
    ...popperContext,
    children: /* @__PURE__ */_jsx(PopoverContext.Provider, {
      ...context,
      children: /* @__PURE__ */_jsx(ProvideAdaptContext, {
        ...adaptContext,
        children
      })
    })
  });
}
var PortalAdaptSafe = function (param) {
  var {
    children,
    context
  } = param;
  if (needsRepropagation) {
    var parentContexts = useParentContexts(context.popoverScope);
    return /* @__PURE__ */_jsx(AdaptPortalContents, {
      scope: context.adaptScope,
      children: /* @__PURE__ */_jsx(RepropagateParentContexts, {
        ...parentContexts,
        children
      })
    });
  }
  return /* @__PURE__ */_jsx(AdaptPortalContents, {
    scope: context.adaptScope,
    children
  });
};
function PopoverPortal(param) {
  var {
      context,
      zIndex,
      passThrough,
      children,
      onPress
    } = param,
    themeName = useThemeName(),
    content = children;
  if (needsRepropagation) {
    var parentContexts = useParentContexts(context.popoverScope);
    content = /* @__PURE__ */_jsx(RepropagateParentContexts, {
      ...parentContexts,
      children: content
    });
  }
  return /* @__PURE__ */_jsx(Portal, {
    passThrough,
    stackZIndex: !0,
    zIndex,
    children: (/* forceClassName avoids forced re-mount renders for some reason... see the HeadMenu as you change tints a few times */
    /* without this you'll see the site menu re-rendering. It must be something in wrapping children in Theme */
    /* @__PURE__ */_jsxs(Theme, {
      passThrough,
      contain: !0,
      forceClassName: !0,
      name: themeName,
      children: [!!context.open && !context.breakpointActive && /* @__PURE__ */_jsx(YStack, {
        fullscreen: !0,
        onPress: composeEventHandlers(onPress, context.onOpenToggle)
      }), /* @__PURE__ */_jsx(StackZIndexContext, {
        zIndex: resolveViewZIndex(zIndex),
        children: content
      })]
    }))
  });
}
var PopoverContentImpl = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
  var {
      trapFocus,
      scope,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      disableFocusScope,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      children,
      enableRemoveScroll,
      freezeContentsWhenHidden,
      setIsFullyHidden,
      lazyMount,
      context,
      ...contentProps
    } = props,
    {
      open,
      keepChildrenMounted
    } = context,
    handleExitComplete = React.useCallback(function () {
      setIsFullyHidden?.(!0);
    }, [setIsFullyHidden]),
    contents = /* @__PURE__ */_jsx(ResetPresence, {
      disable: context.breakpointActive,
      children
    });
  return context.breakpointActive, /* @__PURE__ */_jsx(Animate, {
    type: "presence",
    present: !!open,
    keepChildrenMounted: !!keepChildrenMounted,
    onExitComplete: handleExitComplete,
    lazyMount,
    passThrough: context.breakpointActive,
    children: /* @__PURE__ */_jsx(PopperContent, {
      scope,
      "data-state": getState(open),
      id: context.contentId,
      ref: forwardedRef,
      passThrough: context.breakpointActive,
      ...contentProps,
      children: /* @__PURE__ */_jsx(PortalAdaptSafe, {
        context,
        children: contents
      })
    }, context.contentId)
  });
});
var PopoverClose = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        scope,
        ...rest
      } = props,
      context = usePopoverContext(scope);
    return /* @__PURE__ */_jsx(YStack, {
      ...rest,
      ref: forwardedRef,
      componentName: "PopoverClose",
      onPress: composeEventHandlers(props.onPress, function () {
        var _context_onOpenChange;
        return context == null || (_context_onOpenChange = context.onOpenChange) === null || _context_onOpenChange === void 0 ? void 0 : _context_onOpenChange.call(context, !1, "press");
      })
    });
  }),
  PopoverArrow = PopperArrowFrame.styleable(function (props, forwardedRef) {
    var {
        scope,
        ...rest
      } = props,
      context = usePopoverContext(scope),
      isAdapted = useAdaptIsActive(context.adaptScope);
    return isAdapted ? null : /* @__PURE__ */_jsx(PopperArrow, {
      scope,
      componentName: "PopoverArrow",
      ...rest,
      ref: forwardedRef
    });
  }),
  PopoverScrollView = /* @__PURE__ */React.forwardRef(function (param, ref) {
    var {
        scope,
        ...props
      } = param,
      context = usePopoverContext(scope);
    return /* @__PURE__ */_jsx(ScrollView, {
      ref,
      // when adapted, no pointer events!
      pointerEvents: context.breakpointActive ? "none" : void 0,
      scrollEnabled: !context.breakpointActive,
      passThrough: context.breakpointActive,
      ...props
    });
  }),
  DEFAULT_SCOPE = "",
  Popover = withStaticProperties(/* @__PURE__ */React.forwardRef(function (param, ref) {
    var {
        scope = DEFAULT_SCOPE,
        ...props
      } = param,
      id = React.useId(),
      adaptScope = `PopoverAdapt${scope}`;
    return /* @__PURE__ */_jsx(AdaptParent, {
      scope: adaptScope,
      portal: !0,
      children: /* @__PURE__ */_jsx(PopoverInner, {
        adaptScope,
        ref,
        id,
        scope,
        ...props
      })
    });
  }), {
    Anchor: PopoverAnchor,
    Arrow: PopoverArrow,
    Trigger: PopoverTrigger,
    Content: PopoverContent,
    Close: PopoverClose,
    Adapt,
    ScrollView: PopoverScrollView,
    Sheet: Sheet.Controlled,
    FocusScope: FocusScopeController
  }),
  PopoverInner = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        children,
        open: openProp,
        defaultOpen,
        onOpenChange,
        scope = DEFAULT_SCOPE,
        keepChildrenMounted: keepChildrenMountedProp,
        hoverable,
        disableFocus,
        id,
        adaptScope,
        ...restProps
      } = props,
      triggerRef = React.useRef(null),
      [hasCustomAnchor, setHasCustomAnchor] = React.useState(!1),
      viaRef = React.useRef(void 0),
      [keepChildrenMounted] = useControllableState({
        prop: keepChildrenMountedProp,
        defaultProp: !1,
        transition: keepChildrenMountedProp === "lazy"
      }),
      [open, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: defaultOpen || !1,
        onChange: function (val) {
          onOpenChange?.(val, viaRef.current);
        }
      }),
      handleOpenChange = useEvent(function (val, via) {
        viaRef.current = via, setOpen(val);
      }),
      isAdapted = useAdaptIsActive(adaptScope),
      floatingContext = useFloatingContext({
        open,
        setOpen: handleOpenChange,
        disable: isAdapted,
        hoverable,
        disableFocus
      }),
      [anchorTo, setAnchorToRaw] = React.useState(),
      setAnchorTo = useCreateShallowSetState(setAnchorToRaw);
    React.useImperativeHandle(forwardedRef, function () {
      return {
        anchorTo: setAnchorTo,
        toggle: function () {
          return setOpen(function (prev) {
            return !prev;
          });
        },
        open: function () {
          return setOpen(!0);
        },
        close: function () {
          return setOpen(!1);
        },
        setOpen
      };
    });
    var popoverContext = {
        popoverScope: scope,
        adaptScope,
        id,
        contentId: React.useId(),
        triggerRef,
        open,
        breakpointActive: isAdapted,
        onOpenChange: handleOpenChange,
        onOpenToggle: useEvent(function () {
          open && isAdapted || setOpen(!open);
        }),
        hasCustomAnchor,
        anchorTo,
        onCustomAnchorAdd: React.useCallback(function () {
          return setHasCustomAnchor(!0);
        }, []),
        onCustomAnchorRemove: React.useCallback(function () {
          return setHasCustomAnchor(!1);
        }, []),
        keepChildrenMounted
      },
      memoizedChildren = React.useMemo(function () {
        return /* @__PURE__ */_jsx(PopoverContext.Provider, {
          scope,
          ...popoverContext,
          children: /* @__PURE__ */_jsx(PopoverSheetController, {
            context: popoverContext,
            onOpenChange: setOpen,
            children
          })
        });
      }, [scope, setOpen, children, ...Object.values(popoverContext)]),
      contents = /* @__PURE__ */_jsx(Popper, {
        open,
        passThrough: isAdapted,
        scope,
        stayInFrame: !0,
        ...restProps,
        children: memoizedChildren
      });
    return /* @__PURE__ */_jsx(_Fragment, {
      children: isWeb ? /* @__PURE__ */_jsx(FloatingOverrideContext.Provider, {
        value: floatingContext,
        children: contents
      }) : contents
    });
  });
function getState(open) {
  return open ? "open" : "closed";
}
var PopoverSheetController = function (param) {
    var {
        context,
        ...props
      } = param,
      showSheet = useShowPopoverSheet(context),
      breakpointActive = context.breakpointActive,
      getShowSheet = useGet(showSheet);
    return /* @__PURE__ */_jsx(SheetController, {
      onOpenChange: function (val) {
        if (getShowSheet()) {
          var _props_onOpenChange;
          (_props_onOpenChange = props.onOpenChange) === null || _props_onOpenChange === void 0 || _props_onOpenChange.call(props, val);
        }
      },
      open: context.open,
      hidden: !breakpointActive,
      children: props.children
    });
  },
  useShowPopoverSheet = function (context) {
    var isAdapted = useAdaptIsActive(context.adaptScope);
    return context.open === !1 ? !1 : isAdapted;
  };
export { Popover, PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverContext, PopoverTrigger, usePopoverContext };
//# sourceMappingURL=Popover.native.js.map
