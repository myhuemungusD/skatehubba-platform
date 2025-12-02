import { useControllableState } from "@tamagui/use-controllable-state";
import { useSheetController } from "./useSheetController.native.js";
var useSheetOpenState = function (props) {
  var {
      isHidden,
      controller
    } = useSheetController(),
    onOpenChangeInternal = function (val) {
      var _controller_onOpenChange, _props_onOpenChange;
      controller == null || (_controller_onOpenChange = controller.onOpenChange) === null || _controller_onOpenChange === void 0 || _controller_onOpenChange.call(controller, val), (_props_onOpenChange = props.onOpenChange) === null || _props_onOpenChange === void 0 || _props_onOpenChange.call(props, val);
    },
    _controller_open,
    _props_open,
    propVal = props.preferAdaptParentOpenState ? (_controller_open = controller?.open) !== null && _controller_open !== void 0 ? _controller_open : props.open : (_props_open = props.open) !== null && _props_open !== void 0 ? _props_open : controller?.open,
    _props_defaultOpen,
    [open, setOpen] = useControllableState({
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
export { useSheetOpenState };
//# sourceMappingURL=useSheetOpenState.native.js.map
