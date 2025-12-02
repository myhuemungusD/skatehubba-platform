import { jsx as _jsx } from "react/jsx-runtime";
import { composeRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";
import { Group, useGroupItem } from "@tamagui/group";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
import { RovingFocusGroup } from "@tamagui/roving-focus";
import { useControllableState } from "@tamagui/use-controllable-state";
import { useDirection } from "@tamagui/use-direction";
import { Theme, useEvent } from "@tamagui/web";
import * as React from "react";
import { DefaultTabsContentFrame, DefaultTabsFrame, DefaultTabsTabFrame } from "./Tabs.native.js";
import { TabsProvider, useTabsContext } from "./StyledContext.native.js";
function createTabs(createProps) {
  var {
      ContentFrame = DefaultTabsContentFrame,
      TabFrame = DefaultTabsTabFrame,
      TabsFrame = DefaultTabsFrame
    } = createProps,
    TABS_CONTEXT = "TabsContext",
    TAB_LIST_NAME = "TabsList",
    TabsList = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
      var {
          __scopeTabs,
          loop = !0,
          children,
          ...listProps
        } = props,
        context = useTabsContext(__scopeTabs);
      return /* @__PURE__ */_jsx(RovingFocusGroup, {
        __scopeRovingFocusGroup: __scopeTabs || TABS_CONTEXT,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        asChild: !0,
        children: /* @__PURE__ */_jsx(Group, {
          role: "tablist",
          componentName: TAB_LIST_NAME,
          "aria-orientation": context.orientation,
          ref: forwardedRef,
          orientation: context.orientation,
          ...listProps,
          children
        })
      });
    });
  TabsList.displayName = TAB_LIST_NAME;
  var TRIGGER_NAME = "TabsTrigger",
    TabsTrigger = TabFrame.styleable(function (props, forwardedRef) {
      var {
          __scopeTabs,
          value,
          disabled = !1,
          onInteraction,
          disableActiveTheme,
          ...triggerProps
        } = props,
        context = useTabsContext(__scopeTabs),
        triggerId = makeTriggerId(context.baseId, value),
        contentId = makeContentId(context.baseId, value),
        isSelected = value === context.value,
        [layout, setLayout] = React.useState(null),
        triggerRef = React.useRef(null),
        groupItemProps = useGroupItem({
          disabled: !!disabled
        });
      React.useEffect(function () {
        return context.registerTrigger(), function () {
          return context.unregisterTrigger();
        };
      }, []), React.useEffect(function () {
        if (!triggerRef.current || !isWeb) return;
        function getTriggerSize() {
          triggerRef.current && setLayout({
            width: triggerRef.current.offsetWidth,
            height: triggerRef.current.offsetHeight,
            x: triggerRef.current.offsetLeft,
            y: triggerRef.current.offsetTop
          });
        }
        getTriggerSize();
        var observer = new ResizeObserver(getTriggerSize);
        return observer.observe(triggerRef.current), function () {
          triggerRef.current && observer.unobserve(triggerRef.current);
        };
      }, [context.triggersCount]), React.useEffect(function () {
        isSelected && layout && onInteraction?.("select", layout);
      }, [isSelected, value, layout]);
      var _props_onPress;
      return /* @__PURE__ */_jsx(Theme, {
        name: isSelected && !disableActiveTheme ? "active" : null,
        children: /* @__PURE__ */_jsx(RovingFocusGroup.Item, {
          __scopeRovingFocusGroup: __scopeTabs || TABS_CONTEXT,
          asChild: !0,
          focusable: !disabled,
          active: isSelected,
          children: /* @__PURE__ */_jsx(TabFrame, {
            onLayout: function (event) {
              isWeb || setLayout(event.nativeEvent.layout);
            },
            onHoverIn: composeEventHandlers(props.onHoverIn, function () {
              layout && onInteraction?.("hover", layout);
            }),
            onHoverOut: composeEventHandlers(props.onHoverOut, function () {
              onInteraction?.("hover", null);
            }),
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...(!props.unstyled && {
              size: context.size
            }),
            ...(isSelected && {
              forceStyle: "focus"
            }),
            ...groupItemProps,
            ...triggerProps,
            ref: composeRefs(forwardedRef, triggerRef),
            onPress: composeEventHandlers((_props_onPress = props.onPress) !== null && _props_onPress !== void 0 ? _props_onPress : void 0, function (event) {
              var webChecks = !isWeb || event.button === 0 && event.ctrlKey === !1;
              !disabled && !isSelected && webChecks ? context.onChange(value) : event.preventDefault();
            }),
            ...(isWeb && {
              type: "button",
              onKeyDown: composeEventHandlers(props.onKeyDown, function (event) {
                [" ", "Enter"].includes(event.key) && (context.onChange(value), event.preventDefault());
              }),
              onFocus: composeEventHandlers(props.onFocus, function (event) {
                layout && onInteraction?.("focus", layout);
                var isAutomaticActivation = context.activationMode !== "manual";
                !isSelected && !disabled && isAutomaticActivation && context.onChange(value);
              }),
              onBlur: composeEventHandlers(props.onFocus, function () {
                onInteraction?.("focus", null);
              })
            })
          })
        })
      });
    });
  TabsTrigger.displayName = TRIGGER_NAME;
  var TabsContent = ContentFrame.styleable(function (props, forwardedRef) {
      var {
          __scopeTabs,
          value,
          forceMount,
          children,
          ...contentProps
        } = props,
        context = useTabsContext(__scopeTabs),
        isSelected = value === context.value,
        show = forceMount || isSelected,
        triggerId = makeTriggerId(context.baseId, value),
        contentId = makeContentId(context.baseId, value);
      return show ? /* @__PURE__ */_jsx(ContentFrame, {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        // @ts-ignore
        hidden: !show,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        children
      }, value) : null;
    }),
    TabsComponent = TabsFrame.styleable(function (props, forwardedRef) {
      var {
          __scopeTabs,
          value: valueProp,
          onValueChange,
          defaultValue,
          orientation = "horizontal",
          dir,
          activationMode = "automatic",
          size = "$true",
          ...tabsProps
        } = props,
        direction = useDirection(dir),
        [value, setValue] = useControllableState({
          prop: valueProp,
          onChange: onValueChange,
          defaultProp: defaultValue ?? ""
        }),
        [triggersCount, setTriggersCount] = React.useState(0),
        registerTrigger = useEvent(function () {
          return setTriggersCount(function (v) {
            return v + 1;
          });
        }),
        unregisterTrigger = useEvent(function () {
          return setTriggersCount(function (v) {
            return v - 1;
          });
        });
      return /* @__PURE__ */_jsx(TabsProvider, {
        scope: __scopeTabs,
        baseId: React.useId(),
        value,
        onChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        size,
        registerTrigger,
        triggersCount,
        unregisterTrigger,
        children: /* @__PURE__ */_jsx(TabsFrame, {
          direction,
          //   dir={direction}
          "data-orientation": orientation,
          ...tabsProps,
          ref: forwardedRef
        })
      });
    });
  return withStaticProperties(TabsComponent, {
    List: TabsList,
    /**
    * @deprecated Use Tabs.Tab instead
    */
    Trigger: TabsTrigger,
    Tab: TabsTrigger,
    Content: TabsContent
  });
}
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
export { createTabs };
//# sourceMappingURL=createTabs.native.js.map
