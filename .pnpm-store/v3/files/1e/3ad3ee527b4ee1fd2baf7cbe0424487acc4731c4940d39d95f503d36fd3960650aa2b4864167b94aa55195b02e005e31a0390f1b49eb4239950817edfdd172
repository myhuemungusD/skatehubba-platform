import { isWeb } from "@tamagui/constants";
import { styled } from "@tamagui/core";
import { SizableText } from "@tamagui/text";
import { Linking } from "react-native-web";
import { jsx } from "react/jsx-runtime";
const AnchorFrame = styled(SizableText, {
  name: "Anchor",
  tag: "a",
  accessibilityRole: "link"
}), Anchor = AnchorFrame.styleable(
  ({ href, target, ...props }, ref) => /* @__PURE__ */ jsx(
    AnchorFrame,
    {
      ...props,
      ...isWeb ? {
        href,
        target
      } : {
        onPress: (event) => {
          props.onPress?.(event), href !== void 0 && Linking.openURL(href);
        }
      },
      ref
    }
  )
);
export {
  Anchor
};
//# sourceMappingURL=Anchor.js.map
