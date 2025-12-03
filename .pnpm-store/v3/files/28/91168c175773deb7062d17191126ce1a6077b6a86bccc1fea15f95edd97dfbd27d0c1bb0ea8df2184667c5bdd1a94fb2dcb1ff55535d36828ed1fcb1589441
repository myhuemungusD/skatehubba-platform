import { createTheme } from "./createTheme.native.js";
import { getThemeInfo, setThemeInfo } from "./themeInfo.native.js";
function applyMask(theme, mask) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    parentName = arguments.length > 3 ? arguments[3] : void 0,
    nextName = arguments.length > 4 ? arguments[4] : void 0,
    info = getThemeInfo(theme, parentName);
  if (!info) throw new Error(process.env.NODE_ENV !== "production" ? "No info found for theme, you must pass the theme created by createThemeFromPalette directly to extendTheme" : "\u274C Err2");
  var next = applyMaskStateless(info, mask, options, parentName);
  return setThemeInfo(next.theme, {
    definition: next.definition,
    palette: info.palette,
    name: nextName
  }), next.theme;
}
function applyMaskStateless(info, mask) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    parentName = arguments.length > 3 ? arguments[3] : void 0,
    _info_options,
    skip = {
      ...options.skip
    };
  if (!((_info_options = info.options) === null || _info_options === void 0) && _info_options.nonInheritedValues) for (var key in info.options.nonInheritedValues) skip[key] = 1;
  var maskOptions = {
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
//# sourceMappingURL=applyMask.native.js.map
