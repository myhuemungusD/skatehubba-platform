import React, { useId } from "react";
import { useEvent } from "@tamagui/core";
import { SheetControllerContext } from "./useSheetController";
import { jsx } from "react/jsx-runtime";
const SheetController = ({
  children,
  onOpenChange: onOpenChangeProp,
  open,
  hidden,
  disableDrag
}) => {
  const onOpenChange = useEvent(onOpenChangeProp), id = useId(), memoValue = React.useMemo(
    () => ({
      id,
      open,
      hidden,
      disableDrag,
      onOpenChange
    }),
    [id, onOpenChange, open, hidden, disableDrag]
  );
  return /* @__PURE__ */ jsx(SheetControllerContext.Provider, { value: memoValue, children });
};
export {
  SheetController
};
//# sourceMappingURL=SheetController.js.map
