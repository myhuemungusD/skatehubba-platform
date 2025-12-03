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
export { defaultMediaImportance, pseudoDescriptors, pseudoDescriptorsBase, pseudoPriorities };
//# sourceMappingURL=pseudoDescriptors.mjs.map
