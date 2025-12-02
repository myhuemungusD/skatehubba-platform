function getNextSortedValues(prevValues = [], nextValue, atIndex) {
  const nextValues = [...prevValues];
  return nextValues[atIndex] = nextValue, nextValues.sort((a, b) => a - b);
}
function convertValueToPercentage(value, min, max) {
  return 100 / (max - min) * (value - min);
}
function getLabel(index, totalValues) {
  if (totalValues > 2)
    return `Value ${index + 1} of ${totalValues}`;
  if (totalValues === 2)
    return ["Minimum", "Maximum"][index];
}
function getClosestValueIndex(values, nextValue) {
  if (values.length === 1) return 0;
  const distances = values.map((value) => Math.abs(value - nextValue)), closestDistance = Math.min(...distances);
  return distances.indexOf(closestDistance);
}
function getThumbInBoundsOffset(width, left, direction) {
  const quarterWidth = width / 4, offset = linearScale([0, 50], [0, quarterWidth]);
  return (quarterWidth - offset(left) * direction) * direction;
}
function getStepsBetweenValues(values) {
  return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
  if (minStepsBetweenValues > 0) {
    const stepsBetweenValues = getStepsBetweenValues(values);
    return Math.min(...stepsBetweenValues) >= minStepsBetweenValues;
  }
  return !0;
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function getDecimalCount(value) {
  return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
  const rounder = 10 ** decimalCount;
  return Math.round(value * rounder) / rounder;
}
export {
  convertValueToPercentage,
  getClosestValueIndex,
  getDecimalCount,
  getLabel,
  getNextSortedValues,
  getThumbInBoundsOffset,
  hasMinStepsBetweenValues,
  linearScale,
  roundValue
};
//# sourceMappingURL=helpers.js.map
