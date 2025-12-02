import { themeable, useTheme, variableToString } from "@tamagui/core";
import { YStack } from "@tamagui/stacks";
import * as React from "react";
import { ActivityIndicator } from "react-native-web";
import { jsx } from "react/jsx-runtime";
const Spinner = YStack.extractable(themeable(React.forwardRef((props, ref) => {
  const {
      size,
      color: colorProp,
      ...stackProps
    } = props,
    theme = useTheme();
  let color = colorProp;
  return color && color[0] === "$" && (color = variableToString(theme[color])), /* @__PURE__ */jsx(YStack, {
    ref,
    ...stackProps,
    children: /* @__PURE__ */jsx(ActivityIndicator, {
      size,
      color
    })
  });
}), {
  componentName: "Spinner"
}));
export { Spinner };
//# sourceMappingURL=Spinner.mjs.map
