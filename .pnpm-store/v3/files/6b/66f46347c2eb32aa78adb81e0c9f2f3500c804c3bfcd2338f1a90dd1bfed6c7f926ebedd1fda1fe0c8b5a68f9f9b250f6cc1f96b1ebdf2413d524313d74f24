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
var ClientOnly_exports = {};
__export(ClientOnly_exports, {
  ClientOnly: () => ClientOnly,
  ClientOnlyContext: () => ClientOnlyContext
});
module.exports = __toCommonJS(ClientOnly_exports);
var import_react = require("react"),
  import_jsx_runtime = require("react/jsx-runtime");
const ClientOnlyContext = (0, import_react.createContext)(!1),
  ClientOnly = ({
    children,
    enabled
  }) => {
    const existingValue = (0, import_react.useContext)(ClientOnlyContext);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(ClientOnlyContext.Provider, {
      value: enabled ?? existingValue,
      children
    });
  };