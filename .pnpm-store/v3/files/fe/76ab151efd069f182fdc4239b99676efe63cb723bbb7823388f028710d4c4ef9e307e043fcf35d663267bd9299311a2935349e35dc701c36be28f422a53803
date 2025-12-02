function composeEventHandlers(og, next, {
  checkDefaultPrevented = !0
} = {}) {
  return !og || !next ? next || og || void 0 : event => {
    if (og?.(event), !event || !(checkDefaultPrevented && typeof event == "object" && "defaultPrevented" in event) ||
    // @ts-ignore
    "defaultPrevented" in event && !event.defaultPrevented) return next?.(event);
  };
}
export { composeEventHandlers };
//# sourceMappingURL=composeEventHandlers.mjs.map
