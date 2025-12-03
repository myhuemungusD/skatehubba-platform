import React from "react";
var isServerSide = !1,
  idFn = function () {};
function useForceUpdate() {
  return isServerSide ? idFn : React.useReducer(function (x) {
    return Math.random();
  }, 0)[1];
}
export { isServerSide, useForceUpdate };
//# sourceMappingURL=index.native.js.map
