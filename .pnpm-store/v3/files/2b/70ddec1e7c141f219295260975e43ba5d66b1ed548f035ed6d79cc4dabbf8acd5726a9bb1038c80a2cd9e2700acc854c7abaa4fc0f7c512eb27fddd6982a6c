import { isAndroid } from "@tamagui/constants";
import { tokenCategories } from "@tamagui/helpers";
import { getConfig } from "../config.native.js";
import { getVariableValue, isVariable } from "../createVariable.native.js";
import { expandStyle } from "./expandStyle.native.js";
import { getFontsForLanguage, getVariantExtras } from "./getVariantExtras.native.js";
import { isObj } from "./isObj.native.js";
import { normalizeStyle } from "./normalizeStyle.native.js";
import { pseudoDescriptors } from "./pseudoDescriptors.native.js";
import { skipProps } from "./skipProps.native.js";
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var propMapper = function (key, value, styleState, disabled, map) {
    if (disabled) return map(key, value);
    if (lastFontFamilyToken = null, !(!isAndroid && key === "elevationAndroid")) {
      var {
        conf,
        styleProps,
        staticConfig
      } = styleState;
      if (value === "unset") {
        var _conf_unset,
          unsetVal = (_conf_unset = conf.unset) === null || _conf_unset === void 0 ? void 0 : _conf_unset[key];
        if (unsetVal != null) value = unsetVal;else return;
      }
      var {
        variants
      } = staticConfig;
      if (!styleProps.noExpand && variants && key in variants) {
        var variantValue = resolveVariants(key, value, styleProps, styleState, "");
        if (variantValue) {
          variantValue.forEach(function (param) {
            var [_$key, _$value] = param;
            return map(_$key, _$value);
          });
          return;
        }
      }
      styleProps.disableExpandShorthands || key in conf.shorthands && (key = conf.shorthands[key]);
      var originalValue = value;
      if (value != null && (value[0] === "$" ? value = getTokenForKey(key, value, styleProps, styleState) : isVariable(value) && (value = resolveVariableValue(key, value, styleProps.resolveValues))), value != null) {
        key === "fontFamily" && lastFontFamilyToken && (styleState.fontFamily = lastFontFamilyToken);
        var expanded = styleProps.noExpand ? null : expandStyle(key, value);
        if (expanded) for (var max = expanded.length, i = 0; i < max; i++) {
          var [nkey, nvalue] = expanded[i];
          map(nkey, nvalue, originalValue);
        } else map(key, value, originalValue);
      }
    }
  },
  resolveVariants = function (key, value, styleProps, styleState, parentVariantKey) {
    var {
        staticConfig,
        conf,
        debug
      } = styleState,
      {
        variants
      } = staticConfig;
    if (variants) {
      var variantValue = getVariantDefinition(variants[key], value, conf);
      if (process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(`\u2666\uFE0F\u2666\uFE0F\u2666\uFE0F resolve variant ${key}`), console.info({
        key,
        value,
        variantValue,
        variants
      }), console.groupEnd()), !variantValue) {
        if (process.env.TAMAGUI_WARN_ON_MISSING_VARIANT === "1" && typeof value != "boolean") {
          var name = staticConfig.componentName || "[UnnamedComponent]";
          console.warn(`No variant found: ${name} has variant "${key}", but no matching value "${value}"`);
        }
        return;
      }
      if (typeof variantValue == "function") {
        var fn = variantValue,
          extras = getVariantExtras(styleState);
        variantValue = fn(value, extras), process.env.NODE_ENV;
      }
      var fontFamilyResult;
      if (isObj(variantValue)) {
        var fontFamilyUpdate = variantValue.fontFamily || variantValue[conf.inverseShorthands.fontFamily];
        fontFamilyUpdate && (fontFamilyResult = getFontFamilyFromNameOrVariable(fontFamilyUpdate, conf), styleState.fontFamily = fontFamilyResult, process.env.NODE_ENV === "development" && debug === "verbose" && console.info("   updating font family", fontFamilyResult)), variantValue = resolveTokensAndVariants(key, variantValue, styleProps, styleState, parentVariantKey);
      }
      if (variantValue) {
        var expanded = normalizeStyle(variantValue, !!styleProps.noNormalize);
        process.env.NODE_ENV === "development" && debug === "verbose" && console.info("   expanding styles from ", variantValue, "to", expanded);
        var next = Object.entries(expanded);
        return fontFamilyResult && fontFamilyResult[0] === "$" && (lastFontFamilyToken = getVariableValue(fontFamilyResult)), next;
      }
    }
  };
