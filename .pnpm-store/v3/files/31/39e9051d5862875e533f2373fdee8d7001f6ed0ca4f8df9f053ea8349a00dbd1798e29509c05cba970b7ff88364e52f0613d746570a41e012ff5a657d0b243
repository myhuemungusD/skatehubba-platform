import "@tamagui/polyfill-dev";
import { FloatingDelayGroup, useDelayGroup, useDelayGroupContext, useDismiss, useFloating, useFocus, useHover, useInteractions, useRole } from "@floating-ui/react";
import { useEvent } from "@tamagui/core";
import { FloatingOverrideContext } from "@tamagui/floating";
import { getSize } from "@tamagui/get-token";
import { withStaticProperties } from "@tamagui/helpers";
import { PopoverAnchor, PopoverArrow, PopoverContent, PopoverContext, PopoverTrigger } from "@tamagui/popover";
import { Popper, PopperContentFrame } from "@tamagui/popper";
import { useControllableState } from "@tamagui/use-controllable-state";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
const TOOLTIP_SCOPE = "",
  TooltipContent = PopperContentFrame.extractable(React.forwardRef((props, ref) => {
    const preventAnimation = React.useContext(PreventTooltipAnimationContext);
    return /* @__PURE__ */jsx(PopoverContent, {
      scope: props.scope || TOOLTIP_SCOPE,
      componentName: "Tooltip",
      disableFocusScope: !0,
      ...(!props.unstyled && {
        pointerEvents: "none"
      }),
      ref,
      ...props,
      ...(preventAnimation && {
        animation: null
      })
    });
  })),
  TooltipArrow = React.forwardRef((props, ref) => /* @__PURE__ */jsx(PopoverArrow, {
    scope: props.scope || TOOLTIP_SCOPE,
    componentName: "Tooltip",
    ref,
    ...props
  })),
  PreventTooltipAnimationContext = React.createContext(!1),
  TooltipGroup = ({
    children,
    delay,
    preventAnimation = !1,
    timeoutMs
  }) => /* @__PURE__ */jsx(PreventTooltipAnimationContext.Provider, {
    value: preventAnimation,
    children: /* @__PURE__ */jsx(FloatingDelayGroup, {
      timeoutMs,
      delay: React.useMemo(() => delay, [JSON.stringify(delay)]),
      children
    })
  }),
  setOpens = /* @__PURE__ */new Set(),
  closeOpenTooltips = () => {
    setOpens.forEach(x => x(!1));
  },
  TooltipComponent = React.forwardRef(function (props, ref) {
    const {
        children,
        delay: delayProp = 400,
        restMs = typeof delayProp > "u" ? 0 : typeof delayProp == "number" ? delayProp : 0,
        onOpenChange: onOpenChangeProp,
        focus,
        open: openProp,
        disableAutoCloseOnScroll,
        scope = TOOLTIP_SCOPE,
        ...restProps
      } = props,
      triggerRef = React.useRef(null),
      [hasCustomAnchor, setHasCustomAnchor] = React.useState(!1),
      {
        delay: delayGroup,
        setCurrentId
      } = useDelayGroupContext(),
      delay = delayProp ?? delayGroup ?? 0,
      [open, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: !1,
        onChange: onOpenChangeProp
      }),
      id = props.groupId,
      onOpenChange = useEvent(open2 => {
        open2 && setCurrentId(id), setOpen(open2);
      });
    React.useEffect(() => {
      if (!open || disableAutoCloseOnScroll || typeof document > "u") return;
      const closeIt = () => {
        setOpen(!1);
      };
      return setOpens.add(setOpen), document.documentElement.addEventListener("scroll", closeIt), () => {
        setOpens.delete(setOpen), document.documentElement.removeEventListener("scroll", closeIt);
      };
    }, [open, disableAutoCloseOnScroll]);
    const useFloatingFn = props2 => {
        const floating = useFloating({
            ...props2,
            open,
            onOpenChange
          }),
          {
            delay: delayContext
          } = useDelayGroup(floating.context, {
            id
          }),
          delayOut = delay ?? delayContext,
          {
            getReferenceProps,
            getFloatingProps
          } = useInteractions([useHover(floating.context, {
            delay: delayOut,
            restMs
          }), useFocus(floating.context, focus), useRole(floating.context, {
            role: "tooltip"
          }), useDismiss(floating.context)]);
        return {
          ...floating,
          open,
          getReferenceProps,
          getFloatingProps
        };
      },
      useFloatingContext = React.useCallback(useFloatingFn, [id, delay, open, restMs, focus ? JSON.stringify(focus) : 0]),
      onCustomAnchorAdd = React.useCallback(() => setHasCustomAnchor(!0), []),
      onCustomAnchorRemove = React.useCallback(() => setHasCustomAnchor(!1), []),
      contentId = React.useId(),
      smallerSize = props.unstyled ? null : getSize("$true", {
        shift: -2,
        bounds: [0]
      });
    return (
      // TODO: FloatingOverrideContext might also need to be scoped
      /* @__PURE__ */
      jsx(FloatingOverrideContext.Provider, {
        value: useFloatingContext,
        children: /* @__PURE__ */jsx(Popper, {
          scope,
          size: smallerSize?.key,
          allowFlip: !0,
          stayInFrame: !0,
          open,
          ...restProps,
          children: /* @__PURE__ */jsx(PopoverContext.Provider, {
            popoverScope: scope,
            scope,
            contentId,
            triggerRef,
            open,
            onOpenChange: setOpen,
            onOpenToggle: voidFn,
            hasCustomAnchor,
            onCustomAnchorAdd,
            onCustomAnchorRemove,
            children
          })
        })
      })
    );
  }),
  TooltipTrigger = React.forwardRef(function (props, ref) {
    const {
      scope,
      ...rest
    } = props;
    return /* @__PURE__ */jsx(PopoverTrigger, {
      ...rest,
      scope: scope || TOOLTIP_SCOPE,
      ref
    });
  }),
  TooltipAnchor = React.forwardRef(function (props, ref) {
    const {
      scope,
      ...rest
    } = props;
    return /* @__PURE__ */jsx(PopoverAnchor, {
      ...rest,
      scope: scope || TOOLTIP_SCOPE,
      ref
    });
  }),
  Tooltip2 = withStaticProperties(TooltipComponent, {
    Anchor: TooltipAnchor,
    Arrow: TooltipArrow,
    Content: TooltipContent,
    Trigger: TooltipTrigger
  }),
  voidFn = () => {};
export { Tooltip2 as Tooltip, TooltipGroup, closeOpenTooltips };
//# sourceMappingURL=Tooltip.mjs.map
