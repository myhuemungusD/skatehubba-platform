import React from "react";
import * as Floating from "./Floating.native.js";
var FloatingOverrideContext = /* @__PURE__ */React.createContext(null),
  useFloating = function (props) {
    var _this,
      context = React.useContext(FloatingOverrideContext);
    return (_this = context || Floating.useFloating) === null || _this === void 0 ? void 0 : _this({
      ...props,
      middleware: [
      // @ts-ignore
      ...props.middleware, {
        name: "rounded",
        fn(param) {
          var {
            x,
            y
          } = param;
          return {
            x: Math.round(x),
            y: Math.round(y)
          };
        }
      }]
    });
  };
export { FloatingOverrideContext, useFloating };
//# sourceMappingURL=useFloating.native.js.map
