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
var BubbleInput_exports = {};
__export(BubbleInput_exports, {
  BubbleInput: () => BubbleInput
});
module.exports = __toCommonJS(BubbleInput_exports);
var import_use_previous = require("@tamagui/use-previous"),
  React = __toESM(require("react"), 1),
  import_utils = require("./utils.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const BubbleInput = props => {
  const {
      checked,
      bubbles = !0,
      control,
      isHidden,
      ...inputProps
    } = props,
    ref = React.useRef(null),
    prevChecked = (0, import_use_previous.usePrevious)(checked);
  return React.useEffect(() => {
    const input = ref.current,
      inputProto = window.HTMLInputElement.prototype,
      setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", {
        bubbles
      });
      input.indeterminate = (0, import_utils.isIndeterminate)(checked), setChecked.call(input, (0, import_utils.isIndeterminate)(checked) ? !1 : checked), input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]), /* @__PURE__ */(0, import_jsx_runtime.jsx)("input", {
    type: "checkbox",
    defaultChecked: (0, import_utils.isIndeterminate)(checked) ? !1 : checked,
    ...inputProps,
    tabIndex: -1,
    ref,
    "aria-hidden": isHidden,
    style: {
      ...(isHidden ? {
        // ...controlSize,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      } : {
        appearance: "auto",
        accentColor: "var(--color6)"
      }),
      ...props.style
    }
  });
};