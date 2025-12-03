import { getConfig } from "../config.mjs";
let inverseShorthands = null;
const getShorthandValue = (props, key) => (inverseShorthands ||= getConfig().inverseShorthands, props[key] ?? (inverseShorthands ? props[inverseShorthands[key]] : void 0));
export { getShorthandValue };
//# sourceMappingURL=getShorthandValue.mjs.map
