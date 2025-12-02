import { composeRefs } from "@tamagui/compose-refs";
import { useEvent } from "@tamagui/web";
import React from "react";
import { registerFocusable } from "./registerFocusable.mjs";
function useFocusable({
  isInput,
  props,
  ref
}) {
  const {
      id,
      onChangeText,
      value,
      defaultValue
    } = props,
    inputValue = React.useRef(value || defaultValue || ""),
    unregisterFocusable = React.useRef(void 0),
    focusAndSelect = React.useCallback(input => {
      input.focus(), input.setSelection && typeof inputValue.current == "string" && input.setSelection(0, inputValue.current.length);
    }, []),
    registerFocusableHandler = React.useCallback(input => {
      !id || !input || (unregisterFocusable.current?.(), unregisterFocusable.current = registerFocusable(id, {
        focus: input.focus,
        ...(isInput && {
          focusAndSelect: () => focusAndSelect(input)
        })
      }));
    }, [id, isInput, focusAndSelect]),
    inputRef = React.useCallback(input => {
      input && registerFocusableHandler(input);
    }, [registerFocusableHandler]),
    handleChangeText = useEvent(value2 => {
      inputValue.current = value2, onChangeText?.(value2);
    });
  return React.useEffect(() => () => {
    unregisterFocusable.current?.();
  }, []), {
    ref: React.useMemo(() => composeRefs(ref, inputRef), [ref, inputRef]),
    onChangeText: handleChangeText
  };
}
export { useFocusable };
//# sourceMappingURL=focusableInputHOC.mjs.map
