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
var useCurrentColor_exports = {};
__export(useCurrentColor_exports, {
  useCurrentColor: () => useCurrentColor
});
module.exports = __toCommonJS(useCurrentColor_exports);
var import_web = require("@tamagui/web"),
  useCurrentColor = function (colorProp) {
    var _theme_colorProp,
      _theme_color,
      theme = (0, import_web.useTheme)(),
      out = colorProp ? (0, import_web.getVariable)(colorProp) : ((_theme_colorProp = theme[colorProp]) === null || _theme_colorProp === void 0 ? void 0 : _theme_colorProp.get()) || ((_theme_color = theme.color) === null || _theme_color === void 0 ? void 0 : _theme_color.get());
    return out;
  };
//# sourceMappingURL=useCurrentColor.native.js.map
