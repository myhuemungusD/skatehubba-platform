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
var SelectViewport_native_exports = {};
__export(SelectViewport_native_exports, {
  SelectViewport: () => SelectViewport
});
module.exports = __toCommonJS(SelectViewport_native_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_adapt = require("@tamagui/adapt"),
  import_core = require("@tamagui/core"),
  import_constants = require("./constants.native.js"),
  import_context = require("./context.native.js"),
  SelectViewport = function (props) {
    var {
        scope,
        children
      } = props,
      context = (0, import_context.useSelectContext)(scope),
      itemParentContext = (0, import_context.useSelectItemParentContext)(scope),
      themeName = (0, import_core.useThemeName)(),
      adaptContext = (0, import_adapt.useAdaptContext)();
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_adapt.AdaptPortalContents, {
      scope: context.adaptScope,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.Theme, {
        name: themeName,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_context.ForwardSelectContext, {
          itemContext: itemParentContext,
          context,
          children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_adapt.AdaptContext.Provider, {
            ...adaptContext,
            children
          })
        })
      })
    });
  };
SelectViewport.displayName = import_constants.VIEWPORT_NAME;
//# sourceMappingURL=SelectViewport.native.js.map
