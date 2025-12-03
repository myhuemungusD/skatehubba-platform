import React from "react";
const Decorated = Symbol(), withStaticProperties = (component, staticProps) => {
  const next = (() => {
    if (component[Decorated]) {
      const _ = React.forwardRef(
        (props, ref) => React.createElement(component, { ...props, ref })
      );
      for (const key in component) {
        const v = component[key];
        _[key] = v && typeof v == "object" ? { ...v } : v;
      }
    }
    return component;
  })();
  return Object.assign(next, staticProps), next[Decorated] = !0, next;
};
export {
  withStaticProperties
};
//# sourceMappingURL=withStaticProperties.js.map
