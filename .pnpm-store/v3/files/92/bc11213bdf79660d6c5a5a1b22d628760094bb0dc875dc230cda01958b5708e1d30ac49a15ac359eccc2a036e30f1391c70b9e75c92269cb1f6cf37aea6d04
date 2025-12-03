import { normalizeCSSColor, rgba } from "@tamagui/normalize-css-color";
import { rgba as rgba2 } from "@tamagui/normalize-css-color";
const normalizeColor = (color, opacity) => {
    if (color) {
      if (color[0] === "$") return color;
      if (color.startsWith("var(")) {
        if (typeof opacity == "number" && opacity < 1) return `color-mix(in srgb, ${color} ${opacity * 100}%, transparent)`;
      } else {
        const rgba3 = getRgba(color);
        if (rgba3) {
          const colors = `${rgba3.r},${rgba3.g},${rgba3.b}`;
          return opacity === 1 ? `rgb(${colors})` : `rgba(${colors},${opacity ?? rgba3.a ?? 1})`;
        }
      }
      return color;
    }
  },
  getRgba = color => {
    const colorNum = normalizeCSSColor(color);
    if (colorNum != null) return rgba(colorNum);
  };
export { getRgba, normalizeColor, rgba2 as rgba };
//# sourceMappingURL=normalizeColor.mjs.map
