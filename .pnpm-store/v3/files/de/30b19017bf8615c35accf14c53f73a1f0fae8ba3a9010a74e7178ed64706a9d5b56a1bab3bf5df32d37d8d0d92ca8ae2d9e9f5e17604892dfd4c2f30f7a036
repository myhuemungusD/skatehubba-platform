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
var createFont_exports = {};
__export(createFont_exports, {
  createFont: () => createFont
});
module.exports = __toCommonJS(createFont_exports);
var fontWeights = ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  processSection = function (section, keys, defaultValue) {
    if (typeof section == "string") return section;
    var sectionKeys = Object.keys(section),
      fillValue = section[sectionKeys[0]];
    return Object.fromEntries([... /* @__PURE__ */new Set([...keys, ...sectionKeys])].map(function (key) {
      var _section_key,
        _ref,
        value = (_ref = (_section_key = section[key]) !== null && _section_key !== void 0 ? _section_key : defaultValue) !== null && _ref !== void 0 ? _ref : fillValue;
      return fillValue = value, defaultValue = value, [key, value];
    }));
  },
  createFont = function (font) {
    var sizeKeys = Object.keys(font.size || {}),
      processedFont = Object.fromEntries(Object.entries(font).map(function (param) {
        var [key, section] = param;
        return [key, processSection(section, key === "face" ? fontWeights : sizeKeys, key === "face" ? {
          normal: font.family
        } : void 0)];
      }));
    return Object.freeze(processedFont);
  };
//# sourceMappingURL=createFont.native.js.map
