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
var createThemes_exports = {};
__export(createThemes_exports, {
  createPalettes: () => createPalettes,
  createSimpleThemeBuilder: () => createSimpleThemeBuilder,
  createThemes: () => createThemes,
  getComponentThemes: () => getComponentThemes,
  getLastBuilder: () => getLastBuilder
});
module.exports = __toCommonJS(createThemes_exports);
var import_color2k = require("color2k"),
  import_defaultComponentThemes = require("./defaultComponentThemes.cjs"),
  import_defaultTemplates = require("./defaultTemplates.cjs"),
  import_getThemeSuitePalettes = require("./getThemeSuitePalettes.cjs"),
  import_ThemeBuilder = require("./ThemeBuilder.cjs");
function createThemes(props) {
  const {
      accent,
      childrenThemes,
      grandChildrenThemes,
      templates = import_defaultTemplates.defaultTemplates,
      componentThemes,
      getTheme
    } = props,
    builder = createSimpleThemeBuilder({
      extra: props.base.extra,
      accentExtra: accent?.extra,
      componentThemes,
      palettes: createPalettes(getThemesPalettes(props)),
      templates,
      accentTheme: !!accent,
      childrenThemes: normalizeSubThemes(childrenThemes),
      grandChildrenThemes: grandChildrenThemes ? normalizeSubThemes(grandChildrenThemes) : void 0,
      getTheme
    });
  return lastBuilder = builder.themeBuilder, builder.themes;
}
let lastBuilder = null;
const getLastBuilder = () => lastBuilder;
function normalizeSubThemes(defs) {
  return Object.fromEntries(Object.entries(defs || {}).map(([name, value]) => [name, {
    palette: name,
    template: value.template || "base"
  }]));
}
const defaultPalettes = createPalettes(getThemesPalettes({
  base: {
    palette: ["#fff", "#000"]
  },
  accent: {
    palette: ["#ff0000", "#ff9999"]
  }
}));
function createSimpleThemeBuilder(props) {
  const {
    getTheme,
    extra,
    accentExtra,
    childrenThemes = null,
    grandChildrenThemes = null,
    templates = import_defaultTemplates.defaultTemplates,
    palettes = defaultPalettes,
    accentTheme,
    componentThemes = templates === import_defaultTemplates.defaultTemplates ? import_defaultComponentThemes.defaultComponentThemes : void 0
  } = props;
  let themeBuilder = (0, import_ThemeBuilder.createThemeBuilder)().addPalettes(palettes).addTemplates(templates).addThemes({
    light: {
      template: "base",
      palette: "light",
      nonInheritedValues: {
        ...extra?.light,
        ...(accentTheme && palettes.light_accent && {
          accent1: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 0],
          accent2: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 1],
          accent3: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 2],
          accent4: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 3],
          accent5: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 4],
          accent6: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 5],
          accent7: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 6],
          accent8: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 7],
          accent9: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 8],
          accent10: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 9],
          accent11: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 10],
          accent12: palettes.light_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 11]
        })
      }
    },
    dark: {
      template: "base",
      palette: "dark",
      nonInheritedValues: {
        ...extra?.dark,
        ...(accentTheme && palettes.dark_accent && {
          accent1: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 0],
          accent2: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 1],
          accent3: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 2],
          accent4: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 3],
          accent5: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 4],
          accent6: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 5],
          accent7: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 6],
          accent8: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 7],
          accent9: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 8],
          accent10: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 9],
          accent11: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 10],
          accent12: palettes.dark_accent[import_getThemeSuitePalettes.PALETTE_BACKGROUND_OFFSET + 11]
        })
      }
    }
  });
  return palettes.light_accent && (themeBuilder = themeBuilder.addChildThemes({
    accent: [{
      parent: "light",
      template: "base",
      palette: "light_accent",
      nonInheritedValues: accentExtra?.light
    }, {
      parent: "dark",
      template: "base",
      palette: "dark_accent",
      nonInheritedValues: accentExtra?.dark
    }]
  })), childrenThemes && (themeBuilder = themeBuilder.addChildThemes(childrenThemes, {
    avoidNestingWithin: ["accent"]
  })), grandChildrenThemes && (themeBuilder = themeBuilder.addChildThemes(grandChildrenThemes, {
    avoidNestingWithin: ["accent"]
  })), componentThemes && (themeBuilder = themeBuilder.addComponentThemes(getComponentThemes(componentThemes), {
    avoidNestingWithin: [
    // ...Object.keys(childrenThemes || {}),
    ...Object.keys(grandChildrenThemes || {})]
  })), getTheme && (themeBuilder = themeBuilder.getTheme(getTheme)), {
    themeBuilder,
    themes: themeBuilder.build()
  };
}
function getSchemePalette(colors) {
  return {
    light: colors,
    dark: [...colors].reverse()
  };
}
function getAnchors(palette) {
  const numItems = palette.light.length;
  return palette.light.map((lcolor, index) => {
    const dcolor = palette.dark[index],
      [lhue, lsat, llum, lalpha] = (0, import_color2k.parseToHsla)(lcolor),
      [dhue, dsat, dlum, dalpha] = (0, import_color2k.parseToHsla)(dcolor);
    return {
      index: spreadIndex(11, numItems, index),
      hue: {
        light: lhue,
        dark: dhue
      },
      sat: {
        light: lsat,
        dark: dsat
      },
      lum: {
        light: llum,
        dark: dlum
      },
      alpha: {
        light: lalpha,
        dark: dalpha
      }
    };
  });
}
function spreadIndex(maxIndex, numItems, index) {
  return Math.round(index / (numItems - 1) * maxIndex);
}
function coerceSimplePaletteToSchemePalette(def) {
  return Array.isArray(def) ? getSchemePalette(def) : def;
}
function getThemesPalettes(props) {
  const base = coerceSimplePaletteToSchemePalette(props.base.palette),
    accent = props.accent ? coerceSimplePaletteToSchemePalette(props.accent.palette) : null,
    baseAnchors = getAnchors(base);
  function getSubThemesPalettes(defs) {
    return Object.fromEntries(Object.entries(defs).map(([key, value]) => [key, {
      name: key,
      anchors: value.palette ? getAnchors(coerceSimplePaletteToSchemePalette(value.palette)) : baseAnchors
    }]));
  }
  return {
    base: {
      name: "base",
      anchors: baseAnchors
    },
    ...(accent && {
      accent: {
        name: "accent",
        anchors: getAnchors(accent)
      }
    }),
    ...(props.childrenThemes && getSubThemesPalettes(props.childrenThemes)),
    ...(props.grandChildrenThemes && getSubThemesPalettes(props.grandChildrenThemes))
  };
}
const getComponentThemes = components => Object.fromEntries(Object.entries(components).map(([componentName, {
  template
}]) => [componentName, {
  parent: "",
  template: template || "base"
}]));
function createPalettes(palettes) {
  const accentPalettes = palettes.accent ? (0, import_getThemeSuitePalettes.getThemeSuitePalettes)(palettes.accent) : null,
    basePalettes = (0, import_getThemeSuitePalettes.getThemeSuitePalettes)(palettes.base);
  return Object.fromEntries(Object.entries(palettes).flatMap(([name, palette]) => {
    const palettes2 = (0, import_getThemeSuitePalettes.getThemeSuitePalettes)(palette),
      oppositePalettes = name.startsWith("accent") ? basePalettes : accentPalettes || basePalettes;
    if (!oppositePalettes) return [];
    const oppositeLight = oppositePalettes.light,
      oppositeDark = oppositePalettes.dark,
      bgOffset = 7;
    return [[name === "base" ? "light" : `light_${name}`, [oppositeLight[bgOffset], ...palettes2.light, oppositeLight[oppositeLight.length - bgOffset - 1]]], [name === "base" ? "dark" : `dark_${name}`, [oppositeDark[oppositeDark.length - bgOffset - 1], ...palettes2.dark, oppositeDark[bgOffset]]]];
  }));
}