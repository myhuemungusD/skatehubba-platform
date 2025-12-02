import { isWeb } from "@tamagui/constants";
import { simpleHash } from "@tamagui/helpers";
import { getConfig } from "./config.native.js";
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function constructCSSVariableName(name) {
  return `var(--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${name})`;
}
var createVariable = function (props) {
  var skipHash = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  if (!skipHash && isVariable(props)) return props;
  var {
    key,
    name,
    val
  } = props;
  return {
    isVar: !0,
    key,
    name: skipHash ? name : simpleHash(name, 40),
    val,
    variable: isWeb ? skipHash ? constructCSSVariableName(name) : createCSSVariable(name) : ""
  };
};
function variableToString(vrble) {
  var getValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return isVariable(vrble) ? !getValue && isWeb && vrble.variable ? vrble.variable : `${vrble.val}` : `${vrble || ""}`;
}
function isVariable(v) {
  return v && (typeof v > "u" ? "undefined" : _type_of(v)) === "object" && "isVar" in v;
}
function getVariable(nameOrVariable) {
  var group = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "size",
    _tokens_group;
  if (nameOrVariable?.dynamic) return nameOrVariable;
  if (setDidGetVariableValue(!0), isVariable(nameOrVariable)) return variableToString(nameOrVariable);
  var tokens = getConfig().tokensParsed,
    _tokens_group_nameOrVariable;
  return variableToString((_tokens_group_nameOrVariable = (_tokens_group = tokens[group]) === null || _tokens_group === void 0 ? void 0 : _tokens_group[nameOrVariable]) !== null && _tokens_group_nameOrVariable !== void 0 ? _tokens_group_nameOrVariable : nameOrVariable);
}
var accessed = !1,
  setDidGetVariableValue = function (val) {
    return accessed = val;
  },
  didGetVariableValue = function () {
    return accessed;
  };
function getVariableValue(v, group) {
  if (isVariable(v)) return setDidGetVariableValue(!0), v.val;
  if (group) {
    var _tokens_group,
      tokens = getConfig().tokensParsed,
      token = (_tokens_group = tokens[group]) === null || _tokens_group === void 0 ? void 0 : _tokens_group[v];
    if (token) return setDidGetVariableValue(!0), token.val;
  }
  return v;
}
function getVariableName(v) {
  return isVariable(v) ? v.name : v;
}
function getVariableVariable(v) {
  return isVariable(v) ? v.variable : v;
}
var createCSSVariable = function (nameProp) {
  var includeVar = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  if (process.env.NODE_ENV === "development" && (!nameProp || typeof nameProp != "string")) throw new Error(`createCSSVariable expected string, got: ${nameProp}`);
  var name = simpleHash(nameProp, 60);
  return includeVar ? constructCSSVariableName(name) : name;
};
function px(value) {
  return {
    val: value,
    needsPx: !0
  };
}
export { createCSSVariable, createVariable, didGetVariableValue, getVariable, getVariableName, getVariableValue, getVariableVariable, isVariable, px, setDidGetVariableValue, variableToString };
//# sourceMappingURL=createVariable.native.js.map
