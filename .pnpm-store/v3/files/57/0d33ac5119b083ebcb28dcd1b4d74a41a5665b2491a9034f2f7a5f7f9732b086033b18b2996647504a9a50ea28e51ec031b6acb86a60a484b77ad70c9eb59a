import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import { useState } from "react";
import { createPortal } from "react-dom";
import { allPortalHosts, portalListeners } from "./constants.mjs";
const GorhomPortalItem = props => {
  !props.hostName && !props.passThrough && console.warn("No hostName");
  const cur = allPortalHosts.get(props.hostName || ""),
    [node, setNode] = useState(cur);
  if (useIsomorphicLayoutEffect(() => {
    if (!props.hostName) return;
    const listener = newNode => {
      setNode(newNode);
    };
    return portalListeners[props.hostName] ||= /* @__PURE__ */new Set(), portalListeners[props.hostName].add(listener), () => {
      portalListeners[props.hostName]?.delete(listener);
    };
  }, [props.hostName]), useIsomorphicLayoutEffect(() => {
    cur && cur !== node && setNode(cur);
  }, [cur, node]), props.passThrough) return props.children;
  const actualNode = node?.isConnected ? node : null;
  return actualNode ? createPortal(props.children, actualNode) : null;
};
export { GorhomPortalItem };
//# sourceMappingURL=GorhomPortalItem.mjs.map
