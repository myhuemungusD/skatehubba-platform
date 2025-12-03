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
var propMapper_exports = {};
__export(propMapper_exports, {
  getFontFamilyFromNameOrVariable: () => getFontFamilyFromNameOrVariable,
  getTokenForKey: () => getTokenForKey,
  propMapper: () => propMapper
});
module.exports = __toCommonJS(propMapper_exports);
var import_constants = require("@tamagui/constants"),
  import_helpers = require("@tamagui/helpers"),
  import_config = require("../config.cjs"),
  import_createVariable = require("../createVariable.cjs"),
  import_expandStyle = require("./expandStyle.cjs"),
  import_getVariantExtras = require("./getVariantExtras.cjs"),
  import_isObj = require("./isObj.cjs"),
  import_normalizeStyle = require("./normalizeStyle.cjs"),
  import_pseudoDescriptors = require("./pseudoDescriptors.cjs"),
  import_skipProps = require("./skipProps.cjs");
const propMapper = (key, value, styleState, disabled, map) => {
    if (disabled) return map(key, value);
    if (lastFontFamilyToken = null, key === "elevationAndroid") return;
    const {
      conf,
      styleProps,
      staticConfig
    } = styleState;
    if (value === "unset") {
      const unsetVal = conf.unset?.[key];
      if (unsetVal != null) value = unsetVal;else return;
    }
    const {
      variants
    } = staticConfig;
    if (!styleProps.noExpand && variants && key in variants) {
      const variantValue = resolveVariants(key, value, styleProps, styleState, "");
      if (variantValue) {
        variantValue.forEach(([key2, value2]) => map(key2, value2));
        return;
      }
    }
    styleProps.disableExpandShorthands || key in conf.shorthands && (key = conf.shorthands[key]);
    const originalValue = value;
    if (value != null && (value[0] === "$" ? value = getTokenForKey(key, value, styleProps, styleState) : (0, import_createVariable.isVariable)(value) && (value = resolveVariableValue(key, value, styleProps.resolveValues))), value != null) {
      key === "fontFamily" && lastFontFamilyToken && (styleState.fontFamily = lastFontFamilyToken);
      const expanded = styleProps.noExpand ? null : (0, import_expandStyle.expandStyle)(key, value);
      if (expanded) {
        const max = expanded.length;
        for (let i = 0; i < max; i++) {
          const [nkey, nvalue] = expanded[i];
          map(nkey, nvalue, originalValue);
        }
      } else map(key, value, originalValue);
    }
  },
  resolveVariants = (key, value, styleProps, styleState, parentVariantKey) => {
    const {
        staticConfig,
        conf,
        debug
      } = styleState,
      {
        variants
      } = staticConfig;
    if (!variants) return;
    let variantValue = getVariantDefinition(variants[key], value, conf);
    if (process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(`\u2666\uFE0F\u2666\uFE0F\u2666\uFE0F resolve variant ${key}`), console.info({
      key,
      value,
      variantValue,
      variants
    }), console.groupEnd()), !variantValue) {
      if (process.env.TAMAGUI_WARN_ON_MISSING_VARIANT === "1" && typeof value != "boolean") {
        const name = staticConfig.componentName || "[UnnamedComponent]";
        console.warn(`No variant found: ${name} has variant "${key}", but no matching value "${value}"`);
      }
      return;
    }
    if (typeof variantValue == "function") {
      const fn = variantValue,
        extras = (0, import_getVariantExtras.getVariantExtras)(styleState);
      variantValue = fn(value, extras), process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed("   expanded functional variant", key), console.info({
        fn,
        variantValue,
        extras
      }), console.groupEnd());
    }
    let fontFamilyResult;
    if ((0, import_isObj.isObj)(variantValue)) {
      const fontFamilyUpdate = variantValue.fontFamily || variantValue[conf.inverseShorthands.fontFamily];
      fontFamilyUpdate && (fontFamilyResult = getFontFamilyFromNameOrVariable(fontFamilyUpdate, conf), styleState.fontFamily = fontFamilyResult, process.env.NODE_ENV === "development" && debug === "verbose" && console.info("   updating font family", fontFamilyResult)), variantValue = resolveTokensAndVariants(key, variantValue, styleProps, styleState, parentVariantKey);
    }
    if (variantValue) {
      const expanded = (0, import_normalizeStyle.normalizeStyle)(variantValue, !!styleProps.noNormalize);
      process.env.NODE_ENV === "development" && debug === "verbose" && console.info("   expanding styles from ", variantValue, "to", expanded);
      const next = Object.entries(expanded);
      return fontFamilyResult && fontFamilyResult[0] === "$" && (lastFontFamilyToken = (0, import_createVariable.getVariableValue)(fontFamilyResult)), next;
    }
  };
