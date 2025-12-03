import { jsx as _jsx } from "react/jsx-runtime";
import { isWeb } from "@tamagui/constants";
import { registerFocusable } from "@tamagui/focusable";
import { getFontSize } from "@tamagui/font-size";
import { getSize } from "@tamagui/get-token";
import { Group, useGroupItem } from "@tamagui/group";
import { withStaticProperties } from "@tamagui/helpers";
import { useGetThemedIcon } from "@tamagui/helpers-tamagui";
import { RovingFocusGroup } from "@tamagui/roving-focus";
import { useControllableState } from "@tamagui/use-controllable-state";
import { useDirection } from "@tamagui/use-direction";
import { createStyledContext, getVariableValue, styled, usePropsAndStyle, useTheme } from "@tamagui/web";
import React from "react";
import { Toggle, ToggleFrame } from "./Toggle.native.js";
var TOGGLE_GROUP_NAME = "ToggleGroup",
  TOGGLE_GROUP_ITEM_NAME = "ToggleGroupItem",
  TOGGLE_GROUP_CONTEXT = "ToggleGroup",
  {
    Provider: ToggleGroupItemProvider,
    useStyledContext: useToggleGroupItemContext
  } = createStyledContext(),
  {
    Provider: ToggleGroupContext,
    useStyledContext: useToggleGroupContext
  } = createStyledContext(),
  ToggleGroupItem = ToggleFrame.extractable(/* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var [_, {
        color
      }] = usePropsAndStyle(props),
      {
        disablePassStyles,
        ...rest
      } = props,
      valueContext = useToggleGroupValueContext(props.__scopeToggleGroup),
      context = useToggleGroupContext(props.__scopeToggleGroup),
      pressed = valueContext?.value.includes(props.value),
      disabled = context.disabled || props.disabled || !1,
      groupItemProps = useGroupItem({
        disabled
      }),
      _props_size,
      size = (_props_size = props.size) !== null && _props_size !== void 0 ? _props_size : context.size,
      sizeProps = props.unstyled ? {} : {
        width: void 0,
        height: void 0,
        padding: getVariableValue(size) * 0.6
      },
      iconSize = (typeof size == "number" ? size * 0.7 : getFontSize(size)) * 1.2,
      theme = useTheme(),
      getThemedIcon = useGetThemedIcon({
        size: iconSize,
        color: color ?? theme.color
      }),
      childrens = React.Children.toArray(props.children),
      children = childrens.map(function (child) {
        return props.disablePassStyles || ! /* @__PURE__ */React.isValidElement(child) ? child : getThemedIcon(child);
      }),
      commonProps = {
        pressed,
        disabled,
        ...sizeProps,
        ...rest,
        children
      },
      inner = /* @__PURE__ */_jsx(ToggleGroupItemImpl, {
        ...commonProps,
        ref: forwardedRef,
        // focusable={!disabled}
        tabIndex: disabled ? -1 : 0,
        disabled,
        ...groupItemProps
      });
    return /* @__PURE__ */_jsx(ToggleGroupItemProvider, {
      scope: props.__scopeToggleGroup,
      children: context.rovingFocus ? /* @__PURE__ */_jsx(RovingFocusGroup.Item, {
        asChild: "except-style",
        __scopeRovingFocusGroup: props.__scopeToggleGroup || TOGGLE_GROUP_CONTEXT,
        focusable: !disabled,
        active: pressed,
        children: inner
      }) : inner
    });
  }));
ToggleGroupItem.displayName = TOGGLE_GROUP_ITEM_NAME;
var ToggleGroupItemImpl = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeToggleGroup,
        value,
        ...itemProps
      } = props,
      valueContext = useToggleGroupValueContext(__scopeToggleGroup),
      singleProps = {
        "aria-pressed": void 0
      },
      typeProps = valueContext.type === "single" ? singleProps : void 0;
    return /* @__PURE__ */_jsx(Toggle, {
      ...typeProps,
      ...itemProps,
      ref: forwardedRef,
      onPressedChange: function (pressed) {
        pressed ? valueContext.onItemActivate(value) : valueContext.onItemDeactivate(value);
      }
    });
  }),
  ToggleGroup = withStaticProperties(/* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
      type,
      ...toggleGroupProps
    } = props;
    if (isWeb || React.useEffect(function () {
      if (props.id) return registerFocusable(props.id, {
        // TODO: would be nice to focus on the first child later - could be done with reforest
        // for now leaving it empty
        focus: function () {}
      });
    }, [props.id]), type === "single") {
      var singleProps = toggleGroupProps;
      return /* @__PURE__ */_jsx(ToggleGroupImplSingle, {
        ...singleProps,
        ref: forwardedRef
      });
    }
    if (type === "multiple") {
      var multipleProps = toggleGroupProps;
      return /* @__PURE__ */_jsx(ToggleGroupImplMultiple, {
        ...multipleProps,
        ref: forwardedRef
      });
    }
    throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``);
  }), {
    Item: ToggleGroupItem
  });
