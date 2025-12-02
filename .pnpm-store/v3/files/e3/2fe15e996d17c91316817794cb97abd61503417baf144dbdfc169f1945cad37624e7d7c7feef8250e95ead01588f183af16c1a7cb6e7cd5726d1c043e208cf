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
var PresenceChild_exports = {};
__export(PresenceChild_exports, {
  PresenceChild: () => PresenceChild
});
module.exports = __toCommonJS(PresenceChild_exports);
var import_use_constant = require("@tamagui/use-constant"),
  import_use_presence = require("@tamagui/use-presence"),
  React = __toESM(require("react"), 1),
  import_react = require("react"),
  import_jsx_runtime = require("react/jsx-runtime");
const PresenceChild = React.memo(({
  children,
  initial,
  isPresent,
  onExitComplete,
  exitVariant,
  enterVariant,
  enterExitVariant,
  presenceAffectsLayout,
  custom
}) => {
  const presenceChildren = (0, import_use_constant.useConstant)(newChildrenMap),
    id = (0, import_react.useId)() || "",
    context = React.useMemo(() => ({
      id,
      initial,
      isPresent,
      custom,
      exitVariant,
      enterVariant,
      enterExitVariant,
      onExitComplete: () => {
        presenceChildren.set(id, !0);
        for (const isComplete of presenceChildren.values()) if (!isComplete) return;
        onExitComplete?.();
      },
      register: () => (presenceChildren.set(id, !1), () => presenceChildren.delete(id))
    }),
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    // @ts-expect-error its ok
    presenceAffectsLayout ? void 0 : [isPresent, exitVariant, enterVariant]);
  return React.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, !1));
  }, [isPresent]), React.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete?.();
  }, [isPresent]), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_use_presence.PresenceContext.Provider, {
    value: context,
    children
  });
});
function newChildrenMap() {
  return /* @__PURE__ */new Map();
}