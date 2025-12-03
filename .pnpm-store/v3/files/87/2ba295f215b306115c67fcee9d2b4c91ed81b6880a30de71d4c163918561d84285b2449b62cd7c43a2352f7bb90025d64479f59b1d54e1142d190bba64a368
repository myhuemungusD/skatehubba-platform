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
var FocusScopeController_exports = {};
__export(FocusScopeController_exports, {
  FocusScopeController: () => FocusScopeControllerComponent,
  FocusScopeControllerProvider: () => FocusScopeControllerProvider,
  createFocusScopeControllerScope: () => createFocusScopeControllerScope,
  useFocusScopeControllerContext: () => useFocusScopeControllerContext
});
module.exports = __toCommonJS(FocusScopeController_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_create_context = require("@tamagui/create-context"),
  import_use_event = require("@tamagui/use-event"),
  React = __toESM(require("react"), 1),
  FOCUS_SCOPE_CONTROLLER_NAME = "FocusScopeController",
  [createFocusScopeControllerContext, createFocusScopeControllerScope] = (0, import_create_context.createContextScope)(FOCUS_SCOPE_CONTROLLER_NAME),
  [FocusScopeControllerProvider, useFocusScopeControllerContext] = createFocusScopeControllerContext(FOCUS_SCOPE_CONTROLLER_NAME);
function FocusScopeController(props) {
  var {
      __scopeFocusScope,
      children,
      enabled,
      loop,
      trapped,
      onMountAutoFocus,
      onUnmountAutoFocus,
      forceUnmount,
      focusOnIdle
    } = props,
    stableOnMountAutoFocus = (0, import_use_event.useEvent)(onMountAutoFocus),
    stableOnUnmountAutoFocus = (0, import_use_event.useEvent)(onUnmountAutoFocus),
    contextValue = React.useMemo(function () {
      return {
        enabled,
        loop,
        trapped,
        onMountAutoFocus: stableOnMountAutoFocus,
        onUnmountAutoFocus: stableOnUnmountAutoFocus,
        forceUnmount,
        focusOnIdle
      };
    }, [enabled, loop, trapped, stableOnMountAutoFocus, stableOnUnmountAutoFocus, forceUnmount, focusOnIdle]);
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(FocusScopeControllerProvider, {
    scope: __scopeFocusScope,
    ...contextValue,
    children
  });
}
var FocusScopeControllerComponent = FocusScopeController;
//# sourceMappingURL=FocusScopeController.native.js.map
