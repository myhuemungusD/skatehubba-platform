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
var defaultTemplatesStrongest_exports = {};
__export(defaultTemplatesStrongest_exports, {
  defaultTemplatesStrongest: () => defaultTemplatesStrongest
});
module.exports = __toCommonJS(defaultTemplatesStrongest_exports);
var import_helpers = require("./helpers.native.js"),
  getTemplates = function () {
    var lightTemplates = getBaseTemplates("light"),
      darkTemplates = getBaseTemplates("dark"),
      templates = {
        ...(0, import_helpers.objectFromEntries)((0, import_helpers.objectKeys)(lightTemplates).map(function (name) {
          return [`light_${name}`, lightTemplates[name]];
        })),
        ...(0, import_helpers.objectFromEntries)((0, import_helpers.objectKeys)(darkTemplates).map(function (name) {
          return [`dark_${name}`, darkTemplates[name]];
        }))
      };
    return templates;
  },
  getBaseTemplates = function (scheme) {
    var isLight = scheme === "light",
      bgIndex = 6,
      lighten = isLight ? -1 : 1,
      darken = -lighten,
      borderColor = bgIndex + 3,
      baseColors = {
        color: -bgIndex,
        colorHover: -bgIndex - 1,
        colorPress: -bgIndex,
        colorFocus: -bgIndex - 1,
        placeholderColor: -bgIndex - 3,
        outlineColor: -2
      },
      base = {
        accentBackground: 0,
        accentColor: -0,
        background0: 1,
        background02: 2,
        background04: 3,
        background06: 4,
        background08: 5,
        color1: bgIndex,
        color2: bgIndex + 1,
        color3: bgIndex + 2,
        color4: bgIndex + 3,
        color5: bgIndex + 4,
        color6: bgIndex + 5,
        color7: bgIndex + 6,
        color8: bgIndex + 7,
        color9: bgIndex + 8,
        color10: bgIndex + 9,
        color11: bgIndex + 10,
        color12: bgIndex + 11,
        color0: -1,
        color02: -2,
        color04: -3,
        color06: -4,
        color08: -5,
        // the background, color, etc keys here work like generics - they make it so you
        // can publish components for others to use without mandating a specific color scale
        // the @tamagui/button Button component looks for `$background`, so you set the
        // dark_red_Button theme to have a stronger background than the dark_red theme.
        background: bgIndex,
        backgroundHover: bgIndex + lighten,
        // always lighten on hover no matter the scheme
        backgroundPress: bgIndex + darken,
        // always darken on press no matter the theme
        backgroundFocus: bgIndex + darken,
        borderColor,
        borderColorHover: borderColor + lighten,
        borderColorPress: borderColor + darken,
        borderColorFocus: borderColor,
        ...baseColors,
        colorTransparent: -1
      },
      surface1 = {
        ...baseColors,
        background: base.background + 3,
        backgroundHover: base.backgroundHover + 3,
        backgroundPress: base.backgroundPress + 3,
        backgroundFocus: base.backgroundFocus + 3,
        borderColor: base.borderColor + 3,
        borderColorHover: base.borderColorHover + 3,
        borderColorFocus: base.borderColorFocus + 3,
        borderColorPress: base.borderColorPress + 3
      },
      surface2 = {
        ...baseColors,
        background: base.background + 4,
        backgroundHover: base.backgroundHover + 4,
        backgroundPress: base.backgroundPress + 4,
        backgroundFocus: base.backgroundFocus + 4,
        borderColor: base.borderColor + 4,
        borderColorHover: base.borderColorHover + 4,
        borderColorFocus: base.borderColorFocus + 4,
        borderColorPress: base.borderColorPress + 4
      },
      surface3 = {
        ...baseColors,
        background: base.background + 5,
        backgroundHover: base.backgroundHover + 5,
        backgroundPress: base.backgroundPress + 5,
        backgroundFocus: base.backgroundFocus + 5,
        borderColor: base.borderColor + 5,
        borderColorHover: base.borderColorHover + 5,
        borderColorFocus: base.borderColorFocus + 5,
        borderColorPress: base.borderColorPress + 5
      },
      alt1 = {
        color: base.color - 1,
        colorHover: base.colorHover - 1,
        colorPress: base.colorPress - 1,
        colorFocus: base.colorFocus - 1
      },
      alt2 = {
        color: base.color - 2,
        colorHover: base.colorHover - 2,
        colorPress: base.colorPress - 2,
        colorFocus: base.colorFocus - 2
      },
      inverse = Object.fromEntries(Object.entries(base).map(function (param) {
        var [key, index] = param;
        return [key, -index];
      }));
    return {
      base,
      surface1,
      surface2,
      surface3,
      alt1,
      alt2,
      inverse
    };
  },
  defaultTemplatesStrongest = getTemplates();
//# sourceMappingURL=defaultTemplatesStrongest.native.js.map
