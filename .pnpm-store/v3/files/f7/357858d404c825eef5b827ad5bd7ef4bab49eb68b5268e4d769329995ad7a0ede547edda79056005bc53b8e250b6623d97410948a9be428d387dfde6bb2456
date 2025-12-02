import {
  applyMask,
  createMask,
  createThemeWithPalettes,
  objectEntries,
  objectFromEntries
} from "@tamagui/create-theme";
class ThemeBuilder {
  constructor(state) {
    this.state = state;
  }
  _getThemeFn;
  addPalettes(palettes) {
    return this.state.palettes = {
      // as {} prevents generic string key merge messing up types
      ...this.state.palettes,
      ...palettes
    }, this;
  }
  addTemplates(templates) {
    return this.state.templates = {
      // as {} prevents generic string key merge messing up types
      ...this.state.templates,
      ...templates
    }, this;
  }
  addMasks(masks) {
    return this.state.masks = {
      // as {} prevents generic string key merge messing up types
      ...this.state.masks,
      ...objectFromEntries(
        objectEntries(masks).map(([key, val]) => [key, createMask(val)])
      )
    }, this;
  }
  // for dev mode only really
  _addedThemes = [];
  addThemes(themes) {
    return this._addedThemes.push({ type: "themes", args: [themes] }), this.state.themes = {
      // as {} prevents generic string key merge messing up types
      ...this.state.themes,
      ...themes
    }, this;
  }
  // these wont be typed to save some complexity and because they don't need to be typed!
  addComponentThemes(childThemeDefinition, options) {
    return this.addChildThemes(childThemeDefinition, options), this;
  }
  addChildThemes(childThemeDefinition, options) {
    const currentThemes = this.state.themes;
    if (!currentThemes)
      throw new Error(
        "No themes defined yet, use addThemes first to set your base themes"
      );
    this._addedThemes.push({ type: "childThemes", args: [childThemeDefinition, options] });
    const currentThemeNames = Object.keys(currentThemes), incomingThemeNames = Object.keys(childThemeDefinition), namesWithDefinitions = currentThemeNames.flatMap((prefix) => {
      const avoidNestingWithin = options?.avoidNestingWithin;
      return avoidNestingWithin && avoidNestingWithin.some(
        (avoidName) => prefix.startsWith(avoidName) || prefix.endsWith(avoidName)
      ) ? [] : incomingThemeNames.map((subName) => {
        const fullName = `${prefix}_${subName}`, definition = childThemeDefinition[subName];
        return "avoidNestingWithin" in definition && definition.avoidNestingWithin.some((name) => prefix.startsWith(name) || prefix.endsWith(name)) ? null : [fullName, definition];
      }).filter(Boolean);
    }), childThemes = Object.fromEntries(namesWithDefinitions), next = {
      // as {} prevents generic string key merge messing up types
      ...this.state.themes,
      ...childThemes
    };
    return this.state.themes = next, this;
  }
  getTheme(fn) {
    return this._getThemeFn = fn, this;
  }
  build() {
    if (!this.state.themes)
      return {};
    const out = {}, maskedThemes = [];
    for (const themeName in this.state.themes) {
      const nameParts = themeName.split("_"), parentName = nameParts.slice(0, nameParts.length - 1).join("_"), definitions = this.state.themes[themeName], themeDefinition = Array.isArray(definitions) ? (() => {
        const found = definitions.find(
          // endWith match stronger than startsWith
          (d) => d.parent ? parentName.endsWith(d.parent) || parentName.startsWith(d.parent) : !0
        );
        return found || null;
      })() : definitions;
      if (themeDefinition)
        if ("theme" in themeDefinition)
          out[themeName] = themeDefinition.theme;
        else if ("mask" in themeDefinition)
          maskedThemes.push({ parentName, themeName, mask: themeDefinition });
        else {
          let {
            palette: paletteName = "",
            template: templateName,
            ...options
          } = themeDefinition;
          const parentDefinition = this.state.themes[parentName];
          if (!this.state.palettes)
            throw new Error(
              `No palettes defined for theme with palette expected: ${themeName}`
            );
          let palette = this.state.palettes[paletteName || ""], attemptParentName = `${parentName}_${paletteName}`;
          for (; !palette && attemptParentName; )
            attemptParentName in this.state.palettes ? (palette = this.state.palettes[attemptParentName], paletteName = attemptParentName) : attemptParentName = attemptParentName.split("_").slice(0, -1).join("_");
          if (!palette) {
            const msg = process.env.NODE_ENV !== "production" ? `: ${themeName}: ${paletteName}
          Definition: ${JSON.stringify(themeDefinition)}
          Parent: ${JSON.stringify(parentDefinition)}
          Potential: (${Object.keys(this.state.palettes).join(", ")})` : "";
            throw new Error(`No palette for theme${msg}`);
          }
          const template = this.state.templates?.[templateName] ?? // fall back to finding the scheme specific on if it exists
          this.state.templates?.[`${nameParts[0]}_${templateName}`];
          if (!template)
            throw new Error(
              `No template for theme ${themeName}: ${templateName} in templates:
- ${Object.keys(this.state.templates || {}).join(`
 - `)}`
            );
          const theme = createThemeWithPalettes(
            this.state.palettes,
            paletteName,
            template,
            options,
            themeName,
            !0
          );
          out[themeName] = this._getThemeFn ? this._getThemeFn({
            theme,
            name: themeName,
            level: nameParts.length,
            parentName,
            scheme: /^(light|dark)$/.test(nameParts[0]) ? nameParts[0] : void 0,
            parentNames: nameParts.slice(0, -1),
            palette,
            template
          }) : theme;
        }
    }
    for (const { mask, themeName, parentName } of maskedThemes) {
      const parent = out[parentName];
      if (!parent)
        continue;
      const { mask: maskName, ...options } = mask;
      let maskFunction = this.state.masks?.[maskName];
      if (!maskFunction)
        throw new Error(`No mask ${maskName}`);
      const parentTheme = this.state.themes[parentName];
      if (parentTheme && "childOptions" in parentTheme) {
        const { mask: mask2, ...childOpts } = parentTheme.childOptions;
        mask2 && (maskFunction = this.state.masks?.[mask2]), Object.assign(options, childOpts);
      }
      out[themeName] = applyMask(
        parent,
        maskFunction,
        options,
        parentName,
        themeName
      );
    }
    return out;
  }
}
function createThemeBuilder() {
  return new ThemeBuilder({});
}
export {
  ThemeBuilder,
  createThemeBuilder
};
//# sourceMappingURL=ThemeBuilder.js.map
