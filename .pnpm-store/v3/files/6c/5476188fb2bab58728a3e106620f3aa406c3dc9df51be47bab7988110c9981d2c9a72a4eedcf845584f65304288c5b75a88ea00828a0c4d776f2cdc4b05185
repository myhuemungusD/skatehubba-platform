import { ClientOnly } from "@tamagui/use-did-finish-ssr";
import React from "react";
import { ComponentContext } from "../contexts/ComponentContext";
import { jsx } from "react/jsx-runtime";
const Configuration = (props) => {
  const current = React.useContext(ComponentContext);
  return /* @__PURE__ */ jsx(ClientOnly, { enabled: props.disableSSR ?? current.disableSSR, children: /* @__PURE__ */ jsx(ComponentContext.Provider, { ...current, ...props }) });
};
export {
  Configuration
};
//# sourceMappingURL=Configuration.js.map
