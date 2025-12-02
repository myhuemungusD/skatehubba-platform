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
var getThemeCSSRules_exports = {};
__export(getThemeCSSRules_exports, {
  getThemeCSSRules: () => getThemeCSSRules
});
module.exports = __toCommonJS(getThemeCSSRules_exports);
var import_helpers = require("@tamagui/helpers"),
  import_config = require("../config.cjs"),
  import_constants = require("../constants/constants.cjs"),
  import_createVariable = require("../createVariable.cjs"),
  import_registerCSSVariable = require("./registerCSSVariable.cjs"),
  import_sortString = require("./sortString.cjs");
const darkLight = ["dark", "light"],
  lightDark = ["light", "dark"];
function getThemeCSSRules(props) {
  const cssRuleSets = [];
  if (!process.env.TAMAGUI_DOES_SSR_CSS || process.env.TAMAGUI_DOES_SSR_CSS === "mutates-themes" || process.env.TAMAGUI_DOES_SSR_CSS === "false") {
    const {
        config,
        themeName,
        theme,
        names
      } = props,
      hasDarkLight = props.hasDarkLight ?? (config.themes && ("light" in config.themes || "dark" in config.themes)),
      CNP = `.${import_constants.THEME_CLASSNAME_PREFIX}`;
    let vars = "";
    for (const themeKey in theme) {
      const variable = theme[themeKey];
      let value = null;
      import_registerCSSVariable.tokensValueToVariable.has(variable.val) ? value = import_registerCSSVariable.tokensValueToVariable.get(variable.val).variable : value = variable.val, vars += `--${process.env.TAMAGUI_CSS_VARIABLE_PREFIX || ""}${(0, import_helpers.simpleHash)(themeKey, 40)}:${value};`;
    }
    const isDarkBase = themeName === "dark",
      isLightBase = themeName === "light",
      baseSelectors = names.map(name => `${CNP}${name}`),
      selectorsSet = new Set(isDarkBase || isLightBase ? baseSelectors : []);
    if (hasDarkLight) {
      const maxDepth = (0, import_config.getSetting)("maxDarkLightNesting") ?? 3;
      for (const subName of names) {
        const isDark = isDarkBase || subName.startsWith("dark_"),
          isLight = !isDark && (isLightBase || subName.startsWith("light_"));
        if (!(isDark || isLight)) {
          selectorsSet.add(`${CNP}${subName}`);
          continue;
        }
        const childSelector = `${CNP}${subName.replace(/^(dark|light)_/, "")}`,
          order = isDark ? darkLight : lightDark,
          [stronger, weaker] = order,
          numSelectors = Math.round(maxDepth * 1.5);
        for (let depth = 0; depth < numSelectors; depth++) {
          const isOdd = depth % 2 === 1;
          if (isOdd && depth < 3) continue;
          const parents = new Array(depth + 1).fill(0).map((_, idx) => `${CNP}${idx % 2 === 0 ? stronger : weaker}`);
          let parentSelectors = parents.length > 1 ? parents.slice(1) : parents;
          if (isOdd) {
            const [_first, second, ...rest] = parentSelectors;
            parentSelectors = [second, ...rest, second];
          }
          const lastParentSelector = parentSelectors[parentSelectors.length - 1],
            nextChildSelector = childSelector === lastParentSelector ? "" : childSelector,
            parentSelectorString = parentSelectors.join(" ");
          selectorsSet.add(`${parentSelectorString} ${nextChildSelector}`);
        }
      }
    }
    const selectors = [...selectorsSet].sort(import_sortString.sortString),
      css = `${selectors.map(x => `:root${isBaseTheme(x) && (0, import_config.getSetting)("themeClassNameOnRoot") ? "" : " "}${x}`).join(", ") + ", .tm_xxt"} {${vars}}`;
    if (cssRuleSets.push(css), (0, import_config.getSetting)("shouldAddPrefersColorThemes")) {
      const bgString = theme.background ? `background:${(0, import_createVariable.variableToString)(theme.background)};` : "",
        fgString = theme.color ? `color:${(0, import_createVariable.variableToString)(theme.color)}` : "",
        bodyRules = `body{${bgString}${fgString}}`,
        isDark = themeName.startsWith("dark"),
        baseName = isDark ? "dark" : "light",
        themeRules = `${selectors.map(x => {
          if (x == darkSelector || x === lightSelector) return ":root";
          if (!(isDark && x.startsWith(lightSelector) || !isDark && x.startsWith(darkSelector))) return x.replace(/^\.t_(dark|light) /, "").trim();
        }).filter(Boolean).join(", ")} {${vars}}`,
        prefersMediaSelectors = `@media(prefers-color-scheme:${baseName}){
    ${bodyRules}
    ${themeRules}
  }`;
      cssRuleSets.push(prefersMediaSelectors);
    }
    const selectionStyles = (0, import_config.getSetting)("selectionStyles");
    if (selectionStyles) {
      const rules = selectionStyles(theme);
      if (rules) {
        const selectionSelectors = baseSelectors.map(s => `${s} ::selection`).join(", "),
          styles = Object.entries(rules).flatMap(([k, v]) => v ? `${k === "backgroundColor" ? "background" : k}:${(0, import_createVariable.variableToString)(v)}` : []).join(";");
        if (styles) {
          const css2 = `${selectionSelectors}{${styles}}`;
          cssRuleSets.push(css2);
        }
      }
    }
  }
  return cssRuleSets;
}
const darkSelector = ".t_dark",
  lightSelector = ".t_light",
  isBaseTheme = x => x === darkSelector || x === lightSelector || x.startsWith(".t_dark ") || x.startsWith(".t_light ");