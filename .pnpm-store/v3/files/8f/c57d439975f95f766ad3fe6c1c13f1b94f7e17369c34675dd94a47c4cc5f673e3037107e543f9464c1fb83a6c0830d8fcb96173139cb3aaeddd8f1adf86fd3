import * as React from "react";
import { ClientOnlyContext } from "./ClientOnly.mjs";
import { ClientOnly, ClientOnlyContext as ClientOnlyContext2 } from "./ClientOnly.mjs";
const useIsClientOnly = () => React.useContext(ClientOnlyContext);
function useDidFinishSSR() {
  return React.useContext(ClientOnlyContext) ? !0 : React.useSyncExternalStore(subscribe, () => !0, () => !1);
}
const subscribe = () => () => {};
function useClientValue(value) {
  return useDidFinishSSR() ? typeof value == "function" ? value() : value : void 0;
}
export { ClientOnly, ClientOnlyContext2 as ClientOnlyContext, useClientValue, useDidFinishSSR, useIsClientOnly };
//# sourceMappingURL=index.mjs.map
