import { setConfigFont } from "./config.mjs";
import { FONT_DATA_ATTRIBUTE_NAME } from "./constants/constants.mjs";
import { createFont } from "./createFont.mjs";
import { createVariables } from "./createVariables.mjs";
import { registerCSSVariable, variableToCSS } from "./helpers/registerCSSVariable.mjs";
function insertFont(name, fontIn) {
  const font = createFont(fontIn),
    tokened = createVariables(font, name),
    parsed = parseFont(tokened);
  if (typeof document < "u") {
    const fontVars = registerFontVariables(parsed),
      styleElement = document.querySelector(`style[${FONT_DATA_ATTRIBUTE_NAME}="${name}"]`) || document.createElement("style");
    styleElement.innerText = `:root .font_${name} {${fontVars.join(";")}}`, styleElement.setAttribute(FONT_DATA_ATTRIBUTE_NAME, name), document.head.appendChild(styleElement);
  }
  return setConfigFont(name, tokened, parsed), parsed;
}
const updateFont = insertFont;
function parseFont(definition) {
  const parsed = {};
  for (const attrKey in definition) {
    const attr = definition[attrKey];
    if (attrKey === "family" || attrKey === "face") parsed[attrKey] = attr;else {
      parsed[attrKey] = {};
      for (const key in attr) {
        let val = attr[key];
        val.val?.[0] === "$" && (val = val.val), parsed[attrKey][`$${key}`] = val;
      }
    }
  }
  return parsed;
}
function registerFontVariables(parsedFont) {
  const response = [];
  for (const fkey in parsedFont) if (fkey !== "face") {
    if (fkey === "family") {
      const val = parsedFont[fkey];
      registerCSSVariable(val), response.push(variableToCSS(val));
    } else for (const fskey in parsedFont[fkey]) if (typeof parsedFont[fkey][fskey] != "string") {
      const val = parsedFont[fkey][fskey];
      registerCSSVariable(val), response.push(variableToCSS(val));
    }
  }
  return response;
}
export { insertFont, parseFont, registerFontVariables, updateFont };
//# sourceMappingURL=insertFont.mjs.map
