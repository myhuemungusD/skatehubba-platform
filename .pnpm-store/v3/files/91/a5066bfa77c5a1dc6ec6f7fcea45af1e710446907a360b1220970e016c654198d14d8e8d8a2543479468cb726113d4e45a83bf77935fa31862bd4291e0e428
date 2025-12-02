import { jsx as _jsx } from "react/jsx-runtime";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";
import { composeEventHandlers } from "@tamagui/helpers";
import { useLabelContext } from "@tamagui/label";
import React, { useMemo } from "react";
import { BubbleInput } from "./BubbleInput.native.js";
import { getState, isIndeterminate } from "./utils.native.js";
function useCheckbox(props, param, ref) {
  var [checked, setChecked] = param,
    {
      labelledBy: ariaLabelledby,
      name,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      ...checkboxProps
    } = props,
    [button, setButton] = React.useState(null),
    composedRefs = useComposedRefs(ref, setButton),
    hasConsumerStoppedPropagationRef = React.useRef(!1),
    isFormControl = isWeb ? button ? !!button.closest("form") : !0 : !1,
    labelId = useLabelContext(button),
    labelledBy = ariaLabelledby || labelId,
    parentKeyDown = props.onKeyDown,
    handleKeyDown = useMemo(function () {
      return composeEventHandlers(parentKeyDown, function (event) {
        event.key === "Enter" && event.preventDefault();
      });
    }, [parentKeyDown]),
    handlePress = useMemo(function () {
      return composeEventHandlers(props.onPress, function (event) {
        setChecked(function (prevChecked) {
          return isIndeterminate(prevChecked) ? !0 : !prevChecked;
        }), isFormControl && "isPropagationStopped" in event && (hasConsumerStoppedPropagationRef.current = event.isPropagationStopped(), hasConsumerStoppedPropagationRef.current || event.stopPropagation());
      });
    }, [isFormControl]);
  return {
    bubbleInput: isWeb && isFormControl ? /* @__PURE__ */_jsx(BubbleInput, {
      isHidden: !0,
      control: button,
      bubbles: !hasConsumerStoppedPropagationRef.current,
      name,
      value,
      checked,
      required,
      disabled
    }) : null,
    checkboxRef: composedRefs,
    checkboxProps: {
      role: "checkbox",
      "aria-labelledby": labelledBy,
      "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
      ...checkboxProps,
      ...(isWeb && {
        type: "button",
        value,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        onKeyDown: disabled ? void 0 : handleKeyDown
      }),
      onPress: disabled ? void 0 : handlePress
    }
  };
}
export { useCheckbox };
//# sourceMappingURL=useCheckbox.native.js.map
