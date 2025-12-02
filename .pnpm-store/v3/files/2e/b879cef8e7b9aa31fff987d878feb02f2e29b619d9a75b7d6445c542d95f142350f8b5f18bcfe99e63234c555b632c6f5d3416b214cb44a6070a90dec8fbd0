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
var getVariantExtras_exports = {};
__export(getVariantExtras_exports, {
  getFontsForLanguage: () => getFontsForLanguage,
  getVariantExtras: () => getVariantExtras
});
module.exports = __toCommonJS(getVariantExtras_exports);
var import_createVariable = require("../createVariable.native.js"),
  cache = /* @__PURE__ */new WeakMap(),
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
        return (0, import_createVariable.getVariableValue)(styleState.fontFamily || styleState.props.fontFamily) || props.fontFamily || (0, import_createVariable.getVariableValue)(styleState.conf.defaultFont);
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
//# sourceMappingURL=getVariantExtras.native.js.map
