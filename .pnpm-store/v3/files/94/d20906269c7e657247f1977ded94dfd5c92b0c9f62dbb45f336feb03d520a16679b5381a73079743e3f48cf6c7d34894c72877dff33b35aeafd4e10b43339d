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
var GorhomPortalItem_native_exports = {};
__export(GorhomPortalItem_native_exports, {
  GorhomPortalItem: () => GorhomPortalItem
});
module.exports = __toCommonJS(GorhomPortalItem_native_exports);
var import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_react = require("react"),
  import_GorhomPortal = require("./GorhomPortal.native.js"),
  GorhomPortalItem = function (props) {
    var {
        name: _providedName,
        hostName,
        handleOnMount: _providedHandleOnMount,
        handleOnUnmount: _providedHandleOnUnmount,
        handleOnUpdate: _providedHandleOnUpdate,
        children,
        passThrough
      } = props,
      {
        addPortal: addUpdatePortal,
        removePortal
      } = (0, import_GorhomPortal.usePortal)(hostName),
      id = (0, import_react.useId)(),
      name = _providedName || id,
      handleOnMount = (0, import_core.useEvent)(function () {
        _providedHandleOnMount ? _providedHandleOnMount(function () {
          return addUpdatePortal(name, children);
        }) : addUpdatePortal(name, children);
      }),
      handleOnUnmount = (0, import_core.useEvent)(function () {
        _providedHandleOnUnmount ? _providedHandleOnUnmount(function () {
          return removePortal(name);
        }) : removePortal(name);
      }),
      handleOnUpdate = (0, import_core.useEvent)(function () {
        _providedHandleOnUpdate ? _providedHandleOnUpdate(function () {
          return addUpdatePortal(name, children);
        }) : addUpdatePortal(name, children);
      });
    return (0, import_constants.useIsomorphicLayoutEffect)(function () {
      if (!passThrough) return handleOnMount(), function () {
        handleOnUnmount();
      };
    }, []), (0, import_react.useEffect)(function () {
      passThrough || handleOnUpdate();
    }, [children]), passThrough ? children : null;
  };
//# sourceMappingURL=GorhomPortalItem.native.js.map
