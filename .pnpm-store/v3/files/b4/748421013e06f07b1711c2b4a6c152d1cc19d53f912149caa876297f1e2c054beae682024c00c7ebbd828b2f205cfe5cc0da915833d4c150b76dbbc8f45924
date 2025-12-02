import { jsx as _jsx } from "react/jsx-runtime";
import { isAndroid, isIos, isTouchable, isWeb, useIsomorphicLayoutEffect } from "@tamagui/constants";
import { createStyledContext, useMedia } from "@tamagui/core";
import { withStaticProperties } from "@tamagui/helpers";
import { PortalHost, PortalItem } from "@tamagui/portal";
import { StackZIndexContext } from "@tamagui/z-index-stack";
import React, { createContext, useContext, useId, useMemo } from "react";
var AdaptContext = createStyledContext({
    Contents: null,
    scopeName: "",
    portalName: "",
    platform: null,
    setPlatform: function (x) {},
    when: null,
    setChildren: null,
    setWhen: function () {}
  }),
  LastAdaptContextScope = /* @__PURE__ */createContext(""),
  ProvideAdaptContext = function (param) {
    var {
        children,
        ...context
      } = param,
      scope = context.scopeName || "",
      lastScope = useContext(LastAdaptContextScope);
    return /* @__PURE__ */_jsx(LastAdaptContextScope.Provider, {
      value: lastScope || context.lastScope || "",
      children: /* @__PURE__ */_jsx(AdaptContext.Provider, {
        scope,
        lastScope: lastScope || context.lastScope,
        ...context,
        children
      })
    });
  },
  useAdaptContext = function (scope) {
    var lastScope = useContext(LastAdaptContextScope),
      adaptScope = scope ?? lastScope;
    return AdaptContext.useStyledContext(adaptScope);
  },
  AdaptPortals = /* @__PURE__ */new Map(),
  AdaptParent = function (param) {
    var {
        children,
        Contents,
        scope,
        portal
      } = param,
      id = useId(),
      portalName = `AdaptPortal${scope}${id}`,
      FinalContents = useMemo(function () {
        if (Contents) return Contents;
        if (AdaptPortals.has(portalName)) return AdaptPortals.get(portalName);
        var element = function () {
          return /* @__PURE__ */_jsx(PortalHost, {
            name: portalName,
            forwardProps: typeof portal == "boolean" ? void 0 : portal?.forwardProps
          }, id);
        };
        return AdaptPortals.set(portalName, element), element;
      }, [portalName, Contents]);
    useIsomorphicLayoutEffect(function () {
      return AdaptPortals.set(portalName, FinalContents), function () {
        AdaptPortals.delete(portalName);
      };
    }, [portalName]);
    var [when, setWhen] = React.useState(null),
      [platform, setPlatform] = React.useState(null),
      [children2, setChildren] = React.useState(null);
    return /* @__PURE__ */_jsx(LastAdaptContextScope.Provider, {
      value: scope,
      children: /* @__PURE__ */_jsx(ProvideAdaptContext, {
        Contents: FinalContents,
        when,
        platform,
        setPlatform,
        setWhen,
        setChildren,
        portalName,
        scopeName: scope,
        children
      })
    });
  },
  AdaptContents = function (param) {
    var {
        scope,
        ...rest
      } = param,
      context = useAdaptContext(scope);
    if (!context?.Contents) throw new Error(process.env.NODE_ENV === "production" ? "tamagui.dev/docs/intro/errors#warning-002" : "You're rendering a Tamagui <Adapt /> component without nesting it inside a parent that is able to adapt.");
    return /* @__PURE__ */React.createElement(context.Contents, {
      ...rest,
      key: "stable"
    });
  };
AdaptContents.shouldForwardSpace = !0;
var Adapt = withStaticProperties(function (props) {
    var {
        platform,
        when,
        children,
        scope
      } = props,
      context = useAdaptContext(scope),
      enabled = useAdaptIsActiveGiven(props);
    useIsomorphicLayoutEffect(function () {
      var _context_setWhen, _context_setPlatform;
      context == null || (_context_setWhen = context.setWhen) === null || _context_setWhen === void 0 || _context_setWhen.call(context, when || enabled), context == null || (_context_setPlatform = context.setPlatform) === null || _context_setPlatform === void 0 || _context_setPlatform.call(context, platform || null);
    }, [when, platform, enabled, context.setWhen, context.setPlatform]), useIsomorphicLayoutEffect(function () {
      return function () {
        var _context_setWhen, _context_setPlatform;
        context == null || (_context_setWhen = context.setWhen) === null || _context_setWhen === void 0 || _context_setWhen.call(context, null), context == null || (_context_setPlatform = context.setPlatform) === null || _context_setPlatform === void 0 || _context_setPlatform.call(context, null);
      };
    }, []);
    var output;
    if (typeof children == "function") {
      var Component = context?.Contents;
      output = children(Component ? /* @__PURE__ */_jsx(Component, {}) : null);
    } else output = children;
    return useIsomorphicLayoutEffect(function () {
      typeof children == "function" && output !== void 0 && context?.setChildren(output);
    }, [output]), /* @__PURE__ */_jsx(StackZIndexContext, {
      children: enabled ? output : null
    });
  }, {
    Contents: AdaptContents
  }),
  AdaptPortalContents = function (props) {
    var isActive = useAdaptIsActive(props.scope),
      {
        portalName
      } = useAdaptContext(props.scope);
    return /* @__PURE__ */_jsx(PortalItem, {
      passThrough: !isActive,
      hostName: portalName,
      children: props.children
    });
  },
  useAdaptIsActiveGiven = function (param) {
    var {
        when,
        platform
      } = param,
      media = useMedia();
    if (when == null && platform == null) return !1;
    if (when === !0) return !0;
    var enabled = !1;
    return platform === "touch" ? enabled = isTouchable : platform === "native" ? enabled = !isWeb : platform === "web" ? enabled = isWeb : platform === "ios" ? enabled = isIos : platform === "android" && (enabled = isAndroid), platform && enabled == !1 ? !1 : (when && typeof when == "string" && (enabled = media[when]), enabled);
  },
  useAdaptIsActive = function (scope) {
    var props = useAdaptContext(scope);
    return useAdaptIsActiveGiven(props);
  };
export { Adapt, AdaptContents, AdaptContext, AdaptParent, AdaptPortalContents, ProvideAdaptContext, useAdaptContext, useAdaptIsActive };
//# sourceMappingURL=Adapt.native.js.map
