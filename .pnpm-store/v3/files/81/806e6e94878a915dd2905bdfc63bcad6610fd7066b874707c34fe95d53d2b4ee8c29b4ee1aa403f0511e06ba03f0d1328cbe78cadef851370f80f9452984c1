import { getVariableValue, isWeb } from "@tamagui/core";
import { getButtonSized } from "@tamagui/get-button-sized";
import { getFontSized } from "@tamagui/get-font-sized";
import { getSpace } from "@tamagui/get-token";
var inputSizeVariant = function () {
    var val = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "$true",
      extras = arguments.length > 1 ? arguments[1] : void 0;
    if (extras.props.multiline || extras.props.numberOfLines > 1) return textAreaSizeVariant(val, extras);
    var buttonStyles = getButtonSized(val, extras),
      paddingHorizontal = getSpace(val, {
        shift: -1,
        bounds: [2]
      }),
      fontStyle = getFontSized(val, extras);
    return !isWeb && fontStyle && delete fontStyle.lineHeight, {
      ...fontStyle,
      ...buttonStyles,
      paddingHorizontal
    };
  },
  textAreaSizeVariant = function () {
    var val = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "$true",
      extras = arguments.length > 1 ? arguments[1] : void 0,
      {
        props
      } = extras,
      buttonStyles = getButtonSized(val, extras),
      fontStyle = getFontSized(val, extras),
      _props_rows,
      lines = (_props_rows = props.rows) !== null && _props_rows !== void 0 ? _props_rows : props.numberOfLines,
      height = typeof lines == "number" ? lines * getVariableValue(fontStyle.lineHeight) : "auto",
      paddingVertical = getSpace(val, {
        shift: -2,
        bounds: [2]
      }),
      paddingHorizontal = getSpace(val, {
        shift: -1,
        bounds: [2]
      });
    return {
      ...buttonStyles,
      ...fontStyle,
      paddingVertical,
      paddingHorizontal,
      height
    };
  };
export { inputSizeVariant, textAreaSizeVariant };
//# sourceMappingURL=inputHelpers.native.js.map
