import { addChildren, applyMask, createStrengthenMask, createTheme, createWeakenMask, skipMask } from "@tamagui/create-theme";
import { colorTokens, darkColors, lightColors } from "./tokens.mjs";
const lightTransparent = "rgba(255,255,255,0)",
  darkTransparent = "rgba(10,10,10,0)",
  palettes = {
    dark: [darkTransparent, "#050505", "#151515", "#191919", "#232323", "#282828", "#323232", "#424242", "#494949", "#545454", "#626262", "#a5a5a5", "#fff", lightTransparent],
    light: [lightTransparent, "#fff", "#f9f9f9", "hsl(0, 0%, 97.3%)", "hsl(0, 0%, 95.1%)", "hsl(0, 0%, 94.0%)", "hsl(0, 0%, 92.0%)", "hsl(0, 0%, 89.5%)", "hsl(0, 0%, 81.0%)", "hsl(0, 0%, 56.1%)", "hsl(0, 0%, 50.3%)", "hsl(0, 0%, 42.5%)", "hsl(0, 0%, 9.0%)", darkTransparent]
  },
  templateColors = {
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
  templateShadows = {
    shadowColor: 1,
    shadowColorHover: 1,
    shadowColorPress: 2,
    shadowColorFocus: 2
  },
  toSkip = {
    ...templateShadows
  },
  override = Object.fromEntries(Object.entries(toSkip).map(([k]) => [k, 0])),
  overrideShadows = Object.fromEntries(Object.entries(templateShadows).map(([k]) => [k, 0])),
  overrideWithColors = {
    ...override,
    color: 0,
    colorHover: 0,
    colorFocus: 0,
    colorPress: 0
  },
  template = {
    ...templateColors,
    ...toSkip,
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
    borderColor: 4,
    borderColorHover: 5,
    borderColorPress: 3,
    borderColorFocus: 4,
    placeholderColor: -4
  },
  lightShadowColor = "rgba(0,0,0,0.02)",
  lightShadowColorStrong = "rgba(0,0,0,0.066)",
  darkShadowColor = "rgba(0,0,0,0.2)",
  darkShadowColorStrong = "rgba(0,0,0,0.3)",
  lightShadows = {
    shadowColor: lightShadowColorStrong,
    shadowColorHover: lightShadowColorStrong,
    shadowColorPress: lightShadowColor,
    shadowColorFocus: lightShadowColor
  },
  darkShadows = {
    shadowColor: darkShadowColorStrong,
    shadowColorHover: darkShadowColorStrong,
    shadowColorPress: darkShadowColor,
    shadowColorFocus: darkShadowColor
  },
  lightTemplate = {
    ...template,
    background: 2,
    backgroundHover: 3,
    backgroundPress: 4,
    // our light color palette is... a bit unique
    borderColor: 6,
    borderColorHover: 7,
    borderColorFocus: 5,
    borderColorPress: 6,
    ...lightShadows
  },
  darkTemplate = {
    ...template,
    ...darkShadows
  },
  light = createTheme(palettes.light, lightTemplate),
  dark = createTheme(palettes.dark, darkTemplate),
  baseThemes = {
    light,
    dark
  },
  masks = {
    skip: skipMask,
    weaker: createWeakenMask(),
    stronger: createStrengthenMask()
  },
  maskOptions = {
    override,
    skip: toSkip,
    // avoids the transparent ends
    max: palettes.light.length - 2,
    min: 1
  },
  transparent = (hsl, opacity = 0) => hsl.replace("%)", `%, ${opacity})`).replace("hsl(", "hsla("),
  [lightColorThemes, darkColorThemes] = [colorTokens.light, colorTokens.dark].map((colorSet, i) => {
    const isLight = i === 0,
      theme = baseThemes[isLight ? "light" : "dark"];
    return Object.fromEntries(Object.keys(colorSet).map(color => {
      const colorPalette = Object.values(colorSet[color]),
        [head, tail] = [colorPalette.slice(0, 6), colorPalette.slice(colorPalette.length - 5)],
        palette = [transparent(colorPalette[0]), ...head, ...tail, theme.color, transparent(colorPalette[colorPalette.length - 1])],
        colorTheme = createTheme(palette, isLight ? {
          ...lightTemplate,
          // light color themes are a bit less sensitive
          borderColor: 4,
          borderColorHover: 5,
          borderColorFocus: 4,
          borderColorPress: 4
        } : darkTemplate);
      return [color, colorTheme];
    }));
  }),
  allThemes = addChildren(baseThemes, (name, theme) => {
    const isLight = name === "light",
      inverseTheme = baseThemes[isLight ? "dark" : "light"],
      colorThemes = isLight ? lightColorThemes : darkColorThemes,
      inverseColorThemes = isLight ? darkColorThemes : lightColorThemes,
      allColorThemes = addChildren(colorThemes, (colorName, colorTheme) => {
        const inverse = inverseColorThemes[colorName];
        return {
          ...getAltThemes({
            theme: colorTheme,
            inverse,
            isLight
          }),
          ...getComponentThemes(colorTheme, inverse, isLight)
        };
      });
    return {
      ...{
        ...getAltThemes({
          theme,
          inverse: inverseTheme,
          isLight
        }),
        ...getComponentThemes(theme, inverseTheme, isLight)
      },
      ...allColorThemes
    };
  });
function getAltThemes({
  theme,
  inverse,
  isLight,
  activeTheme
}) {
  const maskOptionsAlt = {
      ...maskOptions,
      override: overrideShadows
    },
    alt1 = applyMask(theme, masks.weaker, maskOptionsAlt),
    alt2 = applyMask(alt1, masks.weaker, maskOptionsAlt),
    active = activeTheme ?? (process.env.ACTIVE_THEME_INVERSE ? inverse : applyMask(theme, masks.weaker, {
      ...maskOptions,
      strength: 3,
      skip: {
        ...maskOptions.skip,
        color: 1
      }
    }));
  return addChildren({
    alt1,
    alt2,
    active
  }, (_, subTheme) => getComponentThemes(subTheme, subTheme === inverse ? theme : inverse, isLight));
}
function getComponentThemes(theme, inverse, isLight) {
  const componentMaskOptions = {
      ...maskOptions,
      override: overrideWithColors,
      skip: {
        ...maskOptions.skip,
        // skip colors too just for component sub themes
        ...templateColors
      }
    },
    weaker1 = applyMask(theme, masks.weaker, componentMaskOptions),
    base = applyMask(weaker1, masks.stronger, componentMaskOptions),
    weaker2 = applyMask(weaker1, masks.weaker, componentMaskOptions),
    stronger1 = applyMask(theme, masks.stronger, componentMaskOptions),
    inverse1 = applyMask(inverse, masks.weaker, componentMaskOptions),
    inverse2 = applyMask(inverse1, masks.weaker, componentMaskOptions),
    strongerBorderLighterBackground = isLight ? {
      ...stronger1,
      borderColor: weaker1.borderColor,
      borderColorHover: weaker1.borderColorHover,
      borderColorPress: weaker1.borderColorPress,
      borderColorFocus: weaker1.borderColorFocus
    } : {
      ...applyMask(theme, masks.skip, componentMaskOptions),
      borderColor: weaker1.borderColor,
      borderColorHover: weaker1.borderColorHover,
      borderColorPress: weaker1.borderColorPress,
      borderColorFocus: weaker1.borderColorFocus
    },
    overlayTheme = {
      background: isLight ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.9)"
    },
    weaker2WithoutBorder = {
      ...weaker2,
      borderColor: "transparent",
      borderColorHover: "transparent"
    };
  return {
    ListItem: isLight ? stronger1 : base,
    Card: weaker1,
    Button: weaker2WithoutBorder,
    Checkbox: weaker2,
    DrawerFrame: weaker1,
    SliderTrack: stronger1,
    SliderTrackActive: weaker2,
    SliderThumb: inverse1,
    Progress: weaker1,
    ProgressIndicator: inverse,
    Switch: weaker2,
    SwitchThumb: inverse2,
    TooltipArrow: weaker1,
    TooltipContent: weaker2,
    Input: strongerBorderLighterBackground,
    TextArea: strongerBorderLighterBackground,
    Tooltip: inverse1,
    // make overlays always dark
    SheetOverlay: overlayTheme,
    DialogOverlay: overlayTheme,
    ModalOverlay: overlayTheme
  };
}
const themes = {
  ...allThemes,
  // bring back the full type, the rest use a subset to avoid clogging up ts,
  // tamagui will be smart and use the top level themes as the type for useTheme() etc
  light: createTheme(palettes.light, lightTemplate, {
    nonInheritedValues: lightColors
  }),
  dark: createTheme(palettes.dark, darkTemplate, {
    nonInheritedValues: darkColors
  })
};
export { themes };
//# sourceMappingURL=themes-old.mjs.map
