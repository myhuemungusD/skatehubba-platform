"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var variants_exports = {};
__export(variants_exports, {
  bordered: () => bordered,
  circular: () => circular,
  elevate: () => elevate,
  focusTheme: () => focusTheme,
  hoverTheme: () => hoverTheme,
  padded: () => padded,
  pressTheme: () => pressTheme,
  radiused: () => radiused
});
module.exports = __toCommonJS(variants_exports);
var import_getElevation = require("./getElevation.native.js"),
  elevate = {
    true: function (_, extras) {
      return (0, import_getElevation.getElevation)(extras.props.size, extras);
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
//# sourceMappingURL=variants.native.js.map
