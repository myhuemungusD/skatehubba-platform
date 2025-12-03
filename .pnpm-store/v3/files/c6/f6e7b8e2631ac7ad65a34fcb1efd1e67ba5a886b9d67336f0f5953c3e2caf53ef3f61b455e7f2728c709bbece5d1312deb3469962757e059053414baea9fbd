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
var AlertDialog_exports = {};
__export(AlertDialog_exports, {
  AlertDialog: () => AlertDialog,
  AlertDialogAction: () => AlertDialogAction,
  AlertDialogCancel: () => AlertDialogCancel,
  AlertDialogContent: () => AlertDialogContent,
  AlertDialogDescription: () => AlertDialogDescription,
  AlertDialogOverlay: () => AlertDialogOverlay,
  AlertDialogPortal: () => AlertDialogPortal,
  AlertDialogTitle: () => AlertDialogTitle,
  AlertDialogTrigger: () => AlertDialogTrigger
});
module.exports = __toCommonJS(AlertDialog_exports);
var import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_dialog = require("@tamagui/dialog"),
  import_helpers = require("@tamagui/helpers"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  React = __toESM(require("react"), 1),
  import_react_native = require("react-native-web"),
  import_jsx_runtime = require("react/jsx-runtime");
const getAlertDialogScope = scope => scope,
  ROOT_NAME = "AlertDialog",
  TRIGGER_NAME = "AlertDialogTrigger",
  NativeAlertDialogTriggerFrame = (0, import_core.styled)(import_core.View, {
    name: TRIGGER_NAME
  }),
  AlertDialogTrigger = NativeAlertDialogTriggerFrame.styleable(function (props, forwardedRef) {
    if (props.__native) {
      const {
        __native,
        onPress,
        __onPress,
        ...rest
      } = props;
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(NativeAlertDialogTriggerFrame, {
        ...rest,
        onPress: (0, import_helpers.composeEventHandlers)(onPress, __onPress)
      });
    }
    const {
      scope,
      ...triggerProps
    } = props;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.DialogTrigger, {
      scope: getAlertDialogScope(scope),
      ...triggerProps,
      ref: forwardedRef
    });
  });
const AlertDialogPortal = function (props) {
    const {
      scope,
      ...portalProps
    } = props;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.DialogPortal, {
      scope: getAlertDialogScope(scope),
      ...portalProps
    });
  },
  OVERLAY_NAME = "AlertDialogOverlay",
  AlertDialogOverlayFrame = (0, import_core.styled)(import_dialog.DialogOverlayFrame, {
    name: OVERLAY_NAME
  }),
  AlertDialogOverlay = AlertDialogOverlayFrame.styleable(function (props, forwardedRef) {
    const {
      scope,
      ...overlayProps
    } = props;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.DialogOverlay, {
      scope: getAlertDialogScope(scope),
      ...overlayProps,
      ref: forwardedRef
    });
  }),
  CONTENT_NAME = "AlertDialogContent",
  {
    Provider: AlertDialogContextProvider,
    useStyledContext: useAlertDialogContentContext
  } = (0, import_core.createStyledContext)({}, "AlertDialogContext"),
  AlertDialogContent = React.forwardRef(function (props, forwardedRef) {
    const {
        scope,
        children,
        ...contentProps
      } = props,
      dialogScope = getAlertDialogScope(scope),
      contentRef = React.useRef(null),
      composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, contentRef),
      cancelRef = React.useRef(null);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.DialogWarningProvider, {
      contentName: CONTENT_NAME,
      titleName: TITLE_NAME,
      docsSlug: "alert-dialog",
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(AlertDialogContextProvider, {
        scope,
        cancelRef,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_dialog.DialogContent, {
          role: "alertdialog",
          "aria-modal": !0,
          scope: dialogScope,
          ...contentProps,
          ref: composedRefs,
          onOpenAutoFocus: (0, import_helpers.composeEventHandlers)(contentProps.onOpenAutoFocus, event => {
            event.preventDefault(), import_constants.isWeb && cancelRef.current?.focus({
              preventScroll: !0
            });
          }),
          onPointerDownOutside: event => event.preventDefault(),
          onInteractOutside: event => event.preventDefault(),
          children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.Slottable, {
            children
          }), process.env.NODE_ENV === "development" && /* @__PURE__ */(0, import_jsx_runtime.jsx)(DescriptionWarning, {
            contentRef
          })]
        })
      })
    });
  }),
  TITLE_NAME = "AlertDialogTitle",
  AlertDialogTitleFrame = (0, import_core.styled)(import_core.View, {
    name: TITLE_NAME
  }),
  AlertDialogTitle = AlertDialogTitleFrame.styleable(function (props, forwardedRef) {
    const {
      scope,
      ...titleProps
    } = props;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.DialogTitle, {
      scope: getAlertDialogScope(scope),
      ...titleProps,
      ref: forwardedRef
    });
  }),
  DESCRIPTION_NAME = "AlertDialogDescription",
  AlertDialogDescriptionFrame = (0, import_core.styled)(import_core.View, {
    name: DESCRIPTION_NAME
  }),
  AlertDialogDescription = AlertDialogDescriptionFrame.styleable(function (props, forwardedRef) {
    const {
      scope,
      ...descriptionProps
    } = props;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.DialogDescription, {
      scope: getAlertDialogScope(scope),
      ...descriptionProps,
      ref: forwardedRef
    });
  }),
  ACTION_NAME = "AlertDialogAction",
  AlertDialogActionFrame = (0, import_core.styled)(import_core.View, {
    name: ACTION_NAME
  }),
  AlertDialogAction = AlertDialogActionFrame.styleable(function (props, forwardedRef) {
    const {
      scope,
      ...actionProps
    } = props;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.DialogClose, {
      scope: getAlertDialogScope(scope),
      ...actionProps,
      ref: forwardedRef
    });
  }),
  CANCEL_NAME = "AlertDialogCancel",
  AlertDialogCancelFrame = (0, import_core.styled)(import_core.View, {
    name: CANCEL_NAME
  }),
  AlertDialogCancel = AlertDialogCancelFrame.styleable(function (props, forwardedRef) {
    const {
        scope,
        ...cancelProps
      } = props,
      {
        cancelRef
      } = useAlertDialogContentContext(scope),
      ref = (0, import_compose_refs.useComposedRefs)(forwardedRef, cancelRef);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.DialogClose, {
      scope: getAlertDialogScope(scope),
      ...cancelProps,
      ref
    });
  }),
  DescriptionWarning = ({
    contentRef
  }) => (process.env.NODE_ENV === "development" && React.useEffect(() => {
    if (!import_constants.isWeb) return;
    document.getElementById(
    // @ts-ignore
    contentRef.current?.getAttribute("aria-describedby")) || console.warn(`\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.
  
        You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.
        
        Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.
        
        For more information, see https://tamagui.dev/docs/components/alert-dialog`);
  }, [contentRef]), null),
  AlertDialogInner = props => {
    const {
        scope,
        native,
        ...alertDialogProps
      } = props,
      dialogScope = getAlertDialogScope(scope);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.Dialog, {
      scope: dialogScope,
      ...alertDialogProps,
      modal: !0
    });
  };
const AlertDialog = (0, import_helpers.withStaticProperties)(AlertDialogInner, {
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