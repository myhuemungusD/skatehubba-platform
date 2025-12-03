import { jsx as _jsx } from "react/jsx-runtime";
import { themeable, useTheme, variableToString } from "@tamagui/core";
import { YStack } from "@tamagui/stacks";
import * as React from "react";
import { ActivityIndicator } from "react-native";
var Spinner = YStack.extractable(themeable(/* @__PURE__ */React.forwardRef(function (props, ref) {
  var {
      size,
      color: colorProp,
      ...stackProps
    } = props,
    theme = useTheme(),
    color = colorProp;
  return color && color[0] === "$" && (color = variableToString(theme[color])), /* @__PURE__ */_jsx(YStack, {
    ref,
    ...stackProps,
    children: /* @__PURE__ */_jsx(ActivityIndicator, {
      size,
      color
    })
  });
}), {
  componentName: "Spinner"
}));
export { Spinner };
//# sourceMappingURL=Spinner.native.js.map
