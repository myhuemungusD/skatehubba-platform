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
var expandStyles_exports = {};
__export(expandStyles_exports, {
  fixStyles: () => fixStyles
});
module.exports = __toCommonJS(expandStyles_exports);
var import_constants = require("@tamagui/constants"),
  import_normalizeShadow = require("./normalizeShadow.cjs");
function fixStyles(style) {
  (style.shadowRadius != null || style.shadowColor || style.shadowOpacity != null || style.shadowOffset) && Object.assign(style, (0, import_normalizeShadow.normalizeShadow)(style));
  for (const key in borderDefaults) key in style && (style[borderDefaults[key]] ||= "solid");
}
const nativeStyle = import_constants.isWeb ? null : "borderStyle",
  borderDefaults = {
    borderWidth: "borderStyle",
    borderBottomWidth: nativeStyle || "borderBottomStyle",
    borderTopWidth: nativeStyle || "borderTopStyle",
    borderLeftWidth: nativeStyle || "borderLeftStyle",
    borderRightWidth: nativeStyle || "borderRightStyle"
    // TODO: need to add borderBlock and borderInline here, but they are alot and might impact performance
  };