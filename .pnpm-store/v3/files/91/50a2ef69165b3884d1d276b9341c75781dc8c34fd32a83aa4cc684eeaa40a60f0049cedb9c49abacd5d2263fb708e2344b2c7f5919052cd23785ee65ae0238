var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var composeEventHandlers_exports = {};
__export(composeEventHandlers_exports, {
  composeEventHandlers: () => composeEventHandlers
});
module.exports = __toCommonJS(composeEventHandlers_exports);
function composeEventHandlers(og, next, { checkDefaultPrevented = !0 } = {}) {
  return !og || !next ? next || og || void 0 : (event) => {
    if (og?.(event), !event || !(checkDefaultPrevented && typeof event == "object" && "defaultPrevented" in event) || // @ts-ignore
    "defaultPrevented" in event && !event.defaultPrevented)
      return next?.(event);
  };
}
//# sourceMappingURL=composeEventHandlers.js.map
