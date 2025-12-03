import { createThemeBuilder } from "@tamagui/theme-builder";
import { componentThemeDefinitions } from "./componentThemeDefinitions.native.js";
import { masks } from "@tamagui/theme-builder";
import { palettes } from "./palettes.native.js";
import { shadows } from "./shadows.native.js";
import { maskOptions, templates } from "./templates.native.js";
import { darkColors, lightColors } from "./tokens.native.js";
var colorThemeDefinition = function (colorName) {
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
  themesBuilder = createThemeBuilder().addPalettes(palettes).addTemplates(templates).addMasks(masks).addThemes({
    light: {
      template: "base",
      palette: "light",
      nonInheritedValues: {
        ...lightColors,
        ...shadows.light
      }
    },
    dark: {
      template: "base",
      palette: "dark",
      nonInheritedValues: {
        ...darkColors,
        ...shadows.dark
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
      ...maskOptions.alt
    },
    alt2: {
      mask: "soften2",
      ...maskOptions.alt
    },
    active: {
      mask: "soften3",
      skip: {
        color: 1
      }
    }
  }).addChildThemes(componentThemeDefinitions, {}),
  themes = themesBuilder.build();
export { themes };
//# sourceMappingURL=themes-new.native.js.map
