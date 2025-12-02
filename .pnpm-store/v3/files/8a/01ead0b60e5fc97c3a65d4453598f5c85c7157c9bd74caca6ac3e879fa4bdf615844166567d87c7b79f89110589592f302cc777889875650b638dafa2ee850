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
var Avatar_exports = {};
__export(Avatar_exports, {
  Avatar: () => Avatar,
  AvatarFallback: () => AvatarFallback,
  AvatarFallbackFrame: () => AvatarFallbackFrame,
  AvatarFrame: () => AvatarFrame,
  AvatarImage: () => AvatarImage,
  createAvatarScope: () => createAvatarScope
});
module.exports = __toCommonJS(Avatar_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_core = require("@tamagui/core"),
  import_create_context = require("@tamagui/create-context"),
  import_helpers = require("@tamagui/helpers"),
  import_image = require("@tamagui/image"),
  import_shapes = require("@tamagui/shapes"),
  import_stacks = require("@tamagui/stacks"),
  React = __toESM(require("react"), 1),
  AVATAR_NAME = "Avatar",
  [createAvatarContext, createAvatarScope] = (0, import_create_context.createContextScope)(AVATAR_NAME),
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
      shapeSize = (0, import_core.getVariableValue)((_getShapeSize = (0, import_shapes.getShapeSize)(context.size,
      // @ts-expect-error
      {
        tokens: (0, import_core.getTokens)()
      })) === null || _getShapeSize === void 0 ? void 0 : _getShapeSize.width);
    return React.useEffect(function () {
      setStatus(src ? "idle" : "error");
    }, [JSON.stringify(src)]), React.useEffect(function () {
      onLoadingStatusChange(status), context.onImageLoadingStatusChange(status);
    }, [status]), src ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_stacks.YStack, {
      fullscreen: !0,
      zIndex: 1,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_image.Image, {
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
  AvatarFallbackFrame = (0, import_core.styled)(import_stacks.YStack, {
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
    }, [delayMs]), canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(AvatarFallbackFrame, {
      ...fallbackProps,
      ref: forwardedRef
    }) : null;
  }));
AvatarFallback.displayName = FALLBACK_NAME;
var AvatarFrame = (0, import_core.styled)(import_shapes.Square, {
    name: AVATAR_NAME,
    position: "relative",
    overflow: "hidden"
  }),
  Avatar = (0, import_helpers.withStaticProperties)(/* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeAvatar,
        size = "$true",
        ...avatarProps
      } = props,
      [imageLoadingStatus, setImageLoadingStatus] = React.useState("idle");
    return /* @__PURE__ */(0, import_jsx_runtime.jsx)(AvatarProvider, {
      size,
      scope: __scopeAvatar,
      imageLoadingStatus,
      onImageLoadingStatusChange: setImageLoadingStatus,
      children: /* @__PURE__ */(0, import_jsx_runtime.jsx)(AvatarFrame, {
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
//# sourceMappingURL=Avatar.native.js.map
