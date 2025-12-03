import { simpleHash } from "@tamagui/helpers";
import { getConfigMaybe } from "../config.mjs";
import { isMediaKey } from "../hooks/useMedia.mjs";
import { defaultOffset } from "./defaultOffset.mjs";
import { normalizeColor } from "./normalizeColor.mjs";
import { normalizeValueWithProperty } from "./normalizeValueWithProperty.mjs";
import { pseudoDescriptors } from "./pseudoDescriptors.mjs";
import { transformsToString } from "./transformsToString.mjs";
function getCSSStylesAtomic(style) {
  styleToCSS(style);
  const out = [];
  for (const key in style) {
    if (key === "$$css") continue;
    const val = style[key];
    if (key in pseudoDescriptors) val && out.push(...getStyleAtomic(val, pseudoDescriptors[key]));else if (isMediaKey(key)) for (const subKey in val) {
      const so = getStyleObject(val, subKey);
      so && (so[0] = key, out.push(so));
    } else {
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
  key === "transform" && Array.isArray(style.transform) && (val = transformsToString(val));
  const value = normalizeValueWithProperty(val, key),
    hash = simpleHash(typeof value == "string" ? value : `${value}`),
    pseudoPrefix = pseudo ? `0${pseudo.name}-` : "";
  conf ||= getConfigMaybe();
  const identifier = `_${conf?.inverseShorthands[key] || key}-${pseudoPrefix}${hash}`,
    rules = createAtomicRules(identifier, key, value, pseudo);
  return [
  // array for performance
  key, value, identifier, pseudo?.name, rules];
};
function styleToCSS(style) {
  const {
    shadowOffset,
    shadowRadius,
    shadowColor,
    shadowOpacity
  } = style;
  if (shadowRadius != null || shadowColor || shadowOffset != null || shadowOpacity != null) {
    const offset = shadowOffset || defaultOffset,
      width = normalizeValueWithProperty(offset.width),
      height = normalizeValueWithProperty(offset.height),
      radius = normalizeValueWithProperty(shadowRadius),
      color = normalizeColor(shadowColor, shadowOpacity);
    if (color) {
      const shadow = `${width} ${height} ${radius} ${color}`;
      style.boxShadow = style.boxShadow ? `${style.boxShadow}, ${shadow}` : shadow;
    }
    delete style.shadowOffset, delete style.shadowRadius, delete style.shadowColor, delete style.shadowOpacity;
  }
  const {
    textShadowColor,
    textShadowOffset,
    textShadowRadius
  } = style;
  if (textShadowColor || textShadowOffset || textShadowRadius) {
    const {
        height,
        width
      } = textShadowOffset || defaultOffset,
      radius = textShadowRadius || 0,
      color = normalizeValueWithProperty(textShadowColor, "textShadowColor");
    if (color && (height !== 0 || width !== 0 || radius !== 0)) {
      const blurRadius = normalizeValueWithProperty(radius),
        offsetX = normalizeValueWithProperty(width),
        offsetY = normalizeValueWithProperty(height);
      style.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
    }
    delete style.textShadowColor, delete style.textShadowOffset, delete style.textShadowRadius;
  }
}
function createDeclarationBlock(style, important = !1) {
  let next = "";
  for (const [key, value] of style) next += `${hyphenateStyleName(key)}:${value}${important ? " !important" : ""};`;
  return `{${next}}`;
}
const hcache = {},
  toHyphenLower = match => `-${match.toLowerCase()}`,
  hyphenateStyleName = key => {
    if (key in hcache) return hcache[key];
    const val = key.replace(/[A-Z]/g, toHyphenLower);
    return hcache[key] = val, val;
  },
  selectorPriority = (() => {
    const res = {};
    for (const key in pseudoDescriptors) {
      const pseudo = pseudoDescriptors[key];
      res[pseudo.name] = `${[...Array(pseudo.priority)].map(() => ":root").join("")} `;
    }
    return res;
  })();
function createAtomicRules(identifier, property, value, pseudo) {
  const pseudoIdPostfix = pseudo ? pseudo.name === "disabled" ? "[aria-disabled]" : `:${pseudo.name}` : "",
    pseudoSelector = pseudo?.selector;
  let selector = pseudo ? pseudoSelector ? `${pseudoSelector} .${identifier}` : `${selectorPriority[pseudo.name]} .${identifier}${pseudoIdPostfix}` : `:root .${identifier}`;
  pseudoSelector === pseudoDescriptors.enterStyle.selector && (selector = `${selector}, .${identifier}${pseudoSelector}`);
  const important = !!pseudo;
  let rules = [];
  switch (property) {
    // Equivalent to using '::placeholder'
    case "placeholderTextColor":
      {
        const block = createDeclarationBlock([["color", value], ["opacity", 1]], important);
        rules.push(`${selector}::placeholder${block}`);
        break;
      }
    // all webkit prefixed rules
    case "backgroundClip":
    case "userSelect":
      {
        const webkitProperty = `Webkit${`${property[0].toUpperCase()}${property.slice(1)}`}`,
          block = createDeclarationBlock([[property, value], [webkitProperty, value]], important);
        rules.push(`${selector}${block}`);
        break;
      }
    // Polyfill for additional 'pointer-events' values
    case "pointerEvents":
      {
        let finalValue = value;
        value === "auto" || value === "box-only" ? (finalValue = "auto", value === "box-only" && rules.push(`${selector}>*${boxOnly}`)) : (value === "none" || value === "box-none") && (finalValue = "none", value === "box-none" && rules.push(`${selector}>*${boxNone}`));
        const block = createDeclarationBlock([["pointerEvents", finalValue]], !0);
        rules.push(`${selector}${block}`);
        break;
      }
    default:
      {
        const block = createDeclarationBlock([[property, value]], important);
        rules.push(`${selector}${block}`);
        break;
      }
  }
  return pseudo?.name === "hover" && (rules = rules.map(r => `@media (hover) {${r}}`)), rules;
}
const boxNone = createDeclarationBlock([["pointerEvents", "auto"]], !0),
  boxOnly = createDeclarationBlock([["pointerEvents", "none"]], !0);
export { getCSSStylesAtomic, getStyleAtomic, styleToCSS };
//# sourceMappingURL=getCSSStylesAtomic.mjs.map
