function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function objectIdentityKey(obj) {
  var k = "";
  for (var key in obj) {
    k += key;
    var arg = obj[key],
      type = typeof arg > "u" ? "undefined" : _type_of(arg);
    if (!arg || type !== "object" && type !== "function") k += type + arg;else if (cache.has(arg)) k += cache.get(arg);else {
      var v = Math.random();
      cache.set(arg, v), k += v;
    }
  }
  return k;
}
var cache = /* @__PURE__ */new WeakMap();
export { objectIdentityKey };
//# sourceMappingURL=objectIdentityKey.native.js.map
