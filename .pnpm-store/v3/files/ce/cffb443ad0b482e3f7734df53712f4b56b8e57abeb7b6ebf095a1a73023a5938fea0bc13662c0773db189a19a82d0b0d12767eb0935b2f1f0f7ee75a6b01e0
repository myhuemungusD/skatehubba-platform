import { createPalettes, createSimpleThemeBuilder } from "./createThemes.mjs";
import { defaultComponentThemes } from "./defaultComponentThemes.mjs";
import { defaultTemplates } from "./defaultTemplates.mjs";
import { defaultTemplatesStronger } from "./defaultTemplatesStronger.mjs";
import { defaultTemplatesStrongest } from "./defaultTemplatesStrongest.mjs";
function createStudioThemes(props) {
  const palettes = createPalettes(props.palettes),
    templates = props.templateStrategy === "stronger" ? defaultTemplatesStronger : props.templateStrategy === "strongest" ? defaultTemplatesStrongest : defaultTemplates;
  return createSimpleThemeBuilder({
    palettes,
    templates,
    componentThemes: defaultComponentThemes,
    accentTheme: !!props.palettes.accent
  });
}
export { createStudioThemes };
//# sourceMappingURL=createStudioThemes.mjs.map