function getFontFamilyFromNameOrVariable(input, conf) {
  if ((0, import_createVariable.isVariable)(input)) {
    const val = variableToFontNameCache.get(input);
    if (val) return val;
    for (const key in conf.fontsParsed) {
      const familyVariable = conf.fontsParsed[key].family;
      if ((0, import_createVariable.isVariable)(familyVariable) && (variableToFontNameCache.set(familyVariable, key), familyVariable === input)) return key;
    }
  } else if (typeof input == "string" && input[0] === "$") return input;
}
const variableToFontNameCache = /* @__PURE__ */new WeakMap(),
  resolveTokensAndVariants = (key, value, styleProps, styleState, parentVariantKey) => {
    const {
        conf,
        staticConfig,
        debug,
        theme
      } = styleState,
      {
        variants
      } = staticConfig,
      res = {};
    process.env.NODE_ENV === "development" && debug === "verbose" && console.info("   - resolveTokensAndVariants", key, value);
    for (const _key in value) {
      const subKey = conf.shorthands[_key] || _key,
        val = value[_key];
      if (!(!styleProps.noSkip && subKey in import_skipProps.skipProps)) {
        if (staticConfig) {
          const contextProps = staticConfig.context?.props || staticConfig.parentStaticConfig?.context?.props;
          contextProps && subKey in contextProps && (styleState.overriddenContextProps ||= {}, styleState.overriddenContextProps[subKey] = val, styleState.originalContextPropValues ||= {}, styleState.originalContextPropValues[subKey] = val);
        }
        if (styleProps.noExpand) res[subKey] = val;else if (variants && subKey in variants) {
          if (parentVariantKey && parentVariantKey === key) res[subKey] =
          // SYNC WITH *1
          val[0] === "$" ? getTokenForKey(subKey, val, styleProps, styleState) : val;else {
            const variantOut = resolveVariants(subKey, val, styleProps, styleState, key);
            if (variantOut) for (const [key2, val2] of variantOut) val2 != null && (key2 in import_pseudoDescriptors.pseudoDescriptors ? (res[key2] ??= {}, Object.assign(res[key2], val2)) : res[key2] = val2);
          }
          continue;
        }
        if ((0, import_createVariable.isVariable)(val)) {
          res[subKey] = resolveVariableValue(subKey, val, styleProps.resolveValues), process.env.NODE_ENV === "development" && debug === "verbose" && console.info("variable", subKey, res[subKey]);
          continue;
        }
        if (typeof val == "string") {
          const fVal =
          // SYNC WITH *1
          val[0] === "$" ? getTokenForKey(subKey, val, styleProps, styleState) : val;
          res[subKey] = fVal;
          continue;
        }
        if ((0, import_isObj.isObj)(val)) {
          const subObject = resolveTokensAndVariants(subKey, val, styleProps, styleState, key);
          process.env.NODE_ENV === "development" && debug === "verbose" && console.info("object", subKey, subObject), res[subKey] ??= {}, Object.assign(res[subKey], subObject);
        } else res[subKey] = val;
        process.env.NODE_ENV === "development" && debug && res[subKey]?.[0] === "$" && console.warn(`\u26A0\uFE0F Missing token in theme ${theme.name}:`, subKey, res[subKey], theme);
      }
    }
    return res;
  },
  tokenCats = ["size", "color", "radius", "space", "zIndex"].map(name => ({
    name,
    spreadName: `...${name}`
  }));
function getVariantDefinition(variant, value, conf) {
  if (!variant) return;
  if (typeof variant == "function") return variant;
  const exact = variant[value];
  if (exact) return exact;
  if (value != null) {
    const {
      tokensParsed
    } = conf;
    for (const {
      name,
      spreadName
    } of tokenCats) if (spreadName in variant && name in tokensParsed && value in tokensParsed[name]) return variant[spreadName];
    const fontSizeVariant = variant["...fontSize"];
    if (fontSizeVariant && conf.fontSizeTokens.has(value)) return fontSizeVariant;
  }
  return variant[`:${typeof value}`] || variant["..."];
}
const fontShorthand = {
  fontSize: "size",
  fontWeight: "weight"
};
let lastFontFamilyToken = null,
  didLogMissingToken = !1;
