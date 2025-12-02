import { getVariableValue } from "../createVariable.mjs";
const cache = /* @__PURE__ */new WeakMap(),
  getVariantExtras = styleState => {
    if (cache.has(styleState)) return cache.get(styleState);
    const {
      props,
      conf,
      context,
      theme
    } = styleState;
    let fonts = conf.fontsParsed;
    context?.language && (fonts = getFontsForLanguage(conf.fontsParsed, context.language));
    const next = {
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
  const next = {
    ...fonts,
    ...Object.fromEntries(Object.entries(language).map(([name, lang]) => {
      if (lang === "default") return [];
      const langKey = `$${name}_${lang}`;
      return [`$${name}`, fonts[langKey]];
    }))
  };
  return fontLanguageCache.set(language, next), next;
}
export { getFontsForLanguage, getVariantExtras };
//# sourceMappingURL=getVariantExtras.mjs.map
