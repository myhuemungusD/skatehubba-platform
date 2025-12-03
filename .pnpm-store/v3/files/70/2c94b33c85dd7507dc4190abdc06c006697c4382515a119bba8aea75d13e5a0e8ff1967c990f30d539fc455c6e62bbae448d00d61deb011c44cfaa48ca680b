import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext } from "react";
import { mergeProps } from "./mergeProps.native.js";
import { objectIdentityKey } from "./objectIdentityKey.native.js";
var createReactContext = React[Math.random(), "createContext"];
function createStyledContext(defaultValues) {
  var namespace = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "",
    OGContext = createReactContext(defaultValues),
    OGProvider = OGContext.Provider,
    Context = OGContext,
    scopedContexts = /* @__PURE__ */new Map(),
    LastScopeInNamespace = createReactContext(namespace);
  function getOrCreateScopedContext(scope) {
    var ScopedContext = scopedContexts.get(scope);
    return ScopedContext || (ScopedContext = createReactContext(defaultValues), scopedContexts.set(scope, ScopedContext)), ScopedContext;
  }
  var getNamespacedScope = function (scope) {
      return namespace ? `${namespace}--${scope}` : scope;
    },
    Provider = function (param) {
      var {
          children,
          scope: scopeIn,
          // performance: avoid creating objects
          __disableMergeDefaultValues,
          ...values
        } = param,
        scope = getNamespacedScope(scopeIn),
        next = React.useMemo(function () {
          return __disableMergeDefaultValues ? values : mergeProps(defaultValues, values);
        }, [objectIdentityKey(values)]),
        ScopedProvider = OGProvider;
      return scope && (ScopedProvider = getOrCreateScopedContext(scope).Provider), /* @__PURE__ */_jsx(LastScopeInNamespace.Provider, {
        value: scope,
        children: /* @__PURE__ */_jsx(ScopedProvider, {
          value: next,
          children
        })
      });
    },
    useStyledContext = function () {
      var scopeIn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "",
        lastScopeInNamespace = useContext(LastScopeInNamespace),
        scope = namespace ? scopeIn ? getNamespacedScope(scopeIn) : lastScopeInNamespace : scopeIn,
        context = scope ? getOrCreateScopedContext(scope) : OGContext,
        value = React.useContext(context);
      return value;
    };
  return Context.Provider = Provider, Context.props = defaultValues, Context.context = OGContext, Context.useStyledContext = useStyledContext, Context;
}
export { createStyledContext };
//# sourceMappingURL=createStyledContext.native.js.map
