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
var templates_exports = {};
__export(templates_exports, {
  maskOptions: () => maskOptions,
  templates: () => templates
});
module.exports = __toCommonJS(templates_exports);
var import_palettes = require("./palettes.cjs");
const templateColorsSpecific = {
    color1: 1,
    color2: 2,
    color3: 3,
    color4: 4,
    color5: 5,
    color6: 6,
    color7: 7,
    color8: 8,
    color9: 9,
    color10: 10,
    color11: 11,
    color12: 12
  },
  template = {
    ...templateColorsSpecific,
    // the background, color, etc keys here work like generics - they make it so you
    // can publish components for others to use without mandating a specific color scale
    // the @tamagui/button Button component looks for `$background`, so you set the
    // dark_red_Button theme to have a stronger background than the dark_red theme.
    background: 2,
    backgroundHover: 3,
    backgroundPress: 4,
    backgroundFocus: 5,
    backgroundStrong: 1,
    backgroundTransparent: 0,
    color: -1,
    colorHover: -2,
    colorPress: -1,
    colorFocus: -2,
    colorTransparent: -0,
    borderColor: 5,
    borderColorHover: 6,
    borderColorFocus: 4,
    borderColorPress: 5,
    placeholderColor: -4
  },
  templates = {
    base: template,
    colorLight: {
      ...template,
      // light color themes are a bit less sensitive
      borderColor: 4,
      borderColorHover: 5,
      borderColorFocus: 4,
      borderColorPress: 4
    }
  },
  shadows = {
    shadowColor: 0,
    shadowColorHover: 0,
    shadowColorPress: 0,
    shadowColorFocus: 0
  },
  colors = {
    ...shadows,
    color: 0,
    colorHover: 0,
    colorFocus: 0,
    colorPress: 0
  },
  baseMaskOptions = {
    override: shadows,
    skip: shadows,
    // avoids the transparent ends
    max: import_palettes.palettes.light.length - 2,
    min: 1
  },
  skipShadowsAndSpecificColors = {
    ...shadows,
    ...templateColorsSpecific
  },
  maskOptions = {
    component: {
      ...baseMaskOptions,
      override: colors,
      skip: skipShadowsAndSpecificColors
    },
    alt: {
      ...baseMaskOptions
    },
    button: {
      ...baseMaskOptions,
      override: {
        ...colors,
        borderColor: "transparent",
        borderColorHover: "transparent"
      },
      skip: skipShadowsAndSpecificColors
    }
  };