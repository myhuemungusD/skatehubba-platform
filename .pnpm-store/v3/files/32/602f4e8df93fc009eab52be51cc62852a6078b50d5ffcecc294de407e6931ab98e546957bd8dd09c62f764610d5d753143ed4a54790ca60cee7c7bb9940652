import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useComposedRefs } from "@tamagui/compose-refs";
import { styled, useIsomorphicLayoutEffect } from "@tamagui/core";
import { SizableText } from "@tamagui/text";
import * as React from "react";
import { useSelectContext, useSelectItemParentContext } from "./context.native.js";
import { useSelectItemContext } from "./SelectItem.native.js";
var ITEM_TEXT_NAME = "SelectItemText",
  SelectItemTextFrame = styled(SizableText, {
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
  }),
  SelectItemText = SelectItemTextFrame.styleable(function (props, forwardedRef) {
    var {
        scope,
        className,
        ...itemTextProps
      } = props,
      context = useSelectContext(scope),
      itemParentContext = useSelectItemParentContext(scope),
      ref = React.useRef(null),
      composedRefs = useComposedRefs(forwardedRef, ref),
      itemContext = useSelectItemContext(scope),
      contents = React.useRef(null);
    return contents.current = /* @__PURE__ */_jsx(SelectItemTextFrame, {
      className,
      size: itemParentContext.size,
      id: itemContext.textId,
      ...itemTextProps,
      ref: composedRefs
    }), useIsomorphicLayoutEffect(function () {
      itemParentContext.initialValue === itemContext.value && !context.selectedIndex && context.setSelectedItem(contents.current);
    }, []), useIsomorphicLayoutEffect(function () {
      return itemParentContext.valueSubscribe(function (val) {
        val === itemContext.value && context.setSelectedItem(contents.current);
      });
    }, [itemContext.value]), itemParentContext.shouldRenderWebNative ? /* @__PURE__ */_jsx(_Fragment, {
      children: props.children
    }) : /* @__PURE__ */_jsx(_Fragment, {
      children: contents.current
    });
  });
export { ITEM_TEXT_NAME, SelectItemText, SelectItemTextFrame };
//# sourceMappingURL=SelectItemText.native.js.map
