var matchMediaImpl = matchMediaFallback,
  matchMedia = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    return matchMediaImpl(...args);
  };
function matchMediaFallback(query) {
  return !process.env.IS_STATIC && process.env.NODE_ENV === "development" && console.warn("warning: matchMedia implementation is not provided."), {
    match: function (a, b) {
      return !1;
    },
    addListener: function () {},
    removeListener: function () {},
    matches: !1
  };
}
function setupMatchMedia(_) {
  process.env.NODE_ENV === "development" && typeof _ != "function" && (process.env.IS_STATIC || console.trace("setupMatchMedia was called without a function, this can cause issues on native", _)), matchMediaImpl = _, globalThis.matchMedia = _;
}
export { matchMedia, setupMatchMedia };
//# sourceMappingURL=matchMedia.native.js.map
