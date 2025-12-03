import { createStyledContext } from "@tamagui/core";
import { jsx } from "react/jsx-runtime";
const { Provider: SelectProvider, useStyledContext: useSelectContext } = createStyledContext(null, "Select"), {
  Provider: SelectItemParentProvider,
  useStyledContext: useSelectItemParentContext
} = createStyledContext(null, "SelectItem"), ForwardSelectContext = ({
  context,
  itemContext,
  children
}) => /* @__PURE__ */ jsx(SelectProvider, { isInSheet: !0, scope: context.scopeName, ...context, children: /* @__PURE__ */ jsx(SelectItemParentProvider, { scope: context.scopeName, ...itemContext, children }) });
export {
  ForwardSelectContext,
  SelectItemParentProvider,
  SelectProvider,
  useSelectContext,
  useSelectItemParentContext
};
//# sourceMappingURL=context.js.map
