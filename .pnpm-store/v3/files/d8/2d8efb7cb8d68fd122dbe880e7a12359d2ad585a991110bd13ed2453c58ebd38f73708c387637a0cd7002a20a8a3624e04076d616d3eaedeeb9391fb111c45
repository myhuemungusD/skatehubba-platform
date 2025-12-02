import { useConstant } from "@tamagui/use-constant";
import { PresenceContext } from "@tamagui/use-presence";
import * as React from "react";
import { useId } from "react";
import { jsx } from "react/jsx-runtime";
const PresenceChild = React.memo(
  ({
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
    const presenceChildren = useConstant(newChildrenMap), id = useId() || "", context = React.useMemo(
      () => ({
        id,
        initial,
        isPresent,
        custom,
        exitVariant,
        enterVariant,
        enterExitVariant,
        onExitComplete: () => {
          presenceChildren.set(id, !0);
          for (const isComplete of presenceChildren.values())
            if (!isComplete)
              return;
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
      presenceAffectsLayout ? void 0 : [isPresent, exitVariant, enterVariant]
    );
    return React.useMemo(() => {
      presenceChildren.forEach((_, key) => presenceChildren.set(key, !1));
    }, [isPresent]), React.useEffect(() => {
      !isPresent && !presenceChildren.size && onExitComplete?.();
    }, [isPresent]), /* @__PURE__ */ jsx(PresenceContext.Provider, { value: context, children });
  }
);
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
export {
  PresenceChild
};
//# sourceMappingURL=PresenceChild.js.map
