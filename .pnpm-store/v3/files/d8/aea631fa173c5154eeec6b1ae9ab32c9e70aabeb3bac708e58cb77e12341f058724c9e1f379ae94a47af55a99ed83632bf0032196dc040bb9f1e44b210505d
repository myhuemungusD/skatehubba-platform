import { useComposedRefs } from "@tamagui/compose-refs";
import { startTransition } from "@tamagui/start-transition";
import { idle, useAsyncEffect } from "@tamagui/use-async";
import { useEvent } from "@tamagui/use-event";
import * as React from "react";
import { useFocusScopeControllerContext } from "./FocusScopeController.mjs";
import { Fragment, jsx } from "react/jsx-runtime";
const AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount",
  AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount",
  EVENT_OPTIONS = {
    bubbles: !1,
    cancelable: !0
  },
  FocusScope = React.forwardRef(function ({
    __scopeFocusScope,
    ...props
  }, forwardedRef) {
    const context = useFocusScopeControllerContext("FocusScope", __scopeFocusScope, {
        warn: !1,
        fallback: {}
      }),
      mergedProps = {
        ...props,
        enabled: context.enabled ?? props.enabled,
        loop: context.loop ?? props.loop,
        trapped: context.trapped ?? props.trapped,
        onMountAutoFocus: context.onMountAutoFocus ?? props.onMountAutoFocus,
        onUnmountAutoFocus: context.onUnmountAutoFocus ?? props.onUnmountAutoFocus,
        forceUnmount: context.forceUnmount ?? props.forceUnmount,
        focusOnIdle: context.focusOnIdle ?? props.focusOnIdle
      },
      childProps = useFocusScope(mergedProps, forwardedRef);
    return typeof mergedProps.children == "function" ? /* @__PURE__ */jsx(Fragment, {
      children: mergedProps.children(childProps)
    }) : React.cloneElement(React.Children.only(mergedProps.children), childProps);
  });
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
    } = props,
    [container, setContainer] = React.useState(null),
    onMountAutoFocus = useEvent(onMountAutoFocusProp),
    onUnmountAutoFocus = useEvent(onUnmountAutoFocusProp),
    lastFocusedElementRef = React.useRef(null),
    setContainerTransition = React.useCallback(node => {
      startTransition(() => {
        setContainer(node);
      });
    }, [setContainer]),
    composedRefs = useComposedRefs(forwardedRef, setContainerTransition),
    focusScope = React.useRef({
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
      container.contains(target) ? (target?.addEventListener("blur", handleBlur, {
        signal: controller.signal
      }), lastFocusedElementRef.current = target) : focus(lastFocusedElementRef.current, {
        select: !0
      });
    }
    function handleFocusOut(event) {
      controller.abort(), !(focusScope.paused || !container) && (container.contains(event.relatedTarget) || focus(lastFocusedElementRef.current, {
        select: !0
      }));
    }
    function handleBlur() {
      lastFocusedElementRef.current = container;
    }
    return document.addEventListener("focusin", handleFocusIn), document.addEventListener("focusout", handleFocusOut), () => {
      controller.abort(), document.removeEventListener("focusin", handleFocusIn), document.removeEventListener("focusout", handleFocusOut);
    };
  }, [trapped, forceUnmount, container, focusScope.paused]), useAsyncEffect(async signal => {
    if (!enabled || !container || forceUnmount) return;
    focusScopesStack.add(focusScope);
    const previouslyFocusedElement = document.activeElement;
    if (!container.contains(previouslyFocusedElement)) {
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
      if (container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus), container.dispatchEvent(mountEvent), !mountEvent.defaultPrevented) {
        focusOnIdle && (await idle(signal, typeof focusOnIdle == "object" ? focusOnIdle : {
          // we can't wait too long or else user can take an action and then we focus
          max: 200,
          min: typeof focusOnIdle == "number" ? focusOnIdle : 16
        }));
        const allCandidates = getTabbableCandidates(container),
          visibleCandidates = removeLinks(allCandidates).filter(candidate => !isHidden(candidate, {
            upTo: container
          }));
        focusFirst(visibleCandidates, {
          select: !0
        }), visibleCandidates.length > 0 ? lastFocusedElementRef.current = visibleCandidates[0] : lastFocusedElementRef.current = container, document.activeElement === previouslyFocusedElement && visibleCandidates.length === 0 && focus(container);
      }
    }
    return () => {
      container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
      const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
      container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus), container.dispatchEvent(unmountEvent), unmountEvent.defaultPrevented || focus(previouslyFocusedElement ?? document.body, {
        select: !0
      }), container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus), focusScopesStack.remove(focusScope);
    };
  }, [enabled, container, forceUnmount, onMountAutoFocus, onUnmountAutoFocus, focusScope, focusOnIdle]);
  const handleKeyDown = React.useCallback(event => {
    if (!trapped || !loop || focusScope.paused || !enabled || !container) return;
    const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey,
      focusedElement = document.activeElement;
    if (isTabKey && focusedElement) {
      const [first, last] = getTabbableEdges(container);
      first && last ? !event.shiftKey && focusedElement === last ? (event.preventDefault(), loop && focus(first, {
        select: !0
      })) : event.shiftKey && focusedElement === first && (event.preventDefault(), loop && focus(last, {
        select: !0
      })) : focusedElement === container && event.preventDefault();
    }
  }, [loop, trapped, focusScope.paused, enabled, container]);
  React.useEffect(() => {
    if (!container || !trapped || !loop || !enabled) return;
    const handleKeyDownCapture = event => {
      event.key === "Tab" && handleKeyDown(event);
    };
    return container.addEventListener("keydown", handleKeyDownCapture, !0), () => {
      container.removeEventListener("keydown", handleKeyDownCapture, !0);
    };
  }, [container, trapped, loop, enabled, handleKeyDown]);
  const existingOnKeyDown = scopeProps.onKeyDown,
    composedOnKeyDown = React.useCallback(event => {
      existingOnKeyDown?.(event);
    }, [existingOnKeyDown]);
  return {
    ...scopeProps,
    ref: composedRefs,
    onKeyDown: composedOnKeyDown
  };
}
function focusFirst(candidates, {
  select = !1
} = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) if (focus(candidate, {
    select
  }), document.activeElement !== previouslyFocusedElement) return;
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container),
    first = findVisible(candidates, container),
    last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [],
    walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
      acceptNode: node => {
        const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
        return node.disabled || node.hidden || isHiddenInput ? NodeFilter.FILTER_SKIP : node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
  for (; walker.nextNode();) nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) if (!isHidden(element, {
    upTo: container
  })) return element;
}
function isHidden(node, {
  upTo
}) {
  if (getComputedStyle(node).visibility === "hidden") return !0;
  for (; node;) {
    if (upTo !== void 0 && node === upTo) return !1;
    if (getComputedStyle(node).display === "none") return !0;
    node = node.parentElement;
  }
  return !1;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, {
  select = !1
} = {}) {
  if (element?.focus) {
    const previouslyFocusedElement = document.activeElement;
    try {
      element.focus({
        preventScroll: !0
      }), element !== previouslyFocusedElement && isSelectableInput(element) && select && element.select();
    } catch {}
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
  const updatedArray = [...array],
    index = updatedArray.indexOf(item);
  return index !== -1 && updatedArray.splice(index, 1), updatedArray;
}
function removeLinks(items) {
  return items.filter(item => item.tagName !== "A");
}
export { FocusScope, useFocusScope };
//# sourceMappingURL=FocusScope.mjs.map
