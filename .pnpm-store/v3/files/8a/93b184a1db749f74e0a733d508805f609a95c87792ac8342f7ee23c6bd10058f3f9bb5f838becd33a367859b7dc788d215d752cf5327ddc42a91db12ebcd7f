import { isWeb } from "@tamagui/constants";
import { simpleHash } from "@tamagui/helpers";
import { createVariable, isVariable } from "./createVariable.native.js";
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var cache = /* @__PURE__ */new WeakMap(),
  createVariables = function (tokens) {
    var parentPath = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "",
      isFont = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    if (cache.has(tokens)) return tokens;
    var res = {},
      i = 0;
    for (var keyIn in tokens) {
      i++;
      var val = tokens[keyIn],
        isPrefixed = keyIn[0] === "$",
        keyWithPrefix = isPrefixed ? keyIn : `$${keyIn}`,
        key = isPrefixed ? keyWithPrefix.slice(1) : keyIn;
      if (isVariable(val)) {
        res[key] = val;
        continue;
      }
      var niceKey = simpleHash(key, 1e3),
        name = parentPath && parentPath !== "t-color" ? `${parentPath}-${niceKey}` : `c-${niceKey}`;
      if (val && (typeof val > "u" ? "undefined" : _type_of(val)) === "object" && "needsPx" in val && "val" in val) {
        var finalValue = createVariable({
          val: val.val,
          name,
          key: keyWithPrefix
        });
        isWeb && (finalValue.needsPx = val.needsPx), res[key] = finalValue;
        continue;
      }
      if (val && (typeof val > "u" ? "undefined" : _type_of(val)) === "object") {
        res[key] = createVariables(tokens[key], name, !1);
        continue;
      }
      var finalValue1 = isVariable(val) ? val : createVariable({
        val,
        name,
        key: keyWithPrefix
      });
      res[key] = finalValue1;
    }
    return cache.set(res, !0), res;
  };
export { createVariables };
//# sourceMappingURL=createVariables.native.js.map
