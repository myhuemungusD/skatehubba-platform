import { Adapt, AdaptParent, AdaptPortalContents, ProvideAdaptContext, useAdaptContext, useAdaptIsActive } from "@tamagui/adapt";
import { AnimatePresence } from "@tamagui/animate-presence";
import { composeRefs, useComposedRefs } from "@tamagui/compose-refs";
import { isAndroid, isIos, isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { createStyledContext, getExpandedShorthand, LayoutMeasurementController, styled, Theme, useThemeName, View } from "@tamagui/core";
import { createContext } from "@tamagui/create-context";
import { Dismissable } from "@tamagui/dismissable";
import { FocusScope, FocusScopeController } from "@tamagui/focus-scope";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
import { Portal, PortalItem, resolveViewZIndex, USE_NATIVE_PORTAL } from "@tamagui/portal";
import { RemoveScroll } from "@tamagui/remove-scroll";
import { Overlay, Sheet, SheetController } from "@tamagui/sheet";
import { ButtonNestingContext, ThemeableStack, YStack } from "@tamagui/stacks";
import { H2, Paragraph } from "@tamagui/text";
import { useControllableState } from "@tamagui/use-controllable-state";
import { StackZIndexContext } from "@tamagui/z-index-stack";
import * as React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
const DialogContext = createStyledContext(
  // since we always provide this we can avoid setting here
  {}, "Dialog__"),
  {
    useStyledContext: useDialogContext,
    Provider: DialogProvider
  } = DialogContext,
  DialogTriggerFrame = styled(View, {
    name: "DialogTrigger"
  }),
  DialogTrigger = DialogTriggerFrame.styleable(function (props, forwardedRef) {
    const {
        scope,
        ...triggerProps
      } = props,
      isInsideButton = React.useContext(ButtonNestingContext),
      context = useDialogContext(scope),
      composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */jsx(ButtonNestingContext.Provider, {
      value: !0,
      children: /* @__PURE__ */jsx(DialogTriggerFrame, {
        tag: isInsideButton ? "span" : "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onPress: composeEventHandlers(props.onPress, context.onOpenToggle)
      })
    });
  }),
  DialogPortalFrame = styled(YStack, {
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
  }),
  needsRepropagation = isAndroid || isIos && !USE_NATIVE_PORTAL,
  DialogPortalItem = ({
    context,
    children
  }) => {
    const themeName = useThemeName(),
      isAdapted = useAdaptIsActive(context.adaptScope),
      adaptContext = useAdaptContext(context.adaptScope);
    let content = /* @__PURE__ */jsx(Theme, {
      name: themeName,
      children
    });
    return needsRepropagation && (content = /* @__PURE__ */jsx(ProvideAdaptContext, {
      ...adaptContext,
      children: /* @__PURE__ */jsx(DialogProvider, {
        ...context,
        children: content
      })
    })), isAdapted ? /* @__PURE__ */jsx(AdaptPortalContents, {
      scope: context.adaptScope,
      children: content
    }) : context.modal ? /* @__PURE__ */jsx(PortalItem, {
      hostName: context.modal ? "root" : context.adaptScope,
      children: content
    }) : content;
  },
  DialogPortal = React.forwardRef((props, forwardRef) => {
    const {
        scope,
        forceMount,
        children,
        ...frameProps
      } = props,
      dialogRef = React.useRef(null),
      ref = composeRefs(dialogRef, forwardRef),
      context = useDialogContext(scope),
      isMountedOrOpen = forceMount || context.open,
      [isFullyHidden, setIsFullyHidden] = React.useState(!isMountedOrOpen),
      isAdapted = useAdaptIsActive(context.adaptScope),
      isVisible = isMountedOrOpen ? !0 : !isFullyHidden;
    isMountedOrOpen && isFullyHidden && setIsFullyHidden(!1), isWeb && useIsomorphicLayoutEffect(() => {
      const node = dialogRef.current;
      node instanceof HTMLDialogElement && (isVisible ? node.show?.() : node.close?.());
    }, [isVisible]);
    const handleExitComplete = React.useCallback(() => {
        setIsFullyHidden(!0);
      }, []),
      zIndex = getExpandedShorthand("zIndex", props),
      contents = /* @__PURE__ */jsx(StackZIndexContext, {
        zIndex: resolveViewZIndex(zIndex),
        children: /* @__PURE__ */jsx(AnimatePresence, {
          passThrough: isAdapted,
          onExitComplete: handleExitComplete,
          children: isMountedOrOpen || isAdapted ? children : null
        })
      }),
      framedContents =
      // NOTE: we remove the inner frame, but not the portal itself
      // saw a bug when we removed and re-added portals that caused stale inner contents of the portal
      // seems like a React bug itself but leaving this for now as it fixes
      isFullyHidden && !isAdapted ? null : /* @__PURE__ */jsx(LayoutMeasurementController, {
        disable: !isMountedOrOpen,
        children: /* @__PURE__ */jsx(DialogPortalFrame, {
          ref,
          ...(isWeb && isMountedOrOpen && {
            "aria-modal": !0
          }),
          pointerEvents: isMountedOrOpen ? "auto" : "none",
          ...frameProps,
          className: "_no_backdrop " + (frameProps.className || ""),
          children: contents
        })
      });
    return isWeb ? /* @__PURE__ */jsx(Portal, {
      zIndex,
      stackZIndex: 1e3,
      passThrough: isAdapted,
      children: /* @__PURE__ */jsx(PassthroughTheme, {
        passThrough: isAdapted,
        children: framedContents
      })
    }) : isAdapted ? framedContents : /* @__PURE__ */jsx(DialogPortalItem, {
      context,
      children: framedContents
    });
  }),
  PassthroughTheme = ({
    children,
    passThrough
  }) => {
    const themeName = useThemeName();
    return /* @__PURE__ */jsx(Theme, {
      passThrough,
      name: themeName,
      forceClassName: !0,
      children
    });
  },
  OVERLAY_NAME = "DialogOverlay",
  DialogOverlayFrame = styled(Overlay, {
    name: OVERLAY_NAME
  }),
  DialogOverlay = DialogOverlayFrame.styleable(function ({
    scope,
    ...props
  }, forwardedRef) {
    const context = useDialogContext(scope),
      {
        forceMount = context.forceMount,
        ...overlayProps
      } = props,
      isAdapted = useAdaptIsActive(context.adaptScope);
    return !forceMount && (!context.modal || isAdapted) ? null : /* @__PURE__ */jsx(DialogOverlayFrame, {
      "data-state": getState(context.open),
      pointerEvents: context.open ? "auto" : "none",
      ...overlayProps,
      ref: forwardedRef
    });
  }),
  CONTENT_NAME = "DialogContent",
  DialogContentFrame = styled(ThemeableStack, {
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
  }),
  DialogContent = DialogContentFrame.styleable(function ({
    scope,
    ...props
  }, forwardedRef) {
    const context = useDialogContext(scope),
      {
        forceMount = context.forceMount,
        ...contentProps
      } = props,
      contents = /* @__PURE__ */jsx(Fragment, {
        children: context.modal ? /* @__PURE__ */jsx(DialogContentModal, {
          context,
          ...contentProps,
          ref: forwardedRef
        }) : /* @__PURE__ */jsx(DialogContentNonModal, {
          context,
          ...contentProps,
          ref: forwardedRef
        })
      });
    return !isWeb || context.disableRemoveScroll ? contents : /* @__PURE__ */jsx(RemoveScroll, {
      enabled: context.open,
      children: /* @__PURE__ */jsx("div", {
        "data-remove-scroll-container": !0,
        className: "_dsp_contents",
        children: contents
      })
    });
  }),
  DialogContentModal = React.forwardRef(({
    children,
    context,
    ...props
  }, forwardedRef) => {
    const contentRef = React.useRef(null),
      composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    return /* @__PURE__ */jsx(DialogContentImpl, {
      ...props,
      context,
      ref: composedRefs,
      trapFocus: context.open,
      disableOutsidePointerEvents: !0,
      onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, event => {
        event.preventDefault(), context.triggerRef.current?.focus();
      }),
      onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, event => {
        const originalEvent = event.detail.originalEvent,
          ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === !0;
        (originalEvent.button === 2 || ctrlLeftClick) && event.preventDefault();
      }),
      onFocusOutside: composeEventHandlers(props.onFocusOutside, event => event.preventDefault()),
      ...(!props.unstyled && {
        outlineStyle: "none"
      }),
      children
    });
  }),
  DialogContentNonModal = React.forwardRef((props, forwardedRef) => {
    const hasInteractedOutsideRef = React.useRef(!1);
    return /* @__PURE__ */jsx(DialogContentImpl, {
      ...props,
      ref: forwardedRef,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: event => {
        props.onCloseAutoFocus?.(event), event.defaultPrevented || (hasInteractedOutsideRef.current || props.context.triggerRef.current?.focus(), event.preventDefault()), hasInteractedOutsideRef.current = !1;
      },
      onInteractOutside: event => {
        props.onInteractOutside?.(event), event.defaultPrevented || (hasInteractedOutsideRef.current = !0);
        const target = event.target,
          trigger = props.context.triggerRef.current;
        if (!(trigger instanceof HTMLElement)) return;
        trigger.contains(target) && event.preventDefault();
      }
    });
  }),
  DialogContentImpl = React.forwardRef((props, forwardedRef) => {
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
      } = props,
      contentRef = React.useRef(
      // TODO react 19 type workaround
      void 0),
      composedRefs = useComposedRefs(forwardedRef, contentRef);
    if (useAdaptIsActive(context.adaptScope)) return !isWeb && !context.open ? null : /* @__PURE__ */jsx(DialogPortalItem, {
      context,
      children: contentProps.children
    });
    const contents = /* @__PURE__ */jsx(DialogContentFrame, {
      ref: composedRefs,
      id: context.contentId,
      "aria-describedby": context.descriptionId,
      "aria-labelledby": context.titleId,
      "data-state": getState(context.open),
      ...contentProps
    });
    return isWeb ? /* @__PURE__ */jsxs(Fragment, {
      children: [/* @__PURE__ */jsx(Dismissable, {
        disableOutsidePointerEvents: context.open && disableOutsidePointerEvents,
        forceUnmount: !context.open,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside,
        onInteractOutside,
        onDismiss: () => context?.onOpenChange?.(!1),
        children: /* @__PURE__ */jsx(FocusScope, {
          loop: !0,
          enabled: context.open,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          forceUnmount: !context.open,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: contents
        })
      }), process.env.NODE_ENV === "development" && /* @__PURE__ */jsxs(Fragment, {
        children: [/* @__PURE__ */jsx(TitleWarning, {
          titleId: context.titleId
        }), /* @__PURE__ */jsx(DescriptionWarning, {
          contentRef,
          descriptionId: context.descriptionId
        })]
      })]
    }) : contents;
  }),
  DialogTitleFrame = styled(H2, {
    name: "DialogTitle"
  }),
  DialogTitle = DialogTitleFrame.styleable(function (props, forwardedRef) {
    const {
        scope,
        ...titleProps
      } = props,
      context = useDialogContext(scope);
    return /* @__PURE__ */jsx(DialogTitleFrame, {
      id: context.titleId,
      ...titleProps,
      ref: forwardedRef
    });
  }),
  DialogDescriptionFrame = styled(Paragraph, {
    name: "DialogDescription"
  }),
  DialogDescription = DialogDescriptionFrame.styleable(function (props, forwardedRef) {
    const {
        scope,
        ...descriptionProps
      } = props,
      context = useDialogContext(scope);
    return /* @__PURE__ */jsx(DialogDescriptionFrame, {
      id: context.descriptionId,
      ...descriptionProps,
      ref: forwardedRef
    });
  }),
  CLOSE_NAME = "DialogClose",
  DialogCloseFrame = styled(View, {
    name: CLOSE_NAME,
    tag: "button"
  }),
  DialogClose = DialogCloseFrame.styleable((props, forwardedRef) => {
    const {
        scope,
        displayWhenAdapted,
        ...closeProps
      } = props,
      context = useDialogContext(scope),
      isAdapted = useAdaptIsActive(context.adaptScope),
      isInsideButton = React.useContext(ButtonNestingContext);
    return isAdapted && !displayWhenAdapted ? null : /* @__PURE__ */jsx(DialogCloseFrame, {
      accessibilityLabel: "Dialog Close",
      tag: isInsideButton ? "span" : "button",
      ...closeProps,
      ref: forwardedRef,
      onPress: composeEventHandlers(props.onPress, () => {
        context.onOpenChange(!1);
      })
    });
  });
