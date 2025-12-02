import React from "react";
import {
  safePolygon,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole
} from "@floating-ui/react";
const useFloatingContext = ({
  open,
  setOpen,
  disable,
  disableFocus,
  hoverable
}) => React.useCallback(
  (props) => {
    const floating = useFloating({
      ...props,
      open,
      onOpenChange: (val, event) => {
        const type = event?.type === "mousemove" || event?.type === "mouseenter" || event?.type === "mouseleave" ? "hover" : "press";
        setOpen(val, type);
      }
    }), { getReferenceProps, getFloatingProps } = useInteractions([
      hoverable ? useHover(floating.context, {
        enabled: !disable && hoverable,
        handleClose: safePolygon({
          requireIntent: !0,
          blockPointerEvents: !0,
          buffer: 1
        }),
        ...hoverable && typeof hoverable == "object" && hoverable
      }) : useHover(floating.context, {
        enabled: !1
      }),
      useFocus(floating.context, {
        enabled: !disable && !disableFocus,
        visibleOnly: !0
      }),
      useRole(floating.context, { role: "dialog" }),
      useDismiss(floating.context, {
        enabled: !disable
      })
    ]);
    return {
      ...floating,
      open,
      getReferenceProps,
      getFloatingProps
    };
  },
  [open, setOpen, disable, disableFocus, hoverable]
);
export {
  useFloatingContext
};
//# sourceMappingURL=useFloatingContext.js.map
