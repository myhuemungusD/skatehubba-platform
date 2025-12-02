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
var useKeyboardVisible_exports = {};
__export(useKeyboardVisible_exports, {
  useKeyboardVisible: () => useKeyboardVisible
});
module.exports = __toCommonJS(useKeyboardVisible_exports);
var import_react = __toESM(require("react"), 1),
  import_react_native = require("react-native-web");
const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = import_react.default.useState(!1);
  return import_react.default.useEffect(() => {
    const keyboardDidShowListener = import_react_native.Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardVisible(!0);
      }),
      keyboardDidHideListener = import_react_native.Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardVisible(!1);
      });
    return () => {
      keyboardDidHideListener.remove(), keyboardDidShowListener.remove();
    };
  }, []), isKeyboardVisible;
};