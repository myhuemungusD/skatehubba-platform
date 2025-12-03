import { createPalettes, createSimpleThemeBuilder } from "./createThemes";
import { defaultComponentThemes } from "./defaultComponentThemes";
import { defaultTemplates } from "./defaultTemplates";
import { defaultTemplatesStronger } from "./defaultTemplatesStronger";
import { defaultTemplatesStrongest } from "./defaultTemplatesStrongest";
function createStudioThemes(props) {
  const palettes = createPalettes(props.palettes), templates = props.templateStrategy === "stronger" ? defaultTemplatesStronger : props.templateStrategy === "strongest" ? defaultTemplatesStrongest : defaultTemplates;
  return createSimpleThemeBuilder({
    palettes,
    templates,
    componentThemes: defaultComponentThemes,
    accentTheme: !!props.palettes.accent
  });
}
export {
  createStudioThemes
};
//# sourceMappingURL=createStudioThemes.js.map
