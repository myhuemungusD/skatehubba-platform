var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var index_exports = {};
__export(index_exports, {
  getRadius: () => getRadius,
  getSize: () => getSize,
  getSpace: () => getSpace,
  getTokenRelative: () => getTokenRelative,
  stepTokenUpOrDown: () => stepTokenUpOrDown
});
module.exports = __toCommonJS(index_exports);
var import_web = require("@tamagui/web");
const defaultOptions = {
  shift: 0,
  bounds: [0]
}, getSize = (size, options) => getTokenRelative("size", size, options), getSpace = (space, options) => getTokenRelative("space", space, options), getRadius = (radius, options) => getTokenRelative("radius", radius, options), cacheVariables = {}, cacheWholeVariables = {}, cacheKeys = {}, cacheWholeKeys = {}, stepTokenUpOrDown = (type, current, options = defaultOptions) => {
  const tokens = (0, import_web.getTokens)({ prefixed: !0 })[type];
  if (!(type in cacheVariables)) {
    cacheKeys[type] = [], cacheVariables[type] = [], cacheWholeKeys[type] = [], cacheWholeVariables[type] = [];
    const sorted = Object.keys(tokens).map((k) => tokens[k]).sort((a, b) => a.val - b.val);
    for (const token of sorted)
      cacheKeys[type].push(token.key), cacheVariables[type].push(token);
    const sortedExcludingHalfSteps = sorted.filter((x) => !x.key.endsWith(".5"));
    for (const token of sortedExcludingHalfSteps)
      cacheWholeKeys[type].push(token.key), cacheWholeVariables[type].push(token);
  }
  const isString = typeof current == "string", tokensOrdered = (options.excludeHalfSteps ? isString ? cacheWholeKeys : cacheWholeVariables : isString ? cacheKeys : cacheVariables)[type], min = options.bounds?.[0] ?? 0, max = options.bounds?.[1] ?? tokensOrdered.length - 1, currentIndex = tokensOrdered.indexOf(current);
  let shift = options.shift || 0;
  shift && (current === "$true" || (0, import_web.isVariable)(current) && current.name === "true") && (shift += shift > 0 ? 1 : -1);
  const index = Math.min(max, Math.max(min, currentIndex + shift)), found = tokensOrdered[index];
  return (typeof found == "string" ? tokens[found] : found) || tokens.$true;
}, getTokenRelative = stepTokenUpOrDown;
//# sourceMappingURL=index.js.map
