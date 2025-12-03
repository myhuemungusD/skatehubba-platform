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
var opacify_exports = {};
__export(opacify_exports, {
  opacify: () => opacify
});
module.exports = __toCommonJS(opacify_exports);
function opacify(color) {
  var opacity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.1;
  if (color.startsWith("hsl")) {
    var match = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
    if (match) {
      var [, h, s, l] = match;
      return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
    }
  }
  if (color.startsWith("#")) {
    var hex = color.slice(1);
    if (hex.length === 3 && (hex = hex.split("").map(function (c) {
      return c + c;
    }).join("")), hex.length === 6 || hex.length === 8) {
      var alphaHex = Math.round(opacity * 255).toString(16).padStart(2, "0");
      return `#${hex.slice(0, 6)}${alphaHex}`;
    }
  }
  return color;
}
//# sourceMappingURL=opacify.native.js.map
