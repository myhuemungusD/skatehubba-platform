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
var TextArea_exports = {};
__export(TextArea_exports, {
  TextArea: () => TextArea,
  TextAreaFrame: () => TextAreaFrame
});
module.exports = __toCommonJS(TextArea_exports);
var import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_react = __toESM(require("react"), 1),
  import_inputHelpers = require("../helpers/inputHelpers.cjs"),
  import_Input = require("./Input.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const TextAreaFrame = (0, import_core.styled)(import_Input.InputFrame, {
    name: "TextArea",
    multiline: !0,
    // this attribute fixes firefox newline issue
    whiteSpace: "pre-wrap",
    variants: {
      unstyled: {
        false: {
          height: "auto",
          ...import_Input.defaultStyles
        }
      },
      size: {
        "...size": import_inputHelpers.textAreaSizeVariant
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  TextArea = TextAreaFrame.styleable((propsIn, forwardedRef) => {
    const ref = import_react.default.useRef(null),
      composedRefs = (0, import_core.useComposedRefs)(forwardedRef, ref),
      props = (0, import_Input.useInputProps)(propsIn, composedRefs),
      linesProp = {
        // web uses rows now, but native not caught up :/
        [import_constants.isWeb ? "rows" : "numberOfLines"]: propsIn.unstyled ? void 0 : 4
      };
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(TextAreaFrame, {
      ...linesProp,
      ...props
    });
  });