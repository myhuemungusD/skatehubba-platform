import { isAndroid, isWeb } from "@tamagui/constants";
import "../config.native.js";
import { webToNativeDynamicExpansion, webToNativeExpansion } from "../constants/webToNativeProps.native.js";
var _loop = function (parent) {
  var _exec,
    _exec_index,
    prefix = parent.slice(0, (_exec_index = (_exec = /[A-Z]/.exec(parent)) === null || _exec === void 0 ? void 0 : _exec.index) !== null && _exec_index !== void 0 ? _exec_index : parent.length);
  EXPANSIONS[parent] = EXPANSIONS[parent].map(function (k) {
    return `${prefix}${k}`;
  });
};
function expandStyle(key, value) {
  if (isAndroid && key === "elevationAndroid") return [["elevation", value]];
  if (key in EXPANSIONS) return EXPANSIONS[key].map(function (key2) {
    return [key2, value];
  });
  if (key in webToNativeExpansion) return webToNativeExpansion[key].map(function (key2) {
    return [key2, value];
  });
  if (key in webToNativeDynamicExpansion) return webToNativeDynamicExpansion[key](value);
}
var all = ["Top", "Right", "Bottom", "Left"],
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
for (var parent in EXPANSIONS) _loop(parent);
export { expandStyle };
//# sourceMappingURL=expandStyle.native.js.map
