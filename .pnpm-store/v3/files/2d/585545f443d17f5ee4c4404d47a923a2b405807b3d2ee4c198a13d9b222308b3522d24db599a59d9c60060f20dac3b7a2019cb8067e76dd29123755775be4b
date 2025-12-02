"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var registerFocusable_native_exports = {};
__export(registerFocusable_native_exports, {
  focusFocusable: () => focusFocusable,
  registerFocusable: () => registerFocusable,
  unregisterFocusable: () => unregisterFocusable
});
module.exports = __toCommonJS(registerFocusable_native_exports);
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
//# sourceMappingURL=registerFocusable.native.js.map
