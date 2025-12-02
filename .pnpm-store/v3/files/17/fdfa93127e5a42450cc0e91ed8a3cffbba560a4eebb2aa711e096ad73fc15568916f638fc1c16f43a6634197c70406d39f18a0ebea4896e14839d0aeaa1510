import { stylePropsTextOnly, validStyles } from "@tamagui/helpers";
import { createComponent } from "../createComponent";
const ellipseStyle = {
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
}, defaultWebStyle = {
  display: "inline",
  // display: inline breaks css transform styles
  boxSizing: "border-box",
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  margin: 0
}, ellipsisStyle = ellipseStyle, Text = createComponent({
  acceptsClassName: !0,
  isText: !0,
  defaultProps: {
    fontFamily: "unset",
    ...defaultWebStyle
  },
  inlineWhenUnflattened: /* @__PURE__ */ new Set(["fontFamily"]),
  variants: {
    numberOfLines: {
      1: ellipseStyle,
      ":number": (numberOfLines) => numberOfLines >= 1 ? {
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
        overflow: "hidden"
      } : null
    },
    selectable: {
      true: {
        userSelect: "text",
        cursor: "text"
      },
      false: {
        userSelect: "none",
        cursor: "default"
      }
    },
    /**
     * @deprecated Use ellipsis instead
     */
    ellipse: {
      true: ellipsisStyle
    },
    ellipsis: {
      true: ellipsisStyle
    }
  },
  validStyles: {
    ...validStyles,
    ...stylePropsTextOnly
  }
});
Text.displayName = "Text";
export {
  Text
};
//# sourceMappingURL=Text.js.map
