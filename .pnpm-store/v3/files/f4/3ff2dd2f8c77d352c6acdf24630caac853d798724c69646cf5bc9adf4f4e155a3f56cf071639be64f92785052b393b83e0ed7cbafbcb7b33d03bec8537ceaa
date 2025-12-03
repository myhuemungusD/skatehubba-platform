import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { composeRefs } from "@tamagui/compose-refs";
import { isWeb } from "@tamagui/constants";
import { composeEventHandlers } from "@tamagui/helpers";
import { Children, cloneElement, forwardRef, isValidElement, version, memo } from "react";
var is19 = version.startsWith("19."),
  Slot = /* @__PURE__ */memo(/* @__PURE__ */forwardRef(function (props, forwardedRef) {
    var {
      children,
      ...slotProps
    } = props;
    if (/* @__PURE__ */isValidElement(children)) {
      var mergedProps = mergeSlotProps(children, slotProps);
      return /* @__PURE__ */cloneElement(children, children.type.avoidForwardRef ? mergedProps : {
        ...mergedProps,
        ref: composeRefs(forwardedRef, is19 ? children.props.ref : children.ref)
      });
    }
    return Children.count(children) > 1 ? Children.only(null) : null;
  })),
  Slottable = function (param) {
    var {
      children
    } = param;
    return /* @__PURE__ */_jsx(_Fragment, {
      children
    });
  };
Slottable.displayName = "Slottable";
var pressMap = isWeb ? {
  onPress: "onClick",
  onPressOut: "onMouseUp",
  onPressIn: "onMouseDown"
} : {};
function mergeSlotProps(child, slotProps) {
  var childProps = child.props,
    overrideProps = {
      ...childProps
    },
    isHTMLChild = typeof child.type == "string";
  if (isHTMLChild) for (var key in pressMap) key in slotProps && (slotProps[pressMap[key]] = slotProps[key], delete slotProps[key]);
  for (var propName in childProps) {
    var slotPropValue = slotProps[propName],
      childPropValue = childProps[propName];
    isHTMLChild && propName in pressMap && (propName = pressMap[propName], delete overrideProps[propName]);
    var isHandler = handleRegex.test(propName);
    isHandler ? overrideProps[propName] = composeEventHandlers(childPropValue, slotPropValue) : propName === "style" ? overrideProps[propName] = {
      ...slotPropValue,
      ...childPropValue
    } : propName === "className" && (overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" "));
  }
  return {
    ...slotProps,
    ...overrideProps
  };
}
var handleRegex = /^on[A-Z]/;
export { Slot, Slottable };
//# sourceMappingURL=Slot.native.js.map
