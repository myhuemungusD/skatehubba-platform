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
  },
  __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var index_reanimated_exports = {};
__export(index_reanimated_exports, {
  config: () => config
});
module.exports = __toCommonJS(index_reanimated_exports);
var import_animations = require("./animations.reanimated"),
  import_config = require("./config.cjs");
__reExport(index_reanimated_exports, require("./media.cjs"), module.exports);
__reExport(index_reanimated_exports, require("./createGenericFont.cjs"), module.exports);
__reExport(index_reanimated_exports, require("./animations.reanimated"), module.exports);
const config = {
  ...import_config.configWithoutAnimations,
  animations: import_animations.animations
};