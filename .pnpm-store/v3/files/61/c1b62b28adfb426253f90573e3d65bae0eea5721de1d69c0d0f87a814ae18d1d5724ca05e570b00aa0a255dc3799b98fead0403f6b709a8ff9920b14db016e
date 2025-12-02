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
export { useSheetOffscreenSize };
//# sourceMappingURL=useSheetOffscreenSize.native.js.map
