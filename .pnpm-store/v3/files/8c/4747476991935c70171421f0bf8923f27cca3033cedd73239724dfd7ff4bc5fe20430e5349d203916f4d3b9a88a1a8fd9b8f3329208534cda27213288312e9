var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var createVariable_exports = {};
__export(createVariable_exports, {
  createCSSVariable: () => createCSSVariable,
  createVariable: () => createVariable,
  didGetVariableValue: () => didGetVariableValue,
  getVariable: () => getVariable,
  getVariableName: () => getVariableName,
  getVariableValue: () => getVariableValue,
  getVariableVariable: () => getVariableVariable,
  isVariable: () => isVariable,
  px: () => px,
  setDidGetVariableValue: () => setDidGetVariableValue,
  variableToString: () => variableToString
});
module.exports = __toCommonJS(createVariable_exports);
var import_constants = require("@tamagui/constants"), import_helpers = require("@tamagui/helpers"), import_config = require("./config");
function constructCSSVariableName(name) {
  return `var(--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${name})`;
}
const createVariable = (props, skipHash = !1) => {
  if (!skipHash && isVariable(props)) return props;
  const { key, name, val } = props;
  return {
    isVar: !0,
    key,
    name: skipHash ? name : (0, import_helpers.simpleHash)(name, 40),
    val,
    variable: import_constants.isWeb ? skipHash ? constructCSSVariableName(name) : createCSSVariable(name) : ""
  };
};
function variableToString(vrble, getValue = !1) {
  return isVariable(vrble) ? !getValue && import_constants.isWeb && vrble.variable ? vrble.variable : `${vrble.val}` : `${vrble || ""}`;
}
function isVariable(v) {
  return v && typeof v == "object" && "isVar" in v;
}
function getVariable(nameOrVariable, group = "size") {
  if (nameOrVariable?.dynamic)
    return nameOrVariable;
  if (setDidGetVariableValue(!0), isVariable(nameOrVariable))
    return variableToString(nameOrVariable);
  const tokens = (0, import_config.getConfig)().tokensParsed;
  return variableToString(tokens[group]?.[nameOrVariable] ?? nameOrVariable);
}
let accessed = !1;
const setDidGetVariableValue = (val) => accessed = val, didGetVariableValue = () => accessed;
function getVariableValue(v, group) {
  if (isVariable(v))
    return setDidGetVariableValue(!0), v.val;
  if (group) {
    const token = (0, import_config.getConfig)().tokensParsed[group]?.[v];
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
  const name = (0, import_helpers.simpleHash)(nameProp, 60);
  return includeVar ? constructCSSVariableName(name) : name;
};
function px(value) {
  return {
    val: value,
    needsPx: !0
  };
}
//# sourceMappingURL=createVariable.js.map
