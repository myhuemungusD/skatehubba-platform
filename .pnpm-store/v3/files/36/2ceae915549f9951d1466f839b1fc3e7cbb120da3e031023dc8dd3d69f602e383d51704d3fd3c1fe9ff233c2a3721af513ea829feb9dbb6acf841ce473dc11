import { isClient } from "@tamagui/constants";
import { getTokens, styled, Text } from "@tamagui/web";
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var getFontSized = function () {
    var sizeTokenIn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "$true",
      {
        font,
        fontFamily,
        props
      } = arguments.length > 1 ? arguments[1] : void 0,
      _font_lineHeight,
      _font_weight,
      _font_letterSpacing,
      _font_transform,
      _font_style,
      _font_color;
    if (!font) return {
      fontSize: sizeTokenIn
    };
    var sizeToken = sizeTokenIn === "$true" ? getDefaultSizeToken(font) : sizeTokenIn,
      style = {},
      fontSize = font.size[sizeToken],
      lineHeight = (_font_lineHeight = font.lineHeight) === null || _font_lineHeight === void 0 ? void 0 : _font_lineHeight[sizeToken],
      fontWeight = (_font_weight = font.weight) === null || _font_weight === void 0 ? void 0 : _font_weight[sizeToken],
      letterSpacing = (_font_letterSpacing = font.letterSpacing) === null || _font_letterSpacing === void 0 ? void 0 : _font_letterSpacing[sizeToken],
      textTransform = (_font_transform = font.transform) === null || _font_transform === void 0 ? void 0 : _font_transform[sizeToken],
      _props_fontStyle,
      fontStyle = (_props_fontStyle = props.fontStyle) !== null && _props_fontStyle !== void 0 ? _props_fontStyle : (_font_style = font.style) === null || _font_style === void 0 ? void 0 : _font_style[sizeToken],
      _props_color,
      color = (_props_color = props.color) !== null && _props_color !== void 0 ? _props_color : (_font_color = font.color) === null || _font_color === void 0 ? void 0 : _font_color[sizeToken];
    return fontStyle && (style.fontStyle = fontStyle), textTransform && (style.textTransform = textTransform), fontFamily && (style.fontFamily = fontFamily), fontWeight && (style.fontWeight = fontWeight), letterSpacing && (style.letterSpacing = letterSpacing), fontSize && (style.fontSize = fontSize), lineHeight && (style.lineHeight = lineHeight), color && (style.color = color), process.env.NODE_ENV === "development" && props.debug && props.debug === "verbose" && (console.groupCollapsed("  \u{1F539} getFontSized", sizeTokenIn, sizeToken), isClient && console.info({
      style,
      props,
      font
    }), console.groupEnd()), style;
  },
  SizableText = styled(Text, {
    name: "SizableText",
    fontFamily: "$body",
    variants: {
      size: {
        "...fontSize": getFontSized
      }
    },
    defaultVariants: {
      size: "$true"
    }
  }),
  cache = /* @__PURE__ */new WeakMap();
function getDefaultSizeToken(font) {
  if ((typeof font > "u" ? "undefined" : _type_of(font)) === "object" && cache.has(font)) return cache.get(font);
  var sizeTokens = "$true" in font.size ? font.size : getTokens().size,
    sizeDefault = sizeTokens.$true,
    sizeDefaultSpecific = sizeDefault ? Object.keys(sizeTokens).find(function (x) {
      return x !== "$true" && sizeTokens[x].val === sizeDefault.val;
    }) : null;
  return !sizeDefault || !sizeDefaultSpecific ? (process.env.NODE_ENV === "development" && console.warn(`No default size is set in your tokens for the "true" key, fonts will be inconsistent.

      Fix this by having consistent tokens across fonts and sizes and setting a true key for your size tokens, or
      set true keys for all your font tokens: "size", "lineHeight", "fontStyle", etc.`), Object.keys(font.size)[3]) : (cache.set(font, sizeDefaultSpecific), sizeDefaultSpecific);
}
export { SizableText, getFontSized };
//# sourceMappingURL=index.native.js.map
