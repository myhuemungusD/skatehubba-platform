import { useIsomorphicLayoutEffect } from "@tamagui/constants";
import { ResetPresence, usePresence } from "@tamagui/use-presence";
import { transformsToString } from "@tamagui/web";
import React, { useState } from "react";
function extractDuration(animation) {
  const msMatch = animation.match(/(\d+(?:\.\d+)?)\s*ms/);
  if (msMatch)
    return Number.parseInt(msMatch[1], 10);
  const sMatch = animation.match(/(\d+(?:\.\d+)?)\s*s/);
  return sMatch ? Math.round(Number.parseFloat(sMatch[1]) * 1e3) : 300;
}
function createAnimations(animations) {
  const reactionListeners = /* @__PURE__ */ new WeakMap();
  return {
    animations,
    usePresence,
    ResetPresence,
    supportsCSS: !0,
    classNameAnimation: !0,
    useAnimatedNumber(initial) {
      const [val, setVal] = React.useState(initial), [onFinish, setOnFinish] = useState();
      return useIsomorphicLayoutEffect(() => {
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
        stop() {
        }
      };
    },
    useAnimatedNumberReaction({ value }, onValue) {
      React.useEffect(() => {
        const instance = value.getInstance();
        let queue = reactionListeners.get(instance);
        if (!queue) {
          const next = /* @__PURE__ */ new Set();
          reactionListeners.set(instance, next), queue = next;
        }
        return queue.add(onValue), () => {
          queue?.delete(onValue);
        };
      }, []);
    },
    useAnimatedNumberStyle(val, getStyle) {
      return getStyle(val.getValue());
    },
    useAnimations: ({ props, presence, style, componentState, stateRef }) => {
      const isEntering = !!componentState.unmounted, isExiting = presence?.[0] === !1, sendExitComplete = presence?.[1], [animationKey, animationConfig] = Array.isArray(props.animation) ? props.animation : [props.animation], animation = animations[animationKey], keys = props.animateOnly ?? ["all"];
      return useIsomorphicLayoutEffect(() => {
        const host = stateRef.current.host;
        if (!sendExitComplete || !isExiting || !host) return;
        const node = host, fallbackTimeout = animation ? extractDuration(animation) : 200, timeoutId = setTimeout(() => {
          sendExitComplete?.();
        }, fallbackTimeout), onFinishAnimation = () => {
          clearTimeout(timeoutId), sendExitComplete?.();
        };
        return node.addEventListener("transitionend", onFinishAnimation), node.addEventListener("transitioncancel", onFinishAnimation), () => {
          clearTimeout(timeoutId), node.removeEventListener("transitionend", onFinishAnimation), node.removeEventListener("transitioncancel", onFinishAnimation);
        };
      }, [sendExitComplete, isExiting]), animation && (Array.isArray(style.transform) && (style.transform = transformsToString(style.transform)), style.transition = keys.map((key) => {
        const override = animations[animationConfig?.[key]] ?? animation;
        return `${key} ${override}`;
      }).join(", ")), process.env.NODE_ENV === "development" && props.debug === "verbose" && console.info("CSS animation", {
        props,
        animations,
        animation,
        animationKey,
        style,
        isEntering,
        isExiting
      }), animation ? { style, className: isEntering ? "t_unmounted" : "" } : null;
    }
  };
}
export {
  createAnimations
};
//# sourceMappingURL=createAnimations.js.map
