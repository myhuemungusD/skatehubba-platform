import { jsx as _jsx } from "react/jsx-runtime";
import { isClient, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { isEqualShallow } from "@tamagui/is-equal-shallow";
import { createContext, useContext, useId } from "react";
function _instanceof(left, right) {
  return right != null && typeof Symbol < "u" && right[Symbol.hasInstance] ? !!right[Symbol.hasInstance](left) : left instanceof right;
}
var LayoutHandlers = /* @__PURE__ */new WeakMap(),
  LayoutDisableKey = /* @__PURE__ */new WeakMap(),
  Nodes = /* @__PURE__ */new Set(),
  IntersectionState = /* @__PURE__ */new WeakMap(),
  DisableLayoutContextValues = {},
  DisableLayoutContextKey = /* @__PURE__ */createContext(""),
  ENABLE = isClient && typeof IntersectionObserver < "u",
  LayoutMeasurementController = function (param) {
    var {
        disable,
        children
      } = param,
      id = useId();
    return useIsomorphicLayoutEffect(function () {
      DisableLayoutContextValues[id] = disable;
    }, [disable, id]), /* @__PURE__ */_jsx(DisableLayoutContextKey.Provider, {
      value: id,
      children
    });
  },
  globalIntersectionObserver = null,
  strategy = "async";
function setOnLayoutStrategy(state) {
  strategy = state;
}
var NodeRectCache = /* @__PURE__ */new WeakMap(),
  LastChangeTime = /* @__PURE__ */new WeakMap(),
  avoidUpdates = !0,
  queuedUpdates = /* @__PURE__ */new Map();
function enable() {
  avoidUpdates && (avoidUpdates = !1, queuedUpdates && (queuedUpdates.forEach(function (cb) {
    return cb();
  }), queuedUpdates.clear()));
}
function startGlobalObservers() {
  !ENABLE || globalIntersectionObserver || (globalIntersectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var node = entry.target;
      IntersectionState.get(node) !== entry.isIntersecting && IntersectionState.set(node, entry.isIntersecting);
    });
  }, {
    threshold: 0
  }));
}
if (ENABLE) {
  var BoundingRects = /* @__PURE__ */new WeakMap();
  async function updateLayoutIfChanged(node) {
    var onLayout = LayoutHandlers.get(node);
    if (typeof onLayout == "function") {
      var parentNode = node.parentElement;
      if (parentNode) {
        var nodeRect, parentRect;
        if (strategy === "async") {
          var [nr, pr] = await Promise.all([BoundingRects.get(node), BoundingRects.get(parentNode)]);
          if (!nr || !pr) return;
          nodeRect = nr, parentRect = pr;
        } else nodeRect = node.getBoundingClientRect(), parentRect = parentNode.getBoundingClientRect();
        if (!(!nodeRect || !parentRect)) {
          var cachedRect = NodeRectCache.get(node),
            cachedParentRect = NodeRectCache.get(parentNode);
          if (!cachedRect || !cachedParentRect ||
          // has changed one rect
          // @ts-expect-error DOMRectReadOnly can go into object
          !isEqualShallow(cachedRect, nodeRect) ||
          // @ts-expect-error DOMRectReadOnly can go into object
          !isEqualShallow(cachedParentRect, parentRect)) {
            NodeRectCache.set(node, nodeRect), NodeRectCache.set(parentNode, parentRect);
            var event = getElementLayoutEvent(nodeRect, parentRect);
            avoidUpdates ? queuedUpdates.set(node, function () {
              return onLayout(event);
            }) : onLayout(event);
          }
        }
      }
    }
  }
  var userSkipVal = process.env.TAMAGUI_LAYOUT_FRAME_SKIP,
    RUN_EVERY_X_FRAMES = userSkipVal ? +userSkipVal : 14;
  async function layoutOnAnimationFrame() {
    if (strategy !== "off") {
      var visibleNodes = [],
        didRun = await new Promise(function (res) {
          var io = new IntersectionObserver(function (entries) {
              io.disconnect();
              var _iteratorNormalCompletion2 = !0,
                _didIteratorError2 = !1,
                _iteratorError2 = void 0;
              try {
                for (var _iterator2 = entries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
                  var entry = _step2.value;
                  BoundingRects.set(entry.target, entry.boundingClientRect);
                }
              } catch (err) {
                _didIteratorError2 = !0, _iteratorError2 = err;
              } finally {
                try {
                  !_iteratorNormalCompletion2 && _iterator2.return != null && _iterator2.return();
                } finally {
                  if (_didIteratorError2) throw _iteratorError2;
                }
              }
              res(!0);
            }, {
              threshold: 0
            }),
            didObserve = !1,
            _iteratorNormalCompletion = !0,
            _didIteratorError = !1,
            _iteratorError = void 0;
          try {
            for (var _iterator = Nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
              var node = _step.value;
              if (_instanceof(node.parentElement, HTMLElement)) {
                var disableKey = LayoutDisableKey.get(node);
                disableKey && DisableLayoutContextValues[disableKey] === !0 || IntersectionState.get(node) !== !1 && (didObserve = !0, io.observe(node), io.observe(node.parentElement), visibleNodes.push(node));
              }
            }
          } catch (err) {
            _didIteratorError = !0, _iteratorError = err;
          } finally {
            try {
              !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
            } finally {
              if (_didIteratorError) throw _iteratorError;
            }
          }
          didObserve || res(!1);
        });
      didRun && visibleNodes.forEach(function (node) {
        updateLayoutIfChanged(node);
      });
    }
    setTimeout(layoutOnAnimationFrame, 16.6667 * RUN_EVERY_X_FRAMES);
  }
  layoutOnAnimationFrame();
}
var getElementLayoutEvent = function (nodeRect, parentRect) {
    return {
      nativeEvent: {
        layout: getRelativeDimensions(nodeRect, parentRect),
        target: nodeRect
      },
      timeStamp: Date.now()
    };
  },
  getRelativeDimensions = function (a, b) {
    var {
        height,
        left,
        top,
        width
      } = a,
      x = left - b.left,
      y = top - b.top;
    return {
      x,
      y,
      width,
      height,
      pageX: a.left,
      pageY: a.top
    };
  };
