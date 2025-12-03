import { isWeb } from "@tamagui/constants";
import { styled, useComposedRefs } from "@tamagui/core";
import React from "react";
import { textAreaSizeVariant } from "../helpers/inputHelpers.mjs";
import { InputFrame, defaultStyles, useInputProps } from "./Input.mjs";
import { jsx } from "react/jsx-runtime";
const TextAreaFrame = styled(InputFrame, {
    name: "TextArea",
    multiline: !0,
    // this attribute fixes firefox newline issue
    whiteSpace: "pre-wrap",
    variants: {
      unstyled: {
        false: {
          height: "auto",
          ...defaultStyles
        }
      },
      size: {
        "...size": textAreaSizeVariant
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  TextArea = TextAreaFrame.styleable((propsIn, forwardedRef) => {
    const ref = React.useRef(null),
      composedRefs = useComposedRefs(forwardedRef, ref),
      props = useInputProps(propsIn, composedRefs),
      linesProp = {
        // web uses rows now, but native not caught up :/
        [isWeb ? "rows" : "numberOfLines"]: propsIn.unstyled ? void 0 : 4
      };
    return /* @__PURE__ */jsx(TextAreaFrame, {
      ...linesProp,
      ...props
    });
  });
export { TextArea, TextAreaFrame };
//# sourceMappingURL=TextArea.mjs.map
