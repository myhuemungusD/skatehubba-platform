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
var Tabs_exports = {};
__export(Tabs_exports, {
  DefaultTabsContentFrame: () => DefaultTabsContentFrame,
  DefaultTabsFrame: () => DefaultTabsFrame,
  DefaultTabsTabFrame: () => DefaultTabsTabFrame
});
module.exports = __toCommonJS(Tabs_exports);
var import_core = require("@tamagui/core"), import_stacks = require("@tamagui/stacks"), import_get_button_sized = require("@tamagui/get-button-sized");
const TABS_NAME = "Tabs", DefaultTabsFrame = (0, import_core.styled)(import_stacks.SizableStack, {
  name: TABS_NAME
}), TRIGGER_NAME = "TabsTrigger", DefaultTabsTabFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
  name: TRIGGER_NAME,
  tag: "button",
  variants: {
    size: {
      "...size": import_get_button_sized.getButtonSized
    },
    disabled: {
      true: {
        pointerEvents: "none"
      }
    },
    unstyled: {
      false: {
        borderWidth: 0,
        backgroundColor: "$background",
        userSelect: "none",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        flexDirection: "row",
        cursor: "pointer",
        pressStyle: {
          backgroundColor: "$backgroundPress"
        },
        hoverStyle: {
          backgroundColor: "$backgroundHover"
        },
        focusStyle: {
          backgroundColor: "$backgroundFocus"
        }
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), CONTENT_NAME = "TabsContent", DefaultTabsContentFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
  name: CONTENT_NAME
});
//# sourceMappingURL=Tabs.js.map
