import { FloatingFocusManager } from "@floating-ui/react";
import { AdaptPortalContents, useAdaptIsActive } from "@tamagui/adapt";
import { AnimatePresence } from "@tamagui/animate-presence";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isAndroid, isIos, isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { styled } from "@tamagui/core";
import { ThemeableStack } from "@tamagui/stacks";
import { VIEWPORT_NAME } from "./constants";
import {
  ForwardSelectContext,
  useSelectContext,
  useSelectItemParentContext
} from "./context";
import { USE_NATIVE_PORTAL } from "@tamagui/portal";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
const SelectViewportFrame = styled(ThemeableStack, {
  name: VIEWPORT_NAME,
  variants: {
    unstyled: {
      false: {
        size: "$2",
        backgroundColor: "$background",
        elevate: !0,
        bordered: !0,
        userSelect: "none",
        outlineWidth: 0
      }
    },
    size: {
      "...size": (val, { tokens }) => ({
        borderRadius: tokens.radius[val] ?? val
      })
    }
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
}), needsRepropagation = isAndroid || isIos && !USE_NATIVE_PORTAL, SelectViewport = SelectViewportFrame.styleable(
  function(props, forwardedRef) {
    const { scope, children, disableScroll, ...viewportProps } = props, context = useSelectContext(scope), itemContext = useSelectItemParentContext(scope), isAdapted = useAdaptIsActive(context.adaptScope), composedRefs = useComposedRefs(
      // @ts-ignore TODO react 19 type needs fix
      forwardedRef,
      context.floatingContext?.refs.setFloating
    );
    if (useIsomorphicLayoutEffect(() => {
      context.update && context.update();
    }, [isAdapted]), itemContext.shouldRenderWebNative)
      return /* @__PURE__ */ jsx(Fragment, { children });
    if (isAdapted || !isWeb) {
      let content = children;
      return needsRepropagation && (content = /* @__PURE__ */ jsx(ForwardSelectContext, { itemContext, context, children: content })), /* @__PURE__ */ jsx(AdaptPortalContents, { scope: context.adaptScope, children: content });
    }
    if (!itemContext.interactions)
      return process.env.NODE_ENV === "development" && console.warn("No interactions provided to Select, potentially missing Adapt"), null;
    const {
      style,
      // remove this, it was set to "Select" always
      className,
      ...floatingProps
    } = itemContext.interactions.getFloatingProps();
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      !disableScroll && !props.unstyled && /* @__PURE__ */ jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: selectViewportCSS
          }
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { children: context.open ? /* @__PURE__ */ jsx(FloatingFocusManager, { context: context.floatingContext, modal: !1, children: /* @__PURE__ */ jsx(
        SelectViewportFrame,
        {
          size: itemContext.size,
          role: "presentation",
          ...viewportProps,
          ...style,
          ...floatingProps,
          ...!props.unstyled && {
            overflowY: disableScroll ? void 0 : style.overflow ?? "auto"
          },
          ref: composedRefs,
          children
        },
        "select-viewport"
      ) }) : null }),
      !context.open && /* @__PURE__ */ jsx("div", { style: { display: "none" }, children: props.children })
    ] });
  }
), selectViewportCSS = `
.is_SelectViewport {
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.is_SelectViewport::-webkit-scrollbar{
  display:none
}
`;
export {
  SelectViewport,
  SelectViewportFrame
};
//# sourceMappingURL=SelectViewport.js.map
