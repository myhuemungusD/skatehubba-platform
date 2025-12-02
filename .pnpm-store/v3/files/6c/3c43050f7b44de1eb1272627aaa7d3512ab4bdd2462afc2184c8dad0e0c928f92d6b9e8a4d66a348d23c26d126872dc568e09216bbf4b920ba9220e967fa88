import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
function createContext(rootComponentName, defaultContext) {
  var Context = /* @__PURE__ */React.createContext(defaultContext);
  function Provider(props) {
    var {
        children,
        ...context
      } = props,
      value = React.useMemo(function () {
        return context;
      }, Object.values(context));
    return /* @__PURE__ */_jsx(Context.Provider, {
      value,
      children
    });
  }
  function useContext(consumerName) {
    var context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  return [Provider, useContext];
}
function createContextScope(scopeName) {
  var createContextScopeDeps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [],
    defaultContexts = [];
  function createContext2(rootComponentName, defaultContext) {
    var BaseContext = /* @__PURE__ */React.createContext(defaultContext),
      index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    function Provider(props) {
      var _scope_scopeName,
        {
          scope,
          children,
          ...context
        } = props,
        Context = (scope == null || (_scope_scopeName = scope[scopeName]) === null || _scope_scopeName === void 0 ? void 0 : _scope_scopeName[index]) || BaseContext,
        value = React.useMemo(function () {
          return context;
        }, Object.values(context));
      return /* @__PURE__ */_jsx(Context.Provider, {
        value,
        children
      });
    }
    function useContext(consumerName, scope, options) {
      var _scope_scopeName,
        Context = (scope == null || (_scope_scopeName = scope[scopeName]) === null || _scope_scopeName === void 0 ? void 0 : _scope_scopeName[index]) || BaseContext,
        context = React.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      var missingContextMessage = `\`${consumerName}\` must be used within \`${rootComponentName}\``;
      if (options?.fallback) return options?.warn !== !1 && console.warn(missingContextMessage), options.fallback;
      throw new Error(missingContextMessage);
    }
    return [Provider, useContext];
  }
  var createScope = function () {
    var scopeContexts = defaultContexts.map(function (defaultContext) {
      return /* @__PURE__ */React.createContext(defaultContext);
    });
    return function (scope) {
      var contexts = scope?.[scopeName] || scopeContexts;
      return React.useMemo(function () {
        return {
          [`__scope${scopeName}`]: {
            ...scope,
            [scopeName]: contexts
          }
        };
      }, [scope, contexts]);
    };
  };
  return createScope.scopeName = scopeName, [createContext2, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes() {
  for (var _len = arguments.length, scopes = new Array(_len), _key = 0; _key < _len; _key++) scopes[_key] = arguments[_key];
  var baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  var createScope = function () {
    var scopeHooks = scopes.map(function (createScope2) {
      return {
        useScope: createScope2(),
        scopeName: createScope2.scopeName
      };
    });
    return function (overrideScopes) {
      var nextScopes = scopeHooks.reduce(function (nextScopes2, param) {
        var {
            useScope,
            scopeName
          } = param,
          scopeProps = useScope(overrideScopes),
          currentScope = scopeProps[`__scope${scopeName}`];
        return {
          ...nextScopes2,
          ...currentScope
        };
      }, {});
      return React.useMemo(function () {
        return {
          [`__scope${baseScope.scopeName}`]: nextScopes
        };
      }, [nextScopes]);
    };
  };
  return createScope.scopeName = baseScope.scopeName, createScope;
}
export { createContext, createContextScope };
//# sourceMappingURL=create-context.native.js.map
