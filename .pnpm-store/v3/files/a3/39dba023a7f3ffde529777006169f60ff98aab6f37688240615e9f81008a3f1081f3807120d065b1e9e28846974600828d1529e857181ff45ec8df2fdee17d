import { jsx as _jsx } from "react/jsx-runtime";
import { AdaptContext, AdaptPortalContents, useAdaptContext } from "@tamagui/adapt";
import { Theme, useThemeName } from "@tamagui/core";
import { VIEWPORT_NAME } from "./constants.native.js";
import { ForwardSelectContext, useSelectContext, useSelectItemParentContext } from "./context.native.js";
var SelectViewport = function (props) {
  var {
      scope,
      children
    } = props,
    context = useSelectContext(scope),
    itemParentContext = useSelectItemParentContext(scope),
    themeName = useThemeName(),
    adaptContext = useAdaptContext();
  return /* @__PURE__ */_jsx(AdaptPortalContents, {
    scope: context.adaptScope,
    children: /* @__PURE__ */_jsx(Theme, {
      name: themeName,
      children: /* @__PURE__ */_jsx(ForwardSelectContext, {
        itemContext: itemParentContext,
        context,
        children: /* @__PURE__ */_jsx(AdaptContext.Provider, {
          ...adaptContext,
          children
        })
      })
    })
  });
};
SelectViewport.displayName = VIEWPORT_NAME;
export { SelectViewport };
//# sourceMappingURL=SelectViewport.native.js.map
