import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { usePrevious } from "@tamagui/use-previous";
var BubbleInput = function (props) {
  var {
      checked,
      bubbles = !0,
      control,
      isHidden,
      accentColor,
      ...inputProps
    } = props,
    ref = React.useRef(null),
    prevChecked = usePrevious(checked);
  return React.useEffect(function () {
    var input = ref.current,
      inputProto = window.HTMLInputElement.prototype,
      descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked"),
      setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      var event = new Event("click", {
        bubbles
      });
      setChecked.call(input, checked), input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]), /* @__PURE__ */_jsx("input", {
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
//# sourceMappingURL=BubbleInput.native.js.map
