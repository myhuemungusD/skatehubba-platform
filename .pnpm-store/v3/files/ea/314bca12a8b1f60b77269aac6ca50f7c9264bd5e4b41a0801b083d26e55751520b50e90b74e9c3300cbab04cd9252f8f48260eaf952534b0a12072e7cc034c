import { createContextScope } from "@tamagui/create-context";
import { useEvent } from "@tamagui/use-event";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
const FOCUS_SCOPE_CONTROLLER_NAME = "FocusScopeController",
  [createFocusScopeControllerContext, createFocusScopeControllerScope] = createContextScope(FOCUS_SCOPE_CONTROLLER_NAME),
  [FocusScopeControllerProvider, useFocusScopeControllerContext] = createFocusScopeControllerContext(FOCUS_SCOPE_CONTROLLER_NAME);
function FocusScopeController(props) {
  const {
      __scopeFocusScope,
      children,
      enabled,
      loop,
      trapped,
      onMountAutoFocus,
      onUnmountAutoFocus,
      forceUnmount,
      focusOnIdle
    } = props,
    stableOnMountAutoFocus = useEvent(onMountAutoFocus),
    stableOnUnmountAutoFocus = useEvent(onUnmountAutoFocus),
    contextValue = React.useMemo(() => ({
      enabled,
      loop,
      trapped,
      onMountAutoFocus: stableOnMountAutoFocus,
      onUnmountAutoFocus: stableOnUnmountAutoFocus,
      forceUnmount,
      focusOnIdle
    }), [enabled, loop, trapped, stableOnMountAutoFocus, stableOnUnmountAutoFocus, forceUnmount, focusOnIdle]);
  return /* @__PURE__ */jsx(FocusScopeControllerProvider, {
    scope: __scopeFocusScope,
    ...contextValue,
    children
  });
}
const FocusScopeControllerComponent = FocusScopeController;
export { FocusScopeControllerComponent as FocusScopeController, FocusScopeControllerProvider, createFocusScopeControllerScope, useFocusScopeControllerContext };
//# sourceMappingURL=FocusScopeController.mjs.map
