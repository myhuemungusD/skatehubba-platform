import { getVariableValue } from "../createVariable.native.js";
var cache = /* @__PURE__ */new WeakMap(),
  getVariantExtras = function (styleState) {
    if (cache.has(styleState)) return cache.get(styleState);
    var {
        props,
        conf,
        context,
        theme
      } = styleState,
      fonts = conf.fontsParsed;
    context?.language && (fonts = getFontsForLanguage(conf.fontsParsed, context.language));
    var next = {
      fonts,
      tokens: conf.tokensParsed,
      theme,
      get fontFamily() {
        return getVariableValue(styleState.fontFamily || styleState.props.fontFamily) || props.fontFamily || getVariableValue(styleState.conf.defaultFont);
      },
      get font() {
        return fonts[this.fontFamily] || (!props.fontFamily || props.fontFamily[0] === "$" ? fonts[styleState.conf.defaultFont] : void 0);
      },
      props
    };
    return cache.set(styleState, next), next;
  },
  fontLanguageCache = /* @__PURE__ */new WeakMap();
function getFontsForLanguage(fonts, language) {
  if (fontLanguageCache.has(language)) return fontLanguageCache.get(language);
  var next = {
    ...fonts,
    ...Object.fromEntries(Object.entries(language).map(function (param) {
      var [name, lang] = param;
      if (lang === "default") return [];
      var langKey = `$${name}_${lang}`;
      return [`$${name}`, fonts[langKey]];
    }))
  };
  return fontLanguageCache.set(language, next), next;
}
export { getFontsForLanguage, getVariantExtras };
//# sourceMappingURL=getVariantExtras.native.js.map
