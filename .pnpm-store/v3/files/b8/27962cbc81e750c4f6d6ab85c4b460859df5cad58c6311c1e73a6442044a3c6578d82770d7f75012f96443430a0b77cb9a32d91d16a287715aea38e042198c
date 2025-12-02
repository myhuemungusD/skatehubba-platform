function postfixObjKeys(obj, postfix) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [`${k}${postfix}`, v]));
}
function sizeToSpace(v) {
  return v === 0 ? 0 : v === 2 ? 0.5 : v === 4 ? 1 : v === 8 ? 1.5 : v <= 16 ? Math.round(v * 0.333) : Math.floor(v * 0.7 - 12);
}
function objectFromEntries(arr) {
  return Object.fromEntries(arr);
}
function objectKeys(obj) {
  return Object.keys(obj);
}
export { objectFromEntries, objectKeys, postfixObjKeys, sizeToSpace };
//# sourceMappingURL=utils.mjs.map
