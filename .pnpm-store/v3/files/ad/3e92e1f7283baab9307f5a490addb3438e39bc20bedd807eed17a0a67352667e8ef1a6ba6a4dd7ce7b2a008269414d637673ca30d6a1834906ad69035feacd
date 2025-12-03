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
var addNativeValidStyles_native_exports = {};
__export(addNativeValidStyles_native_exports, {
  addNativeValidStyles: () => addNativeValidStyles
});
module.exports = __toCommonJS(addNativeValidStyles_native_exports);
var import_helpers = require("@tamagui/helpers");
function getReactNativeVersion() {
  var version = process.env.REACT_NATIVE_VERSION || "";
  if (!process.env.REACT_NATIVE_VERSION) try {
    var ReactNativeOfficalVersion = require("react-native/Libraries/Core/ReactNativeVersion");
    if (ReactNativeOfficalVersion) {
      var {
        version: {
          major,
          minor,
          patch
        }
      } = ReactNativeOfficalVersion;
      version = `${major}.${minor}.${patch}`;
    }
  } catch {} finally {
    version || (version = "0.77");
  }
  var [major1, minor1, patch1] = version.split(".");
  return [+major1, +minor1, +patch1];
}
function addNativeValidStyles() {
  var [major, minor] = getReactNativeVersion();
  if (major === 0 && minor >= 77) {
    var additional = {
      boxSizing: !0,
      mixBlendMode: !0,
      outlineWidth: !0,
      outlineStyle: !0,
      outlineSpread: !0,
      outlineColor: !0
    };
    Object.assign(import_helpers.validStyles, additional), Object.assign(import_helpers.stylePropsAll, additional);
  }
}
//# sourceMappingURL=addNativeValidStyles.native.js.map
