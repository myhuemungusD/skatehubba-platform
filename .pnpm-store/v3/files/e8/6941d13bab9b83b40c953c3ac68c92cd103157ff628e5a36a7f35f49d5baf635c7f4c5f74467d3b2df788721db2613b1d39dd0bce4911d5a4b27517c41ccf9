import { useEvent } from "@tamagui/use-event";
import * as React from "react";
import { startTransition } from "@tamagui/start-transition";
const emptyCallbackFn = _ => _();
function useControllableState({
  prop,
  defaultProp,
  onChange,
  strategy = "prop-wins",
  preventUpdate,
  transition
}) {
  const [state, setState] = React.useState(prop ?? defaultProp),
    previous = React.useRef(state),
    propWins = strategy === "prop-wins" && prop !== void 0,
    value = propWins ? prop : state,
    onChangeCb = useEvent(onChange || idFn),
    transitionFn = transition ? startTransition : emptyCallbackFn;
  React.useEffect(() => {
    prop !== void 0 && (previous.current = prop, transitionFn(() => {
      setState(prop);
    }));
  }, [prop]), React.useEffect(() => {
    propWins || state !== previous.current && (previous.current = state, onChangeCb(state));
  }, [onChangeCb, state, propWins]);
  const setter = useEvent(next => {
    if (!preventUpdate) if (propWins) {
      const nextValue = typeof next == "function" ? next(previous.current) : next;
      onChangeCb(nextValue);
    } else transitionFn(() => {
      setState(next);
    });
  });
  return [value, setter];
}
const idFn = () => {};
export { useControllableState };
//# sourceMappingURL=useControllableState.mjs.map
