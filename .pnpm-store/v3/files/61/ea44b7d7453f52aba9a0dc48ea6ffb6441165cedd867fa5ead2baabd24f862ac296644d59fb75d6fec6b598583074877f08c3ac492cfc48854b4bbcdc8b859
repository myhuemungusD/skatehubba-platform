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
var useCheckbox_exports = {};
__export(useCheckbox_exports, {
  useCheckbox: () => useCheckbox
});
module.exports = __toCommonJS(useCheckbox_exports);
var import_compose_refs = require("@tamagui/compose-refs"), import_constants = require("@tamagui/constants"), import_helpers = require("@tamagui/helpers"), import_label = require("@tamagui/label"), import_react = __toESM(require("react"), 1), import_BubbleInput = require("./BubbleInput"), import_utils = require("./utils"), import_jsx_runtime = require("react/jsx-runtime");
function useCheckbox(props, [checked, setChecked], ref) {
  const {
    labelledBy: ariaLabelledby,
    name,
    required,
    disabled,
    value = "on",
    onCheckedChange,
    ...checkboxProps
  } = props, [button, setButton] = import_react.default.useState(null), composedRefs = (0, import_compose_refs.useComposedRefs)(ref, setButton), hasConsumerStoppedPropagationRef = import_react.default.useRef(!1), isFormControl = import_constants.isWeb ? button ? !!button.closest("form") : !0 : !1, labelId = (0, import_label.useLabelContext)(button), labelledBy = ariaLabelledby || labelId, parentKeyDown = props.onKeyDown, handleKeyDown = (0, import_react.useMemo)(
    () => (0, import_helpers.composeEventHandlers)(parentKeyDown, (event) => {
      event.key === "Enter" && event.preventDefault();
    }),
    [parentKeyDown]
  ), handlePress = (0, import_react.useMemo)(
    () => (0, import_helpers.composeEventHandlers)(props.onPress, (event) => {
      setChecked((prevChecked) => (0, import_utils.isIndeterminate)(prevChecked) ? !0 : !prevChecked), isFormControl && "isPropagationStopped" in event && (hasConsumerStoppedPropagationRef.current = event.isPropagationStopped(), hasConsumerStoppedPropagationRef.current || event.stopPropagation());
    }),
    [isFormControl]
  );
  return {
    bubbleInput: import_constants.isWeb && isFormControl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_BubbleInput.BubbleInput,
      {
        isHidden: !0,
        control: button,
        bubbles: !hasConsumerStoppedPropagationRef.current,
        name,
        value,
        checked,
        required,
        disabled
      }
    ) : null,
    checkboxRef: composedRefs,
    checkboxProps: {
      role: "checkbox",
      "aria-labelledby": labelledBy,
      "aria-checked": (0, import_utils.isIndeterminate)(checked) ? "mixed" : checked,
      ...checkboxProps,
      ...import_constants.isWeb && {
        type: "button",
        value,
        "data-state": (0, import_utils.getState)(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        onKeyDown: disabled ? void 0 : handleKeyDown
      },
      onPress: disabled ? void 0 : handlePress
    }
  };
}
//# sourceMappingURL=useCheckbox.js.map
