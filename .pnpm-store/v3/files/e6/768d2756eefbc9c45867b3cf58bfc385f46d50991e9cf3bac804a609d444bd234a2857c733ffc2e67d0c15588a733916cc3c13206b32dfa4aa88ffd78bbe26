var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var FocusScope_exports = {};
__export(FocusScope_exports, {
  FocusScope: () => FocusScope,
  useFocusScope: () => useFocusScope
});
module.exports = __toCommonJS(FocusScope_exports);
var import_compose_refs = require("@tamagui/compose-refs"), import_start_transition = require("@tamagui/start-transition"), import_use_async = require("@tamagui/use-async"), import_use_event = require("@tamagui/use-event"), React = __toESM(require("react"), 1), import_FocusScopeController = require("./FocusScopeController"), import_jsx_runtime = require("react/jsx-runtime");
const AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount", AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount", EVENT_OPTIONS = { bubbles: !1, cancelable: !0 }, FocusScope = React.forwardRef(
  function({ __scopeFocusScope, ...props }, forwardedRef) {
    const context = (0, import_FocusScopeController.useFocusScopeControllerContext)("FocusScope", __scopeFocusScope, {
      warn: !1,
      fallback: {}
    }), mergedProps = {
      ...props,
      enabled: context.enabled ?? props.enabled,
      loop: context.loop ?? props.loop,
      trapped: context.trapped ?? props.trapped,
      onMountAutoFocus: context.onMountAutoFocus ?? props.onMountAutoFocus,
      onUnmountAutoFocus: context.onUnmountAutoFocus ?? props.onUnmountAutoFocus,
      forceUnmount: context.forceUnmount ?? props.forceUnmount,
      focusOnIdle: context.focusOnIdle ?? props.focusOnIdle
    }, childProps = useFocusScope(mergedProps, forwardedRef);
    return typeof mergedProps.children == "function" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: mergedProps.children(childProps) }) : React.cloneElement(
      React.Children.only(mergedProps.children),
      childProps
    );
  }
);
function useFocusScope(props, forwardedRef) {
  const {
    loop = !1,
    enabled = !0,
    trapped = !1,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    forceUnmount,
    focusOnIdle = !0,
    children,
    ...scopeProps
  } = props, [container, setContainer] = React.useState(null), onMountAutoFocus = (0, import_use_event.useEvent)(onMountAutoFocusProp), onUnmountAutoFocus = (0, import_use_event.useEvent)(onUnmountAutoFocusProp), lastFocusedElementRef = React.useRef(null), setContainerTransition = React.useCallback(
    (node) => {
      (0, import_start_transition.startTransition)(() => {
        setContainer(node);
      });
    },
    [setContainer]
  ), composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, setContainerTransition), focusScope = React.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  React.useEffect(() => {
    if (!enabled || !trapped) return;
    const controller = new AbortController();
    function handleFocusIn(event) {
      if (focusScope.paused || !container) return;
      const target = event.target;
      container.contains(target) ? (target?.addEventListener("blur", handleBlur, { signal: controller.signal }), lastFocusedElementRef.current = target) : focus(lastFocusedElementRef.current, { select: !0 });
    }
    function handleFocusOut(event) {
      controller.abort(), !(focusScope.paused || !container) && (container.contains(event.relatedTarget) || focus(lastFocusedElementRef.current, { select: !0 }));
    }
    function handleBlur() {
      lastFocusedElementRef.current = container;
    }
    return document.addEventListener("focusin", handleFocusIn), document.addEventListener("focusout", handleFocusOut), () => {
      controller.abort(), document.removeEventListener("focusin", handleFocusIn), document.removeEventListener("focusout", handleFocusOut);
    };
  }, [trapped, forceUnmount, container, focusScope.paused]), (0, import_use_async.useAsyncEffect)(
    async (signal) => {
      if (!enabled || !container || forceUnmount) return;
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      if (!container.contains(previouslyFocusedElement)) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        if (container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus), container.dispatchEvent(mountEvent), !mountEvent.defaultPrevented) {
          focusOnIdle && await (0, import_use_async.idle)(
            signal,
            typeof focusOnIdle == "object" ? focusOnIdle : {
              // we can't wait too long or else user can take an action and then we focus
              max: 200,
              min: typeof focusOnIdle == "number" ? focusOnIdle : 16
            }
          );
          const allCandidates = getTabbableCandidates(container), visibleCandidates = removeLinks(allCandidates).filter(
            (candidate) => !isHidden(candidate, { upTo: container })
          );
          focusFirst(visibleCandidates, { select: !0 }), visibleCandidates.length > 0 ? lastFocusedElementRef.current = visibleCandidates[0] : lastFocusedElementRef.current = container, document.activeElement === previouslyFocusedElement && visibleCandidates.length === 0 && focus(container);
        }
      }
      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus), container.dispatchEvent(unmountEvent), unmountEvent.defaultPrevented || focus(previouslyFocusedElement ?? document.body, { select: !0 }), container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus), focusScopesStack.remove(focusScope);
      };
    },
    [
      enabled,
      container,
      forceUnmount,
      onMountAutoFocus,
      onUnmountAutoFocus,
      focusScope,
      focusOnIdle
    ]
  );
  const handleKeyDown = React.useCallback(
    (event) => {
      if (!trapped || !loop || focusScope.paused || !enabled || !container) return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey, focusedElement = document.activeElement;
      if (isTabKey && focusedElement) {
        const [first, last] = getTabbableEdges(container);
        first && last ? !event.shiftKey && focusedElement === last ? (event.preventDefault(), loop && focus(first, { select: !0 })) : event.shiftKey && focusedElement === first && (event.preventDefault(), loop && focus(last, { select: !0 })) : focusedElement === container && event.preventDefault();
      }
    },
    [loop, trapped, focusScope.paused, enabled, container]
  );
  React.useEffect(() => {
    if (!container || !trapped || !loop || !enabled) return;
    const handleKeyDownCapture = (event) => {
      event.key === "Tab" && handleKeyDown(event);
    };
    return container.addEventListener("keydown", handleKeyDownCapture, !0), () => {
      container.removeEventListener("keydown", handleKeyDownCapture, !0);
    };
  }, [container, trapped, loop, enabled, handleKeyDown]);
  const existingOnKeyDown = scopeProps.onKeyDown, composedOnKeyDown = React.useCallback(
    (event) => {
      existingOnKeyDown?.(event);
    },
    [existingOnKeyDown]
  );
  return {
    ...scopeProps,
    ref: composedRefs,
    onKeyDown: composedOnKeyDown
  };
}
function focusFirst(candidates, { select = !1 } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates)
    if (focus(candidate, { select }), document.activeElement !== previouslyFocusedElement) return;
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container), first = findVisible(candidates, container), last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [], walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      return node.disabled || node.hidden || isHiddenInput ? NodeFilter.FILTER_SKIP : node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; walker.nextNode(); ) nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements)
    if (!isHidden(element, { upTo: container })) return element;
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden") return !0;
  for (; node; ) {
    if (upTo !== void 0 && node === upTo) return !1;
    if (getComputedStyle(node).display === "none") return !0;
    node = node.parentElement;
  }
  return !1;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = !1 } = {}) {
  if (element?.focus) {
    const previouslyFocusedElement = document.activeElement;
    try {
      element.focus({ preventScroll: !0 }), element !== previouslyFocusedElement && isSelectableInput(element) && select && element.select();
    } catch {
    }
  }
}
const focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      focusScope !== activeFocusScope && activeFocusScope?.pause(), stack = arrayRemove(stack, focusScope), stack.unshift(focusScope);
    },
    remove(focusScope) {
      stack = arrayRemove(stack, focusScope), stack[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array], index = updatedArray.indexOf(item);
  return index !== -1 && updatedArray.splice(index, 1), updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}
//# sourceMappingURL=FocusScope.js.map
