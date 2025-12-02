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
var createCheckbox_exports = {};
__export(createCheckbox_exports, {
  CheckboxContext: () => CheckboxContext,
  createCheckbox: () => createCheckbox
});
module.exports = __toCommonJS(createCheckbox_exports);
var import_react = __toESM(require("react"), 1),
  import_focusable = require("@tamagui/focusable"),
  import_checkbox_headless = require("@tamagui/checkbox-headless"),
  import_core = require("@tamagui/core"),
  import_font_size = require("@tamagui/font-size"),
  import_get_token = require("@tamagui/get-token"),
  import_helpers_tamagui = require("@tamagui/helpers-tamagui"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  import_Checkbox = require("./Checkbox.cjs"),
  import_CheckboxStyledContext = require("./CheckboxStyledContext.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const CheckboxContext = import_react.default.createContext({
    checked: !1,
    disabled: !1
  }),
  ensureContext = x => {
    x.context || (x.context = CheckboxContext);
  };
function createCheckbox(createProps) {
  const {
    disableActiveTheme,
    Frame = import_Checkbox.CheckboxFrame,
    Indicator = import_Checkbox.CheckboxIndicatorFrame
  } = createProps;
  ensureContext(Frame), ensureContext(Indicator);
  const FrameComponent = Frame.styleable(function (_props, forwardedRef) {
      const {
          scaleSize = 0.45,
          sizeAdjust = 0,
          scaleIcon,
          checked: checkedProp,
          defaultChecked,
          onCheckedChange,
          native,
          unstyled = !1,
          ...props
        } = _props,
        propsActive = (0, import_core.useProps)(props),
        styledContext = import_react.default.useContext(import_CheckboxStyledContext.CheckboxStyledContext);
      let adjustedSize = 0,
        size = 0;
      unstyled || (adjustedSize = (0, import_core.getVariableValue)((0, import_get_token.getSize)(propsActive.size ?? styledContext?.size ?? "$true", {
        shift: sizeAdjust
      })), size = scaleSize ? Math.round(adjustedSize * scaleSize) : adjustedSize);
      const [checked = !1, setChecked] = (0, import_use_controllable_state.useControllableState)({
          prop: checkedProp,
          defaultProp: defaultChecked,
          onChange: onCheckedChange
        }),
        {
          checkboxProps,
          checkboxRef,
          bubbleInput
        } = (0, import_checkbox_headless.useCheckbox)(
        // @ts-ignore
        propsActive, [checked, setChecked], forwardedRef);
      if ((0, import_core.shouldRenderNativePlatform)(native) === "web") return /* @__PURE__ */(0, import_jsx_runtime.jsx)("input", {
        type: "checkbox",
        defaultChecked: (0, import_checkbox_headless.isIndeterminate)(checked) ? !1 : checked,
        tabIndex: -1,
        ref: checkboxRef,
        disabled: checkboxProps.disabled,
        style: {
          appearance: "auto",
          accentColor: "var(--color6)",
          ...checkboxProps.style
          // TODO: any
        }
      });
      const memoizedContext = (0, import_react.useMemo)(() => ({
        checked,
        disabled: checkboxProps.disabled
      }), [checked, checkboxProps.disabled]);
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(CheckboxContext.Provider, {
        value: memoizedContext,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_CheckboxStyledContext.CheckboxStyledContext.Provider, {
          size: propsActive.size ?? styledContext?.size ?? "$true",
          scaleIcon: scaleIcon ?? styledContext?.scaleIcon ?? 1,
          children: [/* @__PURE__ */(0, import_jsx_runtime.jsx)(Frame, {
            ...(!unstyled && {
              width: size,
              height: size
            }),
            tag: "button",
            ref: checkboxRef,
            unstyled,
            ...(unstyled === !1 && {
              size,
              theme: checked ? "active" : null
            }),
            checked,
            disabled: checkboxProps.disabled,
            ...checkboxProps,
            style: checkboxProps.style,
            children: propsActive.children
          }), bubbleInput]
        })
      });
    }),
    IndicatorComponent = Indicator.styleable((props, forwardedRef) => {
      const {
          // __scopeCheckbox,
          children: childrenProp,
          forceMount,
          disablePassStyles,
          unstyled = !1,
          ...indicatorProps
        } = props,
        styledContext = import_react.default.useContext(import_CheckboxStyledContext.CheckboxStyledContext);
      let children = childrenProp;
      if (!unstyled) {
        const iconSize = (typeof styledContext.size == "number" ? styledContext.size * 0.65 : (0, import_font_size.getFontSize)(styledContext.size)) * styledContext.scaleIcon,
          theme = (0, import_core.useTheme)(),
          getThemedIcon = (0, import_helpers_tamagui.useGetThemedIcon)({
            size: iconSize,
            color: theme.color
          });
        children = import_react.default.Children.toArray(childrenProp).map(child => disablePassStyles || !import_react.default.isValidElement(child) ? child : getThemedIcon(child));
      }
      const context = import_react.default.useContext(CheckboxContext);
      return forceMount || (0, import_checkbox_headless.isIndeterminate)(context.checked) || context.checked === !0 ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(Indicator, {
        pointerEvents: "none",
        ...indicatorProps,
        ref: forwardedRef,
        children
      }) : null;
    });
  return (0, import_core.withStaticProperties)(FrameComponent, {
    Indicator: IndicatorComponent
  });
}