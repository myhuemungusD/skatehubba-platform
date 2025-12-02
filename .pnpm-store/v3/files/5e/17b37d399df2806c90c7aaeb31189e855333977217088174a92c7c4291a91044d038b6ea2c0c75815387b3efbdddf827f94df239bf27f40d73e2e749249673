import { createThemeBuilder, masks } from "@tamagui/theme-builder";
import { blue, blueDark, gray, grayDark, green, greenDark, orange, orangeDark, pink, pinkDark, purple, purpleDark, red, redDark, yellow, yellowDark } from "@tamagui/colors";
import { createTokens } from "@tamagui/web";
import { masks as masks2 } from "@tamagui/theme-builder";
const colorTokens = {
    light: {
      blue,
      gray,
      green,
      orange,
      pink,
      purple,
      red,
      yellow
    },
    dark: {
      blue: blueDark,
      gray: grayDark,
      green: greenDark,
      orange: orangeDark,
      pink: pinkDark,
      purple: purpleDark,
      red: redDark,
      yellow: yellowDark
    }
  },
  palettes = (() => {
    const lightTransparent = "rgba(255,255,255,0)",
      darkTransparent = "rgba(10,10,10,0)",
      transparent = (hsl, opacity = 0) => hsl.replace("%)", `%, ${opacity})`).replace("hsl(", "hsla("),
      getColorPalette = (colors, color2 = colors[0]) => {
        const colorPalette = Object.values(colors),
          [head, tail] = [colorPalette.slice(0, 6), colorPalette.slice(colorPalette.length - 5)];
        return [transparent(colorPalette[0]), ...head, ...tail, color2, transparent(colorPalette[colorPalette.length - 1])];
      },
      lightColor = "hsl(0, 0%, 9.0%)",
      lightPalette = [lightTransparent, "#fff", "#f8f8f8", "hsl(0, 0%, 96.3%)", "hsl(0, 0%, 94.1%)", "hsl(0, 0%, 92.0%)", "hsl(0, 0%, 90.0%)", "hsl(0, 0%, 88.5%)", "hsl(0, 0%, 81.0%)", "hsl(0, 0%, 56.1%)", "hsl(0, 0%, 50.3%)", "hsl(0, 0%, 42.5%)", lightColor, darkTransparent],
      darkColor = "#fff",
      darkPalette = [darkTransparent, "#050505", "#151515", "#191919", "#232323", "#282828", "#323232", "#424242", "#494949", "#545454", "#626262", "#a5a5a5", darkColor, lightTransparent],
      lightPalettes = objectFromEntries(objectKeys(colorTokens.light).map(key => [`light_${key}`, getColorPalette(colorTokens.light[key], lightColor)])),
      darkPalettes = objectFromEntries(objectKeys(colorTokens.dark).map(key => [`dark_${key}`, getColorPalette(colorTokens.dark[key], darkColor)])),
      colorPalettes = {
        ...lightPalettes,
        ...darkPalettes
      };
    return {
      light: lightPalette,
      dark: darkPalette,
      ...colorPalettes
    };
  })(),
  templateColorsSpecific = {
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
  templates = (() => {
    const template = {
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
      placeholderColor: -4,
      // in the future this should be partially transparent
      outlineColor: 5
    };
    return {
      base: template,
      colorLight: {
        ...template,
        // light color themes are a bit less sensitive
        borderColor: 4,
        borderColorHover: 5,
        borderColorFocus: 4,
        borderColorPress: 4
      }
    };
  })(),
  maskOptions = (() => {
    const shadows2 = {
        shadowColor: 0,
        shadowColorHover: 0,
        shadowColorPress: 0,
        shadowColorFocus: 0
      },
      colors = {
        ...shadows2,
        color: 0,
        colorHover: 0,
        colorFocus: 0,
        colorPress: 0
      },
      baseMaskOptions = {
        override: shadows2,
        skip: shadows2,
        // avoids the transparent ends
        max: palettes.light.length - 2,
        min: 1
      },
      skipShadowsAndSpecificColors = {
        ...shadows2,
        ...templateColorsSpecific
      };
    return {
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
  })(),
  lightShadowColor = "rgba(0,0,0,0.04)",
  lightShadowColorStrong = "rgba(0,0,0,0.085)",
  darkShadowColor = "rgba(0,0,0,0.2)",
  darkShadowColorStrong = "rgba(0,0,0,0.3)",
  size = {
    $0: 0,
    "$0.25": 2,
    "$0.5": 4,
    "$0.75": 8,
    $1: 20,
    "$1.5": 24,
    $2: 28,
    "$2.5": 32,
    $3: 36,
    "$3.5": 40,
    $4: 44,
    $true: 44,
    "$4.5": 48,
    $5: 52,
    $6: 64,
    $7: 74,
    $8: 84,
    $9: 94,
    $10: 104,
    $11: 124,
    $12: 144,
    $13: 164,
    $14: 184,
    $15: 204,
    $16: 224,
    $17: 224,
    $18: 244,
    $19: 264,
    $20: 284
  },
  spaces = Object.entries(size).map(([k, v]) => [k, sizeToSpace(v)]),
  spacesNegative = spaces.slice(1).map(([k, v]) => [`-${k.slice(1)}`, -v]),
  space = {
    ...Object.fromEntries(spaces),
    ...Object.fromEntries(spacesNegative)
  },
  zIndex = {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500
  },
  darkColors = {
    ...colorTokens.dark.blue,
    ...colorTokens.dark.gray,
    ...colorTokens.dark.green,
    ...colorTokens.dark.orange,
    ...colorTokens.dark.pink,
    ...colorTokens.dark.purple,
    ...colorTokens.dark.red,
    ...colorTokens.dark.yellow
  },
  lightColors = {
    ...colorTokens.light.blue,
    ...colorTokens.light.gray,
    ...colorTokens.light.green,
    ...colorTokens.light.orange,
    ...colorTokens.light.pink,
    ...colorTokens.light.purple,
    ...colorTokens.light.red,
    ...colorTokens.light.yellow
  },
  color = {
    ...postfixObjKeys(lightColors, "Light"),
    ...postfixObjKeys(darkColors, "Dark")
  },
  radius = {
    0: 0,
    1: 3,
    2: 5,
    3: 7,
    4: 9,
    true: 9,
    5: 10,
    6: 16,
    7: 19,
    8: 22,
    9: 26,
    10: 34,
    11: 42,
    12: 50
  },
  tokens = createTokens({
    color,
    radius,
    zIndex,
    space,
    size
  }),
  shadows = {
    light: {
      shadowColor: lightShadowColorStrong,
      shadowColorHover: lightShadowColorStrong,
      shadowColorPress: lightShadowColor,
      shadowColorFocus: lightShadowColor
    },
    dark: {
      shadowColor: darkShadowColorStrong,
      shadowColorHover: darkShadowColorStrong,
      shadowColorPress: darkShadowColor,
      shadowColorFocus: darkShadowColor
    }
  },
  colorThemeDefinition = colorName => [{
    parent: "light",
    palette: colorName,
    template: "colorLight"
  }, {
    parent: "dark",
    palette: colorName,
    template: "base"
  }],
  nonInherited = {
    light: {
      ...lightColors,
      ...shadows.light
    },
    dark: {
      ...darkColors,
      ...shadows.dark
    }
  },
  overlayThemeDefinitions = [{
    parent: "light",
    theme: {
      background: "rgba(0,0,0,0.5)"
    }
  }, {
    parent: "dark",
    theme: {
      background: "rgba(0,0,0,0.9)"
    }
  }],
  themeBuilder = createThemeBuilder().addPalettes(palettes).addTemplates(templates).addMasks(masks).addThemes({
    light: {
      template: "base",
      palette: "light",
      nonInheritedValues: nonInherited.light
    },
    dark: {
      template: "base",
      palette: "dark",
      nonInheritedValues: nonInherited.dark
    }
  }).addChildThemes({
    orange: colorThemeDefinition("orange"),
    yellow: colorThemeDefinition("yellow"),
    green: colorThemeDefinition("green"),
    blue: colorThemeDefinition("blue"),
    purple: colorThemeDefinition("purple"),
    pink: colorThemeDefinition("pink"),
    red: colorThemeDefinition("red"),
    gray: colorThemeDefinition("gray")
  }).addChildThemes({
    alt1: {
      mask: "soften",
      ...maskOptions.alt
    },
    alt2: {
      mask: "soften2Border1",
      ...maskOptions.alt
    },
    active: {
      mask: "soften3FlatBorder",
      skip: {
        color: 1
      }
    }
  }).addComponentThemes({
    ListItem: [{
      parent: "light",
      avoidNestingWithin: ["active"],
      mask: "identity",
      ...maskOptions.component
    }, {
      parent: "dark",
      avoidNestingWithin: ["active"],
      mask: "identity",
      ...maskOptions.component
    }],
    Card: {
      mask: "soften",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    Button: {
      mask: "soften2Border1",
      ...maskOptions.component
    },
    Checkbox: {
      mask: "softenBorder2",
      ...maskOptions.component
    },
    Switch: {
      mask: "soften2Border1",
      ...maskOptions.component
    },
    SwitchThumb: {
      mask: "inverseStrengthen2",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    TooltipContent: {
      mask: "soften2Border1",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    DrawerFrame: {
      mask: "soften",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    Progress: {
      mask: "soften",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    RadioGroupItem: {
      mask: "softenBorder2",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    TooltipArrow: {
      mask: "soften",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    SliderTrackActive: {
      mask: "inverseSoften",
      ...maskOptions.component
    },
    SliderTrack: {
      mask: "soften2Border1",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    SliderThumb: {
      mask: "inverse",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    Tooltip: {
      mask: "inverse",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    ProgressIndicator: {
      mask: "inverse",
      avoidNestingWithin: ["active"],
      ...maskOptions.component
    },
    SheetOverlay: overlayThemeDefinitions,
    DialogOverlay: overlayThemeDefinitions,
    ModalOverlay: overlayThemeDefinitions,
    Input: {
      mask: "softenBorder2",
      ...maskOptions.component
    },
    TextArea: {
      mask: "softenBorder2",
      ...maskOptions.component
    }
  }, {
    // to save bundle size but make alt themes not work on components
    // avoidNestingWithin: ['alt1', 'alt2'],
  }),
  themesIn = themeBuilder.build(),
  themes = themesIn;
function postfixObjKeys(obj, postfix) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [`${k}${postfix}`, v]));
}
function sizeToSpace(v) {
  return v === 0 ? 0 : v === 2 ? 0.5 : v === 4 ? 1 : v === 8 ? 1.5 : v <= 16 ? Math.round(v * 0.333) : Math.floor(v * 0.7 - 12);
}
function objectFromEntries(arr) {
  return Object.fromEntries(arr);
}
function objectKeys(obj) {
  return Object.keys(obj);
}
export { maskOptions, masks2 as masks, palettes, templates, themes, tokens };
//# sourceMappingURL=v2-themes.mjs.map
