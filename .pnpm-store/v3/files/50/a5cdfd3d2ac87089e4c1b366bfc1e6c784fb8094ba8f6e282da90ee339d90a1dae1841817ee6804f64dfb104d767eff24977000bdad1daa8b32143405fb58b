import { normalizeValueWithProperty } from "./normalizeValueWithProperty";
function transformsToString(transforms) {
  return transforms.map(
    // { scale: 2 } => 'scale(2)'
    // { translateX: 20 } => 'translateX(20px)'
    // { matrix: [1,2,3,4,5,6] } => 'matrix(1,2,3,4,5,6)'
    // { perspective: 1000 } => perspective(1000px)
    (transform) => {
      const type = Object.keys(transform)[0], value = transform[type];
      return type === "matrix" || type === "matrix3d" ? `${type}(${value.join(",")})` : `${type}(${normalizeValueWithProperty(value, type)})`;
    }
  ).join(" ");
}
export {
  transformsToString
};
//# sourceMappingURL=transformsToString.js.map
