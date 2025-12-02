import "@tamagui/polyfill-dev";
import { isServer } from "@tamagui/constants";
import { useStackedZIndex } from "@tamagui/z-index-stack";
import * as React from "react";
import { createPortal } from "react-dom";
import { getStackedZIndexProps } from "./helpers";
import { jsx } from "react/jsx-runtime";
const Portal = React.memo((propsIn) => {
  if (isServer)
    return null;
  const body = globalThis.document?.body;
  if (!body)
    return propsIn.children;
  const { children, passThrough } = propsIn, zIndex = useStackedZIndex(getStackedZIndexProps(propsIn));
  return passThrough ? children : createPortal(
    /* @__PURE__ */ jsx(
      "span",
      {
        style: {
          zIndex,
          position: "fixed",
          inset: 0,
          contain: "strict",
          pointerEvents: "none"
        },
        children
      }
    ),
    body
  );
});
export {
  Portal
};
//# sourceMappingURL=Portal.js.map
