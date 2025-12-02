import { useCallbackRef } from "@tamagui/use-callback-ref";
import React from "react";
function useEscapeKeydown(onEscapeKeyDownProp) {
  var ownerDocument = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function () {
      var _globalThis;
      return (_globalThis = globalThis) === null || _globalThis === void 0 ? void 0 : _globalThis.document;
    }(),
    onEscapeKeyDown = useCallbackRef(onEscapeKeyDownProp);
  React.useEffect(function () {
    var handleKeyDown = function (event) {
      event.key === "Escape" && onEscapeKeyDown(event);
    };
    return ownerDocument.addEventListener("keydown", handleKeyDown), function () {
      ownerDocument.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEscapeKeyDown, ownerDocument]);
}
export { useEscapeKeydown };
//# sourceMappingURL=index.native.js.map
