import { getSpace } from "@tamagui/get-token";
import { Paragraph } from "@tamagui/text";
import * as React from "react";
import { Tooltip } from "./Tooltip";
import { jsx, jsxs } from "react/jsx-runtime";
const TooltipSimple = React.forwardRef(
  ({ label, children, contentProps, disabled, ...tooltipProps }, ref) => {
    const child = React.Children.only(children);
    return label ? /* @__PURE__ */ jsxs(
      Tooltip,
      {
        disableRTL: !0,
        offset: 15,
        restMs: 40,
        delay: 40,
        ...tooltipProps,
        ...disabled ? { open: !1 } : null,
        children: [
          /* @__PURE__ */ jsx(
            Tooltip.Trigger,
            {
              ...typeof label == "string" && {
                "aria-label": label
              },
              asChild: "except-style",
              children: ref && React.isValidElement(child) ? React.cloneElement(child, { ref }) : child
            }
          ),
          /* @__PURE__ */ jsxs(
            Tooltip.Content,
            {
              zIndex: 1e9,
              enterStyle: { y: -4, opacity: 0, scale: 0.96 },
              exitStyle: { y: -4, opacity: 0, scale: 0.96 },
              scale: 1,
              elevation: "$0.5",
              opacity: 1,
              pointerEvents: "none",
              paddingVertical: getSpace(tooltipProps.size || "$true", {
                shift: -4
              }),
              animateOnly: ["transform", "opacity"],
              animation: [
                "quicker",
                {
                  opacity: {
                    overshootClamping: !0
                  }
                }
              ],
              ...contentProps,
              children: [
                /* @__PURE__ */ jsx(Tooltip.Arrow, {}),
                /* @__PURE__ */ jsx(Paragraph, { size: "$3", children: label })
              ]
            }
          )
        ]
      }
    ) : children;
  }
);
export {
  TooltipSimple
};
//# sourceMappingURL=TooltipSimple.js.map
