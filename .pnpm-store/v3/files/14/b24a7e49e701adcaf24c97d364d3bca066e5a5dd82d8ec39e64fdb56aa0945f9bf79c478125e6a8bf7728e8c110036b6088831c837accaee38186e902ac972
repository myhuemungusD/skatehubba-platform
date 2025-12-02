import React from "react";
import { useConfiguration } from "@tamagui/core";
import { useConstant } from "@tamagui/use-constant";
import { useControllableState } from "@tamagui/use-controllable-state";
function useSheetProviderProps(props, state, options = {}) {
  const handleRef = React.useRef(null),
    contentRef = React.useRef(null),
    [frameSize, setFrameSize] = React.useState(0),
    [maxContentSize, setMaxContentSize] = React.useState(0),
    snapPointsMode = props.snapPointsMode ?? "percent",
    snapPointsProp = props.snapPoints ?? (snapPointsMode === "percent" ? [80] : snapPointsMode === "constant" ? [256] : ["fit"]),
    hasFit = snapPointsProp[0] === "fit",
    snapPoints = React.useMemo(() => props.dismissOnSnapToBottom ? [...snapPointsProp, 0] : snapPointsProp, [JSON.stringify(snapPointsProp), props.dismissOnSnapToBottom]),
    [position_, setPositionImmediate] = useControllableState({
      prop: props.position,
      defaultProp: props.defaultPosition || (state.open ? 0 : -1),
      onChange: props.onPositionChange,
      strategy: "most-recent-wins"
    }),
    position = state.open === !1 ? -1 : position_,
    {
      open
    } = state,
    setPosition = React.useCallback(next => {
      props.dismissOnSnapToBottom && next === snapPoints.length - 1 ? state.setOpen(!1) : setPositionImmediate(next);
    }, [props.dismissOnSnapToBottom, snapPoints.length, setPositionImmediate, state.setOpen]);
  process.env.NODE_ENV === "development" && (snapPointsMode === "mixed" && snapPoints.some(p => {
    if (typeof p == "string") {
      if (p === "fit") return !1;
      if (p.endsWith("%")) {
        const n = Number(p.slice(0, -1));
        return n < 0 || n > 100;
      }
      return !0;
    }
    return typeof p != "number" || p < 0;
  }) && console.warn('\u26A0\uFE0F Invalid snapPoint given, snapPoints must be positive numeric values, string percentages between 0-100%, or "fit" when snapPointsMode is mixed'), snapPointsMode === "mixed" && snapPoints.indexOf("fit") > 0 && console.warn('\u26A0\uFE0F Invalid snapPoint given, "fit" must be the first/largest snap point when snapPointsMode is mixed'), snapPointsMode === "fit" && (snapPoints.length !== (props.dismissOnSnapToBottom ? 2 : 1) || snapPoints[0] !== "fit") && console.warn("\u26A0\uFE0F Invalid snapPoint given, there are no snap points when snapPointsMode is fit"), snapPointsMode === "constant" && snapPoints.some(p => typeof p != "number" || p < 0) && console.warn("\u26A0\uFE0F Invalid snapPoint given, snapPoints must be positive numeric values when snapPointsMode is constant"), snapPointsMode === "percent" && snapPoints.some(p => typeof p != "number" || p < 0 || p > 100) && console.warn("\u26A0\uFE0F Invalid snapPoint given, snapPoints must be numeric values between 0 and 100 when snapPointsMode is percent")), open && props.dismissOnSnapToBottom && position === snapPoints.length - 1 && setPositionImmediate(0);
  const shouldSetPositionOpen = open && position < 0;
  React.useEffect(() => {
    shouldSetPositionOpen && setPosition(0);
  }, [setPosition, shouldSetPositionOpen]);
  const {
    animationDriver
  } = useConfiguration();
  if (!animationDriver) throw new Error(process.env.NODE_ENV === "production" ? "\u274C 008" : "Must set animations in tamagui.config.ts");
  const scrollBridge = useConstant(() => {
      const parentDragListeners = /* @__PURE__ */new Set(),
        bridge = {
          hasScrollableContent: !1,
          enabled: !1,
          y: 0,
          paneY: 0,
          paneMinY: 0,
          scrollStartY: -1,
          drag: () => {},
          release: () => {},
          scrollLock: !1,
          isParentDragging: !1,
          onParentDragging: cb => (parentDragListeners.add(cb), () => {
            parentDragListeners.delete(cb);
          }),
          setParentDragging: val => {
            val !== bridge.isParentDragging && (bridge.isParentDragging = val, parentDragListeners.forEach(cb => cb(val)));
          }
        };
      return bridge;
    }),
    removeScrollEnabled = props.forceRemoveScrollEnabled ?? (open && props.modal),
    maxSnapPoint = snapPoints[0];
  return {
    screenSize: snapPointsMode === "percent" ? frameSize / ((typeof maxSnapPoint == "number" ? maxSnapPoint : 100) / 100) : maxContentSize,
    maxSnapPoint,
    removeScrollEnabled,
    scrollBridge,
    modal: !!props.modal,
    open: state.open,
    setOpen: state.setOpen,
    hidden: !!state.isHidden,
    contentRef,
    handleRef,
    frameSize,
    setFrameSize,
    dismissOnOverlayPress: props.dismissOnOverlayPress ?? !0,
    dismissOnSnapToBottom: props.dismissOnSnapToBottom ?? !1,
    onOverlayComponent: options.onOverlayComponent,
    scope: props.__scopeSheet,
    hasFit,
    position,
    snapPoints,
    snapPointsMode,
    setMaxContentSize,
    setPosition,
    setPositionImmediate,
    onlyShowFrame: !1
  };
}
export { useSheetProviderProps };
//# sourceMappingURL=useSheetProviderProps.mjs.map
