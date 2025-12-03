import { applyMask, createMask, createThemeWithPalettes, objectEntries, objectFromEntries } from "@tamagui/create-theme";
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _create_class(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Constructor;
}
function _define_property(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var ThemeBuilder = /* @__PURE__ */function () {
  "use strict";

  function ThemeBuilder2(state) {
    _class_call_check(this, ThemeBuilder2), _define_property(this, "state", void 0), _define_property(this, "_getThemeFn", void 0), _define_property(this, "_addedThemes", void 0), this.state = state, this._addedThemes = [];
  }
  return _create_class(ThemeBuilder2, [{
    key: "addPalettes",
    value: function (palettes) {
      return this.state.palettes = {
        // as {} prevents generic string key merge messing up types
        ...this.state.palettes,
        ...palettes
      }, this;
    }
  }, {
    key: "addTemplates",
    value: function (templates) {
      return this.state.templates = {
        // as {} prevents generic string key merge messing up types
        ...this.state.templates,
        ...templates
      }, this;
    }
  }, {
    key: "addMasks",
    value: function (masks) {
      return this.state.masks = {
        // as {} prevents generic string key merge messing up types
        ...this.state.masks,
        ...objectFromEntries(objectEntries(masks).map(function (param) {
          var [key, val] = param;
          return [key, createMask(val)];
        }))
      }, this;
    }
  }, {
    key: "addThemes",
    value: function (themes) {
      return this._addedThemes.push({
        type: "themes",
        args: [themes]
      }), this.state.themes = {
        // as {} prevents generic string key merge messing up types
        ...this.state.themes,
        ...themes
      }, this;
    }
  }, {
    // lets infer template themes directly onto here to avoid some type nesting issues later one
    // themes: {
    //   [Key in keyof T]: TemplateToTheme<T[Key]>
    // } & State['themes']
    // these wont be typed to save some complexity and because they don't need to be typed!
    key: "addComponentThemes",
    value: function (childThemeDefinition, options) {
      return this.addChildThemes(childThemeDefinition, options), this;
    }
  }, {
    key: "addChildThemes",
    value: function (childThemeDefinition, options) {
      var currentThemes = this.state.themes;
      if (!currentThemes) throw new Error("No themes defined yet, use addThemes first to set your base themes");
      this._addedThemes.push({
        type: "childThemes",
        args: [childThemeDefinition, options]
      });
      var currentThemeNames = Object.keys(currentThemes),
        incomingThemeNames = Object.keys(childThemeDefinition),
        namesWithDefinitions = currentThemeNames.flatMap(function (prefix) {
          var avoidNestingWithin = options?.avoidNestingWithin;
          return avoidNestingWithin && avoidNestingWithin.some(function (avoidName) {
            return prefix.startsWith(avoidName) || prefix.endsWith(avoidName);
          }) ? [] : incomingThemeNames.map(function (subName) {
            var fullName = `${prefix}_${subName}`,
              definition = childThemeDefinition[subName];
            if ("avoidNestingWithin" in definition) {
              var avoidNest = definition.avoidNestingWithin;
              if (avoidNest.some(function (name) {
                return prefix.startsWith(name) || prefix.endsWith(name);
              })) return null;
            }
            return [fullName, definition];
          }).filter(Boolean);
        }),
        childThemes = Object.fromEntries(namesWithDefinitions),
        next = {
          // as {} prevents generic string key merge messing up types
          ...this.state.themes,
          ...childThemes
        };
      return this.state.themes = next, this;
    }
  }, {
    key: "getTheme",
    value: function (fn) {
      return this._getThemeFn = fn, this;
    }
  }, {
    key: "build",
    value: function () {
      var _this,
        _loop = function (themeName2) {
          var nameParts = themeName2.split("_"),
            parentName2 = nameParts.slice(0, nameParts.length - 1).join("_"),
            definitions = _this.state.themes[themeName2],
            themeDefinition = Array.isArray(definitions) ? function () {
              var found = definitions.find(
              // endWith match stronger than startsWith
              function (d) {
                return d.parent ? parentName2.endsWith(d.parent) || parentName2.startsWith(d.parent) : !0;
              });
              return found || null;
            }() : definitions;
          if (!themeDefinition) return "continue";
          if ("theme" in themeDefinition) out[themeName2] = themeDefinition.theme;else if ("mask" in themeDefinition) maskedThemes.push({
            parentName: parentName2,
            themeName: themeName2,
            mask: themeDefinition
          });else {
            var _this_state_templates,
              _this_state_templates1,
              {
                palette: paletteName = "",
                template: templateName,
                ...options2
              } = themeDefinition,
              parentDefinition = _this.state.themes[parentName2];
            if (!_this.state.palettes) throw new Error(`No palettes defined for theme with palette expected: ${themeName2}`);
            for (var palette = _this.state.palettes[paletteName || ""], attemptParentName = `${parentName2}_${paletteName}`; !palette && attemptParentName;) attemptParentName in _this.state.palettes ? (palette = _this.state.palettes[attemptParentName], paletteName = attemptParentName) : attemptParentName = attemptParentName.split("_").slice(0, -1).join("_");
            if (!palette) {
              var msg = process.env.NODE_ENV !== "production" ? `: ${themeName2}: ${paletteName}
          Definition: ${JSON.stringify(themeDefinition)}
          Parent: ${JSON.stringify(parentDefinition)}
          Potential: (${Object.keys(_this.state.palettes).join(", ")})` : "";
              throw new Error(`No palette for theme${msg}`);
            }
            var _this_state_templates_templateName,
              template = (_this_state_templates_templateName = (_this_state_templates = _this.state.templates) === null || _this_state_templates === void 0 ? void 0 : _this_state_templates[templateName]) !== null && _this_state_templates_templateName !== void 0 ? _this_state_templates_templateName : (_this_state_templates1 = _this.state.templates) === null || _this_state_templates1 === void 0 ? void 0 : _this_state_templates1[`${nameParts[0]}_${templateName}`];
            if (!template) throw new Error(`No template for theme ${themeName2}: ${templateName} in templates:
- ${Object.keys(_this.state.templates || {}).join(`
 - `)}`);
            var theme = createThemeWithPalettes(_this.state.palettes, paletteName, template, options2, themeName2, !0);
            out[themeName2] = _this._getThemeFn ? _this._getThemeFn({
              theme,
              name: themeName2,
              level: nameParts.length,
              parentName: parentName2,
              scheme: /^(light|dark)$/.test(nameParts[0]) ? nameParts[0] : void 0,
              parentNames: nameParts.slice(0, -1),
              palette,
              template
            }) : theme;
          }
        };
      if (!this.state.themes) return {};
      var out = {},
        maskedThemes = [];
      for (var themeName in this.state.themes) _this = this, _loop(themeName);
      var _iteratorNormalCompletion = !0,
        _didIteratorError = !1,
        _iteratorError = void 0;
      try {
        for (var _iterator = maskedThemes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var {
              mask,
              themeName: themeName1,
              parentName
            } = _step.value,
            _this_state_masks,
            parent = out[parentName];
          if (parent) {
            var {
                mask: maskName,
                ...options
              } = mask,
              maskFunction = (_this_state_masks = this.state.masks) === null || _this_state_masks === void 0 ? void 0 : _this_state_masks[maskName];
            if (!maskFunction) throw new Error(`No mask ${maskName}`);
            var parentTheme = this.state.themes[parentName];
            if (parentTheme && "childOptions" in parentTheme) {
              var {
                mask: mask1,
                ...childOpts
              } = parentTheme.childOptions;
              if (mask1) {
                var _this_state_masks1;
                maskFunction = (_this_state_masks1 = this.state.masks) === null || _this_state_masks1 === void 0 ? void 0 : _this_state_masks1[mask1];
              }
              Object.assign(options, childOpts);
            }
            out[themeName1] = applyMask(parent, maskFunction, options, parentName, themeName1);
          }
        }
      } catch (err) {
        _didIteratorError = !0, _iteratorError = err;
      } finally {
        try {
          !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
        } finally {
          if (_didIteratorError) throw _iteratorError;
        }
      }
      return out;
    }
  }]), ThemeBuilder2;
}();
function createThemeBuilder() {
  return new ThemeBuilder({});
}
export { ThemeBuilder, createThemeBuilder };
//# sourceMappingURL=ThemeBuilder.native.js.map
