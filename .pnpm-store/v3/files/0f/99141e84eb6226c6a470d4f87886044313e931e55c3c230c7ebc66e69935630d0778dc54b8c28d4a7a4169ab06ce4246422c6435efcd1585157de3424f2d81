import { isWeb } from "@tamagui/constants";
import { configListeners, setConfig, setTokens } from "./config.native.js";
import { createVariables } from "./createVariables.native.js";
import { defaultAnimationDriver } from "./helpers/defaultAnimationDriver.native.js";
import { getThemeCSSRules } from "./helpers/getThemeCSSRules.native.js";
import { scanAllSheets } from "./helpers/insertStyleRule.native.js";
import { proxyThemesToParents } from "./helpers/proxyThemeToParents.native.js";
import { registerCSSVariable, variableToCSS } from "./helpers/registerCSSVariable.native.js";
import { ensureThemeVariable } from "./helpers/themes.native.js";
import { configureMedia } from "./hooks/useMedia.native.js";
import { parseFont } from "./insertFont.native.js";
import { loadDuplicatedConfig } from "./loadDuplicatedConfig.native.js";
import { Tamagui } from "./Tamagui.native.js";
function shouldTokenCategoryHaveUnits(category) {
  var UNIT_CATEGORIES = /* @__PURE__ */new Set(["size", "space", "radius"]);
  return UNIT_CATEGORIES.has(category);
}
function createTamagui(configIn) {
  var _configIn_settings,
    dup = loadDuplicatedConfig();
  if (dup) return dup;
  var tokensParsed = {},
    tokens = createVariables(configIn.tokens || {});
  if (configIn.tokens) {
    var tokensMerged = {};
    for (var cat in tokens) {
      tokensParsed[cat] = {}, tokensMerged[cat] = {};
      var tokenCat = tokens[cat];
      for (var key in tokenCat) {
        var val = tokenCat[key],
          prefixedKey = `$${key}`;
        tokensParsed[cat][prefixedKey] = val, tokensMerged[cat][prefixedKey] = val, tokensMerged[cat][key] = val;
      }
    }
    setTokens(tokensMerged);
  }
  var foundThemes;
  if (configIn.themes) {
    var noThemes = Object.keys(configIn.themes).length === 0;
    noThemes && (foundThemes = scanAllSheets(noThemes, tokensParsed));
  }
  var fontSizeTokens = null,
    fontsParsed;
  if (configIn.fonts) {
    var fontTokens = Object.fromEntries(Object.entries(configIn.fonts).map(function (param) {
      var [k, v] = param;
      return [k, createVariables(v, "f", !0)];
    }));
    fontsParsed = function () {
      var res = {};
      for (var familyName in fontTokens) {
        var font = fontTokens[familyName],
          fontParsed = parseFont(font);
        res[`$${familyName}`] = fontParsed, !fontSizeTokens && fontParsed.size && (fontSizeTokens = new Set(Object.keys(fontParsed.size)));
      }
      return res;
    }();
  }
  var specificTokens = {},
    themeConfig = function () {
      var cssRuleSets = [],
        declarations = [],
        fontDeclarations = {};
      for (var key2 in tokens) for (var skey in tokens[key2]) {
        var variable = tokens[key2][skey];
        if (specificTokens[`$${key2}.${skey}`] = variable, process.env.NODE_ENV === "development" && typeof variable > "u") throw new Error(`No value for tokens.${key2}.${skey}:
${JSON.stringify(variable, null, 2)}`);
        if (isWeb) {
          registerCSSVariable(variable);
          var variableNeedsPx = variable.needsPx === !0,
            categoryNeedsPx = shouldTokenCategoryHaveUnits(key2),
            shouldBeUnitless = !(variableNeedsPx || categoryNeedsPx);
          declarations.push(variableToCSS(variable, shouldBeUnitless));
        }
      }
      if (0) {
        var declarationsToRuleSet;
        for (var key1 in fontsParsed) var fontParsed, name, language, fontVars;
        var sep;
        if (fontDeclarations) for (var key22 in fontDeclarations) var name1, declarations1, language1, fontSelector, langSelector, selectors, specificRuleSet;
      }
      var themesIn = configIn.themes,
        dedupedThemes = foundThemes ?? getThemesDeduped(themesIn, tokens.color),
        themes = proxyThemesToParents(dedupedThemes);
      return {
        themes,
        cssRuleSets,
        getThemeRulesSets() {
          var themeRuleSets = [];
          if (isWeb) {
            var _iteratorNormalCompletion = !0,
              _didIteratorError = !1,
              _iteratorError = void 0;
            try {
              for (var _iterator = dedupedThemes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                var {
                    names,
                    theme
                  } = _step.value,
                  nextRules = getThemeCSSRules({
                    config: configIn,
                    themeName: names[0],
                    names,
                    theme
                  });
                themeRuleSets = [...themeRuleSets, ...nextRules];
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
          }
          return themeRuleSets;
        }
      };
    }(),
    userShorthands = configIn.shorthands || {},
    shorthands = {
      ...builtinShorthands,
      ...userShorthands
    },
    lastCSSInsertedRulesIndex = -1,
    getCSS = function () {
      var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (0) {
        var separator, sinceLastCall, exclude;
        if (sinceLastCall && lastCSSInsertedRulesIndex >= 0) var rules;
        var runtimeStyles, designSystem;
      } else return "";
    },
    getNewCSS = function (opts) {
      return getCSS({
        ...opts,
        sinceLastCall: !0
      });
    },
    _configIn_settings_defaultFont,
    defaultFontSetting = (_configIn_settings_defaultFont = (_configIn_settings = configIn.settings) === null || _configIn_settings === void 0 ? void 0 : _configIn_settings.defaultFont) !== null && _configIn_settings_defaultFont !== void 0 ? _configIn_settings_defaultFont : configIn.defaultFont,
    defaultFont = function () {
      var val2 = defaultFontSetting;
      return val2?.[0] === "$" && (val2 = val2.slice(1)), val2;
    }(),
    defaultFontToken = defaultFont ? `$${defaultFont}` : "",
    unset = {
      ...configIn.unset
    };
  !unset.fontFamily && defaultFont && (unset.fontFamily = defaultFontToken);
  var config = {
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
    inverseShorthands: shorthands ? Object.fromEntries(Object.entries(shorthands).map(function (param) {
      var [k, v] = param;
      return [v, k];
    })) : {},
    themes: themeConfig.themes,
    fontsParsed: fontsParsed || {},
    themeConfig,
    tokensParsed,
    parsed: !0,
    getNewCSS,
    getCSS,
    defaultFont,
    fontSizeTokens: fontSizeTokens || /* @__PURE__ */new Set(),
    specificTokens,
    defaultFontToken
  };
  if (setConfig(config), configureMedia(config), process.env.NODE_ENV === "test" && (globalThis.__tamaguiConfig = config), configListeners.size && (configListeners.forEach(function (cb) {
    return cb(config);
  }), configListeners.clear()), process.env.NODE_ENV === "development") {
    var _process_env_DEBUG;
    !((_process_env_DEBUG = process.env.DEBUG) === null || _process_env_DEBUG === void 0) && _process_env_DEBUG.startsWith("tamagui") && console.info("Tamagui config:", config), globalThis.Tamagui || (globalThis.Tamagui = Tamagui);
  }
  return config;
}
function getThemesDeduped(themes, colorTokens) {
  var dedupedThemes = [],
    existing = /* @__PURE__ */new Map();
  for (var themeName in themes) {
    var darkOrLightSpecificPrefix = themeName.startsWith("dark") ? "dark" : themeName.startsWith("light") ? "light" : "",
      rawTheme = themes[themeName],
      key = darkOrLightSpecificPrefix + JSON.stringify(rawTheme);
    if (existing.has(key)) {
      var e = existing.get(key);
      e.names.push(themeName);
      continue;
    }
    var theme = {
      ...colorTokens,
      ...rawTheme
    };
    for (var key1 in theme) ensureThemeVariable(theme, key1);
    var deduped = {
      names: [themeName],
      theme
    };
    dedupedThemes.push(deduped), existing.set(key, deduped);
  }
  return dedupedThemes;
}
var builtinShorthands = {
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
export { createTamagui };
//# sourceMappingURL=createTamagui.native.js.map
