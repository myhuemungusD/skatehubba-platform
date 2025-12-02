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
var SizableText_exports = {};
__export(SizableText_exports, {
  SizableText: () => SizableText
});
module.exports = __toCommonJS(SizableText_exports);
var import_get_font_sized = require("@tamagui/get-font-sized"),
  import_web = require("@tamagui/web");
const SizableText = (0, import_web.styled)(import_web.Text, {
  name: "SizableText",
  fontFamily: "$body",
  variants: {
    unstyled: {
      false: {
        size: "$true",
        color: "$color"
      }
    },
    size: import_get_font_sized.getFontSized
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
});
SizableText.staticConfig.variants.fontFamily = {
  "...": (_val, extras) => {
    const sizeProp = extras.props.size,
      fontSizeProp = extras.props.fontSize,
      size = sizeProp === "$true" && fontSizeProp ? fontSizeProp : extras.props.size || "$true";
    return (0, import_get_font_sized.getFontSized)(size, extras);
  }
};