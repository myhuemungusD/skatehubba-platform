import { YStack } from "@tamagui/stacks";
import { useEffect, useRef } from "react";
import { View } from "react-native-web";
import { SheetProvider } from "./SheetContext.mjs";
import { useSheetOpenState } from "./useSheetOpenState.mjs";
import { useSheetProviderProps } from "./useSheetProviderProps.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
const nativeSheets = {
  ios: null
};
function getNativeSheet(platform) {
  return nativeSheets[platform];
}
function setupNativeSheet(platform, RNIOSModal) {
  const {
    ModalSheetView,
    ModalSheetViewMainContent
  } = RNIOSModal;
  platform === "ios" && (nativeSheets[platform] = props => {
    const state = useSheetOpenState(props),
      providerProps = useSheetProviderProps(props, state),
      {
        open,
        setOpen
      } = state,
      ref = useRef(void 0);
    useEffect(() => {
      open ? ref.current?.presentModal() : ref.current?.dismissModal();
    }, [open]);
    function setOpenInternal(next) {
      props.onOpenChange?.(open), setOpen(next);
    }
    return /* @__PURE__ */jsx(Fragment, {
      children: /* @__PURE__ */jsxs(SheetProvider, {
        setHasScrollView: emptyFn,
        ...providerProps,
        onlyShowFrame: !0,
        children: [/* @__PURE__ */jsx(ModalSheetView, {
          ref,
          onModalDidDismiss: () => setOpenInternal(!1),
          children: /* @__PURE__ */jsx(ModalSheetViewMainContent, {
            children: /* @__PURE__ */jsx(View, {
              style: {
                flex: 1
              },
              children: props.children
            })
          })
        }), /* @__PURE__ */jsx(YStack, {
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: 0,
          height: 0,
          children: props.children
        })]
      })
    });
  });
}
const emptyFn = () => {};
export { getNativeSheet, setupNativeSheet };
//# sourceMappingURL=nativeSheet.mjs.map
