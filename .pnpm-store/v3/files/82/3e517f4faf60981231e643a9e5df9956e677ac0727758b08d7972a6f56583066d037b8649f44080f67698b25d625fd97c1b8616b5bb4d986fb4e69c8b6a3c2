import React from "react";
import { Keyboard } from "react-native";
var useKeyboardVisible = function () {
  var [isKeyboardVisible, setKeyboardVisible] = React.useState(!1);
  return React.useEffect(function () {
    var keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", function () {
        setKeyboardVisible(!0);
      }),
      keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", function () {
        setKeyboardVisible(!1);
      });
    return function () {
      keyboardDidHideListener.remove(), keyboardDidShowListener.remove();
    };
  }, []), isKeyboardVisible;
};
export { useKeyboardVisible };
//# sourceMappingURL=useKeyboardVisible.native.js.map
