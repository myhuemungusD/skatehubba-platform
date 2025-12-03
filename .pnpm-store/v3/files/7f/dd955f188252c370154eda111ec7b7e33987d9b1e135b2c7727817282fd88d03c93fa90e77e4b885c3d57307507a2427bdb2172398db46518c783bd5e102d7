import { applyMask } from "./applyMask.native.js";
import { createTheme } from "./createTheme.native.js";
import { createStrengthenMask, createWeakenMask } from "./masks.native.js";
if (process.env.NODE_ENV === "development") {
  var palette = ["0", "1", "2", "3", "-3", "-2", "-1", "-0"],
    template = {
      bg: 1,
      fg: -1
    },
    stongerMask = createStrengthenMask(),
    weakerMask = createWeakenMask(),
    theme = createTheme(palette, template);
  if (theme.bg !== "1" || theme.fg !== "-1") throw "\u274C";
  var str = applyMask(theme, stongerMask);
  if (str.bg !== "0" || str.fg !== "-0") throw "\u274C";
  var weak = applyMask(theme, weakerMask);
  if (weak.bg !== "2" || weak.fg !== "-2") throw "\u274C";
  var weak2 = applyMask(theme, weakerMask, {
    strength: 2
  });
  if (weak2.bg !== "3" || weak2.fg !== "-3") throw "\u274C";
}
//# sourceMappingURL=tests.native.js.map
