import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { AnimatePresence, PresenceChild } from "@tamagui/animate-presence";
import { startTransition, useEffect, useState } from "react";
function Animate(param) {
  var {
      children,
      lazyMount,
      type,
      present,
      passThrough,
      ...props
    } = param,
    [lazyMounted, setLazyMounted] = useState(lazyMount ? !1 : present);
  useEffect(function () {
    passThrough || lazyMount && present && startTransition(function () {
      setLazyMounted(present);
    });
  }, [lazyMount, present]);
  var mounted = present ? lazyMount ? lazyMounted : present : !1;
  return type === "presence" ? props.keepChildrenMounted ? /* @__PURE__ */_jsx(PresenceChild, {
    isPresent: !0,
    ...(!passThrough && {
      initial: props.initial ? void 0 : !1,
      onExitComplete: props.onExitComplete,
      enterVariant: props.enterVariant,
      exitVariant: props.exitVariant,
      enterExitVariant: props.enterExitVariant,
      // BUGFIX: this causes continous re-renders if keepChildrenMounted is true, see HeaderMenu
      // but since we always re-render this component on open changes this should be fine to leave off?
      presenceAffectsLayout: !1,
      isPresent: present,
      custom: props.custom
    }),
    children
  }) : /* @__PURE__ */_jsx(AnimatePresence, {
    passThrough,
    ...props,
    children: mounted || passThrough ? children : null
  }) : /* @__PURE__ */_jsx(_Fragment, {
    children
  });
}
export { Animate };
//# sourceMappingURL=Animate.native.js.map
