import { expandStyle } from "./expandStyle.mjs";
import { fixStyles } from "./expandStyles.mjs";
import { isObj } from "./isObj.mjs";
import { normalizeValueWithProperty } from "./normalizeValueWithProperty.mjs";
import { pseudoDescriptors } from "./pseudoDescriptors.mjs";
function normalizeStyle(style, disableNormalize = !1) {
  const res = {};
  for (let key in style) {
    const prop = style[key];
    if (prop == null) continue;
    if (key in pseudoDescriptors ||
    // this should capture all parent-based styles like media, group, etc
    key[0] === "$" && isObj(prop)) {
      res[key] = normalizeStyle(prop, disableNormalize);
      continue;
    }
    const value = disableNormalize ? prop : normalizeValueWithProperty(prop, key),
      out = expandStyle(key, value);
    out ? Object.assign(res, Object.fromEntries(out)) : res[key] = value;
  }
  return fixStyles(res), res;
}
export { normalizeStyle };
//# sourceMappingURL=normalizeStyle.mjs.map
