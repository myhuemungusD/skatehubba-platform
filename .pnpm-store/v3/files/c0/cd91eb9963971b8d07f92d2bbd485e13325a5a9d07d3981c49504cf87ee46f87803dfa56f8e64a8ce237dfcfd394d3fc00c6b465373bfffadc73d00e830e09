import * as React from "react";
function debounce(func, wait, leading) {
  let timeout,
    isCancelled = !1;
  function debounced() {
    isCancelled = !1;
    const args = arguments;
    leading && !timeout && func.apply(this, args), clearTimeout(timeout), timeout = setTimeout(() => {
      timeout = null, leading || isCancelled || func.apply(this, args), isCancelled = !1;
    }, wait);
  }
  return debounced.cancel = () => {
    isCancelled = !0;
  }, debounced;
}
const defaultOpts = {
  leading: !1
};
function useDebounce(fn, wait, options = defaultOpts, mountArgs = [fn]) {
  const dbEffect = React.useRef(null);
  return React.useEffect(() => () => {
    dbEffect.current?.cancel();
  }, []), React.useMemo(() => (dbEffect.current = debounce(fn, wait, options.leading), dbEffect.current), [options.leading, ...mountArgs]);
}
function useDebounceValue(val, amt = 0) {
  const [state, setState] = React.useState(val);
  return React.useEffect(() => {
    const tm = setTimeout(() => {
      setState(prev => prev === val ? prev : val);
    }, amt);
    return () => {
      clearTimeout(tm);
    };
  }, [val]), state;
}
export { debounce, useDebounce, useDebounceValue };
//# sourceMappingURL=index.mjs.map