const getTokenForKey = (key, value, styleProps, styleState) => {
  let resolveAs = styleProps.resolveValues || "none";
  if (resolveAs === "none") return value;
  const {
      theme,
      conf = (0, import_config.getConfig)(),
      context,
      fontFamily,
      staticConfig
    } = styleState,
    themeValue = theme ? theme[value] || theme[value.slice(1)] : void 0,
    tokensParsed = conf.tokensParsed;
  let valOrVar,
    hasSet = !1;
  const customTokenAccept = staticConfig?.accept?.[key];
  if (customTokenAccept) {
    const val = themeValue ?? tokensParsed[customTokenAccept][value];
    val != null && (resolveAs = "value", valOrVar = val, hasSet = !0);
  }
  if (themeValue) {
    if (resolveAs === "except-theme") return value;
    valOrVar = themeValue, process.env.NODE_ENV === "development" && styleState.debug === "verbose" && (globalThis.tamaguiAvoidTracking = !0, console.info(` - resolving ${key} to theme value ${value} resolveAs ${resolveAs}`, valOrVar), globalThis.tamaguiAvoidTracking = !1), hasSet = !0;
  } else {
    if (value in conf.specificTokens) hasSet = !0, valOrVar = conf.specificTokens[value];else {
      switch (key) {
        case "fontFamily":
          {
            valOrVar = (context?.language ? (0, import_getVariantExtras.getFontsForLanguage)(conf.fontsParsed, context.language) : conf.fontsParsed)[value]?.family || value, lastFontFamilyToken = value, hasSet = !0;
            break;
          }
        case "fontSize":
        case "lineHeight":
        case "letterSpacing":
        case "fontWeight":
          {
            const fam = fontFamily || conf.defaultFontToken;
            if (fam) {
              const fontsParsed = context?.language ? (0, import_getVariantExtras.getFontsForLanguage)(conf.fontsParsed, context.language) : conf.fontsParsed;
              valOrVar = (fontsParsed[fam] || fontsParsed[conf.defaultFontToken])?.[fontShorthand[key] || key]?.[value] || value, hasSet = !0;
            }
            break;
          }
      }
      for (const cat in import_helpers.tokenCategories) if (key in import_helpers.tokenCategories[cat]) {
        const res = tokensParsed[cat]?.[value];
        res != null ? (valOrVar = res, hasSet = !0) : process.env.NODE_ENV === "development" && process.env.TAMAGUI_DISABLE_MISSING_TOKEN_LOG !== "1" && (didLogMissingToken || (didLogMissingToken = !0, console.groupCollapsed(`[tamagui] Warning: missing token ${key} in category ${cat} - ${value} (open for details)`), console.info(`Note: this could just be due to you not setting all the theme tokens Tamagui expects, which is harmless, but
                    it also often can be because you have a duplicated Tamagui in your bundle, which can cause tricky bugs.`), console.info(`To see if you have duplicated dependencies, in Chrome DevTools hit CMD+P and type TamaguiProvider.
                    If you see both a .cjs and a .mjs entry, it's duplicated.`), console.info("You can debug that issue by opening the .mjs and .cjs files and setting a breakpoint at the top of each."), console.info("We only log this warning one time as it's sometimes harmless, to disable this log entirely set process.env.TAMAGUI_DISABLE_MISSING_TOKEN_LOG=1."), console.groupEnd()));
      }
    }
    if (!hasSet) {
      const spaceVar = tokensParsed.space[value];
      spaceVar != null && (valOrVar = spaceVar, hasSet = !0);
    }
  }
  if (hasSet) {
    const out = resolveVariableValue(key, valOrVar, resolveAs);
    return process.env.NODE_ENV === "development" && styleState.debug === "verbose" && (globalThis.tamaguiAvoidTracking = !0, console.info("resolved", resolveAs, valOrVar, out), globalThis.tamaguiAvoidTracking = !1), out;
  }
  process.env.NODE_ENV === "development" && styleState.debug === "verbose" && console.warn(`Warning: no token found for ${key}, omitting`);
};
function resolveVariableValue(key, valOrVar, resolveValues) {
  if (resolveValues === "none") return valOrVar;
  if ((0, import_createVariable.isVariable)(valOrVar)) {
    if (resolveValues === "value") return valOrVar.val;
    const get = valOrVar?.get;
    return typeof get == "function" ? get(resolveValues === "web" ? "web" : void 0) : valOrVar.variable;
  }
  return valOrVar;
}