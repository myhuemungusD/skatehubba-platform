import { AnimatePresence, PresenceChild } from "@tamagui/animate-presence";
import { startTransition, useEffect, useState } from "react";
import { Fragment, jsx } from "react/jsx-runtime";
function Animate({
  children,
  lazyMount,
  type,
  present,
  passThrough,
  ...props
}) {
  const [lazyMounted, setLazyMounted] = useState(lazyMount ? !1 : present);
  useEffect(() => {
    passThrough || lazyMount && present && startTransition(() => {
      setLazyMounted(present);
    });
  }, [lazyMount, present]);
  const mounted = present ? lazyMount ? lazyMounted : present : !1;
  return type === "presence" ? props.keepChildrenMounted ? /* @__PURE__ */jsx(PresenceChild, {
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
  }) : /* @__PURE__ */jsx(AnimatePresence, {
    passThrough,
    ...props,
    children: mounted || passThrough ? children : null
  }) : /* @__PURE__ */jsx(Fragment, {
    children
  });
}
export { Animate };
//# sourceMappingURL=Animate.mjs.map
