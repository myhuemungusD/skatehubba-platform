import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import { ResetPresence, usePresence } from "@tamagui/use-presence";
import { transformsToString } from "@tamagui/web";
import React, { useState } from "react";
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
    usePresence,
    ResetPresence,
    supportsCSS: !0,
    classNameAnimation: !0,
    useAnimatedNumber(initial) {
      var [val, setVal] = React.useState(initial),
        [onFinish, setOnFinish] = useState();
      return useIsomorphicLayoutEffect(function () {
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
      React.useEffect(function () {
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
      return useIsomorphicLayoutEffect(function () {
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
      }, [sendExitComplete, isExiting]), animation && (Array.isArray(style.transform) && (style.transform = transformsToString(style.transform)), style.transition = keys.map(function (key) {
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
export { createAnimations };
//# sourceMappingURL=createAnimations.native.js.map
