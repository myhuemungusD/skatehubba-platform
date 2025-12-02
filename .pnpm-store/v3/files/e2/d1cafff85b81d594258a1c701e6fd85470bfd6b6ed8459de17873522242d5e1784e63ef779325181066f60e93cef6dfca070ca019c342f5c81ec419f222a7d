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
var helpers_native_exports = {};
__export(helpers_native_exports, {
  getWindowSize: () => getWindowSize,
  subscribe: () => subscribe
});
module.exports = __toCommonJS(helpers_native_exports);
var import_react_native = require("react-native");
function getWindowSize() {
  return import_react_native.Dimensions.get("window");
}
var cbs = /* @__PURE__ */new Set();
import_react_native.Dimensions.addEventListener("change", function (param) {
  var {
    window
  } = param;
  cbs.forEach(function (cb) {
    return cb(window);
  });
});
function subscribe(cb) {
  return cbs.add(cb), function () {
    return cbs.delete(cb);
  };
}
//# sourceMappingURL=helpers.native.js.map
