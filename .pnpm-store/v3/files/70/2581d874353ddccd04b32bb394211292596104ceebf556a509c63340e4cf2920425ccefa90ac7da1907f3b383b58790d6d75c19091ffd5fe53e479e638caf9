import { normalizeColor } from "@tamagui/core";
import * as React from "react";
import { View } from "react-native-web";
import { jsx } from "react/jsx-runtime";
function LinearGradient({
  colors,
  locations,
  start,
  end,
  ...props
}) {
  const [{ height, width }, setLayout] = React.useState({
    height: 1,
    width: 1
  }), linearGradientBackgroundImage = React.useMemo(() => getLinearGradientBackgroundImage(
    // @ts-expect-error ok
    colors,
    locations,
    start ? Array.isArray(start) ? start : [start.x, start.y] : void 0,
    end ? Array.isArray(end) ? end : [end.x, end.y] : void 0,
    width,
    height
  ), [colors, locations, start, end, width, height]);
  return /* @__PURE__ */ jsx(
    View,
    {
      ...props,
      style: [
        props.style,
        // @ts-ignore: [ts] Property 'backgroundImage' does not exist on type 'ViewStyle'.
        { backgroundImage: linearGradientBackgroundImage }
      ],
      onLayout: (event) => {
        const { width: width2, height: height2 } = event.nativeEvent.layout;
        setLayout((oldLayout) => width2 !== oldLayout.width || height2 !== oldLayout.height ? { height: height2, width: width2 } : oldLayout), props.onLayout && props.onLayout(event);
      }
    }
  );
}
function getLinearGradientBackgroundImage(colors, locations, startPoint, endPoint, width = 1, height = 1) {
  const gradientColors = calculateGradientColors(
    // @ts-expect-error TODO fix numbers
    colors,
    locations
  );
  return `linear-gradient(${calculatePseudoAngle(width, height, startPoint, endPoint)}deg, ${gradientColors.join(", ")})`;
}
function calculatePseudoAngle(width, height, startPoint, endPoint) {
  const getControlPoints = () => {
    let correctedStartPoint = [0, 0];
    Array.isArray(startPoint) && (correctedStartPoint = [
      startPoint[0] != null ? startPoint[0] : 0,
      startPoint[1] != null ? startPoint[1] : 0
    ]);
    let correctedEndPoint = [0, 1];
    return Array.isArray(endPoint) && (correctedEndPoint = [
      endPoint[0] != null ? endPoint[0] : 0,
      endPoint[1] != null ? endPoint[1] : 1
    ]), [correctedStartPoint, correctedEndPoint];
  }, [start, end] = getControlPoints();
  start[0] *= width, end[0] *= width, start[1] *= height, end[1] *= height;
  const py = end[1] - start[1], px = end[0] - start[0];
  return 90 + Math.atan2(py, px) * 180 / Math.PI;
}
function calculateGradientColors(colors, locations) {
  return colors.map((color, index) => {
    const output = normalizeColor(color);
    if (locations && locations[index]) {
      const percentage = Math.max(0, Math.min(1, locations[index])) * 100;
      return `${output} ${percentage}%`;
    }
    return output;
  });
}
export {
  LinearGradient
};
//# sourceMappingURL=linear-gradient.js.map
