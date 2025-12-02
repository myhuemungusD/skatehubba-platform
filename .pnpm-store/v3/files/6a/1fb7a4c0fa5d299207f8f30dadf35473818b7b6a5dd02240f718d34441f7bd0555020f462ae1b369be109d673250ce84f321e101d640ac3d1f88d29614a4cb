import { jsx as _jsx } from "react/jsx-runtime";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isClient, isWeb } from "@tamagui/core";
import { ListItem } from "@tamagui/list-item";
import * as React from "react";
import { useSelectContext, useSelectItemParentContext } from "./context.native.js";
var TRIGGER_NAME = "SelectTrigger",
  isPointerCoarse = isWeb && isClient ? window.matchMedia("(pointer:coarse)").matches : !0,
  SelectTrigger = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var _context_floatingContext,
      {
        scope,
        disabled = !1,
        unstyled = !1,
        ...triggerProps
      } = props,
      context = useSelectContext(scope),
      itemParentContext = useSelectItemParentContext(scope),
      composedRefs = useComposedRefs(forwardedRef, (_context_floatingContext = context.floatingContext) === null || _context_floatingContext === void 0 ? void 0 : _context_floatingContext.refs.setReference);
    return itemParentContext.shouldRenderWebNative ? null : /* @__PURE__ */_jsx(ListItem, {
      componentName: TRIGGER_NAME,
      unstyled,
      tag: "button",
      type: "button",
      id: itemParentContext.id,
      ...(!unstyled && {
        backgrounded: !0,
        radiused: !0,
        hoverTheme: !0,
        pressTheme: !0,
        focusable: !0,
        focusVisibleStyle: {
          outlineStyle: "solid",
          outlineWidth: 2,
          outlineColor: "$outlineColor"
        },
        borderWidth: 1,
        size: itemParentContext.size
      }),
      // aria-controls={context.contentId}
      "aria-expanded": context.open,
      "aria-autocomplete": "none",
      dir: context.dir,
      disabled,
      "data-disabled": disabled ? "" : void 0,
      ...triggerProps,
      ref: composedRefs,
      onPress() {
        itemParentContext.setOpen(!context.open);
      }
    });
  });
export { SelectTrigger };
//# sourceMappingURL=SelectTrigger.native.js.map
