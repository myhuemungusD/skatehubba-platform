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
var createTamagui_exports = {};
__export(createTamagui_exports, {
  createTamagui: () => createTamagui
});
module.exports = __toCommonJS(createTamagui_exports);
var import_constants = require("@tamagui/constants"),
  import_config = require("./config.native.js"),
  import_createVariables = require("./createVariables.native.js"),
  import_defaultAnimationDriver = require("./helpers/defaultAnimationDriver.native.js"),
  import_getThemeCSSRules = require("./helpers/getThemeCSSRules.native.js"),
  import_insertStyleRule = require("./helpers/insertStyleRule.native.js"),
  import_proxyThemeToParents = require("./helpers/proxyThemeToParents.native.js"),
  import_registerCSSVariable = require("./helpers/registerCSSVariable.native.js"),
  import_themes = require("./helpers/themes.native.js"),
  import_useMedia = require("./hooks/useMedia.native.js"),
  import_insertFont = require("./insertFont.native.js"),
  import_loadDuplicatedConfig = require("./loadDuplicatedConfig.native.js"),
  import_Tamagui = require("./Tamagui.native.js");
function shouldTokenCategoryHaveUnits(category) {
  var UNIT_CATEGORIES = /* @__PURE__ */new Set(["size", "space", "radius"]);
  return UNIT_CATEGORIES.has(category);
}
function createTamagui(configIn) {
  var _configIn_settings,
    dup = (0, import_loadDuplicatedConfig.loadDuplicatedConfig)();
  if (dup) return dup;
  var tokensParsed = {},
    tokens = (0, import_createVariables.createVariables)(configIn.tokens || {});
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
    (0, import_config.setTokens)(tokensMerged);
  }
  var foundThemes;
  if (configIn.themes) {
    var noThemes = Object.keys(configIn.themes).length === 0;
    noThemes && (foundThemes = (0, import_insertStyleRule.scanAllSheets)(noThemes, tokensParsed));
  }
  var fontSizeTokens = null,
    fontsParsed;
  if (configIn.fonts) {
    var fontTokens = Object.fromEntries(Object.entries(configIn.fonts).map(function (param) {
      var [k, v] = param;
      return [k, (0, import_createVariables.createVariables)(v, "f", !0)];
    }));
    fontsParsed = function () {
      var res = {};
      for (var familyName in fontTokens) {
        var font = fontTokens[familyName],
          fontParsed = (0, import_insertFont.parseFont)(font);
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
        if (import_constants.isWeb) {
          (0, import_registerCSSVariable.registerCSSVariable)(variable);
          var variableNeedsPx = variable.needsPx === !0,
            categoryNeedsPx = shouldTokenCategoryHaveUnits(key2),
            shouldBeUnitless = !(variableNeedsPx || categoryNeedsPx);
          declarations.push((0, import_registerCSSVariable.variableToCSS)(variable, shouldBeUnitless));
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
        themes = (0, import_proxyThemeToParents.proxyThemesToParents)(dedupedThemes);
      return {
        themes,
        cssRuleSets,
        getThemeRulesSets() {
          var themeRuleSets = [];
          if (import_constants.isWeb) {
            var _iteratorNormalCompletion = !0,
              _didIteratorError = !1,
              _iteratorError = void 0;
            try {
              for (var _iterator = dedupedThemes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                var {
                    names,
                    theme
                  } = _step.value,
                  nextRules = (0, import_getThemeCSSRules.getThemeCSSRules)({
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
    animations: import_defaultAnimationDriver.defaultAnimationDriver,
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
  if ((0, import_config.setConfig)(config), (0, import_useMedia.configureMedia)(config), process.env.NODE_ENV === "test" && (globalThis.__tamaguiConfig = config), import_config.configListeners.size && (import_config.configListeners.forEach(function (cb) {
    return cb(config);
  }), import_config.configListeners.clear()), process.env.NODE_ENV === "development") {
    var _process_env_DEBUG;
    !((_process_env_DEBUG = process.env.DEBUG) === null || _process_env_DEBUG === void 0) && _process_env_DEBUG.startsWith("tamagui") && console.info("Tamagui config:", config), globalThis.Tamagui || (globalThis.Tamagui = import_Tamagui.Tamagui);
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
    for (var key1 in theme) (0, import_themes.ensureThemeVariable)(theme, key1);
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
//# sourceMappingURL=createTamagui.native.js.map
