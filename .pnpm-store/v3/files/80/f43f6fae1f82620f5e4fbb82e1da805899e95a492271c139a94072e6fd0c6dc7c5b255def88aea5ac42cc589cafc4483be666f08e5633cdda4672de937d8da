import { createFont, getVariableValue, isWeb } from "@tamagui/core";
var createInterFont = function () {
    var font = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      {
        sizeLineHeight = function (size2) {
          return size2 + 10;
        },
        sizeSize = function (size2) {
          return size2 * 1;
        }
      } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      size = Object.fromEntries(Object.entries({
        ...defaultSizes,
        ...font.size
      }).map(function (param) {
        var [k, v] = param;
        return [k, sizeSize(+v)];
      }));
    return createFont({
      family: isWeb ? 'Inter, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' : "Inter",
      lineHeight: Object.fromEntries(Object.entries(size).map(function (param) {
        var [k, v] = param;
        return [k, sizeLineHeight(getVariableValue(v))];
      })),
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
  };
export { createInterFont };
//# sourceMappingURL=index.native.js.map
