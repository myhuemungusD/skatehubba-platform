import { createPalettes, createSimpleThemeBuilder } from "./createThemes.native.js";
import { defaultComponentThemes } from "./defaultComponentThemes.native.js";
import { defaultTemplates } from "./defaultTemplates.native.js";
import { defaultTemplatesStronger } from "./defaultTemplatesStronger.native.js";
import { defaultTemplatesStrongest } from "./defaultTemplatesStrongest.native.js";
function createStudioThemes(props) {
  var palettes = createPalettes(props.palettes),
    templates = props.templateStrategy === "stronger" ? defaultTemplatesStronger : props.templateStrategy === "strongest" ? defaultTemplatesStrongest : defaultTemplates;
  return createSimpleThemeBuilder({
    palettes,
    templates,
    componentThemes: defaultComponentThemes,
    accentTheme: !!props.palettes.accent
  });
}
export { createStudioThemes };
//# sourceMappingURL=createStudioThemes.native.js.map
