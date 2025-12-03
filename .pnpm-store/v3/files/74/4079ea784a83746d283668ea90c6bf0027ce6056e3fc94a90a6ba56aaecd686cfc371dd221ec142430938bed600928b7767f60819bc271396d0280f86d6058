import { isClient } from "@tamagui/constants";
import { StyleObjectIdentifier, StyleObjectRules } from "@tamagui/helpers";
import { createVariable } from "../createVariable.native.js";
function _instanceof(left, right) {
  return right != null && typeof Symbol < "u" && right[Symbol.hasInstance] ? !!right[Symbol.hasInstance](left) : left instanceof right;
}
var scannedCache = /* @__PURE__ */new WeakMap(),
  totalSelectorsInserted = /* @__PURE__ */new Map(),
  allSelectors = {},
  allRules = {},
  getAllSelectors = function () {
    return allSelectors;
  },
  getAllRules = function () {
    return Object.values(allRules);
  },
  lastScannedSheets = null;
function scanAllSheets() {
  var collectThemes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1,
    tokens = arguments.length > 1 ? arguments[1] : void 0;
  if (process.env.NODE_ENV !== "test" && isClient) {
    var themes,
      sheets = document.styleSheets || [],
      prev = lastScannedSheets,
      current = new Set(sheets),
      _iteratorNormalCompletion = !0,
      _didIteratorError = !1,
      _iteratorError = void 0;
    try {
      for (var _iterator = current[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var sheet2 = _step.value;
        if (sheet2) {
          var out = updateSheetStyles(sheet2, !1, collectThemes, tokens);
          out && (themes = out);
        }
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
    if (lastScannedSheets = current, prev) {
      var _iteratorNormalCompletion1 = !0,
        _didIteratorError1 = !1,
        _iteratorError1 = void 0;
      try {
        for (var _iterator1 = prev[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
          var sheet1 = _step1.value;
          sheet1 && !current.has(sheet1) && updateSheetStyles(sheet1, !0);
        }
      } catch (err) {
        _didIteratorError1 = !0, _iteratorError1 = err;
      } finally {
        try {
          !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
        } finally {
          if (_didIteratorError1) throw _iteratorError1;
        }
      }
    }
    return themes;
  }
}
function trackInsertedStyle(id) {
  var next = (totalSelectorsInserted.get(id) || 0) + 1;
  return totalSelectorsInserted.set(id, next), next;
}
var bailAfterEnv = process.env.TAMAGUI_BAIL_AFTER_SCANNING_X_CSS_RULES,
  bailAfter = bailAfterEnv ? +bailAfterEnv : 400;
function updateSheetStyles(sheet2) {
  var remove = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
    collectThemes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1,
    tokens = arguments.length > 3 ? arguments[3] : void 0,
    _getTamaguiSelector,
    _getTamaguiSelector1,
    rules;
  try {
    if (rules = sheet2.cssRules, !rules) return;
  } catch {
    return;
  }
  var firstSelector = (_getTamaguiSelector = getTamaguiSelector(rules[0], collectThemes)) === null || _getTamaguiSelector === void 0 ? void 0 : _getTamaguiSelector[0],
    lastSelector = (_getTamaguiSelector1 = getTamaguiSelector(rules[rules.length - 1], collectThemes)) === null || _getTamaguiSelector1 === void 0 ? void 0 : _getTamaguiSelector1[0],
    cacheKey = `${rules.length}${firstSelector}${lastSelector}`,
    lastScanned = scannedCache.get(sheet2);
  if (!(!remove && lastScanned === cacheKey)) {
    for (var len = rules.length, fails = 0, dedupedThemes, nameToTheme = {}, i = 0; i < len; i++) {
      var rule = rules[i];
      if (_instanceof(rule, CSSStyleRule)) {
        var response = getTamaguiSelector(rule, collectThemes);
        if (response) fails = 0;else {
          if (fails++, fails > bailAfter) return;
          continue;
        }
        var [identifier, cssRule, isTheme] = response;
        if (isTheme) {
          var deduped = addThemesFromCSS(cssRule, tokens);
          if (deduped) {
            var _iteratorNormalCompletion = !0,
              _didIteratorError = !1,
              _iteratorError = void 0;
            try {
              for (var _loop = function () {
                  var name = _step.value;
                  nameToTheme[name] ? (Object.apply(nameToTheme[name], deduped.theme), deduped.names = deduped.names.filter(function (x) {
                    return x !== name;
                  })) : nameToTheme[name] = deduped.theme;
                }, _iterator = deduped.names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) _loop();
            } catch (err) {
              _didIteratorError = !0, _iteratorError = err;
            } finally {
              try {
                !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
              } finally {
                if (_didIteratorError) throw _iteratorError;
              }
            }
            dedupedThemes || (dedupedThemes = []), dedupedThemes.push(deduped);
          }
          continue;
        }
      }
    }
    return scannedCache.set(sheet2, cacheKey), dedupedThemes;
  }
}
var colorVarToVal,
  rootComputedStyle = null;
function addThemesFromCSS(cssStyleRule, tokens) {
  var selectors = cssStyleRule.selectorText.split(",");
  if (selectors.length) {
    if (tokens?.color && !colorVarToVal) {
      colorVarToVal = {};
      for (var key in tokens.color) {
        var token = tokens.color[key];
        colorVarToVal[token.name] = token.val;
      }
    }
    var rulesWithBraces = (cssStyleRule.cssText || "").slice(cssStyleRule.selectorText.length + 2, -1),
      rules = rulesWithBraces.split(";"),
      values = {},
      _iteratorNormalCompletion = !0,
      _didIteratorError = !1,
      _iteratorError = void 0;
    try {
      for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var rule = _step.value,
          sepI = rule.indexOf(":");
        if (sepI !== -1) {
          var varIndex = rule.indexOf("--"),
            key1 = rule.slice(varIndex === -1 ? 0 : varIndex + 2, sepI);
          process.env.TAMAGUI_CSS_VARIABLE_PREFIX && (key1 = key1.replace(process.env.TAMAGUI_CSS_VARIABLE_PREFIX, ""));
          var val = rule.slice(sepI + 2),
            value = void 0;
          if (val[0] === "v" && val.startsWith("var(")) {
            var varName = val.slice(6, -1),
              tokenVal = colorVarToVal[varName];
            tokenVal ? value = tokenVal : (rootComputedStyle || (rootComputedStyle = getComputedStyle(document.body)), value = rootComputedStyle.getPropertyValue("--" + varName));
          } else value = val;
          values[key1] = createVariable({
            key: key1,
            name: key1,
            val: value
          }, !0);
        }
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
    var names = /* @__PURE__ */new Set(),
      _iteratorNormalCompletion1 = !0,
      _didIteratorError1 = !1,
      _iteratorError1 = void 0;
    try {
      for (var _iterator1 = selectors[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
        var selector = _step1.value;
        if (selector !== " .tm_xxt") {
          var lastThemeSelectorIndex = selector.lastIndexOf(".t_"),
            name = selector.slice(lastThemeSelectorIndex).slice(3),
            [schemeChar] = selector[lastThemeSelectorIndex - 5],
            scheme = schemeChar === "d" ? "dark" : schemeChar === "i" ? "light" : "",
            themeName = scheme && scheme !== name ? `${scheme}_${name}` : name;
          !themeName || themeName === "light_dark" || themeName === "dark_light" || names.add(themeName);
        }
      }
    } catch (err) {
      _didIteratorError1 = !0, _iteratorError1 = err;
    } finally {
      try {
        !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
      } finally {
        if (_didIteratorError1) throw _iteratorError1;
      }
    }
    return {
      names: [...names],
      theme: values
    };
  }
}
var tamaguiSelectorRegex = /\.tm_xxt/;
function getTamaguiSelector(rule) {
  var collectThemes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  if (_instanceof(rule, CSSStyleRule)) {
    var text = rule.selectorText;
    if (text[0] === ":" && text[1] === "r" && tamaguiSelectorRegex.test(text)) {
      var id = getIdentifierFromTamaguiSelector(
      // next.js minifies it so its in front
      text.replace(tamaguiSelectorRegex, ""));
      return collectThemes ? [id, rule, !0] : [id, rule];
    }
  } else if (_instanceof(rule, CSSMediaRule)) return rule.cssRules.length > 1 ? void 0 : getTamaguiSelector(rule.cssRules[0]);
}
var getIdentifierFromTamaguiSelector = function (selector) {
    var dotIndex = selector.indexOf(":");
    return dotIndex > -1 ? selector.slice(7, dotIndex) : selector.slice(7);
  },
  sheet = null,
  trackAllRules = !0;
function stopAccumulatingRules() {
  trackAllRules = !1;
}
function updateRules(identifier, rules) {
  return trackAllRules && (allRules[identifier] = rules.join(" ")), !0;
}
var nonce = "";
function setNonce(_) {
  nonce = _;
}
function insertStyleRules(rulesToInsert) {
  if (isClient) {
    if (!sheet && document.head) {
      var styleTag = document.createElement("style");
      styleTag.id = "_tamagui-styles", nonce && (styleTag.nonce = nonce), sheet = document.head.appendChild(styleTag).sheet;
    }
    if (sheet) for (var key in rulesToInsert) {
      var styleObject = rulesToInsert[key],
        identifier = styleObject[StyleObjectIdentifier];
      if (shouldInsertStyleRules(identifier)) {
        var rules = styleObject[StyleObjectRules];
        allSelectors[identifier] = rules.join(`
`), trackInsertedStyle(identifier), updateRules(identifier, rules);
        try {
          var _iteratorNormalCompletion = !0,
            _didIteratorError = !1,
            _iteratorError = void 0;
          try {
            for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
              var rule = _step.value;
              sheet.insertRule(rule, sheet.cssRules.length), identifier === "_dsp-_groupframe-maxMd_none" && console.warn("INSERT", rule);
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
        } catch {
          process.env.NODE_ENV === "production" && console.error("Error inserting style rule", rules);
        }
      }
    }
  }
}
var maxToInsert = process.env.TAMAGUI_INSERT_SELECTOR_TRIES ? +process.env.TAMAGUI_INSERT_SELECTOR_TRIES : 1;
function shouldInsertStyleRules(identifier) {
  if (process.env.IS_STATIC === "is_static") return !0;
  var total = totalSelectorsInserted.get(identifier) || 0;
  return process.env.NODE_ENV === "development" && total > +(process.env.TAMAGUI_STYLE_INSERTION_WARNING_LIMIT || 10) && console.warn('Warning: inserting many CSS rules, you may be animating something and generating many CSS insertions, which can degrade performance. Instead, try using the "disableClassName" property on elements that change styles often. To disable this warning set TAMAGUI_STYLE_INSERTION_WARNING_LIMIT from 50000 to something higher'), total < maxToInsert;
}
export { getAllRules, getAllSelectors, insertStyleRules, scanAllSheets, setNonce, shouldInsertStyleRules, stopAccumulatingRules, updateRules };
//# sourceMappingURL=insertStyleRule.native.js.map
