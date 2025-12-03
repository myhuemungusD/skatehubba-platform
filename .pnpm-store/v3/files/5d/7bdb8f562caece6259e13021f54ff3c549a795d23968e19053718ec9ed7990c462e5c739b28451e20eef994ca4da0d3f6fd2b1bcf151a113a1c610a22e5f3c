import { jsx as _jsx } from "react/jsx-runtime";
import { useConstant } from "@tamagui/use-constant";
import { PresenceContext } from "@tamagui/use-presence";
import * as React from "react";
import { useId } from "react";
var PresenceChild = /* @__PURE__ */React.memo(function (param) {
  var {
      children,
      initial,
      isPresent,
      onExitComplete,
      exitVariant,
      enterVariant,
      enterExitVariant,
      presenceAffectsLayout,
      custom
    } = param,
    presenceChildren = useConstant(newChildrenMap),
    id = useId() || "",
    context = React.useMemo(function () {
      return {
        id,
        initial,
        isPresent,
        custom,
        exitVariant,
        enterVariant,
        enterExitVariant,
        onExitComplete: function () {
          presenceChildren.set(id, !0);
          var _iteratorNormalCompletion = !0,
            _didIteratorError = !1,
            _iteratorError = void 0;
          try {
            for (var _iterator = presenceChildren.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
              var isComplete = _step.value;
              if (!isComplete) return;
            }
          } catch (err) {
            _didIteratorError = !0, _iteratorError = err;
          } finally {
            try {
              !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
            } finally {
              if (_didIteratorError) throw _iteratorError;
            }
          }
          onExitComplete?.();
        },
        register: function () {
          return presenceChildren.set(id, !1), function () {
            return presenceChildren.delete(id);
          };
        }
      };
    },
    /**
    * If the presence of a child affects the layout of the components around it,
    * we want to make a new context value to ensure they get re-rendered
    * so they can detect that layout change.
    */
    // @ts-expect-error its ok
    presenceAffectsLayout ? void 0 : [isPresent, exitVariant, enterVariant]);
  return React.useMemo(function () {
    presenceChildren.forEach(function (_, key) {
      return presenceChildren.set(key, !1);
    });
  }, [isPresent]), React.useEffect(function () {
    !isPresent && !presenceChildren.size && onExitComplete?.();
  }, [isPresent]), /* @__PURE__ */_jsx(PresenceContext.Provider, {
    value: context,
    children
  });
});
function newChildrenMap() {
  return /* @__PURE__ */new Map();
}
export { PresenceChild };
//# sourceMappingURL=PresenceChild.native.js.map
