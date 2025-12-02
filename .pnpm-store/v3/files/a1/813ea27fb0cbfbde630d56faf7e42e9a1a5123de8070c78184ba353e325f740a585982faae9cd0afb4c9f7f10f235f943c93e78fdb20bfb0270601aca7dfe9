import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { normalizeColor, styled, useProps, useTheme } from "@tamagui/core";
import { YStack } from "@tamagui/stacks";
import { LinearGradient as ExpoLinearGradient } from "./linear-gradient.native.js";
var LinearGradientFrame = styled(YStack, {
    name: "LinearGradient",
    overflow: "hidden",
    position: "relative"
  }),
  LinearGradient = LinearGradientFrame.styleable(function (propsIn, ref) {
    var _props_colors,
      props = useProps(propsIn),
      {
        start,
        end,
        colors: colorsProp,
        locations,
        children,
        ...stackProps
      } = props,
      theme = useTheme(),
      colors = ((_props_colors = props.colors) === null || _props_colors === void 0 ? void 0 : _props_colors.map(function (c) {
        var _theme_c, _theme_c_get;
        return (_theme_c_get = (_theme_c = theme[c]) === null || _theme_c === void 0 ? void 0 : _theme_c.get("web")) !== null && _theme_c_get !== void 0 ? _theme_c_get : c;
      })) || [];
    return process.env.NODE_ENV !== "production" && colors.some(function (c) {
      var normalized = normalizeColor(c);
      if (!normalized || normalized.startsWith("$")) return !0;
    }) && (console.error(`LinearGradient: "colors" prop contains invalid color tokens: ${colors} fallback to default colors: ["#000", "#fff"]`), colors = ["#000", "#fff"]), /* @__PURE__ */_jsxs(LinearGradientFrame, {
      ref,
      ...stackProps,
      children: [/* @__PURE__ */_jsx(ExpoLinearGradient, {
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
export { LinearGradient };
//# sourceMappingURL=LinearGradient.native.js.map
