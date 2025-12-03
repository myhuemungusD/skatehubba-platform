import { jsx as _jsx } from "react/jsx-runtime";
import { isWeb } from "@tamagui/constants";
import React, { Children, cloneElement, forwardRef, isValidElement, useRef } from "react";
import { getSetting } from "../config.native.js";
import { variableToString } from "../createVariable.native.js";
import { useThemeWithState } from "../hooks/useTheme.native.js";
import { getThemeState, hasThemeUpdatingProps, ThemeStateContext } from "../hooks/useThemeState.native.js";
import { ThemeDebug } from "./ThemeDebug.native.js";
var Theme = /* @__PURE__ */forwardRef(function (props, ref) {
  if (props.disable) return props.children;
  var {
      passThrough
    } = props,
    isRoot = !!props._isRoot,
    [_, themeState] = useThemeWithState(props, isRoot),
    disableDirectChildTheme = props["disable-child-theme"],
    finalChildren = disableDirectChildTheme ? Children.map(props.children, function (child) {
      return passThrough ? child : /* @__PURE__ */cloneElement(child, {
        "data-disable-theme": !0
      });
    }) : props.children;
  if (ref) try {
    React.Children.only(finalChildren), finalChildren = /* @__PURE__ */cloneElement(finalChildren, {
      ref
    });
  } catch {}
  var stateRef = useRef({
    hasEverThemed: !1
  });
  return getThemedChildren(themeState, finalChildren, props, isRoot, stateRef, passThrough);
});
Theme.avoidForwardRef = !0;
function getThemedChildren(themeState, children, props) {
  var isRoot = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1,
    stateRef = arguments.length > 4 ? arguments[4] : void 0,
    passThrough = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !1,
    {
      shallow,
      forceClassName
    } = props,
    state = stateRef.current,
    hasEverThemed = state.hasEverThemed,
    shouldRenderChildrenWithTheme = hasEverThemed || themeState.isNew || isRoot || hasThemeUpdatingProps(props);
  if (process.env.NODE_ENV === "development" && props.debug === "visualize" && (children = /* @__PURE__ */_jsx(ThemeDebug, {
    themeState,
    themeProps: props,
    children
  })), !shouldRenderChildrenWithTheme) return children;
  children = /* @__PURE__ */_jsx(ThemeStateContext.Provider, {
    value: themeState.id,
    children
  });
  var {
      isInverse,
      name
    } = themeState,
    requiresExtraWrapper = isInverse || forceClassName;
  if (state.hasEverThemed || (state.hasEverThemed = !0), (requiresExtraWrapper ||
  // if the theme is exactly dark or light, its likely to change between dark/light
  // and that would require wrapping which would re-parent, so to avoid re-parenting do this
  themeState.name === "dark" || themeState.name === "light") && (state.hasEverThemed = "wrapped"), shallow && themeState.parentId) {
    var parentState = getThemeState(themeState.isNew ? themeState.id : themeState.parentId);
    if (!parentState) throw new Error("\u203C\uFE0F010");
    children = Children.toArray(children).map(function (child) {
      return /* @__PURE__ */isValidElement(child) ? passThrough ? child : /* @__PURE__ */cloneElement(child, void 0, /* @__PURE__ */_jsx(Theme, {
        name: parentState.name,
        children: child.props.children
      })) : child;
    });
  }
  if (process.env.NODE_ENV === "development" && !passThrough && props.debug && console.warn(" getThemedChildren", {
    requiresExtraWrapper,
    forceClassName,
    themeState,
    state,
    themeSpanProps: getThemeClassNameAndColor(themeState, props, isRoot)
  }), forceClassName === !1) return children;
  if (isWeb) {
    var baseStyle = props.contain ? inertContainedStyle : inertStyle,
      {
        className = "",
        color
      } = passThrough ? {} : getThemeClassNameAndColor(themeState, props, isRoot);
    if (children = /* @__PURE__ */_jsx("span", {
      className: `${className} is_Theme`,
      style: passThrough ? baseStyle : {
        color,
        ...baseStyle
      },
      children
    }), state.hasEverThemed === "wrapped") {
      var className1 = !passThrough && requiresExtraWrapper ? `${isInverse ? name.startsWith("light") ? "t_light is_inversed" : name.startsWith("dark") ? "t_dark is_inversed" : "" : ""} ` : "";
      children = /* @__PURE__ */_jsx("span", {
        style: baseStyle,
        className: className1,
        children
      });
    }
    return children;
  }
  return children;
}
var inertStyle = {
    display: "contents"
  },
  inertContainedStyle = {
    display: "contents",
    contain: "strict"
  },
  empty = {
    className: "",
    color: void 0
  };
function getThemeClassNameAndColor(themeState, props) {
  var isRoot = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  if (!themeState.isNew && !props.forceClassName) return empty;
  var themeColor = themeState?.theme && themeState.isNew ? variableToString(themeState.theme.color) : "",
    maxInverses = getSetting("maxDarkLightNesting") || 3,
    themeClassName = themeState.inverses >= maxInverses ? themeState.name : themeState.name.replace(schemePrefix, ""),
    themeNameParts = themeClassName.split("_"),
    themeClasses = `t_${themeClassName}`;
  if (themeNameParts.length > 1) {
    for (var hierarchyClasses = [], i = 1; i <= themeNameParts.length; i++) hierarchyClasses.push(`t_${themeNameParts.slice(0, i).join("_")}`);
    themeClasses = hierarchyClasses.join(" ");
  }
  var className = `${isRoot ? "" : "t_sub_theme"} ${themeClasses}`;
  return {
    color: themeColor,
    className
  };
}
var schemePrefix = /^(dark|light)_/;
export { Theme, getThemedChildren };
//# sourceMappingURL=Theme.native.js.map
