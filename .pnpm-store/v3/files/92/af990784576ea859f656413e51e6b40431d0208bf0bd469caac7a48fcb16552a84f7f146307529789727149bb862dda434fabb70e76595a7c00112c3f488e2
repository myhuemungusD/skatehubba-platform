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
var AnimatePresence_exports = {};
__export(AnimatePresence_exports, {
  AnimatePresence: () => AnimatePresence
});
module.exports = __toCommonJS(AnimatePresence_exports);
var import_constants = require("@tamagui/constants"), import_use_force_update = require("@tamagui/use-force-update"), import_react = require("react"), import_LayoutGroupContext = require("./LayoutGroupContext"), import_PresenceChild = require("./PresenceChild"), import_jsx_runtime = require("react/jsx-runtime");
const getChildKey = (child) => child.key || "";
function updateChildLookup(children, allChildren) {
  children.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  const filtered = [];
  return import_react.Children.forEach(children, (child) => {
    (0, import_react.isValidElement)(child) && filtered.push(child);
  }), filtered;
}
const AnimatePresence = ({
  children,
  enterVariant,
  exitVariant,
  enterExitVariant,
  initial = !0,
  onExitComplete,
  exitBeforeEnter,
  presenceAffectsLayout = !0,
  custom,
  passThrough
}) => {
  let forceRender = (0, import_react.useContext)(import_LayoutGroupContext.LayoutGroupContext).forceRender ?? (0, import_use_force_update.useForceUpdate)();
  const filteredChildren = onlyElements(children), presentChildren = (0, import_react.useRef)(filteredChildren), allChildren = (0, import_react.useRef)(/* @__PURE__ */ new Map()).current, exiting = (0, import_react.useRef)(/* @__PURE__ */ new Set()).current;
  updateChildLookup(filteredChildren, allChildren);
  const isInitialRender = (0, import_react.useRef)(!0);
  if (passThrough)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
  if ((0, import_constants.useIsomorphicLayoutEffect)(() => {
    isInitialRender.current = !1;
  }, []), isInitialRender.current)
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: filteredChildren.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_PresenceChild.PresenceChild,
      {
        isPresent: !0,
        enterExitVariant,
        exitVariant,
        enterVariant,
        initial: initial ? void 0 : !1,
        presenceAffectsLayout,
        custom,
        children: child
      },
      getChildKey(child)
    )) });
  let childrenToRender = [...filteredChildren];
  const presentKeys = presentChildren.current.map(getChildKey), targetKeys = filteredChildren.map(getChildKey), numPresent = presentKeys.length;
  for (let i = 0; i < numPresent; i++) {
    const key = presentKeys[i];
    targetKeys.indexOf(key) === -1 ? exiting.add(key) : exiting.delete(key);
  }
  return exitBeforeEnter && exiting.size && (childrenToRender = []), exiting.forEach((key) => {
    if (targetKeys.indexOf(key) !== -1) return;
    const child = allChildren.get(key);
    if (!child) return;
    const insertionIndex = presentKeys.indexOf(key), exitingComponent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_PresenceChild.PresenceChild,
      {
        isPresent: !1,
        onExitComplete: () => {
          allChildren.delete(key), exiting.delete(key);
          const removeIndex = presentChildren.current.findIndex(
            (presentChild) => presentChild.key === key
          );
          presentChildren.current.splice(removeIndex, 1), exiting.size || (presentChildren.current = filteredChildren, forceRender(), onExitComplete?.());
        },
        presenceAffectsLayout,
        enterExitVariant,
        enterVariant,
        exitVariant,
        custom,
        children: child
      },
      getChildKey(child)
    );
    childrenToRender.splice(insertionIndex, 0, exitingComponent);
  }), childrenToRender = childrenToRender.map((child) => {
    const key = child.key;
    return exiting.has(key) ? child : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_PresenceChild.PresenceChild,
      {
        isPresent: !0,
        exitVariant,
        enterVariant,
        enterExitVariant,
        presenceAffectsLayout,
        custom,
        children: child
      },
      getChildKey(child)
    );
  }), presentChildren.current = childrenToRender, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: exiting.size ? childrenToRender : (
    // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
    childrenToRender.map((child) => (0, import_react.cloneElement)(child))
  ) });
};
AnimatePresence.displayName = "AnimatePresence";
//# sourceMappingURL=AnimatePresence.js.map
