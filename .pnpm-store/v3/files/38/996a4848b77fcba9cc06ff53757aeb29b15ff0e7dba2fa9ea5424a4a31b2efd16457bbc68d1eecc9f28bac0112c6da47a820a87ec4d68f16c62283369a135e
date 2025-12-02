import { jsx as _jsx } from "react/jsx-runtime";
import { createStyledContext } from "@tamagui/core";
var {
    Provider: SelectProvider,
    useStyledContext: useSelectContext
  } = createStyledContext(null, "Select"),
  {
    Provider: SelectItemParentProvider,
    useStyledContext: useSelectItemParentContext
  } = createStyledContext(null, "SelectItem"),
  ForwardSelectContext = function (param) {
    var {
      context,
      itemContext,
      children
    } = param;
    return /* @__PURE__ */_jsx(SelectProvider, {
      isInSheet: !0,
      scope: context.scopeName,
      ...context,
      children: /* @__PURE__ */_jsx(SelectItemParentProvider, {
        scope: context.scopeName,
        ...itemContext,
        children
      })
    });
  };
export { ForwardSelectContext, SelectItemParentProvider, SelectProvider, useSelectContext, useSelectItemParentContext };
//# sourceMappingURL=context.native.js.map
