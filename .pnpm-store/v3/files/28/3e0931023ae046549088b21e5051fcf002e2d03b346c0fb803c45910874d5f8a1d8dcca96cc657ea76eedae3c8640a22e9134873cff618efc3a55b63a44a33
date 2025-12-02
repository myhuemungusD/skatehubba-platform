const THEME_INFO = /* @__PURE__ */ new Map(), getThemeInfo = (theme, name) => THEME_INFO.get(name || JSON.stringify(theme)), setThemeInfo = (theme, info) => {
  const next = {
    ...info,
    cache: /* @__PURE__ */ new Map()
  };
  THEME_INFO.set(info.name || JSON.stringify(theme), next), THEME_INFO.set(JSON.stringify(info.definition), next);
};
export {
  getThemeInfo,
  setThemeInfo
};
//# sourceMappingURL=themeInfo.js.map
