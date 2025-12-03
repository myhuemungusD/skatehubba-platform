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
var Input_exports = {};
__export(Input_exports, {
  Input: () => Input,
  InputFrame: () => InputFrame,
  defaultStyles: () => defaultStyles,
  useInputProps: () => useInputProps
});
module.exports = __toCommonJS(Input_exports);
var import_react = __toESM(require("react"), 1),
  import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_focusable = require("@tamagui/focusable"),
  import_react_native = require("react-native-web"),
  import_inputHelpers = require("../helpers/inputHelpers.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const defaultStyles = {
    size: "$true",
    fontFamily: "$body",
    borderWidth: 1,
    outlineWidth: 0,
    color: "$color",
    ...(import_constants.isWeb ? {
      tabIndex: 0
    } : {
      focusable: !0
    }),
    borderColor: "$borderColor",
    backgroundColor: "$background",
    // this fixes a flex bug where it overflows container
    minWidth: 0,
    hoverStyle: {
      borderColor: "$borderColorHover"
    },
    focusStyle: {
      borderColor: "$borderColorFocus"
    },
    focusVisibleStyle: {
      outlineColor: "$outlineColor",
      outlineWidth: 2,
      outlineStyle: "solid"
    }
  },
  InputFrame = (0, import_core.styled)(import_react_native.TextInput, {
    name: "Input",
    variants: {
      unstyled: {
        false: defaultStyles
      },
      size: {
        "...size": import_inputHelpers.inputSizeVariant
      },
      disabled: {
        true: {}
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }, {
    isInput: !0,
    accept: {
      placeholderTextColor: "color",
      selectionColor: "color"
    }
  }),
  Input = InputFrame.styleable((propsIn, forwardedRef) => {
    const ref = import_react.default.useRef(null),
      composedRefs = (0, import_core.useComposedRefs)(forwardedRef, ref),
      props = useInputProps(propsIn, composedRefs);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(InputFrame, {
      ...props
    });
  });
function useInputProps(props, ref) {
  const theme = (0, import_core.useTheme)(),
    focusableProps = (0, import_focusable.useFocusable)({
      props,
      ref,
      isInput: !0
    }),
    placeholderTextColor = import_react.default.useMemo(() => {
      const placeholderColorProp = props.placeholderTextColor;
      return theme[placeholderColorProp]?.get() ?? placeholderColorProp ?? theme.placeholderColor?.get();
    }, [props.placeholderTextColor, theme]);
  return import_react.default.useMemo(() => ({
    ref: focusableProps.ref,
    readOnly: props.disabled,
    ...props,
    placeholderTextColor,
    onChangeText: focusableProps.onChangeText
  }), [focusableProps.ref, focusableProps.onChangeText, props.disabled, props, placeholderTextColor]);
}