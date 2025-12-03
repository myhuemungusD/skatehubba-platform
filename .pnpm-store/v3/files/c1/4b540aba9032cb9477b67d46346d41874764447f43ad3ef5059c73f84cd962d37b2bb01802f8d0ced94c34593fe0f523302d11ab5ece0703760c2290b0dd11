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
var context_exports = {};
__export(context_exports, {
  ForwardSelectContext: () => ForwardSelectContext,
  SelectItemParentProvider: () => SelectItemParentProvider,
  SelectProvider: () => SelectProvider,
  useSelectContext: () => useSelectContext,
  useSelectItemParentContext: () => useSelectItemParentContext
});
module.exports = __toCommonJS(context_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_core = require("@tamagui/core"),
  {
    Provider: SelectProvider,
    useStyledContext: useSelectContext
  } = (0, import_core.createStyledContext)(null, "Select"),
  {
    Provider: SelectItemParentProvider,
    useStyledContext: useSelectItemParentContext
  } = (0, import_core.createStyledContext)(null, "SelectItem"),
  ForwardSelectContext = function (param) {
    var {
      context,
      itemContext,
      children
    } = param;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(SelectProvider, {
      isInSheet: !0,
      scope: context.scopeName,
      ...context,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(SelectItemParentProvider, {
        scope: context.scopeName,
        ...itemContext,
        children
      })
    });
  };
//# sourceMappingURL=context.native.js.map
