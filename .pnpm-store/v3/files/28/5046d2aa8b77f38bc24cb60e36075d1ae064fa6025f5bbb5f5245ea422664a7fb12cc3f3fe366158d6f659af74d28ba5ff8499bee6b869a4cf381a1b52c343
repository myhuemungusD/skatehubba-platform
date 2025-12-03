import { hsla, parseToHsla } from "color2k";
const paletteSize = 12,
  PALETTE_BACKGROUND_OFFSET = 6,
  generateColorPalette = ({
    palette: buildPalette,
    scheme
  }) => {
    if (!buildPalette) return [];
    const {
      anchors
    } = buildPalette;
    let palette = [];
    const add = (h, s, l, a) => {
        palette.push(hsla(h, s, l, a ?? 1));
      },
      numAnchors = Object.keys(anchors).length;
    for (const [anchorIndex, anchor] of anchors.entries()) {
      const [h, s, l, a] = [anchor.hue[scheme], anchor.sat[scheme], anchor.lum[scheme], anchor.alpha?.[scheme] ?? 1];
      if (anchorIndex !== 0) {
        const lastAnchor = anchors[anchorIndex - 1],
          steps = anchor.index - lastAnchor.index,
          lastHue = lastAnchor.hue[scheme],
          lastSat = lastAnchor.sat[scheme],
          lastLum = lastAnchor.lum[scheme],
          stepHue = (lastHue - h) / steps,
          stepSat = (lastSat - s) / steps,
          stepLum = (lastLum - l) / steps;
        for (let step = lastAnchor.index + 1; step < anchor.index; step++) {
          const str = anchor.index - step;
          add(h + stepHue * str, s + stepSat * str, l + stepLum * str);
        }
      }
      if (add(h, s, l, a), anchorIndex === numAnchors - 1 && palette.length < paletteSize) for (let step = anchor.index + 1; step < paletteSize; step++) add(h, s, l);
    }
    const background = palette[0],
      foreground = palette[palette.length - 1],
      transparentValues = [background, foreground].map(color => {
        const [h, s, l] = parseToHsla(color);
        return [hsla(h, s, l, 0), hsla(h, s, l, 0.2), hsla(h, s, l, 0.4), hsla(h, s, l, 0.6), hsla(h, s, l, 0.8)];
      }),
      reverseForeground = [...transparentValues[1]].reverse();
    return palette = [...transparentValues[0], ...palette, ...reverseForeground], palette;
  };
function getThemeSuitePalettes(palette) {
  return {
    light: generateColorPalette({
      palette,
      scheme: "light"
    }),
    dark: generateColorPalette({
      palette,
      scheme: "dark"
    })
  };
}
export { PALETTE_BACKGROUND_OFFSET, getThemeSuitePalettes };
//# sourceMappingURL=getThemeSuitePalettes.mjs.map
