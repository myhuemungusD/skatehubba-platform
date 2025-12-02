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
var nativeSheet_exports = {};
__export(nativeSheet_exports, {
  getNativeSheet: () => getNativeSheet,
  setupNativeSheet: () => setupNativeSheet
});
module.exports = __toCommonJS(nativeSheet_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_stacks = require("@tamagui/stacks"),
  import_react = require("react"),
  import_react_native = require("react-native"),
  import_SheetContext = require("./SheetContext.native.js"),
  import_useSheetOpenState = require("./useSheetOpenState.native.js"),
  import_useSheetProviderProps = require("./useSheetProviderProps.native.js"),
  nativeSheets = {
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
    var state = (0, import_useSheetOpenState.useSheetOpenState)(props),
      providerProps = (0, import_useSheetProviderProps.useSheetProviderProps)(props, state),
      {
        open,
        setOpen
      } = state,
      ref = (0, import_react.useRef)(void 0);
    (0, import_react.useEffect)(function () {
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
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
      children: /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_SheetContext.SheetProvider, {
        setHasScrollView: emptyFn,
        ...providerProps,
        onlyShowFrame: !0,
        children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(ModalSheetView, {
          ref,
          onModalDidDismiss: function () {
            return setOpenInternal(!1);
          },
          children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(ModalSheetViewMainContent, {
            children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_native.View, {
              style: {
                flex: 1
              },
              children: props.children
            })
          })
        }), /* for some reason select triggers wont show on native if this isn't inside the actual tree not inside implementation... */
        /* so just hiding it here for now... not great... */
        /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_stacks.YStack, {
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
//# sourceMappingURL=nativeSheet.native.js.map
