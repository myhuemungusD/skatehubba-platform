import { normalizeColor, styled, useProps, useTheme } from "@tamagui/core";
import { YStack } from "@tamagui/stacks";
import { LinearGradient as ExpoLinearGradient } from "./linear-gradient";
import { jsx, jsxs } from "react/jsx-runtime";
const LinearGradientFrame = styled(YStack, {
  name: "LinearGradient",
  overflow: "hidden",
  position: "relative"
}), LinearGradient = LinearGradientFrame.styleable(
  (propsIn, ref) => {
    const props = useProps(propsIn), { start, end, colors: colorsProp, locations, children, ...stackProps } = props, theme = useTheme();
    let colors = props.colors?.map((c) => theme[c]?.get("web") ?? c) || [];
    return process.env.NODE_ENV !== "production" && colors.some((c) => {
      const normalized = normalizeColor(c);
      if (!normalized || normalized.startsWith("$"))
        return !0;
    }) && (console.error(
      `LinearGradient: "colors" prop contains invalid color tokens: ${colors} fallback to default colors: ["#000", "#fff"]`
    ), colors = ["#000", "#fff"]), /* @__PURE__ */ jsxs(LinearGradientFrame, { ref, ...stackProps, children: [
      /* @__PURE__ */ jsx(
        ExpoLinearGradient,
        {
          start,
          end,
          colors,
          locations,
          style: gradientStyle
        }
      ),
      children
    ] });
  }
), gradientStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0
};
export {
  LinearGradient
};
//# sourceMappingURL=LinearGradient.js.map
