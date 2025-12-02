import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import { useForceUpdate } from "@tamagui/use-force-update";
import { Children, cloneElement, isValidElement, useContext, useRef } from "react";
import { LayoutGroupContext } from "./LayoutGroupContext";
import { PresenceChild } from "./PresenceChild";
import { Fragment, jsx } from "react/jsx-runtime";
const getChildKey = (child) => child.key || "";
function updateChildLookup(children, allChildren) {
  children.forEach((child) => {
    const key = getChildKey(child);
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  const filtered = [];
  return Children.forEach(children, (child) => {
    isValidElement(child) && filtered.push(child);
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
  let forceRender = useContext(LayoutGroupContext).forceRender ?? useForceUpdate();
  const filteredChildren = onlyElements(children), presentChildren = useRef(filteredChildren), allChildren = useRef(/* @__PURE__ */ new Map()).current, exiting = useRef(/* @__PURE__ */ new Set()).current;
  updateChildLookup(filteredChildren, allChildren);
  const isInitialRender = useRef(!0);
  if (passThrough)
    return /* @__PURE__ */ jsx(Fragment, { children });
  if (useIsomorphicLayoutEffect(() => {
    isInitialRender.current = !1;
  }, []), isInitialRender.current)
    return /* @__PURE__ */ jsx(Fragment, { children: filteredChildren.map((child) => /* @__PURE__ */ jsx(
      PresenceChild,
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
    const insertionIndex = presentKeys.indexOf(key), exitingComponent = /* @__PURE__ */ jsx(
      PresenceChild,
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
    return exiting.has(key) ? child : /* @__PURE__ */ jsx(
      PresenceChild,
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
  }), presentChildren.current = childrenToRender, /* @__PURE__ */ jsx(Fragment, { children: exiting.size ? childrenToRender : (
    // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
    childrenToRender.map((child) => cloneElement(child))
  ) });
};
AnimatePresence.displayName = "AnimatePresence";
export {
  AnimatePresence
};
//# sourceMappingURL=AnimatePresence.js.map
