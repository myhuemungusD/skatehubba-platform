"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: !0
    });
  },
  __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function") for (let key of __getOwnPropNames(from)) !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
    return to;
  };
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var Group_exports = {};
__export(Group_exports, {
  Group: () => Group,
  GroupFrame: () => GroupFrame,
  XGroup: () => XGroup,
  YGroup: () => YGroup,
  useGroupItem: () => useGroupItem
});
module.exports = __toCommonJS(Group_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_core = require("@tamagui/core"),
  import_create_context = require("@tamagui/create-context"),
  import_helpers = require("@tamagui/helpers"),
  import_stacks = require("@tamagui/stacks"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  import_react = __toESM(require("react"), 1),
  import_react_native = require("react-native"),
  import_useIndexedChildren = require("./useIndexedChildren.native.js"),
  GROUP_NAME = "Group",
  [createGroupContext, createGroupScope] = (0, import_create_context.createContextScope)(GROUP_NAME),
  [GroupProvider, useGroupContext] = createGroupContext(GROUP_NAME),
  GroupFrame = (0, import_core.styled)(import_stacks.ThemeableStack, {
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
  return (0, import_helpers.withStaticProperties)(GroupFrame.styleable(function (props, ref) {
    var activeProps = (0, import_core.useProps)(props),
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
      [itemChildrenCount, setItemChildrenCount] = (0, import_use_controllable_state.useControllableState)({
        defaultProp: forceUseItem ? 1 : 0
      }),
      isUsingItems = itemChildrenCount > 0,
      radius = borderRadius ?? (size ? (0, import_core.getVariableValue)((0, import_core.getTokens)().radius[size]) - 1 : void 0),
      hasRadius = radius !== void 0,
      disablePassBorderRadius = disablePassBorderRadiusProp ?? !hasRadius,
      childrenArray = import_react.default.Children.toArray(childrenProp),
      children = isUsingItems ? import_react.default.Children.toArray(childrenProp).filter(import_react.default.isValidElement) : childrenArray.map(function (child, i) {
        if (! /* @__PURE__ */import_react.default.isValidElement(child) || child.type === import_react.default.Fragment) return child;
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
      indexedChildren = (0, import_useIndexedChildren.useIndexedChildren)((0, import_core.spacedChildren)({
        direction: spaceDirection,
        separator,
        space,
        children
      })),
      onItemMount = import_react.default.useCallback(function () {
        return setItemChildrenCount(function (prev) {
          return prev + 1;
        });
      }, []),
      onItemUnmount = import_react.default.useCallback(function () {
        return setItemChildrenCount(function (prev) {
          return prev - 1;
        });
      }, []);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(GroupProvider, {
      disablePassBorderRadius,
      vertical: orientation === "vertical",
      // @ts-ignore this just popped up since new version expo 49
      radius,
      disabled: disabledProp,
      onItemMount,
      onItemUnmount,
      scope: __scopeGroup,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(GroupFrame, {
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
var GroupItem = /* @__PURE__ */import_react.default.forwardRef(function (props, _ref) {
    var {
        __scopeGroup,
        children,
        forcePlacement
      } = props,
      groupItemProps = useGroupItem({
        disabled: /* @__PURE__ */import_react.default.isValidElement(children) ? children.props.disabled : !1
      }, forcePlacement, __scopeGroup);
    return ! /* @__PURE__ */import_react.default.isValidElement(children) || children.type === import_react.default.Fragment ? children : /* @__PURE__ */import_react.default.cloneElement(children, groupItemProps);
  }),
  useGroupItem = function (childrenProps, forcePlacement, __scopeGroup) {
    var treeIndex = (0, import_useIndexedChildren.useIndex)(),
      context = useGroupContext("GroupItem", __scopeGroup);
    if (import_react.default.useEffect(function () {
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
    return scrollable ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_native.ScrollView, {
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
    return /* @__PURE__ */import_react.default.cloneElement({
      ...child,
      props: null
    }, {
      ...child.props,
      ...props
    });
  };
//# sourceMappingURL=Group.native.js.map
