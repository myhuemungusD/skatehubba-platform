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
var SelectItemText_exports = {};
__export(SelectItemText_exports, {
  ITEM_TEXT_NAME: () => ITEM_TEXT_NAME,
  SelectItemText: () => SelectItemText,
  SelectItemTextFrame: () => SelectItemTextFrame
});
module.exports = __toCommonJS(SelectItemText_exports);
var import_compose_refs = require("@tamagui/compose-refs"),
  import_core = require("@tamagui/core"),
  import_text = require("@tamagui/text"),
  React = __toESM(require("react"), 1),
  import_context = require("./context.cjs"),
  import_SelectItem = require("./SelectItem.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const ITEM_TEXT_NAME = "SelectItemText",
  SelectItemTextFrame = (0, import_core.styled)(import_text.SizableText, {
    name: ITEM_TEXT_NAME,
    variants: {
      unstyled: {
        false: {
          userSelect: "none",
          color: "$color",
          ellipse: !0
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  SelectItemText = SelectItemTextFrame.styleable(function (props, forwardedRef) {
    const {
        scope,
        className,
        ...itemTextProps
      } = props,
      context = (0, import_context.useSelectContext)(scope),
      itemParentContext = (0, import_context.useSelectItemParentContext)(scope),
      ref = React.useRef(null),
      composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, ref),
      itemContext = (0, import_SelectItem.useSelectItemContext)(scope),
      contents = React.useRef(null);
    return contents.current = /* @__PURE__ */(0, import_jsx_runtime.jsx)(SelectItemTextFrame, {
      className,
      size: itemParentContext.size,
      id: itemContext.textId,
      ...itemTextProps,
      ref: composedRefs
    }), (0, import_core.useIsomorphicLayoutEffect)(() => {
      itemParentContext.initialValue === itemContext.value && !context.selectedIndex && context.setSelectedItem(contents.current);
    }, []), (0, import_core.useIsomorphicLayoutEffect)(() => itemParentContext.valueSubscribe(val => {
      val === itemContext.value && context.setSelectedItem(contents.current);
    }), [itemContext.value]), itemParentContext.shouldRenderWebNative ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
      children: props.children
    }) : /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
      children: contents.current
    });
  });