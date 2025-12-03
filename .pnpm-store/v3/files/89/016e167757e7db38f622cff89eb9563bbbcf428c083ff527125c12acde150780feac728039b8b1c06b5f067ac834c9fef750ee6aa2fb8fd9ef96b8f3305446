import { useEvent } from "@tamagui/use-event";
import * as React from "react";
import { startTransition } from "@tamagui/start-transition";
var emptyCallbackFn = function (_) {
  return _();
};
function useControllableState(param) {
  var {
      prop,
      defaultProp,
      onChange,
      strategy = "prop-wins",
      preventUpdate,
      transition
    } = param,
    [state, setState] = React.useState(prop ?? defaultProp),
    previous = React.useRef(state),
    propWins = strategy === "prop-wins" && prop !== void 0,
    value = propWins ? prop : state,
    onChangeCb = useEvent(onChange || idFn),
    transitionFn = transition ? startTransition : emptyCallbackFn;
  React.useEffect(function () {
    prop !== void 0 && (previous.current = prop, transitionFn(function () {
      setState(prop);
    }));
  }, [prop]), React.useEffect(function () {
    propWins || state !== previous.current && (previous.current = state, onChangeCb(state));
  }, [onChangeCb, state, propWins]);
  var setter = useEvent(function (next) {
    if (!preventUpdate) if (propWins) {
      var nextValue = typeof next == "function" ? next(previous.current) : next;
      onChangeCb(nextValue);
    } else transitionFn(function () {
      setState(next);
    });
  });
  return [value, setter];
}
var idFn = function () {};
export { useControllableState };
//# sourceMappingURL=useControllableState.native.js.map
