import React from "react";
import { Keyboard } from "react-native-web";
const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(!1);
  return React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardVisible(!0);
      }),
      keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardVisible(!1);
      });
    return () => {
      keyboardDidHideListener.remove(), keyboardDidShowListener.remove();
    };
  }, []), isKeyboardVisible;
};
export { useKeyboardVisible };
//# sourceMappingURL=useKeyboardVisible.mjs.map
