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
var RadioGroup_exports = {};
__export(RadioGroup_exports, {
  RadioGroupFrame: () => RadioGroupFrame,
  RadioGroupIndicatorFrame: () => RadioGroupIndicatorFrame,
  RadioGroupItemFrame: () => RadioGroupItemFrame
});
module.exports = __toCommonJS(RadioGroup_exports);
var import_core = require("@tamagui/core"),
  import_get_token = require("@tamagui/get-token"),
  import_stacks = require("@tamagui/stacks");
const RADIO_GROUP_ITEM_NAME = "RadioGroupItem",
  RadioGroupItemFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
    name: RADIO_GROUP_ITEM_NAME,
    tag: "button",
    variants: {
      unstyled: {
        false: {
          size: "$true",
          borderRadius: 1e3,
          backgroundColor: "$background",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "$borderColor",
          padding: 0,
          hoverStyle: {
            borderColor: "$borderColorHover",
            backgroundColor: "$backgroundHover"
          },
          focusStyle: {
            borderColor: "$borderColorHover",
            backgroundColor: "$backgroundHover"
          },
          focusVisibleStyle: {
            outlineStyle: "solid",
            outlineWidth: 2,
            outlineColor: "$outlineColor"
          },
          pressStyle: {
            borderColor: "$borderColorFocus",
            backgroundColor: "$backgroundFocus"
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
          focusVisibleStyle: {
            outlineWidth: 0
          }
        }
      },
      size: {
        "...size": (value, {
          props
        }) => {
          const size = Math.floor((0, import_core.getVariableValue)((0, import_get_token.getSize)(value)) * (props.scaleSize ?? 0.5));
          return {
            width: size,
            height: size
          };
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  RADIO_GROUP_INDICATOR_NAME = "RadioGroupIndicator",
  RadioGroupIndicatorFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
    name: RADIO_GROUP_INDICATOR_NAME,
    variants: {
      unstyled: {
        false: {
          width: "33%",
          height: "33%",
          borderRadius: 1e3,
          backgroundColor: "$color",
          pressTheme: !0
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  RADIO_GROUP_NAME = "RadioGroup",
  RadioGroupFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
    name: RADIO_GROUP_NAME,
    variants: {
      orientation: {
        horizontal: {
          flexDirection: "row",
          spaceDirection: "horizontal"
        },
        vertical: {
          flexDirection: "column",
          spaceDirection: "vertical"
        }
      }
    }
  });