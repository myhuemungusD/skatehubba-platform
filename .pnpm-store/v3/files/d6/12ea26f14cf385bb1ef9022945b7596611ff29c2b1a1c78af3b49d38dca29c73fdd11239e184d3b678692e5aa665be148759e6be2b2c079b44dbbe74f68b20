import { jsx as _jsx } from "react/jsx-runtime";
import { AnimatePresence, ResetPresence } from "@tamagui/animate-presence";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
import { useControllableState } from "@tamagui/use-controllable-state";
import { Stack, createStyledContext, styled } from "@tamagui/web";
import * as React from "react";
var COLLAPSIBLE_NAME = "Collapsible",
  {
    Provider: CollapsibleProvider,
    useStyledContext: useCollapsibleContext
  } = createStyledContext(),
  _Collapsible = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeCollapsible,
        open: openProp,
        defaultOpen,
        disabled,
        onOpenChange,
        ...collapsibleProps
      } = props,
      [open = !1, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
      });
    return /* @__PURE__ */_jsx(CollapsibleProvider, {
      scope: __scopeCollapsible,
      disabled,
      contentId: React.useId(),
      open,
      onOpenToggle: React.useCallback(function () {
        return setOpen(function (prevOpen) {
          return !prevOpen;
        });
      }, [setOpen]),
      children: /* @__PURE__ */_jsx(Stack, {
        "data-state": getState(open),
        "data-disabled": disabled ? "" : void 0,
        ...collapsibleProps,
        ref: forwardedRef
      })
    });
  });
_Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME = "CollapsibleTrigger",
  CollapsibleTriggerFrame = styled(Stack, {
    name: TRIGGER_NAME,
    tag: "button"
  }),
  CollapsibleTrigger = CollapsibleTriggerFrame.styleable(function (props, forwardedRef) {
    var {
        __scopeCollapsible,
        children,
        ...triggerProps
      } = props,
      context = useCollapsibleContext(__scopeCollapsible);
    return /* @__PURE__ */_jsx(CollapsibleTriggerFrame, {
      "aria-controls": context.contentId,
      "aria-expanded": context.open || !1,
      "data-state": getState(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      disabled: context.disabled,
      ...triggerProps,
      ref: forwardedRef,
      onPress: composeEventHandlers(props.onPress, context.onOpenToggle),
      children: typeof children == "function" ? children({
        open: context.open
      }) : children
    });
  });
CollapsibleTrigger.displayName = TRIGGER_NAME;
var CONTENT_NAME = "CollapsibleContent",
  CollapsibleContentFrame = styled(Stack, {
    name: CONTENT_NAME
  }),
  CollapsibleContent = CollapsibleContentFrame.styleable(function (props, forwardedRef) {
    var {
        forceMount,
        children,
        // @ts-expect-error
        __scopeCollapsible,
        ...contentProps
      } = props,
      context = useCollapsibleContext(__scopeCollapsible);
    return /* @__PURE__ */_jsx(AnimatePresence, {
      ...contentProps,
      children: forceMount || context.open ? /* @__PURE__ */_jsx(CollapsibleContentFrame, {
        ref: forwardedRef,
        ...contentProps,
        children: /* @__PURE__ */_jsx(ResetPresence, {
          children
        })
      }) : null
    });
  });
CollapsibleContent.displayName = CONTENT_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Collapsible = withStaticProperties(_Collapsible, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent
});
export { Collapsible, CollapsibleContent, CollapsibleContentFrame, CollapsibleTrigger, CollapsibleTriggerFrame };
//# sourceMappingURL=Collapsible.native.js.map
