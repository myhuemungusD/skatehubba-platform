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
export { mergeVariants };
//# sourceMappingURL=mergeVariants.native.js.map
