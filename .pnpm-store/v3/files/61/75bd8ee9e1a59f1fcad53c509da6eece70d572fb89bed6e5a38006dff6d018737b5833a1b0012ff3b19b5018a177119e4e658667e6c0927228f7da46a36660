'use strict';

var core = require('@floating-ui/core');
var React = require('react');
var reactNative = require('react-native');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const ORIGIN$1 = {
  x: 0,
  y: 0
};
const isAndroid = reactNative.Platform.OS === 'android';
function isView(reference) {
  return 'measure' in reference;
}
const createPlatform = _ref => {
  let {
    offsetParent,
    sameScrollView = true,
    scrollOffsets = ORIGIN$1
  } = _ref;
  return {
    getElementRects(_ref2) {
      let {
        reference,
        floating
      } = _ref2;
      return new Promise(resolve => {
        const onMeasure = function (offsetX, offsetY) {
          if (offsetX === void 0) {
            offsetX = 0;
          }
          if (offsetY === void 0) {
            offsetY = 0;
          }
          floating.measure((x, y, width, height) => {
            const floatingRect = {
              width,
              height,
              ...ORIGIN$1
            };
            const method = sameScrollView ? 'measure' : 'measureInWindow';
            if (isView(reference)) {
              reference[method]((x, y, width, height) => {
                y = isAndroid && !sameScrollView && reactNative.StatusBar.currentHeight ? y + reactNative.StatusBar.currentHeight : y;
                const referenceRect = {
                  width,
                  height,
                  x: x - offsetX,
                  y: y - offsetY
                };
                resolve({
                  reference: referenceRect,
                  floating: floatingRect
                });
              });
            } else {
              const boundingRect = reference.getBoundingClientRect();
              const referenceRect = {
                width: boundingRect.width,
                height: boundingRect.height,
                x: boundingRect.x - offsetX,
                y: boundingRect.y - offsetY
              };
              resolve({
                reference: referenceRect,
                floating: floatingRect
              });
            }
          });
        };
        if (offsetParent) {
          offsetParent.measure(onMeasure);
        } else {
          onMeasure();
        }
      });
    },
    getClippingRect() {
      const {
        width: windowWidth,
        height: windowHeight
      } = reactNative.Dimensions.get('window');
      const {
        height: screenHeight
      } = reactNative.Dimensions.get('screen');
      const statusBarHeight = reactNative.StatusBar.currentHeight || 0;
      // on iOS: screenHeight = windowHeight
      // on Android: screenHeight = windowHeight + statusBarHeight + navigationBarHeight
      const navigationBarHeight = isAndroid ? screenHeight - windowHeight - statusBarHeight : 0;
      return Promise.resolve({
        width: windowWidth,
        height: screenHeight - navigationBarHeight,
        ...(sameScrollView ? scrollOffsets : ORIGIN$1)
      });
    },
    convertOffsetParentRelativeRectToViewportRelativeRect(_ref3) {
      let {
        rect
      } = _ref3;
      return new Promise(resolve => {
        const onMeasure = function (offsetX, offsetY) {
          if (offsetX === void 0) {
            offsetX = 0;
          }
          if (offsetY === void 0) {
            offsetY = 0;
          }
          resolve({
            ...rect,
            x: rect.x + offsetX,
            y: rect.y + offsetY
          });
        };
        if (offsetParent) {
          offsetParent.measure(onMeasure);
        } else {
          onMeasure();
        }
      });
    },
    getDimensions: element => new Promise(resolve => element.measure((x, y, width, height) => resolve({
      width,
      height
    })))
  };
};

// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'function' && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0;) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0;) {
      const key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}

