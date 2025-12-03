import "@tamagui/polyfill-dev";
import { Adapt, AdaptParent, AdaptPortalContents, ProvideAdaptContext, useAdaptContext, useAdaptIsActive } from "@tamagui/adapt";
import { Animate } from "@tamagui/animate";
import { ResetPresence } from "@tamagui/animate-presence";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isAndroid, isIos, isWeb } from "@tamagui/constants";
import { createStyledContext, Stack, styled, Theme, useCreateShallowSetState, useEvent, useGet, useThemeName, View } from "@tamagui/core";
import { FloatingOverrideContext } from "@tamagui/floating";
import { FocusScope, FocusScopeController } from "@tamagui/focus-scope";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
import { Popper, PopperAnchor, PopperArrow, PopperArrowFrame, PopperContent, PopperContentFrame, PopperProvider, usePopperContext } from "@tamagui/popper";
import { Portal, resolveViewZIndex, USE_NATIVE_PORTAL } from "@tamagui/portal";
import { RemoveScroll } from "@tamagui/remove-scroll";
import { ScrollView } from "@tamagui/scroll-view";
import { Sheet, SheetController } from "@tamagui/sheet";
import { YStack } from "@tamagui/stacks";
import { useControllableState } from "@tamagui/use-controllable-state";
import { StackZIndexContext } from "@tamagui/z-index-stack";
import * as React from "react";
import { useFloatingContext } from "./useFloatingContext.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
const needsRepropagation = isAndroid || isIos && !USE_NATIVE_PORTAL,
  PopoverContext = createStyledContext(
  // since we always provide this we can avoid setting here
  {}, "Popover__"),
  usePopoverContext = PopoverContext.useStyledContext,
  PopoverAnchor = React.forwardRef(function (props, forwardedRef) {
    const {
        scope,
        ...rest
      } = props,
      context = usePopoverContext(scope),
      {
        onCustomAnchorAdd,
        onCustomAnchorRemove
      } = context || {};
    return React.useEffect(() => (onCustomAnchorAdd(), () => onCustomAnchorRemove()), [onCustomAnchorAdd, onCustomAnchorRemove]), /* @__PURE__ */jsx(PopperAnchor, {
      scope,
      ...rest,
      ref: forwardedRef
    });
  }),
  PopoverTrigger = React.forwardRef(function (props, forwardedRef) {
    const {
        scope,
        ...rest
      } = props,
      context = usePopoverContext(scope),
      anchorTo = context.anchorTo,
      composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    if (!props.children) return null;
    const trigger = /* @__PURE__ */jsx(View, {
        "aria-expanded": context.open,
        "data-state": getState(context.open),
        ...rest,
        ref: composedTriggerRef,
        onPress: composeEventHandlers(props.onPress, context.onOpenToggle)
      }),
      virtualRef = React.useMemo(() => anchorTo ? {
        current: {
          getBoundingClientRect: () => isWeb ? DOMRect.fromRect(anchorTo) : anchorTo,
          ...(!isWeb && {
            measure: c => c(anchorTo?.x, anchorTo?.y, anchorTo?.width, anchorTo?.height),
            measureInWindow: c => c(anchorTo?.x, anchorTo?.y, anchorTo?.width, anchorTo?.height)
          })
        }
      } : null, [context.anchorTo, anchorTo?.x, anchorTo?.y, anchorTo?.x, anchorTo?.height, anchorTo?.width]);
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */jsx(PopperAnchor, {
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
  PopoverContent = PopoverContentFrame.extractable(React.forwardRef(function (props, forwardedRef) {
    const {
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
    return context.open && isFullyHidden && setIsFullyHidden(!1), !context.keepChildrenMounted && isFullyHidden ? null : /* @__PURE__ */jsx(PopoverPortal, {
      passThrough: context.breakpointActive,
      context,
      zIndex,
      children: /* @__PURE__ */jsx(Stack, {
        passThrough: context.breakpointActive,
        pointerEvents: context.open ? contentImplProps.pointerEvents ?? "auto" : "none",
        children: /* @__PURE__ */jsx(PopoverContentImpl, {
          ...contentImplProps,
          context,
          enableRemoveScroll,
          ref: composedRefs,
          setIsFullyHidden,
          scope,
          trapFocus: trapFocus ?? context.open,
          disableOutsidePointerEvents: !0,
          onCloseAutoFocus: props.onCloseAutoFocus === !1 ? void 0 : composeEventHandlers(props.onCloseAutoFocus, event => {
            event.defaultPrevented || (event.preventDefault(), isRightClickOutsideRef.current || context.triggerRef.current?.focus());
          }),
          onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, event => {
            const originalEvent = event.detail.originalEvent,
              ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === !0,
              isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            isRightClickOutsideRef.current = isRightClick;
          }, {
            checkDefaultPrevented: !1
          }),
          onFocusOutside: composeEventHandlers(props.onFocusOutside, event => event.preventDefault(), {
            checkDefaultPrevented: !1
          })
        })
      })
    });
  })),
  useParentContexts = scope => {
    const context = usePopoverContext(scope),
      popperContext = usePopperContext(scope),
      adaptContext = useAdaptContext(context.adaptScope);
    return {
      popperContext,
      adaptContext,
      context
    };
  };
function RepropagateParentContexts({
  adaptContext,
  children,
  context,
  popperContext
}) {
  return /* @__PURE__ */jsx(PopperProvider, {
    scope: context.popoverScope,
    ...popperContext,
    children: /* @__PURE__ */jsx(PopoverContext.Provider, {
      ...context,
      children: /* @__PURE__ */jsx(ProvideAdaptContext, {
        ...adaptContext,
        children
      })
    })
  });
}
const PortalAdaptSafe = ({
  children,
  context
}) => {
  if (needsRepropagation) {
    const parentContexts = useParentContexts(context.popoverScope);
    return /* @__PURE__ */jsx(AdaptPortalContents, {
      scope: context.adaptScope,
      children: /* @__PURE__ */jsx(RepropagateParentContexts, {
        ...parentContexts,
        children
      })
    });
  }
  return /* @__PURE__ */jsx(AdaptPortalContents, {
    scope: context.adaptScope,
    children
  });
};
function PopoverPortal({
  context,
  zIndex,
  passThrough,
  children,
  onPress
}) {
  const themeName = useThemeName();
  let content = children;
  if (needsRepropagation) {
    const parentContexts = useParentContexts(context.popoverScope);
    content = /* @__PURE__ */jsx(RepropagateParentContexts, {
      ...parentContexts,
      children: content
    });
  }
  return /* @__PURE__ */jsx(Portal, {
    passThrough,
    stackZIndex: !0,
    zIndex,
    children: /* @__PURE__ */jsxs(Theme, {
      passThrough,
      contain: !0,
      forceClassName: !0,
      name: themeName,
      children: [!!context.open && !context.breakpointActive && /* @__PURE__ */jsx(YStack, {
        fullscreen: !0,
        onPress: composeEventHandlers(onPress, context.onOpenToggle)
      }), /* @__PURE__ */jsx(StackZIndexContext, {
        zIndex: resolveViewZIndex(zIndex),
        children: content
      })]
    })
  });
}
const PopoverContentImpl = React.forwardRef(function (props, forwardedRef) {
    const {
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
      handleExitComplete = React.useCallback(() => {
        setIsFullyHidden?.(!0);
      }, [setIsFullyHidden]);
    let contents = /* @__PURE__ */jsx(ResetPresence, {
      disable: context.breakpointActive,
      children
    });
    return context.breakpointActive || (contents = /* @__PURE__ */jsx(RemoveScroll, {
      enabled: context.breakpointActive ? !1 : enableRemoveScroll ? open : !1,
      children: /* @__PURE__ */jsx(FocusScope, {
        loop: trapFocus !== !1,
        enabled: context.breakpointActive || disableFocusScope ? !1 : open,
        trapped: context.breakpointActive ? !1 : trapFocus,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus === !1 ? void 0 : onCloseAutoFocus,
        children: /* @__PURE__ */jsx("div", {
          style: dspContentsStyle,
          children: contents
        })
      })
    })), /* @__PURE__ */jsx(Animate, {
      type: "presence",
      present: !!open,
      keepChildrenMounted: !!keepChildrenMounted,
      onExitComplete: handleExitComplete,
      lazyMount,
      passThrough: context.breakpointActive,
      children: /* @__PURE__ */jsx(PopperContent, {
        scope,
        "data-state": getState(open),
        id: context.contentId,
        ref: forwardedRef,
        passThrough: context.breakpointActive,
        ...contentProps,
        children: /* @__PURE__ */jsx(PortalAdaptSafe, {
          context,
          children: contents
        })
      }, context.contentId)
    });
  }),
  dspContentsStyle = {
    display: "contents"
  },
  PopoverClose = React.forwardRef(function (props, forwardedRef) {
    const {
        scope,
        ...rest
      } = props,
      context = usePopoverContext(scope);
    return /* @__PURE__ */jsx(YStack, {
      ...rest,
      ref: forwardedRef,
      componentName: "PopoverClose",
      onPress: composeEventHandlers(props.onPress, () => context?.onOpenChange?.(!1, "press"))
    });
  }),
  PopoverArrow = PopperArrowFrame.styleable(function (props, forwardedRef) {
    const {
        scope,
        ...rest
      } = props,
      context = usePopoverContext(scope);
    return useAdaptIsActive(context.adaptScope) ? null : /* @__PURE__ */jsx(PopperArrow, {
      scope,
      componentName: "PopoverArrow",
      ...rest,
      ref: forwardedRef
    });
  }),
  PopoverScrollView = React.forwardRef(({
    scope,
    ...props
  }, ref) => {
    const context = usePopoverContext(scope);
    return /* @__PURE__ */jsx(ScrollView, {
      ref,
      pointerEvents: context.breakpointActive ? "none" : void 0,
      scrollEnabled: !context.breakpointActive,
      passThrough: context.breakpointActive,
      ...props
    });
  }),
  DEFAULT_SCOPE = "",
  Popover = withStaticProperties(React.forwardRef(function ({
    scope = DEFAULT_SCOPE,
    ...props
  }, ref) {
    const id = React.useId(),
      adaptScope = `PopoverAdapt${scope}`;
    return /* @__PURE__ */jsx(AdaptParent, {
      scope: adaptScope,
      portal: !0,
      children: /* @__PURE__ */jsx(PopoverInner, {
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
  PopoverInner = React.forwardRef(function (props, forwardedRef) {
    const {
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
        onChange: val => {
          onOpenChange?.(val, viaRef.current);
        }
      }),
      handleOpenChange = useEvent((val, via) => {
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
    React.useImperativeHandle(forwardedRef, () => ({
      anchorTo: setAnchorTo,
      toggle: () => setOpen(prev => !prev),
      open: () => setOpen(!0),
      close: () => setOpen(!1),
      setOpen
    }));
    const popoverContext = {
        popoverScope: scope,
        adaptScope,
        id,
        contentId: React.useId(),
        triggerRef,
        open,
        breakpointActive: isAdapted,
        onOpenChange: handleOpenChange,
        onOpenToggle: useEvent(() => {
          open && isAdapted || setOpen(!open);
        }),
        hasCustomAnchor,
        anchorTo,
        onCustomAnchorAdd: React.useCallback(() => setHasCustomAnchor(!0), []),
        onCustomAnchorRemove: React.useCallback(() => setHasCustomAnchor(!1), []),
        keepChildrenMounted
      },
      memoizedChildren = React.useMemo(() => /* @__PURE__ */jsx(PopoverContext.Provider, {
        scope,
        ...popoverContext,
        children: /* @__PURE__ */jsx(PopoverSheetController, {
          context: popoverContext,
          onOpenChange: setOpen,
          children
        })
      }), [scope, setOpen, children, ...Object.values(popoverContext)]),
      contents = /* @__PURE__ */jsx(Popper, {
        open,
        passThrough: isAdapted,
        scope,
        stayInFrame: !0,
        ...restProps,
        children: memoizedChildren
      });
    return /* @__PURE__ */jsx(Fragment, {
      children: isWeb ? /* @__PURE__ */jsx(FloatingOverrideContext.Provider, {
        value: floatingContext,
        children: contents
      }) : contents
    });
  });
function getState(open) {
  return open ? "open" : "closed";
}
const PopoverSheetController = ({
    context,
    ...props
  }) => {
    const showSheet = useShowPopoverSheet(context),
      breakpointActive = context.breakpointActive,
      getShowSheet = useGet(showSheet);
    return /* @__PURE__ */jsx(SheetController, {
      onOpenChange: val => {
        getShowSheet() && props.onOpenChange?.(val);
      },
      open: context.open,
      hidden: !breakpointActive,
      children: props.children
    });
  },
  useShowPopoverSheet = context => {
    const isAdapted = useAdaptIsActive(context.adaptScope);
    return context.open === !1 ? !1 : isAdapted;
  };
export { Popover, PopoverAnchor, PopoverArrow, PopoverClose, PopoverContent, PopoverContext, PopoverTrigger, usePopoverContext };
//# sourceMappingURL=Popover.mjs.map
