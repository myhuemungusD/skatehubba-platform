import { getVariableValue, isAndroid, isVariable } from "@tamagui/core";
var getElevation = function (size, extras) {
    if (size) {
      var {
          tokens
        } = extras,
        token = tokens.size[size],
        sizeNum = isVariable(token) ? +token.val : size;
      return getSizedElevation(sizeNum, extras);
    }
  },
  getSizedElevation = function (val, param) {
    var {
        theme,
        tokens
      } = param,
      num = 0;
    if (val === !0) {
      var _$val = getVariableValue(tokens.size.true);
      typeof _$val == "number" ? num = _$val : num = 10;
    } else num = +val;
    if (num !== 0) {
      var [height, shadowRadius] = [Math.round(num / 4 + 1), Math.round(num / 2 + 2)],
        shadow = {
          shadowColor: theme.shadowColor,
          shadowRadius,
          shadowOffset: {
            height,
            width: 0
          },
          ...(isAndroid ? {
            elevationAndroid: 2 * height
          } : {})
        };
      return shadow;
    }
  };
export { getElevation, getSizedElevation };
//# sourceMappingURL=getElevation.native.js.map
