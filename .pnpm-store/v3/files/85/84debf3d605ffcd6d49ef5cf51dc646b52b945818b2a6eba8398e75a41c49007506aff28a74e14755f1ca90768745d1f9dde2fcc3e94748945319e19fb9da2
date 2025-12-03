"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var useGet_exports = {};
__export(useGet_exports, {
  useGet: () => useGet
});
module.exports = __toCommonJS(useGet_exports);
var import_constants = require("@tamagui/constants"),
  React = __toESM(require("react"), 1);
function useGet(currentValue, initialValue, forwardToFunction) {
  var curRef = React.useRef(initialValue ?? currentValue);
  return (0, import_constants.useIsomorphicLayoutEffect)(function () {
    curRef.current = currentValue;
  }), React.useCallback(forwardToFunction ? function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
    var _curRef_current;
    return (_curRef_current = curRef.current) === null || _curRef_current === void 0 ? void 0 : _curRef_current.apply(null, args);
  } : function () {
    return curRef.current;
  }, []);
}
//# sourceMappingURL=useGet.native.js.map
