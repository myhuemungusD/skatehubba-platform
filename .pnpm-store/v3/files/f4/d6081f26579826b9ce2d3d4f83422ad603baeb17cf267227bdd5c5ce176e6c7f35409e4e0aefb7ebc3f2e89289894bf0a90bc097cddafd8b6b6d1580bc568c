import { createTamagui as createTamaguiCore } from "@tamagui/core";
var createTamagui = process.env.NODE_ENV !== "development" ? createTamaguiCore : function (conf) {
  for (var sizeTokenKeys = ["$true"], hasKeys = function (expectedKeys, obj) {
      return expectedKeys.every(function (k) {
        return typeof obj[k] < "u";
      });
    }, tamaguiConfig = createTamaguiCore(conf), _i = 0, _iter = ["size", "space"]; _i < _iter.length; _i++) {
    var name = _iter[_i],
      tokenSet = tamaguiConfig.tokensParsed[name];
    if (!tokenSet) throw new Error(`Expected tokens for "${name}" in ${Object.keys(tamaguiConfig.tokensParsed).join(", ")}`);
    if (!hasKeys(sizeTokenKeys, tokenSet)) throw new Error(`
createTamagui() missing expected tokens.${name}:

Received: ${Object.keys(tokenSet).join(", ")}

Expected: ${sizeTokenKeys.join(", ")}

Tamagui expects a "true" key that is the same value as your default size. This is so 
it can size things up or down from the defaults without assuming which keys you use.

Please define a "true" or "$true" key on your size and space tokens like so (example):

size: {
  sm: 2,
  md: 10,
  true: 10, // this means "md" is your default size
  lg: 20,
}

`);
  }
  for (var expected = Object.keys(tamaguiConfig.tokensParsed.size), _i1 = 0, _iter1 = ["radius", "zIndex"]; _i1 < _iter1.length; _i1++) {
    var name1 = _iter1[_i1],
      tokenSet1 = tamaguiConfig.tokensParsed[name1],
      received = Object.keys(tokenSet1),
      hasSomeOverlap = received.some(function (rk) {
        return expected.includes(rk);
      });
    if (!hasSomeOverlap) throw new Error(`
createTamagui() invalid tokens.${name1}:

Received: ${received.join(", ")}

Expected a subset of: ${expected.join(", ")}

`);
  }
  return tamaguiConfig;
};
export { createTamagui };
//# sourceMappingURL=createTamagui.native.js.map
