import { getTokens, getVariableValue, styled } from "@tamagui/core";
import { createContextScope } from "@tamagui/create-context";
import { withStaticProperties } from "@tamagui/helpers";
import { Image } from "@tamagui/image";
import { Square, getShapeSize } from "@tamagui/shapes";
import { YStack } from "@tamagui/stacks";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
const AVATAR_NAME = "Avatar", [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME), [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME), IMAGE_NAME = "AvatarImage", AvatarImage = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props, context = useAvatarContext(IMAGE_NAME, __scopeAvatar), [status, setStatus] = React.useState("idle"), shapeSize = getVariableValue(
      getShapeSize(
        context.size,
        // @ts-expect-error
        { tokens: getTokens() }
      )?.width
    );
    return React.useEffect(() => {
      setStatus(src ? "idle" : "error");
    }, [JSON.stringify(src)]), React.useEffect(() => {
      onLoadingStatusChange(status), context.onImageLoadingStatusChange(status);
    }, [status]), src ? /* @__PURE__ */ jsx(YStack, { fullscreen: !0, zIndex: 1, children: /* @__PURE__ */ jsx(
      Image,
      {
        fullscreen: !0,
        ...typeof shapeSize == "number" && !Number.isNaN(shapeSize) && {
          width: shapeSize,
          height: shapeSize
        },
        ...imageProps,
        ref: forwardedRef,
        src,
        onError: () => {
          setStatus("error");
        },
        onLoad: () => {
          setStatus("loaded");
        }
      }
    ) }) : null;
  }
);
AvatarImage.displayName = IMAGE_NAME;
const FALLBACK_NAME = "AvatarFallback", AvatarFallbackFrame = styled(YStack, {
  name: FALLBACK_NAME,
  position: "absolute",
  fullscreen: !0,
  zIndex: 0
}), AvatarFallback = AvatarFallbackFrame.extractable(
  React.forwardRef(
    (props, forwardedRef) => {
      const { __scopeAvatar, delayMs, ...fallbackProps } = props, context = useAvatarContext(FALLBACK_NAME, __scopeAvatar), [canRender, setCanRender] = React.useState(delayMs === void 0);
      return React.useEffect(() => {
        if (delayMs !== void 0) {
          const timerId = setTimeout(() => setCanRender(!0), delayMs);
          return () => clearTimeout(timerId);
        }
      }, [delayMs]), canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsx(AvatarFallbackFrame, { ...fallbackProps, ref: forwardedRef }) : null;
    }
  )
);
AvatarFallback.displayName = FALLBACK_NAME;
const AvatarFrame = styled(Square, {
  name: AVATAR_NAME,
  position: "relative",
  overflow: "hidden"
}), Avatar = withStaticProperties(
  React.forwardRef(
    (props, forwardedRef) => {
      const { __scopeAvatar, size = "$true", ...avatarProps } = props, [imageLoadingStatus, setImageLoadingStatus] = React.useState("idle");
      return /* @__PURE__ */ jsx(
        AvatarProvider,
        {
          size,
          scope: __scopeAvatar,
          imageLoadingStatus,
          onImageLoadingStatusChange: setImageLoadingStatus,
          children: /* @__PURE__ */ jsx(AvatarFrame, { size, ...avatarProps, ref: forwardedRef })
        }
      );
    }
  ),
  {
    Image: AvatarImage,
    Fallback: AvatarFallback
  }
);
Avatar.displayName = AVATAR_NAME;
export {
  Avatar,
  AvatarFallback,
  AvatarFallbackFrame,
  AvatarFrame,
  AvatarImage,
  createAvatarScope
};
//# sourceMappingURL=Avatar.js.map
