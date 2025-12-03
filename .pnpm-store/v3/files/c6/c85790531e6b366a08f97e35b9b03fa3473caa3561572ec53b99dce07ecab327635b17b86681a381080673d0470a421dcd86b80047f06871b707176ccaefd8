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
var useFloating_exports = {};
__export(useFloating_exports, {
  FloatingOverrideContext: () => FloatingOverrideContext,
  useFloating: () => useFloating
});
module.exports = __toCommonJS(useFloating_exports);
var import_react = __toESM(require("react"), 1), Floating = __toESM(require("./Floating"), 1);
const FloatingOverrideContext = import_react.default.createContext(null), useFloating = (props) => (import_react.default.useContext(FloatingOverrideContext) || Floating.useFloating)?.({
  ...props,
  middleware: [
    // @ts-ignore
    ...props.middleware,
    {
      name: "rounded",
      fn({ x, y }) {
        return {
          x: Math.round(x),
          y: Math.round(y)
        };
      }
    }
  ]
});
//# sourceMappingURL=useFloating.js.map
