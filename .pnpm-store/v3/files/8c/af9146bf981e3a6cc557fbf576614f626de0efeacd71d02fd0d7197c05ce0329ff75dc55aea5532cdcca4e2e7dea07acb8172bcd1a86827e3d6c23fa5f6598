import React from "react";
import { PressResponder } from "./PressResponder.native.js";
function usePressEvents(_, config) {
  var pressResponderRef = React.useRef(null);
  pressResponderRef.current == null && (pressResponderRef.current = new PressResponder(config));
  var pressResponder = pressResponderRef.current;
  return React.useEffect(function () {
    pressResponder.configure(config);
  }, [config, pressResponder]), React.useEffect(function () {
    return function () {
      pressResponder.reset();
    };
  }, [pressResponder]), React.useDebugValue(config), pressResponder.getEventHandlers();
}
export { usePressEvents };
//# sourceMappingURL=index.native.js.map
