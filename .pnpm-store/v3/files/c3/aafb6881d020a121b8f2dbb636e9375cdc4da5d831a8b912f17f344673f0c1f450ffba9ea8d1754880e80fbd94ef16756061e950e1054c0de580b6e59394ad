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
var index_exports = {};
__export(index_exports, {
  ClientOnly: () => import_ClientOnly2.ClientOnly,
  ClientOnlyContext: () => import_ClientOnly2.ClientOnlyContext,
  useClientValue: () => useClientValue,
  useDidFinishSSR: () => useDidFinishSSR,
  useIsClientOnly: () => useIsClientOnly
});
module.exports = __toCommonJS(index_exports);
var React = __toESM(require("react"), 1), import_ClientOnly = require("./ClientOnly"), import_ClientOnly2 = require("./ClientOnly");
const useIsClientOnly = () => React.useContext(import_ClientOnly.ClientOnlyContext);
function useDidFinishSSR() {
  return React.useContext(import_ClientOnly.ClientOnlyContext) ? !0 : React.useSyncExternalStore(
    subscribe,
    () => !0,
    () => !1
  );
}
const subscribe = () => () => {
};
function useClientValue(value) {
  return useDidFinishSSR() ? typeof value == "function" ? value() : value : void 0;
}
//# sourceMappingURL=index.js.map
