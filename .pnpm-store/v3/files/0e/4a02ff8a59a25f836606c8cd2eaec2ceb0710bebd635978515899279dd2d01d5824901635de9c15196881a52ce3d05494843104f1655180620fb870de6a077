import { useComposedRefs } from "@tamagui/compose-refs";
import { isClient, isWeb } from "@tamagui/core";
import { ListItem } from "@tamagui/list-item";
import * as React from "react";
import { useSelectContext, useSelectItemParentContext } from "./context";
import { jsx } from "react/jsx-runtime";
const TRIGGER_NAME = "SelectTrigger", isPointerCoarse = isWeb && isClient ? window.matchMedia("(pointer:coarse)").matches : !0, SelectTrigger = React.forwardRef(
  function(props, forwardedRef) {
    const { scope, disabled = !1, unstyled = !1, ...triggerProps } = props, context = useSelectContext(scope), itemParentContext = useSelectItemParentContext(scope), composedRefs = useComposedRefs(
      forwardedRef,
      context.floatingContext?.refs.setReference
    );
    return itemParentContext.shouldRenderWebNative ? null : /* @__PURE__ */ jsx(
      ListItem,
      {
        componentName: TRIGGER_NAME,
        unstyled,
        tag: "button",
        type: "button",
        id: itemParentContext.id,
        ...!unstyled && {
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
        },
        "aria-expanded": context.open,
        "aria-autocomplete": "none",
        dir: context.dir,
        disabled,
        "data-disabled": disabled ? "" : void 0,
        ...triggerProps,
        ref: composedRefs,
        ...itemParentContext.interactions ? {
          ...itemParentContext.interactions.getReferenceProps(),
          ...isPointerCoarse ? {
            onPress() {
              itemParentContext.setOpen(!context.open);
            }
          } : {
            onMouseDown() {
              context.floatingContext?.update(), itemParentContext.setOpen(!context.open);
            }
          }
        } : {
          onPress() {
            itemParentContext.setOpen(!context.open);
          }
        }
      }
    );
  }
);
export {
  SelectTrigger
};
//# sourceMappingURL=SelectTrigger.js.map
