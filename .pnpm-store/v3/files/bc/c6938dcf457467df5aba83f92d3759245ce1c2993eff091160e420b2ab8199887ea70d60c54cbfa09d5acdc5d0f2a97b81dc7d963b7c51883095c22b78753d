"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
    value: mod,
    enumerable: !0
  }) : target, mod)),
  __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
    value: !0
  }), mod);
var Image_exports = {};
__export(Image_exports, {
  Image: () => Image
});
module.exports = __toCommonJS(Image_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_react = __toESM(require("react"), 1),
  import_constants = require("@tamagui/constants"),
  import_web = require("@tamagui/web"),
  import_react_native = require("react-native");
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var StyledImage = (0, import_web.styled)(import_react_native.Image, {
    name: "Image"
  }),
  hasWarned = !1,
  Image = StyledImage.styleable(function (inProps, ref) {
    var [props, style] = (0, import_web.usePropsAndStyle)(inProps),
      {
        src,
        source,
        objectFit,
        ...rest
      } = props;
    process.env.NODE_ENV === "development" && typeof src == "string" && (typeof props.width == "string" && props.width[0] !== "$" || typeof props.height == "string" && props.height[0] !== "$") && (hasWarned || (hasWarned = !0, console.warn('React Native expects a numerical width/height. If you want to use a percent you must define the "source" prop with width, height, and uri.')));
    var finalSource = typeof src == "string" ? {
      uri: src,
      ...(import_constants.isWeb && {
        width: props.width || style?.width,
        height: props.height || style?.height
      })
    } : source ?? src;
    if (finalSource && (typeof finalSource > "u" ? "undefined" : _type_of(finalSource)) === "object") {
      if (!Array.isArray(finalSource) && typeof finalSource.uri == "number" && (finalSource = finalSource.uri, source && (typeof source > "u" ? "undefined" : _type_of(source)) === "object" && !Array.isArray(source))) {
        var _style, _style1, _width;
        (_width = (_style = style).width) !== null && _width !== void 0 || (_style.width = source.width);
        var _height;
        (_height = (_style1 = style).height) !== null && _height !== void 0 || (_style1.height = source.height);
      }
      process.env.NODE_ENV === "development" && process.env.TAMAGUI_IMAGE_CHECK_ERROR && import_react.default.useEffect(function () {
        async function run() {
          if (typeof src == "string") try {
            await fetch(src).then(function (res) {
              return res.text();
            });
          } catch {
            console.error(`Error loading image: ${src}`, {
              props
            });
          }
        }
        run();
      }, [src]), finalSource.default && (finalSource = finalSource.default);
    }
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react_native.Image, {
      resizeMode: objectFit,
      ref,
      source: finalSource,
      style,
      ...rest
    });
  });
Image.getSize = import_react_native.Image.getSize;
Image.getSizeWithHeaders = import_react_native.Image.getSizeWithHeaders;
Image.prefetch = import_react_native.Image.prefetch;
Image.prefetchWithMetadata = import_react_native.Image.prefetchWithMetadata;
Image.abortPrefetch = import_react_native.Image.abortPrefetch;
Image.queryCache = import_react_native.Image.queryCache;
//# sourceMappingURL=Image.native.js.map
