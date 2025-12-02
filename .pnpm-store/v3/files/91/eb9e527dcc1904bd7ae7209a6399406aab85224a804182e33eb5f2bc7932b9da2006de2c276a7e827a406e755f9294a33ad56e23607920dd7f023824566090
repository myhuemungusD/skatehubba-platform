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
var v5_fonts_exports = {};
__export(v5_fonts_exports, {
  createSystemFont: () => createSystemFont,
  fonts: () => fonts
});
module.exports = __toCommonJS(v5_fonts_exports);
var import_core = require("@tamagui/core");
const createSystemFont = ({
    font = {},
    sizeLineHeight = size => size + 10,
    sizeSize = size => size * 1
  } = {}) => {
    const size = Object.fromEntries(Object.entries({
      ...defaultSizes,
      ...font.size
    }).map(([k, v]) => [k, sizeSize(+v)]));
    return (0, import_core.createFont)({
      family: import_core.isWeb ? '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' : "System",
      lineHeight: Object.fromEntries(Object.entries(size).map(([k, v]) => [k, sizeLineHeight((0, import_core.getVariableValue)(v))])),
      weight: {
        4: "300"
      },
      letterSpacing: {
        4: 0
      },
      ...font,
      size
    });
  },
  defaultSizes = {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134
  },
  fonts = {
    body: createSystemFont(),
    heading: createSystemFont({
      sizeSize: n => n * 1.4
    })
  };