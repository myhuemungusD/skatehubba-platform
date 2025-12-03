import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { isWeb } from "@tamagui/constants";
import { styled, usePropsAndStyle } from "@tamagui/core";
import { Image as RNImage } from "react-native";
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var StyledImage = styled(RNImage, {
    name: "Image"
  }),
  hasWarned = !1,
  Image = StyledImage.styleable(function (inProps, ref) {
    var [props, style] = usePropsAndStyle(inProps),
      {
        src,
        source,
        objectFit,
        ...rest
      } = props;
    process.env.NODE_ENV === "development" && typeof src == "string" && (typeof props.width == "string" && props.width[0] !== "$" || typeof props.height == "string" && props.height[0] !== "$") && (hasWarned || (hasWarned = !0, console.warn('React Native expects a numerical width/height. If you want to use a percent you must define the "source" prop with width, height, and uri.')));
    var finalSource = typeof src == "string" ? {
      uri: src,
      ...(isWeb && {
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
      process.env.NODE_ENV === "development" && process.env.TAMAGUI_IMAGE_CHECK_ERROR && React.useEffect(function () {
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
    return /* @__PURE__ */_jsx(RNImage, {
      resizeMode: objectFit,
      ref,
      source: finalSource,
      style,
      ...rest
    });
  });
Image.getSize = RNImage.getSize;
Image.getSizeWithHeaders = RNImage.getSizeWithHeaders;
Image.prefetch = RNImage.prefetch;
Image.prefetchWithMetadata = RNImage.prefetchWithMetadata;
Image.abortPrefetch = RNImage.abortPrefetch;
Image.queryCache = RNImage.queryCache;
export { Image };
//# sourceMappingURL=Image.native.js.map
