import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useComposedRefs } from "@tamagui/compose-refs";
import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import { Stack } from "@tamagui/core";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
import { resolveViewZIndex } from "@tamagui/portal";
import { RemoveScroll } from "@tamagui/remove-scroll";
import { useDidFinishSSR } from "@tamagui/use-did-finish-ssr";
import { StackZIndexContext } from "@tamagui/z-index-stack";
import { forwardRef, memo, useMemo, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { SHEET_HANDLE_NAME, SHEET_NAME, SHEET_OVERLAY_NAME } from "./constants.native.js";
import { getNativeSheet } from "./nativeSheet.native.js";
import { useSheetContext } from "./SheetContext.native.js";
import { SheetImplementationCustom } from "./SheetImplementationCustom.native.js";
import { SheetScrollView } from "./SheetScrollView.native.js";
import { useSheetController } from "./useSheetController.native.js";
import { useSheetOffscreenSize } from "./useSheetOffscreenSize.native.js";
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
        context = useSheetContext(SHEET_HANDLE_NAME, __scopeSheet),
        composedRef = useComposedRefs(context.handleRef, forwardedRef);
      return context.onlyShowFrame ? null :
      // @ts-ignore
      /* @__PURE__ */
      _jsx(Handle, {
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
    SheetOverlay = Overlay.extractable(/* @__PURE__ */memo(function (propsIn) {
      var {
          __scopeSheet,
          ...props
        } = propsIn,
        context = useSheetContext(SHEET_OVERLAY_NAME, __scopeSheet),
        element = useMemo(function () {
          return (
            // @ts-ignore
            /* @__PURE__ */
            _jsx(Overlay, {
              ...props,
              onPress: composeEventHandlers(props.onPress, context.dismissOnOverlayPress ? function () {
                context.setOpen(!1);
              } : void 0)
            })
          );
        }, [props.onPress, props.opacity, context.dismissOnOverlayPress]);
      return useIsomorphicLayoutEffect(function () {
        var _context_onOverlayComponent;
        (_context_onOverlayComponent = context.onOverlayComponent) === null || _context_onOverlayComponent === void 0 || _context_onOverlayComponent.call(context, element);
      }, [element]), context.onlyShowFrame, null;
    })),
    SheetFrame = Frame.extractable(/* @__PURE__ */forwardRef(function (param2, forwardedRef) {
      var {
          __scopeSheet,
          adjustPaddingForOffscreenContent,
          disableHideBottomOverflow,
          children,
          ...props
        } = param2,
        context = useSheetContext(SHEET_NAME, __scopeSheet),
        {
          hasFit,
          removeScrollEnabled = !0,
          frameSize,
          contentRef,
          open
        } = context,
        composedContentRef = useComposedRefs(forwardedRef, contentRef),
        offscreenSize = useSheetOffscreenSize(context),
        stableFrameSize = useRef(frameSize);
      useEffect(function () {
        open && frameSize && (stableFrameSize.current = frameSize);
      }, [open, frameSize]);
      var sheetContents = useMemo(function () {
        var shouldUseFixedHeight = hasFit && !open && stableFrameSize.current;
        return (
          // @ts-expect-error
          /* @__PURE__ */
          _jsxs(Frame, {
            ref: composedContentRef,
            flex: hasFit && open ? 0 : 1,
            height: shouldUseFixedHeight ? stableFrameSize.current : hasFit ? void 0 : frameSize,
            pointerEvents: open ? "auto" : "none",
            ...props,
            children: [/* @__PURE__ */_jsx(StackZIndexContext, {
              zIndex: resolveViewZIndex(props.zIndex),
              children
            }), adjustPaddingForOffscreenContent && /* @__PURE__ */_jsx(Stack, {
              "data-sheet-offscreen-pad": !0,
              height: offscreenSize,
              width: "100%"
            })]
          })
        );
      }, [open, props, frameSize, offscreenSize, adjustPaddingForOffscreenContent, hasFit]);
      return /* @__PURE__ */_jsxs(_Fragment, {
        children: [/* @__PURE__ */_jsx(RemoveScroll, {
          enabled: removeScrollEnabled && context.open,
          children: sheetContents
        }), /* below frame hide when bouncing past 100% */
        !disableHideBottomOverflow &&
        // @ts-ignore
        /* @__PURE__ */
        _jsx(Frame, {
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
    Sheet = /* @__PURE__ */forwardRef(function (props, ref) {
      var hydrated = useDidFinishSSR(),
        {
          isShowingNonSheet
        } = useSheetController(),
        SheetImplementation = SheetImplementationCustom;
      if (props.native && Platform.OS === "ios") {
        var impl = getNativeSheet("ios");
        impl && (SheetImplementation = impl);
      }
      return isShowingNonSheet || !hydrated ? null : /* @__PURE__ */_jsx(SheetImplementation, {
        ref,
        ...props
      });
    }),
    components = {
      Frame: SheetFrame,
      Overlay: SheetOverlay,
      Handle: SheetHandle,
      ScrollView: SheetScrollView
    },
    Controlled = withStaticProperties(Sheet, components);
  return withStaticProperties(Sheet, {
    ...components,
    Controlled
  });
}
export { createSheet };
//# sourceMappingURL=createSheet.native.js.map
