import { useContext } from "react";
import { ZIndexHardcodedContext, ZIndexStackContext } from "./context";
import { jsx } from "react/jsx-runtime";
const StackZIndexContext = ({
  children,
  zIndex
}) => {
  const existing = useContext(ZIndexStackContext);
  let content = /* @__PURE__ */ jsx(ZIndexStackContext.Provider, { value: existing + 1, children });
  return typeof zIndex < "u" && (content = /* @__PURE__ */ jsx(ZIndexHardcodedContext.Provider, { value: zIndex, children: content })), content;
};
export {
  StackZIndexContext
};
//# sourceMappingURL=StackZIndex.js.map
