import React from "react";
import { useCurrentColor } from "./useCurrentColor";
const useGetThemedIcon = (props) => {
  const color = useCurrentColor(props.color);
  return (el) => el && (React.isValidElement(el) ? React.cloneElement(el, {
    ...props,
    color,
    // @ts-expect-error
    ...el.props
  }) : React.createElement(el, props));
};
export {
  useGetThemedIcon
};
//# sourceMappingURL=useGetThemedIcon.js.map
