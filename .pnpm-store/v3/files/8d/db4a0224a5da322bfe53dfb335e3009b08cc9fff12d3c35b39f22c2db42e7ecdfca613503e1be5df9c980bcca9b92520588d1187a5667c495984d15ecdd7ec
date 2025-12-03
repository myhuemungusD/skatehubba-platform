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
var SheetController_exports = {};
__export(SheetController_exports, {
  SheetController: () => SheetController
});
module.exports = __toCommonJS(SheetController_exports);
var import_react = __toESM(require("react"), 1), import_core = require("@tamagui/core"), import_useSheetController = require("./useSheetController"), import_jsx_runtime = require("react/jsx-runtime");
const SheetController = ({
  children,
  onOpenChange: onOpenChangeProp,
  open,
  hidden,
  disableDrag
}) => {
  const onOpenChange = (0, import_core.useEvent)(onOpenChangeProp), id = (0, import_react.useId)(), memoValue = import_react.default.useMemo(
    () => ({
      id,
      open,
      hidden,
      disableDrag,
      onOpenChange
    }),
    [id, onOpenChange, open, hidden, disableDrag]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_useSheetController.SheetControllerContext.Provider, { value: memoValue, children });
};
//# sourceMappingURL=SheetController.js.map
