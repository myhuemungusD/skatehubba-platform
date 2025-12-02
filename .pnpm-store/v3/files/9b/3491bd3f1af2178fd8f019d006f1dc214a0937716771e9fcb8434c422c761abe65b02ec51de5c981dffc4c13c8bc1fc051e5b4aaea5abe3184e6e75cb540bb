var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var Anchor_exports = {};
__export(Anchor_exports, {
  Anchor: () => Anchor
});
module.exports = __toCommonJS(Anchor_exports);
var import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_text = require("@tamagui/text"),
  import_react_native = require("react-native-web"),
  import_jsx_runtime = require("react/jsx-runtime");
const AnchorFrame = (0, import_core.styled)(import_text.SizableText, {
    name: "Anchor",
    tag: "a",
    accessibilityRole: "link"
  }),
  Anchor = AnchorFrame.styleable(({
    href,
    target,
    ...props
  }, ref) => /* @__PURE__ */(0, import_jsx_runtime.jsx)(AnchorFrame, {
    ...props,
    ...(import_constants.isWeb ? {
      href,
      target
    } : {
      onPress: event => {
        props.onPress?.(event), href !== void 0 && import_react_native.Linking.openURL(href);
      }
    }),
    ref
  }));