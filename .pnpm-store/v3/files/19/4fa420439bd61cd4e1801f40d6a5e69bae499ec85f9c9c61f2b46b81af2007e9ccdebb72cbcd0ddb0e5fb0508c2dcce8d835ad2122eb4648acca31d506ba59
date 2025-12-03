function getOppositeScheme(scheme) {
  return scheme === "dark" ? "light" : "dark";
}
function getDynamicVal(param) {
  var {
      scheme,
      val,
      oppositeVal
    } = param,
    oppositeScheme = getOppositeScheme(scheme);
  return {
    dynamic: {
      [scheme]: val,
      [oppositeScheme]: oppositeVal
    }
  };
}
function extractValueFromDynamic(val, scheme) {
  return val?.dynamic ? val.dynamic[scheme] : val;
}
export { extractValueFromDynamic, getDynamicVal, getOppositeScheme };
//# sourceMappingURL=getDynamicVal.native.js.map
