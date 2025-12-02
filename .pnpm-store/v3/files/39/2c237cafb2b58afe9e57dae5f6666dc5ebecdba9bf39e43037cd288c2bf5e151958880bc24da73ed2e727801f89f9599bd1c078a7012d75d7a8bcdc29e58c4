import { createFont } from "@tamagui/web";
var genericFontSizes = {
  1: 10,
  2: 11,
  3: 12,
  4: 14,
  5: 15,
  6: 16,
  7: 20,
  8: 22,
  9: 30,
  10: 42,
  11: 52,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 124
};
function createGenericFont(family) {
  var font = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    {
      sizeLineHeight = function (val) {
        return val * 1.35;
      }
    } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    size = font.size || genericFontSizes;
  return createFont({
    family,
    size,
    lineHeight: Object.fromEntries(Object.entries(size).map(function (param) {
      var [k, v] = param;
      return [k, sizeLineHeight(+v)];
    })),
    weight: {
      0: "300"
    },
    letterSpacing: {
      4: 0
    },
    ...font
  });
}
export { createGenericFont };
//# sourceMappingURL=createGenericFont.native.js.map
