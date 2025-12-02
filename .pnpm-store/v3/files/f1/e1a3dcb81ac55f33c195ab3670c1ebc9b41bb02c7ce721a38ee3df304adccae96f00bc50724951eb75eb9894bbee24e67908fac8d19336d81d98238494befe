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
var Accordion_exports = {};
__export(Accordion_exports, {
  Accordion: () => Accordion
});
module.exports = __toCommonJS(Accordion_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_collapsible = require("@tamagui/collapsible"),
  import_collection = require("@tamagui/collection"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_core = require("@tamagui/core"),
  import_helpers = require("@tamagui/helpers"),
  import_stacks = require("@tamagui/stacks"),
  import_text = require("@tamagui/text"),
  import_use_controllable_state = require("@tamagui/use-controllable-state"),
  import_use_direction = require("@tamagui/use-direction"),
  React = __toESM(require("react"), 1),
  ACCORDION_NAME = "Accordion",
  ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
  [Collection, useCollection] = (0, import_collection.createCollection)(ACCORDION_NAME),
  ACCORDION_CONTEXT = "Accordion",
  AccordionComponent = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        type,
        ...accordionProps
      } = props,
      singleProps = accordionProps,
      multipleProps = accordionProps;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Collection.Provider, {
      scope: props.__scopeAccordion || ACCORDION_CONTEXT,
      children: type === "multiple" ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionImplMultiple, {
        ...multipleProps,
        ref: forwardedRef
      }) : /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionImplSingle, {
        ...singleProps,
        ref: forwardedRef
      })
    });
  });
