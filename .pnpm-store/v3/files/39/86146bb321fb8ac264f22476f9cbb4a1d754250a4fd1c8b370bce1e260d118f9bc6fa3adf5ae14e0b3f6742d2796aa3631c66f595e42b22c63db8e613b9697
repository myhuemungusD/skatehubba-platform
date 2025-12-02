import { getConfig } from "../config.native.js";
function getExpandedShorthands(props) {
  var shorthands = getConfig().shorthands;
  if (!shorthands) return props;
  var res = {};
  for (var key in props) res[shorthands[key] || key] = props[key];
  return res;
}
function getExpandedShorthand(propKey, props) {
  var shorthands = getConfig().inverseShorthands,
    _props_propKey;
  return (_props_propKey = props[propKey]) !== null && _props_propKey !== void 0 ? _props_propKey : props[shorthands[propKey]];
}
export { getExpandedShorthand, getExpandedShorthands };
//# sourceMappingURL=getExpandedShorthands.native.js.map
