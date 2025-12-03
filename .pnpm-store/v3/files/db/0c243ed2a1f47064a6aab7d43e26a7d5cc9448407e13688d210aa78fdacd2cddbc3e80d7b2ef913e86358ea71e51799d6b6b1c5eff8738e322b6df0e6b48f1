import * as Helpers from "@tamagui/helpers";
import { getConfig } from "./config.native.js";
import { getAllRules, getAllSelectors } from "./helpers/insertStyleRule.native.js";
import { mediaState } from "./hooks/useMedia.native.js";
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
              ...mediaState
            };
          }
        }, {
          key: "config",
          get: function () {
            return getConfig();
          }
        }, {
          key: "insertedRules",
          get: function () {
            return getAllRules();
          }
        }, {
          key: "allSelectors",
          get: function () {
            return getAllSelectors();
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
export { Tamagui, getValueFromIdentifier, setIdentifierValue };
//# sourceMappingURL=Tamagui.native.js.map
