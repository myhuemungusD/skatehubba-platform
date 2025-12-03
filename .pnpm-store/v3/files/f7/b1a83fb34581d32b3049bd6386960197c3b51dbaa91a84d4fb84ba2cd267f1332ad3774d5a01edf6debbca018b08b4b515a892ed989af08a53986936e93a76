import * as React from "react";
import { PresenceContext } from "./PresenceContext.native.js";
function usePresence() {
  var context = React.useContext(PresenceContext);
  if (!context) return [!0, null, context];
  var {
    id,
    isPresent: isPresent2,
    onExitComplete,
    register
  } = context;
  React.useEffect(function () {
    return register(id);
  }, []);
  var safeToRemove = function () {
    return onExitComplete?.(id);
  };
  return !isPresent2 && onExitComplete ? [!1, safeToRemove, context] : [!0, void 0, context];
}
function useIsPresent() {
  return isPresent(React.useContext(PresenceContext));
}
function isPresent(context) {
  return context === null ? !0 : context.isPresent;
}
export { isPresent, useIsPresent, usePresence };
//# sourceMappingURL=usePresence.native.js.map
