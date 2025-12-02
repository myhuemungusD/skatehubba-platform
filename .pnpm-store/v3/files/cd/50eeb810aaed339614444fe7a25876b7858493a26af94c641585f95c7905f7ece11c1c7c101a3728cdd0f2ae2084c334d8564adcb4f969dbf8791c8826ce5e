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
var import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_helpers = require("@tamagui/helpers"),
  import_portal = require("@tamagui/portal"),
  import_remove_scroll = require("@tamagui/remove-scroll"),
  import_use_did_finish_ssr = require("@tamagui/use-did-finish-ssr"),
  import_z_index_stack = require("@tamagui/z-index-stack"),
  import_react = require("react"),
  import_react_native = require("react-native-web"),
  import_constants2 = require("./constants.cjs"),
  import_nativeSheet = require("./nativeSheet.cjs"),
  import_SheetContext = require("./SheetContext.cjs"),
  import_SheetImplementationCustom = require("./SheetImplementationCustom.cjs"),
  import_SheetScrollView = require("./SheetScrollView.cjs"),
  import_useSheetController = require("./useSheetController.cjs"),
  import_useSheetOffscreenSize = require("./useSheetOffscreenSize.cjs"),
  import_jsx_runtime =
  // @ts-ignore
  require("react/jsx-runtime");
function createSheet({
  Handle,
  Frame,
  Overlay
}) {
  const SheetHandle = Handle.styleable(({
      __scopeSheet,
      ...props
    }, forwardedRef) => {
      const context = (0, import_SheetContext.useSheetContext)(import_constants2.SHEET_HANDLE_NAME, __scopeSheet),
        composedRef = (0, import_compose_refs.useComposedRefs)(context.handleRef, forwardedRef);
      return context.onlyShowFrame ? null : /* @__PURE__ */(0, import_jsx_runtime.jsx)(Handle, {
        ref: composedRef,
        onPress: () => {
          const max = context.snapPoints.length + (context.dismissOnSnapToBottom ? -1 : 0),
            nextPos = (context.position + 1) % max;
          context.setPosition(nextPos);
        },
        open: context.open,
        ...props
      });
    }),
    SheetOverlay = Overlay.extractable((0, import_react.memo)(propsIn => {
      const {
          __scopeSheet,
          ...props
        } = propsIn,
        context = (0, import_SheetContext.useSheetContext)(import_constants2.SHEET_OVERLAY_NAME, __scopeSheet),
        element = (0, import_react.useMemo)(() =>
        // @ts-ignore
        /* @__PURE__ */
        (0, import_jsx_runtime.jsx)(Overlay, {
          ...props,
          onPress: (0, import_helpers.composeEventHandlers)(props.onPress, context.dismissOnOverlayPress ? () => {
            context.setOpen(!1);
          } : void 0)
        }), [props.onPress, props.opacity, context.dismissOnOverlayPress]);
      return (0, import_constants.useIsomorphicLayoutEffect)(() => {
        context.onOverlayComponent?.(element);
      }, [element]), context.onlyShowFrame, null;
    })),
    SheetFrame = Frame.extractable((0, import_react.forwardRef)(({
      __scopeSheet,
      adjustPaddingForOffscreenContent,
      disableHideBottomOverflow,
      children,
      ...props
    }, forwardedRef) => {
      const context = (0, import_SheetContext.useSheetContext)(import_constants2.SHEET_NAME, __scopeSheet),
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
      (0, import_react.useEffect)(() => {
        open && frameSize && (stableFrameSize.current = frameSize);
      }, [open, frameSize]);
      const sheetContents = (0, import_react.useMemo)(() => {
        const shouldUseFixedHeight = hasFit && !open && stableFrameSize.current;
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
        }), !disableHideBottomOverflow &&
        // @ts-ignore
        /* @__PURE__ */
        (0, import_jsx_runtime.jsx)(Frame, {
          ...props,
          "data-testid": "ensure-sheet-cover-not-overlapping",
          componentName: "SheetCover",
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
    Sheet = (0, import_react.forwardRef)(function (props, ref) {
      const hydrated = (0, import_use_did_finish_ssr.useDidFinishSSR)(),
        {
          isShowingNonSheet
        } = (0, import_useSheetController.useSheetController)();
      let SheetImplementation = import_SheetImplementationCustom.SheetImplementationCustom;
      return props.native && import_react_native.Platform.OS, isShowingNonSheet || !hydrated ? null : /* @__PURE__ */(0, import_jsx_runtime.jsx)(SheetImplementation, {
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