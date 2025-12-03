function opacify(color, opacity = 0.1) {
  if (color.startsWith("hsl")) {
    const match = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
    if (match) {
      const [, h, s, l] = match;
      return `hsla(${h}, ${s}%, ${l}%, ${opacity})`;
    }
  }
  if (color.startsWith("#")) {
    let hex = color.slice(1);
    if (hex.length === 3 && (hex = hex.split("").map((c) => c + c).join("")), hex.length === 6 || hex.length === 8) {
      const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, "0");
      return `#${hex.slice(0, 6)}${alphaHex}`;
    }
  }
  return color;
}
export {
  opacify
};
//# sourceMappingURL=opacify.js.map
