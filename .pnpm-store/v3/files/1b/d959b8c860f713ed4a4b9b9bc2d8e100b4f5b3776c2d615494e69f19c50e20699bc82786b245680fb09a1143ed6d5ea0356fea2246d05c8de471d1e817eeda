import { combineMasks, createIdentityMask, createInverseMask, createMask, createSoftenMask, createStrengthenMask, skipMask } from "@tamagui/create-theme";
var masks = {
  identity: createIdentityMask(),
  soften: createSoftenMask(),
  soften2: createSoftenMask({
    strength: 2
  }),
  soften3: createSoftenMask({
    strength: 3
  }),
  strengthen: createStrengthenMask(),
  inverse: createInverseMask(),
  inverseSoften: combineMasks(createInverseMask(), createSoftenMask({
    strength: 2
  })),
  inverseSoften2: combineMasks(createInverseMask(), createSoftenMask({
    strength: 3
  })),
  inverseSoften3: combineMasks(createInverseMask(), createSoftenMask({
    strength: 4
  })),
  inverseStrengthen2: combineMasks(createInverseMask(), createStrengthenMask({
    strength: 2
  })),
  strengthenButSoftenBorder: createMask(function (template, options) {
    var stronger = createStrengthenMask().mask(template, options),
      softer = createSoftenMask().mask(template, options);
    return {
      ...stronger,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  }),
  soften2Border1: createMask(function (template, options) {
    var softer2 = createSoftenMask({
        strength: 2
      }).mask(template, options),
      softer1 = createSoftenMask({
        strength: 1
      }).mask(template, options);
    return {
      ...softer2,
      borderColor: softer1.borderColor,
      borderColorHover: softer1.borderColorHover,
      borderColorPress: softer1.borderColorPress,
      borderColorFocus: softer1.borderColorFocus
    };
  }),
  soften3FlatBorder: createMask(function (template, options) {
    var borderMask = createSoftenMask({
        strength: 2
      }).mask(template, options),
      softer3 = createSoftenMask({
        strength: 3
      }).mask(template, options);
    return {
      ...softer3,
      borderColor: borderMask.borderColor,
      borderColorHover: borderMask.borderColorHover,
      borderColorPress: borderMask.borderColorPress,
      borderColorFocus: borderMask.borderColorFocus
    };
  }),
  softenBorder: createMask(function (template, options) {
    var plain = skipMask.mask(template, options),
      softer = createSoftenMask().mask(template, options);
    return {
      ...plain,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  }),
  softenBorder2: createMask(function (template, options) {
    var plain = skipMask.mask(template, options),
      softer = createSoftenMask({
        strength: 2
      }).mask(template, options);
    return {
      ...plain,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  })
};
export { masks };
//# sourceMappingURL=masks.native.js.map
