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
var themes_new_exports = {};
__export(themes_new_exports, {
  themes: () => themes
});
module.exports = __toCommonJS(themes_new_exports);
var import_theme_builder = require("@tamagui/theme-builder"),
  import_componentThemeDefinitions = require("./componentThemeDefinitions.native.js"),
  import_theme_builder2 = require("@tamagui/theme-builder"),
  import_palettes = require("./palettes.native.js"),
  import_shadows = require("./shadows.native.js"),
  import_templates = require("./templates.native.js"),
  import_tokens = require("./tokens.native.js"),
  colorThemeDefinition = function (colorName) {
    return [{
      parent: "light",
      palette: colorName,
      template: "colorLight"
    }, {
      parent: "dark",
      palette: colorName,
      template: "base"
    }];
  },
  themesBuilder = (0, import_theme_builder.createThemeBuilder)().addPalettes(import_palettes.palettes).addTemplates(import_templates.templates).addMasks(import_theme_builder2.masks).addThemes({
    light: {
      template: "base",
      palette: "light",
      nonInheritedValues: {
        ...import_tokens.lightColors,
        ...import_shadows.shadows.light
      }
    },
    dark: {
      template: "base",
      palette: "dark",
      nonInheritedValues: {
        ...import_tokens.darkColors,
        ...import_shadows.shadows.dark
      }
    }
  }).addChildThemes({
    orange: colorThemeDefinition("orange"),
    yellow: colorThemeDefinition("yellow"),
    green: colorThemeDefinition("green"),
    blue: colorThemeDefinition("blue"),
    purple: colorThemeDefinition("purple"),
    pink: colorThemeDefinition("pink"),
    red: colorThemeDefinition("red")
  }).addChildThemes({
    alt1: {
      mask: "soften",
      ...import_templates.maskOptions.alt
    },
    alt2: {
      mask: "soften2",
      ...import_templates.maskOptions.alt
    },
    active: {
      mask: "soften3",
      skip: {
        color: 1
      }
    }
  }).addChildThemes(import_componentThemeDefinitions.componentThemeDefinitions, {}),
  themes = themesBuilder.build();
//# sourceMappingURL=themes-new.native.js.map
