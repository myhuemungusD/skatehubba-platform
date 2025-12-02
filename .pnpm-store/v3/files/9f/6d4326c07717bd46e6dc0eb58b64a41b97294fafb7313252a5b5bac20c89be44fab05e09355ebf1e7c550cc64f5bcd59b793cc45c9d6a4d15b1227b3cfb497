import { jsx as _jsx } from "react/jsx-runtime";
import { getTokens, getVariableValue, styled } from "@tamagui/core";
import { createContextScope } from "@tamagui/create-context";
import { withStaticProperties } from "@tamagui/helpers";
import { Image } from "@tamagui/image";
import { Square, getShapeSize } from "@tamagui/shapes";
import { YStack } from "@tamagui/stacks";
import * as React from "react";
var AVATAR_NAME = "Avatar",
  [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME),
  [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME),
  IMAGE_NAME = "AvatarImage",
  AvatarImage = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var _getShapeSize,
      {
        __scopeAvatar,
        src,
        onLoadingStatusChange = function () {},
        ...imageProps
      } = props,
      context = useAvatarContext(IMAGE_NAME, __scopeAvatar),
      [status, setStatus] = React.useState("idle"),
      shapeSize = getVariableValue((_getShapeSize = getShapeSize(context.size,
      // @ts-expect-error
      {
        tokens: getTokens()
      })) === null || _getShapeSize === void 0 ? void 0 : _getShapeSize.width);
    return React.useEffect(function () {
      setStatus(src ? "idle" : "error");
    }, [JSON.stringify(src)]), React.useEffect(function () {
      onLoadingStatusChange(status), context.onImageLoadingStatusChange(status);
    }, [status]), src ? /* @__PURE__ */_jsx(YStack, {
      fullscreen: !0,
      zIndex: 1,
      children: /* @__PURE__ */_jsx(Image, {
        fullscreen: !0,
        ...(typeof shapeSize == "number" && !Number.isNaN(shapeSize) && {
          width: shapeSize,
          height: shapeSize
        }),
        ...imageProps,
        // @ts-ignore
        ref: forwardedRef,
        // @ts-ignore
        src,
        // onLoadStart={() => {
        //   // setStatus('loading')
        // }}
        onError: function () {
          setStatus("error");
        },
        onLoad: function () {
          setStatus("loaded");
        }
      })
    }) : null;
  });
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback",
  AvatarFallbackFrame = styled(YStack, {
    name: FALLBACK_NAME,
    position: "absolute",
    fullscreen: !0,
    zIndex: 0
  }),
  AvatarFallback = AvatarFallbackFrame.extractable(/* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeAvatar,
        delayMs,
        ...fallbackProps
      } = props,
      context = useAvatarContext(FALLBACK_NAME, __scopeAvatar),
      [canRender, setCanRender] = React.useState(delayMs === void 0);
    return React.useEffect(function () {
      if (delayMs !== void 0) {
        var timerId = setTimeout(function () {
          return setCanRender(!0);
        }, delayMs);
        return function () {
          return clearTimeout(timerId);
        };
      }
    }, [delayMs]), canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */_jsx(AvatarFallbackFrame, {
      ...fallbackProps,
      ref: forwardedRef
    }) : null;
  }));
AvatarFallback.displayName = FALLBACK_NAME;
var AvatarFrame = styled(Square, {
    name: AVATAR_NAME,
    position: "relative",
    overflow: "hidden"
  }),
  Avatar = withStaticProperties(/* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeAvatar,
        size = "$true",
        ...avatarProps
      } = props,
      [imageLoadingStatus, setImageLoadingStatus] = React.useState("idle");
    return /* @__PURE__ */_jsx(AvatarProvider, {
      size,
      scope: __scopeAvatar,
      imageLoadingStatus,
      onImageLoadingStatusChange: setImageLoadingStatus,
      children: /* @__PURE__ */_jsx(AvatarFrame, {
        size,
        ...avatarProps,
        ref: forwardedRef
      })
    });
  }), {
    Image: AvatarImage,
    Fallback: AvatarFallback
  });
Avatar.displayName = AVATAR_NAME;
export { Avatar, AvatarFallback, AvatarFallbackFrame, AvatarFrame, AvatarImage, createAvatarScope };
//# sourceMappingURL=Avatar.native.js.map
