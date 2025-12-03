import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
function wrapChildrenInText(TextComponent, propsIn, extraProps) {
  var {
    children,
    textProps,
    size,
    noTextWrap,
    color,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
    textAlign,
    fontStyle,
    maxFontSizeMultiplier
  } = propsIn;
  if (noTextWrap || !children) return [children];
  var props = {
    ...extraProps
  };
  return color && (props.color = color), fontFamily && (props.fontFamily = fontFamily), fontSize && (props.fontSize = fontSize), fontWeight && (props.fontWeight = fontWeight), letterSpacing && (props.letterSpacing = letterSpacing), textAlign && (props.textAlign = textAlign), size && (props.size = size), fontStyle && (props.fontStyle = fontStyle), maxFontSizeMultiplier && (props.maxFontSizeMultiplier = maxFontSizeMultiplier), React.Children.toArray(children).map(function (child, index) {
    return typeof child == "string" ?
    // so "data-disable-theme" is a hack to fix themeInverse, don't ask me why
    /* @__PURE__ */
    _jsx(TextComponent, {
      ...props,
      ...textProps,
      children: child
    }, index) : child;
  });
}
export { wrapChildrenInText };
//# sourceMappingURL=wrapChildrenInText.native.js.map
