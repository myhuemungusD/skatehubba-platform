import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Theme } from "../views/Theme.native.js";
function themeable(Component, staticConfig) {
  var optimize = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1,
    withThemeComponent = /* @__PURE__ */React.forwardRef(function (props, ref) {
      var {
          themeInverse,
          theme,
          componentName,
          themeReset,
          ...rest
        } = props,
        overriddenContextProps,
        context = staticConfig?.context;
      if (context) for (var key in context.props) {
        var val = props[key];
        val !== void 0 && (overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = val);
      }
      var element =
        // @ts-expect-error its ok
        /* @__PURE__ */
        _jsx(Component, {
          ref,
          ...rest,
          "data-disable-theme": !0
        }),
        filteredProps = null,
        compName = componentName || staticConfig?.componentName;
      if (compName && (filteredProps || (filteredProps = {}), filteredProps.componentName = compName), "debug" in props && (filteredProps || (filteredProps = {}), filteredProps.debug = props.debug), "theme" in props && (filteredProps || (filteredProps = {}), filteredProps.name = props.theme), "themeInverse" in props && (filteredProps || (filteredProps = {}), filteredProps.inverse = props.themeInverse), "themeReset" in props && (filteredProps || (filteredProps = {}), filteredProps.reset = themeReset), optimize && !filteredProps) return element;
      var contents = /* @__PURE__ */_jsx(Theme, {
        "disable-child-theme": !0,
        ...filteredProps,
        children: element
      });
      if (context) {
        var Provider = context.Provider,
          contextValue = React.useContext(context);
        contents = /* @__PURE__ */_jsx(Provider, {
          ...contextValue,
          ...overriddenContextProps,
          children: contents
        });
      }
      return contents;
    }),
    withTheme = withThemeComponent;
  return withTheme.displayName = `Themed(${Component?.displayName || Component?.name || "Anonymous"})`, withTheme;
}
export { themeable };
//# sourceMappingURL=themeable.native.js.map
