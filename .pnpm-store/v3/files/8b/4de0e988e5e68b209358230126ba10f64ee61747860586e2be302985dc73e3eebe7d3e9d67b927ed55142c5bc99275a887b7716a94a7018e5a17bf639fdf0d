import { getFontSized } from "@tamagui/get-font-sized";
import { Text, styled } from "@tamagui/web";
const SizableText = styled(Text, {
  name: "SizableText",
  fontFamily: "$body",
  variants: {
    unstyled: {
      false: {
        size: "$true",
        color: "$color"
      }
    },
    size: getFontSized
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
});
SizableText.staticConfig.variants.fontFamily = {
  "...": (_val, extras) => {
    const sizeProp = extras.props.size,
      fontSizeProp = extras.props.fontSize,
      size = sizeProp === "$true" && fontSizeProp ? fontSizeProp : extras.props.size || "$true";
    return getFontSized(size, extras);
  }
};
export { SizableText };
//# sourceMappingURL=SizableText.mjs.map
