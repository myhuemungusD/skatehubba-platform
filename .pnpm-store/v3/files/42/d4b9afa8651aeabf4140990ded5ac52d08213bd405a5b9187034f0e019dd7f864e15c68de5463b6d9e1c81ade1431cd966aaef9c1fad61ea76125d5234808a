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
  import_useSheetController = require("./useSheetController.cjs");
const useSheetOpenState = props => {
  const {
      isHidden,
      controller
    } = (0, import_useSheetController.useSheetController)(),
    onOpenChangeInternal = val => {
      controller?.onOpenChange?.(val), props.onOpenChange?.(val);
    },
    propVal = props.preferAdaptParentOpenState ? controller?.open ?? props.open : props.open ?? controller?.open,
    [open, setOpen] = (0, import_use_controllable_state.useControllableState)({
      prop: propVal,
      defaultProp: props.defaultOpen ?? !1,
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