import {
  isAndroid,
  isIos,
  isTouchable,
  isWeb,
  useIsomorphicLayoutEffect
} from "@tamagui/constants";
import { createStyledContext, useMedia } from "@tamagui/core";
import { withStaticProperties } from "@tamagui/helpers";
import { PortalHost, PortalItem } from "@tamagui/portal";
import { StackZIndexContext } from "@tamagui/z-index-stack";
import React, { createContext, useContext, useId, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
const AdaptContext = createStyledContext({
  Contents: null,
  scopeName: "",
  portalName: "",
  platform: null,
  setPlatform: (x) => {
  },
  when: null,
  setChildren: null,
  setWhen: () => {
  }
}), LastAdaptContextScope = createContext(""), ProvideAdaptContext = ({
  children,
  ...context
}) => {
  const scope = context.scopeName || "", lastScope = useContext(LastAdaptContextScope);
  return /* @__PURE__ */ jsx(LastAdaptContextScope.Provider, { value: lastScope || context.lastScope || "", children: /* @__PURE__ */ jsx(
    AdaptContext.Provider,
    {
      scope,
      lastScope: lastScope || context.lastScope,
      ...context,
      children
    }
  ) });
}, useAdaptContext = (scope) => {
  const lastScope = useContext(LastAdaptContextScope), adaptScope = scope ?? lastScope;
  return AdaptContext.useStyledContext(adaptScope);
}, AdaptPortals = /* @__PURE__ */ new Map(), AdaptParent = ({ children, Contents, scope, portal }) => {
  const id = useId(), portalName = `AdaptPortal${scope}${id}`, FinalContents = useMemo(() => {
    if (Contents)
      return Contents;
    if (AdaptPortals.has(portalName))
      return AdaptPortals.get(portalName);
    const element = () => /* @__PURE__ */ jsx(
      PortalHost,
      {
        name: portalName,
        forwardProps: typeof portal == "boolean" ? void 0 : portal?.forwardProps
      },
      id
    );
    return AdaptPortals.set(portalName, element), element;
  }, [portalName, Contents]);
  useIsomorphicLayoutEffect(() => (AdaptPortals.set(portalName, FinalContents), () => {
    AdaptPortals.delete(portalName);
  }), [portalName]);
  const [when, setWhen] = React.useState(null), [platform, setPlatform] = React.useState(null), [children2, setChildren] = React.useState(null);
  return /* @__PURE__ */ jsx(LastAdaptContextScope.Provider, { value: scope, children: /* @__PURE__ */ jsx(
    ProvideAdaptContext,
    {
      Contents: FinalContents,
      when,
      platform,
      setPlatform,
      setWhen,
      setChildren,
      portalName,
      scopeName: scope,
      children
    }
  ) });
}, AdaptContents = ({ scope, ...rest }) => {
  const context = useAdaptContext(scope);
  if (!context?.Contents)
    throw new Error(
      process.env.NODE_ENV === "production" ? "tamagui.dev/docs/intro/errors#warning-002" : "You're rendering a Tamagui <Adapt /> component without nesting it inside a parent that is able to adapt."
    );
  return React.createElement(context.Contents, { ...rest, key: "stable" });
};
AdaptContents.shouldForwardSpace = !0;
const Adapt = withStaticProperties(
  function(props) {
    const { platform, when, children, scope } = props, context = useAdaptContext(scope), enabled = useAdaptIsActiveGiven(props);
    useIsomorphicLayoutEffect(() => {
      context?.setWhen?.(when || enabled), context?.setPlatform?.(platform || null);
    }, [when, platform, enabled, context.setWhen, context.setPlatform]), useIsomorphicLayoutEffect(() => () => {
      context?.setWhen?.(null), context?.setPlatform?.(null);
    }, []);
    let output;
    if (typeof children == "function") {
      const Component = context?.Contents;
      output = children(Component ? /* @__PURE__ */ jsx(Component, {}) : null);
    } else
      output = children;
    return useIsomorphicLayoutEffect(() => {
      typeof children == "function" && output !== void 0 && context?.setChildren(output);
    }, [output]), /* @__PURE__ */ jsx(StackZIndexContext, { children: enabled ? output : null });
  },
  {
    Contents: AdaptContents
  }
), AdaptPortalContents = (props) => {
  const isActive = useAdaptIsActive(props.scope), { portalName } = useAdaptContext(props.scope);
  return /* @__PURE__ */ jsx(PortalItem, { passThrough: !isActive, hostName: portalName, children: props.children });
}, useAdaptIsActiveGiven = ({
  when,
  platform
}) => {
  const media = useMedia();
  if (when == null && platform == null)
    return !1;
  if (when === !0)
    return !0;
  let enabled = !1;
  return platform === "touch" ? enabled = isTouchable : platform === "native" ? enabled = !isWeb : platform === "web" ? enabled = isWeb : platform === "ios" ? enabled = isIos : platform === "android" && (enabled = isAndroid), platform && enabled == !1 ? !1 : (when && typeof when == "string" && (enabled = media[when]), enabled);
}, useAdaptIsActive = (scope) => {
  const props = useAdaptContext(scope);
  return useAdaptIsActiveGiven(props);
};
export {
  Adapt,
  AdaptContents,
  AdaptContext,
  AdaptParent,
  AdaptPortalContents,
  ProvideAdaptContext,
  useAdaptContext,
  useAdaptIsActive
};
//# sourceMappingURL=Adapt.js.map
