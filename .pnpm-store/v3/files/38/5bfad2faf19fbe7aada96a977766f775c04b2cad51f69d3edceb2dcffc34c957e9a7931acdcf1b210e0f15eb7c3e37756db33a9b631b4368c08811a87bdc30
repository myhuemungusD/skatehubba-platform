import { composeRefs, useComposedRefs } from "@tamagui/compose-refs";
import { isClient, isWeb } from "@tamagui/constants";
import { useCreateShallowSetState, getTokens, getVariableValue, styled } from "@tamagui/core";
import { getSize } from "@tamagui/get-token";
import { withStaticProperties } from "@tamagui/helpers";
import { clamp, composeEventHandlers } from "@tamagui/helpers";
import { ThemeableStack } from "@tamagui/stacks";
import { useControllableState } from "@tamagui/use-controllable-state";
import { useDirection } from "@tamagui/use-direction";
import * as React from "react";
import { ARROW_KEYS, BACK_KEYS, PAGE_KEYS, SLIDER_NAME, SliderOrientationProvider, SliderProvider, useSliderContext, useSliderOrientationContext } from "./constants.mjs";
import { convertValueToPercentage, getClosestValueIndex, getDecimalCount, getLabel, getNextSortedValues, getThumbInBoundsOffset, hasMinStepsBetweenValues, linearScale, roundValue } from "./helpers.mjs";
import { SliderFrame, SliderImpl } from "./SliderImpl.mjs";
import { jsx } from "react/jsx-runtime";
const activeSliderMeasureListeners = /* @__PURE__ */new Set();
isWeb && isClient && (process.env.TAMAGUI_DISABLE_SLIDER_INTERVAL || setInterval?.(() => {
  activeSliderMeasureListeners.forEach(cb => cb());
},
// really doesn't need to be super often
1e3));
const SliderHorizontal = React.forwardRef((props, forwardedRef) => {
  const {
      min,
      max,
      dir,
      onSlideStart,
      onSlideMove,
      onStepKeyDown,
      onSlideEnd,
      ...sliderProps
    } = props,
    direction = useDirection(dir),
    isDirectionLTR = direction === "ltr",
    sliderRef = React.useRef(null),
    [state, setState_] = React.useState(() => ({
      size: 0,
      offset: 0
    })),
    setState = useCreateShallowSetState(setState_);
  function getValueFromPointer(pointerPosition) {
    const input = [0, state.size];
    return linearScale(input, isDirectionLTR ? [min, max] : [max, min])(pointerPosition);
  }
  const measure = () => {
    sliderRef.current?.measure((_x, _y, width, _height, pageX, _pageY) => {
      setState({
        size: width,
        offset: pageX
      });
    });
  };
  return isClient && (useOnDebouncedWindowResize(measure), React.useEffect(() => {
    const node = sliderRef.current;
    if (!node) return;
    let measureTm;
    const debouncedMeasure = () => {
        clearTimeout(measureTm), measureTm = setTimeout(() => {
          measure();
        }, 200);
      },
      io = new IntersectionObserver(entries => {
        debouncedMeasure(), entries?.[0].isIntersecting ? activeSliderMeasureListeners.add(debouncedMeasure) : activeSliderMeasureListeners.delete(debouncedMeasure);
      }, {
        root: null,
        // Use the viewport as the container.
        rootMargin: "0px",
        threshold: [0, 0.5, 1]
      });
    return io.observe(node), () => {
      activeSliderMeasureListeners.delete(debouncedMeasure), io.disconnect();
    };
  }, [])), /* @__PURE__ */jsx(SliderOrientationProvider, {
    scope: props.__scopeSlider,
    startEdge: isDirectionLTR ? "left" : "right",
    endEdge: isDirectionLTR ? "right" : "left",
    direction: isDirectionLTR ? 1 : -1,
    sizeProp: "width",
    size: state.size,
    children: /* @__PURE__ */jsx(SliderImpl, {
      ref: composeRefs(forwardedRef, sliderRef),
      dir: direction,
      ...sliderProps,
      orientation: "horizontal",
      onLayout: measure,
      onSlideStart: (event, target) => {
        const value = getValueFromPointer(event.nativeEvent.locationX);
        value && onSlideStart?.(value, target, event);
      },
      onSlideMove: event => {
        const value = getValueFromPointer(event.nativeEvent.pageX - state.offset);
        value && onSlideMove?.(value, event);
      },
      onSlideEnd: event => {
        const value = getValueFromPointer(event.nativeEvent.pageX - state.offset);
        value && onSlideEnd?.(event, value);
      },
      onStepKeyDown: event => {
        const isBackKey = BACK_KEYS[direction].includes(event.key);
        onStepKeyDown?.({
          event,
          direction: isBackKey ? -1 : 1
        });
      }
    })
  });
});
function useOnDebouncedWindowResize(callback, amt = 200) {
  React.useEffect(() => {
    let last;
    const onResize = () => {
      clearTimeout(last), last = setTimeout(callback, amt);
    };
    return window.addEventListener("resize", onResize), () => {
      clearTimeout(last), window.removeEventListener("resize", onResize);
    };
  }, []);
}
const SliderVertical = React.forwardRef((props, forwardedRef) => {
    const {
        min,
        max,
        onSlideStart,
        onSlideMove,
        onStepKeyDown,
        onSlideEnd,
        ...sliderProps
      } = props,
      [state, setState_] = React.useState(() => ({
        size: 0,
        offset: 0
      })),
      setState = useCreateShallowSetState(setState_),
      sliderRef = React.useRef(null);
    function getValueFromPointer(pointerPosition) {
      const input = [0, state.size];
      return linearScale(input, [max, min])(pointerPosition);
    }
    const measure = () => {
      sliderRef.current?.measure((_x, _y, _width, height, _pageX, pageY) => {
        setState({
          size: height,
          offset: pageY
        });
      });
    };
    return isClient && useOnDebouncedWindowResize(measure), /* @__PURE__ */jsx(SliderOrientationProvider, {
      scope: props.__scopeSlider,
      startEdge: "bottom",
      endEdge: "top",
      sizeProp: "height",
      size: state.size,
      direction: 1,
      children: /* @__PURE__ */jsx(SliderImpl, {
        ref: composeRefs(forwardedRef, sliderRef),
        ...sliderProps,
        orientation: "vertical",
        onLayout: measure,
        onSlideStart: (event, target) => {
          const value = getValueFromPointer(event.nativeEvent.locationY);
          value && onSlideStart?.(value, target, event);
        },
        onSlideMove: event => {
          const value = getValueFromPointer(event.nativeEvent.pageY - state.offset);
          value && onSlideMove?.(value, event);
        },
        onSlideEnd: event => {
          const value = getValueFromPointer(event.nativeEvent.pageY - state.offset);
          onSlideEnd?.(event, value);
        },
        onStepKeyDown: event => {
          const isBackKey = BACK_KEYS.ltr.includes(event.key);
          onStepKeyDown?.({
            event,
            direction: isBackKey ? -1 : 1
          });
        }
      })
    });
  }),
  TRACK_NAME = "SliderTrack",
  SliderTrackFrame = styled(SliderFrame, {
    name: "SliderTrack",
    variants: {
      unstyled: {
        false: {
          height: "100%",
          width: "100%",
          backgroundColor: "$background",
          position: "relative",
          borderRadius: 1e5,
          overflow: "hidden"
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  SliderTrack = React.forwardRef((props, forwardedRef) => {
    const {
        __scopeSlider,
        ...trackProps
      } = props,
      context = useSliderContext(__scopeSlider);
    return /* @__PURE__ */jsx(SliderTrackFrame, {
      "data-disabled": context.disabled ? "" : void 0,
      "data-orientation": context.orientation,
      orientation: context.orientation,
      size: context.size,
      ...trackProps,
      ref: forwardedRef
    });
  });
SliderTrack.displayName = TRACK_NAME;
const RANGE_NAME = "SliderTrackActive",
  SliderTrackActiveFrame = styled(SliderFrame, {
    name: "SliderTrackActive",
    backgroundColor: "$background",
    position: "absolute",
    pointerEvents: "box-none"
  }),
  SliderTrackActive = React.forwardRef((props, forwardedRef) => {
    const {
        __scopeSlider,
        ...rangeProps
      } = props,
      context = useSliderContext(__scopeSlider),
      orientation = useSliderOrientationContext(__scopeSlider),
      ref = React.useRef(null),
      composedRefs = useComposedRefs(forwardedRef, ref),
      valuesCount = context.values.length,
      percentages = context.values.map(value => convertValueToPercentage(value, context.min, context.max)),
      offsetStart = valuesCount > 1 ? Math.min(...percentages) : 0,
      offsetEnd = 100 - Math.max(...percentages);
    return /* @__PURE__ */jsx(SliderTrackActiveFrame, {
      orientation: context.orientation,
      "data-orientation": context.orientation,
      "data-disabled": context.disabled ? "" : void 0,
      size: context.size,
      animateOnly: ["left", "top", "right", "bottom"],
      ...rangeProps,
      ref: composedRefs,
      [orientation.startEdge]: `${offsetStart}%`,
      [orientation.endEdge]: `${offsetEnd}%`,
      ...(orientation.sizeProp === "width" ? {
        height: "100%"
      } : {
        left: 0,
        right: 0
      })
    });
  });
SliderTrackActive.displayName = RANGE_NAME;
const getThumbSize = val => {
    const tokens = getTokens(),
      size = typeof val == "number" ? val : getSize(tokens.size[val], {
        shift: -1
      });
    return {
      width: size,
      height: size,
      minWidth: size,
      minHeight: size
    };
  },
  SliderThumbFrame = styled(ThemeableStack, {
    name: "SliderThumb",
    variants: {
      size: {
        "...size": getThumbSize
      },
      unstyled: {
        false: {
          position: "absolute",
          bordered: 2,
          borderWidth: 2,
          backgrounded: !0,
          pressTheme: isWeb,
          focusTheme: isWeb,
          hoverTheme: isWeb
        }
      }
    },
    defaultVariants: {
      unstyled: process.env.TAMAGUI_HEADLESS === "1"
    }
  }),
  SliderThumb = SliderThumbFrame.styleable(function (props, forwardedRef) {
    const {
        __scopeSlider,
        index,
        circular,
        size: sizeProp,
        ...thumbProps
      } = props,
      context = useSliderContext(__scopeSlider),
      orientation = useSliderOrientationContext(__scopeSlider),
      [thumb, setThumb] = React.useState(null),
      composedRefs = useComposedRefs(forwardedRef, setThumb),
      value = context.values[index],
      percent = value === void 0 ? 0 : convertValueToPercentage(value, context.min, context.max),
      label = getLabel(index, context.values.length),
      sizeIn = sizeProp ?? context.size ?? "$true",
      [size, setSize] = React.useState(() => getVariableValue(getThumbSize(sizeIn).width)),
      thumbInBoundsOffset = size ? getThumbInBoundsOffset(size, percent, orientation.direction) : 0;
    React.useEffect(() => {
      if (thumb) return context.thumbs.set(thumb, index), () => {
        context.thumbs.delete(thumb);
      };
    }, [thumb, context.thumbs, index]);
    const positionalStyles = context.orientation === "horizontal" ? {
      x: thumbInBoundsOffset - size / 2,
      y: -size / 2,
      top: "50%",
      ...(size === 0 && {
        top: "auto",
        bottom: "auto"
      })
    } : {
      x: -size / 2,
      y: size / 2,
      left: "50%",
      ...(size === 0 && {
        left: "auto",
        right: "auto"
      })
    };
    return /* @__PURE__ */jsx(SliderThumbFrame, {
      ref: composedRefs,
      role: "slider",
      "aria-label": props["aria-label"] || label,
      "aria-valuemin": context.min,
      "aria-valuenow": value,
      "aria-valuemax": context.max,
      "aria-orientation": context.orientation,
      "data-orientation": context.orientation,
      "data-disabled": context.disabled ? "" : void 0,
      tabIndex: context.disabled ? void 0 : 0,
      animateOnly: ["transform", "left", "top", "right", "bottom"],
      ...positionalStyles,
      [orientation.startEdge]: `${percent}%`,
      size: sizeIn,
      circular,
      ...thumbProps,
      onLayout: e => {
        setSize(e.nativeEvent.layout[orientation.sizeProp]);
      },
      onFocus: composeEventHandlers(props.onFocus, () => {
        context.valueIndexToChangeRef.current = index;
      })
    });
  }, {
    staticConfig: {
      memo: !0
    }
  }),
  SliderComponent = React.forwardRef((props, forwardedRef) => {
    const {
        name,
        min = 0,
        max = 100,
        step = 1,
        orientation = "horizontal",
        disabled = !1,
        minStepsBetweenThumbs = 0,
        defaultValue = [min],
        value,
        onValueChange = () => {},
        size: sizeProp,
        onSlideEnd,
        onSlideMove,
        onSlideStart,
        ...sliderProps
      } = props,
      sliderRef = React.useRef(null),
      composedRefs = useComposedRefs(sliderRef, forwardedRef),
      thumbRefs = React.useRef(/* @__PURE__ */new Map()),
      valueIndexToChangeRef = React.useRef(0),
      isHorizontal = orientation === "horizontal",
      [values = [], setValues] = useControllableState({
        prop: value,
        defaultProp: defaultValue,
        transition: !0,
        onChange: value2 => {
          updateThumbFocus(valueIndexToChangeRef.current), onValueChange(value2);
        }
      });
    isWeb && React.useEffect(() => {
      const node = sliderRef.current;
      if (!node) return;
      const preventDefault = e => {
        e.preventDefault();
      };
      return node.addEventListener("touchstart", preventDefault), () => {
        node.removeEventListener("touchstart", preventDefault);
      };
    }, []);
    function updateThumbFocus(focusIndex) {
      if (isWeb) {
        for (const [node, index] of thumbRefs.current.entries()) if (index === focusIndex) {
          node.focus();
          return;
        }
      }
    }
    function handleSlideMove(value2, event) {
      updateValues(value2, valueIndexToChangeRef.current), onSlideMove?.(event, value2);
    }
    function updateValues(value2, atIndex) {
      const decimalCount = getDecimalCount(step),
        snapToStep = roundValue(Math.round((value2 - min) / step) * step + min, decimalCount),
        nextValue = clamp(snapToStep, [min, max]);
      setValues((prevValues = []) => {
        const nextValues = getNextSortedValues(prevValues, nextValue, atIndex);
        return hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs * step) ? (valueIndexToChangeRef.current = nextValues.indexOf(nextValue), String(nextValues) === String(prevValues) ? prevValues : nextValues) : prevValues;
      });
    }
    const SliderOriented = isHorizontal ? SliderHorizontal : SliderVertical;
    return /* @__PURE__ */jsx(SliderProvider, {
      scope: props.__scopeSlider,
      disabled,
      min,
      max,
      valueIndexToChangeRef,
      thumbs: thumbRefs.current,
      values,
      orientation,
      size: sizeProp,
      children: /* @__PURE__ */jsx(SliderOriented, {
        "aria-disabled": disabled,
        "data-disabled": disabled ? "" : void 0,
        ...sliderProps,
        ref: composedRefs,
        min,
        max,
        onSlideEnd,
        onSlideStart: disabled ? void 0 : (value2, target, event) => {
          if (target !== "thumb") {
            const closestIndex = getClosestValueIndex(values, value2);
            updateValues(value2, closestIndex);
          }
          onSlideStart?.(event, value2, target);
        },
        onSlideMove: disabled ? void 0 : handleSlideMove,
        onHomeKeyDown: () => !disabled && updateValues(min, 0),
        onEndKeyDown: () => !disabled && updateValues(max, values.length - 1),
        onStepKeyDown: ({
          event,
          direction: stepDirection
        }) => {
          if (!disabled) {
            const multiplier = PAGE_KEYS.includes(event.key) || event.shiftKey && ARROW_KEYS.includes(event.key) ? 10 : 1,
              atIndex = valueIndexToChangeRef.current,
              value2 = values[atIndex],
              stepInDirection = step * multiplier * stepDirection;
            updateValues(value2 + stepInDirection, atIndex);
          }
        }
      })
    });
  }),
  Slider = withStaticProperties(SliderComponent, {
    Track: SliderTrack,
    TrackActive: SliderTrackActive,
    Thumb: SliderThumb
  });
Slider.displayName = SLIDER_NAME;
const Track = SliderTrack,
  Range = SliderTrackActive,
  Thumb = SliderThumb;
export { Range, Slider, SliderThumb, SliderThumbFrame, SliderTrack, SliderTrackActive, SliderTrackActiveFrame, SliderTrackFrame, Thumb, Track };
//# sourceMappingURL=Slider.mjs.map
