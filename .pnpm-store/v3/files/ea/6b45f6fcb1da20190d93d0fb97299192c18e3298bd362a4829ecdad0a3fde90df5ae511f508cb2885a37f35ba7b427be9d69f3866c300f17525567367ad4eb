var dimensions = {
    window: {
      fontScale: 1,
      height: 0,
      scale: 1,
      width: 0
    },
    screen: {
      fontScale: 1,
      height: 0,
      scale: 1,
      width: 0
    }
  },
  listeners = {},
  canUseDOM = typeof window < "u",
  shouldInit = canUseDOM;
function update() {
  if (canUseDOM) {
    var win = window,
      docEl = win.document.documentElement;
    dimensions.window = {
      fontScale: 1,
      height: docEl.clientHeight,
      scale: win.devicePixelRatio || 1,
      width: docEl.clientWidth
    }, dimensions.screen = {
      fontScale: 1,
      height: win.screen.height,
      scale: win.devicePixelRatio || 1,
      width: win.screen.width
    };
  }
}
function handleResize() {
  update(), Array.isArray(listeners.change) && listeners.change.forEach(function (handler) {
    return handler(dimensions);
  });
}
var Dimensions = {
  get(dimension) {
    if (shouldInit && (shouldInit = !1, update()), dimensions[dimension] === void 0) throw new Error(`No dimension set for key ${dimension}`);
    return dimensions[dimension];
  },
  set(initialDimensions) {
    if (initialDimensions) {
      if (canUseDOM) throw new Error("Dimensions cannot be set in the browser");
      initialDimensions.screen != null && (dimensions.screen = initialDimensions.screen), initialDimensions.window != null && (dimensions.window = initialDimensions.window);
    }
  },
  addEventListener(type, handler) {
    var _this = this;
    return listeners[type] = listeners[type] || [], listeners[type].push(handler), {
      remove: function () {
        _this.removeEventListener(type, handler);
      }
    };
  },
  removeEventListener(type, handler) {
    Array.isArray(listeners[type]) && (listeners[type] = listeners[type].filter(function (_handler) {
      return _handler !== handler;
    }));
  }
};
canUseDOM && window.addEventListener("resize", handleResize, !1);
export { Dimensions };
//# sourceMappingURL=Dimensions.native.js.map
