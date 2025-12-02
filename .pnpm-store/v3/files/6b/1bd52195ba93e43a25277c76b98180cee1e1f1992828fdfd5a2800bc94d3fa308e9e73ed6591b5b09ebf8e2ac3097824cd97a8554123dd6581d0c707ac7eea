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
var Dialog_exports = {};
__export(Dialog_exports, {
  Dialog: () => Dialog,
  DialogClose: () => DialogClose,
  DialogContent: () => DialogContent,
  DialogContext: () => DialogContext,
  DialogDescription: () => DialogDescription,
  DialogOverlay: () => DialogOverlay,
  DialogOverlayFrame: () => DialogOverlayFrame,
  DialogPortal: () => DialogPortal,
  DialogPortalFrame: () => DialogPortalFrame,
  DialogProvider: () => DialogProvider,
  DialogTitle: () => DialogTitle,
  DialogTrigger: () => DialogTrigger,
  DialogWarningProvider: () => DialogWarningProvider,
  useDialogContext: () => useDialogContext
});
module.exports = __toCommonJS(Dialog_exports);
var import_adapt = require("@tamagui/adapt"), import_animate_presence = require("@tamagui/animate-presence"), import_compose_refs = require("@tamagui/compose-refs"), import_constants = require("@tamagui/constants"), import_core = require("@tamagui/core"), import_create_context = require("@tamagui/create-context"), import_dismissable = require("@tamagui/dismissable"), import_focus_scope = require("@tamagui/focus-scope"), import_helpers = require("@tamagui/helpers"), import_portal = require("@tamagui/portal"), import_remove_scroll = require("@tamagui/remove-scroll"), import_sheet = require("@tamagui/sheet"), import_stacks = require("@tamagui/stacks"), import_text = require("@tamagui/text"), import_use_controllable_state = require("@tamagui/use-controllable-state"), import_z_index_stack = require("@tamagui/z-index-stack"), React = __toESM(require("react"), 1), import_jsx_runtime = require("react/jsx-runtime");
const DialogContext = (0, import_core.createStyledContext)(
  // since we always provide this we can avoid setting here
  {},
  "Dialog__"
), { useStyledContext: useDialogContext, Provider: DialogProvider } = DialogContext, DialogTriggerFrame = (0, import_core.styled)(import_core.View, {
  name: "DialogTrigger"
}), DialogTrigger = DialogTriggerFrame.styleable(
  function(props, forwardedRef) {
    const { scope, ...triggerProps } = props, isInsideButton = React.useContext(import_stacks.ButtonNestingContext), context = useDialogContext(scope), composedTriggerRef = (0, import_compose_refs.useComposedRefs)(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_stacks.ButtonNestingContext.Provider, { value: !0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      DialogTriggerFrame,
      {
        tag: isInsideButton ? "span" : "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onPress: (0, import_helpers.composeEventHandlers)(props.onPress, context.onOpenToggle)
      }
    ) });
  }
), DialogPortalFrame = (0, import_core.styled)(import_stacks.YStack, {
  pointerEvents: "none",
  tag: "dialog",
  variants: {
    unstyled: {
      false: {
        alignItems: "center",
        justifyContent: "center",
        fullscreen: !0,
        "$platform-web": {
          // undo dialog styles
          borderWidth: 0,
          backgroundColor: "transparent",
          color: "inherit",
          maxInlineSize: "none",
          margin: 0,
          width: "auto",
          height: "auto",
          // ensure always in frame and right height
          maxHeight: "100vh",
          position: "fixed",
          // ensure dialog inherits stacking context from portal wrapper
          zIndex: 1
        }
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), needsRepropagation = import_constants.isAndroid || import_constants.isIos && !import_portal.USE_NATIVE_PORTAL, DialogPortalItem = ({
  context,
  children
}) => {
  const themeName = (0, import_core.useThemeName)(), isAdapted = (0, import_adapt.useAdaptIsActive)(context.adaptScope), adaptContext = (0, import_adapt.useAdaptContext)(context.adaptScope);
  let content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.Theme, { name: themeName, children });
  return needsRepropagation && (content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_adapt.ProvideAdaptContext, { ...adaptContext, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, { ...context, children: content }) })), isAdapted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_adapt.AdaptPortalContents, { scope: context.adaptScope, children: content }) : context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_portal.PortalItem, { hostName: context.modal ? "root" : context.adaptScope, children: content }) : content;
}, DialogPortal = React.forwardRef(
  (props, forwardRef) => {
    const { scope, forceMount, children, ...frameProps } = props, dialogRef = React.useRef(null), ref = (0, import_compose_refs.composeRefs)(dialogRef, forwardRef), context = useDialogContext(scope), isMountedOrOpen = forceMount || context.open, [isFullyHidden, setIsFullyHidden] = React.useState(!isMountedOrOpen), isAdapted = (0, import_adapt.useAdaptIsActive)(context.adaptScope), isVisible = isMountedOrOpen ? !0 : !isFullyHidden;
    isMountedOrOpen && isFullyHidden && setIsFullyHidden(!1), import_constants.isWeb && (0, import_constants.useIsomorphicLayoutEffect)(() => {
      const node = dialogRef.current;
      node instanceof HTMLDialogElement && (isVisible ? node.show?.() : node.close?.());
    }, [isVisible]);
    const handleExitComplete = React.useCallback(() => {
      setIsFullyHidden(!0);
    }, []), zIndex = (0, import_core.getExpandedShorthand)("zIndex", props), contents = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_z_index_stack.StackZIndexContext, { zIndex: (0, import_portal.resolveViewZIndex)(zIndex), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_animate_presence.AnimatePresence, { passThrough: isAdapted, onExitComplete: handleExitComplete, children: isMountedOrOpen || isAdapted ? children : null }) }), framedContents = (
      // NOTE: we remove the inner frame, but not the portal itself
      // saw a bug when we removed and re-added portals that caused stale inner contents of the portal
      // seems like a React bug itself but leaving this for now as it fixes
      isFullyHidden && !isAdapted ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.LayoutMeasurementController, { disable: !isMountedOrOpen, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        DialogPortalFrame,
        {
          ref,
          ...import_constants.isWeb && isMountedOrOpen && {
            "aria-modal": !0
          },
          pointerEvents: isMountedOrOpen ? "auto" : "none",
          ...frameProps,
          className: "_no_backdrop " + (frameProps.className || ""),
          children: contents
        }
      ) })
    );
    return import_constants.isWeb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_portal.Portal,
      {
        zIndex,
        stackZIndex: 1e3,
        passThrough: isAdapted,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassthroughTheme, { passThrough: isAdapted, children: framedContents })
      }
    ) : isAdapted ? framedContents : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortalItem, { context, children: framedContents });
  }
), PassthroughTheme = ({
  children,
  passThrough
}) => {
  const themeName = (0, import_core.useThemeName)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.Theme, { passThrough, name: themeName, forceClassName: !0, children });
}, OVERLAY_NAME = "DialogOverlay", DialogOverlayFrame = (0, import_core.styled)(import_sheet.Overlay, {
  name: OVERLAY_NAME
}), DialogOverlay = DialogOverlayFrame.styleable(
  function({ scope, ...props }, forwardedRef) {
    const context = useDialogContext(scope), { forceMount = context.forceMount, ...overlayProps } = props, isAdapted = (0, import_adapt.useAdaptIsActive)(context.adaptScope);
    return !forceMount && (!context.modal || isAdapted) ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      DialogOverlayFrame,
      {
        "data-state": getState(context.open),
        pointerEvents: context.open ? "auto" : "none",
        ...overlayProps,
        ref: forwardedRef
      }
    );
  }
), CONTENT_NAME = "DialogContent", DialogContentFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
  name: CONTENT_NAME,
  variants: {
    size: {
      "...size": (val, extras) => ({})
    },
    unstyled: {
      false: {
        position: "relative",
        backgrounded: !0,
        padded: !0,
        radiused: !0,
        elevate: !0,
        zIndex: 1e5
      }
    }
  },
  defaultVariants: {
    size: "$true",
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), DialogContent = DialogContentFrame.styleable(
  function({ scope, ...props }, forwardedRef) {
    const context = useDialogContext(scope), { forceMount = context.forceMount, ...contentProps } = props, contents = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentModal, { context, ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentNonModal, { context, ...contentProps, ref: forwardedRef }) });
    return !import_constants.isWeb || context.disableRemoveScroll ? contents : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_remove_scroll.RemoveScroll, { enabled: context.open, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-remove-scroll-container": !0, className: "_dsp_contents", children: contents }) });
  }
), DialogContentModal = React.forwardRef(
  ({ children, context, ...props }, forwardedRef) => {
    const contentRef = React.useRef(null), composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, context.contentRef, contentRef);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      DialogContentImpl,
      {
        ...props,
        context,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: (0, import_helpers.composeEventHandlers)(props.onCloseAutoFocus, (event) => {
          event.preventDefault(), context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: (0, import_helpers.composeEventHandlers)(
          props.onPointerDownOutside,
          (event) => {
            const originalEvent = event.detail.originalEvent, ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === !0;
            (originalEvent.button === 2 || ctrlLeftClick) && event.preventDefault();
          }
        ),
        onFocusOutside: (0, import_helpers.composeEventHandlers)(
          props.onFocusOutside,
          (event) => event.preventDefault()
        ),
        ...!props.unstyled && {
          outlineStyle: "none"
        },
        children
      }
    );
  }
), DialogContentNonModal = React.forwardRef(
  (props, forwardedRef) => {
    const hasInteractedOutsideRef = React.useRef(!1);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event), event.defaultPrevented || (hasInteractedOutsideRef.current || props.context.triggerRef.current?.focus(), event.preventDefault()), hasInteractedOutsideRef.current = !1;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event), event.defaultPrevented || (hasInteractedOutsideRef.current = !0);
          const target = event.target, trigger = props.context.triggerRef.current;
          if (!(trigger instanceof HTMLElement)) return;
          trigger.contains(target) && event.preventDefault();
        }
      }
    );
  }
), DialogContentImpl = React.forwardRef(
  (props, forwardedRef) => {
    const {
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      context,
      ...contentProps
    } = props, contentRef = React.useRef(
      // TODO react 19 type workaround
      void 0
    ), composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, contentRef);
    if ((0, import_adapt.useAdaptIsActive)(context.adaptScope))
      return !import_constants.isWeb && !context.open ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortalItem, { context, children: contentProps.children });
    const contents = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      DialogContentFrame,
      {
        ref: composedRefs,
        id: context.contentId,
        "aria-describedby": context.descriptionId,
        "aria-labelledby": context.titleId,
        "data-state": getState(context.open),
        ...contentProps
      }
    );
    return import_constants.isWeb ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dismissable.Dismissable,
        {
          disableOutsidePointerEvents: context.open && disableOutsidePointerEvents,
          forceUnmount: !context.open,
          onEscapeKeyDown,
          onPointerDownOutside,
          onFocusOutside,
          onInteractOutside,
          onDismiss: () => context?.onOpenChange?.(!1),
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_focus_scope.FocusScope,
            {
              loop: !0,
              enabled: context.open,
              trapped: trapFocus,
              onMountAutoFocus: onOpenAutoFocus,
              forceUnmount: !context.open,
              onUnmountAutoFocus: onCloseAutoFocus,
              children: contents
            }
          )
        }
      ),
      process.env.NODE_ENV === "development" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          DescriptionWarning,
          {
            contentRef,
            descriptionId: context.descriptionId
          }
        )
      ] })
    ] }) : contents;
  }
), DialogTitleFrame = (0, import_core.styled)(import_text.H2, {
  name: "DialogTitle"
}), DialogTitle = DialogTitleFrame.styleable(
  function(props, forwardedRef) {
    const { scope, ...titleProps } = props, context = useDialogContext(scope);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitleFrame, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
), DialogDescriptionFrame = (0, import_core.styled)(import_text.Paragraph, {
  name: "DialogDescription"
}), DialogDescription = DialogDescriptionFrame.styleable(
  function(props, forwardedRef) {
    const { scope, ...descriptionProps } = props, context = useDialogContext(scope);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      DialogDescriptionFrame,
      {
        id: context.descriptionId,
        ...descriptionProps,
        ref: forwardedRef
      }
    );
  }
), CLOSE_NAME = "DialogClose", DialogCloseFrame = (0, import_core.styled)(import_core.View, {
  name: CLOSE_NAME,
  tag: "button"
}), DialogClose = DialogCloseFrame.styleable(
  (props, forwardedRef) => {
    const { scope, displayWhenAdapted, ...closeProps } = props, context = useDialogContext(scope), isAdapted = (0, import_adapt.useAdaptIsActive)(context.adaptScope), isInsideButton = React.useContext(import_stacks.ButtonNestingContext);
    return isAdapted && !displayWhenAdapted ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      DialogCloseFrame,
      {
        accessibilityLabel: "Dialog Close",
        tag: isInsideButton ? "span" : "button",
        ...closeProps,
        ref: forwardedRef,
        onPress: (0, import_helpers.composeEventHandlers)(props.onPress, () => {
          context.onOpenChange(!1);
        })
      }
    );
  }
);
function getState(open) {
  return open ? "open" : "closed";
}
const TITLE_WARNING_NAME = "DialogTitleWarning", [DialogWarningProvider, useWarningContext] = (0, import_create_context.createContext)(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: "DialogTitle",
  docsSlug: "dialog"
}), TitleWarning = ({ titleId }) => {
  if (process.env.NODE_ENV === "development") {
    const titleWarningContext = useWarningContext(TITLE_WARNING_NAME), MESSAGE = `\`${titleWarningContext.contentName}\` wants a \`${titleWarningContext.titleName}\` to be accessible. If you want to hide the \`${titleWarningContext.titleName}\`, wrap it with <VisuallyHidden />.`;
    React.useEffect(() => {
      import_constants.isWeb && titleId && (document.getElementById(titleId) || console.warn(MESSAGE));
    }, [MESSAGE, titleId]);
  }
  return null;
}, DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning", DescriptionWarning = ({
  contentRef,
  descriptionId
}) => {
  if (process.env.NODE_ENV === "development") {
    const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${useWarningContext(DESCRIPTION_WARNING_NAME).contentName}}.`;
    React.useEffect(() => {
      if (!import_constants.isWeb) return;
      const contentNode = contentRef.current;
      if (!(contentNode instanceof HTMLElement))
        return;
      const describedById = contentNode.getAttribute("aria-describedby");
      descriptionId && describedById && (document.getElementById(descriptionId) || console.warn(MESSAGE));
    }, [MESSAGE, contentRef, descriptionId]);
  }
  return null;
}, Dialog = (0, import_helpers.withStaticProperties)(
  React.forwardRef(
    function(props, ref) {
      const {
        scope = "",
        children,
        open: openProp,
        defaultOpen = !1,
        onOpenChange,
        modal = !0,
        disableRemoveScroll = !1
      } = props, baseId = React.useId(), dialogId = `Dialog-${scope}-${baseId}`, contentId = `${dialogId}-content`, titleId = `${dialogId}-title`, descriptionId = `${dialogId}-description`, triggerRef = React.useRef(null), contentRef = React.useRef(null), [open, setOpen] = (0, import_use_controllable_state.useControllableState)({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
      }), onOpenToggle = React.useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
      }, [setOpen]), adaptScope = `DialogAdapt${scope}`, context = {
        dialogScope: scope,
        adaptScope,
        triggerRef,
        contentRef,
        contentId,
        titleId,
        descriptionId,
        open,
        onOpenChange: setOpen,
        onOpenToggle,
        modal,
        disableRemoveScroll
      };
      return React.useImperativeHandle(
        ref,
        () => ({
          open: setOpen
        }),
        [setOpen]
      ), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_adapt.AdaptParent,
        {
          scope: adaptScope,
          portal: {
            forwardProps: props
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, { scope, ...context, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogSheetController, { onOpenChange: setOpen, scope, children }) })
        }
      );
    }
  ),
  {
    Trigger: DialogTrigger,
    Portal: DialogPortal,
    Overlay: DialogOverlay,
    Content: DialogContent,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
    Sheet: import_sheet.Sheet.Controlled,
    FocusScope: import_focus_scope.FocusScopeController,
    Adapt: import_adapt.Adapt
  }
);
const DialogSheetController = (props) => {
  const context = useDialogContext(props.scope), isAdapted = (0, import_adapt.useAdaptIsActive)(context.adaptScope);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_sheet.SheetController,
    {
      onOpenChange: (val) => {
        isAdapted && props.onOpenChange?.(val);
      },
      open: context.open,
      hidden: !isAdapted,
      children: props.children
    }
  );
};
//# sourceMappingURL=Dialog.js.map
