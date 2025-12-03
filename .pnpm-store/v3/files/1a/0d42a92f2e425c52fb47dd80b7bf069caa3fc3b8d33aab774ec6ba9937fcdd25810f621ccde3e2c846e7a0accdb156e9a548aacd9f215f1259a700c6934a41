var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var TooltipSimple_exports = {};
__export(TooltipSimple_exports, {
  TooltipSimple: () => TooltipSimple
});
module.exports = __toCommonJS(TooltipSimple_exports);
var import_get_token = require("@tamagui/get-token"),
  import_text = require("@tamagui/text"),
  React = __toESM(require("react"), 1),
  import_Tooltip = require("./Tooltip.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const TooltipSimple = React.forwardRef(({
  label,
  children,
  contentProps,
  disabled,
  ...tooltipProps
}, ref) => {
  const child = React.Children.only(children);
  return label ? /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_Tooltip.Tooltip, {
    disableRTL: !0,
    offset: 15,
    restMs: 40,
    delay: 40,
    ...tooltipProps,
    ...(disabled ? {
      open: !1
    } : null),
    children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_Tooltip.Tooltip.Trigger, {
      ...(typeof label == "string" && {
        "aria-label": label
      }),
      asChild: "except-style",
      children: ref && React.isValidElement(child) ? React.cloneElement(child, {
        ref
      }) : child
    }), /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_Tooltip.Tooltip.Content, {
      zIndex: 1e9,
      enterStyle: {
        y: -4,
        opacity: 0,
        scale: 0.96
      },
      exitStyle: {
        y: -4,
        opacity: 0,
        scale: 0.96
      },
      scale: 1,
      elevation: "$0.5",
      opacity: 1,
      pointerEvents: "none",
      paddingVertical: (0, import_get_token.getSpace)(tooltipProps.size || "$true", {
        shift: -4
      }),
      animateOnly: ["transform", "opacity"],
      animation: ["quicker", {
        opacity: {
          overshootClamping: !0
        }
      }],
      ...contentProps,
      children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_Tooltip.Tooltip.Arrow, {}), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_text.Paragraph, {
        size: "$3",
        children: label
      })]
    })]
  }) : children;
});