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
var masks_exports = {};
__export(masks_exports, {
  masks: () => masks
});
module.exports = __toCommonJS(masks_exports);
var import_create_theme = require("@tamagui/create-theme");
const masks = {
  identity: (0, import_create_theme.createIdentityMask)(),
  soften: (0, import_create_theme.createSoftenMask)(),
  soften2: (0, import_create_theme.createSoftenMask)({
    strength: 2
  }),
  soften3: (0, import_create_theme.createSoftenMask)({
    strength: 3
  }),
  strengthen: (0, import_create_theme.createStrengthenMask)(),
  inverse: (0, import_create_theme.createInverseMask)(),
  inverseSoften: (0, import_create_theme.combineMasks)((0, import_create_theme.createInverseMask)(), (0, import_create_theme.createSoftenMask)({
    strength: 2
  })),
  inverseSoften2: (0, import_create_theme.combineMasks)((0, import_create_theme.createInverseMask)(), (0, import_create_theme.createSoftenMask)({
    strength: 3
  })),
  inverseSoften3: (0, import_create_theme.combineMasks)((0, import_create_theme.createInverseMask)(), (0, import_create_theme.createSoftenMask)({
    strength: 4
  })),
  inverseStrengthen2: (0, import_create_theme.combineMasks)((0, import_create_theme.createInverseMask)(), (0, import_create_theme.createStrengthenMask)({
    strength: 2
  })),
  strengthenButSoftenBorder: (0, import_create_theme.createMask)((template, options) => {
    const stronger = (0, import_create_theme.createStrengthenMask)().mask(template, options),
      softer = (0, import_create_theme.createSoftenMask)().mask(template, options);
    return {
      ...stronger,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  }),
  soften2Border1: (0, import_create_theme.createMask)((template, options) => {
    const softer2 = (0, import_create_theme.createSoftenMask)({
        strength: 2
      }).mask(template, options),
      softer1 = (0, import_create_theme.createSoftenMask)({
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
  soften3FlatBorder: (0, import_create_theme.createMask)((template, options) => {
    const borderMask = (0, import_create_theme.createSoftenMask)({
      strength: 2
    }).mask(template, options);
    return {
      ...(0, import_create_theme.createSoftenMask)({
        strength: 3
      }).mask(template, options),
      borderColor: borderMask.borderColor,
      borderColorHover: borderMask.borderColorHover,
      borderColorPress: borderMask.borderColorPress,
      borderColorFocus: borderMask.borderColorFocus
    };
  }),
  softenBorder: (0, import_create_theme.createMask)((template, options) => {
    const plain = import_create_theme.skipMask.mask(template, options),
      softer = (0, import_create_theme.createSoftenMask)().mask(template, options);
    return {
      ...plain,
      borderColor: softer.borderColor,
      borderColorHover: softer.borderColorHover,
      borderColorPress: softer.borderColorPress,
      borderColorFocus: softer.borderColorFocus
    };
  }),
  softenBorder2: (0, import_create_theme.createMask)((template, options) => {
    const plain = import_create_theme.skipMask.mask(template, options),
      softer = (0, import_create_theme.createSoftenMask)({
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