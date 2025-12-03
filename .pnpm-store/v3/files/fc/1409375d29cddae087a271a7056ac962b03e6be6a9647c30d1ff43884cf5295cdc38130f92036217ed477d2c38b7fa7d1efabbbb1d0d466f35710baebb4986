import { isClient } from "@tamagui/constants";
import { getTokens, styled, Text } from "@tamagui/web";
const getFontSized = (sizeTokenIn = "$true", {
    font,
    fontFamily,
    props
  }) => {
    if (!font) return {
      fontSize: sizeTokenIn
    };
    const sizeToken = sizeTokenIn === "$true" ? getDefaultSizeToken(font) : sizeTokenIn,
      style = {},
      fontSize = font.size[sizeToken],
      lineHeight = font.lineHeight?.[sizeToken],
      fontWeight = font.weight?.[sizeToken],
      letterSpacing = font.letterSpacing?.[sizeToken],
      textTransform = font.transform?.[sizeToken],
      fontStyle = props.fontStyle ?? font.style?.[sizeToken],
      color = props.color ?? font.color?.[sizeToken];
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
  if (typeof font == "object" && cache.has(font)) return cache.get(font);
  const sizeTokens = "$true" in font.size ? font.size : getTokens().size,
    sizeDefault = sizeTokens.$true,
    sizeDefaultSpecific = sizeDefault ? Object.keys(sizeTokens).find(x => x !== "$true" && sizeTokens[x].val === sizeDefault.val) : null;
  return !sizeDefault || !sizeDefaultSpecific ? (process.env.NODE_ENV === "development" && console.warn(`No default size is set in your tokens for the "true" key, fonts will be inconsistent.

      Fix this by having consistent tokens across fonts and sizes and setting a true key for your size tokens, or
      set true keys for all your font tokens: "size", "lineHeight", "fontStyle", etc.`), Object.keys(font.size)[3]) : (cache.set(font, sizeDefaultSpecific), sizeDefaultSpecific);
}
export { SizableText, getFontSized };
//# sourceMappingURL=index.mjs.map
