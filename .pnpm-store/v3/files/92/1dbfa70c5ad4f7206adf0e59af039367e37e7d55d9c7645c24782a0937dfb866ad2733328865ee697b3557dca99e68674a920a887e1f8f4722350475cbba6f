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
var usePresence_exports = {};
__export(usePresence_exports, {
  isPresent: () => isPresent,
  useIsPresent: () => useIsPresent,
  usePresence: () => usePresence
});
module.exports = __toCommonJS(usePresence_exports);
var React = __toESM(require("react"), 1), import_PresenceContext = require("./PresenceContext");
function usePresence() {
  const context = React.useContext(import_PresenceContext.PresenceContext);
  if (!context)
    return [!0, null, context];
  const { id, isPresent: isPresent2, onExitComplete, register } = context;
  return React.useEffect(() => register(id), []), !isPresent2 && onExitComplete ? [!1, () => onExitComplete?.(id), context] : [!0, void 0, context];
}
function useIsPresent() {
  return isPresent(React.useContext(import_PresenceContext.PresenceContext));
}
function isPresent(context) {
  return context === null ? !0 : context.isPresent;
}
//# sourceMappingURL=usePresence.js.map
