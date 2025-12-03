import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import { useForceUpdate } from "@tamagui/use-force-update";
import { Children, cloneElement, isValidElement, useContext, useRef } from "react";
import { LayoutGroupContext } from "./LayoutGroupContext.native.js";
import { PresenceChild } from "./PresenceChild.native.js";
var getChildKey = function (child) {
  return child.key || "";
};
function updateChildLookup(children, allChildren) {
  children.forEach(function (child) {
    var key = getChildKey(child);
    allChildren.set(key, child);
  });
}
function onlyElements(children) {
  var filtered = [];
  return Children.forEach(children, function (child) {
    /* @__PURE__ */isValidElement(child) && filtered.push(child);
  }), filtered;
}
var AnimatePresence = function (param) {
  var {
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
    } = param,
    _useContext_forceRender,
    forceRender = (_useContext_forceRender = useContext(LayoutGroupContext).forceRender) !== null && _useContext_forceRender !== void 0 ? _useContext_forceRender : useForceUpdate(),
    filteredChildren = onlyElements(children),
    presentChildren = useRef(filteredChildren),
    allChildren = useRef(/* @__PURE__ */new Map()).current,
    exiting = useRef(/* @__PURE__ */new Set()).current;
  updateChildLookup(filteredChildren, allChildren);
  var isInitialRender = useRef(!0);
  if (passThrough) return /* @__PURE__ */_jsx(_Fragment, {
    children
  });
  if (useIsomorphicLayoutEffect(function () {
    isInitialRender.current = !1;
  }, []), isInitialRender.current) return /* @__PURE__ */_jsx(_Fragment, {
    children: filteredChildren.map(function (child) {
      return /* @__PURE__ */_jsx(PresenceChild, {
        isPresent: !0,
        enterExitVariant,
        exitVariant,
        enterVariant,
        initial: initial ? void 0 : !1,
        presenceAffectsLayout,
        custom,
        children: child
      }, getChildKey(child));
    })
  });
  for (var childrenToRender = [...filteredChildren], presentKeys = presentChildren.current.map(getChildKey), targetKeys = filteredChildren.map(getChildKey), numPresent = presentKeys.length, i = 0; i < numPresent; i++) {
    var key = presentKeys[i];
    targetKeys.indexOf(key) === -1 ? exiting.add(key) : exiting.delete(key);
  }
  return exitBeforeEnter && exiting.size && (childrenToRender = []), exiting.forEach(function (key2) {
    if (targetKeys.indexOf(key2) === -1) {
      var child = allChildren.get(key2);
      if (child) {
        var insertionIndex = presentKeys.indexOf(key2),
          onExit = function () {
            allChildren.delete(key2), exiting.delete(key2);
            var removeIndex = presentChildren.current.findIndex(function (presentChild) {
              return presentChild.key === key2;
            });
            presentChildren.current.splice(removeIndex, 1), exiting.size || (presentChildren.current = filteredChildren, forceRender(), onExitComplete?.());
          },
          exitingComponent = /* @__PURE__ */_jsx(PresenceChild, {
            isPresent: !1,
            onExitComplete: onExit,
            presenceAffectsLayout,
            enterExitVariant,
            enterVariant,
            exitVariant,
            custom,
            children: child
          }, getChildKey(child));
        childrenToRender.splice(insertionIndex, 0, exitingComponent);
      }
    }
  }), childrenToRender = childrenToRender.map(function (child) {
    var key2 = child.key;
    return exiting.has(key2) ? child : /* @__PURE__ */_jsx(PresenceChild, {
      isPresent: !0,
      exitVariant,
      enterVariant,
      enterExitVariant,
      presenceAffectsLayout,
      custom,
      children: child
    }, getChildKey(child));
  }), presentChildren.current = childrenToRender, /* @__PURE__ */_jsx(_Fragment, {
    children: exiting.size ? childrenToRender :
    // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
    childrenToRender.map(function (child) {
      return /* @__PURE__ */cloneElement(child);
    })
  });
};
AnimatePresence.displayName = "AnimatePresence";
export { AnimatePresence };
//# sourceMappingURL=AnimatePresence.native.js.map
