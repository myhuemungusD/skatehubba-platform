"use strict";

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
var create_context_exports = {};
__export(create_context_exports, {
  createContext: () => createContext,
  createContextScope: () => createContextScope
});
module.exports = __toCommonJS(create_context_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  React = __toESM(require("react"), 1);
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
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Context.Provider, {
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
      return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Context.Provider, {
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
//# sourceMappingURL=create-context.native.js.map