function getFontFamilyFromNameOrVariable(input, conf) {
  if (isVariable(input)) {
    var val = variableToFontNameCache.get(input);
    if (val) return val;
    for (var key in conf.fontsParsed) {
      var familyVariable = conf.fontsParsed[key].family;
      if (isVariable(familyVariable) && (variableToFontNameCache.set(familyVariable, key), familyVariable === input)) return key;
    }
  } else if (typeof input == "string" && input[0] === "$") return input;
}
var variableToFontNameCache = /* @__PURE__ */new WeakMap(),
  resolveTokensAndVariants = function (key, value, styleProps, styleState, parentVariantKey) {
    var {
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
    for (var _key in value) {
      var subKey = conf.shorthands[_key] || _key,
        val = value[_key];
      if (!(!styleProps.noSkip && subKey in skipProps)) {
        if (staticConfig) {
          var _staticConfig_context,
            _staticConfig_parentStaticConfig_context,
            _staticConfig_parentStaticConfig,
            contextProps = ((_staticConfig_context = staticConfig.context) === null || _staticConfig_context === void 0 ? void 0 : _staticConfig_context.props) || ((_staticConfig_parentStaticConfig = staticConfig.parentStaticConfig) === null || _staticConfig_parentStaticConfig === void 0 || (_staticConfig_parentStaticConfig_context = _staticConfig_parentStaticConfig.context) === null || _staticConfig_parentStaticConfig_context === void 0 ? void 0 : _staticConfig_parentStaticConfig_context.props);
          if (contextProps && subKey in contextProps) {
            var _styleState, _styleState1;
            (_styleState = styleState).overriddenContextProps || (_styleState.overriddenContextProps = {}), styleState.overriddenContextProps[subKey] = val, (_styleState1 = styleState).originalContextPropValues || (_styleState1.originalContextPropValues = {}), styleState.originalContextPropValues[subKey] = val;
          }
        }
        if (styleProps.noExpand) res[subKey] = val;else if (variants && subKey in variants) {
          if (parentVariantKey && parentVariantKey === key) res[subKey] =
          // SYNC WITH *1
          val[0] === "$" ? getTokenForKey(subKey, val, styleProps, styleState) : val;else {
            var variantOut = resolveVariants(subKey, val, styleProps, styleState, key);
            if (variantOut) {
              var _iteratorNormalCompletion = !0,
                _didIteratorError = !1,
                _iteratorError = void 0;
              try {
                for (var _iterator = variantOut[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                  var [_$key, val1] = _step.value;
                  if (val1 != null) if (_$key in pseudoDescriptors) {
                    var _res, _key1, _;
                    (_ = (_res = res)[_key1 = _$key]) !== null && _ !== void 0 || (_res[_key1] = {}), Object.assign(res[_$key], val1);
                  } else res[_$key] = val1;
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
            }
          }
          continue;
        }
        if (isVariable(val)) {
          res[subKey] = resolveVariableValue(subKey, val, styleProps.resolveValues), process.env.NODE_ENV === "development" && debug === "verbose" && console.info("variable", subKey, res[subKey]);
          continue;
        }
        if (typeof val == "string") {
          var fVal =
          // SYNC WITH *1
          val[0] === "$" ? getTokenForKey(subKey, val, styleProps, styleState) : val;
          res[subKey] = fVal;
          continue;
        }
        if (isObj(val)) {
          var _res1,
            _subKey,
            subObject = resolveTokensAndVariants(subKey, val, styleProps, styleState, key);
          process.env.NODE_ENV === "development" && debug === "verbose" && console.info("object", subKey, subObject);
          var _1;
          (_1 = (_res1 = res)[_subKey = subKey]) !== null && _1 !== void 0 || (_res1[_subKey] = {}), Object.assign(res[subKey], subObject);
        } else res[subKey] = val;
        if (process.env.NODE_ENV === "development" && debug) {
          var _res_subKey;
          ((_res_subKey = res[subKey]) === null || _res_subKey === void 0 ? void 0 : _res_subKey[0]) === "$" && console.warn(`\u26A0\uFE0F Missing token in theme ${theme.name}:`, subKey, res[subKey], theme);
        }
      }
    }
    return res;
  },
  tokenCats = ["size", "color", "radius", "space", "zIndex"].map(function (name) {
    return {
      name,
      spreadName: `...${name}`
    };
  });
function getVariantDefinition(variant, value, conf) {
  if (variant) {
    if (typeof variant == "function") return variant;
    var exact = variant[value];
    if (exact) return exact;
    if (value != null) {
      var {
          tokensParsed
        } = conf,
        _iteratorNormalCompletion = !0,
        _didIteratorError = !1,
        _iteratorError = void 0;
      try {
        for (var _iterator = tokenCats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var {
            name,
            spreadName
          } = _step.value;
          if (spreadName in variant && name in tokensParsed && value in tokensParsed[name]) return variant[spreadName];
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
      var fontSizeVariant = variant["...fontSize"];
      if (fontSizeVariant && conf.fontSizeTokens.has(value)) return fontSizeVariant;
    }
    return variant[`:${typeof value > "u" ? "undefined" : _type_of(value)}`] || variant["..."];
  }
}
var fontShorthand = {
    fontSize: "size",
    fontWeight: "weight"
  },
  lastFontFamilyToken = null,
  didLogMissingToken = !1,
  getTokenForKey = function (key, value, styleProps, styleState) {
    var _staticConfig_accept,
      resolveAs = styleProps.resolveValues || "none";
    if (resolveAs === "none") return value;
    var {
        theme,
        conf = getConfig(),
        context,
        fontFamily,
        staticConfig
      } = styleState,
      themeValue = theme ? theme[value] || theme[value.slice(1)] : void 0,
      tokensParsed = conf.tokensParsed,
      valOrVar,
      hasSet = !1,
      customTokenAccept = staticConfig == null || (_staticConfig_accept = staticConfig.accept) === null || _staticConfig_accept === void 0 ? void 0 : _staticConfig_accept[key];
    if (customTokenAccept) {
      var val = themeValue ?? tokensParsed[customTokenAccept][value];
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
              var _fontsParsed_value,
                fontsParsed = context?.language ? getFontsForLanguage(conf.fontsParsed, context.language) : conf.fontsParsed;
              valOrVar = ((_fontsParsed_value = fontsParsed[value]) === null || _fontsParsed_value === void 0 ? void 0 : _fontsParsed_value.family) || value, lastFontFamilyToken = value, hasSet = !0;
              break;
            }
          case "fontSize":
          case "lineHeight":
          case "letterSpacing":
          case "fontWeight":
            {
              var fam = fontFamily || conf.defaultFontToken;
              if (fam) {
                var _font_,
                  fontsParsed1 = context?.language ? getFontsForLanguage(conf.fontsParsed, context.language) : conf.fontsParsed,
                  font = fontsParsed1[fam] || fontsParsed1[conf.defaultFontToken];
                valOrVar = (font == null || (_font_ = font[fontShorthand[key] || key]) === null || _font_ === void 0 ? void 0 : _font_[value]) || value, hasSet = !0;
              }
              break;
            }
        }
        for (var cat in tokenCategories) if (key in tokenCategories[cat]) {
          var _tokensParsed_cat,
            res = (_tokensParsed_cat = tokensParsed[cat]) === null || _tokensParsed_cat === void 0 ? void 0 : _tokensParsed_cat[value];
          res != null ? (valOrVar = res, hasSet = !0) : process.env.NODE_ENV === "development" && process.env.TAMAGUI_DISABLE_MISSING_TOKEN_LOG !== "1" && (didLogMissingToken || (didLogMissingToken = !0, console.groupCollapsed(`[tamagui] Warning: missing token ${key} in category ${cat} - ${value} (open for details)`), console.info(`Note: this could just be due to you not setting all the theme tokens Tamagui expects, which is harmless, but
                    it also often can be because you have a duplicated Tamagui in your bundle, which can cause tricky bugs.`), console.info(`To see if you have duplicated dependencies, in Chrome DevTools hit CMD+P and type TamaguiProvider.
                    If you see both a .cjs and a .mjs entry, it's duplicated.`), console.info("You can debug that issue by opening the .mjs and .cjs files and setting a breakpoint at the top of each."), console.info("We only log this warning one time as it's sometimes harmless, to disable this log entirely set process.env.TAMAGUI_DISABLE_MISSING_TOKEN_LOG=1."), console.groupEnd()));
        }
      }
      if (!hasSet) {
        var spaceVar = tokensParsed.space[value];
        spaceVar != null && (valOrVar = spaceVar, hasSet = !0);
      }
    }
    if (hasSet) {
      var out = resolveVariableValue(key, valOrVar, resolveAs);
      return process.env.NODE_ENV === "development" && styleState.debug === "verbose" && (globalThis.tamaguiAvoidTracking = !0, console.info("resolved", resolveAs, valOrVar, out), globalThis.tamaguiAvoidTracking = !1), out;
    }
    process.env.NODE_ENV === "development" && styleState.debug === "verbose" && console.warn(`Warning: no token found for ${key}, omitting`);
  };
function resolveVariableValue(key, valOrVar, resolveValues) {
  if (resolveValues === "none") return valOrVar;
  if (isVariable(valOrVar)) {
    if (resolveValues === "value") return valOrVar.val;
    var get = valOrVar?.get;
    if (key !== "shadowColor" && typeof get == "function") {
      var resolveDynamicFor = resolveValues === "web" ? "web" : void 0;
      return get(resolveDynamicFor);
    }
    return valOrVar.val;
  }
  return valOrVar;
}
export { getFontFamilyFromNameOrVariable, getTokenForKey, propMapper };
//# sourceMappingURL=propMapper.native.js.map
