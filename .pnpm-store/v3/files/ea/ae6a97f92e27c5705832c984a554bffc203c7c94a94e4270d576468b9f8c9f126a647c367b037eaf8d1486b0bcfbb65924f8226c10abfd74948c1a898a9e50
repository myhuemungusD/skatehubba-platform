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
var SelectContent_exports = {};
__export(SelectContent_exports, {
  SelectContent: () => SelectContent
});
module.exports = __toCommonJS(SelectContent_exports);
var import_react = require("@floating-ui/react"), import_core = require("@tamagui/core"), import_focus_scope = require("@tamagui/focus-scope"), import_react2 = __toESM(require("react"), 1), import_context = require("./context"), import_useSelectBreakpointActive = require("./useSelectBreakpointActive"), import_jsx_runtime = require("react/jsx-runtime");
const SelectContent = ({
  children,
  scope,
  zIndex = 1e3,
  ...focusScopeProps
}) => {
  const context = (0, import_context.useSelectContext)(scope), itemParentContext = (0, import_context.useSelectItemParentContext)(scope), themeName = (0, import_core.useThemeName)(), showSheet = (0, import_useSelectBreakpointActive.useShowSelectSheet)(context), contents = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.Theme, { forceClassName: !0, name: themeName, children }), touch = (0, import_core.useIsTouchDevice)(), overlayStyle = import_react2.default.useMemo(() => ({ zIndex, pointerEvents: context.open ? "auto" : "none" }), [context.open]);
  return itemParentContext.shouldRenderWebNative ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : showSheet ? context.open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: contents }) : null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.FloatingPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react.FloatingOverlay,
    {
      style: overlayStyle,
      lockScroll: !context.disablePreventBodyScroll && !!context.open && !touch,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_focus_scope.FocusScope, { loop: !0, enabled: !!context.open, trapped: !0, ...focusScopeProps, children: contents })
    }
  ) });
};
//# sourceMappingURL=SelectContent.js.map
