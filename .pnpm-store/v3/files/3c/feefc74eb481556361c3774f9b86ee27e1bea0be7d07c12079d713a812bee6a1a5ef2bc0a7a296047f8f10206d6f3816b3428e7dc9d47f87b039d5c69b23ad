function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function composeEventHandlers(og, next) {
  var {
    checkDefaultPrevented = !0
  } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return !og || !next ? next || og || void 0 : function (event) {
    if (og?.(event), !event || !(checkDefaultPrevented && (typeof event > "u" ? "undefined" : _type_of(event)) === "object" && "defaultPrevented" in event) ||
    // @ts-ignore
    "defaultPrevented" in event && !event.defaultPrevented) return next?.(event);
  };
}
export { composeEventHandlers };
//# sourceMappingURL=composeEventHandlers.native.js.map
