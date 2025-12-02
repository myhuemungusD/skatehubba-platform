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
var Tamagui_exports = {};
__export(Tamagui_exports, {
  Tamagui: () => Tamagui,
  getValueFromIdentifier: () => getValueFromIdentifier,
  setIdentifierValue: () => setIdentifierValue
});
module.exports = __toCommonJS(Tamagui_exports);
var Helpers = __toESM(require("@tamagui/helpers"), 1),
  import_config = require("./config.native.js"),
  import_insertStyleRule = require("./helpers/insertStyleRule.native.js"),
  import_useMedia = require("./hooks/useMedia.native.js");
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _create_class(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Constructor;
}
function _define_property(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var Tamagui = function () {
    if (process.env.NODE_ENV === "development") {
      var TamaguiManager = /* @__PURE__ */function () {
        "use strict";

        function TamaguiManager2() {
          _class_call_check(this, TamaguiManager2), _define_property(this, "Helpers", Helpers);
        }
        return _create_class(TamaguiManager2, [{
          key: "mediaState",
          get: function () {
            return {
              ...import_useMedia.mediaState
            };
          }
        }, {
          key: "config",
          get: function () {
            return (0, import_config.getConfig)();
          }
        }, {
          key: "insertedRules",
          get: function () {
            return (0, import_insertStyleRule.getAllRules)();
          }
        }, {
          key: "allSelectors",
          get: function () {
            return (0, import_insertStyleRule.getAllSelectors)();
          }
        }, {
          key: "identifierToValue",
          get: function () {
            return identifierToValue;
          }
        }]), TamaguiManager2;
      }();
      return new TamaguiManager();
    }
  }(),
  identifierToValue = /* @__PURE__ */new Map(),
  getValueFromIdentifier = function (identifier) {
    return identifierToValue.get(identifier);
  },
  setIdentifierValue = function (identifier, value) {
    identifierToValue.set(identifier, value);
  };
//# sourceMappingURL=Tamagui.native.js.map
