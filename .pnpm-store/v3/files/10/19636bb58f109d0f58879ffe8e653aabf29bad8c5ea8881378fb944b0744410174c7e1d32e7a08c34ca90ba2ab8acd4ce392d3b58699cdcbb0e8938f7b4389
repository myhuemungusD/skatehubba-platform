import { setConfigFont } from "./config.native.js";
import "./constants/constants.native.js";
import { createFont } from "./createFont.native.js";
import { createVariables } from "./createVariables.native.js";
import { registerCSSVariable, variableToCSS } from "./helpers/registerCSSVariable.native.js";
function insertFont(name, fontIn) {
  var font = createFont(fontIn),
    tokened = createVariables(font, name),
    parsed = parseFont(tokened);
  if (0) var fontVars, styleElement;
  return setConfigFont(name, tokened, parsed), parsed;
}
var updateFont = insertFont;
function parseFont(definition) {
  var parsed = {};
  for (var attrKey in definition) {
    var attr = definition[attrKey];
    if (attrKey === "family" || attrKey === "face") parsed[attrKey] = attr;else {
      parsed[attrKey] = {};
      for (var key in attr) {
        var _val_val,
          val = attr[key];
        ((_val_val = val.val) === null || _val_val === void 0 ? void 0 : _val_val[0]) === "$" && (val = val.val), parsed[attrKey][`$${key}`] = val;
      }
    }
  }
  return parsed;
}
function registerFontVariables(parsedFont) {
  var response = [];
  for (var fkey in parsedFont) if (fkey !== "face") if (fkey === "family") {
    var val = parsedFont[fkey];
    registerCSSVariable(val), response.push(variableToCSS(val));
  } else for (var fskey in parsedFont[fkey]) {
    var fval = parsedFont[fkey][fskey];
    if (typeof fval != "string") {
      var val1 = parsedFont[fkey][fskey];
      registerCSSVariable(val1), response.push(variableToCSS(val1));
    }
  }
  return response;
}
export { insertFont, parseFont, registerFontVariables, updateFont };
//# sourceMappingURL=insertFont.native.js.map