const ORIGIN = {
  x: 0,
  y: 0
};
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = 'bottom',
    middleware = [],
    sameScrollView = true,
    elements: {
      reference: externalReference,
      floating: externalFloating,
      offsetParent: externalOffsetParent
    } = {}
  } = options;
  const [_reference, _setReference] = React__namespace.useState(null);
  const [_floating, _setFloating] = React__namespace.useState(null);
  const [_offsetParent, _setOffsetParent] = React__namespace.useState(null);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const offsetParentEl = externalOffsetParent || _offsetParent;
  const setReference = React__namespace.useCallback(node => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React__namespace.useCallback(node => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const setOffsetParent = React__namespace.useCallback(node => {
    if (node !== offsetParentRef.current) {
      offsetParentRef.current = node;
      _setOffsetParent(node);
    }
  }, []);
  const referenceRef = React__namespace.useRef(null);
  const floatingRef = React__namespace.useRef(null);
  const offsetParentRef = React__namespace.useRef(null);
  const [data, setData] = React__namespace.useState({
    x: 0,
    y: 0,
    placement,
    strategy: 'absolute',
    middlewareData: {}
  });
  const [scrollOffsets, setScrollOffsets] = React__namespace.useState(ORIGIN);
  const [latestMiddleware, setLatestMiddleware] = React__namespace.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const platform = React__namespace.useMemo(() => createPlatform({
    offsetParent: offsetParentEl,
    scrollOffsets,
    sameScrollView
  }), [offsetParentEl, scrollOffsets, sameScrollView]);
  const update = React__namespace.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    core.computePosition(referenceRef.current, floatingRef.current, {
      middleware: latestMiddleware,
      platform,
      placement
    }).then(data => {
      if (isMountedRef.current) {
        setData(data);
      }
    });
  }, [latestMiddleware, platform, placement]);
  React__namespace.useLayoutEffect(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (offsetParentEl) offsetParentRef.current = offsetParentEl;
    const frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [referenceEl, floatingEl, offsetParentEl, update]);
  const isMountedRef = React__namespace.useRef(true);
  React__namespace.useLayoutEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  const refs = React__namespace.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    offsetParent: offsetParentRef,
    setReference,
    setFloating,
    setOffsetParent
  }), [setReference, setFloating, setOffsetParent]);
  const elements = React__namespace.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl,
    offsetParent: offsetParentEl
  }), [referenceEl, floatingEl, offsetParentEl]);
  const floatingStyles = React__namespace.useMemo(() => {
    if (!elements.floating) {
      return {
        position: 'absolute',
        left: 0,
        top: 0
      };
    }
    return {
      position: 'absolute',
      left: data.x,
      top: data.y
    };
  }, [elements.floating, data.x, data.y]);
  return React__namespace.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles,
    offsetParent: setOffsetParent,
    reference: setReference,
    floating: setFloating,
    scrollProps: {
      onScroll: event => setScrollOffsets(event.nativeEvent.contentOffset),
      scrollEventThrottle: 16
    }
  }), [data, refs, elements, floatingStyles, setReference, setFloating, setOffsetParent, update]);
}

/**
 * A data provider that provides data to position an inner element of the
 * floating element (usually a triangle or caret) so that it is centered to the
 * reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, 'current');
  }
  return {
    name: 'arrow',
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === 'function' ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return core.arrow({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return core.arrow({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = (options, deps) => ({
  ...core.offset(options),
  options: [options, deps]
});

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = (options, deps) => ({
  ...core.shift(options),
  options: [options, deps]
});

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = (options, deps) => ({
  ...core.limitShift(options),
  options: [options, deps]
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = (options, deps) => ({
  ...core.flip(options),
  options: [options, deps]
});

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = (options, deps) => ({
  ...core.size(options),
  options: [options, deps]
});

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = (options, deps) => ({
  ...core.autoPlacement(options),
  options: [options, deps]
});

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = (options, deps) => ({
  ...core.hide(options),
  options: [options, deps]
});

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = (options, deps) => ({
  ...core.inline(options),
  options: [options, deps]
});

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = (options, deps) => ({
  ...arrow$1(options),
  options: [options, deps]
});

Object.defineProperty(exports, "detectOverflow", {
  enumerable: true,
  get: function () { return core.detectOverflow; }
});
exports.arrow = arrow;
exports.autoPlacement = autoPlacement;
exports.flip = flip;
exports.hide = hide;
exports.inline = inline;
exports.limitShift = limitShift;
exports.offset = offset;
exports.shift = shift;
exports.size = size;
exports.useFloating = useFloating;
