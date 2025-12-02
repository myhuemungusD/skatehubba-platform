import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";

import { composeEventHandlers } from "@tamagui/helpers";
import { useLabelContext } from "@tamagui/label";
import { useControllableState } from "@tamagui/use-controllable-state";
import { useContext, useEffect, useRef, useState } from "react";
import { BubbleInput } from "./BubbleInput";
import { getState } from "./utils";
import { jsx } from "react/jsx-runtime";
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
  } = params, [value, setValue] = useControllableState({
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
  } = useContext(radioGroupContext), [button, setButton] = useState(null), hasConsumerStoppedPropagationRef = useRef(!1), ref = useRef(null), composedRefs = useComposedRefs(refProp, (node) => setButton(node), ref), isArrowKeyPressedRef = useRef(!1), isFormControl = isWeb ? button ? !!button.closest("form") : !0 : !1, checked = groupValue === value, labelId = useLabelContext(button), labelledBy = ariaLabelledby || labelId;
  useEffect(() => {
    if (isWeb) {
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
    bubbleInput: /* @__PURE__ */ jsx(
      BubbleInput,
      {
        isHidden: !native,
        control: button,
        bubbles: !hasConsumerStoppedPropagationRef.current,
        name,
        value,
        checked,
        required,
        disabled: isDisabled,
        ...isWeb && native && {
          accentColor,
          id
        }
      }
    ),
    native,
    frameAttrs: {
      "data-state": getState(checked),
      "data-disabled": isDisabled ? "" : void 0,
      role: "radio",
      "aria-labelledby": labelledBy,
      "aria-checked": checked,
      "aria-required": required,
      disabled: isDisabled,
      ref: composedRefs,
      ...isWeb && {
        type: "button",
        value
      },
      id,
      onPress: composeEventHandlers(onPress, (event) => {
        checked || onChange?.(value), isFormControl && (hasConsumerStoppedPropagationRef.current = event.isPropagationStopped(), hasConsumerStoppedPropagationRef.current || event.stopPropagation());
      }),
      ...isWeb && {
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          event.key === "Enter" && event.preventDefault();
        }),
        onFocus: composeEventHandlers(onFocus, () => {
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
  const { radioGroupItemContext, disabled, ...rest } = params, { checked } = useContext(radioGroupItemContext);
  return {
    checked,
    "data-state": getState(checked),
    "data-disabled": disabled ? "" : void 0,
    ...rest
  };
}
export {
  useRadioGroup,
  useRadioGroupItem,
  useRadioGroupItemIndicator
};
//# sourceMappingURL=useRadioGroup.js.map
