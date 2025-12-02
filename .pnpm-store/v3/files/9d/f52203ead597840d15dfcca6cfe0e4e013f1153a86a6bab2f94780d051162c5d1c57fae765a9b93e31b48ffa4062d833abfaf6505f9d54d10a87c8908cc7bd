import React from "react";
import * as Floating from "./Floating";
const FloatingOverrideContext = React.createContext(null), useFloating = (props) => (React.useContext(FloatingOverrideContext) || Floating.useFloating)?.({
  ...props,
  middleware: [
    // @ts-ignore
    ...props.middleware,
    {
      name: "rounded",
      fn({ x, y }) {
        return {
          x: Math.round(x),
          y: Math.round(y)
        };
      }
    }
  ]
});
export {
  FloatingOverrideContext,
  useFloating
};
//# sourceMappingURL=useFloating.js.map
