function getOppositeScheme(scheme) {
  return scheme === "dark" ? "light" : "dark";
}
function getDynamicVal({
  scheme,
  val,
  oppositeVal
}) {
  const oppositeScheme = getOppositeScheme(scheme);
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
//# sourceMappingURL=getDynamicVal.mjs.map
