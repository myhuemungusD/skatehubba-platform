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
var GorhomPortal_exports = {};
__export(GorhomPortal_exports, {
  ACTIONS: () => ACTIONS,
  INITIAL_STATE: () => INITIAL_STATE,
  PortalHost: () => PortalHost,
  PortalProvider: () => PortalProvider,
  usePortal: () => usePortal
});
module.exports = __toCommonJS(GorhomPortal_exports);
var import_constants = require("@tamagui/constants"),
  import_start_transition = require("@tamagui/start-transition"),
  import_react = __toESM(require("react"), 1),
  import_constants2 = require("./constants.cjs"),
  import_jsx_runtime = require("react/jsx-runtime"),
  ACTIONS = /* @__PURE__ */(ACTIONS2 => (ACTIONS2[ACTIONS2.REGISTER_HOST = 0] = "REGISTER_HOST", ACTIONS2[ACTIONS2.DEREGISTER_HOST = 1] = "DEREGISTER_HOST", ACTIONS2[ACTIONS2.ADD_UPDATE_PORTAL = 2] = "ADD_UPDATE_PORTAL", ACTIONS2[ACTIONS2.REMOVE_PORTAL = 3] = "REMOVE_PORTAL", ACTIONS2))(ACTIONS || {});
const INITIAL_STATE = {};
const registerHost = (state, hostName) => (hostName in state || (state[hostName] = []), state),
  deregisterHost = (state, hostName) => (delete state[hostName], state),
  addUpdatePortal = (state, hostName, portalName, node) => {
    hostName in state || (state = registerHost(state, hostName));
    const index = state[hostName].findIndex(item => item.name === portalName);
    return index !== -1 ? state[hostName][index].node = node : state[hostName].push({
      name: portalName,
      node
    }), state;
  },
  removePortal = (state, hostName, portalName) => {
    if (!(hostName in state)) return console.info(`Failed to remove portal '${portalName}', '${hostName}' was not registered!`), state;
    const index = state[hostName].findIndex(item => item.name === portalName);
    return index !== -1 && state[hostName].splice(index, 1), state;
  },
  reducer = (state, action) => {
    const {
      type
    } = action;
    switch (type) {
      case 0 /* REGISTER_HOST */:
        return registerHost({
          ...state
        }, action.hostName);
      case 1 /* DEREGISTER_HOST */:
        return deregisterHost({
          ...state
        }, action.hostName);
      case 2 /* ADD_UPDATE_PORTAL */:
        return addUpdatePortal({
          ...state
        }, action.hostName, action.portalName, action.node);
      case 3 /* REMOVE_PORTAL */:
        return removePortal({
          ...state
        }, action.hostName, action.portalName);
      default:
        return state;
    }
  },
  PortalStateContext = (0, import_react.createContext)(null),
  PortalDispatchContext = (0, import_react.createContext)(null),
  usePortalState = hostName => {
    const state = (0, import_react.useContext)(PortalStateContext);
    if (state === null) throw new Error("'PortalStateContext' cannot be null, please add 'PortalProvider' to the root component.");
    return state[hostName] || [];
  },
  usePortal = (hostName = "root") => {
    const dispatch = (0, import_react.useContext)(PortalDispatchContext);
    if (dispatch === null) throw new Error("'PortalDispatchContext' cannot be null, please add 'PortalProvider' to the root component.");
    const registerHost2 = (0, import_react.useCallback)(() => {
        dispatch({
          type: 0 /* REGISTER_HOST */,
          hostName
        });
      }, []),
      deregisterHost2 = (0, import_react.useCallback)(() => {
        dispatch({
          type: 1 /* DEREGISTER_HOST */,
          hostName
        });
      }, []),
      addUpdatePortal2 = (0, import_react.useCallback)((name, node) => {
        dispatch({
          type: 2 /* ADD_UPDATE_PORTAL */,
          hostName,
          portalName: name,
          node
        });
      }, []),
      removePortal2 = (0, import_react.useCallback)(name => {
        dispatch({
          type: 3 /* REMOVE_PORTAL */,
          hostName,
          portalName: name
        });
      }, []);
    return {
      registerHost: registerHost2,
      deregisterHost: deregisterHost2,
      addPortal: addUpdatePortal2,
      updatePortal: addUpdatePortal2,
      removePortal: removePortal2
    };
  },
  PortalProviderComponent = ({
    rootHostName = "root",
    shouldAddRootHost = !0,
    children
  }) => {
    const [state, dispatch] = (0, import_react.useReducer)(reducer, INITIAL_STATE),
      transitionDispatch = (0, import_react.useMemo)(() => value => {
        (0, import_start_transition.startTransition)(() => {
          dispatch(value);
        });
      }, [dispatch]);
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(PortalDispatchContext.Provider, {
      value: transitionDispatch,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsxs)(PortalStateContext.Provider, {
        value: state,
        children: [children, shouldAddRootHost && /* @__PURE__ */(0, import_jsx_runtime.jsx)(PortalHost, {
          name: rootHostName
        })]
      })
    });
  },
  PortalProvider = (0, import_react.memo)(PortalProviderComponent);
PortalProvider.displayName = "PortalProvider";
const defaultRenderer = children => /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children
  }),
  PortalHost = (0, import_react.memo)(function (props) {
    return import_constants.isWeb ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(PortalHostWeb, {
      ...props
    }) : /* @__PURE__ */(0, import_jsx_runtime.jsx)(PortalHostNonNative, {
      ...props
    });
  });
function PortalHostWeb(props) {
  return (0, import_constants.useIsomorphicLayoutEffect)(() => () => {
    import_constants2.allPortalHosts.delete(props.name);
  }, [props.name]), /* @__PURE__ */(0, import_jsx_runtime.jsx)("div", {
    style: {
      display: "contents"
    },
    ref: node => {
      node && (import_constants2.allPortalHosts.set(props.name, node), import_constants2.portalListeners[props.name]?.forEach(x => x(node)));
    }
  });
}
function PortalHostNonNative(props) {
  const {
      name,
      forwardProps,
      render = defaultRenderer
    } = props,
    state = usePortalState(name),
    {
      registerHost: registerHost2,
      deregisterHost: deregisterHost2
    } = usePortal(props.name);
  return (0, import_constants.useIsomorphicLayoutEffect)(() => {
    if (!(typeof window > "u")) return registerHost2(), () => {
      deregisterHost2();
    };
  }, []), render(forwardProps ? state.map(item => {
    let next = item.node;
    const {
      children,
      ...restForwardProps
    } = forwardProps;
    return forwardProps ? import_react.default.Children.map(next, child => import_react.default.isValidElement(child) ? import_react.default.cloneElement(child, {
      key: child.key,
      ...restForwardProps
    }) : child) : next;
  }) : state.map(item => item.node));
}