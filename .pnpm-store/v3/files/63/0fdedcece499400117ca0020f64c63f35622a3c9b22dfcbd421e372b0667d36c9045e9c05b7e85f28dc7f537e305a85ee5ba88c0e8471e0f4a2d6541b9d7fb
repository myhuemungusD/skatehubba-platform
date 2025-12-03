import { normalizeCSSColor, rgba } from "@tamagui/normalize-css-color";
import { rgba as rgba2 } from "@tamagui/normalize-css-color";
var normalizeColor = function (color, opacity) {
    if (color) {
      if (color[0] === "$") return color;
      if (color.startsWith("var(")) {
        if (typeof opacity == "number" && opacity < 1) return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
      } else {
        var rgba3 = getRgba(color);
        if (rgba3) {
          var colors = `${rgba3.r},${rgba3.g},${rgba3.b}`,
            _ref;
          return opacity === 1 ? `rgb(${colors})` : `rgba(${colors},${(_ref = opacity ?? rgba3.a) !== null && _ref !== void 0 ? _ref : 1})`;
        }
      }
      return color;
    }
  },
  getRgba = function (color) {
    var colorNum = normalizeCSSColor(color);
    if (colorNum != null) return rgba(colorNum);
  };
export { getRgba, normalizeColor, rgba2 as rgba };
//# sourceMappingURL=normalizeColor.native.js.map
