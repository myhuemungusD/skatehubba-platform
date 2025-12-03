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
var ToggleGroup_exports = {};
__export(ToggleGroup_exports, {
  ToggleGroup: () => ToggleGroup
});
module.exports = __toCommonJS(ToggleGroup_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_constants = require("@tamagui/constants"),
  import_focusable = require("@tamagui/focusable"),
  import_font_size = require("@tamagui/font-size"),
  import_get_token = require("@tamagui/get-token"),
  import_group = require("@tamagui/group"),
  import_helpers = require("@tamagui/helpers"),
  import_helpers_tamagui = require("@tamagui/helpers-tamagui"),
  import_roving_focus = require("@tamagui/roving-focus"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  import_use_direction = require("@tamagui/use-direction"),
  import_web = require("@tamagui/web"),
  import_react = __toESM(require("react"), 1),
  import_Toggle = require("./Toggle.native.js"),
  TOGGLE_GROUP_NAME = "ToggleGroup",
  TOGGLE_GROUP_ITEM_NAME = "ToggleGroupItem",
  TOGGLE_GROUP_CONTEXT = "ToggleGroup",
  {
    Provider: ToggleGroupItemProvider,
    useStyledContext: useToggleGroupItemContext
  } = (0, import_web.createStyledContext)(),
  {
    Provider: ToggleGroupContext,
    useStyledContext: useToggleGroupContext
  } = (0, import_web.createStyledContext)(),
  ToggleGroupItem = import_Toggle.ToggleFrame.extractable(/* @__PURE__ */import_react.default.forwardRef(function (props, forwardedRef) {
    var [_, {
        color
      }] = (0, import_web.usePropsAndStyle)(props),
      {
        disablePassStyles,
        ...rest
      } = props,
      valueContext = useToggleGroupValueContext(props.__scopeToggleGroup),
      context = useToggleGroupContext(props.__scopeToggleGroup),
      pressed = valueContext?.value.includes(props.value),
      disabled = context.disabled || props.disabled || !1,
      groupItemProps = (0, import_group.useGroupItem)({
        disabled
      }),
      _props_size,
      size = (_props_size = props.size) !== null && _props_size !== void 0 ? _props_size : context.size,
      sizeProps = props.unstyled ? {} : {
        width: void 0,
        height: void 0,
        padding: (0, import_web.getVariableValue)(size) * 0.6
      },
      iconSize = (typeof size == "number" ? size * 0.7 : (0, import_font_size.getFontSize)(size)) * 1.2,
      theme = (0, import_web.useTheme)(),
      getThemedIcon = (0, import_helpers_tamagui.useGetThemedIcon)({
        size: iconSize,
        color: color ?? theme.color
      }),
      childrens = import_react.default.Children.toArray(props.children),
      children = childrens.map(function (child) {
        return props.disablePassStyles || ! /* @__PURE__ */import_react.default.isValidElement(child) ? child : getThemedIcon(child);
      }),
      commonProps = {
        pressed,
        disabled,
        ...sizeProps,
        ...rest,
        children
      },
      inner = /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupItemImpl, {
        ...commonProps,
        ref: forwardedRef,
        // focusable={!disabled}
        tabIndex: disabled ? -1 : 0,
        disabled,
        ...groupItemProps
      });
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupItemProvider, {
      scope: props.__scopeToggleGroup,
      children: context.rovingFocus ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_roving_focus.RovingFocusGroup.Item, {
        asChild: "except-style",
        __scopeRovingFocusGroup: props.__scopeToggleGroup || TOGGLE_GROUP_CONTEXT,
        focusable: !disabled,
        active: pressed,
        children: inner
      }) : inner
    });
  }));
