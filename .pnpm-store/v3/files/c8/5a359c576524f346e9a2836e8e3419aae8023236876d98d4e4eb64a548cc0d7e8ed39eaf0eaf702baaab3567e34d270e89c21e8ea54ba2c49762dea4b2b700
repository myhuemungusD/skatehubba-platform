import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { Slottable, View, createStyledContext, isTamaguiElement, styled } from "@tamagui/core";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogOverlayFrame, DialogPortal, DialogTitle, DialogTrigger, DialogWarningProvider } from "@tamagui/dialog";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
import { useControllableState } from "@tamagui/use-controllable-state";
import * as React from "react";
import { Alert } from "react-native";
var getAlertDialogScope = function (scope) {
    return scope;
  },
  ROOT_NAME = "AlertDialog",
  TRIGGER_NAME = "AlertDialogTrigger",
  NativeAlertDialogTriggerFrame = styled(View, {
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
      return /* @__PURE__ */_jsx(NativeAlertDialogTriggerFrame, {
        ...rest,
        onPress: composeEventHandlers(onPress, __onPress)
      });
    }
    var {
      scope,
      ...triggerProps
    } = props;
    return /* @__PURE__ */_jsx(DialogTrigger, {
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
    return /* @__PURE__ */_jsx(DialogPortal, {
      scope: getAlertDialogScope(scope),
      ...portalProps
    });
  },
  OVERLAY_NAME = "AlertDialogOverlay",
  AlertDialogOverlayFrame = styled(DialogOverlayFrame, {
    name: OVERLAY_NAME
  }),
  AlertDialogOverlay = AlertDialogOverlayFrame.styleable(function (props, forwardedRef) {
    var {
      scope,
      ...overlayProps
    } = props;
    return /* @__PURE__ */_jsx(DialogOverlay, {
      scope: getAlertDialogScope(scope),
      ...overlayProps,
      ref: forwardedRef
    });
  }),
  CONTENT_NAME = "AlertDialogContent",
  {
    Provider: AlertDialogContextProvider,
    useStyledContext: useAlertDialogContentContext
  } = createStyledContext({}, "AlertDialogContext"),
  AlertDialogContent = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        scope,
        children,
        ...contentProps
      } = props,
      dialogScope = getAlertDialogScope(scope),
      contentRef = React.useRef(null),
      composedRefs = useComposedRefs(forwardedRef, contentRef),
      cancelRef = React.useRef(null);
    return /* @__PURE__ */_jsx(DialogWarningProvider, {
      contentName: CONTENT_NAME,
      titleName: TITLE_NAME,
      docsSlug: "alert-dialog",
      children: /* @__PURE__ */_jsx(AlertDialogContextProvider, {
        scope,
        cancelRef,
        children: /* @__PURE__ */_jsxs(DialogContent, {
          role: "alertdialog",
          "aria-modal": !0,
          scope: dialogScope,
          ...contentProps,
          ref: composedRefs,
          onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, function (event) {
            if (event.preventDefault(), isWeb) {
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
          _jsx(Slottable, {
            children
          }), process.env.NODE_ENV === "development" && /* @__PURE__ */_jsx(DescriptionWarning, {
            contentRef
          })]
        })
      })
    });
  }),
  TITLE_NAME = "AlertDialogTitle",
  AlertDialogTitleFrame = styled(View, {
    name: TITLE_NAME
  }),
  AlertDialogTitle = AlertDialogTitleFrame.styleable(function (props, forwardedRef) {
    var {
      scope,
      ...titleProps
    } = props;
    return /* @__PURE__ */_jsx(DialogTitle, {
      scope: getAlertDialogScope(scope),
      ...titleProps,
      ref: forwardedRef
    });
  }),
  DESCRIPTION_NAME = "AlertDialogDescription",
  AlertDialogDescriptionFrame = styled(View, {
    name: DESCRIPTION_NAME
  }),
  AlertDialogDescription = AlertDialogDescriptionFrame.styleable(function (props, forwardedRef) {
    var {
      scope,
      ...descriptionProps
    } = props;
    return /* @__PURE__ */_jsx(DialogDescription, {
      scope: getAlertDialogScope(scope),
      ...descriptionProps,
      ref: forwardedRef
    });
  }),
  ACTION_NAME = "AlertDialogAction",
  AlertDialogActionFrame = styled(View, {
    name: ACTION_NAME
  }),
  AlertDialogAction = AlertDialogActionFrame.styleable(function (props, forwardedRef) {
    var {
      scope,
      ...actionProps
    } = props;
    return /* @__PURE__ */_jsx(DialogClose, {
      scope: getAlertDialogScope(scope),
      ...actionProps,
      ref: forwardedRef
    });
  }),
  CANCEL_NAME = "AlertDialogCancel",
  AlertDialogCancelFrame = styled(View, {
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
      ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */_jsx(DialogClose, {
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
      if (isWeb) {
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
      [open, setOpen] = useControllableState({
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
      var name = isTamaguiElement(child) ? child.type.staticConfig.componentName : child.type.displayName;
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
    }), useIsomorphicLayoutEffect(function () {
      !open || !native || (title || description) && Alert.alert(title, description, buttons);
    }, [native, open]), native ? /* @__PURE__ */React.cloneElement(triggerElement, {
      __onPress: function () {
        setOpen(!0);
      }
    }) : /* @__PURE__ */_jsx(Dialog, {
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
var AlertDialog = withStaticProperties(AlertDialogInner, {
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
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger };
//# sourceMappingURL=AlertDialog.native.js.map
