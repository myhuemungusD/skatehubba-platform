"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var Slot_exports = {};
__export(Slot_exports, {
  Slot: () => Slot,
  Slottable: () => Slottable
});
module.exports = __toCommonJS(Slot_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_helpers = require("@tamagui/helpers"),
  import_react = require("react"),
  is19 = import_react.version.startsWith("19."),
  Slot = /* @__PURE__ */(0, import_react.memo)(/* @__PURE__ */(0, import_react.forwardRef)(function (props, forwardedRef) {
    var {
      children,
      ...slotProps
    } = props;
    if (/* @__PURE__ */(0, import_react.isValidElement)(children)) {
      var mergedProps = mergeSlotProps(children, slotProps);
      return /* @__PURE__ */(0, import_react.cloneElement)(children, children.type.avoidForwardRef ? mergedProps : {
        ...mergedProps,
        ref: (0, import_compose_refs.composeRefs)(forwardedRef, is19 ? children.props.ref : children.ref)
      });
    }
    return import_react.Children.count(children) > 1 ? import_react.Children.only(null) : null;
  })),
  Slottable = function (param) {
    var {
      children
    } = param;
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
      children
    });
  };
Slottable.displayName = "Slottable";
var pressMap = import_constants.isWeb ? {
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
    isHandler ? overrideProps[propName] = (0, import_helpers.composeEventHandlers)(childPropValue, slotPropValue) : propName === "style" ? overrideProps[propName] = {
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
//# sourceMappingURL=Slot.native.js.map
