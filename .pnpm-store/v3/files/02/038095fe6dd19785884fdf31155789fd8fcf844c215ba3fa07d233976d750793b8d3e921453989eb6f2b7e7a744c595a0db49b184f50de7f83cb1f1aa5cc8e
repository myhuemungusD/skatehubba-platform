import { createCSSVariable, getVariableValue } from "../createVariable.native.js";
var registerCSSVariable = function (v) {
    tokensValueToVariable.set(getVariableValue(v), v);
  },
  variableToCSS = function (v) {
    var unitless = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return `--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${createCSSVariable(v.name, !1)}:${!unitless && typeof v.val == "number" ? `${v.val}px` : v.val}`;
  },
  tokensValueToVariable = /* @__PURE__ */new Map();
export { registerCSSVariable, tokensValueToVariable, variableToCSS };
//# sourceMappingURL=registerCSSVariable.native.js.map
