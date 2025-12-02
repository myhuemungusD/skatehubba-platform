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
var StackZIndex_exports = {};
__export(StackZIndex_exports, {
  StackZIndexContext: () => StackZIndexContext
});
module.exports = __toCommonJS(StackZIndex_exports);
var import_react = require("react"),
  import_context = require("./context.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const StackZIndexContext = ({
  children,
  zIndex
}) => {
  const existing = (0, import_react.useContext)(import_context.ZIndexStackContext);
  let content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_context.ZIndexStackContext.Provider, {
    value: existing + 1,
    children
  });
  return typeof zIndex < "u" && (content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_context.ZIndexHardcodedContext.Provider, {
    value: zIndex,
    children: content
  })), content;
};