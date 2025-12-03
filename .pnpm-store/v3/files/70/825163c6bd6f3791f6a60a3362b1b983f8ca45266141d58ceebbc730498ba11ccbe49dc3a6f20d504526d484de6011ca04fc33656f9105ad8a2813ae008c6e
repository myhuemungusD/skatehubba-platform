"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var mediaQueryList_exports = {};
__export(mediaQueryList_exports, {
  NativeMediaQueryList: () => NativeMediaQueryList
});
module.exports = __toCommonJS(mediaQueryList_exports);
var import_react_native = require("react-native"),
  import_matchQuery = require("./matchQuery.native.js");
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
    _class_call_check(this, NativeMediaQueryList2), _define_property(this, "query", void 0), _define_property(this, "listeners", void 0), this.query = query, this.listeners = [], this.notify(), import_react_native.Dimensions.addEventListener("change", function () {
      _this.notify();
    });
  }
  return _create_class(NativeMediaQueryList2, [{
    key: "orientation",
    get: function () {
      var windowDimensions = import_react_native.Dimensions.get("window");
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
      return (0, import_matchQuery.matchQuery)(query, {
        type: "screen",
        orientation: height > width ? "portrait" : "landscape",
        "device-width": width,
        "device-height": height
      });
    }
  }, {
    key: "matches",
    get: function () {
      var windowDimensions = import_react_native.Dimensions.get("window"),
        matches = (0, import_matchQuery.matchQuery)(this.query, {
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
//# sourceMappingURL=mediaQueryList.native.js.map
