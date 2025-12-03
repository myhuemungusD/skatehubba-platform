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
  };
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var mergeVariants_exports = {};
__export(mergeVariants_exports, {
  mergeVariants: () => mergeVariants
});
module.exports = __toCommonJS(mergeVariants_exports);
var mergeVariants = function (parentVariants, ourVariants) {
  var level = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0,
    variants = {};
  for (var key in ourVariants) {
    var parentVariant = parentVariants?.[key],
      ourVariant = ourVariants[key];
    !parentVariant || typeof ourVariant == "function" ? variants[key] = ourVariant : parentVariant && !ourVariant ? variants[key] = parentVariant[key] : level === 0 ? variants[key] = mergeVariants(parentVariant, ourVariant, level + 1) : variants[key] = {
      ...parentVariant,
      ...ourVariant
    };
  }
  return {
    ...parentVariants,
    ...variants
  };
};
//# sourceMappingURL=mergeVariants.native.js.map
