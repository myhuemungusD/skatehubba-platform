import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { isWeb } from "@tamagui/constants";
import { styled, useComposedRefs, useTheme } from "@tamagui/core";
import { useFocusable } from "@tamagui/focusable";
import { TextInput } from "react-native";
import { inputSizeVariant } from "../helpers/inputHelpers.native.js";
var defaultStyles = {
    size: "$true",
    fontFamily: "$body",
    borderWidth: 1,
    outlineWidth: 0,
    color: "$color",
    ...(isWeb ? {
      tabIndex: 0
    } : {
      focusable: !0
    }),
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
  },
  InputFrame = styled(TextInput, {
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
  }, {
    isInput: !0,
    accept: {
      placeholderTextColor: "color",
      selectionColor: "color"
    }
  }),
  Input = InputFrame.styleable(function (propsIn, forwardedRef) {
    var ref = React.useRef(null),
      composedRefs = useComposedRefs(forwardedRef, ref),
      props = useInputProps(propsIn, composedRefs);
    return /* @__PURE__ */_jsx(InputFrame, {
      ...props
    });
  });
function useInputProps(props, ref) {
  var theme = useTheme(),
    focusableProps = useFocusable({
      props,
      ref,
      isInput: !0
    }),
    placeholderTextColor = React.useMemo(function () {
      var _theme_placeholderColorProp,
        _theme_placeholderColor,
        placeholderColorProp = props.placeholderTextColor,
        _theme_placeholderColorProp_get,
        _ref;
      return (_ref = (_theme_placeholderColorProp_get = (_theme_placeholderColorProp = theme[placeholderColorProp]) === null || _theme_placeholderColorProp === void 0 ? void 0 : _theme_placeholderColorProp.get()) !== null && _theme_placeholderColorProp_get !== void 0 ? _theme_placeholderColorProp_get : placeholderColorProp) !== null && _ref !== void 0 ? _ref : (_theme_placeholderColor = theme.placeholderColor) === null || _theme_placeholderColor === void 0 ? void 0 : _theme_placeholderColor.get();
    }, [props.placeholderTextColor, theme]);
  return React.useMemo(function () {
    return {
      ref: focusableProps.ref,
      readOnly: props.disabled,
      ...props,
      placeholderTextColor,
      onChangeText: focusableProps.onChangeText
    };
  }, [focusableProps.ref, focusableProps.onChangeText, props.disabled, props, placeholderTextColor]);
}
export { Input, InputFrame, defaultStyles, useInputProps };
//# sourceMappingURL=Input.native.js.map
