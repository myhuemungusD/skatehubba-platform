import React from "react";
var useSheetController = function () {
    var controller = React.useContext(SheetControllerContext),
      isHidden = controller?.hidden,
      isShowingNonSheet = isHidden && controller?.open;
    return {
      controller,
      isHidden,
      isShowingNonSheet,
      disableDrag: controller?.disableDrag
    };
  },
  SheetControllerContext = /* @__PURE__ */React.createContext(null);
export { SheetControllerContext, useSheetController };
//# sourceMappingURL=useSheetController.native.js.map
