import * as React from "react";
function debounce(func, wait, leading) {
  var timeout,
    isCancelled = !1;
  function debounced() {
    var _this = this;
    isCancelled = !1;
    var args = arguments;
    leading && !timeout && func.apply(this, args), clearTimeout(timeout), timeout = setTimeout(function () {
      timeout = null, leading || isCancelled || func.apply(_this, args), isCancelled = !1;
    }, wait);
  }
  return debounced.cancel = function () {
    isCancelled = !0;
  }, debounced;
}
var defaultOpts = {
  leading: !1
};
function useDebounce(fn, wait) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultOpts,
    mountArgs = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : [fn],
    dbEffect = React.useRef(null);
  return React.useEffect(function () {
    return function () {
      var _dbEffect_current;
      (_dbEffect_current = dbEffect.current) === null || _dbEffect_current === void 0 || _dbEffect_current.cancel();
    };
  }, []), React.useMemo(function () {
    return dbEffect.current = debounce(fn, wait, options.leading), dbEffect.current;
  }, [options.leading, ...mountArgs]);
}
function useDebounceValue(val) {
  var amt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0,
    [state, setState] = React.useState(val);
  return React.useEffect(function () {
    var tm = setTimeout(function () {
      setState(function (prev) {
        return prev === val ? prev : val;
      });
    }, amt);
    return function () {
      clearTimeout(tm);
    };
  }, [val]), state;
}
export { debounce, useDebounce, useDebounceValue };
//# sourceMappingURL=index.native.js.map
