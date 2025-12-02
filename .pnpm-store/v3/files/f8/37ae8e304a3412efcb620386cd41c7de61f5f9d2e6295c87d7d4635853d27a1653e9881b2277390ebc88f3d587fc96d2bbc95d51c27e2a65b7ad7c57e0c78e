import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
var DirectionContext = /* @__PURE__ */React.createContext(void 0),
  DirectionProvider = function (props) {
    var {
      dir,
      children
    } = props;
    return /* @__PURE__ */_jsx(DirectionContext.Provider, {
      value: dir,
      children
    });
  };
function useDirection(localDir) {
  var globalDir = React.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
var Provider = DirectionProvider;
export { DirectionProvider, Provider, useDirection };
//# sourceMappingURL=useDirection.native.js.map
