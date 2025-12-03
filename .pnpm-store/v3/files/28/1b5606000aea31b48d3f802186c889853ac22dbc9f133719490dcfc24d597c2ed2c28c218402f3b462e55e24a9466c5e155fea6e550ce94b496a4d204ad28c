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
var useRadioGroup_exports = {};
__export(useRadioGroup_exports, {
  useRadioGroup: () => useRadioGroup,
  useRadioGroupItem: () => useRadioGroupItem,
  useRadioGroupItemIndicator: () => useRadioGroupItemIndicator
});
module.exports = __toCommonJS(useRadioGroup_exports);
var import_compose_refs = require("@tamagui/compose-refs"), import_constants = require("@tamagui/constants"), import_focusable = require("@tamagui/focusable"), import_helpers = require("@tamagui/helpers"), import_label = require("@tamagui/label"), import_use_controllable_state = require("@tamagui/use-controllable-state"), import_react = require("react"), import_BubbleInput = require("./BubbleInput"), import_utils = require("./utils"), import_jsx_runtime = require("react/jsx-runtime");
function useRadioGroup(params) {
  const {
    value: valueProp,
    onValueChange,
    defaultValue,
    required,
    disabled,
    name,
    native,
    accentColor,
    orientation,
    ref
  } = params, [value, setValue] = (0, import_use_controllable_state.useControllableState)({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  return {
    providerValue: {
      value,
      onChange: setValue,
      required,
      disabled,
      name,
      native,
      accentColor
    },
    frameAttrs: {
      role: "radiogroup",
      "aria-orientation": orientation,
      "data-disabled": disabled ? "" : void 0
    },
    rovingFocusGroupAttrs: {
      orientation,
      loop: !0
    }
  };
}
const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], useRadioGroupItem = (params) => {
  const {
    radioGroupContext,
    value,
    labelledBy: ariaLabelledby,
    disabled: itemDisabled,
    ref: refProp,
    id,
    onPress,
    onKeyDown,
    onFocus
  } = params, {
    value: groupValue,
    disabled,
    required,
    onChange,
    name,
    native,
    accentColor
  } = (0, import_react.useContext)(radioGroupContext), [button, setButton] = (0, import_react.useState)(null), hasConsumerStoppedPropagationRef = (0, import_react.useRef)(!1), ref = (0, import_react.useRef)(null), composedRefs = (0, import_compose_refs.useComposedRefs)(refProp, (node) => setButton(node), ref), isArrowKeyPressedRef = (0, import_react.useRef)(!1), isFormControl = import_constants.isWeb ? button ? !!button.closest("form") : !0 : !1, checked = groupValue === value, labelId = (0, import_label.useLabelContext)(button), labelledBy = ariaLabelledby || labelId;
  (0, import_react.useEffect)(() => {
    if (import_constants.isWeb) {
      const handleKeyDown = (event) => {
        ARROW_KEYS.includes(event.key) && (isArrowKeyPressedRef.current = !0);
      }, handleKeyUp = () => {
        isArrowKeyPressedRef.current = !1;
      };
      return document.addEventListener("keydown", handleKeyDown), document.addEventListener("keyup", handleKeyUp), () => {
        document.removeEventListener("keydown", handleKeyDown), document.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);
  const isDisabled = disabled || itemDisabled;
  return {
    providerValue: {
      checked
    },
    checked,
    isFormControl,
    bubbleInput: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_BubbleInput.BubbleInput,
      {
        isHidden: !native,
        control: button,
        bubbles: !hasConsumerStoppedPropagationRef.current,
        name,
        value,
        checked,
        required,
        disabled: isDisabled,
        ...import_constants.isWeb && native && {
          accentColor,
          id
        }
      }
    ),
    native,
    frameAttrs: {
      "data-state": (0, import_utils.getState)(checked),
      "data-disabled": isDisabled ? "" : void 0,
      role: "radio",
      "aria-labelledby": labelledBy,
      "aria-checked": checked,
      "aria-required": required,
      disabled: isDisabled,
      ref: composedRefs,
      ...import_constants.isWeb && {
        type: "button",
        value
      },
      id,
      onPress: (0, import_helpers.composeEventHandlers)(onPress, (event) => {
        checked || onChange?.(value), isFormControl && (hasConsumerStoppedPropagationRef.current = event.isPropagationStopped(), hasConsumerStoppedPropagationRef.current || event.stopPropagation());
      }),
      ...import_constants.isWeb && {
        onKeyDown: (0, import_helpers.composeEventHandlers)(onKeyDown, (event) => {
          event.key === "Enter" && event.preventDefault();
        }),
        onFocus: (0, import_helpers.composeEventHandlers)(onFocus, () => {
          isArrowKeyPressedRef.current && ref.current?.click();
        })
      }
    },
    rovingFocusGroupAttrs: {
      asChild: "expect-style",
      focusable: !isDisabled,
      active: checked
    }
  };
};
function useRadioGroupItemIndicator(params) {
  const { radioGroupItemContext, disabled, ...rest } = params, { checked } = (0, import_react.useContext)(radioGroupItemContext);
  return {
    checked,
    "data-state": (0, import_utils.getState)(checked),
    "data-disabled": disabled ? "" : void 0,
    ...rest
  };
}
//# sourceMappingURL=useRadioGroup.js.map
