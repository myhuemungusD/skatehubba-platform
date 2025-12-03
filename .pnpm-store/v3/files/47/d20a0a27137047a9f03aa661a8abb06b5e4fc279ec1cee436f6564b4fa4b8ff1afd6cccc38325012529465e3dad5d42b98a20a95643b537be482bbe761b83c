var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var nativeSheet_exports = {};
__export(nativeSheet_exports, {
  getNativeSheet: () => getNativeSheet,
  setupNativeSheet: () => setupNativeSheet
});
module.exports = __toCommonJS(nativeSheet_exports);
var import_stacks = require("@tamagui/stacks"), import_react = require("react"), import_react_native = require("react-native-web"), import_SheetContext = require("./SheetContext"), import_useSheetOpenState = require("./useSheetOpenState"), import_useSheetProviderProps = require("./useSheetProviderProps"), import_jsx_runtime = require("react/jsx-runtime");
const nativeSheets = {
  ios: null
};
function getNativeSheet(platform) {
  return nativeSheets[platform];
}
function setupNativeSheet(platform, RNIOSModal) {
  const { ModalSheetView, ModalSheetViewMainContent } = RNIOSModal;
  platform === "ios" && (nativeSheets[platform] = (props) => {
    const state = (0, import_useSheetOpenState.useSheetOpenState)(props), providerProps = (0, import_useSheetProviderProps.useSheetProviderProps)(props, state), { open, setOpen } = state, ref = (0, import_react.useRef)(void 0);
    (0, import_react.useEffect)(() => {
      open ? ref.current?.presentModal() : ref.current?.dismissModal();
    }, [open]);
    function setOpenInternal(next) {
      props.onOpenChange?.(open), setOpen(next);
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_SheetContext.SheetProvider, { setHasScrollView: emptyFn, ...providerProps, onlyShowFrame: !0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSheetView, { ref, onModalDidDismiss: () => setOpenInternal(!1), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalSheetViewMainContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_native.View, { style: { flex: 1 }, children: props.children }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_stacks.YStack,
        {
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: 0,
          height: 0,
          children: props.children
        }
      )
    ] }) });
  });
}
const emptyFn = () => {
};
//# sourceMappingURL=nativeSheet.js.map
