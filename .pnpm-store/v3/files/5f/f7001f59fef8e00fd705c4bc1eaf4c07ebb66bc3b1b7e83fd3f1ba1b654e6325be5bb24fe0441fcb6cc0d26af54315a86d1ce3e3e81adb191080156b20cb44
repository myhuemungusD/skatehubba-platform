import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { YStack } from "@tamagui/stacks";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { SheetProvider } from "./SheetContext.native.js";
import { useSheetOpenState } from "./useSheetOpenState.native.js";
import { useSheetProviderProps } from "./useSheetProviderProps.native.js";
var nativeSheets = {
  ios: null
};
function getNativeSheet(platform) {
  return nativeSheets[platform];
}
function setupNativeSheet(platform, RNIOSModal) {
  var {
    ModalSheetView,
    ModalSheetViewMainContent
  } = RNIOSModal;
  platform === "ios" && (nativeSheets[platform] = function (props) {
    var state = useSheetOpenState(props),
      providerProps = useSheetProviderProps(props, state),
      {
        open,
        setOpen
      } = state,
      ref = useRef(void 0);
    useEffect(function () {
      if (open) {
        var _ref_current;
        (_ref_current = ref.current) === null || _ref_current === void 0 || _ref_current.presentModal();
      } else {
        var _ref_current1;
        (_ref_current1 = ref.current) === null || _ref_current1 === void 0 || _ref_current1.dismissModal();
      }
    }, [open]);
    function setOpenInternal(next) {
      var _props_onOpenChange;
      (_props_onOpenChange = props.onOpenChange) === null || _props_onOpenChange === void 0 || _props_onOpenChange.call(props, open), setOpen(next);
    }
    return /* @__PURE__ */_jsx(_Fragment, {
      children: /* @__PURE__ */_jsxs(SheetProvider, {
        setHasScrollView: emptyFn,
        ...providerProps,
        onlyShowFrame: !0,
        children: [/* @__PURE__ */_jsx(ModalSheetView, {
          ref,
          onModalDidDismiss: function () {
            return setOpenInternal(!1);
          },
          children: /* @__PURE__ */_jsx(ModalSheetViewMainContent, {
            children: /* @__PURE__ */_jsx(View, {
              style: {
                flex: 1
              },
              children: props.children
            })
          })
        }), /* for some reason select triggers wont show on native if this isn't inside the actual tree not inside implementation... */
        /* so just hiding it here for now... not great... */
        /* @__PURE__ */_jsx(YStack, {
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
var emptyFn = function () {};
export { getNativeSheet, setupNativeSheet };
//# sourceMappingURL=nativeSheet.native.js.map
