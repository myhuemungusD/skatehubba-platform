import { isWeb } from "@tamagui/constants";
import { simpleHash } from "@tamagui/helpers";
import { createVariable, isVariable } from "./createVariable.mjs";
const cache = /* @__PURE__ */new WeakMap(),
  createVariables = (tokens, parentPath = "", isFont = !1) => {
    if (cache.has(tokens)) return tokens;
    const res = {};
    let i = 0;
    for (let keyIn in tokens) {
      i++;
      const val = tokens[keyIn],
        isPrefixed = keyIn[0] === "$",
        keyWithPrefix = isPrefixed ? keyIn : `$${keyIn}`,
        key = isPrefixed ? keyWithPrefix.slice(1) : keyIn;
      if (isVariable(val)) {
        res[key] = val;
        continue;
      }
      const niceKey = simpleHash(key, 1e3),
        name = parentPath && parentPath !== "t-color" ? `${parentPath}-${niceKey}` : `c-${niceKey}`;
      if (val && typeof val == "object" && "needsPx" in val && "val" in val) {
        const finalValue2 = createVariable({
          val: val.val,
          name,
          key: keyWithPrefix
        });
        isWeb && (finalValue2.needsPx = val.needsPx), res[key] = finalValue2;
        continue;
      }
      if (val && typeof val == "object") {
        res[key] = createVariables(tokens[key], name, !1
        /* note: don't pass isFont down, we want to avoid it past the first level */);
        continue;
      }
      const finalValue = isVariable(val) ? val : createVariable({
        val,
        name,
        key: keyWithPrefix
      });
      res[key] = finalValue;
    }
    return cache.set(res, !0), res;
  };
export { createVariables };
//# sourceMappingURL=createVariables.mjs.map
