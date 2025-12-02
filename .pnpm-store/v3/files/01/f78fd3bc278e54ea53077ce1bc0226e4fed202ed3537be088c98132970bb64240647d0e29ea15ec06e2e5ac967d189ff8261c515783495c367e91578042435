import { jsx as _jsx } from "react/jsx-runtime";
import { createContextScope } from "@tamagui/create-context";
import { useEvent } from "@tamagui/use-event";
import * as React from "react";
var FOCUS_SCOPE_CONTROLLER_NAME = "FocusScopeController",
  [createFocusScopeControllerContext, createFocusScopeControllerScope] = createContextScope(FOCUS_SCOPE_CONTROLLER_NAME),
  [FocusScopeControllerProvider, useFocusScopeControllerContext] = createFocusScopeControllerContext(FOCUS_SCOPE_CONTROLLER_NAME);
function FocusScopeController(props) {
  var {
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
    contextValue = React.useMemo(function () {
      return {
        enabled,
        loop,
        trapped,
        onMountAutoFocus: stableOnMountAutoFocus,
        onUnmountAutoFocus: stableOnUnmountAutoFocus,
        forceUnmount,
        focusOnIdle
      };
    }, [enabled, loop, trapped, stableOnMountAutoFocus, stableOnUnmountAutoFocus, forceUnmount, focusOnIdle]);
  return /* @__PURE__ */_jsx(FocusScopeControllerProvider, {
    scope: __scopeFocusScope,
    ...contextValue,
    children
  });
}
var FocusScopeControllerComponent = FocusScopeController;
export { FocusScopeControllerComponent as FocusScopeController, FocusScopeControllerProvider, createFocusScopeControllerScope, useFocusScopeControllerContext };
//# sourceMappingURL=FocusScopeController.native.js.map
