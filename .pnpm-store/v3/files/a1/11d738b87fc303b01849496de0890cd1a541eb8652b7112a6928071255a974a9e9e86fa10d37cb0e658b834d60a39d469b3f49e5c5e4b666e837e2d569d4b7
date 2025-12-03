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
var Theme_exports = {};
__export(Theme_exports, {
  Theme: () => Theme,
  getThemedChildren: () => getThemedChildren
});
module.exports = __toCommonJS(Theme_exports);
var import_constants = require("@tamagui/constants"),
  import_react = __toESM(require("react"), 1),
  import_config = require("../config.cjs"),
  import_createVariable = require("../createVariable.cjs"),
  import_useTheme = require("../hooks/useTheme.cjs"),
  import_useThemeState = require("../hooks/useThemeState.cjs"),
  import_ThemeDebug = require("./ThemeDebug.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
const Theme = (0, import_react.forwardRef)(function (props, ref) {
  if (props.disable) return props.children;
  const {
      passThrough
    } = props,
    isRoot = !!props._isRoot,
    [_, themeState] = (0, import_useTheme.useThemeWithState)(props, isRoot);
  let finalChildren = props["disable-child-theme"] ? import_react.Children.map(props.children, child => passThrough ? child : (0, import_react.cloneElement)(child, {
    "data-disable-theme": !0
  })) : props.children;
  if (ref) try {
    import_react.default.Children.only(finalChildren), finalChildren = (0, import_react.cloneElement)(finalChildren, {
      ref
    });
  } catch {}
  const stateRef = (0, import_react.useRef)({
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
  let shouldRenderChildrenWithTheme = state.hasEverThemed || themeState.isNew || isRoot || (0, import_useThemeState.hasThemeUpdatingProps)(props);
  if (process.env.NODE_ENV === "development" && props.debug === "visualize" && (children = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_ThemeDebug.ThemeDebug, {
    themeState,
    themeProps: props,
    children
  })), !shouldRenderChildrenWithTheme) return children;
  children = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_useThemeState.ThemeStateContext.Provider, {
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
    const parentState = (0, import_useThemeState.getThemeState)(themeState.isNew ? themeState.id : themeState.parentId);
    if (!parentState) throw new Error("\u203C\uFE0F010");
    children = import_react.Children.toArray(children).map(child => (0, import_react.isValidElement)(child) ? passThrough ? child : (0, import_react.cloneElement)(child, void 0, /* @__PURE__ */(0, import_jsx_runtime.jsx)(Theme, {
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
  if (import_constants.isWeb) {
    const baseStyle = props.contain ? inertContainedStyle : inertStyle,
      {
        className = "",
        color
      } = passThrough ? {} : getThemeClassNameAndColor(themeState, props, isRoot);
    if (children = /* @__PURE__ */(0, import_jsx_runtime.jsx)("span", {
      className: `${className} is_Theme`,
      style: passThrough ? baseStyle : {
        color,
        ...baseStyle
      },
      children
    }), state.hasEverThemed === "wrapped") {
      const className2 = !passThrough && requiresExtraWrapper ? `${isInverse ? name.startsWith("light") ? "t_light is_inversed" : name.startsWith("dark") ? "t_dark is_inversed" : "" : ""} ` : "";
      children = /* @__PURE__ */(0, import_jsx_runtime.jsx)("span", {
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
  const themeColor = themeState?.theme && themeState.isNew ? (0, import_createVariable.variableToString)(themeState.theme.color) : "",
    maxInverses = (0, import_config.getSetting)("maxDarkLightNesting") || 3,
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