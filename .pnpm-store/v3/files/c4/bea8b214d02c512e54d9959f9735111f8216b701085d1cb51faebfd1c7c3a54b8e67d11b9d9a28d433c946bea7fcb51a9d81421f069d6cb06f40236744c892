import { useComposedRefs } from "@tamagui/compose-refs";
import { styled, useIsomorphicLayoutEffect } from "@tamagui/core";
import { SizableText } from "@tamagui/text";
import * as React from "react";
import { useSelectContext, useSelectItemParentContext } from "./context";
import { useSelectItemContext } from "./SelectItem";
import { Fragment, jsx } from "react/jsx-runtime";
const ITEM_TEXT_NAME = "SelectItemText", SelectItemTextFrame = styled(SizableText, {
  name: ITEM_TEXT_NAME,
  variants: {
    unstyled: {
      false: {
        userSelect: "none",
        color: "$color",
        ellipse: !0
      }
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), SelectItemText = SelectItemTextFrame.styleable(
  function(props, forwardedRef) {
    const { scope, className, ...itemTextProps } = props, context = useSelectContext(scope), itemParentContext = useSelectItemParentContext(scope), ref = React.useRef(null), composedRefs = useComposedRefs(forwardedRef, ref), itemContext = useSelectItemContext(scope), contents = React.useRef(null);
    return contents.current = /* @__PURE__ */ jsx(
      SelectItemTextFrame,
      {
        className,
        size: itemParentContext.size,
        id: itemContext.textId,
        ...itemTextProps,
        ref: composedRefs
      }
    ), useIsomorphicLayoutEffect(() => {
      itemParentContext.initialValue === itemContext.value && !context.selectedIndex && context.setSelectedItem(contents.current);
    }, []), useIsomorphicLayoutEffect(() => itemParentContext.valueSubscribe((val) => {
      val === itemContext.value && context.setSelectedItem(contents.current);
    }), [itemContext.value]), itemParentContext.shouldRenderWebNative ? /* @__PURE__ */ jsx(Fragment, { children: props.children }) : /* @__PURE__ */ jsx(Fragment, { children: contents.current });
  }
);
export {
  ITEM_TEXT_NAME,
  SelectItemText,
  SelectItemTextFrame
};
//# sourceMappingURL=SelectItemText.js.map
