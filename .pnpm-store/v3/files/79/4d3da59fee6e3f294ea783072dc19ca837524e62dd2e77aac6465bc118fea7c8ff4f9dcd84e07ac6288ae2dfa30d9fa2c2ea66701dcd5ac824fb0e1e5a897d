import { createCSSVariable, getVariableValue } from "../createVariable.mjs";
const registerCSSVariable = v => {
    tokensValueToVariable.set(getVariableValue(v), v);
  },
  variableToCSS = (v, unitless = !1) => `--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${createCSSVariable(v.name, !1)}:${!unitless && typeof v.val == "number" ? `${v.val}px` : v.val}`,
  tokensValueToVariable = /* @__PURE__ */new Map();
export { registerCSSVariable, tokensValueToVariable, variableToCSS };
//# sourceMappingURL=registerCSSVariable.mjs.map
