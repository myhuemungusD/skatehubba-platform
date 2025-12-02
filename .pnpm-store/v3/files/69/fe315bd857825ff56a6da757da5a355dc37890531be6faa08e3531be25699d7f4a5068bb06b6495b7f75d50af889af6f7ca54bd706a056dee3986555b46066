import { jsx as _jsx } from "react/jsx-runtime";
import { View } from "@tamagui/core";
import { useStackedZIndex } from "@tamagui/z-index-stack";
import * as React from "react";
import { RootTagContext } from "react-native";
import { IS_FABRIC, USE_NATIVE_PORTAL } from "./constants.native.js";
import { GorhomPortalItem } from "./GorhomPortalItem.native.js";
import { getStackedZIndexProps } from "./helpers.native.js";
var createPortal = function () {
    if (IS_FABRIC) try {
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
    var rootTag = React.useContext(RootTagContext),
      zIndex = useStackedZIndex(getStackedZIndexProps(propsIn)),
      {
        children,
        passThrough
      } = propsIn,
      contents = /* @__PURE__ */_jsx(View, {
        pointerEvents: "box-none",
        position: "absolute",
        inset: 0,
        maxWidth: "100%",
        zIndex,
        passThrough,
        children
      });
    return !createPortal || !USE_NATIVE_PORTAL || !rootTag ? /* @__PURE__ */_jsx(GorhomPortalItem, {
      passThrough,
      hostName: "root",
      children: contents
    }) : createPortal(contents, rootTag);
  };
export { Portal };
//# sourceMappingURL=Portal.native.js.map
