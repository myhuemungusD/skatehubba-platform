"use strict";

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
var focusableInputHOC_exports = {};
__export(focusableInputHOC_exports, {
  useFocusable: () => useFocusable
});
module.exports = __toCommonJS(focusableInputHOC_exports);
var import_compose_refs = require("@tamagui/compose-refs"),
  import_web = require("@tamagui/web"),
  import_react = __toESM(require("react"), 1),
  import_registerFocusable = require("./registerFocusable.native.js");
function useFocusable(param) {
  var {
      isInput,
      props,
      ref
    } = param,
    {
      id,
      onChangeText,
      value,
      defaultValue
    } = props,
    inputValue = import_react.default.useRef(value || defaultValue || ""),
    unregisterFocusable = import_react.default.useRef(void 0),
    focusAndSelect = import_react.default.useCallback(function (input) {
      input.focus(), input.setSelection && typeof inputValue.current == "string" && input.setSelection(0, inputValue.current.length);
    }, []),
    registerFocusableHandler = import_react.default.useCallback(function (input) {
      var _unregisterFocusable_current;
      !id || !input || ((_unregisterFocusable_current = unregisterFocusable.current) === null || _unregisterFocusable_current === void 0 || _unregisterFocusable_current.call(unregisterFocusable), unregisterFocusable.current = (0, import_registerFocusable.registerFocusable)(id, {
        focus: input.focus,
        ...(isInput && {
          focusAndSelect: function () {
            return focusAndSelect(input);
          }
        })
      }));
    }, [id, isInput, focusAndSelect]),
    inputRef = import_react.default.useCallback(function (input) {
      input && registerFocusableHandler(input);
    }, [registerFocusableHandler]),
    handleChangeText = (0, import_web.useEvent)(function (value2) {
      inputValue.current = value2, onChangeText?.(value2);
    });
  return import_react.default.useEffect(function () {
    return function () {
      var _unregisterFocusable_current;
      (_unregisterFocusable_current = unregisterFocusable.current) === null || _unregisterFocusable_current === void 0 || _unregisterFocusable_current.call(unregisterFocusable);
    };
  }, []), {
    ref: import_react.default.useMemo(function () {
      return (0, import_compose_refs.composeRefs)(ref, inputRef);
    }, [ref, inputRef]),
    onChangeText: handleChangeText
  };
}
//# sourceMappingURL=focusableInputHOC.native.js.map