AccordionComponent.displayName = ACCORDION_NAME;
AccordionComponent.propTypes = {
  type(props) {
    var value = props.value || props.defaultValue;
    return props.type && !["single", "multiple"].includes(props.type) ? new Error("Invalid prop `type` supplied to `Accordion`. Expected one of `single | multiple`.") : props.type === "multiple" && typeof value == "string" ? new Error("Invalid prop `type` supplied to `Accordion`. Expected `single` when `defaultValue` or `value` is type `string`.") : props.type === "single" && Array.isArray(value) ? new Error("Invalid prop `type` supplied to `Accordion`. Expected `multiple` when `defaultValue` or `value` is type `string[]`.") : null;
  }
};
var {
    Provider: AccordionValueProvider,
    useStyledContext: useAccordionValueContext
  } = (0, import_core.createStyledContext)(),
  {
    Provider: AccordionCollapsibleProvider,
    useStyledContext: useAccordionCollapsibleContext
  } = (0, import_core.createStyledContext)(),
  AccordionImplSingle = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        value: valueProp,
        defaultValue,
        control,
        onValueChange = function () {},
        collapsible = !1,
        ...accordionSingleProps
      } = props,
      [value, setValue] = (0, import_use_controllable_state.useControllableState)({
        prop: valueProp,
        defaultProp: defaultValue || "",
        onChange: onValueChange
      });
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionValueProvider, {
      scope: props.__scopeAccordion,
      value: value ? [value] : [],
      onItemOpen: setValue,
      onItemClose: React.useCallback(function () {
        return collapsible && setValue("");
      }, [setValue, collapsible]),
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionImpl, {
          ...accordionSingleProps,
          ref: forwardedRef
        })
      })
    });
  }),
  AccordionImplMultiple = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        value: valueProp,
        defaultValue,
        onValueChange = function () {},
        ...accordionMultipleProps
      } = props,
      [value, setValue] = (0, import_use_controllable_state.useControllableState)({
        prop: valueProp,
        defaultProp: defaultValue || [],
        onChange: onValueChange
      }),
      handleItemOpen = React.useCallback(function (itemValue) {
        return setValue(function () {
          var prevValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
          return [...prevValue, itemValue];
        });
      }, [setValue]),
      handleItemClose = React.useCallback(function (itemValue) {
        return setValue(function () {
          var prevValue = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
          return prevValue.filter(function (value2) {
            return value2 !== itemValue;
          });
        });
      }, [setValue]);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionValueProvider, {
      scope: props.__scopeAccordion,
      value: value || [],
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible: !0,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionImpl, {
          ...accordionMultipleProps,
          ref: forwardedRef
        })
      })
    });
  }),
  {
    Provider: AccordionImplProvider,
    useStyledContext: useAccordionContext
  } = (0, import_core.createStyledContext)(),
  AccordionImpl = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeAccordion,
        disabled,
        dir,
        orientation = "vertical",
        ...accordionProps
      } = props,
      accordionRef = React.useRef(null),
      composedRef = (0, import_compose_refs.useComposedRefs)(accordionRef, forwardedRef),
      getItems = useCollection(__scopeAccordion || ACCORDION_CONTEXT),
      direction = (0, import_use_direction.useDirection)(dir),
      isDirectionLTR = direction === "ltr",
      handleKeyDown = (0, import_helpers.composeEventHandlers)(props.onKeyDown, function (event) {
        var _triggerCollection_clampedIndex_ref_current;
        if (ACCORDION_KEYS.includes(event.key)) {
          var target = event.target,
            triggerCollection = getItems().filter(function (item) {
              var el = item.ref.current;
              return !el?.disabled;
            }),
            triggerIndex = triggerCollection.findIndex(function (item) {
              return item.ref.current === target;
            }),
            triggerCount = triggerCollection.length;
          if (triggerIndex !== -1) {
            event.preventDefault();
            var nextIndex = triggerIndex,
              homeIndex = 0,
              endIndex = triggerCount - 1,
              moveNext = function () {
                nextIndex = triggerIndex + 1, nextIndex > endIndex && (nextIndex = homeIndex);
              },
              movePrev = function () {
                nextIndex = triggerIndex - 1, nextIndex < homeIndex && (nextIndex = endIndex);
              };
            switch (event.key) {
              case "Home":
                nextIndex = homeIndex;
                break;
              case "End":
                nextIndex = endIndex;
                break;
              case "ArrowRight":
                orientation === "horizontal" && (isDirectionLTR ? moveNext() : movePrev());
                break;
              case "ArrowDown":
                orientation === "vertical" && moveNext();
                break;
              case "ArrowLeft":
                orientation === "horizontal" && (isDirectionLTR ? movePrev() : moveNext());
                break;
              case "ArrowUp":
                orientation === "vertical" && movePrev();
                break;
            }
            var clampedIndex = nextIndex % triggerCount;
            (_triggerCollection_clampedIndex_ref_current = triggerCollection[clampedIndex].ref.current) === null || _triggerCollection_clampedIndex_ref_current === void 0 || _triggerCollection_clampedIndex_ref_current.focus();
          }
        }
      });
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionImplProvider, {
      scope: __scopeAccordion,
      disabled,
      direction: dir,
      orientation,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(Collection.Slot, {
        scope: __scopeAccordion || ACCORDION_CONTEXT,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_stacks.YStack, {
          "data-orientation": orientation,
          ref: composedRef,
          ...accordionProps,
          ...(import_constants.isWeb && {
            onKeyDown: handleKeyDown
          })
        })
      })
    });
  }),
  ITEM_NAME = "AccordionItem",
  {
    Provider: AccordionItemProvider,
    useStyledContext: useAccordionItemContext
  } = (0, import_core.createStyledContext)(),
  AccordionItem = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeAccordion,
        value,
        ...accordionItemProps
      } = props,
      accordionContext = useAccordionContext(__scopeAccordion),
      valueContext = useAccordionValueContext(__scopeAccordion),
      triggerId = React.useId(),
      open = value && valueContext.value.includes(value) || !1,
      disabled = accordionContext.disabled || props.disabled;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionItemProvider, {
      scope: __scopeAccordion,
      open,
      disabled,
      triggerId,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_collapsible.Collapsible, {
        "data-orientation": accordionContext.orientation,
        "data-state": open ? "open" : "closed",
        __scopeCollapsible: __scopeAccordion || ACCORDION_CONTEXT,
        ...accordionItemProps,
        ref: forwardedRef,
        disabled,
        open,
        onOpenChange: function (open2) {
          open2 ? valueContext.onItemOpen(value) : valueContext.onItemClose(value);
        }
      })
    });
  });
