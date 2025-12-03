import { stylePropsTextOnly, validStyles } from "@tamagui/helpers";
import { createComponent } from "../createComponent.native.js";
var ellipsisStyle = {
    numberOfLines: 1,
    lineBreakMode: "clip"
  },
  Text = createComponent({
    acceptsClassName: !0,
    isText: !0,
    defaultProps: {
      fontFamily: "unset",
      suppressHighlighting: !0
    },
    inlineWhenUnflattened: /* @__PURE__ */new Set(["fontFamily"]),
    variants: {
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
export { Text };
//# sourceMappingURL=Text.native.js.map
