import { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
const ClientOnlyContext = createContext(!1),
  ClientOnly = ({
    children,
    enabled
  }) => {
    const existingValue = useContext(ClientOnlyContext);
    return /* @__PURE__ */jsx(ClientOnlyContext.Provider, {
      value: enabled ?? existingValue,
      children
    });
  };
export { ClientOnly, ClientOnlyContext };
//# sourceMappingURL=ClientOnly.mjs.map
