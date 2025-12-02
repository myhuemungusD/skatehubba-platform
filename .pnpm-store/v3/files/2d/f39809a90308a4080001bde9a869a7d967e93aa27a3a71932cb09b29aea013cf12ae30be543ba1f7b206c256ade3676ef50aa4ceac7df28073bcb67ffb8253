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
var Portal_native_exports = {};
__export(Portal_native_exports, {
  Portal: () => Portal
});
module.exports = __toCommonJS(Portal_native_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_core = require("@tamagui/core"),
  import_z_index_stack = require("@tamagui/z-index-stack"),
  React = __toESM(require("react"), 1),
  import_react_native = require("react-native"),
  import_constants = require("./constants.native.js"),
  import_GorhomPortalItem = require("./GorhomPortalItem.native.js"),
  import_helpers = require("./helpers.native.js"),
  createPortal = function () {
    if (import_constants.IS_FABRIC) try {
      var _ReactFabricShimModule_default,
        ReactFabricShimModule = require("react-native/Libraries/Renderer/shims/ReactFabric"),
        _ReactFabricShimModule_default_createPortal;
      return (_ReactFabricShimModule_default_createPortal = ReactFabricShimModule == null || (_ReactFabricShimModule_default = ReactFabricShimModule.default) === null || _ReactFabricShimModule_default === void 0 ? void 0 : _ReactFabricShimModule_default.createPortal) !== null && _ReactFabricShimModule_default_createPortal !== void 0 ? _ReactFabricShimModule_default_createPortal : ReactFabricShimModule.createPortal;
    } catch (err) {
      return console.info("Note: error importing portal, defaulting to non-native portals", err), null;
    }
    try {
      var _ReactNativeShimModule_default,
        ReactNativeShimModule = require("react-native/Libraries/Renderer/shims/ReactNative"),
        _ReactNativeShimModule_default_createPortal;
      return (_ReactNativeShimModule_default_createPortal = ReactNativeShimModule == null || (_ReactNativeShimModule_default = ReactNativeShimModule.default) === null || _ReactNativeShimModule_default === void 0 ? void 0 : _ReactNativeShimModule_default.createPortal) !== null && _ReactNativeShimModule_default_createPortal !== void 0 ? _ReactNativeShimModule_default_createPortal : ReactNativeShimModule.createPortal;
    } catch (err) {
      return console.info("Note: error importing portal, defaulting to non-native portals", err), null;
    }
  }(),
  Portal = function (propsIn) {
    var rootTag = React.useContext(import_react_native.RootTagContext),
      zIndex = (0, import_z_index_stack.useStackedZIndex)((0, import_helpers.getStackedZIndexProps)(propsIn)),
      {
        children,
        passThrough
      } = propsIn,
      contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.View, {
        pointerEvents: "box-none",
        position: "absolute",
        inset: 0,
        maxWidth: "100%",
        zIndex,
        passThrough,
        children
      });
    return !createPortal || !import_constants.USE_NATIVE_PORTAL || !rootTag ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_GorhomPortalItem.GorhomPortalItem, {
      passThrough,
      hostName: "root",
      children: contents
    }) : createPortal(contents, rootTag);
  };
//# sourceMappingURL=Portal.native.js.map
