function opacify(color) {
  var opacity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.1;
  if (color.startsWith("hsl")) {
    var match = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
    if (match) {
      var [, h, s, l] = match;
      return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
    }
  }
  if (color.startsWith("#")) {
    var hex = color.slice(1);
    if (hex.length === 3 && (hex = hex.split("").map(function (c) {
      return c + c;
    }).join("")), hex.length === 6 || hex.length === 8) {
      var alphaHex = Math.round(opacity * 255).toString(16).padStart(2, "0");
      return `#${hex.slice(0, 6)}${alphaHex}`;
    }
  }
  return color;
}
export { opacify };
//# sourceMappingURL=opacify.native.js.map
