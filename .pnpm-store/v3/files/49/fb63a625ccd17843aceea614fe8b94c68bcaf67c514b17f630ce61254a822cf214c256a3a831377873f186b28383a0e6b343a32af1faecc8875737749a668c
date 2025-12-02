import React, { useContext } from "react";
import { mergeProps } from "./mergeProps";
import { objectIdentityKey } from "./objectIdentityKey";
import { jsx } from "react/jsx-runtime";
const createReactContext = React[Math.random(), "createContext"];
function createStyledContext(defaultValues, namespace = "") {
  const OGContext = createReactContext(defaultValues), OGProvider = OGContext.Provider, Context = OGContext, scopedContexts = /* @__PURE__ */ new Map(), LastScopeInNamespace = createReactContext(namespace);
  function getOrCreateScopedContext(scope) {
    let ScopedContext = scopedContexts.get(scope);
    return ScopedContext || (ScopedContext = createReactContext(defaultValues), scopedContexts.set(scope, ScopedContext)), ScopedContext;
  }
  const getNamespacedScope = (scope) => namespace ? `${namespace}--${scope}` : scope, Provider = ({
    children,
    scope: scopeIn,
    // performance: avoid creating objects
    __disableMergeDefaultValues,
    ...values
  }) => {
    const scope = getNamespacedScope(scopeIn), next = React.useMemo(() => __disableMergeDefaultValues ? values : mergeProps(defaultValues, values), [objectIdentityKey(values)]);
    let ScopedProvider = OGProvider;
    return scope && (ScopedProvider = getOrCreateScopedContext(scope).Provider), /* @__PURE__ */ jsx(LastScopeInNamespace.Provider, { value: scope, children: /* @__PURE__ */ jsx(ScopedProvider, { value: next, children }) });
  }, useStyledContext = (scopeIn = "") => {
    const lastScopeInNamespace = useContext(LastScopeInNamespace), scope = namespace ? scopeIn ? getNamespacedScope(scopeIn) : lastScopeInNamespace : scopeIn, context = scope ? getOrCreateScopedContext(scope) : OGContext;
    return React.useContext(context);
  };
  return Context.Provider = Provider, Context.props = defaultValues, Context.context = OGContext, Context.useStyledContext = useStyledContext, Context;
}
export {
  createStyledContext
};
//# sourceMappingURL=createStyledContext.js.map
