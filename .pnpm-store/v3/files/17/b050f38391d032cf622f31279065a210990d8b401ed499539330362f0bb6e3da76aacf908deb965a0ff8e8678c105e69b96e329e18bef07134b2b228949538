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
var useSheetOpenState_exports = {};
__export(useSheetOpenState_exports, {
  useSheetOpenState: () => useSheetOpenState
});
module.exports = __toCommonJS(useSheetOpenState_exports);
var import_use_controllable_state = require("@tamagui/use-controllable-state"),
  import_useSheetController = require("./useSheetController.native.js"),
  useSheetOpenState = function (props) {
    var {
        isHidden,
        controller
      } = (0, import_useSheetController.useSheetController)(),
      onOpenChangeInternal = function (val) {
        var _controller_onOpenChange, _props_onOpenChange;
        controller == null || (_controller_onOpenChange = controller.onOpenChange) === null || _controller_onOpenChange === void 0 || _controller_onOpenChange.call(controller, val), (_props_onOpenChange = props.onOpenChange) === null || _props_onOpenChange === void 0 || _props_onOpenChange.call(props, val);
      },
      _controller_open,
      _props_open,
      propVal = props.preferAdaptParentOpenState ? (_controller_open = controller?.open) !== null && _controller_open !== void 0 ? _controller_open : props.open : (_props_open = props.open) !== null && _props_open !== void 0 ? _props_open : controller?.open,
      _props_defaultOpen,
      [open, setOpen] = (0, import_use_controllable_state.useControllableState)({
        prop: propVal,
        defaultProp: (_props_defaultOpen = props.defaultOpen) !== null && _props_defaultOpen !== void 0 ? _props_defaultOpen : !1,
        onChange: onOpenChangeInternal,
        strategy: "most-recent-wins"
      });
    return {
      open,
      setOpen,
      isHidden,
      controller
    };
  };
//# sourceMappingURL=useSheetOpenState.native.js.map
