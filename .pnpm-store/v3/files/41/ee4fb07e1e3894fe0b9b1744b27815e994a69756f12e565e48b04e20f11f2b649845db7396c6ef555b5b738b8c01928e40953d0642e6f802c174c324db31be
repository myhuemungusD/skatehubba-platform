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
export { getReactNativeConfig, setupReactNative };
//# sourceMappingURL=setupReactNative.native.js.map
