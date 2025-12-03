import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";
import {
  Slottable,
  View,
  createStyledContext,
  styled
} from "@tamagui/core";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogOverlayFrame,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogWarningProvider
} from "@tamagui/dialog";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";

import * as React from "react";

import { jsx, jsxs } from "react/jsx-runtime";
const getAlertDialogScope = (scope) => scope, ROOT_NAME = "AlertDialog", TRIGGER_NAME = "AlertDialogTrigger", NativeAlertDialogTriggerFrame = styled(View, {
  name: TRIGGER_NAME
}), AlertDialogTrigger = NativeAlertDialogTriggerFrame.styleable(
  function(props, forwardedRef) {
    if (props.__native) {
      const { __native, onPress, __onPress, ...rest } = props;
      return /* @__PURE__ */ jsx(
        NativeAlertDialogTriggerFrame,
        {
          ...rest,
          onPress: composeEventHandlers(onPress, __onPress)
        }
      );
    }
    const { scope, ...triggerProps } = props;
    return /* @__PURE__ */ jsx(
      DialogTrigger,
      {
        scope: getAlertDialogScope(scope),
        ...triggerProps,
        ref: forwardedRef
      }
    );
  }
);
const AlertDialogPortal = function(props) {
  const { scope, ...portalProps } = props;
  return /* @__PURE__ */ jsx(DialogPortal, { scope: getAlertDialogScope(scope), ...portalProps });
}, OVERLAY_NAME = "AlertDialogOverlay", AlertDialogOverlayFrame = styled(DialogOverlayFrame, {
  name: OVERLAY_NAME
}), AlertDialogOverlay = AlertDialogOverlayFrame.styleable(
  function(props, forwardedRef) {
    const { scope, ...overlayProps } = props;
    return /* @__PURE__ */ jsx(
      DialogOverlay,
      {
        scope: getAlertDialogScope(scope),
        ...overlayProps,
        ref: forwardedRef
      }
    );
  }
), CONTENT_NAME = "AlertDialogContent", {
  Provider: AlertDialogContextProvider,
  useStyledContext: useAlertDialogContentContext
} = createStyledContext({}, "AlertDialogContext"), AlertDialogContent = React.forwardRef(
  function(props, forwardedRef) {
    const { scope, children, ...contentProps } = props, dialogScope = getAlertDialogScope(scope), contentRef = React.useRef(null), composedRefs = useComposedRefs(forwardedRef, contentRef), cancelRef = React.useRef(null);
    return /* @__PURE__ */ jsx(
      DialogWarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsx(AlertDialogContextProvider, { scope, cancelRef, children: /* @__PURE__ */ jsxs(
          DialogContent,
          {
            role: "alertdialog",
            "aria-modal": !0,
            scope: dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(
              contentProps.onOpenAutoFocus,
              (event) => {
                event.preventDefault(), isWeb && cancelRef.current?.focus({ preventScroll: !0 });
              }
            ),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsx(Slottable, { children }),
              process.env.NODE_ENV === "development" && /* @__PURE__ */ jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
), TITLE_NAME = "AlertDialogTitle", AlertDialogTitleFrame = styled(View, {
  name: TITLE_NAME
}), AlertDialogTitle = AlertDialogTitleFrame.styleable(
  function(props, forwardedRef) {
    const { scope, ...titleProps } = props;
    return /* @__PURE__ */ jsx(
      DialogTitle,
      {
        scope: getAlertDialogScope(scope),
        ...titleProps,
        ref: forwardedRef
      }
    );
  }
), DESCRIPTION_NAME = "AlertDialogDescription", AlertDialogDescriptionFrame = styled(View, {
  name: DESCRIPTION_NAME
}), AlertDialogDescription = AlertDialogDescriptionFrame.styleable(
  function(props, forwardedRef) {
    const { scope, ...descriptionProps } = props;
    return /* @__PURE__ */ jsx(
      DialogDescription,
      {
        scope: getAlertDialogScope(scope),
        ...descriptionProps,
        ref: forwardedRef
      }
    );
  }
), ACTION_NAME = "AlertDialogAction", AlertDialogActionFrame = styled(View, {
  name: ACTION_NAME
}), AlertDialogAction = AlertDialogActionFrame.styleable(
  function(props, forwardedRef) {
    const { scope, ...actionProps } = props;
    return /* @__PURE__ */ jsx(
      DialogClose,
      {
        scope: getAlertDialogScope(scope),
        ...actionProps,
        ref: forwardedRef
      }
    );
  }
), CANCEL_NAME = "AlertDialogCancel", AlertDialogCancelFrame = styled(View, {
  name: CANCEL_NAME
}), AlertDialogCancel = AlertDialogCancelFrame.styleable(
  function(props, forwardedRef) {
    const { scope, ...cancelProps } = props, { cancelRef } = useAlertDialogContentContext(scope), ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsx(DialogClose, { scope: getAlertDialogScope(scope), ...cancelProps, ref });
  }
), DescriptionWarning = ({ contentRef }) => (process.env.NODE_ENV === "development" && React.useEffect(() => {
  if (!isWeb) return;
  document.getElementById(
    // @ts-ignore
    contentRef.current?.getAttribute("aria-describedby")
  ) || console.warn(`\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.
  
        You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.
        
        Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.
        
        For more information, see https://tamagui.dev/docs/components/alert-dialog`);
}, [contentRef]), null), AlertDialogInner = (props) => {
  const { scope, native, ...alertDialogProps } = props, dialogScope = getAlertDialogScope(scope);
  return /* @__PURE__ */ jsx(Dialog, { scope: dialogScope, ...alertDialogProps, modal: !0 });
};
const AlertDialog = withStaticProperties(AlertDialogInner, {
  Trigger: AlertDialogTrigger,
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription
});
AlertDialog.displayName = ROOT_NAME;
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
};
//# sourceMappingURL=AlertDialog.js.map