ToggleGroupItem.displayName = TOGGLE_GROUP_ITEM_NAME;
var ToggleGroupItemImpl = /* @__PURE__ */import_react.default.forwardRef(function (props, forwardedRef) {
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
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_Toggle.Toggle, {
      ...typeProps,
      ...itemProps,
      ref: forwardedRef,
      onPressedChange: function (pressed) {
        pressed ? valueContext.onItemActivate(value) : valueContext.onItemDeactivate(value);
      }
    });
  }),
  ToggleGroup = (0, import_helpers.withStaticProperties)(/* @__PURE__ */import_react.default.forwardRef(function (props, forwardedRef) {
    var {
      type,
      ...toggleGroupProps
    } = props;
    if (import_constants.isWeb || import_react.default.useEffect(function () {
      if (props.id) return (0, import_focusable.registerFocusable)(props.id, {
        // TODO: would be nice to focus on the first child later - could be done with reforest
        // for now leaving it empty
        focus: function () {}
      });
    }, [props.id]), type === "single") {
      var singleProps = toggleGroupProps;
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupImplSingle, {
        ...singleProps,
        ref: forwardedRef
      });
    }
    if (type === "multiple") {
      var multipleProps = toggleGroupProps;
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupImplMultiple, {
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
  } = (0, import_web.createStyledContext)(),
  ToggleGroupImplSingle = /* @__PURE__ */import_react.default.forwardRef(function (props, forwardedRef) {
    var {
        value: valueProp,
        defaultValue,
        onValueChange = function () {},
        disableDeactivation = !1,
        ...toggleGroupSingleProps
      } = props,
      [value, setValue] = (0, import_use_controllable_state.useControllableState)({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
      });
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
      scope: props.__scopeToggleGroup,
      type: "single",
      value: value ? [value] : [],
      defaultValue: value,
      onItemActivate: setValue,
      onItemDeactivate: import_react.default.useCallback(function () {
        return disableDeactivation ? null : setValue("");
      }, [setValue, disableDeactivation]),
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
        ...toggleGroupSingleProps,
        ref: forwardedRef
      })
    });
  }),
  ToggleGroupImplMultiple = /* @__PURE__ */import_react.default.forwardRef(function (props, forwardedRef) {
    var {
        value: valueProp,
        defaultValue,
        onValueChange = function () {},
        disableDeactivation,
        ...toggleGroupMultipleProps
      } = props,
      [value = [], setValue] = (0, import_use_controllable_state.useControllableState)({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
      }),
      handleButtonActivate = import_react.default.useCallback(function (itemValue) {
        return setValue(function () {
          var prevValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
          return [...prevValue, itemValue];
        });
      }, [setValue]),
      handleButtonDeactivate = import_react.default.useCallback(function (itemValue) {
        return setValue(function () {
          var prevValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
          return prevValue.filter(function (value2) {
            return value2 !== itemValue;
          });
        });
      }, [setValue]);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
      scope: props.__scopeToggleGroup,
      type: "multiple",
      value,
      defaultValue: value,
      onItemActivate: handleButtonActivate,
      onItemDeactivate: handleButtonDeactivate,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
        ...toggleGroupMultipleProps,
        ref: forwardedRef
      })
    });
  });
ToggleGroup.displayName = TOGGLE_GROUP_NAME;
var ToggleGroupImplElementFrame = (0, import_web.styled)(import_group.Group, {
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
  ToggleGroupImpl = ToggleGroupImplElementFrame.extractable(/* @__PURE__ */import_react.default.forwardRef(function (props, forwardedRef) {
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
      direction = (0, import_use_direction.useDirection)(dir),
      commonProps = {
        role: "group",
        dir: direction,
        ...toggleGroupProps
      },
      adjustedSize = (0, import_web.getVariableValue)((0, import_get_token.getSize)(sizeProp, {
        shift: sizeAdjust
      })),
      size = Math.round(adjustedSize * 0.45);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupContext, {
      scope: __scopeToggleGroup,
      rovingFocus,
      disabled,
      size,
      children: rovingFocus ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_roving_focus.RovingFocusGroup, {
        asChild: "except-style",
        __scopeRovingFocusGroup: __scopeToggleGroup || TOGGLE_GROUP_CONTEXT,
        orientation,
        dir: direction,
        loop,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupImplElementFrame, {
          "aria-orientation": orientation,
          orientation,
          axis: orientation,
          ref: forwardedRef,
          "data-disabled": disabled ? "" : void 0,
          unstyled,
          ...commonProps
        })
      }) : /* @__PURE__ */(0, import_jsx_runtime.jsx)(ToggleGroupImplElementFrame, {
        "aria-orientation": orientation,
        ref: forwardedRef,
        orientation,
        "data-disabled": disabled ? "" : void 0,
        unstyled,
        ...commonProps
      })
    });
  }));
//# sourceMappingURL=ToggleGroup.native.js.map
