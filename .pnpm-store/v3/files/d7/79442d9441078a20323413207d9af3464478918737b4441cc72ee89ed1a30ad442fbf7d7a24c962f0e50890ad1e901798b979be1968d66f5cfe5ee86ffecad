import { useControllableState } from "@tamagui/use-controllable-state";
import { useSheetController } from "./useSheetController.mjs";
const useSheetOpenState = props => {
  const {
      isHidden,
      controller
    } = useSheetController(),
    onOpenChangeInternal = val => {
      controller?.onOpenChange?.(val), props.onOpenChange?.(val);
    },
    propVal = props.preferAdaptParentOpenState ? controller?.open ?? props.open : props.open ?? controller?.open,
    [open, setOpen] = useControllableState({
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
export { useSheetOpenState };
//# sourceMappingURL=useSheetOpenState.mjs.map
