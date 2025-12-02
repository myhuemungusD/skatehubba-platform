var import_applyMask = require("./applyMask"), import_createTheme = require("./createTheme"), import_masks = require("./masks");
if (process.env.NODE_ENV === "development") {
  const palette = ["0", "1", "2", "3", "-3", "-2", "-1", "-0"], template = { bg: 1, fg: -1 }, stongerMask = (0, import_masks.createStrengthenMask)(), weakerMask = (0, import_masks.createWeakenMask)(), theme = (0, import_createTheme.createTheme)(palette, template);
  if (theme.bg !== "1" || theme.fg !== "-1") throw "\u274C";
  const str = (0, import_applyMask.applyMask)(theme, stongerMask);
  if (str.bg !== "0" || str.fg !== "-0") throw "\u274C";
  const weak = (0, import_applyMask.applyMask)(theme, weakerMask);
  if (weak.bg !== "2" || weak.fg !== "-2") throw "\u274C";
  const weak2 = (0, import_applyMask.applyMask)(theme, weakerMask, { strength: 2 });
  if (weak2.bg !== "3" || weak2.fg !== "-3") throw "\u274C";
}
//# sourceMappingURL=tests.js.map
