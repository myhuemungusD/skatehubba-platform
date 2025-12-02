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
var useSheetOffscreenSize_exports = {};
__export(useSheetOffscreenSize_exports, {
  useSheetOffscreenSize: () => useSheetOffscreenSize
});
module.exports = __toCommonJS(useSheetOffscreenSize_exports);
var useSheetOffscreenSize = function (param) {
  var {
    snapPoints,
    position,
    screenSize,
    frameSize,
    snapPointsMode
  } = param;
  if (snapPointsMode === "fit") return 0;
  if (snapPointsMode === "constant") {
    var maxSize = Number(snapPoints[0]),
      _snapPoints_position,
      currentSize = Number((_snapPoints_position = snapPoints[position]) !== null && _snapPoints_position !== void 0 ? _snapPoints_position : 0),
      offscreenSize = maxSize - currentSize;
    return offscreenSize;
  }
  if (snapPointsMode === "percent") {
    var maxPercentOpened = Number(snapPoints[0]) / 100,
      _snapPoints_position1,
      percentOpened = Number((_snapPoints_position1 = snapPoints[position]) !== null && _snapPoints_position1 !== void 0 ? _snapPoints_position1 : 0) / 100,
      percentHidden = maxPercentOpened - percentOpened,
      offscreenSize1 = percentHidden * screenSize;
    return offscreenSize1;
  }
  var maxSnapPoint = snapPoints[0];
  if (maxSnapPoint === "fit") return 0;
  var maxSize1 = typeof maxSnapPoint == "string" ? Number(maxSnapPoint.slice(0, -1)) / 100 * screenSize : maxSnapPoint,
    _snapPoints_position2,
    currentSnapPoint = (_snapPoints_position2 = snapPoints[position]) !== null && _snapPoints_position2 !== void 0 ? _snapPoints_position2 : 0,
    currentSize1 = typeof currentSnapPoint == "string" ? Number(currentSnapPoint.slice(0, -1)) / 100 * screenSize : currentSnapPoint,
    offscreenSize2 = maxSize1 - currentSize1;
  return Number.isNaN(offscreenSize2) ? 0 : offscreenSize2;
};
//# sourceMappingURL=useSheetOffscreenSize.native.js.map
