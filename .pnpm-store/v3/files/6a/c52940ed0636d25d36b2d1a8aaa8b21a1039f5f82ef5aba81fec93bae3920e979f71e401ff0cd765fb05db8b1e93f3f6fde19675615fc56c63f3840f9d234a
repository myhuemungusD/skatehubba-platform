"use strict";

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
var LinearGradient_exports = {};
__export(LinearGradient_exports, {
  LinearGradient: () => LinearGradient
});
module.exports = __toCommonJS(LinearGradient_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_core = require("@tamagui/core"),
  import_stacks = require("@tamagui/stacks"),
  import_linear_gradient = require("./linear-gradient.native.js"),
  LinearGradientFrame = (0, import_core.styled)(import_stacks.YStack, {
    name: "LinearGradient",
    overflow: "hidden",
    position: "relative"
  }),
  LinearGradient = LinearGradientFrame.styleable(function (propsIn, ref) {
    var _props_colors,
      props = (0, import_core.useProps)(propsIn),
      {
        start,
        end,
        colors: colorsProp,
        locations,
        children,
        ...stackProps
      } = props,
      theme = (0, import_core.useTheme)(),
      colors = ((_props_colors = props.colors) === null || _props_colors === void 0 ? void 0 : _props_colors.map(function (c) {
        var _theme_c, _theme_c_get;
        return (_theme_c_get = (_theme_c = theme[c]) === null || _theme_c === void 0 ? void 0 : _theme_c.get("web")) !== null && _theme_c_get !== void 0 ? _theme_c_get : c;
      })) || [];
    return process.env.NODE_ENV !== "production" && colors.some(function (c) {
      var normalized = (0, import_core.normalizeColor)(c);
      if (!normalized || normalized.startsWith("$")) return !0;
    }) && (console.error(`LinearGradient: "colors" prop contains invalid color tokens: ${colors} fallback to default colors: ["#000", "#fff"]`), colors = ["#000", "#fff"]), /* @__PURE__ */(0, import_jsx_runtime.jsxs)(LinearGradientFrame, {
      ref,
      ...stackProps,
      children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_linear_gradient.LinearGradient, {
        start,
        end,
        colors,
        locations,
        style: gradientStyle
      }), children]
    });
  }),
  gradientStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  };
//# sourceMappingURL=LinearGradient.native.js.map
