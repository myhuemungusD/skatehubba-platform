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
var Checkbox_exports = {};
__export(Checkbox_exports, {
  CheckboxFrame: () => CheckboxFrame,
  CheckboxIndicatorFrame: () => CheckboxIndicatorFrame
});
module.exports = __toCommonJS(Checkbox_exports);
var import_core = require("@tamagui/core"),
  import_get_token = require("@tamagui/get-token"),
  import_stacks = require("@tamagui/stacks"),
  import_CheckboxStyledContext = require("./CheckboxStyledContext.cjs");
const INDICATOR_NAME = "CheckboxIndicator",
  CheckboxIndicatorFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
    // use Checkbox for easier themes
    name: INDICATOR_NAME,
    context: import_CheckboxStyledContext.CheckboxStyledContext,
    variants: {
      unstyled: {
        false: {}
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  CHECKBOX_NAME = "Checkbox",
  CheckboxFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
    name: CHECKBOX_NAME,
    tag: "button",
    context: import_CheckboxStyledContext.CheckboxStyledContext,
    variants: {
      unstyled: {
        false: {
          size: "$true",
          backgroundColor: "$background",
          alignItems: "center",
          justifyContent: "center",
          pressTheme: !0,
          focusable: !0,
          borderWidth: 1,
          borderColor: "$borderColor",
          hoverStyle: {
            borderColor: "$borderColorHover"
          },
          focusStyle: {
            borderColor: "$borderColorFocus"
          },
          focusVisibleStyle: {
            outlineStyle: "solid",
            outlineWidth: 2,
            outlineColor: "$outlineColor"
          }
        }
      },
      disabled: {
        true: {
          pointerEvents: "none",
          userSelect: "none",
          cursor: "not-allowed",
          hoverStyle: {
            borderColor: "$borderColor",
            backgroundColor: "$background"
          },
          pressStyle: {
            borderColor: "$borderColor",
            backgroundColor: "$background"
          },
          focusStyle: {
            outlineWidth: 0
          }
        }
      },
      size: {
        "...size": val => ({
          borderRadius: (0, import_core.getVariableValue)((0, import_get_token.getSize)(val)) / 8
        })
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  });