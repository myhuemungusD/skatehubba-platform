import { getConfig } from "../config.native.js";
var inverseShorthands = null,
  getShorthandValue = function (props, key) {
    inverseShorthands || (inverseShorthands = getConfig().inverseShorthands);
    var _props_key;
    return (_props_key = props[key]) !== null && _props_key !== void 0 ? _props_key : inverseShorthands ? props[inverseShorthands[key]] : void 0;
  };
export { getShorthandValue };
//# sourceMappingURL=getShorthandValue.native.js.map
