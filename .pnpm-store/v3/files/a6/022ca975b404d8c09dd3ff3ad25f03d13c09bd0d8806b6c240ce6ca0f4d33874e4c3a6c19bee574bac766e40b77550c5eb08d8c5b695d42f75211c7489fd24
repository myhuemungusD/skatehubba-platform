import React from "react";
const isServerSide = typeof window > "u", idFn = () => {
};
function useForceUpdate() {
  return isServerSide ? idFn : React.useReducer((x) => Math.random(), 0)[1];
}
export {
  isServerSide,
  useForceUpdate
};
//# sourceMappingURL=index.js.map
