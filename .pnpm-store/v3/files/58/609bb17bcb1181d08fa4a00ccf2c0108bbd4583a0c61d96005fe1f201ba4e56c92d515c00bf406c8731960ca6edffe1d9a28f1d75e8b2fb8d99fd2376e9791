import { getSpace } from "@tamagui/get-token";
var getButtonSized = function (val, param) {
  var {
    tokens,
    props
  } = param;
  if (!(!val || props.circular)) {
    if (typeof val == "number") return {
      paddingHorizontal: val * 0.25,
      height: val,
      borderRadius: props.circular ? 1e5 : val * 0.2
    };
    var xSize = getSpace(val),
      _tokens_radius_val,
      radiusToken = (_tokens_radius_val = tokens.radius[val]) !== null && _tokens_radius_val !== void 0 ? _tokens_radius_val : tokens.radius.$true;
    return {
      paddingHorizontal: xSize,
      height: val,
      borderRadius: props.circular ? 1e5 : radiusToken
    };
  }
};
export { getButtonSized };
//# sourceMappingURL=index.native.js.map
