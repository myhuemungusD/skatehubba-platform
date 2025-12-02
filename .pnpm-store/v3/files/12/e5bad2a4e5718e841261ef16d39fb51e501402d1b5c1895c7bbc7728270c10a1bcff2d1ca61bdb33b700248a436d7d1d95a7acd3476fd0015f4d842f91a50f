import { useComposedRefs } from "@tamagui/compose-refs";
import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import { Stack } from "@tamagui/core";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
import { resolveViewZIndex } from "@tamagui/portal";
import { RemoveScroll } from "@tamagui/remove-scroll";
import { useDidFinishSSR } from "@tamagui/use-did-finish-ssr";
import { StackZIndexContext } from "@tamagui/z-index-stack";
import { forwardRef, memo, useMemo, useEffect, useRef } from "react";
import { Platform } from "react-native-web";
import { SHEET_HANDLE_NAME, SHEET_NAME, SHEET_OVERLAY_NAME } from "./constants";

import { useSheetContext } from "./SheetContext";
import { SheetImplementationCustom } from "./SheetImplementationCustom";
import { SheetScrollView } from "./SheetScrollView";
import { useSheetController } from "./useSheetController";
import { useSheetOffscreenSize } from "./useSheetOffscreenSize";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function createSheet({ Handle, Frame, Overlay }) {
  const SheetHandle = Handle.styleable(
    ({ __scopeSheet, ...props }, forwardedRef) => {
      const context = useSheetContext(SHEET_HANDLE_NAME, __scopeSheet), composedRef = useComposedRefs(context.handleRef, forwardedRef);
      return context.onlyShowFrame ? null : (
        // @ts-ignore
        /* @__PURE__ */ jsx(
          Handle,
          {
            ref: composedRef,
            onPress: () => {
              const max = context.snapPoints.length + (context.dismissOnSnapToBottom ? -1 : 0), nextPos = (context.position + 1) % max;
              context.setPosition(nextPos);
            },
            open: context.open,
            ...props
          }
        )
      );
    }
  ), SheetOverlay = Overlay.extractable(
    memo((propsIn) => {
      const { __scopeSheet, ...props } = propsIn, context = useSheetContext(SHEET_OVERLAY_NAME, __scopeSheet), element = useMemo(() => (
        // @ts-ignore
        /* @__PURE__ */ jsx(
          Overlay,
          {
            ...props,
            onPress: composeEventHandlers(
              props.onPress,
              context.dismissOnOverlayPress ? () => {
                context.setOpen(!1);
              } : void 0
            )
          }
        )
      ), [props.onPress, props.opacity, context.dismissOnOverlayPress]);
      return useIsomorphicLayoutEffect(() => {
        context.onOverlayComponent?.(element);
      }, [element]), context.onlyShowFrame, null;
    })
  ), SheetFrame = Frame.extractable(
    forwardRef(
      ({
        __scopeSheet,
        adjustPaddingForOffscreenContent,
        disableHideBottomOverflow,
        children,
        ...props
      }, forwardedRef) => {
        const context = useSheetContext(SHEET_NAME, __scopeSheet), {
          hasFit,
          removeScrollEnabled = !0,
          frameSize,
          contentRef,
          open
        } = context, composedContentRef = useComposedRefs(forwardedRef, contentRef), offscreenSize = useSheetOffscreenSize(context), stableFrameSize = useRef(frameSize);
        useEffect(() => {
          open && frameSize && (stableFrameSize.current = frameSize);
        }, [open, frameSize]);
        const sheetContents = useMemo(() => {
          const shouldUseFixedHeight = hasFit && !open && stableFrameSize.current;
          return (
            // @ts-expect-error
            /* @__PURE__ */ jsxs(
              Frame,
              {
                ref: composedContentRef,
                flex: hasFit && open ? 0 : 1,
                height: shouldUseFixedHeight ? stableFrameSize.current : hasFit ? void 0 : frameSize,
                pointerEvents: open ? "auto" : "none",
                ...props,
                children: [
                  /* @__PURE__ */ jsx(StackZIndexContext, { zIndex: resolveViewZIndex(props.zIndex), children }),
                  adjustPaddingForOffscreenContent && /* @__PURE__ */ jsx(Stack, { "data-sheet-offscreen-pad": !0, height: offscreenSize, width: "100%" })
                ]
              }
            )
          );
        }, [
          open,
          props,
          frameSize,
          offscreenSize,
          adjustPaddingForOffscreenContent,
          hasFit
        ]);
        return /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(RemoveScroll, { enabled: removeScrollEnabled && context.open, children: sheetContents }),
          !disableHideBottomOverflow && // @ts-ignore
          /* @__PURE__ */ jsx(
            Frame,
            {
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
            }
          )
        ] });
      }
    )
  ), Sheet = forwardRef(function(props, ref) {
    const hydrated = useDidFinishSSR(), { isShowingNonSheet } = useSheetController();
    let SheetImplementation = SheetImplementationCustom;
    return props.native && Platform.OS, isShowingNonSheet || !hydrated ? null : /* @__PURE__ */ jsx(SheetImplementation, { ref, ...props });
  }), components = {
    Frame: SheetFrame,
    Overlay: SheetOverlay,
    Handle: SheetHandle,
    ScrollView: SheetScrollView
  }, Controlled = withStaticProperties(Sheet, components);
  return withStaticProperties(Sheet, {
    ...components,
    Controlled
  });
}
export {
  createSheet
};
//# sourceMappingURL=createSheet.js.map
