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
var Popover_exports = {};
__export(Popover_exports, {
  Popover: () => Popover,
  PopoverAnchor: () => PopoverAnchor,
  PopoverArrow: () => PopoverArrow,
  PopoverClose: () => PopoverClose,
  PopoverContent: () => PopoverContent,
  PopoverContext: () => PopoverContext,
  PopoverTrigger: () => PopoverTrigger,
  usePopoverContext: () => usePopoverContext
});
module.exports = __toCommonJS(Popover_exports);
var import_polyfill_dev = require("@tamagui/polyfill-dev"),
  import_adapt = require("@tamagui/adapt"),
  import_animate = require("@tamagui/animate"),
  import_animate_presence = require("@tamagui/animate-presence"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_floating = require("@tamagui/floating"),
  import_focus_scope = require("@tamagui/focus-scope"),
  import_helpers = require("@tamagui/helpers"),
  import_popper = require("@tamagui/popper"),
  import_portal = require("@tamagui/portal"),
  import_remove_scroll = require("@tamagui/remove-scroll"),
  import_scroll_view = require("@tamagui/scroll-view"),
  import_sheet = require("@tamagui/sheet"),
  import_stacks = require("@tamagui/stacks"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  import_z_index_stack = require("@tamagui/z-index-stack"),
  React = __toESM(require("react"), 1),
  import_useFloatingContext = require("./useFloatingContext.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const needsRepropagation = import_constants.isAndroid || import_constants.isIos && !import_portal.USE_NATIVE_PORTAL,
  PopoverContext = (0, import_core.createStyledContext)(
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
    return React.useEffect(() => (onCustomAnchorAdd(), () => onCustomAnchorRemove()), [onCustomAnchorAdd, onCustomAnchorRemove]), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_popper.PopperAnchor, {
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
      composedTriggerRef = (0, import_compose_refs.useComposedRefs)(forwardedRef, context.triggerRef);
    if (!props.children) return null;
    const trigger = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.View, {
        "aria-expanded": context.open,
        "data-state": getState(context.open),
        ...rest,
        ref: composedTriggerRef,
        onPress: (0, import_helpers.composeEventHandlers)(props.onPress, context.onOpenToggle)
      }),
      virtualRef = React.useMemo(() => anchorTo ? {
        current: {
          getBoundingClientRect: () => import_constants.isWeb ? DOMRect.fromRect(anchorTo) : anchorTo,
          ...(!import_constants.isWeb && {
            measure: c => c(anchorTo?.x, anchorTo?.y, anchorTo?.width, anchorTo?.height),
            measureInWindow: c => c(anchorTo?.x, anchorTo?.y, anchorTo?.width, anchorTo?.height)
          })
        }
      } : null, [context.anchorTo, anchorTo?.x, anchorTo?.y, anchorTo?.x, anchorTo?.height, anchorTo?.width]);
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_popper.PopperAnchor, {
      ...(virtualRef && {
        virtualRef
      }),
      scope,
      asChild: !0,
      children: trigger
    });
  }),
  PopoverContentFrame = (0, import_core.styled)(import_popper.PopperContentFrame, {
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
      composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, contentRef),
      isRightClickOutsideRef = React.useRef(!1),
      [isFullyHidden, setIsFullyHidden] = React.useState(!context.open);
    return context.open && isFullyHidden && setIsFullyHidden(!1), !context.keepChildrenMounted && isFullyHidden ? null : /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopoverPortal, {
      passThrough: context.breakpointActive,
      context,
      zIndex,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.Stack, {
        passThrough: context.breakpointActive,
        pointerEvents: context.open ? contentImplProps.pointerEvents ?? "auto" : "none",
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopoverContentImpl, {
          ...contentImplProps,
          context,
          enableRemoveScroll,
          ref: composedRefs,
          setIsFullyHidden,
          scope,
          trapFocus: trapFocus ?? context.open,
          disableOutsidePointerEvents: !0,
          onCloseAutoFocus: props.onCloseAutoFocus === !1 ? void 0 : (0, import_helpers.composeEventHandlers)(props.onCloseAutoFocus, event => {
            event.defaultPrevented || (event.preventDefault(), isRightClickOutsideRef.current || context.triggerRef.current?.focus());
          }),
          onPointerDownOutside: (0, import_helpers.composeEventHandlers)(props.onPointerDownOutside, event => {
            const originalEvent = event.detail.originalEvent,
              ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === !0,
              isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            isRightClickOutsideRef.current = isRightClick;
          }, {
            checkDefaultPrevented: !1
          }),
          onFocusOutside: (0, import_helpers.composeEventHandlers)(props.onFocusOutside, event => event.preventDefault(), {
            checkDefaultPrevented: !1
          })
        })
      })
    });
  })),
  useParentContexts = scope => {
    const context = usePopoverContext(scope),
      popperContext = (0, import_popper.usePopperContext)(scope),
      adaptContext = (0, import_adapt.useAdaptContext)(context.adaptScope);
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
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_popper.PopperProvider, {
    scope: context.popoverScope,
    ...popperContext,
    children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopoverContext.Provider, {
      ...context,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_adapt.ProvideAdaptContext, {
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
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_adapt.AdaptPortalContents, {
      scope: context.adaptScope,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(RepropagateParentContexts, {
        ...parentContexts,
        children
      })
    });
  }
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_adapt.AdaptPortalContents, {
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
  const themeName = (0, import_core.useThemeName)();
  let content = children;
  if (needsRepropagation) {
    const parentContexts = useParentContexts(context.popoverScope);
    content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(RepropagateParentContexts, {
      ...parentContexts,
      children: content
    });
  }
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_portal.Portal, {
    passThrough,
    stackZIndex: !0,
    zIndex,
    children: /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_core.Theme, {
      passThrough,
      contain: !0,
      forceClassName: !0,
      name: themeName,
      children: [!!context.open && !context.breakpointActive && /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_stacks.YStack, {
        fullscreen: !0,
        onPress: (0, import_helpers.composeEventHandlers)(onPress, context.onOpenToggle)
      }), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_z_index_stack.StackZIndexContext, {
        zIndex: (0, import_portal.resolveViewZIndex)(zIndex),
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
    let contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_animate_presence.ResetPresence, {
      disable: context.breakpointActive,
      children
    });
    return context.breakpointActive || (contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_remove_scroll.RemoveScroll, {
      enabled: context.breakpointActive ? !1 : enableRemoveScroll ? open : !1,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_focus_scope.FocusScope, {
        loop: trapFocus !== !1,
        enabled: context.breakpointActive || disableFocusScope ? !1 : open,
        trapped: context.breakpointActive ? !1 : trapFocus,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus === !1 ? void 0 : onCloseAutoFocus,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)("div", {
          style: dspContentsStyle,
          children: contents
        })
      })
    })), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_animate.Animate, {
      type: "presence",
      present: !!open,
      keepChildrenMounted: !!keepChildrenMounted,
      onExitComplete: handleExitComplete,
      lazyMount,
      passThrough: context.breakpointActive,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_popper.PopperContent, {
        scope,
        "data-state": getState(open),
        id: context.contentId,
        ref: forwardedRef,
        passThrough: context.breakpointActive,
        ...contentProps,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(PortalAdaptSafe, {
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
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_stacks.YStack, {
      ...rest,
      ref: forwardedRef,
      componentName: "PopoverClose",
      onPress: (0, import_helpers.composeEventHandlers)(props.onPress, () => context?.onOpenChange?.(!1, "press"))
    });
  }),
  PopoverArrow = import_popper.PopperArrowFrame.styleable(function (props, forwardedRef) {
    const {
        scope,
        ...rest
      } = props,
      context = usePopoverContext(scope);
    return (0, import_adapt.useAdaptIsActive)(context.adaptScope) ? null : /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_popper.PopperArrow, {
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
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_scroll_view.ScrollView, {
      ref,
      pointerEvents: context.breakpointActive ? "none" : void 0,
      scrollEnabled: !context.breakpointActive,
      passThrough: context.breakpointActive,
      ...props
    });
  }),
  DEFAULT_SCOPE = "",
  Popover = (0, import_helpers.withStaticProperties)(React.forwardRef(function ({
    scope = DEFAULT_SCOPE,
    ...props
  }, ref) {
    const id = React.useId(),
      adaptScope = `PopoverAdapt${scope}`;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_adapt.AdaptParent, {
      scope: adaptScope,
      portal: !0,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopoverInner, {
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
    Adapt: import_adapt.Adapt,
    ScrollView: PopoverScrollView,
    Sheet: import_sheet.Sheet.Controlled,
    FocusScope: import_focus_scope.FocusScopeController
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
      [keepChildrenMounted] = (0, import_use_controllable_state.useControllableState)({
        prop: keepChildrenMountedProp,
        defaultProp: !1,
        transition: keepChildrenMountedProp === "lazy"
      }),
      [open, setOpen] = (0, import_use_controllable_state.useControllableState)({
        prop: openProp,
        defaultProp: defaultOpen || !1,
        onChange: val => {
          onOpenChange?.(val, viaRef.current);
        }
      }),
      handleOpenChange = (0, import_core.useEvent)((val, via) => {
        viaRef.current = via, setOpen(val);
      }),
      isAdapted = (0, import_adapt.useAdaptIsActive)(adaptScope),
      floatingContext = (0, import_useFloatingContext.useFloatingContext)({
        open,
        setOpen: handleOpenChange,
        disable: isAdapted,
        hoverable,
        disableFocus
      }),
      [anchorTo, setAnchorToRaw] = React.useState(),
      setAnchorTo = (0, import_core.useCreateShallowSetState)(setAnchorToRaw);
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
        onOpenToggle: (0, import_core.useEvent)(() => {
          open && isAdapted || setOpen(!open);
        }),
        hasCustomAnchor,
        anchorTo,
        onCustomAnchorAdd: React.useCallback(() => setHasCustomAnchor(!0), []),
        onCustomAnchorRemove: React.useCallback(() => setHasCustomAnchor(!1), []),
        keepChildrenMounted
      },
      memoizedChildren = React.useMemo(() => /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopoverContext.Provider, {
        scope,
        ...popoverContext,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(PopoverSheetController, {
          context: popoverContext,
          onOpenChange: setOpen,
          children
        })
      }), [scope, setOpen, children, ...Object.values(popoverContext)]),
      contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_popper.Popper, {
        open,
        passThrough: isAdapted,
        scope,
        stayInFrame: !0,
        ...restProps,
        children: memoizedChildren
      });
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
      children: import_constants.isWeb ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_floating.FloatingOverrideContext.Provider, {
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
      getShowSheet = (0, import_core.useGet)(showSheet);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_sheet.SheetController, {
      onOpenChange: val => {
        getShowSheet() && props.onOpenChange?.(val);
      },
      open: context.open,
      hidden: !breakpointActive,
      children: props.children
    });
  },
  useShowPopoverSheet = context => {
    const isAdapted = (0, import_adapt.useAdaptIsActive)(context.adaptScope);
    return context.open === !1 ? !1 : isAdapted;
  };