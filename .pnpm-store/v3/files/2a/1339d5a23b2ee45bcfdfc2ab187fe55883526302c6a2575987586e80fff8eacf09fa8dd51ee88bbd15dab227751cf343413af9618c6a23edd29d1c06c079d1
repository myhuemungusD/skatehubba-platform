import React from "react";
import { useCurrentColor } from "./useCurrentColor.native.js";
var useGetThemedIcon = function (props) {
  var color = useCurrentColor(props.color);
  return function (el) {
    return el && (/* @__PURE__ */React.isValidElement(el) ? /* @__PURE__ */React.cloneElement(el, {
      ...props,
      color,
      // @ts-expect-error
      ...el.props
    }) : /* @__PURE__ */React.createElement(el, props));
  };
};
export { useGetThemedIcon };
//# sourceMappingURL=useGetThemedIcon.native.js.map
