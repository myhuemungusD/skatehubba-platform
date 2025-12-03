import { IS_REACT_19 } from "@tamagui/constants";
import { StyleObjectIdentifier, StyleObjectRules } from "@tamagui/helpers";
import { Fragment, jsx } from "react/jsx-runtime";
function getStyleTags(styles) {
  if (IS_REACT_19 && styles.length)
    return /* @__PURE__ */ jsx(Fragment, { children: styles.map((styleObject) => {
      const identifier = styleObject[StyleObjectIdentifier];
      return /* @__PURE__ */ jsx(
        "style",
        {
          href: `t_${identifier}`,
          precedence: "default",
          suppressHydrationWarning: !0,
          children: styleObject[StyleObjectRules].join(`
`)
        },
        identifier
      );
    }) });
}
export {
  getStyleTags
};
//# sourceMappingURL=wrapStyleTags.js.map
