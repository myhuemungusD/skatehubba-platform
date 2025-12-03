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
var Portal_exports = {};
__export(Portal_exports, {
  Portal: () => Portal
});
module.exports = __toCommonJS(Portal_exports);
var import_polyfill_dev = require("@tamagui/polyfill-dev"), import_constants = require("@tamagui/constants"), import_z_index_stack = require("@tamagui/z-index-stack"), React = __toESM(require("react"), 1), import_react_dom = require("react-dom"), import_helpers = require("./helpers"), import_jsx_runtime = require("react/jsx-runtime");
const Portal = React.memo((propsIn) => {
  if (import_constants.isServer)
    return null;
  const body = globalThis.document?.body;
  if (!body)
    return propsIn.children;
  const { children, passThrough } = propsIn, zIndex = (0, import_z_index_stack.useStackedZIndex)((0, import_helpers.getStackedZIndexProps)(propsIn));
  return passThrough ? children : (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        style: {
          zIndex,
          position: "fixed",
          inset: 0,
          contain: "strict",
          pointerEvents: "none"
        },
        children
      }
    ),
    body
  );
});
//# sourceMappingURL=Portal.js.map
