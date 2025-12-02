import { getSetting } from "../config.mjs";
import { mediaObjectToString } from "../hooks/useMedia.mjs";
import { getGroupPropParts } from "./getGroupPropParts.mjs";
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
    precedenceSpace = getSetting("themeClassNameOnRoot") && isTheme ? "" : " ",
    pseudoSelectorName = groupParts.pseudo ? groupPseudoToPseudoCSSMap[groupParts.pseudo] || groupParts.pseudo : void 0,
    pseudoSelector = pseudoSelectorName ? `:${pseudoSelectorName}` : "",
    presedencePrefix = `:root${precedenceImportancePrefix}${precedenceSpace}`,
    mediaSelector = `.t_${isGroup ? "group_" : ""}${name}${pseudoSelector}`;
  return [selector, `${presedencePrefix}${mediaSelector} ${selector.replaceAll(":root", "")}`];
}
const createMediaStyle = (styleObject, mediaKeyIn, mediaQueries, type, negate, priority) => {
  const [propertyIn,, identifier, pseudoIn, rules] = styleObject;
  let property = propertyIn;
  const enableMediaPropOrder = getSetting("mediaPropOrder"),
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
      const groupParts = getGroupPropParts(isTheme ? "theme-" + mediaKeyIn : mediaKeyIn),
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
      selectors = Object.fromEntries(mediaKeys.map(key => [key, mediaObjectToString(mediaQueries[key])])), enableMediaPropOrder || (prefixes = Object.fromEntries(mediaKeys.map((k, index) => [k, new Array(index + 1).fill(":root").join("")])));
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
    groupMediaKey && (styleInner = styleRule), styleInner.includes(prefix) ? styleRule = styleInner.replace("{", ` and ${mediaQuery} {`).replace("and screen and", "and") : styleRule = `${prefix} ${mediaQuery}{${precedenceImportancePrefix}${styleInner}}`, groupMediaKey && (styleRule = `@supports (contain: ${getSetting("webContainerType") || "inline-size"}) {${styleRule}}`);
  }
  return isHover && (styleRule = `@media (hover:hover){${styleRule}}`), [property, void 0, nextIdentifier, void 0, [styleRule]];
};
export { MEDIA_SEP, createMediaStyle };
//# sourceMappingURL=createMediaStyle.mjs.map