function useElementLayout(ref, onLayout) {
  var _ref_current,
    disableKey = useContext(DisableLayoutContextKey),
    node = ensureWebElement((_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.host);
  node && onLayout && (LayoutHandlers.set(node, onLayout), LayoutDisableKey.set(node, disableKey)), useIsomorphicLayoutEffect(function () {
    var _ref_current2;
    if (onLayout) {
      var node2 = (_ref_current2 = ref.current) === null || _ref_current2 === void 0 ? void 0 : _ref_current2.host;
      if (node2) {
        Nodes.add(node2), startGlobalObservers(), globalIntersectionObserver && (globalIntersectionObserver.observe(node2), IntersectionState.set(node2, !0));
        var parentNode = node2.parentNode;
        return parentNode && onLayout(getElementLayoutEvent(node2.getBoundingClientRect(), parentNode.getBoundingClientRect())), function () {
          Nodes.delete(node2), LayoutHandlers.delete(node2), NodeRectCache.delete(node2), LastChangeTime.delete(node2), IntersectionState.delete(node2), globalIntersectionObserver && globalIntersectionObserver.unobserve(node2);
        };
      }
    }
  }, [ref, !!onLayout]);
}
function ensureWebElement(x) {
  if (!(typeof HTMLElement > "u")) return _instanceof(x, HTMLElement) ? x : void 0;
}
var getBoundingClientRectAsync = function (node) {
    return new Promise(function (res) {
      if (!node || node.nodeType !== 1) return res(!1);
      var io = new IntersectionObserver(function (entries) {
        return io.disconnect(), res(entries[0].boundingClientRect);
      }, {
        threshold: 0
      });
      io.observe(node);
    });
  },
  measureNode = async function (node, relativeTo) {
    var relativeNode = relativeTo || node?.parentElement;
    if (_instanceof(relativeNode, HTMLElement)) {
      var [nodeDim, relativeNodeDim] = await Promise.all([getBoundingClientRectAsync(node), getBoundingClientRectAsync(relativeNode)]);
      if (relativeNodeDim && nodeDim) return getRelativeDimensions(nodeDim, relativeNodeDim);
    }
    return null;
  },
  measure = async function (node, callback) {
    var out = await measureNode(node, _instanceof(node.parentNode, HTMLElement) ? node.parentNode : null);
    return out && callback?.(out.x, out.y, out.width, out.height, out.pageX, out.pageY), out;
  };
function createMeasure(node) {
  return function (callback) {
    return measure(node, callback);
  };
}
var measureInWindow = async function (node, callback) {
    var out = await measureNode(node, null);
    return out && callback?.(out.pageX, out.pageY, out.width, out.height), out;
  },
  createMeasureInWindow = function (node) {
    return function (callback) {
      return measureInWindow(node, callback);
    };
  },
  measureLayout = async function (node, relativeNode, callback) {
    var out = await measureNode(node, relativeNode);
    return out && callback?.(out.x, out.y, out.width, out.height, out.pageX, out.pageY), out;
  };
function createMeasureLayout(node) {
  return function (relativeTo, callback) {
    return measureLayout(node, relativeTo, callback);
  };
}
export { LayoutMeasurementController, createMeasure, createMeasureInWindow, createMeasureLayout, enable, getBoundingClientRectAsync, getElementLayoutEvent, measure, measureInWindow, measureLayout, measureNode, setOnLayoutStrategy, useElementLayout };
//# sourceMappingURL=index.native.js.map
