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
var combineMasks_exports = {};
__export(combineMasks_exports, {
  combineMasks: () => combineMasks
});
module.exports = __toCommonJS(combineMasks_exports);
var import_applyMask = require("./applyMask"), import_themeInfo = require("./themeInfo");
const combineMasks = (...masks) => ({
  name: "combine-mask",
  mask: (template, opts) => {
    let current = (0, import_themeInfo.getThemeInfo)(template, opts.parentName), theme;
    for (const mask2 of masks) {
      if (!current)
        throw new Error(
          `Nothing returned from mask: ${current}, for template: ${template} and mask: ${mask2.toString()}, given opts ${JSON.stringify(
            opts,
            null,
            2
          )}`
        );
      const next = (0, import_applyMask.applyMaskStateless)(current, mask2, opts);
      current = next, theme = next.theme;
    }
    return theme;
  }
});
//# sourceMappingURL=combineMasks.js.map
