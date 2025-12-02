import { createFont, getVariableValue, isWeb } from "@tamagui/core";
var createSystemFont = function () {
    var {
        font = {},
        sizeLineHeight = function (size2) {
          return size2 + 10;
        },
        sizeSize = function (size2) {
          return size2 * 1;
        }
      } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      size = Object.fromEntries(Object.entries({
        ...defaultSizes,
        ...font.size
      }).map(function (param) {
        var [k, v] = param;
        return [k, sizeSize(+v)];
      }));
    return createFont({
      family: isWeb ? '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' : "System",
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
  },
  fonts = {
    body: createSystemFont(),
    heading: createSystemFont({
      sizeSize: function (n) {
        return n * 1.4;
      }
    })
  };
export { createSystemFont, fonts };
//# sourceMappingURL=v4-fonts.native.js.map
