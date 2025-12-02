import { jsx as _jsx } from "react/jsx-runtime";
import { isWeb } from "@tamagui/constants";
import { getVariableValue, styled } from "@tamagui/core";
import { getSize } from "@tamagui/get-token";
import { composeEventHandlers } from "@tamagui/helpers";
import { YStack } from "@tamagui/stacks";
import * as React from "react";
import { ARROW_KEYS, PAGE_KEYS, useSliderContext } from "./constants.native.js";
function _instanceof(left, right) {
  return right != null && typeof Symbol < "u" && right[Symbol.hasInstance] ? !!right[Symbol.hasInstance](left) : left instanceof right;
}
var SliderFrame = styled(YStack, {
    position: "relative",
    variants: {
      orientation: {
        horizontal: {},
        vertical: {}
      },
      size: function (val, extras) {
        if (val) {
          var orientation = extras.props.orientation,
            size = Math.round(getVariableValue(getSize(val)) / 6);
          return orientation === "horizontal" ? {
            height: size,
            borderRadius: size,
            justifyContent: "center"
          } : {
            width: size,
            borderRadius: size,
            alignItems: "center"
          };
        }
      }
    }
  }),
  SliderImpl = /* @__PURE__ */React.forwardRef(function (props, forwardedRef) {
    var {
        __scopeSlider,
        onSlideStart,
        onSlideMove,
        onSlideEnd,
        onHomeKeyDown,
        onEndKeyDown,
        onStepKeyDown,
        ...sliderProps
      } = props,
      context = useSliderContext(__scopeSlider);
    return /* @__PURE__ */_jsx(SliderFrame, {
      size: "$4",
      ...sliderProps,
      "data-orientation": sliderProps.orientation,
      ref: forwardedRef,
      ...(isWeb && {
        onKeyDown: function (event) {
          event.key === "Home" ? (onHomeKeyDown(event), event.preventDefault()) : event.key === "End" ? (onEndKeyDown(event), event.preventDefault()) : PAGE_KEYS.concat(ARROW_KEYS).includes(event.key) && (onStepKeyDown(event), event.preventDefault());
        }
      }),
      onMoveShouldSetResponderCapture: function () {
        return !0;
      },
      onScrollShouldSetResponder: function () {
        return !0;
      },
      onScrollShouldSetResponderCapture: function () {
        return !0;
      },
      onMoveShouldSetResponder: function () {
        return !0;
      },
      onStartShouldSetResponder: function () {
        return !0;
      },
      // onStartShouldSetResponderCapture={() => true}
      onResponderTerminationRequest: function () {
        return !1;
      },
      onResponderGrant: composeEventHandlers(props.onResponderGrant, function (event) {
        var target = event.target,
          thumbIndex = context.thumbs.get(target),
          isStartingOnThumb = thumbIndex !== void 0;
        isWeb && _instanceof(target, HTMLElement) && context.thumbs.has(target) && target.focus(), !isWeb && isStartingOnThumb && (context.valueIndexToChangeRef.current = thumbIndex), onSlideStart(event, isStartingOnThumb ? "thumb" : "track");
      }),
      onResponderMove: composeEventHandlers(props.onResponderMove, function (event) {
        event.stopPropagation(), onSlideMove(event);
      }),
      onResponderRelease: composeEventHandlers(props.onResponderRelease, function (event) {
        onSlideEnd(event);
      })
    });
  });
export { SliderFrame, SliderImpl };
//# sourceMappingURL=SliderImpl.native.js.map
