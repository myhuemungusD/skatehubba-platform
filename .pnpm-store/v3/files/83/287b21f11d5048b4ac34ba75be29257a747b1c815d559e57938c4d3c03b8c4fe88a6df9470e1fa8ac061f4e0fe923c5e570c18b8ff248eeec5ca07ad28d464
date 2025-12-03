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
var pseudoDescriptors_exports = {};
__export(pseudoDescriptors_exports, {
  defaultMediaImportance: () => defaultMediaImportance,
  pseudoDescriptors: () => pseudoDescriptors,
  pseudoDescriptorsBase: () => pseudoDescriptorsBase,
  pseudoPriorities: () => pseudoPriorities
});
module.exports = __toCommonJS(pseudoDescriptors_exports);
const pseudoDescriptorsBase = {
    // order of keys here important! in priority order
    hoverStyle: {
      name: "hover",
      priority: 2
    },
    pressStyle: {
      name: "active",
      stateKey: "press",
      priority: 3
    },
    focusVisibleStyle: {
      name: "focus-visible",
      priority: 4,
      stateKey: "focusVisible"
    },
    focusStyle: {
      name: "focus",
      priority: 4
    },
    focusWithinStyle: {
      name: "focus-within",
      priority: 4,
      stateKey: "focusWithin"
    },
    disabledStyle: {
      name: "disabled",
      priority: 5,
      stateKey: "disabled"
    }
  },
  pseudoPriorities = {
    hover: pseudoDescriptorsBase.hoverStyle.priority,
    press: pseudoDescriptorsBase.pressStyle.priority,
    focus: pseudoDescriptorsBase.focusStyle.priority,
    focusVisible: pseudoDescriptorsBase.focusVisibleStyle.priority,
    focusWithin: pseudoDescriptorsBase.focusWithinStyle.priority,
    disabled: pseudoDescriptorsBase.disabledStyle.priority
  },
  pseudoDescriptors = {
    ...pseudoDescriptorsBase,
    enterStyle: {
      name: "enter",
      selector: ".t_unmounted",
      priority: 4
    },
    exitStyle: {
      name: "exit",
      priority: 5
    }
  },
  defaultMediaImportance = Object.keys(pseudoDescriptors).length;