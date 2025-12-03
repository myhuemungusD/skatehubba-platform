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
var getThemeSuitePalettes_exports = {};
__export(getThemeSuitePalettes_exports, {
  PALETTE_BACKGROUND_OFFSET: () => PALETTE_BACKGROUND_OFFSET,
  getThemeSuitePalettes: () => getThemeSuitePalettes
});
module.exports = __toCommonJS(getThemeSuitePalettes_exports);
var import_color2k = require("color2k"),
  paletteSize = 12,
  PALETTE_BACKGROUND_OFFSET = 6,
  generateColorPalette = function (param) {
    var {
      palette: buildPalette,
      scheme
    } = param;
    if (!buildPalette) return [];
    var {
        anchors
      } = buildPalette,
      palette = [],
      add = function (h2, s2, l2, a2) {
        palette.push((0, import_color2k.hsla)(h2, s2, l2, a2 ?? 1));
      },
      numAnchors = Object.keys(anchors).length,
      _iteratorNormalCompletion = !0,
      _didIteratorError = !1,
      _iteratorError = void 0;
    try {
      for (var _iterator = anchors.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var [anchorIndex, anchor] = _step.value,
          _anchor_alpha,
          _anchor_alpha_scheme,
          [h, s, l, a] = [anchor.hue[scheme], anchor.sat[scheme], anchor.lum[scheme], (_anchor_alpha_scheme = (_anchor_alpha = anchor.alpha) === null || _anchor_alpha === void 0 ? void 0 : _anchor_alpha[scheme]) !== null && _anchor_alpha_scheme !== void 0 ? _anchor_alpha_scheme : 1];
        if (anchorIndex !== 0) for (var lastAnchor = anchors[anchorIndex - 1], steps = anchor.index - lastAnchor.index, lastHue = lastAnchor.hue[scheme], lastSat = lastAnchor.sat[scheme], lastLum = lastAnchor.lum[scheme], stepHue = (lastHue - h) / steps, stepSat = (lastSat - s) / steps, stepLum = (lastLum - l) / steps, step = lastAnchor.index + 1; step < anchor.index; step++) {
          var str = anchor.index - step;
          add(h + stepHue * str, s + stepSat * str, l + stepLum * str);
        }
        add(h, s, l, a);
        var isLastAnchor = anchorIndex === numAnchors - 1;
        if (isLastAnchor && palette.length < paletteSize) for (var step1 = anchor.index + 1; step1 < paletteSize; step1++) add(h, s, l);
      }
    } catch (err) {
      _didIteratorError = !0, _iteratorError = err;
    } finally {
      try {
        !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
      } finally {
        if (_didIteratorError) throw _iteratorError;
      }
    }
    var background = palette[0],
      foreground = palette[palette.length - 1],
      transparentValues = [background, foreground].map(function (color) {
        var [h2, s2, l2] = (0, import_color2k.parseToHsla)(color);
        return [(0, import_color2k.hsla)(h2, s2, l2, 0), (0, import_color2k.hsla)(h2, s2, l2, 0.2), (0, import_color2k.hsla)(h2, s2, l2, 0.4), (0, import_color2k.hsla)(h2, s2, l2, 0.6), (0, import_color2k.hsla)(h2, s2, l2, 0.8)];
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
//# sourceMappingURL=getThemeSuitePalettes.native.js.map