function getState(open) {
  return open ? "open" : "closed";
}
const TITLE_WARNING_NAME = "DialogTitleWarning",
  [DialogWarningProvider, useWarningContext] = createContext(TITLE_WARNING_NAME, {
    contentName: CONTENT_NAME,
    titleName: "DialogTitle",
    docsSlug: "dialog"
  }),
  TitleWarning = ({
    titleId
  }) => {
    if (process.env.NODE_ENV === "development") {
      const titleWarningContext = useWarningContext(TITLE_WARNING_NAME),
        MESSAGE = `\`${titleWarningContext.contentName}\` wants a \`${titleWarningContext.titleName}\` to be accessible. If you want to hide the \`${titleWarningContext.titleName}\`, wrap it with <VisuallyHidden />.`;
      React.useEffect(() => {
        isWeb && titleId && (document.getElementById(titleId) || console.warn(MESSAGE));
      }, [MESSAGE, titleId]);
    }
    return null;
  },
  DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning",
  DescriptionWarning = ({
    contentRef,
    descriptionId
  }) => {
    if (process.env.NODE_ENV === "development") {
      const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${useWarningContext(DESCRIPTION_WARNING_NAME).contentName}}.`;
      React.useEffect(() => {
        if (!isWeb) return;
        const contentNode = contentRef.current;
        if (!(contentNode instanceof HTMLElement)) return;
        const describedById = contentNode.getAttribute("aria-describedby");
        descriptionId && describedById && (document.getElementById(descriptionId) || console.warn(MESSAGE));
      }, [MESSAGE, contentRef, descriptionId]);
    }
    return null;
  },
  Dialog = withStaticProperties(React.forwardRef(function (props, ref) {
    const {
        scope = "",
        children,
        open: openProp,
        defaultOpen = !1,
        onOpenChange,
        modal = !0,
        disableRemoveScroll = !1
      } = props,
      baseId = React.useId(),
      dialogId = `Dialog-${scope}-${baseId}`,
      contentId = `${dialogId}-content`,
      titleId = `${dialogId}-title`,
      descriptionId = `${dialogId}-description`,
      triggerRef = React.useRef(null),
      contentRef = React.useRef(null),
      [open, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
      }),
      onOpenToggle = React.useCallback(() => {
        setOpen(prevOpen => !prevOpen);
      }, [setOpen]),
      adaptScope = `DialogAdapt${scope}`,
      context = {
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
    return React.useImperativeHandle(ref, () => ({
      open: setOpen
    }), [setOpen]), /* @__PURE__ */jsx(AdaptParent, {
      scope: adaptScope,
      portal: {
        forwardProps: props
      },
      children: /* @__PURE__ */jsx(DialogProvider, {
        scope,
        ...context,
        children: /* @__PURE__ */jsx(DialogSheetController, {
          onOpenChange: setOpen,
          scope,
          children
        })
      })
    });
  }), {
    Trigger: DialogTrigger,
    Portal: DialogPortal,
    Overlay: DialogOverlay,
    Content: DialogContent,
    Title: DialogTitle,
    Description: DialogDescription,
    Close: DialogClose,
    Sheet: Sheet.Controlled,
    FocusScope: FocusScopeController,
    Adapt
  });
const DialogSheetController = props => {
  const context = useDialogContext(props.scope),
    isAdapted = useAdaptIsActive(context.adaptScope);
  return /* @__PURE__ */jsx(SheetController, {
    onOpenChange: val => {
      isAdapted && props.onOpenChange?.(val);
    },
    open: context.open,
    hidden: !isAdapted,
    children: props.children
  });
};
export { Dialog, DialogClose, DialogContent, DialogContext, DialogDescription, DialogOverlay, DialogOverlayFrame, DialogPortal, DialogPortalFrame, DialogProvider, DialogTitle, DialogTrigger, DialogWarningProvider, useDialogContext };
//# sourceMappingURL=Dialog.mjs.map
