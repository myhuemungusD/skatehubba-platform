import React from "react";
import { isWeb } from "@tamagui/constants";
import { styled, usePropsAndStyle } from "@tamagui/core";
import { Image as RNImage } from "react-native-web";
import { jsx } from "react/jsx-runtime";
const StyledImage = styled(RNImage, {
  name: "Image"
});
let hasWarned = !1;
const Image = StyledImage.styleable((inProps, ref) => {
  const [props, style] = usePropsAndStyle(inProps),
    {
      src,
      source,
      objectFit,
      ...rest
    } = props;
  process.env.NODE_ENV === "development" && typeof src == "string" && (typeof props.width == "string" && props.width[0] !== "$" || typeof props.height == "string" && props.height[0] !== "$") && (hasWarned || (hasWarned = !0, console.warn('React Native expects a numerical width/height. If you want to use a percent you must define the "source" prop with width, height, and uri.')));
  let finalSource = typeof src == "string" ? {
    uri: src,
    ...(isWeb && {
      width: props.width || style?.width,
      height: props.height || style?.height
    })
  } : source ?? src;
  return finalSource && typeof finalSource == "object" && (process.env.NODE_ENV === "development" && process.env.TAMAGUI_IMAGE_CHECK_ERROR && React.useEffect(() => {
    async function run() {
      if (typeof src == "string") try {
        await fetch(src).then(res => res.text());
      } catch {
        console.error(`Error loading image: ${src}`, {
          props
        });
      }
    }
    run();
  }, [src]), finalSource.default && (finalSource = finalSource.default)), /* @__PURE__ */jsx(RNImage, {
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
//# sourceMappingURL=Image.mjs.map
