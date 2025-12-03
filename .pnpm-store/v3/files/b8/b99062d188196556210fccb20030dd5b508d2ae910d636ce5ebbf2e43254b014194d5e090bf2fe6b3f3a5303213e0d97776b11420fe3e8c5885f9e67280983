var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var useFloatingContext_exports = {};
__export(useFloatingContext_exports, {
  useFloatingContext: () => useFloatingContext
});
module.exports = __toCommonJS(useFloatingContext_exports);
var import_react = __toESM(require("react"), 1), import_react2 = require("@floating-ui/react");
const useFloatingContext = ({
  open,
  setOpen,
  disable,
  disableFocus,
  hoverable
}) => import_react.default.useCallback(
  (props) => {
    const floating = (0, import_react2.useFloating)({
      ...props,
      open,
      onOpenChange: (val, event) => {
        const type = event?.type === "mousemove" || event?.type === "mouseenter" || event?.type === "mouseleave" ? "hover" : "press";
        setOpen(val, type);
      }
    }), { getReferenceProps, getFloatingProps } = (0, import_react2.useInteractions)([
      hoverable ? (0, import_react2.useHover)(floating.context, {
        enabled: !disable && hoverable,
        handleClose: (0, import_react2.safePolygon)({
          requireIntent: !0,
          blockPointerEvents: !0,
          buffer: 1
        }),
        ...hoverable && typeof hoverable == "object" && hoverable
      }) : (0, import_react2.useHover)(floating.context, {
        enabled: !1
      }),
      (0, import_react2.useFocus)(floating.context, {
        enabled: !disable && !disableFocus,
        visibleOnly: !0
      }),
      (0, import_react2.useRole)(floating.context, { role: "dialog" }),
      (0, import_react2.useDismiss)(floating.context, {
        enabled: !disable
      })
    ]);
    return {
      ...floating,
      open,
      getReferenceProps,
      getFloatingProps
    };
  },
  [open, setOpen, disable, disableFocus, hoverable]
);
//# sourceMappingURL=useFloatingContext.js.map
