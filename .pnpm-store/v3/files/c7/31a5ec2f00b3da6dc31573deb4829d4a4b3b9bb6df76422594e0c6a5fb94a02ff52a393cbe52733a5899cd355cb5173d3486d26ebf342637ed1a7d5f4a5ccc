import { getElevation } from "./getElevation.native.js";
var elevate = {
    true: function (_, extras) {
      return getElevation(extras.props.size, extras);
    }
  },
  bordered = function (val, param) {
    var {
      props
    } = param;
    return {
      // TODO size it with size in '...size'
      borderWidth: typeof val == "number" ? val : 1,
      borderColor: "$borderColor",
      ...(props.hoverTheme && {
        hoverStyle: {
          borderColor: "$borderColorHover"
        }
      }),
      ...(props.pressTheme && {
        pressStyle: {
          borderColor: "$borderColorPress"
        }
      }),
      ...(props.focusTheme && {
        focusStyle: {
          borderColor: "$borderColorFocus"
        }
      })
    };
  },
  padded = {
    true: function (_, extras) {
      var {
        tokens,
        props
      } = extras;
      return {
        padding: tokens.space[props.size] || tokens.space.$true
      };
    }
  },
  radiused = {
    true: function (_, extras) {
      var {
        tokens,
        props
      } = extras;
      return {
        borderRadius: tokens.radius[props.size] || tokens.radius.$true
      };
    }
  },
  circularStyle = {
    borderRadius: 1e5,
    padding: 0
  },
  circular = {
    true: function (_, param) {
      var {
        props,
        tokens
      } = param;
      if (!("size" in props)) return circularStyle;
      var size = typeof props.size == "number" ? props.size : tokens.size[props.size];
      return {
        ...circularStyle,
        width: size,
        height: size,
        maxWidth: size,
        maxHeight: size,
        minWidth: size,
        minHeight: size
      };
    }
  },
  hoverTheme = {
    true: {
      hoverStyle: {
        backgroundColor: "$backgroundHover",
        borderColor: "$borderColorHover"
      }
    },
    false: {}
  },
  pressTheme = {
    true: {
      cursor: "pointer",
      pressStyle: {
        backgroundColor: "$backgroundPress",
        borderColor: "$borderColorPress"
      }
    },
    false: {}
  },
  focusTheme = {
    true: {
      focusStyle: {
        backgroundColor: "$backgroundFocus",
        borderColor: "$borderColorFocus"
      }
    },
    false: {}
  };
export { bordered, circular, elevate, focusTheme, hoverTheme, padded, pressTheme, radiused };
//# sourceMappingURL=variants.native.js.map
