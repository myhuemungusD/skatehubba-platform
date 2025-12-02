import { validStyles, stylePropsAll } from "@tamagui/helpers";
function getReactNativeVersion() {
  var version = process.env.REACT_NATIVE_VERSION || "";
  if (!process.env.REACT_NATIVE_VERSION) try {
    var ReactNativeOfficalVersion = require("react-native/Libraries/Core/ReactNativeVersion");
    if (ReactNativeOfficalVersion) {
      var {
        version: {
          major,
          minor,
          patch
        }
      } = ReactNativeOfficalVersion;
      version = `${major}.${minor}.${patch}`;
    }
  } catch {} finally {
    version || (version = "0.77");
  }
  var [major1, minor1, patch1] = version.split(".");
  return [+major1, +minor1, +patch1];
}
function addNativeValidStyles() {
  var [major, minor] = getReactNativeVersion();
  if (major === 0 && minor >= 77) {
    var additional = {
      boxSizing: !0,
      mixBlendMode: !0,
      outlineWidth: !0,
      outlineStyle: !0,
      outlineSpread: !0,
      outlineColor: !0
    };
    Object.assign(validStyles, additional), Object.assign(stylePropsAll, additional);
  }
}
export { addNativeValidStyles };
//# sourceMappingURL=addNativeValidStyles.native.js.map
