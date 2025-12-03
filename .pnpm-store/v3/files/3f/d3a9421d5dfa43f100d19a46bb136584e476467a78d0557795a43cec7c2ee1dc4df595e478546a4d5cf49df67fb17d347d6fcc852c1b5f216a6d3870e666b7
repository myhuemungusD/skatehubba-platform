import * as React from "react";
import { jsx } from "react/jsx-runtime";
const PresenceContext = React.createContext(null), ResetPresence = (props) => {
  const parent = React.useContext(PresenceContext);
  return /* @__PURE__ */ jsx(PresenceContext.Provider, { value: props.disable ? parent : null, children: props.children });
};
export {
  PresenceContext,
  ResetPresence
};
//# sourceMappingURL=PresenceContext.js.map
