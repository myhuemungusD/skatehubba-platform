import { jsx as _jsx } from "react/jsx-runtime";
import { Collapsible } from "@tamagui/collapsible";
import { createCollection } from "@tamagui/collection";
import { useComposedRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";
import { View, createStyledContext, styled } from "@tamagui/core";
import { composeEventHandlers, withStaticProperties } from "@tamagui/helpers";
import { YStack } from "@tamagui/stacks";
import { H1 } from "@tamagui/text";
import { useControllableState } from "@tamagui/use-controllable-state";
import { useDirection } from "@tamagui/use-direction";
import * as React from "react";
var ACCORDION_NAME = "Accordion",
  ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"],
  [Collection, useCollection] = createCollection(ACCORDION_NAME),
  ACCORDION_CONTEXT = "Accordion",
  AccordionComponent = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        type,
        ...accordionProps
      } = props,
      singleProps = accordionProps,
      multipleProps = accordionProps;
    return /* @__PURE__ */_jsx(Collection.Provider, {
      scope: props.__scopeAccordion || ACCORDION_CONTEXT,
      children: type === "multiple" ? /* @__PURE__ */_jsx(AccordionImplMultiple, {
        ...multipleProps,
        ref: forwardedRef
      }) : /* @__PURE__ */_jsx(AccordionImplSingle, {
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
  } = createStyledContext(),
  {
    Provider: AccordionCollapsibleProvider,
    useStyledContext: useAccordionCollapsibleContext
  } = createStyledContext(),
  AccordionImplSingle = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        value: valueProp,
        defaultValue,
        control,
        onValueChange = function () {},
        collapsible = !1,
        ...accordionSingleProps
      } = props,
      [value, setValue] = useControllableState({
        prop: valueProp,
        defaultProp: defaultValue || "",
        onChange: onValueChange
      });
    return /* @__PURE__ */_jsx(AccordionValueProvider, {
      scope: props.__scopeAccordion,
      value: value ? [value] : [],
      onItemOpen: setValue,
      onItemClose: React.useCallback(function () {
        return collapsible && setValue("");
      }, [setValue, collapsible]),
      children: /* @__PURE__ */_jsx(AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible,
        children: /* @__PURE__ */_jsx(AccordionImpl, {
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
      [value, setValue] = useControllableState({
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
    return /* @__PURE__ */_jsx(AccordionValueProvider, {
      scope: props.__scopeAccordion,
      value: value || [],
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */_jsx(AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible: !0,
        children: /* @__PURE__ */_jsx(AccordionImpl, {
          ...accordionMultipleProps,
          ref: forwardedRef
        })
      })
    });
  }),
  {
    Provider: AccordionImplProvider,
    useStyledContext: useAccordionContext
  } = createStyledContext(),
  AccordionImpl = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeAccordion,
        disabled,
        dir,
        orientation = "vertical",
        ...accordionProps
      } = props,
      accordionRef = React.useRef(null),
      composedRef = useComposedRefs(accordionRef, forwardedRef),
      getItems = useCollection(__scopeAccordion || ACCORDION_CONTEXT),
      direction = useDirection(dir),
      isDirectionLTR = direction === "ltr",
      handleKeyDown = composeEventHandlers(props.onKeyDown, function (event) {
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
    return /* @__PURE__ */_jsx(AccordionImplProvider, {
      scope: __scopeAccordion,
      disabled,
      direction: dir,
      orientation,
      children: /* @__PURE__ */_jsx(Collection.Slot, {
        scope: __scopeAccordion || ACCORDION_CONTEXT,
        children: /* @__PURE__ */_jsx(YStack, {
          "data-orientation": orientation,
          ref: composedRef,
          ...accordionProps,
          ...(isWeb && {
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
  } = createStyledContext(),
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
    return /* @__PURE__ */_jsx(AccordionItemProvider, {
      scope: __scopeAccordion,
      open,
      disabled,
      triggerId,
      children: /* @__PURE__ */_jsx(Collapsible, {
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
    return /* @__PURE__ */_jsx(H1, {
      "data-orientation": accordionContext.orientation,
      "data-state": getState(itemContext.open),
      "data-disabled": itemContext.disabled ? "" : void 0,
      ...headerProps,
      ref: forwardedRef
    });
  });
AccordionHeader.displayName = HEADER_NAME;
var AccordionTriggerFrame = styled(Collapsible.Trigger, {
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
    return /* @__PURE__ */_jsx(Collection.ItemSlot, {
      scope: __scopeAccordion || ACCORDION_CONTEXT,
      children: /* @__PURE__ */_jsx(AccordionTriggerFrame, {
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
  AccordionContentFrame = styled(Collapsible.Content, {
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
    return /* @__PURE__ */_jsx(AccordionContentFrame, {
      role: "region",
      "aria-labelledby": itemContext.triggerId,
      "data-orientation": accordionContext.orientation,
      // @ts-ignore
      __scopeCollapsible: __scopeAccordion || ACCORDION_CONTEXT,
      ...contentProps,
      ref: forwardedRef
    });
  }),
  HeightAnimator = View.styleable(function (props, ref) {
    var itemContext = useAccordionItemContext(),
      {
        children,
        ...rest
      } = props,
      [height, setHeight] = React.useState(0);
    return /* @__PURE__ */_jsx(View, {
      ref,
      height: itemContext.open ? height : 0,
      ...rest,
      children: /* @__PURE__ */_jsx(View, {
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
var Accordion = withStaticProperties(AccordionComponent, {
  Trigger: AccordionTrigger,
  Header: AccordionHeader,
  Content: AccordionContent,
  Item: AccordionItem,
  HeightAnimator
});
export { Accordion };
//# sourceMappingURL=Accordion.native.js.map
