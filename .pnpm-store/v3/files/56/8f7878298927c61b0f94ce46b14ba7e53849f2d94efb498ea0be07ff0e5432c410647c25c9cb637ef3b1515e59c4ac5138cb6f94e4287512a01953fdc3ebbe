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
var PresenceChild_exports = {};
__export(PresenceChild_exports, {
  PresenceChild: () => PresenceChild
});
module.exports = __toCommonJS(PresenceChild_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_use_constant = require("@tamagui/use-constant"),
  import_use_presence = require("@tamagui/use-presence"),
  React = __toESM(require("react"), 1),
  import_react = require("react"),
  PresenceChild = /* @__PURE__ */React.memo(function (param) {
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
      presenceChildren = (0, import_use_constant.useConstant)(newChildrenMap),
      id = (0, import_react.useId)() || "",
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
    }, [isPresent]), /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_use_presence.PresenceContext.Provider, {
      value: context,
      children
    });
  });
function newChildrenMap() {
  return /* @__PURE__ */new Map();
}
//# sourceMappingURL=PresenceChild.native.js.map
