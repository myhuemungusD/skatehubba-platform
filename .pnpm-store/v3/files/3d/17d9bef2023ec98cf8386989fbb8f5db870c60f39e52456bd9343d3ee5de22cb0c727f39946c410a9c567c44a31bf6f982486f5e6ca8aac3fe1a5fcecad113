import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";
import { composeEventHandlers } from "@tamagui/helpers";
import { useLabelContext } from "@tamagui/label";
import { usePrevious } from "@tamagui/use-previous";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
const BubbleInput = (props) => {
  const { control, checked, bubbles = !0, ...inputProps } = props, ref = React.useRef(null), prevChecked = usePrevious(checked);
  return React.useEffect(() => {
    const input = ref.current, inputProto = window.HTMLInputElement.prototype, setChecked = Object.getOwnPropertyDescriptor(
      inputProto,
      "checked"
    ).set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", { bubbles });
      setChecked.call(input, checked), input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]), // @ts-ignore
  /* @__PURE__ */ jsx(
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
    const { disabled, name, value, required } = props, hasConsumerStoppedPropagationRef = React.useRef(!1), [button, setButton] = React.useState(null), composedRefs = useComposedRefs(ref, setButton), isFormControl = isWeb ? button ? !!button.closest("form") : !0 : !1, labelId = useLabelContext(button), ariaLabelledBy = props["aria-labelledby"] || props.labeledBy || labelId;
    return {
      switchProps: {
        role: "switch",
        "aria-checked": checked,
        ...isWeb ? {
          tabIndex: disabled ? void 0 : 0,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled
        } : {},
        "aria-labelledby": ariaLabelledBy,
        onPress: composeEventHandlers(props.onPress, (event) => {
          setChecked((prevChecked) => !prevChecked), isWeb && isFormControl && (hasConsumerStoppedPropagationRef.current = event.isPropagationStopped(), hasConsumerStoppedPropagationRef.current || event.stopPropagation());
        })
      },
      switchRef: composedRefs,
      /**
       * insert as a sibling of your switch (should not be inside the switch)
       */
      bubbleInput: isWeb && isFormControl ? /* @__PURE__ */ jsx(
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
export {
  useSwitch
};
//# sourceMappingURL=useSwitch.js.map
