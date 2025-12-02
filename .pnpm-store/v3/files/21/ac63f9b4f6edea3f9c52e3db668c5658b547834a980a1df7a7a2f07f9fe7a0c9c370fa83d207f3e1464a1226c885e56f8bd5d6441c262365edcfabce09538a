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
var useSwitch_exports = {};
__export(useSwitch_exports, {
  useSwitch: () => useSwitch
});
module.exports = __toCommonJS(useSwitch_exports);
var import_compose_refs = require("@tamagui/compose-refs"), import_constants = require("@tamagui/constants"), import_helpers = require("@tamagui/helpers"), import_label = require("@tamagui/label"), import_use_previous = require("@tamagui/use-previous"), React = __toESM(require("react"), 1), import_jsx_runtime = (
  // @ts-ignore
  require("react/jsx-runtime")
);
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
const BubbleInput = (props) => {
  const { control, checked, bubbles = !0, ...inputProps } = props, ref = React.useRef(null), prevChecked = (0, import_use_previous.usePrevious)(checked);
  return React.useEffect(() => {
    const input = ref.current, inputProto = window.HTMLInputElement.prototype, setChecked = Object.getOwnPropertyDescriptor(
      inputProto,
      "checked"
    ).set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", { bubbles });
      setChecked.call(input, checked), input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "input",
    {
      type: "checkbox",
      "aria-hidden": !0,
      defaultChecked: checked,
      ...inputProps,
      tabIndex: -1,
      ref,
      style: {
        ...props.style,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    }
  );
};
function useSwitch(props, [checked, setChecked], ref) {
  {
    const { disabled, name, value, required } = props, hasConsumerStoppedPropagationRef = React.useRef(!1), [button, setButton] = React.useState(null), composedRefs = (0, import_compose_refs.useComposedRefs)(ref, setButton), isFormControl = import_constants.isWeb ? button ? !!button.closest("form") : !0 : !1, labelId = (0, import_label.useLabelContext)(button), ariaLabelledBy = props["aria-labelledby"] || props.labeledBy || labelId;
    return {
      switchProps: {
        role: "switch",
        "aria-checked": checked,
        ...import_constants.isWeb ? {
          tabIndex: disabled ? void 0 : 0,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled
        } : {},
        "aria-labelledby": ariaLabelledBy,
        onPress: (0, import_helpers.composeEventHandlers)(props.onPress, (event) => {
          setChecked((prevChecked) => !prevChecked), import_constants.isWeb && isFormControl && (hasConsumerStoppedPropagationRef.current = event.isPropagationStopped(), hasConsumerStoppedPropagationRef.current || event.stopPropagation());
        })
      },
      switchRef: composedRefs,
      /**
       * insert as a sibling of your switch (should not be inside the switch)
       */
      bubbleInput: import_constants.isWeb && isFormControl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        BubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          style: { transform: "translateX(-100%)" }
        }
      ) : null
    };
  }
}
//# sourceMappingURL=useSwitch.js.map
