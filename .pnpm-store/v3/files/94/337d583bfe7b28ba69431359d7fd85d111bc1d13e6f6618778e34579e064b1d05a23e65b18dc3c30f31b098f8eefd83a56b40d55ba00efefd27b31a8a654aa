"use strict";

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
var index_exports = {};
__export(index_exports, {
  config: () => config,
  configWithoutAnimations: () => import_config2.configWithoutAnimations
});
module.exports = __toCommonJS(index_exports);
var import_themes = require("@tamagui/themes"),
  import_animations = require("./animations.native.js"),
  import_config = require("./config.native.js"),
  import_config2 = require("./config.native.js");
__reExport(index_exports, require("./media.native.js"), module.exports);
__reExport(index_exports, require("./createGenericFont.native.js"), module.exports);
__reExport(index_exports, require("./animations.native.js"), module.exports);
var config = {
  ...import_config.configWithoutAnimations,
  // fixes typescript exporting this using internal /types/ path
  themes: import_themes.themes,
  animations: import_animations.animations
};
//# sourceMappingURL=index.native.js.map
