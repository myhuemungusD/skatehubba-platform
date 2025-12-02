import { isWeb } from "@tamagui/constants";
import { getVariableValue, styled } from "@tamagui/core";
import { getSize } from "@tamagui/get-token";
import { composeEventHandlers } from "@tamagui/helpers";
import { YStack } from "@tamagui/stacks";
import * as React from "react";
import { ARROW_KEYS, PAGE_KEYS, useSliderContext } from "./constants";
import { jsx } from "react/jsx-runtime";
const SliderFrame = styled(YStack, {
  position: "relative",
  variants: {
    orientation: {
      horizontal: {},
      vertical: {}
    },
    size: (val, extras) => {
      if (!val)
        return;
      const orientation = extras.props.orientation, size = Math.round(getVariableValue(getSize(val)) / 6);
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
}), SliderImpl = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSlider,
      onSlideStart,
      onSlideMove,
      onSlideEnd,
      onHomeKeyDown,
      onEndKeyDown,
      onStepKeyDown,
      ...sliderProps
    } = props, context = useSliderContext(__scopeSlider);
    return /* @__PURE__ */ jsx(
      SliderFrame,
      {
        size: "$4",
        ...sliderProps,
        "data-orientation": sliderProps.orientation,
        ref: forwardedRef,
        ...isWeb && {
          onKeyDown: (event) => {
            event.key === "Home" ? (onHomeKeyDown(event), event.preventDefault()) : event.key === "End" ? (onEndKeyDown(event), event.preventDefault()) : PAGE_KEYS.concat(ARROW_KEYS).includes(event.key) && (onStepKeyDown(event), event.preventDefault());
          }
        },
        onMoveShouldSetResponderCapture: () => !0,
        onScrollShouldSetResponder: () => !0,
        onScrollShouldSetResponderCapture: () => !0,
        onMoveShouldSetResponder: () => !0,
        onStartShouldSetResponder: () => !0,
        onResponderTerminationRequest: () => !1,
        onResponderGrant: composeEventHandlers(props.onResponderGrant, (event) => {
          const target = event.target, thumbIndex = context.thumbs.get(target), isStartingOnThumb = thumbIndex !== void 0;
          isWeb && target instanceof HTMLElement && context.thumbs.has(target) && target.focus(), !isWeb && isStartingOnThumb && (context.valueIndexToChangeRef.current = thumbIndex), onSlideStart(event, isStartingOnThumb ? "thumb" : "track");
        }),
        onResponderMove: composeEventHandlers(props.onResponderMove, (event) => {
          event.stopPropagation(), onSlideMove(event);
        }),
        onResponderRelease: composeEventHandlers(props.onResponderRelease, (event) => {
          onSlideEnd(event);
        })
      }
    );
  }
);
export {
  SliderFrame,
  SliderImpl
};
//# sourceMappingURL=SliderImpl.js.map