ToggleGroup.displayName = TOGGLE_GROUP_NAME;
var {
    Provider: ToggleGroupValueProvider,
    useStyledContext: useToggleGroupValueContext
  } = createStyledContext(),
  ToggleGroupImplSingle = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        value: valueProp,
        defaultValue,
        onValueChange = function () {},
        disableDeactivation = !1,
        ...toggleGroupSingleProps
      } = props,
      [value, setValue] = useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
      });
    return /* @__PURE__ */_jsx(ToggleGroupValueProvider, {
      scope: props.__scopeToggleGroup,
      type: "single",
      value: value ? [value] : [],
      defaultValue: value,
      onItemActivate: setValue,
      onItemDeactivate: React.useCallback(function () {
        return disableDeactivation ? null : setValue("");
      }, [setValue, disableDeactivation]),
      children: /* @__PURE__ */_jsx(ToggleGroupImpl, {
        ...toggleGroupSingleProps,
        ref: forwardedRef
      })
    });
  }),
  ToggleGroupImplMultiple = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        value: valueProp,
        defaultValue,
        onValueChange = function () {},
        disableDeactivation,
        ...toggleGroupMultipleProps
      } = props,
      [value = [], setValue] = useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
      }),
      handleButtonActivate = React.useCallback(function (itemValue) {
        return setValue(function () {
          var prevValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
          return [...prevValue, itemValue];
        });
      }, [setValue]),
      handleButtonDeactivate = React.useCallback(function (itemValue) {
        return setValue(function () {
          var prevValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
          return prevValue.filter(function (value2) {
            return value2 !== itemValue;
          });
        });
      }, [setValue]);
    return /* @__PURE__ */_jsx(ToggleGroupValueProvider, {
      scope: props.__scopeToggleGroup,
      type: "multiple",
      value,
      defaultValue: value,
      onItemActivate: handleButtonActivate,
      onItemDeactivate: handleButtonDeactivate,
      children: /* @__PURE__ */_jsx(ToggleGroupImpl, {
        ...toggleGroupMultipleProps,
        ref: forwardedRef
      })
    });
  });
ToggleGroup.displayName = TOGGLE_GROUP_NAME;
var ToggleGroupImplElementFrame = styled(Group, {
    name: TOGGLE_GROUP_NAME,
    variants: {
      unstyled: {
        false: {
          backgroundColor: "$background"
        }
      },
      orientation: {
        vertical: {
          flexDirection: "column",
          spaceDirection: "vertical"
        },
        horizontal: {
          flexDirection: "row",
          spaceDirection: "horizontal"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  ToggleGroupImpl = ToggleGroupImplElementFrame.extractable(/* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeToggleGroup,
        disabled = !1,
        orientation = "horizontal",
        dir,
        rovingFocus = !0,
        loop = !0,
        unstyled = !1,
        size: sizeProp = "$true",
        sizeAdjust = 0,
        ...toggleGroupProps
      } = props,
      direction = useDirection(dir),
      commonProps = {
        role: "group",
        dir: direction,
        ...toggleGroupProps
      },
      adjustedSize = getVariableValue(getSize(sizeProp, {
        shift: sizeAdjust
      })),
      size = Math.round(adjustedSize * 0.45);
    return /* @__PURE__ */_jsx(ToggleGroupContext, {
      scope: __scopeToggleGroup,
      rovingFocus,
      disabled,
      size,
      children: rovingFocus ? /* @__PURE__ */_jsx(RovingFocusGroup, {
        asChild: "except-style",
        __scopeRovingFocusGroup: __scopeToggleGroup || TOGGLE_GROUP_CONTEXT,
        orientation,
        dir: direction,
        loop,
        children: /* @__PURE__ */_jsx(ToggleGroupImplElementFrame, {
          "aria-orientation": orientation,
          orientation,
          axis: orientation,
          ref: forwardedRef,
          "data-disabled": disabled ? "" : void 0,
          unstyled,
          ...commonProps
        })
      }) : /* @__PURE__ */_jsx(ToggleGroupImplElementFrame, {
        "aria-orientation": orientation,
        ref: forwardedRef,
        orientation,
        "data-disabled": disabled ? "" : void 0,
        unstyled,
        ...commonProps
      })
    });
  }));
export { ToggleGroup };
//# sourceMappingURL=ToggleGroup.native.js.map
