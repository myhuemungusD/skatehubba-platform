var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var getThemeSuitePalettes_exports = {};
__export(getThemeSuitePalettes_exports, {
  PALETTE_BACKGROUND_OFFSET: () => PALETTE_BACKGROUND_OFFSET,
  getThemeSuitePalettes: () => getThemeSuitePalettes
});
module.exports = __toCommonJS(getThemeSuitePalettes_exports);
var import_color2k = require("color2k");
const paletteSize = 12, PALETTE_BACKGROUND_OFFSET = 6, generateColorPalette = ({
  palette: buildPalette,
  scheme
}) => {
  if (!buildPalette)
    return [];
  const { anchors } = buildPalette;
  let palette = [];
  const add = (h, s, l, a) => {
    palette.push((0, import_color2k.hsla)(h, s, l, a ?? 1));
  }, numAnchors = Object.keys(anchors).length;
  for (const [anchorIndex, anchor] of anchors.entries()) {
    const [h, s, l, a] = [
      anchor.hue[scheme],
      anchor.sat[scheme],
      anchor.lum[scheme],
      anchor.alpha?.[scheme] ?? 1
    ];
    if (anchorIndex !== 0) {
      const lastAnchor = anchors[anchorIndex - 1], steps = anchor.index - lastAnchor.index, lastHue = lastAnchor.hue[scheme], lastSat = lastAnchor.sat[scheme], lastLum = lastAnchor.lum[scheme], stepHue = (lastHue - h) / steps, stepSat = (lastSat - s) / steps, stepLum = (lastLum - l) / steps;
      for (let step = lastAnchor.index + 1; step < anchor.index; step++) {
        const str = anchor.index - step;
        add(h + stepHue * str, s + stepSat * str, l + stepLum * str);
      }
    }
    if (add(h, s, l, a), anchorIndex === numAnchors - 1 && palette.length < paletteSize)
      for (let step = anchor.index + 1; step < paletteSize; step++)
        add(h, s, l);
  }
  const background = palette[0], foreground = palette[palette.length - 1], transparentValues = [background, foreground].map((color) => {
    const [h, s, l] = (0, import_color2k.parseToHsla)(color);
    return [
      (0, import_color2k.hsla)(h, s, l, 0),
      (0, import_color2k.hsla)(h, s, l, 0.2),
      (0, import_color2k.hsla)(h, s, l, 0.4),
      (0, import_color2k.hsla)(h, s, l, 0.6),
      (0, import_color2k.hsla)(h, s, l, 0.8)
    ];
  }), reverseForeground = [...transparentValues[1]].reverse();
  return palette = [...transparentValues[0], ...palette, ...reverseForeground], palette;
};
function getThemeSuitePalettes(palette) {
  return {
    light: generateColorPalette({ palette, scheme: "light" }),
    dark: generateColorPalette({ palette, scheme: "dark" })
  };
}
//# sourceMappingURL=getThemeSuitePalettes.js.map
