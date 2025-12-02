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
var themeable_exports = {};
__export(themeable_exports, {
  themeable: () => themeable
});
module.exports = __toCommonJS(themeable_exports);
var import_react = __toESM(require("react"), 1),
  import_Theme = require("../views/Theme.cjs"),
  import_jsx_runtime =
  // @ts-expect-error its ok
  require("react/jsx-runtime");
function themeable(Component, staticConfig, optimize = !1) {
  const withTheme = import_react.default.forwardRef(function (props, ref) {
    const {
      themeInverse,
      theme,
      componentName,
      themeReset,
      ...rest
    } = props;
    let overriddenContextProps;
    const context = staticConfig?.context;
    if (context) for (const key in context.props) {
      const val = props[key];
      val !== void 0 && (overriddenContextProps ||= {}, overriddenContextProps[key] = val);
    }
    const element = /* @__PURE__ */(0, import_jsx_runtime.jsx)(Component, {
      ref,
      ...rest,
      "data-disable-theme": !0
    });
    let filteredProps = null;
    const compName = componentName || staticConfig?.componentName;
    if (compName && (filteredProps ||= {}, filteredProps.componentName = compName), "debug" in props && (filteredProps ||= {}, filteredProps.debug = props.debug), "theme" in props && (filteredProps ||= {}, filteredProps.name = props.theme), "themeInverse" in props && (filteredProps ||= {}, filteredProps.inverse = props.themeInverse), "themeReset" in props && (filteredProps ||= {}, filteredProps.reset = themeReset), optimize && !filteredProps) return element;
    let contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_Theme.Theme, {
      "disable-child-theme": !0,
      ...filteredProps,
      children: element
    });
    if (context) {
      const Provider = context.Provider,
        contextValue = import_react.default.useContext(context);
      contents = /* @__PURE__ */(0, import_jsx_runtime.jsx)(Provider, {
        ...contextValue,
        ...overriddenContextProps,
        children: contents
      });
    }
    return contents;
  });
  return withTheme.displayName = `Themed(${Component?.displayName || Component?.name || "Anonymous"})`, withTheme;
}