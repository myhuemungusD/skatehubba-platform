import { isServer } from "@tamagui/constants";
import { startTransition } from "@tamagui/start-transition";
import { ensureThemeVariable, forceUpdateThemes, getConfig, getThemeCSSRules, proxyThemeToParents, simpleHash, updateConfig } from "@tamagui/web";
function mutateThemes(param) {
  var {
      themes,
      batch,
      insertCSS = !0,
      ...props
    } = param,
    allThemesProxied = {},
    allThemesRaw = {},
    _iteratorNormalCompletion = !0,
    _didIteratorError = !1,
    _iteratorError = void 0;
  try {
    for (var _iterator = themes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var {
          name,
          theme
        } = _step.value,
        res = _mutateTheme({
          ...props,
          name,
          theme,
          // we'll do one update at the end
          avoidUpdate: !0,
          // always add which also replaces but doesnt fail first time
          mutationType: "add"
        });
      res && (allThemesProxied[name] = res.theme, allThemesRaw[name] = res.themeRaw);
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
  var cssRules = insertCSS ? insertThemeCSS(allThemesRaw, batch) : [];
  return startTransition(function () {
    for (var themeName in allThemesProxied) {
      var theme2 = allThemesProxied[themeName];
      updateThemeConfig(themeName, theme2);
    }
    updateThemeStates();
  }), {
    themes: allThemesProxied,
    themesRaw: allThemesRaw,
    cssRules
  };
}
function _mutateTheme(props) {
  if (isServer) {
    process.env.NODE_ENV === "development" && console.warn("Theme mutation is not supported on server side");
    return;
  }
  var config = getConfig(),
    {
      name: themeName,
      theme: themeIn,
      insertCSS,
      mutationType
    } = props;
  if (process.env.NODE_ENV === "development") {
    if (!config) throw new Error("No config");
    var theme = config.themes[props.name];
    if (mutationType !== "add" && !theme) throw new Error(`${mutationType === "replace" ? "Replace" : "Update"} theme failed! Theme ${props.name} does not exist`);
  }
  var _config_themes_themeName,
    theme1 = {
      ...(mutationType === "update" ? (_config_themes_themeName = config.themes[themeName]) !== null && _config_themes_themeName !== void 0 ? _config_themes_themeName : {} : {}),
      ...themeIn
    };
  for (var key in theme1) ensureThemeVariable(theme1, key);
  var themeProxied = proxyThemeToParents(themeName, theme1),
    response = {
      themeRaw: theme1,
      theme: themeProxied,
      cssRules: []
    };
  return props.avoidUpdate || (insertCSS && (response.cssRules = insertThemeCSS({
    [themeName]: theme1
  })), updateThemeConfig(themeName, themeProxied), updateThemeStates()), response;
}
function updateThemeConfig(themeName, theme) {
  var config = getConfig();
  config.themes[themeName] = theme, updateConfig("themes", config.themes);
}
function updateThemeStates() {
  forceUpdateThemes();
}
function insertThemeCSS(themes) {
  var batch = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return [];
  var config, cssRules;
  for (var themeName in themes) {
    var theme = themes[themeName],
      rules = getThemeCSSRules({
        config,
        themeName,
        names: [themeName],
        hasDarkLight: !0,
        theme
      });
    cssRules = [...cssRules, ...rules], batch || updateStyle(`t_theme_style_${themeName}`, rules);
  }
  if (batch) {
    var id;
    updateStyle(`t_theme_style_${id}`, cssRules);
  }
}
function updateStyle(id, rules) {
  var existing = document.querySelector(`#${id}`),
    style = document.createElement("style");
  if (style.id = id, style.appendChild(document.createTextNode(rules.join(`
`))), document.head.appendChild(style), existing) {
    var _existing_parentElement;
    (_existing_parentElement = existing.parentElement) === null || _existing_parentElement === void 0 || _existing_parentElement.removeChild(existing);
  }
}
export { _mutateTheme, mutateThemes };
//# sourceMappingURL=_mutateTheme.native.js.map
