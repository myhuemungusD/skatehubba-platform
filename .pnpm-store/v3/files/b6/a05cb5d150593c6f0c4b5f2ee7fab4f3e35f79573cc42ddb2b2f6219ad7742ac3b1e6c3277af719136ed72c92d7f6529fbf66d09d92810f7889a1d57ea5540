import React from "react";
import { usePrevious } from "@tamagui/use-previous";
import { jsx } from "react/jsx-runtime";
const BubbleInput = props => {
  const {
      checked,
      bubbles = !0,
      control,
      isHidden,
      accentColor,
      ...inputProps
    } = props,
    ref = React.useRef(null),
    prevChecked = usePrevious(checked);
  return React.useEffect(() => {
    const input = ref.current,
      inputProto = window.HTMLInputElement.prototype,
      setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", {
        bubbles
      });
      setChecked.call(input, checked), input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]), /* @__PURE__ */jsx("input", {
    type: "radio",
    defaultChecked: checked,
    ...inputProps,
    tabIndex: -1,
    ref,
    "aria-hidden": isHidden,
    style: {
      ...(isHidden ? {
        // ...controlSize,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      } : {
        appearance: "auto",
        accentColor
      }),
      ...props.style
    }
  });
};
export { BubbleInput };
//# sourceMappingURL=BubbleInput.mjs.map
