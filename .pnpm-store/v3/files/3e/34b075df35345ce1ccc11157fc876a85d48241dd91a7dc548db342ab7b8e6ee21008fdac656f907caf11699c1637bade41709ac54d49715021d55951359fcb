import { jsx as _jsx } from "react/jsx-runtime";
import { isWeb } from "@tamagui/constants";
import { styled } from "@tamagui/core";
import { SizableText } from "@tamagui/text";
import { Linking } from "react-native";
var AnchorFrame = styled(SizableText, {
    name: "Anchor",
    tag: "a",
    accessibilityRole: "link"
  }),
  Anchor = AnchorFrame.styleable(function (param, ref) {
    var {
      href,
      target,
      ...props
    } = param;
    return /* @__PURE__ */_jsx(AnchorFrame, {
      ...props,
      ...(isWeb ? {
        href,
        target
      } : {
        onPress: function (event) {
          var _props_onPress;
          (_props_onPress = props.onPress) === null || _props_onPress === void 0 || _props_onPress.call(props, event), href !== void 0 && Linking.openURL(href);
        }
      }),
      ref
    });
  });
export { Anchor };
//# sourceMappingURL=Anchor.native.js.map
