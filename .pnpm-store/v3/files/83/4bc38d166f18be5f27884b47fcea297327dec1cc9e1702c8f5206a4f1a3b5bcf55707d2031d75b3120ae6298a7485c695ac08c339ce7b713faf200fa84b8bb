var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var expandStyle_exports = {};
__export(expandStyle_exports, {
  expandStyle: () => expandStyle
});
module.exports = __toCommonJS(expandStyle_exports);
var import_constants = require("@tamagui/constants"), import_config = require("../config"), import_webToNativeProps = require("../constants/webToNativeProps");
const neg1Flex = [
  ["flexGrow", 0],
  ["flexShrink", 1],
  ["flexBasis", "auto"]
];
function expandStyle(key, value) {
  if (key === "flex")
    return value === -1 ? neg1Flex : [
      ["flexGrow", value],
      ["flexShrink", 1],
      ["flexBasis", (0, import_config.getSetting)("styleCompat") === "react-native" ? 0 : "auto"]
    ];
  switch (key) {
    case "textAlignVertical":
      return [["verticalAlign", value === "center" ? "middle" : value]];
    case "writingDirection":
      return [["direction", value]];
    // some safari-based browsers seem not to support without -webkit prefix
    case "backdropFilter":
      return [
        ["backdropFilter", value],
        ["WebkitBackdropFilter", value]
      ];
  }
  if (key in EXPANSIONS)
    return EXPANSIONS[key].map((key2) => [key2, value]);
  if (key in import_webToNativeProps.webToNativeExpansion)
    return import_webToNativeProps.webToNativeExpansion[key].map((key2) => [key2, value]);
  if (key in import_webToNativeProps.webToNativeDynamicExpansion)
    return import_webToNativeProps.webToNativeDynamicExpansion[key](value);
}
const all = ["Top", "Right", "Bottom", "Left"], horiz = ["Right", "Left"], vert = ["Top", "Bottom"], xy = ["X", "Y"], EXPANSIONS = {
  borderColor: ["TopColor", "RightColor", "BottomColor", "LeftColor"],
  borderRadius: [
    "TopLeftRadius",
    "TopRightRadius",
    "BottomRightRadius",
    "BottomLeftRadius"
  ],
  borderWidth: ["TopWidth", "RightWidth", "BottomWidth", "LeftWidth"],
  margin: all,
  marginHorizontal: horiz,
  marginVertical: vert,
  overscrollBehavior: xy,
  padding: all,
  paddingHorizontal: horiz,
  paddingVertical: vert,
  ...import_constants.isWeb && {
    // react-native only supports borderStyle
    borderStyle: ["TopStyle", "RightStyle", "BottomStyle", "LeftStyle"],
    // react-native doesn't support X / Y
    overflow: xy
  }
};
for (const parent in EXPANSIONS) {
  const prefix = parent.slice(0, /[A-Z]/.exec(parent)?.index ?? parent.length);
  EXPANSIONS[parent] = EXPANSIONS[parent].map((k) => `${prefix}${k}`);
}
//# sourceMappingURL=expandStyle.js.map
