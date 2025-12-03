var InputsMap = /* @__PURE__ */new Map(),
  registerFocusable = function (id, input) {
    return process.env.NODE_ENV === "development" && InputsMap.has(id) && console.warn(`Warning, duplicate ID for input: ${id}`), InputsMap.set(id, input), function () {
      InputsMap.delete(id);
    };
  },
  unregisterFocusable = function (id) {
    InputsMap.delete(id);
  },
  focusFocusable = function (id) {
    var select = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
      input = InputsMap.get(id);
    if (!input) {
      process.env.NODE_ENV === "development" && console.warn("No input found for id", id);
      return;
    }
    select || !input.focusAndSelect ? input.focus() : input.focusAndSelect();
  };
export { focusFocusable, registerFocusable, unregisterFocusable };
//# sourceMappingURL=registerFocusable.native.js.map
