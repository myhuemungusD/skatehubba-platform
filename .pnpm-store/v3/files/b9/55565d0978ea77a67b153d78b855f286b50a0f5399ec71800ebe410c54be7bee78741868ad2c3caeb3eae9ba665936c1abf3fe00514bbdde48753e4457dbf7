import { applyMaskStateless } from "./applyMask";
import { getThemeInfo } from "./themeInfo";
const combineMasks = (...masks) => ({
  name: "combine-mask",
  mask: (template, opts) => {
    let current = getThemeInfo(template, opts.parentName), theme;
    for (const mask2 of masks) {
      if (!current)
        throw new Error(
          `Nothing returned from mask: ${current}, for template: ${template} and mask: ${mask2.toString()}, given opts ${JSON.stringify(
            opts,
            null,
            2
          )}`
        );
      const next = applyMaskStateless(current, mask2, opts);
      current = next, theme = next.theme;
    }
    return theme;
  }
});
export {
  combineMasks
};
//# sourceMappingURL=combineMasks.js.map