AccordionItem.displayName = ITEM_NAME;
var HEADER_NAME = "AccordionHeader",
  AccordionHeader = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeAccordion,
        ...headerProps
      } = props,
      accordionContext = useAccordionContext(__scopeAccordion),
      itemContext = useAccordionItemContext(__scopeAccordion);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_text.H1, {
      "data-orientation": accordionContext.orientation,
      "data-state": getState(itemContext.open),
      "data-disabled": itemContext.disabled ? "" : void 0,
      ...headerProps,
      ref: forwardedRef
    });
  });
AccordionHeader.displayName = HEADER_NAME;
var AccordionTriggerFrame = (0, import_core.styled)(import_collapsible.Collapsible.Trigger, {
    variants: {
      unstyled: {
        false: {
          cursor: "pointer",
          backgroundColor: "$background",
          borderColor: "$borderColor",
          borderWidth: 1,
          padding: "$true",
          hoverStyle: {
            backgroundColor: "$backgroundHover"
          },
          focusStyle: {
            backgroundColor: "$backgroundFocus"
          },
          pressStyle: {
            backgroundColor: "$backgroundPress"
          }
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  AccordionTrigger = AccordionTriggerFrame.styleable(function (props, forwardedRef) {
    var {
        __scopeAccordion,
        ...triggerProps
      } = props,
      accordionContext = useAccordionContext(__scopeAccordion),
      itemContext = useAccordionItemContext(__scopeAccordion),
      collapsibleContext = useAccordionCollapsibleContext(__scopeAccordion);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
      scope: __scopeAccordion || ACCORDION_CONTEXT,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionTriggerFrame, {
        //   @ts-ignore
        __scopeCollapsible: __scopeAccordion || ACCORDION_CONTEXT,
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId,
        ...triggerProps,
        ref: forwardedRef
      })
    });
  }),
  AccordionContentFrame = (0, import_core.styled)(import_collapsible.Collapsible.Content, {
    variants: {
      unstyled: {
        false: {
          padding: "$true",
          backgroundColor: "$background"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  AccordionContent = AccordionContentFrame.styleable(function (props, forwardedRef) {
    var {
        __scopeAccordion,
        ...contentProps
      } = props,
      accordionContext = useAccordionContext(__scopeAccordion),
      itemContext = useAccordionItemContext(__scopeAccordion);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(AccordionContentFrame, {
      role: "region",
      "aria-labelledby": itemContext.triggerId,
      "data-orientation": accordionContext.orientation,
      // @ts-ignore
      __scopeCollapsible: __scopeAccordion || ACCORDION_CONTEXT,
      ...contentProps,
      ref: forwardedRef
    });
  }),
  HeightAnimator = import_core.View.styleable(function (props, ref) {
    var itemContext = useAccordionItemContext(),
      {
        children,
        ...rest
      } = props,
      [height, setHeight] = React.useState(0);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.View, {
      ref,
      height: itemContext.open ? height : 0,
      ...rest,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_core.View, {
        position: "absolute",
        width: "100%",
        onLayout: function (param) {
          var {
            nativeEvent
          } = param;
          nativeEvent.layout.height && setHeight(nativeEvent.layout.height);
        },
        children
      })
    });
  });
function getState(open) {
  return open ? "open" : "closed";
}
var Accordion = (0, import_helpers.withStaticProperties)(AccordionComponent, {
  Trigger: AccordionTrigger,
  Header: AccordionHeader,
  Content: AccordionContent,
  Item: AccordionItem,
  HeightAnimator
});
//# sourceMappingURL=Accordion.native.js.map
