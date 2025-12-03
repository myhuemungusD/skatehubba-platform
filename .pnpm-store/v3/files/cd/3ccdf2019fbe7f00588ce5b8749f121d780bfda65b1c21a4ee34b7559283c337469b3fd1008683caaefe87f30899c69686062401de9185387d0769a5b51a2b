import { createStyledContext } from "@tamagui/core";
const SLIDER_NAME = "Slider",
  SliderContext = createStyledContext({
    size: "$true",
    min: 0,
    max: 100,
    orientation: "horizontal"
  }),
  {
    Provider: SliderProvider,
    useStyledContext: useSliderContext
  } = SliderContext,
  {
    Provider: SliderOrientationProvider,
    useStyledContext: useSliderOrientationContext
  } = createStyledContext({
    startEdge: "left",
    endEdge: "right",
    sizeProp: "width",
    size: 0,
    direction: 1
  }),
  PAGE_KEYS = ["PageUp", "PageDown"],
  ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
  BACK_KEYS = {
    ltr: ["ArrowDown", "Home", "ArrowLeft", "PageDown"],
    rtl: ["ArrowDown", "Home", "ArrowRight", "PageDown"]
  };
export { ARROW_KEYS, BACK_KEYS, PAGE_KEYS, SLIDER_NAME, SliderContext, SliderOrientationProvider, SliderProvider, useSliderContext, useSliderOrientationContext };
//# sourceMappingURL=constants.mjs.map
