import * as React from "react";
import { PresenceContext } from "./PresenceContext.mjs";
function usePresence() {
  const context = React.useContext(PresenceContext);
  if (!context) return [!0, null, context];
  const {
    id,
    isPresent: isPresent2,
    onExitComplete,
    register
  } = context;
  return React.useEffect(() => register(id), []), !isPresent2 && onExitComplete ? [!1, () => onExitComplete?.(id), context] : [!0, void 0, context];
}
function useIsPresent() {
  return isPresent(React.useContext(PresenceContext));
}
function isPresent(context) {
  return context === null ? !0 : context.isPresent;
}
export { isPresent, useIsPresent, usePresence };
//# sourceMappingURL=usePresence.mjs.map
