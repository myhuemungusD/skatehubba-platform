import { isWeb } from "@tamagui/constants";
import { simpleHash } from "@tamagui/helpers";
import { getConfig } from "./config";
function constructCSSVariableName(name) {
  return `var(--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${name})`;
}
const createVariable = (props, skipHash = !1) => {
  if (!skipHash && isVariable(props)) return props;
  const { key, name, val } = props;
  return {
    isVar: !0,
    key,
    name: skipHash ? name : simpleHash(name, 40),
    val,
    variable: isWeb ? skipHash ? constructCSSVariableName(name) : createCSSVariable(name) : ""
  };
};
function variableToString(vrble, getValue = !1) {
  return isVariable(vrble) ? !getValue && isWeb && vrble.variable ? vrble.variable : `${vrble.val}` : `${vrble || ""}`;
}
function isVariable(v) {
  return v && typeof v == "object" && "isVar" in v;
}
function getVariable(nameOrVariable, group = "size") {
  if (nameOrVariable?.dynamic)
    return nameOrVariable;
  if (setDidGetVariableValue(!0), isVariable(nameOrVariable))
    return variableToString(nameOrVariable);
  const tokens = getConfig().tokensParsed;
  return variableToString(tokens[group]?.[nameOrVariable] ?? nameOrVariable);
}
let accessed = !1;
const setDidGetVariableValue = (val) => accessed = val, didGetVariableValue = () => accessed;
function getVariableValue(v, group) {
  if (isVariable(v))
    return setDidGetVariableValue(!0), v.val;
  if (group) {
    const token = getConfig().tokensParsed[group]?.[v];
    if (token)
      return setDidGetVariableValue(!0), token.val;
  }
  return v;
}
function getVariableName(v) {
  return isVariable(v) ? v.name : v;
}
function getVariableVariable(v) {
  return isVariable(v) ? v.variable : v;
}
const createCSSVariable = (nameProp, includeVar = !0) => {
  if (process.env.NODE_ENV === "development" && (!nameProp || typeof nameProp != "string"))
    throw new Error(`createCSSVariable expected string, got: ${nameProp}`);
  const name = simpleHash(nameProp, 60);
  return includeVar ? constructCSSVariableName(name) : name;
};
function px(value) {
  return {
    val: value,
    needsPx: !0
  };
}
export {
  createCSSVariable,
  createVariable,
  didGetVariableValue,
  getVariable,
  getVariableName,
  getVariableValue,
  getVariableVariable,
  isVariable,
  px,
  setDidGetVariableValue,
  variableToString
};
//# sourceMappingURL=createVariable.js.map
