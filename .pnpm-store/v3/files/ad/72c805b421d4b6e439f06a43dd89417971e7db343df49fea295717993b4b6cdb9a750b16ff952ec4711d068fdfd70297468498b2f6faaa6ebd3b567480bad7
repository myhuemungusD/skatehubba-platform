var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var GorhomPortalItem_exports = {};
__export(GorhomPortalItem_exports, {
  GorhomPortalItem: () => GorhomPortalItem
});
module.exports = __toCommonJS(GorhomPortalItem_exports);
var import_constants = require("@tamagui/constants"), import_react = require("react"), import_react_dom = require("react-dom"), import_constants2 = require("./constants");
const GorhomPortalItem = (props) => {
  !props.hostName && !props.passThrough && console.warn("No hostName");
  const cur = import_constants2.allPortalHosts.get(props.hostName || ""), [node, setNode] = (0, import_react.useState)(cur);
  if ((0, import_constants.useIsomorphicLayoutEffect)(() => {
    if (!props.hostName) return;
    const listener = (newNode) => {
      setNode(newNode);
    };
    return import_constants2.portalListeners[props.hostName] ||= /* @__PURE__ */ new Set(), import_constants2.portalListeners[props.hostName].add(listener), () => {
      import_constants2.portalListeners[props.hostName]?.delete(listener);
    };
  }, [props.hostName]), (0, import_constants.useIsomorphicLayoutEffect)(() => {
    cur && cur !== node && setNode(cur);
  }, [cur, node]), props.passThrough)
    return props.children;
  const actualNode = node?.isConnected ? node : null;
  return actualNode ? (0, import_react_dom.createPortal)(props.children, actualNode) : null;
};
//# sourceMappingURL=GorhomPortalItem.js.map
