"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var createSheet_exports = {};
__export(createSheet_exports, {
  createSheet: () => createSheet
});
module.exports = __toCommonJS(createSheet_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_helpers = require("@tamagui/helpers"),
  import_portal = require("@tamagui/portal"),
  import_remove_scroll = require("@tamagui/remove-scroll"),
  import_use_did_finish_ssr = require("@tamagui/use-did-finish-ssr"),
  import_z_index_stack = require("@tamagui/z-index-stack"),
  import_react = require("react"),
  import_react_native = require("react-native"),
  import_constants2 = require("./constants.native.js"),
  import_nativeSheet = require("./nativeSheet.native.js"),
  import_SheetContext = require("./SheetContext.native.js"),
  import_SheetImplementationCustom = require("./SheetImplementationCustom.native.js"),
  import_SheetScrollView = require("./SheetScrollView.native.js"),
  import_useSheetController = require("./useSheetController.native.js"),
  import_useSheetOffscreenSize = require("./useSheetOffscreenSize.native.js");
function createSheet(param) {
  var {
      Handle,
      Frame,
      Overlay
    } = param,
    SheetHandle = Handle.styleable(function (param2, forwardedRef) {
      var {
          __scopeSheet,
          ...props
        } = param2,
        context = (0, import_SheetContext.useSheetContext)(import_constants2.SHEET_HANDLE_NAME, __scopeSheet),
        composedRef = (0, import_compose_refs.useComposedRefs)(context.handleRef, forwardedRef);
      return context.onlyShowFrame ? null :
      // @ts-ignore
      /* @__PURE__ */
      (0, import_jsx_runtime.jsx)(Handle, {
        ref: composedRef,
        onPress: function () {
          var max = context.snapPoints.length + (context.dismissOnSnapToBottom ? -1 : 0),
            nextPos = (context.position + 1) % max;
          context.setPosition(nextPos);
        },
        open: context.open,
        ...props
      });
    }),
    SheetOverlay = Overlay.extractable(/* @__PURE__ */(0, import_react.memo)(function (propsIn) {
      var {
          __scopeSheet,
          ...props
        } = propsIn,
        context = (0, import_SheetContext.useSheetContext)(import_constants2.SHEET_OVERLAY_NAME, __scopeSheet),
        element = (0, import_react.useMemo)(function () {
          return (
            // @ts-ignore
            /* @__PURE__ */
            (0, import_jsx_runtime.jsx)(Overlay, {
              ...props,
              onPress: (0, import_helpers.composeEventHandlers)(props.onPress, context.dismissOnOverlayPress ? function () {
                context.setOpen(!1);
              } : void 0)
            })
          );
        }, [props.onPress, props.opacity, context.dismissOnOverlayPress]);
      return (0, import_constants.useIsomorphicLayoutEffect)(function () {
        var _context_onOverlayComponent;
        (_context_onOverlayComponent = context.onOverlayComponent) === null || _context_onOverlayComponent === void 0 || _context_onOverlayComponent.call(context, element);
      }, [element]), context.onlyShowFrame, null;
    })),
    SheetFrame = Frame.extractable(/* @__PURE__ */(0, import_react.forwardRef)(function (param2, forwardedRef) {
      var {
          __scopeSheet,
          adjustPaddingForOffscreenContent,
          disableHideBottomOverflow,
          children,
          ...props
        } = param2,
        context = (0, import_SheetContext.useSheetContext)(import_constants2.SHEET_NAME, __scopeSheet),
        {
          hasFit,
          removeScrollEnabled = !0,
          frameSize,
          contentRef,
          open
        } = context,
        composedContentRef = (0, import_compose_refs.useComposedRefs)(forwardedRef, contentRef),
        offscreenSize = (0, import_useSheetOffscreenSize.useSheetOffscreenSize)(context),
        stableFrameSize = (0, import_react.useRef)(frameSize);
      (0, import_react.useEffect)(function () {
        open && frameSize && (stableFrameSize.current = frameSize);
      }, [open, frameSize]);
      var sheetContents = (0, import_react.useMemo)(function () {
        var shouldUseFixedHeight = hasFit && !open && stableFrameSize.current;
        return (
          // @ts-expect-error
          /* @__PURE__ */
          (0, import_jsx_runtime.jsxs)(Frame, {
            ref: composedContentRef,
            flex: hasFit && open ? 0 : 1,
            height: shouldUseFixedHeight ? stableFrameSize.current : hasFit ? void 0 : frameSize,
            pointerEvents: open ? "auto" : "none",
            ...props,
            children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_z_index_stack.StackZIndexContext, {
              zIndex: (0, import_portal.resolveViewZIndex)(props.zIndex),
              children
            }), adjustPaddingForOffscreenContent && /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.Stack, {
              "data-sheet-offscreen-pad": !0,
              height: offscreenSize,
              width: "100%"
            })]
          })
        );
      }, [open, props, frameSize, offscreenSize, adjustPaddingForOffscreenContent, hasFit]);
      return /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
        children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_remove_scroll.RemoveScroll, {
          enabled: removeScrollEnabled && context.open,
          children: sheetContents
        }), /* below frame hide when bouncing past 100% */
        !disableHideBottomOverflow &&
        // @ts-ignore
        /* @__PURE__ */
        (0, import_jsx_runtime.jsx)(Frame, {
          ...props,
          "data-testid": "ensure-sheet-cover-not-overlapping",
          componentName: "SheetCover",
          // biome-ignore lint/correctness/noChildrenProp: <explanation>
          children: null,
          position: "absolute",
          bottom: "-100%",
          zIndex: -1,
          height: context.frameSize,
          left: 0,
          right: 0,
          borderWidth: 0,
          borderRadius: 0,
          shadowOpacity: 0
        })]
      });
    })),
    Sheet = /* @__PURE__ */(0, import_react.forwardRef)(function (props, ref) {
      var hydrated = (0, import_use_did_finish_ssr.useDidFinishSSR)(),
        {
          isShowingNonSheet
        } = (0, import_useSheetController.useSheetController)(),
        SheetImplementation = import_SheetImplementationCustom.SheetImplementationCustom;
      if (props.native && import_react_native.Platform.OS === "ios") {
        var impl = (0, import_nativeSheet.getNativeSheet)("ios");
        impl && (SheetImplementation = impl);
      }
      return isShowingNonSheet || !hydrated ? null : /* @__PURE__ */(0, import_jsx_runtime.jsx)(SheetImplementation, {
        ref,
        ...props
      });
    }),
    components = {
      Frame: SheetFrame,
      Overlay: SheetOverlay,
      Handle: SheetHandle,
      ScrollView: import_SheetScrollView.SheetScrollView
    },
    Controlled = (0, import_helpers.withStaticProperties)(Sheet, components);
  return (0, import_helpers.withStaticProperties)(Sheet, {
    ...components,
    Controlled
  });
}
//# sourceMappingURL=createSheet.native.js.map
