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
var setupReactNative_exports = {};
__export(setupReactNative_exports, {
  getReactNativeConfig: () => getReactNativeConfig,
  setupReactNative: () => setupReactNative
});
module.exports = __toCommonJS(setupReactNative_exports);
var ReactNativeStaticConfigs = /* @__PURE__ */new WeakMap();
function getReactNativeConfig(Component) {
  var _Component_State;
  if (Component) {
    var _Component_propTypes, _Component_propTypes1, _Component_propTypes2;
    return !((_Component_propTypes = Component.propTypes) === null || _Component_propTypes === void 0) && _Component_propTypes.onTextInput || !((_Component_propTypes1 = Component.propTypes) === null || _Component_propTypes1 === void 0) && _Component_propTypes1.onChangeText ? RNConfigs.TextInput : Component.getSizeWithHeaders ? RNConfigs.Image : !((_Component_propTypes2 = Component.propTypes) === null || _Component_propTypes2 === void 0) && _Component_propTypes2.textBreakStrategy ? RNConfigs.Text : RNConfigs.default;
  }
}
var RNConfigs = {
  Image: {
    isReactNative: !0,
    inlineProps: /* @__PURE__ */new Set(["src", "width", "height"])
  },
  Text: {
    isReactNative: !0,
    isText: !0
  },
  TextInput: {
    isReactNative: !0,
    isInput: !0,
    isText: !0
  },
  default: {
    isReactNative: !0
  }
};
function setupReactNative(rnExports) {}
//# sourceMappingURL=setupReactNative.native.js.map
