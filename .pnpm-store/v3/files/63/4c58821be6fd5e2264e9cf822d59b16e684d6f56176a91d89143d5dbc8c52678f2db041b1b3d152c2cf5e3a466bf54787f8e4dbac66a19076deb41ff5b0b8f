import { isWeb } from "@tamagui/constants";
import React, { Children, cloneElement, forwardRef, isValidElement, useRef } from "react";
import { getSetting } from "../config.mjs";
import { variableToString } from "../createVariable.mjs";
import { useThemeWithState } from "../hooks/useTheme.mjs";
import { getThemeState, hasThemeUpdatingProps, ThemeStateContext } from "../hooks/useThemeState.mjs";
import { ThemeDebug } from "./ThemeDebug.mjs";
import { jsx } from "react/jsx-runtime";
const Theme = forwardRef(function (props, ref) {
  if (props.disable) return props.children;
  const {
      passThrough
    } = props,
    isRoot = !!props._isRoot,
    [_, themeState] = useThemeWithState(props, isRoot);
  let finalChildren = props["disable-child-theme"] ? Children.map(props.children, child => passThrough ? child : cloneElement(child, {
    "data-disable-theme": !0
  })) : props.children;
  if (ref) try {
    React.Children.only(finalChildren), finalChildren = cloneElement(finalChildren, {
      ref
    });
  } catch {}
  const stateRef = useRef({
    hasEverThemed: !1
  });
  return getThemedChildren(themeState, finalChildren, props, isRoot, stateRef, passThrough);
});
Theme.avoidForwardRef = !0;
function getThemedChildren(themeState, children, props, isRoot = !1, stateRef, passThrough = !1) {
  const {
      shallow,
      forceClassName
    } = props,
    state = stateRef.current;
  let shouldRenderChildrenWithTheme = state.hasEverThemed || themeState.isNew || isRoot || hasThemeUpdatingProps(props);
  if (process.env.NODE_ENV === "development" && props.debug === "visualize" && (children = /* @__PURE__ */jsx(ThemeDebug, {
    themeState,
    themeProps: props,
    children
  })), !shouldRenderChildrenWithTheme) return children;
  children = /* @__PURE__ */jsx(ThemeStateContext.Provider, {
    value: themeState.id,
    children
  });
  const {
      isInverse,
      name
    } = themeState,
    requiresExtraWrapper = isInverse || forceClassName;
  if (state.hasEverThemed || (state.hasEverThemed = !0), (requiresExtraWrapper ||
  // if the theme is exactly dark or light, its likely to change between dark/light
  // and that would require wrapping which would re-parent, so to avoid re-parenting do this
  themeState.name === "dark" || themeState.name === "light") && (state.hasEverThemed = "wrapped"), shallow && themeState.parentId) {
    const parentState = getThemeState(themeState.isNew ? themeState.id : themeState.parentId);
    if (!parentState) throw new Error("\u203C\uFE0F010");
    children = Children.toArray(children).map(child => isValidElement(child) ? passThrough ? child : cloneElement(child, void 0, /* @__PURE__ */jsx(Theme, {
      name: parentState.name,
      children: child.props.children
    })) : child);
  }
  if (process.env.NODE_ENV === "development" && !passThrough && props.debug && console.warn(" getThemedChildren", {
    requiresExtraWrapper,
    forceClassName,
    themeState,
    state,
    themeSpanProps: getThemeClassNameAndColor(themeState, props, isRoot)
  }), forceClassName === !1) return children;
  if (isWeb) {
    const baseStyle = props.contain ? inertContainedStyle : inertStyle,
      {
        className = "",
        color
      } = passThrough ? {} : getThemeClassNameAndColor(themeState, props, isRoot);
    if (children = /* @__PURE__ */jsx("span", {
      className: `${className} is_Theme`,
      style: passThrough ? baseStyle : {
        color,
        ...baseStyle
      },
      children
    }), state.hasEverThemed === "wrapped") {
      const className2 = !passThrough && requiresExtraWrapper ? `${isInverse ? name.startsWith("light") ? "t_light is_inversed" : name.startsWith("dark") ? "t_dark is_inversed" : "" : ""} ` : "";
      children = /* @__PURE__ */jsx("span", {
        style: baseStyle,
        className: className2,
        children
      });
    }
    return children;
  }
  return children;
}
const inertStyle = {
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
function getThemeClassNameAndColor(themeState, props, isRoot = !1) {
  if (!themeState.isNew && !props.forceClassName) return empty;
  const themeColor = themeState?.theme && themeState.isNew ? variableToString(themeState.theme.color) : "",
    maxInverses = getSetting("maxDarkLightNesting") || 3,
    themeClassName = themeState.inverses >= maxInverses ? themeState.name : themeState.name.replace(schemePrefix, ""),
    themeNameParts = themeClassName.split("_");
  let themeClasses = `t_${themeClassName}`;
  if (themeNameParts.length > 1) {
    const hierarchyClasses = [];
    for (let i = 1; i <= themeNameParts.length; i++) hierarchyClasses.push(`t_${themeNameParts.slice(0, i).join("_")}`);
    themeClasses = hierarchyClasses.join(" ");
  }
  const className = `${isRoot ? "" : "t_sub_theme"} ${themeClasses}`;
  return {
    color: themeColor,
    className
  };
}
const schemePrefix = /^(dark|light)_/;
export { Theme, getThemedChildren };
//# sourceMappingURL=Theme.mjs.map
