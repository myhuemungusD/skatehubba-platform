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
  },
  __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default")),
  __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
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
var useResponderEvents_exports = {};
__export(useResponderEvents_exports, {
  getResponderConfigIfDefined: () => getResponderConfigIfDefined,
  useResponderEvents: () => useResponderEvents
});
module.exports = __toCommonJS(useResponderEvents_exports);
var React = __toESM(require("react"), 1),
  ResponderSystem = __toESM(require("./ResponderSystem.cjs"), 1);
__reExport(useResponderEvents_exports, require("./utils.cjs"), module.exports);
const emptyObject = {},
  Attached = /* @__PURE__ */new WeakMap(),
  Ids = /* @__PURE__ */new WeakMap();
function useResponderEvents(hostRef, configIn = emptyObject) {
  const config = getResponderConfigIfDefined(configIn),
    node = hostRef?.current?.host || hostRef?.current;
  React.useEffect(() => {
    if (config === emptyObject) return;
    ResponderSystem.attachListeners(), Ids.has(hostRef) || Ids.set(hostRef, `${Math.random()}`);
    const id = Ids.get(hostRef);
    return ResponderSystem.addNode(id, node, config), Attached.set(hostRef, !0), () => {
      ResponderSystem.removeNode(node), Attached.set(hostRef, !1);
    };
  }, [config, hostRef]), process.env.NODE_ENV === "development" && (React.useDebugValue({
    isResponder: node === ResponderSystem.getResponderNode()
  }), React.useDebugValue(config));
}
function getResponderConfigIfDefined({
  onMoveShouldSetResponder,
  onMoveShouldSetResponderCapture,
  onResponderEnd,
  onResponderGrant,
  onResponderMove,
  onResponderReject,
  onResponderRelease,
  onResponderStart,
  onResponderTerminate,
  onResponderTerminationRequest,
  onScrollShouldSetResponder,
  onScrollShouldSetResponderCapture,
  onSelectionChangeShouldSetResponder,
  onSelectionChangeShouldSetResponderCapture,
  onStartShouldSetResponder,
  onStartShouldSetResponderCapture
}) {
  return onMoveShouldSetResponder || onMoveShouldSetResponderCapture || onResponderEnd || onResponderGrant || onResponderMove || onResponderReject || onResponderRelease || onResponderStart || onResponderTerminate || onResponderTerminationRequest || onScrollShouldSetResponder || onScrollShouldSetResponderCapture || onSelectionChangeShouldSetResponder || onSelectionChangeShouldSetResponderCapture || onStartShouldSetResponder || onStartShouldSetResponderCapture ? {
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture
  } : emptyObject;
}