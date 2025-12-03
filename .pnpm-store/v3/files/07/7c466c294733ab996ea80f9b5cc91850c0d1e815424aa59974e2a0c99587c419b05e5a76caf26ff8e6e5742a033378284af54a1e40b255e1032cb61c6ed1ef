"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var AnimatePresence_exports = {};
__export(AnimatePresence_exports, {
  AnimatePresence: () => AnimatePresence
});
module.exports = __toCommonJS(AnimatePresence_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_constants = require("@tamagui/constants"),
  import_use_force_update = require("@tamagui/use-force-update"),
  import_react = require("react"),
  import_LayoutGroupContext = require("./LayoutGroupContext.native.js"),
  import_PresenceChild = require("./PresenceChild.native.js"),
  getChildKey = function (child) {
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
  return import_react.Children.forEach(children, function (child) {
    /* @__PURE__ */(0, import_react.isValidElement)(child) && filtered.push(child);
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
    forceRender = (_useContext_forceRender = (0, import_react.useContext)(import_LayoutGroupContext.LayoutGroupContext).forceRender) !== null && _useContext_forceRender !== void 0 ? _useContext_forceRender : (0, import_use_force_update.useForceUpdate)(),
    filteredChildren = onlyElements(children),
    presentChildren = (0, import_react.useRef)(filteredChildren),
    allChildren = (0, import_react.useRef)(/* @__PURE__ */new Map()).current,
    exiting = (0, import_react.useRef)(/* @__PURE__ */new Set()).current;
  updateChildLookup(filteredChildren, allChildren);
  var isInitialRender = (0, import_react.useRef)(!0);
  if (passThrough) return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children
  });
  if ((0, import_constants.useIsomorphicLayoutEffect)(function () {
    isInitialRender.current = !1;
  }, []), isInitialRender.current) return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: filteredChildren.map(function (child) {
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_PresenceChild.PresenceChild, {
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
          exitingComponent = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_PresenceChild.PresenceChild, {
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
    return exiting.has(key2) ? child : /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_PresenceChild.PresenceChild, {
      isPresent: !0,
      exitVariant,
      enterVariant,
      enterExitVariant,
      presenceAffectsLayout,
      custom,
      children: child
    }, getChildKey(child));
  }), presentChildren.current = childrenToRender, /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: exiting.size ? childrenToRender :
    // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
    childrenToRender.map(function (child) {
      return /* @__PURE__ */(0, import_react.cloneElement)(child);
    })
  });
};
AnimatePresence.displayName = "AnimatePresence";
//# sourceMappingURL=AnimatePresence.native.js.map
