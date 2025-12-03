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
var v3_themes_exports = {};
__export(v3_themes_exports, {
  defaultComponentThemes: () => defaultComponentThemes,
  defaultPalettes: () => defaultPalettes,
  defaultSubThemes: () => defaultSubThemes,
  defaultTemplates: () => defaultTemplates,
  themes: () => themes,
  tokens: () => tokens
});
module.exports = __toCommonJS(v3_themes_exports);
var import_colors = require("@tamagui/colors"),
  import_theme_builder = require("@tamagui/theme-builder"),
  import_web = require("@tamagui/web"),
  import_utils = require("./utils.native.js"),
  import_v3_tokens = require("./v3-tokens.native.js"),
  colorTokens = {
    light: {
      blue: import_colors.blue,
      gray: import_colors.gray,
      green: import_colors.green,
      orange: import_colors.orange,
      pink: import_colors.pink,
      purple: import_colors.purple,
      red: import_colors.red,
      yellow: import_colors.yellow
    },
    dark: {
      blue: import_colors.blueDark,
      gray: import_colors.grayDark,
      green: import_colors.greenDark,
      orange: import_colors.orangeDark,
      pink: import_colors.pinkDark,
      purple: import_colors.purpleDark,
      red: import_colors.redDark,
      yellow: import_colors.yellowDark
    }
  },
  lightShadowColor = "rgba(0,0,0,0.04)",
  lightShadowColorStrong = "rgba(0,0,0,0.085)",
  darkShadowColor = "rgba(0,0,0,0.2)",
  darkShadowColorStrong = "rgba(0,0,0,0.3)",
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
    white0: "rgba(255,255,255,0)",
    white075: "rgba(255,255,255,0.75)",
    white05: "rgba(255,255,255,0.5)",
    white025: "rgba(255,255,255,0.25)",
    black0: "rgba(10,10,10,0)",
    black075: "rgba(10,10,10,0.75)",
    black05: "rgba(10,10,10,0.5)",
    black025: "rgba(10,10,10,0.25)",
    white1: "#fff",
    white2: "#f8f8f8",
    white3: "hsl(0, 0%, 96.3%)",
    white4: "hsl(0, 0%, 94.1%)",
    white5: "hsl(0, 0%, 92.0%)",
    white6: "hsl(0, 0%, 90.0%)",
    white7: "hsl(0, 0%, 88.5%)",
    white8: "hsl(0, 0%, 81.0%)",
    white9: "hsl(0, 0%, 56.1%)",
    white10: "hsl(0, 0%, 50.3%)",
    white11: "hsl(0, 0%, 42.5%)",
    white12: "hsl(0, 0%, 9.0%)",
    black1: "#050505",
    black2: "#151515",
    black3: "#191919",
    black4: "#232323",
    black5: "#282828",
    black6: "#323232",
    black7: "#424242",
    black8: "#494949",
    black9: "#545454",
    black10: "#626262",
    black11: "#a5a5a5",
    black12: "#fff",
    ...(0, import_utils.postfixObjKeys)(lightColors, "Light"),
    ...(0, import_utils.postfixObjKeys)(darkColors, "Dark")
  },
  defaultPalettes = function () {
    var transparent = function (hsl) {
        var opacity = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        return hsl.replace("%)", `%, ${opacity})`).replace("hsl(", "hsla(");
      },
      getColorPalette = function (colors, accentColors) {
        var colorPalette = Object.values(colors),
          colorI = colorPalette.length - 4,
          accentPalette = Object.values(accentColors),
          accentBackground = accentPalette[0],
          accentColor = accentPalette[accentPalette.length - 1];
        return [accentBackground, transparent(colorPalette[0], 0), transparent(colorPalette[0], 0.25), transparent(colorPalette[0], 0.5), transparent(colorPalette[0], 0.75), ...colorPalette, transparent(colorPalette[colorI], 0.75), transparent(colorPalette[colorI], 0.5), transparent(colorPalette[colorI], 0.25), transparent(colorPalette[colorI], 0), accentColor];
      },
      brandColor = {
        light: color.blue4Light,
        dark: color.blue4Dark
      },
      lightPalette = [brandColor.light, color.white0, color.white025, color.white05, color.white075, color.white1, color.white2, color.white3, color.white4, color.white5, color.white6, color.white7, color.white8, color.white9, color.white10, color.white11, color.white12, color.black075, color.black05, color.black025, color.black0, brandColor.dark],
      darkPalette = [brandColor.dark, color.black0, color.black025, color.black05, color.black075, color.black1, color.black2, color.black3, color.black4, color.black5, color.black6, color.black7, color.black8, color.black9, color.black10, color.black11, color.black12, color.white075, color.white05, color.white025, color.white0, brandColor.light],
      lightColorNames = (0, import_utils.objectKeys)(colorTokens.light),
      lightPalettes = (0, import_theme_builder.objectFromEntries)(lightColorNames.map(function (key, index) {
        return [`light_${key}`, getColorPalette(colorTokens.light[key], colorTokens.light[lightColorNames[(index + 1) % lightColorNames.length]])];
      })),
      darkColorNames = (0, import_utils.objectKeys)(colorTokens.dark),
      darkPalettes = (0, import_theme_builder.objectFromEntries)(darkColorNames.map(function (key, index) {
        return [`dark_${key}`, getColorPalette(colorTokens.dark[key], colorTokens.dark[darkColorNames[(index + 1) % darkColorNames.length]])];
      })),
      colorPalettes = {
        ...lightPalettes,
        ...darkPalettes
      };
    return {
      light: lightPalette,
      dark: darkPalette,
      ...colorPalettes
    };
  }(),
  getTemplates = function () {
    var getBaseTemplates = function (scheme) {
        var isLight = scheme === "light",
          bgIndex = 5,
          lighten = isLight ? -1 : 1,
          darken = -lighten,
          borderColor = bgIndex + 3,
          base = {
            accentBackground: 0,
            accentColor: -0,
            background0: 1,
            background025: 2,
            background05: 3,
            background075: 4,
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
            color025: -2,
            color05: -3,
            color075: -4,
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
            color: -bgIndex,
            colorHover: -bgIndex - 1,
            colorPress: -bgIndex,
            colorFocus: -bgIndex - 1,
            colorTransparent: -1,
            placeholderColor: -bgIndex - 3,
            outlineColor: -2
          },
          surface12 = {
            background: base.background + 1,
            backgroundHover: base.backgroundHover + 1,
            backgroundPress: base.backgroundPress + 1,
            backgroundFocus: base.backgroundFocus + 1,
            borderColor: base.borderColor + 1,
            borderColorHover: base.borderColorHover + 1,
            borderColorFocus: base.borderColorFocus + 1,
            borderColorPress: base.borderColorPress + 1
          },
          surface22 = {
            background: base.background + 2,
            backgroundHover: base.backgroundHover + 2,
            backgroundPress: base.backgroundPress + 2,
            backgroundFocus: base.backgroundFocus + 2,
            borderColor: base.borderColor + 2,
            borderColorHover: base.borderColorHover + 2,
            borderColorFocus: base.borderColorFocus + 2,
            borderColorPress: base.borderColorPress + 2
          },
          surface32 = {
            background: base.background + 3,
            backgroundHover: base.backgroundHover + 3,
            backgroundPress: base.backgroundPress + 3,
            backgroundFocus: base.backgroundFocus + 3,
            borderColor: base.borderColor + 3,
            borderColorHover: base.borderColorHover + 3,
            borderColorFocus: base.borderColorFocus + 3,
            borderColorPress: base.borderColorPress + 3
          },
          surfaceActiveBg = {
            background: base.background + 5,
            backgroundHover: base.background + 5,
            backgroundPress: base.backgroundPress + 5,
            backgroundFocus: base.backgroundFocus + 5
          },
          surfaceActive = {
            ...surfaceActiveBg,
            // match border to background when active
            borderColor: surfaceActiveBg.background,
            borderColorHover: surfaceActiveBg.backgroundHover,
            borderColorFocus: surfaceActiveBg.backgroundFocus,
            borderColorPress: surfaceActiveBg.backgroundPress
          },
          inverseSurface12 = {
            color: surface12.background,
            colorHover: surface12.backgroundHover,
            colorPress: surface12.backgroundPress,
            colorFocus: surface12.backgroundFocus,
            background: base.color,
            backgroundHover: base.colorHover,
            backgroundPress: base.colorPress,
            backgroundFocus: base.colorFocus,
            borderColor: base.color - 2,
            borderColorHover: base.color - 3,
            borderColorFocus: base.color - 4,
            borderColorPress: base.color - 5
          },
          inverseActive = {
            ...inverseSurface12,
            background: base.color - 2,
            backgroundHover: base.colorHover - 2,
            backgroundPress: base.colorPress - 2,
            backgroundFocus: base.colorFocus - 2,
            borderColor: base.color - 2 - 2,
            borderColorHover: base.color - 3 - 2,
            borderColorFocus: base.color - 4 - 2,
            borderColorPress: base.color - 5 - 2
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
          };
        return {
          base,
          alt1,
          alt2,
          surface1: surface12,
          surface2: surface22,
          surface3: surface32,
          inverseSurface1: inverseSurface12,
          inverseActive,
          surfaceActive
        };
      },
      lightTemplates = getBaseTemplates("light"),
      darkTemplates = getBaseTemplates("dark"),
      templates = {
        ...(0, import_theme_builder.objectFromEntries)((0, import_utils.objectKeys)(lightTemplates).map(function (name) {
          return [`light_${name}`, lightTemplates[name]];
        })),
        ...(0, import_theme_builder.objectFromEntries)((0, import_utils.objectKeys)(darkTemplates).map(function (name) {
          return [`dark_${name}`, darkTemplates[name]];
        }))
      };
    return templates;
  },
  defaultTemplates = getTemplates(),
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
      background: "rgba(0,0,0,0.8)"
    }
  }],
  inverseSurface1 = [{
    parent: "active",
    template: "inverseActive"
  }, {
    parent: "",
    template: "inverseSurface1"
  }],
  surface1 = [{
    parent: "active",
    template: "surfaceActive"
  }, {
    parent: "",
    template: "surface1"
  }],
  surface2 = [{
    parent: "active",
    template: "surfaceActive"
  }, {
    parent: "",
    template: "surface2"
  }],
  surface3 = [{
    parent: "active",
    template: "surfaceActive"
  }, {
    parent: "",
    template: "surface3"
  }],
  defaultComponentThemes = {
    ListItem: {
      template: "surface1"
    },
    SelectTrigger: surface1,
    Card: surface1,
    Button: surface3,
    Checkbox: surface2,
    Switch: surface2,
    SwitchThumb: inverseSurface1,
    TooltipContent: surface2,
    Progress: {
      template: "surface1"
    },
    RadioGroupItem: surface2,
    TooltipArrow: {
      template: "surface1"
    },
    SliderTrackActive: {
      template: "surface3"
    },
    SliderTrack: {
      template: "surface1"
    },
    SliderThumb: inverseSurface1,
    Tooltip: inverseSurface1,
    ProgressIndicator: inverseSurface1,
    SheetOverlay: overlayThemeDefinitions,
    DialogOverlay: overlayThemeDefinitions,
    ModalOverlay: overlayThemeDefinitions,
    Input: surface1,
    TextArea: surface1
  },
  defaultSubThemes = {
    alt1: {
      template: "alt1"
    },
    alt2: {
      template: "alt2"
    },
    active: {
      template: "surface3"
    },
    surface1: {
      template: "surface1"
    },
    surface2: {
      template: "surface2"
    },
    surface3: {
      template: "surface3"
    },
    surface4: {
      template: "surfaceActive"
    }
  },
  themeBuilder = (0, import_theme_builder.createThemeBuilder)().addPalettes(defaultPalettes).addTemplates(defaultTemplates).addThemes({
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
    orange: {
      palette: "orange",
      template: "base"
    },
    yellow: {
      palette: "yellow",
      template: "base"
    },
    green: {
      palette: "green",
      template: "base"
    },
    blue: {
      palette: "blue",
      template: "base"
    },
    purple: {
      palette: "purple",
      template: "base"
    },
    pink: {
      palette: "pink",
      template: "base"
    },
    red: {
      palette: "red",
      template: "base"
    },
    gray: {
      palette: "gray",
      template: "base"
    }
  }).addChildThemes(defaultSubThemes).addComponentThemes(defaultComponentThemes, {
    avoidNestingWithin: ["alt1", "alt2", "surface1", "surface2", "surface3", "surface4"]
  }),
  themesIn = themeBuilder.build(),
  themes = themesIn,
  tokens = (0, import_web.createTokens)({
    color,
    ...import_v3_tokens.tokens
  });
//# sourceMappingURL=v3-themes.native.js.map
