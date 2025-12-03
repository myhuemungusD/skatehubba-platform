"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all2) => {
    for (var name in all2) __defProp(target, name, {
      get: all2[name],
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
var expandStyle_exports = {};
__export(expandStyle_exports, {
  expandStyle: () => expandStyle
});
module.exports = __toCommonJS(expandStyle_exports);
var import_constants = require("@tamagui/constants"),
  import_config = require("../config.native.js"),
  import_webToNativeProps = require("../constants/webToNativeProps.native.js"),
  _loop = function (parent) {
    var _exec,
      _exec_index,
      prefix = parent.slice(0, (_exec_index = (_exec = /[A-Z]/.exec(parent)) === null || _exec === void 0 ? void 0 : _exec.index) !== null && _exec_index !== void 0 ? _exec_index : parent.length);
    EXPANSIONS[parent] = EXPANSIONS[parent].map(function (k) {
      return `${prefix}${k}`;
    });
  };
function expandStyle(key, value) {
  if (import_constants.isAndroid && key === "elevationAndroid") return [["elevation", value]];
  if (key in EXPANSIONS) return EXPANSIONS[key].map(function (key2) {
    return [key2, value];
  });
  if (key in import_webToNativeProps.webToNativeExpansion) return import_webToNativeProps.webToNativeExpansion[key].map(function (key2) {
    return [key2, value];
  });
  if (key in import_webToNativeProps.webToNativeDynamicExpansion) return import_webToNativeProps.webToNativeDynamicExpansion[key](value);
}
var all = ["Top", "Right", "Bottom", "Left"],
  horiz = ["Right", "Left"],
  vert = ["Top", "Bottom"],
  xy = ["X", "Y"],
  EXPANSIONS = {
    borderColor: ["TopColor", "RightColor", "BottomColor", "LeftColor"],
    borderRadius: ["TopLeftRadius", "TopRightRadius", "BottomRightRadius", "BottomLeftRadius"],
    borderWidth: ["TopWidth", "RightWidth", "BottomWidth", "LeftWidth"],
    margin: all,
    marginHorizontal: horiz,
    marginVertical: vert,
    overscrollBehavior: xy,
    padding: all,
    paddingHorizontal: horiz,
    paddingVertical: vert,
    ...(import_constants.isWeb && {
      // react-native only supports borderStyle
      borderStyle: ["TopStyle", "RightStyle", "BottomStyle", "LeftStyle"],
      // react-native doesn't support X / Y
      overflow: xy
    })
  };
for (var parent in EXPANSIONS) _loop(parent);
//# sourceMappingURL=expandStyle.native.js.map
