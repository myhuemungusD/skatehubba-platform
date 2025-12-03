import React from "react";
import { PressResponder } from "./PressResponder";
function usePressEvents(_, config) {
  const pressResponderRef = React.useRef(null);
  pressResponderRef.current == null && (pressResponderRef.current = new PressResponder(config));
  const pressResponder = pressResponderRef.current;
  return React.useEffect(() => {
    pressResponder.configure(config);
  }, [config, pressResponder]), React.useEffect(() => () => {
    pressResponder.reset();
  }, [pressResponder]), React.useDebugValue(config), pressResponder.getEventHandlers();
}
export {
  usePressEvents
};
//# sourceMappingURL=index.js.map
