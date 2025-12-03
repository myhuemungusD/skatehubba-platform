var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var linear_gradient_exports = {};
__export(linear_gradient_exports, {
  LinearGradient: () => LinearGradient
});
module.exports = __toCommonJS(linear_gradient_exports);
var import_core = require("@tamagui/core"), React = __toESM(require("react"), 1), import_react_native = require("react-native-web"), import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_react_native.View,
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
    const output = (0, import_core.normalizeColor)(color);
    if (locations && locations[index]) {
      const percentage = Math.max(0, Math.min(1, locations[index])) * 100;
      return `${output} ${percentage}%`;
    }
    return output;
  });
}
//# sourceMappingURL=linear-gradient.js.map
