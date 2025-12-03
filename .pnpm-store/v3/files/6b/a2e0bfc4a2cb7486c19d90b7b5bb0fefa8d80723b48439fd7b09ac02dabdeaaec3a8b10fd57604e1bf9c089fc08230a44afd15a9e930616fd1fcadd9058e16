import { isWeb } from "@tamagui/constants";
import { normalizeShadow } from "./normalizeShadow";
function fixStyles(style) {
  (style.shadowRadius != null || style.shadowColor || style.shadowOpacity != null || style.shadowOffset) && Object.assign(style, normalizeShadow(style));
  for (const key in borderDefaults)
    key in style && (style[borderDefaults[key]] ||= "solid");
}
const nativeStyle = isWeb ? null : "borderStyle", borderDefaults = {
  borderWidth: "borderStyle",
  borderBottomWidth: nativeStyle || "borderBottomStyle",
  borderTopWidth: nativeStyle || "borderTopStyle",
  borderLeftWidth: nativeStyle || "borderLeftStyle",
  borderRightWidth: nativeStyle || "borderRightStyle"
  // TODO: need to add borderBlock and borderInline here, but they are alot and might impact performance
};
export {
  fixStyles
};
//# sourceMappingURL=expandStyles.js.map
