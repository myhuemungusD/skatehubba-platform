import { Adapt, AdaptParent, useAdaptIsActive } from "@tamagui/adapt";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { createStyledContext, getVariableValue, styled, useEvent, useGet } from "@tamagui/core";
import { FocusScopeController } from "@tamagui/focus-scope";
import { getSpace } from "@tamagui/get-token";
import { withStaticProperties } from "@tamagui/helpers";
import { ListItem } from "@tamagui/list-item";
import { Separator } from "@tamagui/separator";
import { Sheet, SheetController } from "@tamagui/sheet";
import { ThemeableStack, XStack, YStack } from "@tamagui/stacks";
import { Paragraph, SizableText } from "@tamagui/text";
import { useControllableState } from "@tamagui/use-controllable-state";
import { useDebounce } from "@tamagui/use-debounce";
import * as React from "react";
import { SelectItemParentProvider, SelectProvider, useSelectContext, useSelectItemParentContext } from "./context.mjs";
import { SelectContent } from "./SelectContent.mjs";
import { SelectInlineImpl } from "./SelectImpl.mjs";
import { SelectItem, useSelectItemContext } from "./SelectItem.mjs";
import { ITEM_TEXT_NAME, SelectItemText } from "./SelectItemText.mjs";
import { SelectScrollDownButton, SelectScrollUpButton } from "./SelectScrollButton.mjs";
import { SelectTrigger } from "./SelectTrigger.mjs";
import { SelectViewport } from "./SelectViewport.mjs";
import { useShowSelectSheet } from "./useSelectBreakpointActive.mjs";
import { Fragment, jsx } from "react/jsx-runtime";
const VALUE_NAME = "SelectValue",
  SelectValueFrame = styled(SizableText, {
    name: VALUE_NAME,
    userSelect: "none"
  }),
  SelectValue = SelectValueFrame.styleable(function ({
    scope,
    children: childrenProp,
    placeholder,
    ...props
  }, forwardedRef) {
    const context = useSelectContext(scope),
      itemParentContext = useSelectItemParentContext(scope),
      composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange),
      children = childrenProp ?? context.selectedItem,
      selectValueChildren = context.value == null || context.value === "" ? placeholder ?? children : children;
    return /* @__PURE__ */jsx(SelectValueFrame, {
      ...(!props.unstyled && {
        size: itemParentContext.size,
        ellipse: !0,
        // we don't want events from the portalled `SelectValue` children to bubble
        // through the item they came from
        pointerEvents: "none"
      }),
      ref: composedRefs,
      ...props,
      children: unwrapSelectItem(selectValueChildren)
    });
  });
