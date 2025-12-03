var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: !0
}), mod);
var constants_exports = {};
__export(constants_exports, {
  ARROW_KEYS: () => ARROW_KEYS,
  BACK_KEYS: () => BACK_KEYS,
  PAGE_KEYS: () => PAGE_KEYS,
  SLIDER_NAME: () => SLIDER_NAME,
  SliderContext: () => SliderContext,
  SliderOrientationProvider: () => SliderOrientationProvider,
  SliderProvider: () => SliderProvider,
  useSliderContext: () => useSliderContext,
  useSliderOrientationContext: () => useSliderOrientationContext
});
module.exports = __toCommonJS(constants_exports);
var import_core = require("@tamagui/core");
const SLIDER_NAME = "Slider",
  SliderContext = (0, import_core.createStyledContext)({
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
  } = (0, import_core.createStyledContext)({
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