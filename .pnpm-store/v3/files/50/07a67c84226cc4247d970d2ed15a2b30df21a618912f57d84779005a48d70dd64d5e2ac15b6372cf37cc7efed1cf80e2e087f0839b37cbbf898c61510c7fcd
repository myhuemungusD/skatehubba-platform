import { jsx as _jsx } from "react/jsx-runtime";
import { getTokens, getVariableValue, spacedChildren, styled, useProps } from "@tamagui/core";
import { createContextScope } from "@tamagui/create-context";
import { withStaticProperties } from "@tamagui/helpers";
import { ThemeableStack } from "@tamagui/stacks";
import { useControllableState } from "@tamagui/use-controllable-state";
import React from "react";
import { ScrollView } from "react-native";
import { useIndex, useIndexedChildren } from "./useIndexedChildren.native.js";
var GROUP_NAME = "Group",
  [createGroupContext, createGroupScope] = createContextScope(GROUP_NAME),
  [GroupProvider, useGroupContext] = createGroupContext(GROUP_NAME),
  GroupFrame = styled(ThemeableStack, {
    name: "GroupFrame",
    variants: {
      unstyled: {
        false: {
          size: "$true"
        }
      },
      size: function (val, param) {
        var {
            tokens
          } = param,
          _tokens_radius_val,
          _ref,
          borderRadius = (_ref = (_tokens_radius_val = tokens.radius[val]) !== null && _tokens_radius_val !== void 0 ? _tokens_radius_val : val) !== null && _ref !== void 0 ? _ref : tokens.radius.$true;
        return {
          borderRadius
        };
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  });
function createGroup(verticalDefault) {
  return withStaticProperties(GroupFrame.styleable(function (props, ref) {
    var activeProps = useProps(props),
      {
        __scopeGroup,
        children: childrenProp,
        space,
        size = "$true",
        spaceDirection,
        separator,
        scrollable,
        axis = verticalDefault ? "vertical" : "horizontal",
        orientation = axis,
        disabled: disabledProp,
        disablePassBorderRadius: disablePassBorderRadiusProp,
        borderRadius,
        forceUseItem,
        ...restProps
      } = activeProps,
      vertical = orientation === "vertical",
      [itemChildrenCount, setItemChildrenCount] = useControllableState({
        defaultProp: forceUseItem ? 1 : 0
      }),
      isUsingItems = itemChildrenCount > 0,
      radius = borderRadius ?? (size ? getVariableValue(getTokens().radius[size]) - 1 : void 0),
      hasRadius = radius !== void 0,
      disablePassBorderRadius = disablePassBorderRadiusProp ?? !hasRadius,
      childrenArray = React.Children.toArray(childrenProp),
      children = isUsingItems ? React.Children.toArray(childrenProp).filter(React.isValidElement) : childrenArray.map(function (child, i) {
        if (! /* @__PURE__ */React.isValidElement(child) || child.type === React.Fragment) return child;
        var _child_props_disabled,
          disabled = (_child_props_disabled = child.props.disabled) !== null && _child_props_disabled !== void 0 ? _child_props_disabled : disabledProp,
          isFirst = i === 0,
          isLast = i === childrenArray.length - 1,
          radiusStyles = disablePassBorderRadius === !0 ? null : getBorderRadius({
            isFirst,
            isLast,
            radius,
            vertical,
            disable: disablePassBorderRadius
          }),
          _$props = {
            disabled,
            ...radiusStyles
          };
        return cloneElementWithPropOrder(child, _$props);
      }),
      indexedChildren = useIndexedChildren(spacedChildren({
        direction: spaceDirection,
        separator,
        space,
        children
      })),
      onItemMount = React.useCallback(function () {
        return setItemChildrenCount(function (prev) {
          return prev + 1;
        });
      }, []),
      onItemUnmount = React.useCallback(function () {
        return setItemChildrenCount(function (prev) {
          return prev - 1;
        });
      }, []);
    return /* @__PURE__ */_jsx(GroupProvider, {
      disablePassBorderRadius,
      vertical: orientation === "vertical",
      // @ts-ignore this just popped up since new version expo 49
      radius,
      disabled: disabledProp,
      onItemMount,
      onItemUnmount,
      scope: __scopeGroup,
      children: /* @__PURE__ */_jsx(GroupFrame, {
        ref,
        size,
        flexDirection: orientation === "horizontal" ? "row" : "column",
        borderRadius,
        ...restProps,
        children: wrapScroll({
          ...activeProps,
          orientation
        }, indexedChildren)
      })
    });
  }), {
    Item: GroupItem
  });
}
var GroupItem = /* @__PURE__ */React.forwardRef(function (props, _ref) {
    var {
        __scopeGroup,
        children,
        forcePlacement
      } = props,
      groupItemProps = useGroupItem({
        disabled: /* @__PURE__ */React.isValidElement(children) ? children.props.disabled : !1
      }, forcePlacement, __scopeGroup);
    return ! /* @__PURE__ */React.isValidElement(children) || children.type === React.Fragment ? children : /* @__PURE__ */React.cloneElement(children, groupItemProps);
  }),
  useGroupItem = function (childrenProps, forcePlacement, __scopeGroup) {
    var treeIndex = useIndex(),
      context = useGroupContext("GroupItem", __scopeGroup);
    if (React.useEffect(function () {
      return context.onItemMount(), function () {
        context.onItemUnmount();
      };
    }, []), !treeIndex) throw Error("<Group.Item/> should only be used within a <Group/>");
    var isFirst = forcePlacement === "first" || forcePlacement !== "last" && treeIndex.index === 0,
      isLast = forcePlacement === "last" || forcePlacement !== "first" && treeIndex.index === treeIndex.maxIndex,
      _childrenProps_disabled,
      disabled = (_childrenProps_disabled = childrenProps.disabled) !== null && _childrenProps_disabled !== void 0 ? _childrenProps_disabled : context.disabled,
      propsToPass = {
        disabled
      };
    if (context.disablePassBorderRadius !== !0) {
      var borderRadius = getBorderRadius({
        radius: context.radius,
        isFirst,
        isLast,
        vertical: context.vertical,
        disable: context.disablePassBorderRadius
      });
      return {
        ...propsToPass,
        ...borderRadius
      };
    }
    return propsToPass;
  },
  Group = createGroup(!0),
  YGroup = Group,
  XGroup = createGroup(!1),
  wrapScroll = function (param, children) {
    var {
      scrollable,
      orientation,
      showScrollIndicator = !1
    } = param;
    return scrollable ? /* @__PURE__ */_jsx(ScrollView, {
      ...(orientation === "vertical" && {
        showsVerticalScrollIndicator: showScrollIndicator
      }),
      ...(orientation === "horizontal" && {
        horizontal: !0,
        showsHorizontalScrollIndicator: showScrollIndicator
      }),
      children
    }) : children;
  },
  getBorderRadius = function (param) {
    var {
      isFirst,
      isLast,
      radius,
      vertical,
      disable
    } = param;
    return {
      borderTopLeftRadius: isFirst && disable !== "top" && disable !== "start" ? radius : 0,
      borderTopRightRadius: disable !== "top" && disable !== "end" && (vertical && isFirst || !vertical && isLast) ? radius : 0,
      borderBottomLeftRadius: disable !== "bottom" && disable !== "start" && (vertical && isLast || !vertical && isFirst) ? radius : 0,
      borderBottomRightRadius: isLast && disable !== "bottom" && disable !== "end" ? radius : 0
    };
  },
  cloneElementWithPropOrder = function (child, props) {
    return /* @__PURE__ */React.cloneElement({
      ...child,
      props: null
    }, {
      ...child.props,
      ...props
    });
  };
export { Group, GroupFrame, XGroup, YGroup, useGroupItem };
//# sourceMappingURL=Group.native.js.map
