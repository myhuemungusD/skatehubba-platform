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
var createRadioGroup_exports = {};
__export(createRadioGroup_exports, {
  createRadioGroup: () => createRadioGroup
});
module.exports = __toCommonJS(createRadioGroup_exports);
var import_react = __toESM(require("react"), 1), import_core = require("@tamagui/core"), import_RadioGroup = require("./RadioGroup"), import_radio_headless = require("@tamagui/radio-headless"), import_roving_focus = require("@tamagui/roving-focus"), import_jsx_runtime = require("react/jsx-runtime");
const ensureContext = (x) => {
  x.context || (x.context = RadioGroupContext);
}, RadioGroupContext = import_react.default.createContext({}), RadioGroupItemContext = import_react.default.createContext({
  checked: !1,
  disabled: !1
});
function createRadioGroup(createProps) {
  const {
    disableActiveTheme,
    Frame = import_RadioGroup.RadioGroupFrame,
    Indicator = import_RadioGroup.RadioGroupIndicatorFrame,
    Item = import_RadioGroup.RadioGroupItemFrame
  } = createProps;
  ensureContext(Frame), ensureContext(Indicator), ensureContext(Item);
  const RadioGroupImp = Frame.styleable((props, ref) => {
    const {
      value,
      defaultValue,
      onValueChange,
      required = !1,
      disabled = !1,
      name,
      native,
      accentColor,
      orientation = "vertical",
      ...rest
    } = props, { providerValue, frameAttrs, rovingFocusGroupAttrs } = (0, import_radio_headless.useRadioGroup)({
      orientation,
      name,
      defaultValue,
      value,
      onValueChange,
      required,
      disabled,
      native,
      accentColor
    });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupContext.Provider, { value: providerValue, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_roving_focus.RovingFocusGroup, { ...rovingFocusGroupAttrs, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_RadioGroup.RadioGroupFrame, { ...frameAttrs, ref, ...rest }) }) });
  }), RadioGroupItemImp = Item.styleable((props, ref) => {
    const {
      value,
      labelledBy,
      onPress,
      //@ts-expect-error
      onKeyDown,
      disabled,
      id,
      ...rest
    } = props, {
      providerValue,
      bubbleInput,
      rovingFocusGroupAttrs,
      frameAttrs,
      isFormControl,
      native
    } = (0, import_radio_headless.useRadioGroupItem)({
      radioGroupContext: RadioGroupContext,
      value,
      id,
      labelledBy,
      disabled,
      onPress,
      onKeyDown
    });
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItemContext.Provider, { value: providerValue, children: import_core.isWeb && native ? bubbleInput : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_roving_focus.RovingFocusGroup.Item, { ...rovingFocusGroupAttrs, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_RadioGroup.RadioGroupItemFrame, { ...frameAttrs, ref, ...rest }) }),
      isFormControl && bubbleInput
    ] }) });
  });
  RadioGroupItemImp.displayName = "RadioGroupItem";
  const RadioIndicator = Indicator.styleable(
    (props, forwardedRef) => {
      const { forceMount, disabled, ...indicatorProps } = props, { checked, ...useIndicatorRest } = (0, import_radio_headless.useRadioGroupItemIndicator)({
        radioGroupItemContext: RadioGroupItemContext,
        disabled
      });
      return forceMount || checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, { ...useIndicatorRest, ref: forwardedRef, ...indicatorProps }) : null;
    }
  );
  RadioIndicator.displayName = "RadioIndicator";
  const RadioGroup = (0, import_core.withStaticProperties)(RadioGroupImp, {
    Item: RadioGroupItemImp,
    Indicator: RadioIndicator
  });
  return RadioGroup.displayName = "RadioGroup", RadioGroup;
}
//# sourceMappingURL=createRadioGroup.js.map
