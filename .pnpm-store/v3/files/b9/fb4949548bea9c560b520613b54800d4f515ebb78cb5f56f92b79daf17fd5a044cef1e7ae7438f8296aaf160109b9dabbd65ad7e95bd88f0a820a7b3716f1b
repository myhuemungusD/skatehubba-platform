import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Adapt, AdaptParent, useAdaptIsActive } from "@tamagui/adapt";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { createStyledContext, getVariableValue, styled, useEvent, useGet } from "@tamagui/core";
import { FocusScopeController } from "@tamagui/focus-scope";
import { registerFocusable } from "@tamagui/focusable";
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
import { SelectItemParentProvider, SelectProvider, useSelectContext, useSelectItemParentContext } from "./context.native.js";
import { SelectContent } from "./SelectContent.native.js";
import { SelectInlineImpl } from "./SelectImpl.native.js";
import { SelectItem, useSelectItemContext } from "./SelectItem.native.js";
import { ITEM_TEXT_NAME, SelectItemText } from "./SelectItemText.native.js";
import { SelectScrollDownButton, SelectScrollUpButton } from "./SelectScrollButton.native.js";
import { SelectTrigger } from "./SelectTrigger.native.js";
import { SelectViewport } from "./SelectViewport.native.js";
import { useShowSelectSheet } from "./useSelectBreakpointActive.native.js";
var VALUE_NAME = "SelectValue",
  SelectValueFrame = styled(SizableText, {
    name: VALUE_NAME,
    userSelect: "none"
  }),
  SelectValue = SelectValueFrame.styleable(function (param, forwardedRef) {
    var {
        scope,
        children: childrenProp,
        placeholder,
        ...props
      } = param,
      context = useSelectContext(scope),
      itemParentContext = useSelectItemParentContext(scope),
      composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange),
      children = childrenProp ?? context.selectedItem,
      isEmptyValue = context.value == null || context.value === "",
      selectValueChildren = isEmptyValue ? placeholder ?? children : children;
    return /* @__PURE__ */_jsx(SelectValueFrame, {
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
  return React.Children.map(selectValueChildren, function (child) {
    if (child) {
      var _child_type_staticConfig, _child_type, _child_props;
      if (((_child_type = child.type) === null || _child_type === void 0 || (_child_type_staticConfig = _child_type.staticConfig) === null || _child_type_staticConfig === void 0 ? void 0 : _child_type_staticConfig.componentName) === ITEM_TEXT_NAME) return child.props.children;
      if (!((_child_props = child.props) === null || _child_props === void 0) && _child_props.children) return unwrapSelectItem(child.props.children);
    }
    return child;
  });
}
var SelectIcon = styled(XStack, {
    name: "SelectIcon",
    // @ts-ignore
    "aria-hidden": !0,
    children: /* @__PURE__ */_jsx(Paragraph, {
      children: "\u25BC"
    })
  }),
  SelectItemIndicatorFrame = styled(XStack, {
    name: "SelectItemIndicator"
  }),
  SelectItemIndicator = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        scope,
        ...itemIndicatorProps
      } = props,
      context = useSelectItemParentContext(scope),
      itemContext = useSelectItemContext(scope);
    return context.shouldRenderWebNative ? null : itemContext.isSelected ? /* @__PURE__ */_jsx(SelectItemIndicatorFrame, {
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
        "...size": function (val, extras) {
          var {
              tokens
            } = extras,
            paddingHorizontal = getVariableValue(tokens.space[val]),
            _tokens_radius_val;
          return {
            borderRadius: (_tokens_radius_val = tokens.radius[val]) !== null && _tokens_radius_val !== void 0 ? _tokens_radius_val : val,
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
  SelectGroup = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        scope,
        ...groupProps
      } = props,
      groupId = React.useId(),
      context = useSelectContext(scope),
      itemParentContext = useSelectItemParentContext(scope),
      _itemParentContext_size,
      size = (_itemParentContext_size = itemParentContext.size) !== null && _itemParentContext_size !== void 0 ? _itemParentContext_size : "$true",
      nativeSelectRef = React.useRef(null),
      content = function () {
        return itemParentContext.shouldRenderWebNative ? /* @__PURE__ */_jsx(NativeSelectFrame, {
          asChild: !0,
          size,
          // @ts-expect-error until we support typing based on tag
          value: context.value,
          id: itemParentContext.id,
          children: /* @__PURE__ */_jsx(NativeSelectTextFrame, {
            // @ts-ignore it's ok since tag="select"
            onChange: function (event) {
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
        }) : /* @__PURE__ */_jsx(SelectGroupFrame, {
          // @ts-ignore
          role: "group",
          "aria-labelledby": groupId,
          ...groupProps,
          ref: forwardedRef
        });
      }();
    return /* @__PURE__ */_jsx(SelectGroupContextProvider, {
      scope,
      id: groupId || "",
      children: content
    });
  });
SelectGroup.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel",
  SelectLabel = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        scope,
        ...labelProps
      } = props,
      context = useSelectItemParentContext(scope),
      groupContext = useSelectGroupContext(scope);
    return context.shouldRenderWebNative ? null : /* @__PURE__ */_jsx(ListItem, {
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
var SelectSeparator = styled(Separator, {
    name: "SelectSeparator"
  }),
  SelectSheetController = function (props) {
    var context = useSelectContext(props.scope),
      showSheet = useShowSelectSheet(context),
      isAdapted = useAdaptIsActive(context.adaptScope),
      getShowSheet = useGet(showSheet);
    return /* @__PURE__ */_jsx(SheetController, {
      onOpenChange: function (val) {
        getShowSheet() && props.onOpenChange(val);
      },
      open: context.open,
      hidden: !isAdapted,
      children: props.children
    });
  },
  SelectSheetImpl = function (props) {
    return /* @__PURE__ */_jsx(_Fragment, {
      children: props.children
    });
  },
  Select = withStaticProperties(function (props) {
    var adaptScope = `AdaptSelect${props.scope || ""}`;
    return /* @__PURE__ */_jsx(AdaptParent, {
      scope: adaptScope,
      portal: !0,
      children: /* @__PURE__ */_jsx(SelectInner, {
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
  var listeners = React.useRef(null);
  listeners.current || (listeners.current = /* @__PURE__ */new Set());
  var emit = function (value) {
      listeners.current.forEach(function (l) {
        return l(value);
      });
    },
    subscribe = React.useCallback(function (listener) {
      return listeners.current.add(listener), function () {
        listeners.current.delete(listener);
      };
    }, []);
  return [emit, subscribe];
}
function SelectInner(props) {
  var {
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
    isAdapted = useAdaptIsActive(adaptScope),
    SelectImpl = isAdapted || !isWeb ? SelectSheetImpl : SelectInlineImpl,
    forceUpdate = React.useReducer(function () {
      return {};
    }, {})[1],
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
  React.useEffect(function () {
    open && emitValue(value);
  }, [open]), React.useEffect(function () {
    emitValue(value);
  }, [value]), React.useEffect(function () {
    if (props.id) return registerFocusable(props.id, {
      focusAndSelect: function () {
        setOpen?.(function (value2) {
          return !value2;
        });
      },
      focus: function () {}
    });
  }, [props.id]);
  var [activeIndex, setActiveIndex] = React.useState(0),
    [emitValue, valueSubscribe] = useEmitter(),
    [emitActiveIndex, activeIndexSubscribe] = useEmitter(),
    selectedIndexRef = React.useRef(null),
    activeIndexRef = React.useRef(null),
    listContentRef = React.useRef([]),
    [selectedIndex, setSelectedIndex] = React.useState(0),
    [valueNode, setValueNode] = React.useState(null);
  useIsomorphicLayoutEffect(function () {
    selectedIndexRef.current = selectedIndex, activeIndexRef.current = activeIndex;
  });
  var shouldRenderWebNative = isWeb && (native === !0 || native === "web" || Array.isArray(native) && native.includes("web")),
    setActiveIndexDebounced = useDebounce(function (index) {
      setActiveIndex(function (prev) {
        return prev !== index ? (typeof index == "number" && emitActiveIndex(index), index) : prev;
      });
    }, 1, {}, []);
  return /* @__PURE__ */_jsx(SelectItemParentProvider, {
    scopeName: scope,
    scope,
    adaptScope,
    initialValue: React.useMemo(function () {
      return value;
    }, [open]),
    size: sizeProp,
    activeIndexSubscribe,
    valueSubscribe,
    setOpen,
    id,
    onChange: React.useCallback(function (val) {
      setValue(val), emitValue(val);
    }, []),
    onActiveChange: useEvent(function (value2, index) {
      onActiveChange?.(value2, index);
    }),
    setSelectedIndex,
    setValueAtIndex: React.useCallback(function (index, value2) {
      listContentRef.current[index] = value2;
    }, []),
    shouldRenderWebNative,
    children: /* @__PURE__ */_jsx(SelectProvider, {
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
      children: /* @__PURE__ */_jsx(SelectSheetController, {
        onOpenChange: setOpen,
        scope,
        children: shouldRenderWebNative ? children : /* @__PURE__ */_jsx(SelectImpl, {
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
//# sourceMappingURL=Select.native.js.map
