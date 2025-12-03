import {
  getTokens,
  getVariableValue,
  spacedChildren,
  styled,
  useProps
} from "@tamagui/core";
import { createContextScope } from "@tamagui/create-context";
import { withStaticProperties } from "@tamagui/helpers";
import { ThemeableStack } from "@tamagui/stacks";
import { useControllableState } from "@tamagui/use-controllable-state";
import React from "react";
import { ScrollView } from "react-native-web";
import { useIndex, useIndexedChildren } from "./useIndexedChildren";
import { jsx } from "react/jsx-runtime";
const GROUP_NAME = "Group", [createGroupContext, createGroupScope] = createContextScope(GROUP_NAME), [GroupProvider, useGroupContext] = createGroupContext(GROUP_NAME), GroupFrame = styled(ThemeableStack, {
  name: "GroupFrame",
  variants: {
    unstyled: {
      false: {
        size: "$true"
      }
    },
    size: (val, { tokens }) => ({
      borderRadius: tokens.radius[val] ?? val ?? tokens.radius.$true
    })
  },
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === "1"
  }
});
function createGroup(verticalDefault) {
  return withStaticProperties(
    GroupFrame.styleable((props, ref) => {
      const activeProps = useProps(props), {
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
      } = activeProps, vertical = orientation === "vertical", [itemChildrenCount, setItemChildrenCount] = useControllableState({
        defaultProp: forceUseItem ? 1 : 0
      }), isUsingItems = itemChildrenCount > 0, radius = borderRadius ?? (size ? getVariableValue(getTokens().radius[size]) - 1 : void 0), disablePassBorderRadius = disablePassBorderRadiusProp ?? !(radius !== void 0), childrenArray = React.Children.toArray(childrenProp), children = isUsingItems ? React.Children.toArray(childrenProp).filter(React.isValidElement) : childrenArray.map((child, i) => {
        if (!React.isValidElement(child) || child.type === React.Fragment)
          return child;
        const disabled = child.props.disabled ?? disabledProp, isFirst = i === 0, isLast = i === childrenArray.length - 1, radiusStyles = disablePassBorderRadius === !0 ? null : getBorderRadius({
          isFirst,
          isLast,
          radius,
          vertical,
          disable: disablePassBorderRadius
        }), props2 = {
          disabled,
          ...radiusStyles
        };
        return cloneElementWithPropOrder(child, props2);
      }), indexedChildren = useIndexedChildren(
        spacedChildren({
          direction: spaceDirection,
          separator,
          space,
          children
        })
      ), onItemMount = React.useCallback(
        () => setItemChildrenCount((prev) => prev + 1),
        []
      ), onItemUnmount = React.useCallback(
        () => setItemChildrenCount((prev) => prev - 1),
        []
      );
      return /* @__PURE__ */ jsx(
        GroupProvider,
        {
          disablePassBorderRadius,
          vertical: orientation === "vertical",
          radius,
          disabled: disabledProp,
          onItemMount,
          onItemUnmount,
          scope: __scopeGroup,
          children: /* @__PURE__ */ jsx(
            GroupFrame,
            {
              ref,
              size,
              flexDirection: orientation === "horizontal" ? "row" : "column",
              borderRadius,
              ...restProps,
              children: wrapScroll({ ...activeProps, orientation }, indexedChildren)
            }
          )
        }
      );
    }),
    {
      Item: GroupItem
    }
  );
}
const GroupItem = React.forwardRef(
  (props, _ref) => {
    const { __scopeGroup, children, forcePlacement } = props, groupItemProps = useGroupItem(
      {
        disabled: React.isValidElement(children) ? children.props.disabled : !1
      },
      forcePlacement,
      __scopeGroup
    );
    return !React.isValidElement(children) || children.type === React.Fragment ? children : React.cloneElement(children, groupItemProps);
  }
), useGroupItem = (childrenProps, forcePlacement, __scopeGroup) => {
  const treeIndex = useIndex(), context = useGroupContext("GroupItem", __scopeGroup);
  if (React.useEffect(() => (context.onItemMount(), () => {
    context.onItemUnmount();
  }), []), !treeIndex)
    throw Error("<Group.Item/> should only be used within a <Group/>");
  const isFirst = forcePlacement === "first" || forcePlacement !== "last" && treeIndex.index === 0, isLast = forcePlacement === "last" || forcePlacement !== "first" && treeIndex.index === treeIndex.maxIndex;
  let propsToPass = {
    disabled: childrenProps.disabled ?? context.disabled
  };
  if (context.disablePassBorderRadius !== !0) {
    const borderRadius = getBorderRadius({
      radius: context.radius,
      isFirst,
      isLast,
      vertical: context.vertical,
      disable: context.disablePassBorderRadius
    });
    return { ...propsToPass, ...borderRadius };
  }
  return propsToPass;
}, Group = createGroup(!0), YGroup = Group, XGroup = createGroup(!1), wrapScroll = ({ scrollable, orientation, showScrollIndicator = !1 }, children) => scrollable ? /* @__PURE__ */ jsx(
  ScrollView,
  {
    ...orientation === "vertical" && {
      showsVerticalScrollIndicator: showScrollIndicator
    },
    ...orientation === "horizontal" && {
      horizontal: !0,
      showsHorizontalScrollIndicator: showScrollIndicator
    },
    children
  }
) : children, getBorderRadius = ({
  isFirst,
  isLast,
  radius,
  vertical,
  disable
}) => ({
  borderTopLeftRadius: isFirst && disable !== "top" && disable !== "start" ? radius : 0,
  borderTopRightRadius: disable !== "top" && disable !== "end" && (vertical && isFirst || !vertical && isLast) ? radius : 0,
  borderBottomLeftRadius: disable !== "bottom" && disable !== "start" && (vertical && isLast || !vertical && isFirst) ? radius : 0,
  borderBottomRightRadius: isLast && disable !== "bottom" && disable !== "end" ? radius : 0
}), cloneElementWithPropOrder = (child, props) => React.cloneElement({ ...child, props: null }, { ...child.props, ...props });
export {
  Group,
  GroupFrame,
  XGroup,
  YGroup,
  useGroupItem
};
//# sourceMappingURL=Group.js.map
