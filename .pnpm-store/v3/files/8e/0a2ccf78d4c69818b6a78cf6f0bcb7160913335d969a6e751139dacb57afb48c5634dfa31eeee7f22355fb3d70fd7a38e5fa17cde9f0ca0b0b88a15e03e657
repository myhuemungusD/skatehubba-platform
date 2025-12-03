import { isClient } from "@tamagui/constants";
import { StyleObjectIdentifier, StyleObjectRules } from "@tamagui/helpers";
import { createVariable } from "../createVariable";
const scannedCache = /* @__PURE__ */ new WeakMap(), totalSelectorsInserted = /* @__PURE__ */ new Map(), allSelectors = {}, allRules = {}, getAllSelectors = () => allSelectors, getAllRules = () => Object.values(allRules);
let lastScannedSheets = null;
function scanAllSheets(collectThemes = !1, tokens) {
  if (process.env.NODE_ENV === "test" || !isClient) return;
  let themes;
  const sheets = document.styleSheets || [], prev = lastScannedSheets, current = new Set(sheets);
  for (const sheet2 of current)
    if (sheet2) {
      const out = updateSheetStyles(sheet2, !1, collectThemes, tokens);
      out && (themes = out);
    }
  if (lastScannedSheets = current, prev)
    for (const sheet2 of prev)
      sheet2 && !current.has(sheet2) && updateSheetStyles(sheet2, !0);
  return themes;
}
function trackInsertedStyle(id) {
  const next = (totalSelectorsInserted.get(id) || 0) + 1;
  return totalSelectorsInserted.set(id, next), next;
}
const bailAfterEnv = process.env.TAMAGUI_BAIL_AFTER_SCANNING_X_CSS_RULES, bailAfter = bailAfterEnv ? +bailAfterEnv : 400;
function updateSheetStyles(sheet2, remove = !1, collectThemes = !1, tokens) {
  let rules;
  try {
    if (rules = sheet2.cssRules, !rules)
      return;
  } catch {
    return;
  }
  const firstSelector = getTamaguiSelector(rules[0], collectThemes)?.[0], lastSelector = getTamaguiSelector(rules[rules.length - 1], collectThemes)?.[0], cacheKey = `${rules.length}${firstSelector}${lastSelector}`, lastScanned = scannedCache.get(sheet2);
  if (!remove && lastScanned === cacheKey)
    return;
  const len = rules.length;
  let fails = 0, dedupedThemes;
  const nameToTheme = {};
  for (let i = 0; i < len; i++) {
    const rule = rules[i];
    if (!(rule instanceof CSSStyleRule)) continue;
    const response = getTamaguiSelector(rule, collectThemes);
    if (response)
      fails = 0;
    else {
      if (fails++, fails > bailAfter)
        return;
      continue;
    }
    const [identifier, cssRule, isTheme] = response;
    if (isTheme) {
      const deduped = addThemesFromCSS(cssRule, tokens);
      if (deduped) {
        for (const name of deduped.names)
          nameToTheme[name] ? (Object.apply(nameToTheme[name], deduped.theme), deduped.names = deduped.names.filter((x) => x !== name)) : nameToTheme[name] = deduped.theme;
        dedupedThemes ||= [], dedupedThemes.push(deduped);
      }
      continue;
    }
  }
  return scannedCache.set(sheet2, cacheKey), dedupedThemes;
}
let colorVarToVal, rootComputedStyle = null;
function addThemesFromCSS(cssStyleRule, tokens) {
  const selectors = cssStyleRule.selectorText.split(",");
  if (!selectors.length) return;
  if (tokens?.color && !colorVarToVal) {
    colorVarToVal = {};
    for (const key in tokens.color) {
      const token = tokens.color[key];
      colorVarToVal[token.name] = token.val;
    }
  }
  const rules = (cssStyleRule.cssText || "").slice(
    cssStyleRule.selectorText.length + 2,
    -1
  ).split(";"), values = {};
  for (const rule of rules) {
    const sepI = rule.indexOf(":");
    if (sepI === -1) continue;
    const varIndex = rule.indexOf("--");
    let key = rule.slice(varIndex === -1 ? 0 : varIndex + 2, sepI);
    process.env.TAMAGUI_CSS_VARIABLE_PREFIX && (key = key.replace(process.env.TAMAGUI_CSS_VARIABLE_PREFIX, ""));
    const val = rule.slice(sepI + 2);
    let value;
    if (val[0] === "v" && val.startsWith("var(")) {
      const varName = val.slice(6, -1), tokenVal = colorVarToVal[varName];
      tokenVal ? value = tokenVal : (rootComputedStyle ||= getComputedStyle(document.body), value = rootComputedStyle.getPropertyValue("--" + varName));
    } else
      value = val;
    values[key] = createVariable(
      {
        key,
        name: key,
        val: value
      },
      !0
    );
  }
  const names = /* @__PURE__ */ new Set();
  for (const selector of selectors) {
    if (selector === " .tm_xxt") continue;
    const lastThemeSelectorIndex = selector.lastIndexOf(".t_"), name = selector.slice(lastThemeSelectorIndex).slice(3), [schemeChar] = selector[lastThemeSelectorIndex - 5], scheme = schemeChar === "d" ? "dark" : schemeChar === "i" ? "light" : "", themeName = scheme && scheme !== name ? `${scheme}_${name}` : name;
    !themeName || themeName === "light_dark" || themeName === "dark_light" || names.add(themeName);
  }
  return {
    names: [...names],
    theme: values
  };
}
const tamaguiSelectorRegex = /\.tm_xxt/;
function getTamaguiSelector(rule, collectThemes = !1) {
  if (rule instanceof CSSStyleRule) {
    const text = rule.selectorText;
    if (text[0] === ":" && text[1] === "r" && tamaguiSelectorRegex.test(text)) {
      const id = getIdentifierFromTamaguiSelector(
        // next.js minifies it so its in front
        text.replace(tamaguiSelectorRegex, "")
      );
      return collectThemes ? [id, rule, !0] : [id, rule];
    }
  } else if (rule instanceof CSSMediaRule)
    return rule.cssRules.length > 1 ? void 0 : getTamaguiSelector(rule.cssRules[0]);
}
const getIdentifierFromTamaguiSelector = (selector) => {
  const dotIndex = selector.indexOf(":");
  return dotIndex > -1 ? selector.slice(7, dotIndex) : selector.slice(7);
};
let sheet = null, trackAllRules = !0;
function stopAccumulatingRules() {
  trackAllRules = !1;
}
function updateRules(identifier, rules) {
  return trackAllRules && (allRules[identifier] = rules.join(" ")), !0;
}
let nonce = "";
function setNonce(_) {
  nonce = _;
}
function insertStyleRules(rulesToInsert) {
  if (isClient) {
    if (!sheet && document.head) {
      const styleTag = document.createElement("style");
      styleTag.id = "_tamagui-styles", nonce && (styleTag.nonce = nonce), sheet = document.head.appendChild(styleTag).sheet;
    }
    if (sheet)
      for (const key in rulesToInsert) {
        const styleObject = rulesToInsert[key], identifier = styleObject[StyleObjectIdentifier];
        if (!shouldInsertStyleRules(identifier))
          continue;
        const rules = styleObject[StyleObjectRules];
        allSelectors[identifier] = rules.join(`
`), trackInsertedStyle(identifier), updateRules(identifier, rules);
        try {
          for (const rule of rules)
            sheet.insertRule(rule, sheet.cssRules.length), identifier === "_dsp-_groupframe-maxMd_none" && console.warn("INSERT", rule);
        } catch {
          process.env.NODE_ENV === "production" && console.error("Error inserting style rule", rules);
        }
      }
  }
}
const maxToInsert = process.env.TAMAGUI_INSERT_SELECTOR_TRIES ? +process.env.TAMAGUI_INSERT_SELECTOR_TRIES : 1;
function shouldInsertStyleRules(identifier) {
  if (process.env.IS_STATIC === "is_static")
    return !0;
  const total = totalSelectorsInserted.get(identifier) || 0;
  return process.env.NODE_ENV === "development" && total > +(process.env.TAMAGUI_STYLE_INSERTION_WARNING_LIMIT || 10) && console.warn(
    'Warning: inserting many CSS rules, you may be animating something and generating many CSS insertions, which can degrade performance. Instead, try using the "disableClassName" property on elements that change styles often. To disable this warning set TAMAGUI_STYLE_INSERTION_WARNING_LIMIT from 50000 to something higher'
  ), total < maxToInsert;
}
export {
  getAllRules,
  getAllSelectors,
  insertStyleRules,
  scanAllSheets,
  setNonce,
  shouldInsertStyleRules,
  stopAccumulatingRules,
  updateRules
};
//# sourceMappingURL=insertStyleRule.js.map
