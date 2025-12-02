var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var normalizeValueWithProperty_exports = {};
__export(normalizeValueWithProperty_exports, {
  normalizeValueWithProperty: () => normalizeValueWithProperty
});
module.exports = __toCommonJS(normalizeValueWithProperty_exports);
var import_constants = require("@tamagui/constants"), import_helpers = require("@tamagui/helpers");
const stylePropsAllPlusTransforms = {
  ...import_helpers.stylePropsAll,
  translateX: !0,
  translateY: !0
};
function normalizeValueWithProperty(value, property = "") {
  if (!import_constants.isWeb || import_helpers.stylePropsUnitless[property] || property && !stylePropsAllPlusTransforms[property] || typeof value == "boolean")
    return value;
  let res = value;
  return value && typeof value == "object" ? value : (typeof value == "number" ? res = `${value}px` : property && (res = `${res}`), res);
}
//# sourceMappingURL=normalizeValueWithProperty.js.map
