import * as React from "react";
import { ClientOnlyContext } from "./ClientOnly.native.js";
import { ClientOnly, ClientOnlyContext as ClientOnlyContext2 } from "./ClientOnly.native.js";
var useIsClientOnly = function () {
  return React.useContext(ClientOnlyContext);
};
function useDidFinishSSR() {
  var clientOnly = React.useContext(ClientOnlyContext);
  return !0;
}
var subscribe = function () {
  return function () {};
};
function useClientValue(value) {
  var done = useDidFinishSSR();
  return done ? typeof value == "function" ? value() : value : void 0;
}
export { ClientOnly, ClientOnlyContext2 as ClientOnlyContext, useClientValue, useDidFinishSSR, useIsClientOnly };
//# sourceMappingURL=index.native.js.map
