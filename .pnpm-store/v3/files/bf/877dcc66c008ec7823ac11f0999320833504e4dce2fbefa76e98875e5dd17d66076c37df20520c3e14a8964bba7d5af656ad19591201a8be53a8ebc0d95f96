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
var index_exports = {};
__export(index_exports, {
  debounce: () => debounce,
  useDebounce: () => useDebounce,
  useDebounceValue: () => useDebounceValue
});
module.exports = __toCommonJS(index_exports);
var React = __toESM(require("react"), 1);
function debounce(func, wait, leading) {
  let timeout, isCancelled = !1;
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
const defaultOpts = { leading: !1 };
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
      setState((prev) => prev === val ? prev : val);
    }, amt);
    return () => {
      clearTimeout(tm);
    };
  }, [val]), state;
}
//# sourceMappingURL=index.js.map
