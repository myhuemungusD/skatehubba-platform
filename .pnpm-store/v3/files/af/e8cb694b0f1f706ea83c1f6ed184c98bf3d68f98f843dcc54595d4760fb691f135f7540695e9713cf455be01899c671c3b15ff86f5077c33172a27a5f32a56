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
var createAnimations_exports = {};
__export(createAnimations_exports, {
  createAnimations: () => createAnimations
});
module.exports = __toCommonJS(createAnimations_exports);
var import_constants = require("@tamagui/constants"),
  import_use_presence = require("@tamagui/use-presence"),
  import_web = require("@tamagui/web"),
  import_react = __toESM(require("react"), 1);
function extractDuration(animation) {
  var msMatch = animation.match(/(\d+(?:\.\d+)?)\s*ms/);
  if (msMatch) return Number.parseInt(msMatch[1], 10);
  var sMatch = animation.match(/(\d+(?:\.\d+)?)\s*s/);
  return sMatch ? Math.round(Number.parseFloat(sMatch[1]) * 1e3) : 300;
}
function createAnimations(animations) {
  var reactionListeners = /* @__PURE__ */new WeakMap();
  return {
    animations,
    usePresence: import_use_presence.usePresence,
    ResetPresence: import_use_presence.ResetPresence,
    supportsCSS: !0,
    classNameAnimation: !0,
    useAnimatedNumber(initial) {
      var [val, setVal] = import_react.default.useState(initial),
        [onFinish, setOnFinish] = (0, import_react.useState)();
      return (0, import_constants.useIsomorphicLayoutEffect)(function () {
        onFinish && (onFinish?.(), setOnFinish(void 0));
      }, [onFinish]), {
        getInstance() {
          return setVal;
        },
        getValue() {
          return val;
        },
        setValue(next, config, onFinish2) {
          setVal(next), setOnFinish(onFinish2);
        },
        stop() {}
      };
    },
    useAnimatedNumberReaction(param, onValue) {
      var {
        value
      } = param;
      import_react.default.useEffect(function () {
        var instance = value.getInstance(),
          queue = reactionListeners.get(instance);
        if (!queue) {
          var next = /* @__PURE__ */new Set();
          reactionListeners.set(instance, next), queue = next;
        }
        return queue.add(onValue), function () {
          queue?.delete(onValue);
        };
      }, []);
    },
    useAnimatedNumberStyle(val, getStyle) {
      return getStyle(val.getValue());
    },
    useAnimations: function (param) {
      var {
          props,
          presence,
          style,
          componentState,
          stateRef
        } = param,
        isEntering = !!componentState.unmounted,
        isExiting = presence?.[0] === !1,
        sendExitComplete = presence?.[1],
        [animationKey, animationConfig] = Array.isArray(props.animation) ? props.animation : [props.animation],
        animation = animations[animationKey],
        _props_animateOnly,
        keys = (_props_animateOnly = props.animateOnly) !== null && _props_animateOnly !== void 0 ? _props_animateOnly : ["all"];
      return (0, import_constants.useIsomorphicLayoutEffect)(function () {
        var host = stateRef.current.host;
        if (!(!sendExitComplete || !isExiting || !host)) {
          var node = host,
            fallbackTimeout = animation ? extractDuration(animation) : 200,
            timeoutId = setTimeout(function () {
              sendExitComplete?.();
            }, fallbackTimeout),
            onFinishAnimation = function () {
              clearTimeout(timeoutId), sendExitComplete?.();
            };
          return node.addEventListener("transitionend", onFinishAnimation), node.addEventListener("transitioncancel", onFinishAnimation), function () {
            clearTimeout(timeoutId), node.removeEventListener("transitionend", onFinishAnimation), node.removeEventListener("transitioncancel", onFinishAnimation);
          };
        }
      }, [sendExitComplete, isExiting]), animation && (Array.isArray(style.transform) && (style.transform = (0, import_web.transformsToString)(style.transform)), style.transition = keys.map(function (key) {
        var _animations_animationConfig_key,
          override = (_animations_animationConfig_key = animations[animationConfig?.[key]]) !== null && _animations_animationConfig_key !== void 0 ? _animations_animationConfig_key : animation;
        return `${key} ${override}`;
      }).join(", ")), process.env.NODE_ENV === "development" && props.debug === "verbose" && console.info("CSS animation", {
        props,
        animations,
        animation,
        animationKey,
        style,
        isEntering,
        isExiting
      }), animation ? {
        style,
        className: isEntering ? "t_unmounted" : ""
      } : null;
    }
  };
}
//# sourceMappingURL=createAnimations.native.js.map
