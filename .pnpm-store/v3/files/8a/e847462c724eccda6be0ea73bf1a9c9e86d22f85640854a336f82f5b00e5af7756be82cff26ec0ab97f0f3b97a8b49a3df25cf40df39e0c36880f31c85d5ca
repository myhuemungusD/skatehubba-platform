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
var createVariables_exports = {};
__export(createVariables_exports, {
  createVariables: () => createVariables
});
module.exports = __toCommonJS(createVariables_exports);
var import_constants = require("@tamagui/constants"),
  import_helpers = require("@tamagui/helpers"),
  import_createVariable = require("./createVariable.native.js");
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
      if ((0, import_createVariable.isVariable)(val)) {
        res[key] = val;
        continue;
      }
      var niceKey = (0, import_helpers.simpleHash)(key, 1e3),
        name = parentPath && parentPath !== "t-color" ? `${parentPath}-${niceKey}` : `c-${niceKey}`;
      if (val && (typeof val > "u" ? "undefined" : _type_of(val)) === "object" && "needsPx" in val && "val" in val) {
        var finalValue = (0, import_createVariable.createVariable)({
          val: val.val,
          name,
          key: keyWithPrefix
        });
        import_constants.isWeb && (finalValue.needsPx = val.needsPx), res[key] = finalValue;
        continue;
      }
      if (val && (typeof val > "u" ? "undefined" : _type_of(val)) === "object") {
        res[key] = createVariables(tokens[key], name, !1);
        continue;
      }
      var finalValue1 = (0, import_createVariable.isVariable)(val) ? val : (0, import_createVariable.createVariable)({
        val,
        name,
        key: keyWithPrefix
      });
      res[key] = finalValue1;
    }
    return cache.set(res, !0), res;
  };
//# sourceMappingURL=createVariables.native.js.map
