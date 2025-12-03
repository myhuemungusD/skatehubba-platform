import { defaultOffset } from "./defaultOffset.native.js";
import { getRgba, normalizeColor } from "./normalizeColor.native.js";
function normalizeShadow(param) {
  var {
      shadowColor,
      shadowOffset,
      shadowOpacity,
      shadowRadius
    } = param,
    _getRgba,
    {
      height,
      width
    } = shadowOffset || defaultOffset;
  return {
    shadowOffset: {
      width: width || 0,
      height: height || 0
    },
    shadowRadius: shadowRadius || 0,
    shadowColor: normalizeColor(shadowColor, 1),
    shadowOpacity: shadowOpacity ?? (shadowColor ? (_getRgba = getRgba(shadowColor)) === null || _getRgba === void 0 ? void 0 : _getRgba.a : 1)
  };
}
export { normalizeShadow };
//# sourceMappingURL=normalizeShadow.native.js.map
