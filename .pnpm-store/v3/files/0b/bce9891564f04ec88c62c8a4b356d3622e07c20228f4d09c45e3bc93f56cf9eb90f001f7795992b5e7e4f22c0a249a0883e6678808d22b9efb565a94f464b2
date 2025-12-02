const themesRaw = {};
function proxyThemesToParents(dedupedThemes) {
  for (const { names, theme } of dedupedThemes)
    for (const name of names)
      themesRaw[name] = theme;
  const themes = {};
  for (const { names, theme } of dedupedThemes)
    for (const themeName of names) {
      const proxiedTheme = proxyThemeToParents(themeName, theme);
      themes[themeName] = proxiedTheme;
    }
  return themes;
}
function proxyThemeToParents(themeName, theme) {
  const out = {}, cur = [], parents = themeName.split("_").slice(0, -1).map((part) => (cur.push(part), cur.join("_")));
  for (const parent of parents)
    Object.assign(out, themesRaw[parent]);
  return Object.assign(out, theme), out;
}
export {
  proxyThemeToParents,
  proxyThemesToParents
};
//# sourceMappingURL=proxyThemeToParents.js.map
