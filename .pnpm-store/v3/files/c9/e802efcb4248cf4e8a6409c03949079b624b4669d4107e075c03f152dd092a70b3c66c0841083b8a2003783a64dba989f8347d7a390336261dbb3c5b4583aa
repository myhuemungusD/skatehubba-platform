import { FloatingOverlay, FloatingPortal } from "@floating-ui/react";
import { Theme, useIsTouchDevice, useThemeName } from "@tamagui/core";
import { FocusScope } from "@tamagui/focus-scope";
import React from "react";
import { useSelectContext, useSelectItemParentContext } from "./context.mjs";
import { useShowSelectSheet } from "./useSelectBreakpointActive.mjs";
import { Fragment, jsx } from "react/jsx-runtime";
const SelectContent = ({
  children,
  scope,
  zIndex = 1e3,
  ...focusScopeProps
}) => {
  const context = useSelectContext(scope),
    itemParentContext = useSelectItemParentContext(scope),
    themeName = useThemeName(),
    showSheet = useShowSelectSheet(context),
    contents = /* @__PURE__ */jsx(Theme, {
      forceClassName: !0,
      name: themeName,
      children
    }),
    touch = useIsTouchDevice(),
    overlayStyle = React.useMemo(() => ({
      zIndex,
      pointerEvents: context.open ? "auto" : "none"
    }), [context.open]);
  return itemParentContext.shouldRenderWebNative ? /* @__PURE__ */jsx(Fragment, {
    children
  }) : showSheet ? context.open ? /* @__PURE__ */jsx(Fragment, {
    children: contents
  }) : null : /* @__PURE__ */jsx(FloatingPortal, {
    children: /* @__PURE__ */jsx(FloatingOverlay, {
      style: overlayStyle,
      lockScroll: !context.disablePreventBodyScroll && !!context.open && !touch,
      children: /* @__PURE__ */jsx(FocusScope, {
        loop: !0,
        enabled: !!context.open,
        trapped: !0,
        ...focusScopeProps,
        children: contents
      })
    })
  });
};
export { SelectContent };
//# sourceMappingURL=SelectContent.mjs.map
