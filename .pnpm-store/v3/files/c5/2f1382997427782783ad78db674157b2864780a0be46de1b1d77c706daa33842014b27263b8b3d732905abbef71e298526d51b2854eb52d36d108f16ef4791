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
var helpers_exports = {};
__export(helpers_exports, {
  convertValueToPercentage: () => convertValueToPercentage,
  getClosestValueIndex: () => getClosestValueIndex,
  getDecimalCount: () => getDecimalCount,
  getLabel: () => getLabel,
  getNextSortedValues: () => getNextSortedValues,
  getThumbInBoundsOffset: () => getThumbInBoundsOffset,
  hasMinStepsBetweenValues: () => hasMinStepsBetweenValues,
  linearScale: () => linearScale,
  roundValue: () => roundValue
});
module.exports = __toCommonJS(helpers_exports);
function getNextSortedValues() {
  var prevValues = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    nextValue = arguments.length > 1 ? arguments[1] : void 0,
    atIndex = arguments.length > 2 ? arguments[2] : void 0,
    nextValues = [...prevValues];
  return nextValues[atIndex] = nextValue, nextValues.sort(function (a, b) {
    return a - b;
  });
}
function convertValueToPercentage(value, min, max) {
  var maxSteps = max - min,
    percentPerStep = 100 / maxSteps;
  return percentPerStep * (value - min);
}
function getLabel(index, totalValues) {
  if (totalValues > 2) return `Value ${index + 1} of ${totalValues}`;
  if (totalValues === 2) return ["Minimum", "Maximum"][index];
}
function getClosestValueIndex(values, nextValue) {
  if (values.length === 1) return 0;
  var distances = values.map(function (value) {
      return Math.abs(value - nextValue);
    }),
    closestDistance = Math.min(...distances);
  return distances.indexOf(closestDistance);
}
function getThumbInBoundsOffset(width, left, direction) {
  var quarterWidth = width / 4,
    halfPercent = 50,
    offset = linearScale([0, halfPercent], [0, quarterWidth]);
  return (quarterWidth - offset(left) * direction) * direction;
}
function getStepsBetweenValues(values) {
  return values.slice(0, -1).map(function (value, index) {
    return values[index + 1] - value;
  });
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
  if (minStepsBetweenValues > 0) {
    var stepsBetweenValues = getStepsBetweenValues(values),
      actualMinStepsBetweenValues = Math.min(...stepsBetweenValues);
    return actualMinStepsBetweenValues >= minStepsBetweenValues;
  }
  return !0;
}
function linearScale(input, output) {
  return function (value) {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    var ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function getDecimalCount(value) {
  return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
  var rounder = Math.pow(10, decimalCount);
  return Math.round(value * rounder) / rounder;
}
//# sourceMappingURL=helpers.native.js.map
