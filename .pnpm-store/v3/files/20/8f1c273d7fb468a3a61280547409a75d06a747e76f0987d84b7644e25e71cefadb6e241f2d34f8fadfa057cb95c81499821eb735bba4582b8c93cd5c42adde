import React from "react";
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var Decorated = Symbol(),
  withStaticProperties = function (component, staticProps) {
    var next = function () {
      if (component[Decorated]) {
        var _ = /* @__PURE__ */React.forwardRef(function (props, ref) {
          return /* @__PURE__ */React.createElement(component, {
            ...props,
            ref
          });
        });
        for (var key in component) {
          var v = component[key];
          _[key] = v && (typeof v > "u" ? "undefined" : _type_of(v)) === "object" ? {
            ...v
          } : v;
        }
      }
      return component;
    }();
    return Object.assign(next, staticProps), next[Decorated] = !0, next;
  };
export { withStaticProperties };
//# sourceMappingURL=withStaticProperties.native.js.map
