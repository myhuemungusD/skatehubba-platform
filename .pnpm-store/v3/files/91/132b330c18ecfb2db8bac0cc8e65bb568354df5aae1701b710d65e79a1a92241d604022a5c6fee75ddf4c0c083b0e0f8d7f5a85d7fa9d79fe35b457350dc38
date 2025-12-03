"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var inputHelpers_exports = {};
__export(inputHelpers_exports, {
  inputSizeVariant: () => inputSizeVariant,
  textAreaSizeVariant: () => textAreaSizeVariant
});
module.exports = __toCommonJS(inputHelpers_exports);
var import_core = require("@tamagui/core"),
  import_get_button_sized = require("@tamagui/get-button-sized"),
  import_get_font_sized = require("@tamagui/get-font-sized"),
  import_get_token = require("@tamagui/get-token"),
  inputSizeVariant = function () {
    var val = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "$true",
      extras = arguments.length > 1 ? arguments[1] : void 0;
    if (extras.props.multiline || extras.props.numberOfLines > 1) return textAreaSizeVariant(val, extras);
    var buttonStyles = (0, import_get_button_sized.getButtonSized)(val, extras),
      paddingHorizontal = (0, import_get_token.getSpace)(val, {
        shift: -1,
        bounds: [2]
      }),
      fontStyle = (0, import_get_font_sized.getFontSized)(val, extras);
    return !import_core.isWeb && fontStyle && delete fontStyle.lineHeight, {
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
      buttonStyles = (0, import_get_button_sized.getButtonSized)(val, extras),
      fontStyle = (0, import_get_font_sized.getFontSized)(val, extras),
      _props_rows,
      lines = (_props_rows = props.rows) !== null && _props_rows !== void 0 ? _props_rows : props.numberOfLines,
      height = typeof lines == "number" ? lines * (0, import_core.getVariableValue)(fontStyle.lineHeight) : "auto",
      paddingVertical = (0, import_get_token.getSpace)(val, {
        shift: -2,
        bounds: [2]
      }),
      paddingHorizontal = (0, import_get_token.getSpace)(val, {
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
//# sourceMappingURL=inputHelpers.native.js.map
