import { createVariable, isVariable } from "../createVariable.native.js";
function ensureThemeVariable(theme, key) {
  var val = theme[key];
  isVariable(val) ? val.name !== key && (theme[key] = createVariable({
    key: val.name,
    name: key,
    val: val.val
  })) : theme[key] = createVariable({
    key,
    name: key,
    val
  });
}
export { ensureThemeVariable };
//# sourceMappingURL=themes.native.js.map
