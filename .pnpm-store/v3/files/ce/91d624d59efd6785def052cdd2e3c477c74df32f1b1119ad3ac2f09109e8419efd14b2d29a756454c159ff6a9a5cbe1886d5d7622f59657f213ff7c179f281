const mergeVariants = (parentVariants, ourVariants, level = 0) => {
  const variants = {};
  for (const key in ourVariants) {
    const parentVariant = parentVariants?.[key], ourVariant = ourVariants[key];
    !parentVariant || typeof ourVariant == "function" ? variants[key] = ourVariant : parentVariant && !ourVariant ? variants[key] = parentVariant[key] : level === 0 ? variants[key] = mergeVariants(
      parentVariant,
      ourVariant,
      level + 1
    ) : variants[key] = {
      ...parentVariant,
      ...ourVariant
    };
  }
  return {
    ...parentVariants,
    ...variants
  };
};
export {
  mergeVariants
};
//# sourceMappingURL=mergeVariants.js.map
