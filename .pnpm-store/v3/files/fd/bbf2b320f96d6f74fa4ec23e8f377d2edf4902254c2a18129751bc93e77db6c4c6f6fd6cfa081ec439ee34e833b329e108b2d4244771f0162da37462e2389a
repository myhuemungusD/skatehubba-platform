var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
var createTabs_exports = {};
__export(createTabs_exports, {
  createTabs: () => createTabs
});
module.exports = __toCommonJS(createTabs_exports);
var import_compose_refs = require("@tamagui/compose-refs"), import_constants = require("@tamagui/constants"), import_group = require("@tamagui/group"), import_helpers = require("@tamagui/helpers"), import_roving_focus = require("@tamagui/roving-focus"), import_use_controllable_state = require("@tamagui/use-controllable-state"), import_use_direction = require("@tamagui/use-direction"), import_web = require("@tamagui/web"), React = __toESM(require("react"), 1), import_Tabs = require("./Tabs"), import_StyledContext = require("./StyledContext"), import_jsx_runtime = require("react/jsx-runtime");
function createTabs(createProps) {
  const {
    ContentFrame = import_Tabs.DefaultTabsContentFrame,
    TabFrame = import_Tabs.DefaultTabsTabFrame,
    TabsFrame = import_Tabs.DefaultTabsFrame
  } = createProps, TABS_CONTEXT = "TabsContext", TAB_LIST_NAME = "TabsList", TabsList = React.forwardRef(
    (props, forwardedRef) => {
      const { __scopeTabs, loop = !0, children, ...listProps } = props, context = (0, import_StyledContext.useTabsContext)(__scopeTabs);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_roving_focus.RovingFocusGroup,
        {
          __scopeRovingFocusGroup: __scopeTabs || TABS_CONTEXT,
          orientation: context.orientation,
          dir: context.dir,
          loop,
          asChild: !0,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_group.Group,
            {
              role: "tablist",
              componentName: TAB_LIST_NAME,
              "aria-orientation": context.orientation,
              ref: forwardedRef,
              orientation: context.orientation,
              ...listProps,
              children
            }
          )
        }
      );
    }
  );
  TabsList.displayName = TAB_LIST_NAME;
  const TRIGGER_NAME = "TabsTrigger", TabsTrigger = TabFrame.styleable(
    (props, forwardedRef) => {
      const {
        __scopeTabs,
        value,
        disabled = !1,
        onInteraction,
        disableActiveTheme,
        ...triggerProps
      } = props, context = (0, import_StyledContext.useTabsContext)(__scopeTabs), triggerId = makeTriggerId(context.baseId, value), contentId = makeContentId(context.baseId, value), isSelected = value === context.value, [layout, setLayout] = React.useState(null), triggerRef = React.useRef(null), groupItemProps = (0, import_group.useGroupItem)({ disabled: !!disabled });
      return React.useEffect(() => (context.registerTrigger(), () => context.unregisterTrigger()), []), React.useEffect(() => {
        if (!triggerRef.current || !import_constants.isWeb) return;
        function getTriggerSize() {
          triggerRef.current && setLayout({
            width: triggerRef.current.offsetWidth,
            height: triggerRef.current.offsetHeight,
            x: triggerRef.current.offsetLeft,
            y: triggerRef.current.offsetTop
          });
        }
        getTriggerSize();
        const observer = new ResizeObserver(getTriggerSize);
        return observer.observe(triggerRef.current), () => {
          triggerRef.current && observer.unobserve(triggerRef.current);
        };
      }, [context.triggersCount]), React.useEffect(() => {
        isSelected && layout && onInteraction?.("select", layout);
      }, [isSelected, value, layout]), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_web.Theme, { name: isSelected && !disableActiveTheme ? "active" : null, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_roving_focus.RovingFocusGroup.Item,
        {
          __scopeRovingFocusGroup: __scopeTabs || TABS_CONTEXT,
          asChild: !0,
          focusable: !disabled,
          active: isSelected,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            TabFrame,
            {
              onLayout: (event) => {
                import_constants.isWeb || setLayout(event.nativeEvent.layout);
              },
              onHoverIn: (0, import_helpers.composeEventHandlers)(props.onHoverIn, () => {
                layout && onInteraction?.("hover", layout);
              }),
              onHoverOut: (0, import_helpers.composeEventHandlers)(props.onHoverOut, () => {
                onInteraction?.("hover", null);
              }),
              role: "tab",
              "aria-selected": isSelected,
              "aria-controls": contentId,
              "data-state": isSelected ? "active" : "inactive",
              "data-disabled": disabled ? "" : void 0,
              disabled,
              id: triggerId,
              ...!props.unstyled && {
                size: context.size
              },
              ...isSelected && {
                forceStyle: "focus"
              },
              ...groupItemProps,
              ...triggerProps,
              ref: (0, import_compose_refs.composeRefs)(forwardedRef, triggerRef),
              onPress: (0, import_helpers.composeEventHandlers)(props.onPress ?? void 0, (event) => {
                const webChecks = !import_constants.isWeb || event.button === 0 && event.ctrlKey === !1;
                !disabled && !isSelected && webChecks ? context.onChange(value) : event.preventDefault();
              }),
              ...import_constants.isWeb && {
                type: "button",
                onKeyDown: (0, import_helpers.composeEventHandlers)(
                  props.onKeyDown,
                  (event) => {
                    [" ", "Enter"].includes(event.key) && (context.onChange(value), event.preventDefault());
                  }
                ),
                onFocus: (0, import_helpers.composeEventHandlers)(props.onFocus, (event) => {
                  layout && onInteraction?.("focus", layout);
                  const isAutomaticActivation = context.activationMode !== "manual";
                  !isSelected && !disabled && isAutomaticActivation && context.onChange(value);
                }),
                onBlur: (0, import_helpers.composeEventHandlers)(props.onFocus, () => {
                  onInteraction?.("focus", null);
                })
              }
            }
          )
        }
      ) });
    }
  );
  TabsTrigger.displayName = TRIGGER_NAME;
  const TabsContent = ContentFrame.styleable(function(props, forwardedRef) {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props, context = (0, import_StyledContext.useTabsContext)(__scopeTabs), isSelected = value === context.value, show = forceMount || isSelected, triggerId = makeTriggerId(context.baseId, value), contentId = makeContentId(context.baseId, value);
    return show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ContentFrame,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !show,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        children
      },
      value
    ) : null;
  }), TabsComponent = TabsFrame.styleable(function(props, forwardedRef) {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      size = "$true",
      ...tabsProps
    } = props, direction = (0, import_use_direction.useDirection)(dir), [value, setValue] = (0, import_use_controllable_state.useControllableState)({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? ""
    }), [triggersCount, setTriggersCount] = React.useState(0), registerTrigger = (0, import_web.useEvent)(() => setTriggersCount((v) => v + 1)), unregisterTrigger = (0, import_web.useEvent)(() => setTriggersCount((v) => v - 1));
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_StyledContext.TabsProvider,
      {
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
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          TabsFrame,
          {
            direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  });
  return (0, import_helpers.withStaticProperties)(TabsComponent, {
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
//# sourceMappingURL=createTabs.js.map
