import { Dimensions } from "react-native";
import { matchQuery } from "./matchQuery.native.js";
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
var NativeMediaQueryList = /* @__PURE__ */function () {
  "use strict";

  function NativeMediaQueryList2(query) {
    var _this = this;
    _class_call_check(this, NativeMediaQueryList2), _define_property(this, "query", void 0), _define_property(this, "listeners", void 0), this.query = query, this.listeners = [], this.notify(), Dimensions.addEventListener("change", function () {
      _this.notify();
    });
  }
  return _create_class(NativeMediaQueryList2, [{
    key: "orientation",
    get: function () {
      var windowDimensions = Dimensions.get("window");
      return windowDimensions.height > windowDimensions.width ? "portrait" : "landscape";
    }
  }, {
    key: "notify",
    value: function () {
      var _this = this;
      this.listeners.forEach(function (listener) {
        listener(_this.orientation);
      });
    }
  }, {
    key: "addListener",
    value: function (listener) {
      this.listeners.push(listener);
    }
  }, {
    key: "removeListener",
    value: function (listener) {
      var index = this.listeners.indexOf(listener);
      index !== -1 && this.listeners.splice(index, 1);
    }
  }, {
    key: "match",
    value: function (query, param) {
      var {
        width,
        height
      } = param;
      return matchQuery(query, {
        type: "screen",
        orientation: height > width ? "portrait" : "landscape",
        "device-width": width,
        "device-height": height
      });
    }
  }, {
    key: "matches",
    get: function () {
      var windowDimensions = Dimensions.get("window"),
        matches = matchQuery(this.query, {
          type: "screen",
          orientation: this.orientation,
          ...windowDimensions,
          "device-width": windowDimensions.width,
          "device-height": windowDimensions.height
        });
      return matches;
    }
  }]), NativeMediaQueryList2;
}();
export { NativeMediaQueryList };
//# sourceMappingURL=mediaQueryList.native.js.map
