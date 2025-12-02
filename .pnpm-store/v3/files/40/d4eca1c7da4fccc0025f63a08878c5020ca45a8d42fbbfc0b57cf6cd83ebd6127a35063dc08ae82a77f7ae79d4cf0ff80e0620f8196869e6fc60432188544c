import { composeRefs } from "@tamagui/compose-refs";
import { useEvent } from "@tamagui/web";
import React from "react";
import { registerFocusable } from "./registerFocusable.native.js";
function useFocusable(param) {
  var {
      isInput,
      props,
      ref
    } = param,
    {
      id,
      onChangeText,
      value,
      defaultValue
    } = props,
    inputValue = React.useRef(value || defaultValue || ""),
    unregisterFocusable = React.useRef(void 0),
    focusAndSelect = React.useCallback(function (input) {
      input.focus(), input.setSelection && typeof inputValue.current == "string" && input.setSelection(0, inputValue.current.length);
    }, []),
    registerFocusableHandler = React.useCallback(function (input) {
      var _unregisterFocusable_current;
      !id || !input || ((_unregisterFocusable_current = unregisterFocusable.current) === null || _unregisterFocusable_current === void 0 || _unregisterFocusable_current.call(unregisterFocusable), unregisterFocusable.current = registerFocusable(id, {
        focus: input.focus,
        ...(isInput && {
          focusAndSelect: function () {
            return focusAndSelect(input);
          }
        })
      }));
    }, [id, isInput, focusAndSelect]),
    inputRef = React.useCallback(function (input) {
      input && registerFocusableHandler(input);
    }, [registerFocusableHandler]),
    handleChangeText = useEvent(function (value2) {
      inputValue.current = value2, onChangeText?.(value2);
    });
  return React.useEffect(function () {
    return function () {
      var _unregisterFocusable_current;
      (_unregisterFocusable_current = unregisterFocusable.current) === null || _unregisterFocusable_current === void 0 || _unregisterFocusable_current.call(unregisterFocusable);
    };
  }, []), {
    ref: React.useMemo(function () {
      return composeRefs(ref, inputRef);
    }, [ref, inputRef]),
    onChangeText: handleChangeText
  };
}
export { useFocusable };
//# sourceMappingURL=focusableInputHOC.native.js.map
