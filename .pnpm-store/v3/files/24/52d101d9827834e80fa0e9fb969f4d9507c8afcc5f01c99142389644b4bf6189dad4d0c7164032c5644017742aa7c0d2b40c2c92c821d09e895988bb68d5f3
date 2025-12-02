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
var createMediaStyle_exports = {};
__export(createMediaStyle_exports, {
  MEDIA_SEP: () => MEDIA_SEP,
  createMediaStyle: () => createMediaStyle
});
module.exports = __toCommonJS(createMediaStyle_exports);
var import_config = require("../config.cjs"),
  import_useMedia = require("../hooks/useMedia.cjs"),
  import_getGroupPropParts = require("./getGroupPropParts.cjs");
const MEDIA_SEP = "_";
let prefixes = null,
  selectors = null;
const groupPseudoToPseudoCSSMap = {
    press: "active",
    focusVisible: "focus-visible",
    focusWithin: "focus-within"
  },
  specificities = new Array(5).fill(0).map((_, i) => new Array(i).fill(":root").join(""));
function getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme = !1, precedenceImportancePrefix = "") {
  const selectorStart = styleInner.lastIndexOf(":root") + 5,
    selectorEnd = styleInner.lastIndexOf("{"),
    selector = styleInner.slice(selectorStart, selectorEnd),
    precedenceSpace = (0, import_config.getSetting)("themeClassNameOnRoot") && isTheme ? "" : " ",
    pseudoSelectorName = groupParts.pseudo ? groupPseudoToPseudoCSSMap[groupParts.pseudo] || groupParts.pseudo : void 0,
    pseudoSelector = pseudoSelectorName ? `:${pseudoSelectorName}` : "",
    presedencePrefix = `:root${precedenceImportancePrefix}${precedenceSpace}`,
    mediaSelector = `.t_${isGroup ? "group_" : ""}${name}${pseudoSelector}`;
  return [selector, `${presedencePrefix}${mediaSelector} ${selector.replaceAll(":root", "")}`];
}
const createMediaStyle = (styleObject, mediaKeyIn, mediaQueries, type, negate, priority) => {
  const [propertyIn,, identifier, pseudoIn, rules] = styleObject;
  let property = propertyIn;
  const enableMediaPropOrder = (0, import_config.getSetting)("mediaPropOrder"),
    isTheme = type === "theme",
    isPlatform = type === "platform",
    isGroup = type === "group",
    isNonWindowMedia = isTheme || isPlatform || isGroup,
    negKey = negate ? "0" : "",
    ogPrefix = identifier.slice(0, identifier.indexOf("-") + 1),
    id = `${ogPrefix}${MEDIA_SEP}${mediaKeyIn.replace("-", "")}${negKey}${MEDIA_SEP}`;
  let styleRule = "",
    groupPriority = "",
    groupMediaKey,
    containerName,
    nextIdentifier = identifier.replace(ogPrefix, id),
    styleInner = rules.map(rule => rule.replace(identifier, nextIdentifier)).join(";"),
    isHover = !1;
  if (isNonWindowMedia) {
    let specificity = (priority || 0) + (isGroup || isPlatform ? 1 : 0);
    if (isTheme || isGroup) {
      const groupParts = (0, import_getGroupPropParts.getGroupPropParts)(isTheme ? "theme-" + mediaKeyIn : mediaKeyIn),
        {
          name,
          media,
          pseudo
        } = groupParts;
      groupMediaKey = media, isGroup && (containerName = name), (pseudo === "press" || pseudoIn === "active") && (specificity += 2), pseudo === "hover" && (isHover = !0);
      const [selector, nextSelector] = getThemeOrGroupSelector(name, styleInner, isGroup, groupParts, isTheme, specificities[specificity]);
      styleRule = styleInner.replace(selector, nextSelector);
    } else styleRule = `${specificities[specificity]}${styleInner}`;
  }
  if (!isNonWindowMedia || groupMediaKey) {
    if (!selectors) {
      const mediaKeys = Object.keys(mediaQueries);
      selectors = Object.fromEntries(mediaKeys.map(key => [key, (0, import_useMedia.mediaObjectToString)(mediaQueries[key])])), enableMediaPropOrder || (prefixes = Object.fromEntries(mediaKeys.map((k, index) => [k, new Array(index + 1).fill(":root").join("")])));
    }
    const mediaKey = groupMediaKey || mediaKeyIn,
      mediaSelector = selectors[mediaKey],
      mediaQuery = `${negate ? "not all and " : ""}${mediaSelector}`,
      precedenceImportancePrefix = groupMediaKey ? groupPriority : enableMediaPropOrder && priority ?
      // this new array should be cached
      specificities[priority] :
      // @ts-ignore
      prefixes[mediaKey],
      prefix = groupMediaKey ? `@container ${containerName}` : "@media";
    groupMediaKey && (styleInner = styleRule), styleInner.includes(prefix) ? styleRule = styleInner.replace("{", ` and ${mediaQuery} {`).replace("and screen and", "and") : styleRule = `${prefix} ${mediaQuery}{${precedenceImportancePrefix}${styleInner}}`, groupMediaKey && (styleRule = `@supports (contain: ${(0, import_config.getSetting)("webContainerType") || "inline-size"}) {${styleRule}}`);
  }
  return isHover && (styleRule = `@media (hover:hover){${styleRule}}`), [property, void 0, nextIdentifier, void 0, [styleRule]];
};