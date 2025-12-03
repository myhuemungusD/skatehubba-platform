var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var Toggle_exports = {};
__export(Toggle_exports, {
  Toggle: () => Toggle,
  ToggleFrame: () => ToggleFrame,
  context: () => context
});
module.exports = __toCommonJS(Toggle_exports);
var import_helpers = require("@tamagui/helpers"), import_stacks = require("@tamagui/stacks"), import_use_controllable_state = require("@tamagui/use-controllable-state"), import_web = require("@tamagui/web"), React = __toESM(require("react"), 1), import_jsx_runtime = require("react/jsx-runtime");
const context = (0, import_web.createStyledContext)({
  color: ""
}), NAME = "Toggle", ToggleFrame = (0, import_web.styled)(import_stacks.ThemeableStack, {
  name: NAME,
  tag: "button",
  context,
  variants: {
    unstyled: {
      false: {
        pressTheme: !0,
        backgroundColor: "$background",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        borderColor: "$borderColor",
        borderWidth: 1,
        margin: -1,
        hoverStyle: {
          backgroundColor: "$backgroundHover"
        },
        pressStyle: {
          backgroundColor: "$backgroundPress"
        },
        focusStyle: {
          borderColor: "$borderColorFocus"
        },
        focusVisibleStyle: {
          outlineColor: "$outlineColor",
          outlineWidth: 2,
          outlineStyle: "solid"
        }
      }
    },
    color: {
      "...color": () => ({})
    },
    active: {
      true: {
        zIndex: 1,
        hoverStyle: {
          backgroundColor: "$background"
        },
        focusStyle: {
          borderColor: "$borderColor",
          backgroundColor: "$background"
        }
      }
    },
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
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), Toggle = React.forwardRef(
  function(props, forwardedRef) {
    const {
      pressed: pressedProp,
      defaultPressed = !1,
      onPressedChange,
      ...buttonProps
    } = props, [pressed = !1, setPressed] = (0, import_use_controllable_state.useControllableState)({
      prop: pressedProp,
      onChange: onPressedChange,
      defaultProp: defaultPressed
    });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ToggleFrame,
      {
        ...!props.unstyled && {
          theme: pressed ? "active" : null,
          themeShallow: !0
        },
        active: props.unstyled ? void 0 : pressed,
        "aria-pressed": pressed,
        "data-state": pressed ? "on" : "off",
        "data-disabled": props.disabled ? "" : void 0,
        ...buttonProps,
        ref: forwardedRef,
        onPress: (0, import_helpers.composeEventHandlers)(props.onPress ?? void 0, () => {
          props.disabled || setPressed(!pressed);
        })
      }
    );
  }
);
//# sourceMappingURL=Toggle.js.map
