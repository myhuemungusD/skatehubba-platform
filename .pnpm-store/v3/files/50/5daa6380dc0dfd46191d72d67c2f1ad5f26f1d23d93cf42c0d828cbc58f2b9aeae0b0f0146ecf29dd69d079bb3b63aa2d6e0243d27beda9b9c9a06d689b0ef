import { isWeb } from "@tamagui/constants";
import { getSetting } from "../config.mjs";
import { webToNativeDynamicExpansion, webToNativeExpansion } from "../constants/webToNativeProps.mjs";
const neg1Flex = [["flexGrow", 0], ["flexShrink", 1], ["flexBasis", "auto"]];
function expandStyle(key, value) {
  if (key === "flex") return value === -1 ? neg1Flex : [["flexGrow", value], ["flexShrink", 1], ["flexBasis", getSetting("styleCompat") === "react-native" ? 0 : "auto"]];
  switch (key) {
    case "textAlignVertical":
      return [["verticalAlign", value === "center" ? "middle" : value]];
    case "writingDirection":
      return [["direction", value]];
    // some safari-based browsers seem not to support without -webkit prefix
    case "backdropFilter":
      return [["backdropFilter", value], ["WebkitBackdropFilter", value]];
  }
  if (key in EXPANSIONS) return EXPANSIONS[key].map(key2 => [key2, value]);
  if (key in webToNativeExpansion) return webToNativeExpansion[key].map(key2 => [key2, value]);
  if (key in webToNativeDynamicExpansion) return webToNativeDynamicExpansion[key](value);
}
const all = ["Top", "Right", "Bottom", "Left"],
  horiz = ["Right", "Left"],
  vert = ["Top", "Bottom"],
  xy = ["X", "Y"],
  EXPANSIONS = {
    borderColor: ["TopColor", "RightColor", "BottomColor", "LeftColor"],
    borderRadius: ["TopLeftRadius", "TopRightRadius", "BottomRightRadius", "BottomLeftRadius"],
    borderWidth: ["TopWidth", "RightWidth", "BottomWidth", "LeftWidth"],
    margin: all,
    marginHorizontal: horiz,
    marginVertical: vert,
    overscrollBehavior: xy,
    padding: all,
    paddingHorizontal: horiz,
    paddingVertical: vert,
    ...(isWeb && {
      // react-native only supports borderStyle
      borderStyle: ["TopStyle", "RightStyle", "BottomStyle", "LeftStyle"],
      // react-native doesn't support X / Y
      overflow: xy
    })
  };
for (const parent in EXPANSIONS) {
  const prefix = parent.slice(0, /[A-Z]/.exec(parent)?.index ?? parent.length);
  EXPANSIONS[parent] = EXPANSIONS[parent].map(k => `${prefix}${k}`);
}
export { expandStyle };
//# sourceMappingURL=expandStyle.mjs.map
