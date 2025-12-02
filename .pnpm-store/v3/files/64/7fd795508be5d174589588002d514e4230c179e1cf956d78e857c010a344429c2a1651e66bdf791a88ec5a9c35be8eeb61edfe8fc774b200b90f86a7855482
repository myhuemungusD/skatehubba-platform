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
var useControllableState_exports = {};
__export(useControllableState_exports, {
  useControllableState: () => useControllableState
});
module.exports = __toCommonJS(useControllableState_exports);
var import_use_event = require("@tamagui/use-event"),
  React = __toESM(require("react"), 1),
  import_start_transition = require("@tamagui/start-transition"),
  emptyCallbackFn = function (_) {
    return _();
  };
function useControllableState(param) {
  var {
      prop,
      defaultProp,
      onChange,
      strategy = "prop-wins",
      preventUpdate,
      transition
    } = param,
    [state, setState] = React.useState(prop ?? defaultProp),
    previous = React.useRef(state),
    propWins = strategy === "prop-wins" && prop !== void 0,
    value = propWins ? prop : state,
    onChangeCb = (0, import_use_event.useEvent)(onChange || idFn),
    transitionFn = transition ? import_start_transition.startTransition : emptyCallbackFn;
  React.useEffect(function () {
    prop !== void 0 && (previous.current = prop, transitionFn(function () {
      setState(prop);
    }));
  }, [prop]), React.useEffect(function () {
    propWins || state !== previous.current && (previous.current = state, onChangeCb(state));
  }, [onChangeCb, state, propWins]);
  var setter = (0, import_use_event.useEvent)(function (next) {
    if (!preventUpdate) if (propWins) {
      var nextValue = typeof next == "function" ? next(previous.current) : next;
      onChangeCb(nextValue);
    } else transitionFn(function () {
      setState(next);
    });
  });
  return [value, setter];
}
var idFn = function () {};
//# sourceMappingURL=useControllableState.native.js.map
