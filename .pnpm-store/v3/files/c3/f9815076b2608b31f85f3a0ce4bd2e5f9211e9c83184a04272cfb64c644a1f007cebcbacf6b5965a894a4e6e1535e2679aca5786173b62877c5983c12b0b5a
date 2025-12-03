import { createTheme } from "./createTheme.mjs";
import { getThemeInfo, setThemeInfo } from "./themeInfo.mjs";
function applyMask(theme, mask, options = {}, parentName, nextName) {
  const info = getThemeInfo(theme, parentName);
  if (!info) throw new Error(process.env.NODE_ENV !== "production" ? "No info found for theme, you must pass the theme created by createThemeFromPalette directly to extendTheme" : "\u274C Err2");
  const next = applyMaskStateless(info, mask, options, parentName);
  return setThemeInfo(next.theme, {
    definition: next.definition,
    palette: info.palette,
    name: nextName
  }), next.theme;
}
function applyMaskStateless(info, mask, options = {}, parentName) {
  const skip = {
    ...options.skip
  };
  if (info.options?.nonInheritedValues) for (const key in info.options.nonInheritedValues) skip[key] = 1;
  const maskOptions = {
      parentName,
      palette: info.palette,
      ...options,
      skip
    },
    template = mask.mask(info.definition, maskOptions),
    theme = createTheme(info.palette, template);
  return {
    ...info,
    cache: /* @__PURE__ */new Map(),
    definition: template,
    theme
  };
}
export { applyMask, applyMaskStateless };
//# sourceMappingURL=applyMask.mjs.map
