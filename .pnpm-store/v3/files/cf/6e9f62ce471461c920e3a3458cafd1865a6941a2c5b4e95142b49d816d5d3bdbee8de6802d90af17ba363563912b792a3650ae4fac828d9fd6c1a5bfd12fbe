import React from "react";
const useSheetController = () => {
    const controller = React.useContext(SheetControllerContext),
      isHidden = controller?.hidden,
      isShowingNonSheet = isHidden && controller?.open;
    return {
      controller,
      isHidden,
      isShowingNonSheet,
      disableDrag: controller?.disableDrag
    };
  },
  SheetControllerContext = React.createContext(null);
export { SheetControllerContext, useSheetController };
//# sourceMappingURL=useSheetController.mjs.map
