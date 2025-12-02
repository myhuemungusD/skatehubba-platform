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
var import_jsx_runtime = require("react/jsx-runtime"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_dialog = require("@tamagui/dialog"),
  import_helpers = require("@tamagui/helpers"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  React = __toESM(require("react"), 1),
  import_react_native = require("react-native"),
  getAlertDialogScope = function (scope) {
    return scope;
  },
  ROOT_NAME = "AlertDialog",
  TRIGGER_NAME = "AlertDialogTrigger",
  NativeAlertDialogTriggerFrame = (0, import_core.styled)(import_core.View, {
    name: TRIGGER_NAME
  }),
  AlertDialogTrigger = NativeAlertDialogTriggerFrame.styleable(function (props, forwardedRef) {
    if (props.__native) {
      var {
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
    var {
      scope,
      ...triggerProps
    } = props;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.DialogTrigger, {
      scope: getAlertDialogScope(scope),
      ...triggerProps,
      ref: forwardedRef
    });
  });
var AlertDialogPortal = function (props) {
    var {
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
    var {
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
  AlertDialogContent = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
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
          onOpenAutoFocus: (0, import_helpers.composeEventHandlers)(contentProps.onOpenAutoFocus, function (event) {
            if (event.preventDefault(), import_constants.isWeb) {
              var _cancelRef_current;
              (_cancelRef_current = cancelRef.current) === null || _cancelRef_current === void 0 || _cancelRef_current.focus({
                preventScroll: !0
              });
            }
          }),
          onPointerDownOutside: function (event) {
            return event.preventDefault();
          },
          onInteractOutside: function (event) {
            return event.preventDefault();
          },
          children: [
          /**
          * We have to use `Slottable` here as we cannot wrap the `AlertDialogContentProvider`
          * around everything, otherwise the `DescriptionWarning` would be rendered straight away.
          * This is because we want the accessibility checks to run only once the content is actually
          * open and that behaviour is already encapsulated in `DialogContent`.
          */
          /* @__PURE__ */
          (0, import_jsx_runtime.jsx)(import_core.Slottable, {
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
    var {
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
    var {
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
    var {
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
    var {
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
  DescriptionWarning = function (param) {
    var {
      contentRef
    } = param;
    return process.env.NODE_ENV === "development" && React.useEffect(function () {
      var _contentRef_current;
      if (import_constants.isWeb) {
        var hasDescription = document.getElementById((_contentRef_current = contentRef.current) === null || _contentRef_current === void 0 ? void 0 : _contentRef_current.getAttribute("aria-describedby"));
        hasDescription || console.warn(`\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.
  
        You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.
        
        Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.
        
        For more information, see https://tamagui.dev/docs/components/alert-dialog`);
      }
    }, [contentRef]), null;
  },
  AlertDialogInner = function (props) {
    var {
        scope,
        native,
        ...alertDialogProps
      } = props,
      dialogScope = getAlertDialogScope(scope),
      [open, setOpen] = (0, import_use_controllable_state.useControllableState)({
        prop: props.open,
        defaultProp: props.defaultOpen || !1,
        onChange: props.onOpenChange,
        transition: !0
      }),
      triggerElement = null,
      title = "",
      description = "",
      buttons = [];
    return forEachChildDeep(React.Children.toArray(props.children), function (child) {
      if (! /* @__PURE__ */React.isValidElement(child)) return !1;
      var name = (0, import_core.isTamaguiElement)(child) ? child.type.staticConfig.componentName : child.type.displayName;
      switch (name) {
        case TRIGGER_NAME:
          return triggerElement = /* @__PURE__ */React.cloneElement(child, {
            __native: !0
          }), !1;
        case TITLE_NAME:
          return title = getStringChildren(child), !1;
        case DESCRIPTION_NAME:
          return description = getStringChildren(child), !1;
        case ACTION_NAME:
        case CANCEL_NAME:
          {
            var style = name === ACTION_NAME ? "default" : "cancel",
              text = getStringChildren(child),
              onPress = function () {
                var _childProps_onPress,
                  childProps = child.props;
                childProps == null || (_childProps_onPress = childProps.onPress) === null || _childProps_onPress === void 0 || _childProps_onPress.call(childProps, {
                  native: !0
                }), setOpen(!1);
              };
            return buttons.push({
              style,
              text,
              // @ts-ignore
              onPress
            }), !1;
          }
        default:
          return !0;
      }
    }), (0, import_constants.useIsomorphicLayoutEffect)(function () {
      !open || !native || (title || description) && import_react_native.Alert.alert(title, description, buttons);
    }, [native, open]), native ? /* @__PURE__ */React.cloneElement(triggerElement, {
      __onPress: function () {
        setOpen(!0);
      }
    }) : /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_dialog.Dialog, {
      scope: dialogScope,
      ...alertDialogProps,
      modal: !0
    });
  };
function forEachChildDeep(children, onChild) {
  var _iteratorNormalCompletion = !0,
    _didIteratorError = !1,
    _iteratorError = void 0;
  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var child = _step.value;
      if (/* @__PURE__ */React.isValidElement(child) && onChild(child)) {
        var childProps = child.props;
        childProps.children && forEachChildDeep(React.Children.toArray(childProps.children), onChild);
      }
    }
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError) throw _iteratorError;
    }
  }
}
function getStringChildren(child) {
  var string = "";
  return forEachChildDeep(React.Children.toArray(child), function (child2) {
    return typeof child2.props.children == "string" ? (string = child2.props.children, !1) : !0;
  }), string;
}
var AlertDialog = (0, import_helpers.withStaticProperties)(AlertDialogInner, {
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
//# sourceMappingURL=AlertDialog.native.js.map
