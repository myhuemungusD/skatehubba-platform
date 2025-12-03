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
var Select_exports = {};
__export(Select_exports, {
  Select: () => Select,
  SelectGroupFrame: () => SelectGroupFrame,
  SelectIcon: () => SelectIcon,
  SelectSeparator: () => SelectSeparator
});
module.exports = __toCommonJS(Select_exports);
var import_adapt = require("@tamagui/adapt"), import_compose_refs = require("@tamagui/compose-refs"), import_constants = require("@tamagui/constants"), import_core = require("@tamagui/core"), import_focus_scope = require("@tamagui/focus-scope"), import_focusable = require("@tamagui/focusable"), import_get_token = require("@tamagui/get-token"), import_helpers = require("@tamagui/helpers"), import_list_item = require("@tamagui/list-item"), import_separator = require("@tamagui/separator"), import_sheet = require("@tamagui/sheet"), import_stacks = require("@tamagui/stacks"), import_text = require("@tamagui/text"), import_use_controllable_state = require("@tamagui/use-controllable-state"), import_use_debounce = require("@tamagui/use-debounce"), React = __toESM(require("react"), 1), import_context = require("./context"), import_SelectContent = require("./SelectContent"), import_SelectImpl = require("./SelectImpl"), import_SelectItem = require("./SelectItem"), import_SelectItemText = require("./SelectItemText"), import_SelectScrollButton = require("./SelectScrollButton"), import_SelectTrigger = require("./SelectTrigger"), import_SelectViewport = require("./SelectViewport"), import_useSelectBreakpointActive = require("./useSelectBreakpointActive"), import_jsx_runtime = require("react/jsx-runtime");
const VALUE_NAME = "SelectValue", SelectValueFrame = (0, import_core.styled)(import_text.SizableText, {
  name: VALUE_NAME,
  userSelect: "none"
}), SelectValue = SelectValueFrame.styleable(
  function({ scope, children: childrenProp, placeholder, ...props }, forwardedRef) {
    const context = (0, import_context.useSelectContext)(scope), itemParentContext = (0, import_context.useSelectItemParentContext)(scope), composedRefs = (0, import_compose_refs.useComposedRefs)(forwardedRef, context.onValueNodeChange), children = childrenProp ?? context.selectedItem, selectValueChildren = context.value == null || context.value === "" ? placeholder ?? children : children;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      SelectValueFrame,
      {
        ...!props.unstyled && {
          size: itemParentContext.size,
          ellipse: !0,
          // we don't want events from the portalled `SelectValue` children to bubble
          // through the item they came from
          pointerEvents: "none"
        },
        ref: composedRefs,
        ...props,
        children: unwrapSelectItem(selectValueChildren)
      }
    );
  }
);
function unwrapSelectItem(selectValueChildren) {
  return React.Children.map(selectValueChildren, (child) => {
    if (child) {
      if (child.type?.staticConfig?.componentName === import_SelectItemText.ITEM_TEXT_NAME)
        return child.props.children;
      if (child.props?.children)
        return unwrapSelectItem(child.props.children);
    }
    return child;
  });
}
const SelectIcon = (0, import_core.styled)(import_stacks.XStack, {
  name: "SelectIcon",
  // @ts-ignore
  "aria-hidden": !0,
  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_text.Paragraph, { children: "\u25BC" })
}), SelectItemIndicatorFrame = (0, import_core.styled)(import_stacks.XStack, {
  name: "SelectItemIndicator"
}), SelectItemIndicator = React.forwardRef(
  function(props, forwardedRef) {
    const { scope, ...itemIndicatorProps } = props, context = (0, import_context.useSelectItemParentContext)(scope), itemContext = (0, import_SelectItem.useSelectItemContext)(scope);
    return context.shouldRenderWebNative ? null : itemContext.isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicatorFrame, { "aria-hidden": !0, ...itemIndicatorProps, ref: forwardedRef }) : null;
  }
), GROUP_NAME = "SelectGroup", { Provider: SelectGroupContextProvider, useStyledContext: useSelectGroupContext } = (0, import_core.createStyledContext)({ id: "" }, "SelectGroup"), SelectGroupFrame = (0, import_core.styled)(import_stacks.YStack, {
  name: GROUP_NAME,
  width: "100%"
}), NativeSelectTextFrame = (0, import_core.styled)(import_text.SizableText, {
  tag: "select",
  backgroundColor: "$background",
  borderColor: "$borderColor",
  hoverStyle: {
    backgroundColor: "$backgroundHover"
  }
}), NativeSelectFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
  name: "NativeSelect",
  bordered: !0,
  userSelect: "none",
  outlineWidth: 0,
  paddingRight: 10,
  variants: {
    size: {
      "...size": (val, extras) => {
        const { tokens } = extras, paddingHorizontal = (0, import_core.getVariableValue)(tokens.space[val]);
        return {
          borderRadius: tokens.radius[val] ?? val,
          minHeight: tokens.size[val],
          paddingRight: paddingHorizontal + 20,
          paddingLeft: paddingHorizontal,
          paddingVertical: (0, import_get_token.getSpace)(val, {
            shift: -3
          })
        };
      }
    }
  },
  defaultVariants: {
    size: "$2"
  }
}), SelectGroup = React.forwardRef(
  (props, forwardedRef) => {
    const { scope, ...groupProps } = props, groupId = React.useId(), context = (0, import_context.useSelectContext)(scope), itemParentContext = (0, import_context.useSelectItemParentContext)(scope), size = itemParentContext.size ?? "$true", nativeSelectRef = React.useRef(null), content = itemParentContext.shouldRenderWebNative ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      NativeSelectFrame,
      {
        asChild: !0,
        size,
        value: context.value,
        id: itemParentContext.id,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          NativeSelectTextFrame,
          {
            onChange: (event) => {
              itemParentContext.onChange(event.currentTarget.value);
            },
            size,
            ref: nativeSelectRef,
            style: {
              color: "var(--color)",
              // @ts-ignore
              appearance: "none"
            },
            children: props.children
          }
        )
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      SelectGroupFrame,
      {
        role: "group",
        "aria-labelledby": groupId,
        ...groupProps,
        ref: forwardedRef
      }
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectGroupContextProvider, { scope, id: groupId || "", children: content });
  }
);
SelectGroup.displayName = GROUP_NAME;
const LABEL_NAME = "SelectLabel", SelectLabel = React.forwardRef(
  (props, forwardedRef) => {
    const { scope, ...labelProps } = props, context = (0, import_context.useSelectItemParentContext)(scope), groupContext = useSelectGroupContext(scope);
    return context.shouldRenderWebNative ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_list_item.ListItem,
      {
        tag: "div",
        componentName: LABEL_NAME,
        fontWeight: "800",
        id: groupContext.id,
        size: context.size,
        ...labelProps,
        ref: forwardedRef
      }
    );
  }
);
SelectLabel.displayName = LABEL_NAME;
const SelectSeparator = (0, import_core.styled)(import_separator.Separator, {
  name: "SelectSeparator"
}), SelectSheetController = (props) => {
  const context = (0, import_context.useSelectContext)(props.scope), showSheet = (0, import_useSelectBreakpointActive.useShowSelectSheet)(context), isAdapted = (0, import_adapt.useAdaptIsActive)(context.adaptScope), getShowSheet = (0, import_core.useGet)(showSheet);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_sheet.SheetController,
    {
      onOpenChange: (val) => {
        getShowSheet() && props.onOpenChange(val);
      },
      open: context.open,
      hidden: !isAdapted,
      children: props.children
    }
  );
}, SelectSheetImpl = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: props.children }), Select = (0, import_helpers.withStaticProperties)(
  function(props) {
    const adaptScope = `AdaptSelect${props.scope || ""}`;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_adapt.AdaptParent, { scope: adaptScope, portal: !0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInner, { scope: props.scope, adaptScope, ...props }) });
  },
  {
    Adapt: import_adapt.Adapt,
    Content: import_SelectContent.SelectContent,
    Group: SelectGroup,
    Icon: SelectIcon,
    Item: import_SelectItem.SelectItem,
    ItemIndicator: SelectItemIndicator,
    ItemText: import_SelectItemText.SelectItemText,
    Label: SelectLabel,
    ScrollDownButton: import_SelectScrollButton.SelectScrollDownButton,
    ScrollUpButton: import_SelectScrollButton.SelectScrollUpButton,
    Trigger: import_SelectTrigger.SelectTrigger,
    Value: SelectValue,
    Viewport: import_SelectViewport.SelectViewport,
    Sheet: import_sheet.Sheet.Controlled,
    FocusScope: import_focus_scope.FocusScopeController
  }
);
function useEmitter() {
  const listeners = React.useRef(null);
  listeners.current || (listeners.current = /* @__PURE__ */ new Set());
  const emit = (value) => {
    listeners.current.forEach((l) => l(value));
  }, subscribe = React.useCallback((listener) => (listeners.current.add(listener), () => {
    listeners.current.delete(listener);
  }), []);
  return [emit, subscribe];
}
function SelectInner(props) {
  const {
    scope = "",
    adaptScope,
    native,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue,
    onValueChange,
    disablePreventBodyScroll,
    size: sizeProp = "$true",
    onActiveChange,
    dir,
    id
  } = props, SelectImpl = (0, import_adapt.useAdaptIsActive)(adaptScope) || !import_constants.isWeb ? SelectSheetImpl : import_SelectImpl.SelectInlineImpl, forceUpdate = React.useReducer(() => ({}), {})[1], [selectedItem, setSelectedItem] = React.useState(null), [open, setOpen] = (0, import_use_controllable_state.useControllableState)({
    prop: openProp,
    defaultProp: defaultOpen || !1,
    onChange: onOpenChange
  }), [value, setValue] = (0, import_use_controllable_state.useControllableState)({
    prop: valueProp,
    defaultProp: defaultValue || "",
    onChange: onValueChange,
    transition: !0
  });
  React.useEffect(() => {
    open && emitValue(value);
  }, [open]), React.useEffect(() => {
    emitValue(value);
  }, [value]);
  const [activeIndex, setActiveIndex] = React.useState(0), [emitValue, valueSubscribe] = useEmitter(), [emitActiveIndex, activeIndexSubscribe] = useEmitter(), selectedIndexRef = React.useRef(null), activeIndexRef = React.useRef(null), listContentRef = React.useRef([]), [selectedIndex, setSelectedIndex] = React.useState(0), [valueNode, setValueNode] = React.useState(null);
  (0, import_constants.useIsomorphicLayoutEffect)(() => {
    selectedIndexRef.current = selectedIndex, activeIndexRef.current = activeIndex;
  });
  const shouldRenderWebNative = import_constants.isWeb && (native === !0 || native === "web" || Array.isArray(native) && native.includes("web")), setActiveIndexDebounced = (0, import_use_debounce.useDebounce)(
    (index) => {
      setActiveIndex((prev) => prev !== index ? (typeof index == "number" && emitActiveIndex(index), index) : prev);
    },
    1,
    {},
    []
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_context.SelectItemParentProvider,
    {
      scopeName: scope,
      scope,
      adaptScope,
      initialValue: React.useMemo(() => value, [open]),
      size: sizeProp,
      activeIndexSubscribe,
      valueSubscribe,
      setOpen,
      id,
      onChange: React.useCallback((val) => {
        setValue(val), emitValue(val);
      }, []),
      onActiveChange: (0, import_core.useEvent)((value2, index) => {
        onActiveChange?.(value2, index);
      }),
      setSelectedIndex,
      setValueAtIndex: React.useCallback((index, value2) => {
        listContentRef.current[index] = value2;
      }, []),
      shouldRenderWebNative,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_context.SelectProvider,
        {
          scope,
          scopeName: scope,
          adaptScope,
          disablePreventBodyScroll,
          dir,
          blockSelection: !1,
          fallback: !1,
          selectedItem,
          setSelectedItem,
          forceUpdate,
          valueNode,
          onValueNodeChange: setValueNode,
          activeIndex,
          selectedIndex,
          setActiveIndex: setActiveIndexDebounced,
          value,
          open,
          native,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSheetController, { onOpenChange: setOpen, scope, children: shouldRenderWebNative ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            SelectImpl,
            {
              activeIndexRef,
              listContentRef,
              selectedIndexRef,
              ...props,
              open,
              value,
              children
            }
          ) })
        }
      )
    }
  );
}
//# sourceMappingURL=Select.js.map
