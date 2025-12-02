var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var Animate_exports = {};
__export(Animate_exports, {
  Animate: () => Animate
});
module.exports = __toCommonJS(Animate_exports);
var import_animate_presence = require("@tamagui/animate-presence"),
  import_react = require("react"),
  import_jsx_runtime = require("react/jsx-runtime");
function Animate({
  children,
  lazyMount,
  type,
  present,
  passThrough,
  ...props
}) {
  const [lazyMounted, setLazyMounted] = (0, import_react.useState)(lazyMount ? !1 : present);
  (0, import_react.useEffect)(() => {
    passThrough || lazyMount && present && (0, import_react.startTransition)(() => {
      setLazyMounted(present);
    });
  }, [lazyMount, present]);
  const mounted = present ? lazyMount ? lazyMounted : present : !1;
  return type === "presence" ? props.keepChildrenMounted ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_animate_presence.PresenceChild, {
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
  }) : /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_animate_presence.AnimatePresence, {
    passThrough,
    ...props,
    children: mounted || passThrough ? children : null
  }) : /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children
  });
}