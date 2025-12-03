import { isWeb } from "@tamagui/constants";
import { normalizeShadow } from "./normalizeShadow.native.js";
function fixStyles(style) {
  "elevationAndroid" in style && (style.elevation = style.elevationAndroid, delete style.elevationAndroid), (style.shadowRadius != null || style.shadowColor || style.shadowOpacity != null || style.shadowOffset) && Object.assign(style, normalizeShadow(style));
  for (var key in borderDefaults) if (key in style) {
    var _style, _borderDefaults_key;
    (_style = style)[_borderDefaults_key = borderDefaults[key]] || (_style[_borderDefaults_key] = "solid");
  }
}
var nativeStyle = isWeb ? null : "borderStyle",
  borderDefaults = {
    borderWidth: "borderStyle",
    borderBottomWidth: nativeStyle || "borderBottomStyle",
    borderTopWidth: nativeStyle || "borderTopStyle",
    borderLeftWidth: nativeStyle || "borderLeftStyle",
    borderRightWidth: nativeStyle || "borderRightStyle"
  };
export { fixStyles };
//# sourceMappingURL=expandStyles.native.js.map
