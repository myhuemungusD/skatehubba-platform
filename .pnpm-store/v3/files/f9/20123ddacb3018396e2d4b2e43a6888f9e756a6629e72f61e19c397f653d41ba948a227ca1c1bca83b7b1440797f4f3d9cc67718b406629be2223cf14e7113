import { isClient, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { isEqualShallow } from "@tamagui/is-equal-shallow";
import { createContext, useContext, useId } from "react";
import { jsx } from "react/jsx-runtime";
const LayoutHandlers = /* @__PURE__ */ new WeakMap(), LayoutDisableKey = /* @__PURE__ */ new WeakMap(), Nodes = /* @__PURE__ */ new Set(), IntersectionState = /* @__PURE__ */ new WeakMap(), DisableLayoutContextValues = {}, DisableLayoutContextKey = createContext(""), ENABLE = isClient && typeof IntersectionObserver < "u", LayoutMeasurementController = ({
  disable,
  children
}) => {
  const id = useId();
  return useIsomorphicLayoutEffect(() => {
    DisableLayoutContextValues[id] = disable;
  }, [disable, id]), /* @__PURE__ */ jsx(DisableLayoutContextKey.Provider, { value: id, children });
};
let globalIntersectionObserver = null, strategy = "async";
function setOnLayoutStrategy(state) {
  strategy = state;
}
const NodeRectCache = /* @__PURE__ */ new WeakMap(), LastChangeTime = /* @__PURE__ */ new WeakMap();
let avoidUpdates = !0;
const queuedUpdates = /* @__PURE__ */ new Map();
function enable() {
  avoidUpdates && (avoidUpdates = !1, queuedUpdates && (queuedUpdates.forEach((cb) => cb()), queuedUpdates.clear()));
}
function startGlobalObservers() {
  !ENABLE || globalIntersectionObserver || (globalIntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const node = entry.target;
        IntersectionState.get(node) !== entry.isIntersecting && IntersectionState.set(node, entry.isIntersecting);
      });
    },
    {
      threshold: 0
    }
  ));
}
if (ENABLE) {
  const BoundingRects = /* @__PURE__ */ new WeakMap();
  async function updateLayoutIfChanged(node) {
    const onLayout = LayoutHandlers.get(node);
    if (typeof onLayout != "function") return;
    const parentNode = node.parentElement;
    if (!parentNode) return;
    let nodeRect, parentRect;
    if (strategy === "async") {
      const [nr, pr] = await Promise.all([
        BoundingRects.get(node),
        BoundingRects.get(parentNode)
      ]);
      if (!nr || !pr)
        return;
      nodeRect = nr, parentRect = pr;
    } else
      nodeRect = node.getBoundingClientRect(), parentRect = parentNode.getBoundingClientRect();
    if (!nodeRect || !parentRect)
      return;
    const cachedRect = NodeRectCache.get(node), cachedParentRect = NodeRectCache.get(parentNode);
    if (!cachedRect || !cachedParentRect || // has changed one rect
    // @ts-expect-error DOMRectReadOnly can go into object
    !isEqualShallow(cachedRect, nodeRect) || // @ts-expect-error DOMRectReadOnly can go into object
    !isEqualShallow(cachedParentRect, parentRect)) {
      NodeRectCache.set(node, nodeRect), NodeRectCache.set(parentNode, parentRect);
      const event = getElementLayoutEvent(nodeRect, parentRect);
      avoidUpdates ? queuedUpdates.set(node, () => onLayout(event)) : onLayout(event);
    }
  }
  const userSkipVal = process.env.TAMAGUI_LAYOUT_FRAME_SKIP, RUN_EVERY_X_FRAMES = userSkipVal ? +userSkipVal : 14;
  async function layoutOnAnimationFrame() {
    if (strategy !== "off") {
      const visibleNodes = [];
      await new Promise((res) => {
        const io = new IntersectionObserver(
          (entries) => {
            io.disconnect();
            for (const entry of entries)
              BoundingRects.set(entry.target, entry.boundingClientRect);
            res(!0);
          },
          {
            threshold: 0
          }
        );
        let didObserve = !1;
        for (const node of Nodes) {
          if (!(node.parentElement instanceof HTMLElement)) continue;
          const disableKey = LayoutDisableKey.get(node);
          disableKey && DisableLayoutContextValues[disableKey] === !0 || IntersectionState.get(node) !== !1 && (didObserve = !0, io.observe(node), io.observe(node.parentElement), visibleNodes.push(node));
        }
        didObserve || res(!1);
      }) && visibleNodes.forEach((node) => {
        updateLayoutIfChanged(node);
      });
    }
    setTimeout(layoutOnAnimationFrame, 16.6667 * RUN_EVERY_X_FRAMES);
  }
  layoutOnAnimationFrame();
}
const getElementLayoutEvent = (nodeRect, parentRect) => ({
  nativeEvent: {
    layout: getRelativeDimensions(nodeRect, parentRect),
    target: nodeRect
  },
  timeStamp: Date.now()
}), getRelativeDimensions = (a, b) => {
  const { height, left, top, width } = a, x = left - b.left, y = top - b.top;
  return { x, y, width, height, pageX: a.left, pageY: a.top };
};
function useElementLayout(ref, onLayout) {
  const disableKey = useContext(DisableLayoutContextKey), node = ensureWebElement(ref.current?.host);
  node && onLayout && (LayoutHandlers.set(node, onLayout), LayoutDisableKey.set(node, disableKey)), useIsomorphicLayoutEffect(() => {
    if (!onLayout) return;
    const node2 = ref.current?.host;
    if (!node2) return;
    Nodes.add(node2), startGlobalObservers(), globalIntersectionObserver && (globalIntersectionObserver.observe(node2), IntersectionState.set(node2, !0));
    const parentNode = node2.parentNode;
    return parentNode && onLayout(
      getElementLayoutEvent(
        node2.getBoundingClientRect(),
        parentNode.getBoundingClientRect()
      )
    ), () => {
      Nodes.delete(node2), LayoutHandlers.delete(node2), NodeRectCache.delete(node2), LastChangeTime.delete(node2), IntersectionState.delete(node2), globalIntersectionObserver && globalIntersectionObserver.unobserve(node2);
    };
  }, [ref, !!onLayout]);
}
function ensureWebElement(x) {
  if (!(typeof HTMLElement > "u"))
    return x instanceof HTMLElement ? x : void 0;
}
const getBoundingClientRectAsync = (node) => new Promise((res) => {
  if (!node || node.nodeType !== 1) return res(!1);
  const io = new IntersectionObserver(
    (entries) => (io.disconnect(), res(entries[0].boundingClientRect)),
    {
      threshold: 0
    }
  );
  io.observe(node);
}), measureNode = async (node, relativeTo) => {
  const relativeNode = relativeTo || node?.parentElement;
  if (relativeNode instanceof HTMLElement) {
    const [nodeDim, relativeNodeDim] = await Promise.all([
      getBoundingClientRectAsync(node),
      getBoundingClientRectAsync(relativeNode)
    ]);
    if (relativeNodeDim && nodeDim)
      return getRelativeDimensions(nodeDim, relativeNodeDim);
  }
  return null;
}, measure = async (node, callback) => {
  const out = await measureNode(
    node,
    node.parentNode instanceof HTMLElement ? node.parentNode : null
  );
  return out && callback?.(out.x, out.y, out.width, out.height, out.pageX, out.pageY), out;
};
function createMeasure(node) {
  return (callback) => measure(node, callback);
}
const measureInWindow = async (node, callback) => {
  const out = await measureNode(node, null);
  return out && callback?.(out.pageX, out.pageY, out.width, out.height), out;
}, createMeasureInWindow = (node) => (callback) => measureInWindow(node, callback), measureLayout = async (node, relativeNode, callback) => {
  const out = await measureNode(node, relativeNode);
  return out && callback?.(out.x, out.y, out.width, out.height, out.pageX, out.pageY), out;
};
function createMeasureLayout(node) {
  return (relativeTo, callback) => measureLayout(node, relativeTo, callback);
}
export {
  LayoutMeasurementController,
  createMeasure,
  createMeasureInWindow,
  createMeasureLayout,
  enable,
  getBoundingClientRectAsync,
  getElementLayoutEvent,
  measure,
  measureInWindow,
  measureLayout,
  measureNode,
  setOnLayoutStrategy,
  useElementLayout
};
//# sourceMappingURL=index.js.map
