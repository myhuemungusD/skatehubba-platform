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
var index_exports = {};
__export(index_exports, {
  useEscapeKeydown: () => useEscapeKeydown
});
module.exports = __toCommonJS(index_exports);
var import_use_callback_ref = require("@tamagui/use-callback-ref"),
  import_react = __toESM(require("react"), 1);
function useEscapeKeydown(onEscapeKeyDownProp) {
  var ownerDocument = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function () {
      var _globalThis;
      return (_globalThis = globalThis) === null || _globalThis === void 0 ? void 0 : _globalThis.document;
    }(),
    onEscapeKeyDown = (0, import_use_callback_ref.useCallbackRef)(onEscapeKeyDownProp);
  import_react.default.useEffect(function () {
    var handleKeyDown = function (event) {
      event.key === "Escape" && onEscapeKeyDown(event);
    };
    return ownerDocument.addEventListener("keydown", handleKeyDown), function () {
      ownerDocument.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEscapeKeyDown, ownerDocument]);
}
//# sourceMappingURL=index.native.js.map
