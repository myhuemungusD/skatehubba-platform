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
var componentThemeDefinitions_exports = {};
__export(componentThemeDefinitions_exports, {
  componentThemeDefinitions: () => componentThemeDefinitions,
  overlayThemeDefinitions: () => overlayThemeDefinitions
});
module.exports = __toCommonJS(componentThemeDefinitions_exports);
var import_templates = require("./templates");
const overlayThemes = {
  light: {
    background: "rgba(0,0,0,0.5)"
  },
  dark: {
    background: "rgba(0,0,0,0.9)"
  }
}, overlayThemeDefinitions = [
  {
    parent: "light",
    theme: overlayThemes.light
  },
  {
    parent: "dark",
    theme: overlayThemes.dark
  }
], componentThemeDefinitions = {
  ListItem: [
    {
      parent: "light",
      mask: "strengthen",
      ...import_templates.maskOptions.component
    },
    {
      parent: "dark",
      mask: "identity",
      ...import_templates.maskOptions.component
    }
  ],
  Card: {
    mask: "soften",
    ...import_templates.maskOptions.component
  },
  Button: {
    mask: "soften2",
    ...import_templates.maskOptions.button
  },
  Checkbox: {
    mask: "softenBorder2",
    ...import_templates.maskOptions.component
  },
  Switch: {
    mask: "soften2",
    ...import_templates.maskOptions.component
  },
  SwitchThumb: {
    mask: "inverseStrengthen2",
    ...import_templates.maskOptions.component
  },
  TooltipContent: {
    mask: "soften2",
    ...import_templates.maskOptions.component
  },
  DrawerFrame: {
    mask: "soften",
    ...import_templates.maskOptions.component
  },
  Progress: {
    mask: "soften",
    ...import_templates.maskOptions.component
  },
  RadioGroupItem: {
    mask: "softenBorder2",
    ...import_templates.maskOptions.component
  },
  TooltipArrow: {
    mask: "soften",
    ...import_templates.maskOptions.component
  },
  SliderTrackActive: {
    mask: "inverseSoften",
    ...import_templates.maskOptions.component
  },
  SliderTrack: {
    mask: "soften2",
    ...import_templates.maskOptions.component
  },
  SliderThumb: {
    mask: "inverse",
    ...import_templates.maskOptions.component
  },
  Tooltip: {
    mask: "inverse",
    ...import_templates.maskOptions.component
  },
  ProgressIndicator: {
    mask: "inverse",
    ...import_templates.maskOptions.component
  },
  SheetOverlay: overlayThemeDefinitions,
  DialogOverlay: overlayThemeDefinitions,
  ModalOverlay: overlayThemeDefinitions,
  Input: {
    mask: "softenBorder2",
    ...import_templates.maskOptions.component
  },
  TextArea: {
    mask: "softenBorder2",
    ...import_templates.maskOptions.component
  }
};
//# sourceMappingURL=componentThemeDefinitions.js.map
