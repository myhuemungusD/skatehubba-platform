import { expandStyle } from "./expandStyle";
import { fixStyles } from "./expandStyles";
import { isObj } from "./isObj";
import { normalizeValueWithProperty } from "./normalizeValueWithProperty";
import { pseudoDescriptors } from "./pseudoDescriptors";
function normalizeStyle(style, disableNormalize = !1) {
  const res = {};
  for (let key in style) {
    const prop = style[key];
    if (prop == null) continue;
    if (key in pseudoDescriptors || // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && isObj(prop)) {
      res[key] = normalizeStyle(prop, disableNormalize);
      continue;
    }
    const value = disableNormalize ? prop : normalizeValueWithProperty(prop, key), out = expandStyle(key, value);
    out ? Object.assign(res, Object.fromEntries(out)) : res[key] = value;
  }
  return fixStyles(res), res;
}
export {
  normalizeStyle
};
//# sourceMappingURL=normalizeStyle.js.map