function unwrapSelectItem(selectValueChildren) {
  return React.Children.map(selectValueChildren, child => {
    if (child) {
      if (child.type?.staticConfig?.componentName === ITEM_TEXT_NAME) return child.props.children;
      if (child.props?.children) return unwrapSelectItem(child.props.children);
    }
    return child;
  });
}
const SelectIcon = styled(XStack, {
    name: "SelectIcon",
    // @ts-ignore
    "aria-hidden": !0,
    children: /* @__PURE__ */jsx(Paragraph, {
      children: "\u25BC"
    })
  }),
  SelectItemIndicatorFrame = styled(XStack, {
    name: "SelectItemIndicator"
  }),
  SelectItemIndicator = React.forwardRef(function (props, forwardedRef) {
    const {
        scope,
        ...itemIndicatorProps
      } = props,
      context = useSelectItemParentContext(scope),
      itemContext = useSelectItemContext(scope);
    return context.shouldRenderWebNative ? null : itemContext.isSelected ? /* @__PURE__ */jsx(SelectItemIndicatorFrame, {
      "aria-hidden": !0,
      ...itemIndicatorProps,
      ref: forwardedRef
    }) : null;
  }),
  GROUP_NAME = "SelectGroup",
  {
    Provider: SelectGroupContextProvider,
    useStyledContext: useSelectGroupContext
  } = createStyledContext({
    id: ""
  }, "SelectGroup"),
  SelectGroupFrame = styled(YStack, {
    name: GROUP_NAME,
    width: "100%"
  }),
  NativeSelectTextFrame = styled(SizableText, {
    tag: "select",
    backgroundColor: "$background",
    borderColor: "$borderColor",
    hoverStyle: {
      backgroundColor: "$backgroundHover"
    }
  }),
  NativeSelectFrame = styled(ThemeableStack, {
    name: "NativeSelect",
    bordered: !0,
    userSelect: "none",
    outlineWidth: 0,
    paddingRight: 10,
    variants: {
      size: {
        "...size": (val, extras) => {
          const {
              tokens
            } = extras,
            paddingHorizontal = getVariableValue(tokens.space[val]);
          return {
            borderRadius: tokens.radius[val] ?? val,
            minHeight: tokens.size[val],
            paddingRight: paddingHorizontal + 20,
            paddingLeft: paddingHorizontal,
            paddingVertical: getSpace(val, {
              shift: -3
            })
          };
        }
      }
    },
    defaultVariants: {
      size: "$2"
    }
  }),
  SelectGroup = React.forwardRef((props, forwardedRef) => {
    const {
        scope,
        ...groupProps
      } = props,
      groupId = React.useId(),
      context = useSelectContext(scope),
      itemParentContext = useSelectItemParentContext(scope),
      size = itemParentContext.size ?? "$true",
      nativeSelectRef = React.useRef(null),
      content = itemParentContext.shouldRenderWebNative ? /* @__PURE__ */jsx(NativeSelectFrame, {
        asChild: !0,
        size,
        value: context.value,
        id: itemParentContext.id,
        children: /* @__PURE__ */jsx(NativeSelectTextFrame, {
          onChange: event => {
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
        })
      }) : /* @__PURE__ */jsx(SelectGroupFrame, {
        role: "group",
        "aria-labelledby": groupId,
        ...groupProps,
        ref: forwardedRef
      });
    return /* @__PURE__ */jsx(SelectGroupContextProvider, {
      scope,
      id: groupId || "",
      children: content
    });
  });
SelectGroup.displayName = GROUP_NAME;
const LABEL_NAME = "SelectLabel",
  SelectLabel = React.forwardRef((props, forwardedRef) => {
    const {
        scope,
        ...labelProps
      } = props,
      context = useSelectItemParentContext(scope),
      groupContext = useSelectGroupContext(scope);
    return context.shouldRenderWebNative ? null : /* @__PURE__ */jsx(ListItem, {
      tag: "div",
      componentName: LABEL_NAME,
      fontWeight: "800",
      id: groupContext.id,
      size: context.size,
      ...labelProps,
      ref: forwardedRef
    });
  });
SelectLabel.displayName = LABEL_NAME;
const SelectSeparator = styled(Separator, {
    name: "SelectSeparator"
  }),
  SelectSheetController = props => {
    const context = useSelectContext(props.scope),
      showSheet = useShowSelectSheet(context),
      isAdapted = useAdaptIsActive(context.adaptScope),
      getShowSheet = useGet(showSheet);
    return /* @__PURE__ */jsx(SheetController, {
      onOpenChange: val => {
        getShowSheet() && props.onOpenChange(val);
      },
      open: context.open,
      hidden: !isAdapted,
      children: props.children
    });
  },
  SelectSheetImpl = props => /* @__PURE__ */jsx(Fragment, {
    children: props.children
  }),
  Select = withStaticProperties(function (props) {
    const adaptScope = `AdaptSelect${props.scope || ""}`;
    return /* @__PURE__ */jsx(AdaptParent, {
      scope: adaptScope,
      portal: !0,
      children: /* @__PURE__ */jsx(SelectInner, {
        scope: props.scope,
        adaptScope,
        ...props
      })
    });
  }, {
    Adapt,
    Content: SelectContent,
    Group: SelectGroup,
    Icon: SelectIcon,
    Item: SelectItem,
    ItemIndicator: SelectItemIndicator,
    ItemText: SelectItemText,
    Label: SelectLabel,
    ScrollDownButton: SelectScrollDownButton,
    ScrollUpButton: SelectScrollUpButton,
    Trigger: SelectTrigger,
    Value: SelectValue,
    Viewport: SelectViewport,
    Sheet: Sheet.Controlled,
    FocusScope: FocusScopeController
  });
function useEmitter() {
  const listeners = React.useRef(null);
  listeners.current || (listeners.current = /* @__PURE__ */new Set());
  const emit = value => {
      listeners.current.forEach(l => l(value));
    },
    subscribe = React.useCallback(listener => (listeners.current.add(listener), () => {
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
    } = props,
    SelectImpl = useAdaptIsActive(adaptScope) || !isWeb ? SelectSheetImpl : SelectInlineImpl,
    forceUpdate = React.useReducer(() => ({}), {})[1],
    [selectedItem, setSelectedItem] = React.useState(null),
    [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen || !1,
      onChange: onOpenChange
    }),
    [value, setValue] = useControllableState({
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
  const [activeIndex, setActiveIndex] = React.useState(0),
    [emitValue, valueSubscribe] = useEmitter(),
    [emitActiveIndex, activeIndexSubscribe] = useEmitter(),
    selectedIndexRef = React.useRef(null),
    activeIndexRef = React.useRef(null),
    listContentRef = React.useRef([]),
    [selectedIndex, setSelectedIndex] = React.useState(0),
    [valueNode, setValueNode] = React.useState(null);
  useIsomorphicLayoutEffect(() => {
    selectedIndexRef.current = selectedIndex, activeIndexRef.current = activeIndex;
  });
  const shouldRenderWebNative = isWeb && (native === !0 || native === "web" || Array.isArray(native) && native.includes("web")),
    setActiveIndexDebounced = useDebounce(index => {
      setActiveIndex(prev => prev !== index ? (typeof index == "number" && emitActiveIndex(index), index) : prev);
    }, 1, {}, []);
  return /* @__PURE__ */jsx(SelectItemParentProvider, {
    scopeName: scope,
    scope,
    adaptScope,
    initialValue: React.useMemo(() => value, [open]),
    size: sizeProp,
    activeIndexSubscribe,
    valueSubscribe,
    setOpen,
    id,
    onChange: React.useCallback(val => {
      setValue(val), emitValue(val);
    }, []),
    onActiveChange: useEvent((value2, index) => {
      onActiveChange?.(value2, index);
    }),
    setSelectedIndex,
    setValueAtIndex: React.useCallback((index, value2) => {
      listContentRef.current[index] = value2;
    }, []),
    shouldRenderWebNative,
    children: /* @__PURE__ */jsx(SelectProvider, {
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
      children: /* @__PURE__ */jsx(SelectSheetController, {
        onOpenChange: setOpen,
        scope,
        children: shouldRenderWebNative ? children : /* @__PURE__ */jsx(SelectImpl, {
          activeIndexRef,
          listContentRef,
          selectedIndexRef,
          ...props,
          open,
          value,
          children
        })
      })
    })
  });
}
export { Select, SelectGroupFrame, SelectIcon, SelectSeparator };
//# sourceMappingURL=Select.mjs.map
