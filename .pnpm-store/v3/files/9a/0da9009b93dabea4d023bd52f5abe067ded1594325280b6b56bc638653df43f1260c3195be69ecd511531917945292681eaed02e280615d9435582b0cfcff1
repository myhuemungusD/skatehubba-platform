import { isWeb } from "@tamagui/constants";
import { configListeners, setConfig, setTokens } from "./config";
import { createVariables } from "./createVariables";
import { defaultAnimationDriver } from "./helpers/defaultAnimationDriver";
import { getThemeCSSRules } from "./helpers/getThemeCSSRules";
import { getAllRules, scanAllSheets } from "./helpers/insertStyleRule";
import { proxyThemesToParents } from "./helpers/proxyThemeToParents";
import { registerCSSVariable, variableToCSS } from "./helpers/registerCSSVariable";
import { ensureThemeVariable } from "./helpers/themes";
import { configureMedia } from "./hooks/useMedia";
import { parseFont, registerFontVariables } from "./insertFont";
import { loadDuplicatedConfig } from "./loadDuplicatedConfig";
import { Tamagui } from "./Tamagui";
function shouldTokenCategoryHaveUnits(category) {
  return (/* @__PURE__ */ new Set(["size", "space", "radius"])).has(category);
}
function createTamagui(configIn) {
  const dup = loadDuplicatedConfig();
  if (dup)
    return dup;
  const tokensParsed = {}, tokens = createVariables(configIn.tokens || {});
  if (configIn.tokens) {
    const tokensMerged = {};
    for (const cat in tokens) {
      tokensParsed[cat] = {}, tokensMerged[cat] = {};
      const tokenCat = tokens[cat];
      for (const key in tokenCat) {
        const val = tokenCat[key], prefixedKey = `$${key}`;
        tokensParsed[cat][prefixedKey] = val, tokensMerged[cat][prefixedKey] = val, tokensMerged[cat][key] = val;
      }
    }
    setTokens(tokensMerged);
  }
  let foundThemes;
  if (configIn.themes) {
    const noThemes = Object.keys(configIn.themes).length === 0;
    noThemes && (foundThemes = scanAllSheets(noThemes, tokensParsed));
  }
  let fontSizeTokens = null, fontsParsed;
  if (configIn.fonts) {
    const fontTokens = Object.fromEntries(
      Object.entries(configIn.fonts).map(([k, v]) => [k, createVariables(v, "f", !0)])
    );
    fontsParsed = (() => {
      const res = {};
      for (const familyName in fontTokens) {
        const font = fontTokens[familyName], fontParsed = parseFont(font);
        res[`$${familyName}`] = fontParsed, !fontSizeTokens && fontParsed.size && (fontSizeTokens = new Set(Object.keys(fontParsed.size)));
      }
      return res;
    })();
  }
  const specificTokens = {}, themeConfig = (() => {
    const cssRuleSets = [], declarations = [], fontDeclarations = {};
    for (const key in tokens)
      for (const skey in tokens[key]) {
        const variable = tokens[key][skey];
        if (specificTokens[`$${key}.${skey}`] = variable, process.env.NODE_ENV === "development" && typeof variable > "u")
          throw new Error(
            `No value for tokens.${key}.${skey}:
${JSON.stringify(variable, null, 2)}`
          );
        if (isWeb) {
          registerCSSVariable(variable);
          const variableNeedsPx = variable.needsPx === !0, categoryNeedsPx = shouldTokenCategoryHaveUnits(key), shouldBeUnitless = !(variableNeedsPx || categoryNeedsPx);
          declarations.push(variableToCSS(variable, shouldBeUnitless));
        }
      }
    {
      let declarationsToRuleSet = function(decs, selector = "") {
        return `:root${selector} {${sep}${[...decs].join(`;${sep}`)}${sep}}`;
      };
      for (const key in fontsParsed) {
        const fontParsed = fontsParsed[key], [name, language] = key.includes("_") ? key.split("_") : [key], fontVars = registerFontVariables(fontParsed);
        fontDeclarations[key] = {
          name: name.slice(1),
          declarations: fontVars,
          language
        };
      }
      const sep = configIn.cssStyleSeparator || "";
      if (cssRuleSets.push(declarationsToRuleSet(declarations)), fontDeclarations)
        for (const key in fontDeclarations) {
          const { name, declarations: declarations2, language = "default" } = fontDeclarations[key], fontSelector = `.font_${name}`, langSelector = `:root .t_lang-${name}-${language} ${fontSelector}`, selectors = language === "default" ? ` ${fontSelector}, ${langSelector}` : langSelector, specificRuleSet = declarationsToRuleSet(declarations2, selectors);
          cssRuleSets.push(specificRuleSet);
        }
    }
    const themesIn = configIn.themes, dedupedThemes = foundThemes ?? getThemesDeduped(themesIn, tokens.color);
    return {
      themes: proxyThemesToParents(dedupedThemes),
      cssRuleSets,
      getThemeRulesSets() {
        let themeRuleSets = [];
        if (isWeb)
          for (const { names, theme } of dedupedThemes) {
            const nextRules = getThemeCSSRules({
              config: configIn,
              themeName: names[0],
              names,
              theme
            });
            themeRuleSets = [...themeRuleSets, ...nextRules];
          }
        return themeRuleSets;
      }
    };
  })(), userShorthands = configIn.shorthands || {}, shorthands = { ...builtinShorthands, ...userShorthands };
  let lastCSSInsertedRulesIndex = -1;
  const getCSS = (opts = {}) => {
    {
      const { separator = `
`, sinceLastCall, exclude } = opts;
      if (sinceLastCall && lastCSSInsertedRulesIndex >= 0) {
        const rules = getAllRules();
        return lastCSSInsertedRulesIndex = rules.length, rules.slice(lastCSSInsertedRulesIndex).join(separator);
      }
      lastCSSInsertedRulesIndex = 0;
      const runtimeStyles = getAllRules().join(separator);
      return exclude === "design-system" ? runtimeStyles : `${`._ovs-contain {overscroll-behavior:contain;}
  .is_Text .is_Text {display:inline-flex;}
  ._dsp_contents {display:contents;}
  ._no_backdrop::backdrop {display: none;}
  ${themeConfig.cssRuleSets.join(separator)}`}
  ${exclude ? "" : themeConfig.getThemeRulesSets().join(separator)}
  ${runtimeStyles}`;
    }
  }, getNewCSS = (opts) => getCSS({ ...opts, sinceLastCall: !0 }), defaultFontSetting = configIn.settings?.defaultFont ?? configIn.defaultFont, defaultFont = (() => {
    let val = defaultFontSetting;
    return val?.[0] === "$" && (val = val.slice(1)), val;
  })(), defaultFontToken = defaultFont ? `$${defaultFont}` : "", unset = { ...configIn.unset };
  !unset.fontFamily && defaultFont && (unset.fontFamily = defaultFontToken);
  const config = {
    fonts: {},
    onlyAllowShorthands: !1,
    fontLanguages: [],
    animations: defaultAnimationDriver,
    media: {},
    ...configIn,
    unset,
    settings: {
      // move deprecated settings here so we can reference them all using `getSetting`
      // TODO remove this on v2
      disableSSR: configIn.disableSSR,
      defaultFont: configIn.defaultFont,
      disableRootThemeClass: configIn.disableRootThemeClass,
      onlyAllowShorthands: configIn.onlyAllowShorthands,
      mediaQueryDefaultActive: configIn.mediaQueryDefaultActive,
      themeClassNameOnRoot: configIn.themeClassNameOnRoot,
      cssStyleSeparator: configIn.cssStyleSeparator,
      webContainerType: "inline-size",
      ...configIn.settings
    },
    tokens,
    // vite made this into a function if it wasn't set
    shorthands,
    userShorthands,
    inverseShorthands: shorthands ? Object.fromEntries(Object.entries(shorthands).map(([k, v]) => [v, k])) : {},
    themes: themeConfig.themes,
    fontsParsed: fontsParsed || {},
    themeConfig,
    tokensParsed,
    parsed: !0,
    getNewCSS,
    getCSS,
    defaultFont,
    fontSizeTokens: fontSizeTokens || /* @__PURE__ */ new Set(),
    specificTokens,
    defaultFontToken
    // const tokens = [...getToken(tokens.size[0])]
    // .spacer-sm + ._dsp_contents._dsp-sm-hidden { margin-left: -var(--${}) }
  };
  return setConfig(config), configureMedia(config), process.env.NODE_ENV === "test" && (globalThis.__tamaguiConfig = config), configListeners.size && (configListeners.forEach((cb) => cb(config)), configListeners.clear()), process.env.NODE_ENV === "development" && (process.env.DEBUG?.startsWith("tamagui") && console.info("Tamagui config:", config), globalThis.Tamagui || (globalThis.Tamagui = Tamagui)), config;
}
function getThemesDeduped(themes, colorTokens) {
  const dedupedThemes = [], existing = /* @__PURE__ */ new Map();
  for (const themeName in themes) {
    const darkOrLightSpecificPrefix = themeName.startsWith("dark") ? "dark" : themeName.startsWith("light") ? "light" : "", rawTheme = themes[themeName], key = darkOrLightSpecificPrefix + JSON.stringify(rawTheme);
    if (existing.has(key)) {
      existing.get(key).names.push(themeName);
      continue;
    }
    const theme = { ...colorTokens, ...rawTheme };
    for (const key2 in theme)
      ensureThemeVariable(theme, key2);
    const deduped = {
      names: [themeName],
      theme
    };
    dedupedThemes.push(deduped), existing.set(key, deduped);
  }
  return dedupedThemes;
}
const builtinShorthands = {
  fd: "flexDirection",
  fb: "flexBasis",
  bblr: "borderBottomLeftRadius",
  bbrr: "borderBottomRightRadius",
  fwr: "flexWrap",
  col: "color",
  ff: "fontFamily",
  fst: "fontStyle",
  tr: "transform",
  tt: "textTransform",
  td: "textDecorationLine",
  va: "verticalAlign",
  ws: "whiteSpace",
  wb: "wordBreak",
  ww: "wordWrap",
  brc: "borderRightColor",
  brw: "borderRightWidth",
  bs: "borderStyle",
  btc: "borderTopColor",
  btlr: "borderTopLeftRadius",
  btrr: "borderTopRightRadius",
  btw: "borderTopWidth",
  bw: "borderWidth",
  o: "opacity",
  cur: "cursor",
  pe: "pointerEvents",
  ov: "overflow",
  pos: "position",
  dsp: "display",
  fw: "fontWeight",
  fs: "fontSize",
  ls: "letterSpacing",
  lh: "lineHeight",
  bxs: "boxSizing",
  bxsh: "boxShadow",
  ox: "overflowX",
  oy: "overflowY"
};
export {
  createTamagui
};
//# sourceMappingURL=createTamagui.js.map
