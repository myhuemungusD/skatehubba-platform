"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
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
var import_constants = require("@tamagui/constants"),
  import_helpers = require("@tamagui/helpers"),
  import_config = require("./config.native.js");
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
    name: skipHash ? name : (0, import_helpers.simpleHash)(name, 40),
    val,
    variable: import_constants.isWeb ? skipHash ? constructCSSVariableName(name) : createCSSVariable(name) : ""
  };
};
function variableToString(vrble) {
  var getValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return isVariable(vrble) ? !getValue && import_constants.isWeb && vrble.variable ? vrble.variable : `${vrble.val}` : `${vrble || ""}`;
}
function isVariable(v) {
  return v && (typeof v > "u" ? "undefined" : _type_of(v)) === "object" && "isVar" in v;
}
function getVariable(nameOrVariable) {
  var group = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "size",
    _tokens_group;
  if (nameOrVariable?.dynamic) return nameOrVariable;
  if (setDidGetVariableValue(!0), isVariable(nameOrVariable)) return variableToString(nameOrVariable);
  var tokens = (0, import_config.getConfig)().tokensParsed,
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
      tokens = (0, import_config.getConfig)().tokensParsed,
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
  var name = (0, import_helpers.simpleHash)(nameProp, 60);
  return includeVar ? constructCSSVariableName(name) : name;
};
function px(value) {
  return {
    val: value,
    needsPx: !0
  };
}
//# sourceMappingURL=createVariable.native.js.map
