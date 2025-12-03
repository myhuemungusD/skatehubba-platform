import React from "react";
import { isWeb } from "@tamagui/constants";
import { styled, useComposedRefs, useTheme } from "@tamagui/core";
import { useFocusable } from "@tamagui/focusable";
import { TextInput } from "react-native-web";
import { inputSizeVariant } from "../helpers/inputHelpers";
import { jsx } from "react/jsx-runtime";
const defaultStyles = {
  size: "$true",
  fontFamily: "$body",
  borderWidth: 1,
  outlineWidth: 0,
  color: "$color",
  ...isWeb ? {
    tabIndex: 0
  } : {
    focusable: !0
  },
  borderColor: "$borderColor",
  backgroundColor: "$background",
  // this fixes a flex bug where it overflows container
  minWidth: 0,
  hoverStyle: {
    borderColor: "$borderColorHover"
  },
  focusStyle: {
    borderColor: "$borderColorFocus"
  },
  focusVisibleStyle: {
    outlineColor: "$outlineColor",
    outlineWidth: 2,
    outlineStyle: "solid"
  }
}, InputFrame = styled(
  TextInput,
  {
    name: "Input",
    variants: {
      unstyled: {
        false: defaultStyles
      },
      size: {
        "...size": inputSizeVariant
      },
      disabled: {
        true: {}
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  },
  {
    isInput: !0,
    accept: {
      placeholderTextColor: "color",
      selectionColor: "color"
    }
  }
), Input = InputFrame.styleable((propsIn, forwardedRef) => {
  const ref = React.useRef(null), composedRefs = useComposedRefs(forwardedRef, ref), props = useInputProps(propsIn, composedRefs);
  return /* @__PURE__ */ jsx(InputFrame, { ...props });
});
function useInputProps(props, ref) {
  const theme = useTheme(), focusableProps = useFocusable({
    props,
    ref,
    isInput: !0
  }), placeholderTextColor = React.useMemo(() => {
    const placeholderColorProp = props.placeholderTextColor;
    return theme[placeholderColorProp]?.get() ?? placeholderColorProp ?? theme.placeholderColor?.get();
  }, [props.placeholderTextColor, theme]);
  return React.useMemo(
    () => ({
      ref: focusableProps.ref,
      readOnly: props.disabled,
      ...props,
      placeholderTextColor,
      onChangeText: focusableProps.onChangeText
    }),
    [
      focusableProps.ref,
      focusableProps.onChangeText,
      props.disabled,
      props,
      placeholderTextColor
    ]
  );
}
export {
  Input,
  InputFrame,
  defaultStyles,
  useInputProps
};
//# sourceMappingURL=Input.js.map
