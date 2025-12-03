import { jsx as _jsx } from "react/jsx-runtime";
import { isWeb } from "@tamagui/constants";
import { styled, useComposedRefs } from "@tamagui/core";
import React from "react";
import { textAreaSizeVariant } from "../helpers/inputHelpers.native.js";
import { InputFrame, defaultStyles, useInputProps } from "./Input.native.js";
var TextAreaFrame = styled(InputFrame, {
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
  TextArea = TextAreaFrame.styleable(function (propsIn, forwardedRef) {
    var ref = React.useRef(null),
      composedRefs = useComposedRefs(forwardedRef, ref),
      props = useInputProps(propsIn, composedRefs),
      linesProp = {
        // web uses rows now, but native not caught up :/
        [isWeb ? "rows" : "numberOfLines"]: propsIn.unstyled ? void 0 : 4
      };
    return /* @__PURE__ */_jsx(TextAreaFrame, {
      ...linesProp,
      ...props
    });
  });
export { TextArea, TextAreaFrame };
//# sourceMappingURL=TextArea.native.js.map
