var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var Text_exports = {};
__export(Text_exports, {
  Text: () => Text
});
module.exports = __toCommonJS(Text_exports);
var import_helpers = require("@tamagui/helpers"), import_createComponent = require("../createComponent");
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
}, ellipsisStyle = ellipseStyle, Text = (0, import_createComponent.createComponent)({
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
    ...import_helpers.validStyles,
    ...import_helpers.stylePropsTextOnly
  }
});
Text.displayName = "Text";
//# sourceMappingURL=Text.js.map
