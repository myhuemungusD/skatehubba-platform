import React from "react";
import { useTheme } from "./hooks/useTheme";
import { jsx } from "react/jsx-runtime";
const _withStableStyle = (Component, styleProvider) => React.forwardRef((props, ref) => {
  const { _expressions = [], ...rest } = props, theme = useTheme();
  return /* @__PURE__ */ jsx(Component, { ref, style: styleProvider(theme, _expressions), ...rest });
});
export {
  _withStableStyle
};
//# sourceMappingURL=_withStableStyle.js.map
