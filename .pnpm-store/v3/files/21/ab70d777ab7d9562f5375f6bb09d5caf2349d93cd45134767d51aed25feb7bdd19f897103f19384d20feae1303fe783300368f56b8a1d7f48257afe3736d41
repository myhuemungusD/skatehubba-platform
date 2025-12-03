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
var focusableInputHOC_exports = {};
__export(focusableInputHOC_exports, {
  useFocusable: () => useFocusable
});
module.exports = __toCommonJS(focusableInputHOC_exports);
var import_compose_refs = require("@tamagui/compose-refs"), import_web = require("@tamagui/web"), import_react = __toESM(require("react"), 1), import_registerFocusable = require("./registerFocusable");
function useFocusable({
  isInput,
  props,
  ref
}) {
  const { id, onChangeText, value, defaultValue } = props, inputValue = import_react.default.useRef(value || defaultValue || ""), unregisterFocusable = import_react.default.useRef(void 0), focusAndSelect = import_react.default.useCallback((input) => {
    input.focus(), input.setSelection && typeof inputValue.current == "string" && input.setSelection(0, inputValue.current.length);
  }, []), registerFocusableHandler = import_react.default.useCallback(
    (input) => {
      !id || !input || (unregisterFocusable.current?.(), unregisterFocusable.current = (0, import_registerFocusable.registerFocusable)(id, {
        focus: input.focus,
        ...isInput && {
          focusAndSelect: () => focusAndSelect(input)
        }
      }));
    },
    [id, isInput, focusAndSelect]
  ), inputRef = import_react.default.useCallback(
    (input) => {
      input && registerFocusableHandler(input);
    },
    [registerFocusableHandler]
  ), handleChangeText = (0, import_web.useEvent)((value2) => {
    inputValue.current = value2, onChangeText?.(value2);
  });
  return import_react.default.useEffect(() => () => {
    unregisterFocusable.current?.();
  }, []), {
    ref: import_react.default.useMemo(() => (0, import_compose_refs.composeRefs)(ref, inputRef), [ref, inputRef]),
    onChangeText: handleChangeText
  };
}
//# sourceMappingURL=focusableInputHOC.js.map
