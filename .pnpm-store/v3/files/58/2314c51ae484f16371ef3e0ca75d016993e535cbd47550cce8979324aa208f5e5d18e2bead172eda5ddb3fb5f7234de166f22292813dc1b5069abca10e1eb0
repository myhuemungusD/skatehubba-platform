var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var getCSSStylesAtomic_exports = {};
__export(getCSSStylesAtomic_exports, {
  getCSSStylesAtomic: () => getCSSStylesAtomic,
  getStyleAtomic: () => getStyleAtomic,
  styleToCSS: () => styleToCSS
});
module.exports = __toCommonJS(getCSSStylesAtomic_exports);
var import_helpers = require("@tamagui/helpers"), import_config = require("../config"), import_useMedia = require("../hooks/useMedia"), import_defaultOffset = require("./defaultOffset"), import_normalizeColor = require("./normalizeColor"), import_normalizeValueWithProperty = require("./normalizeValueWithProperty"), import_pseudoDescriptors = require("./pseudoDescriptors"), import_transformsToString = require("./transformsToString");
function getCSSStylesAtomic(style) {
  styleToCSS(style);
  const out = [];
  for (const key in style) {
    if (key === "$$css") continue;
    const val = style[key];
    if (key in import_pseudoDescriptors.pseudoDescriptors)
      val && out.push(...getStyleAtomic(val, import_pseudoDescriptors.pseudoDescriptors[key]));
    else if ((0, import_useMedia.isMediaKey)(key))
      for (const subKey in val) {
        const so = getStyleObject(val, subKey);
        so && (so[0] = key, out.push(so));
      }
    else {
      const so = getStyleObject(style, key);
      so && out.push(so);
    }
  }
  return out;
}
const getStyleAtomic = (style, pseudo) => {
  styleToCSS(style);
  const out = [];
  for (const key in style) {
    const so = getStyleObject(style, key, pseudo);
    so && out.push(so);
  }
  return out;
};
let conf = null;
const getStyleObject = (style, key, pseudo) => {
  let val = style[key];
  if (val == null) return;
  key === "transform" && Array.isArray(style.transform) && (val = (0, import_transformsToString.transformsToString)(val));
  const value = (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(val, key), hash = (0, import_helpers.simpleHash)(typeof value == "string" ? value : `${value}`), pseudoPrefix = pseudo ? `0${pseudo.name}-` : "";
  conf ||= (0, import_config.getConfigMaybe)();
  const identifier = `_${conf?.inverseShorthands[key] || key}-${pseudoPrefix}${hash}`, rules = createAtomicRules(identifier, key, value, pseudo);
  return [
    // array for performance
    key,
    value,
    identifier,
    pseudo?.name,
    rules
  ];
};
function styleToCSS(style) {
  const { shadowOffset, shadowRadius, shadowColor, shadowOpacity } = style;
  if (shadowRadius != null || shadowColor || shadowOffset != null || shadowOpacity != null) {
    const offset = shadowOffset || import_defaultOffset.defaultOffset, width = (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(offset.width), height = (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(offset.height), radius = (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(shadowRadius), color = (0, import_normalizeColor.normalizeColor)(shadowColor, shadowOpacity);
    if (color) {
      const shadow = `${width} ${height} ${radius} ${color}`;
      style.boxShadow = style.boxShadow ? `${style.boxShadow}, ${shadow}` : shadow;
    }
    delete style.shadowOffset, delete style.shadowRadius, delete style.shadowColor, delete style.shadowOpacity;
  }
  const { textShadowColor, textShadowOffset, textShadowRadius } = style;
  if (textShadowColor || textShadowOffset || textShadowRadius) {
    const { height, width } = textShadowOffset || import_defaultOffset.defaultOffset, radius = textShadowRadius || 0, color = (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(textShadowColor, "textShadowColor");
    if (color && (height !== 0 || width !== 0 || radius !== 0)) {
      const blurRadius = (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(radius), offsetX = (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(width), offsetY = (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(height);
      style.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
    }
    delete style.textShadowColor, delete style.textShadowOffset, delete style.textShadowRadius;
  }
}
function createDeclarationBlock(style, important = !1) {
  let next = "";
  for (const [key, value] of style)
    next += `${hyphenateStyleName(key)}:${value}${important ? " !important" : ""};`;
  return `{${next}}`;
}
const hcache = {}, toHyphenLower = (match) => `-${match.toLowerCase()}`, hyphenateStyleName = (key) => {
  if (key in hcache) return hcache[key];
  const val = key.replace(/[A-Z]/g, toHyphenLower);
  return hcache[key] = val, val;
}, selectorPriority = (() => {
  const res = {};
  for (const key in import_pseudoDescriptors.pseudoDescriptors) {
    const pseudo = import_pseudoDescriptors.pseudoDescriptors[key];
    res[pseudo.name] = `${[...Array(pseudo.priority)].map(() => ":root").join("")} `;
  }
  return res;
})();
function createAtomicRules(identifier, property, value, pseudo) {
  const pseudoIdPostfix = pseudo ? pseudo.name === "disabled" ? "[aria-disabled]" : `:${pseudo.name}` : "", pseudoSelector = pseudo?.selector;
  let selector = pseudo ? pseudoSelector ? `${pseudoSelector} .${identifier}` : `${selectorPriority[pseudo.name]} .${identifier}${pseudoIdPostfix}` : `:root .${identifier}`;
  pseudoSelector === import_pseudoDescriptors.pseudoDescriptors.enterStyle.selector && (selector = `${selector}, .${identifier}${pseudoSelector}`);
  const important = !!pseudo;
  let rules = [];
  switch (property) {
    // Equivalent to using '::placeholder'
    case "placeholderTextColor": {
      const block = createDeclarationBlock(
        [
          ["color", value],
          ["opacity", 1]
        ],
        important
      );
      rules.push(`${selector}::placeholder${block}`);
      break;
    }
    // all webkit prefixed rules
    case "backgroundClip":
    case "userSelect": {
      const webkitProperty = `Webkit${`${property[0].toUpperCase()}${property.slice(1)}`}`, block = createDeclarationBlock(
        [
          [property, value],
          [webkitProperty, value]
        ],
        important
      );
      rules.push(`${selector}${block}`);
      break;
    }
    // Polyfill for additional 'pointer-events' values
    case "pointerEvents": {
      let finalValue = value;
      value === "auto" || value === "box-only" ? (finalValue = "auto", value === "box-only" && rules.push(`${selector}>*${boxOnly}`)) : (value === "none" || value === "box-none") && (finalValue = "none", value === "box-none" && rules.push(`${selector}>*${boxNone}`));
      const block = createDeclarationBlock([["pointerEvents", finalValue]], !0);
      rules.push(`${selector}${block}`);
      break;
    }
    default: {
      const block = createDeclarationBlock([[property, value]], important);
      rules.push(`${selector}${block}`);
      break;
    }
  }
  return pseudo?.name === "hover" && (rules = rules.map((r) => `@media (hover) {${r}}`)), rules;
}
const boxNone = createDeclarationBlock([["pointerEvents", "auto"]], !0), boxOnly = createDeclarationBlock([["pointerEvents", "none"]], !0);
//# sourceMappingURL=getCSSStylesAtomic.js.map
