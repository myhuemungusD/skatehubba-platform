import { isWeb } from "@tamagui/constants";
import { stylePropsAll, stylePropsUnitless } from "@tamagui/helpers";
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var stylePropsAllPlusTransforms = {
  ...stylePropsAll,
  translateX: !0,
  translateY: !0
};
function normalizeValueWithProperty(value) {
  var property = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if (!isWeb || stylePropsUnitless[property] || property && !stylePropsAllPlusTransforms[property] || typeof value == "boolean") return value;
  var res = value;
  return value && (typeof value > "u" ? "undefined" : _type_of(value)) === "object" ? value : (typeof value == "number" ? res = `${value}px` : property && (res = `${res}`), res);
}
export { normalizeValueWithProperty };
//# sourceMappingURL=normalizeValueWithProperty.native.js.map
