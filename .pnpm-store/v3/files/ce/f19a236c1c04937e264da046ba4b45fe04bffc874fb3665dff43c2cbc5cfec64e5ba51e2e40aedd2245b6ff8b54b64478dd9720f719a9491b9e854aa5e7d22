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
var withStaticProperties_exports = {};
__export(withStaticProperties_exports, {
  withStaticProperties: () => withStaticProperties
});
module.exports = __toCommonJS(withStaticProperties_exports);
var import_react = __toESM(require("react"), 1);
const Decorated = Symbol(), withStaticProperties = (component, staticProps) => {
  const next = (() => {
    if (component[Decorated]) {
      const _ = import_react.default.forwardRef(
        (props, ref) => import_react.default.createElement(component, { ...props, ref })
      );
      for (const key in component) {
        const v = component[key];
        _[key] = v && typeof v == "object" ? { ...v } : v;
      }
    }
    return component;
  })();
  return Object.assign(next, staticProps), next[Decorated] = !0, next;
};
//# sourceMappingURL=withStaticProperties.js.map
