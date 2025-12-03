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
var createStyledContext_exports = {};
__export(createStyledContext_exports, {
  createStyledContext: () => createStyledContext
});
module.exports = __toCommonJS(createStyledContext_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_react = __toESM(require("react"), 1),
  import_mergeProps = require("./mergeProps.native.js"),
  import_objectIdentityKey = require("./objectIdentityKey.native.js"),
  createReactContext = import_react.default[Math.random(), "createContext"];
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
        next = import_react.default.useMemo(function () {
          return __disableMergeDefaultValues ? values : (0, import_mergeProps.mergeProps)(defaultValues, values);
        }, [(0, import_objectIdentityKey.objectIdentityKey)(values)]),
        ScopedProvider = OGProvider;
      return scope && (ScopedProvider = getOrCreateScopedContext(scope).Provider), /* @__PURE__ */(0, import_jsx_runtime.jsx)(LastScopeInNamespace.Provider, {
        value: scope,
        children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(ScopedProvider, {
          value: next,
          children
        })
      });
    },
    useStyledContext = function () {
      var scopeIn = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "",
        lastScopeInNamespace = (0, import_react.useContext)(LastScopeInNamespace),
        scope = namespace ? scopeIn ? getNamespacedScope(scopeIn) : lastScopeInNamespace : scopeIn,
        context = scope ? getOrCreateScopedContext(scope) : OGContext,
        value = import_react.default.useContext(context);
      return value;
    };
  return Context.Provider = Provider, Context.props = defaultValues, Context.context = OGContext, Context.useStyledContext = useStyledContext, Context;
}
//# sourceMappingURL=createStyledContext.native.js.map
