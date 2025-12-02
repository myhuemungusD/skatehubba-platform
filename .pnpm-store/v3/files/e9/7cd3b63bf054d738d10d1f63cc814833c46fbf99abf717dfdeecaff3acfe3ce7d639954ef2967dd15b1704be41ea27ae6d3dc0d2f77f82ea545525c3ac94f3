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
var mutateTheme_exports = {};
__export(mutateTheme_exports, {
  _mutateTheme: () => _mutateTheme,
  mutateThemes: () => mutateThemes
});
module.exports = __toCommonJS(mutateTheme_exports);
var import_constants = require("@tamagui/constants"),
  import_start_transition = require("@tamagui/start-transition"),
  import_web = require("@tamagui/web");
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
  return (0, import_start_transition.startTransition)(function () {
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
  if (import_constants.isServer) {
    process.env.NODE_ENV === "development" && console.warn("Theme mutation is not supported on server side");
    return;
  }
  var config = (0, import_web.getConfig)(),
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
  for (var key in theme1) (0, import_web.ensureThemeVariable)(theme1, key);
  var themeProxied = (0, import_web.proxyThemeToParents)(themeName, theme1),
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
  var config = (0, import_web.getConfig)();
  config.themes[themeName] = theme, (0, import_web.updateConfig)("themes", config.themes);
}
function updateThemeStates() {
  (0, import_web.forceUpdateThemes)();
}
function insertThemeCSS(themes) {
  var batch = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  return [];
  var config, cssRules;
  for (var themeName in themes) {
    var theme = themes[themeName],
      rules = (0, import_web.getThemeCSSRules)({
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
//# sourceMappingURL=_mutateTheme.native.js.map
