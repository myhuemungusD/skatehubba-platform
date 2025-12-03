import { defaultOffset } from "./defaultOffset.mjs";
import { getRgba, normalizeColor } from "./normalizeColor.mjs";
function normalizeShadow({
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius
}) {
  const {
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
    shadowOpacity: shadowOpacity ?? (shadowColor ? getRgba(shadowColor)?.a : 1)
  };
}
export { normalizeShadow };
//# sourceMappingURL=normalizeShadow.mjs.map
