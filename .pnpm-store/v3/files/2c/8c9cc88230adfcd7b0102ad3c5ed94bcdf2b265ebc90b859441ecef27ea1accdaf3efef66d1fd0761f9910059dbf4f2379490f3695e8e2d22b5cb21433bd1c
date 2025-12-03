import React from "react";
const useGetIcon = () => (el, props) => el && (React.isValidElement(el) ? React.cloneElement(el, {
  ...props,
  // @ts-expect-error
  ...el.props
}) : React.createElement(el, props));
export {
  useGetIcon
};
//# sourceMappingURL=useGetIcon.js.map
