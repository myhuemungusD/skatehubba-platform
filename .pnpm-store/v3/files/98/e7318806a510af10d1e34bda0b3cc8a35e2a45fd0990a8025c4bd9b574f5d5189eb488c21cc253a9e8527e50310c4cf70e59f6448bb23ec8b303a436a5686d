import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { ZIndexHardcodedContext, ZIndexStackContext } from "./context.native.js";
var StackZIndexContext = function (param) {
  var {
      children,
      zIndex
    } = param,
    existing = useContext(ZIndexStackContext),
    content = /* @__PURE__ */_jsx(ZIndexStackContext.Provider, {
      value: existing + 1,
      children
    });
  return typeof zIndex < "u" && (content = /* @__PURE__ */_jsx(ZIndexHardcodedContext.Provider, {
    value: zIndex,
    children: content
  })), content;
};
export { StackZIndexContext };
//# sourceMappingURL=StackZIndex.native.js.map
