var THEME_INFO = /* @__PURE__ */new Map(),
  getThemeInfo = function (theme, name) {
    return THEME_INFO.get(name || JSON.stringify(theme));
  },
  setThemeInfo = function (theme, info) {
    var next = {
      ...info,
      cache: /* @__PURE__ */new Map()
    };
    THEME_INFO.set(info.name || JSON.stringify(theme), next), THEME_INFO.set(JSON.stringify(info.definition), next);
  };
export { getThemeInfo, setThemeInfo };
//# sourceMappingURL=themeInfo.native.js.map
