import React from "react";
import { useConfiguration } from "@tamagui/core";
import { useConstant } from "@tamagui/use-constant";
import { useControllableState } from "@tamagui/use-controllable-state";
function useSheetProviderProps(props, state) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    handleRef = React.useRef(null),
    contentRef = React.useRef(null),
    [frameSize, setFrameSize] = React.useState(0),
    [maxContentSize, setMaxContentSize] = React.useState(0),
    _props_snapPointsMode,
    snapPointsMode = (_props_snapPointsMode = props.snapPointsMode) !== null && _props_snapPointsMode !== void 0 ? _props_snapPointsMode : "percent",
    _props_snapPoints,
    snapPointsProp = (_props_snapPoints = props.snapPoints) !== null && _props_snapPoints !== void 0 ? _props_snapPoints : snapPointsMode === "percent" ? [80] : snapPointsMode === "constant" ? [256] : ["fit"],
    hasFit = snapPointsProp[0] === "fit",
    snapPoints = React.useMemo(function () {
      return props.dismissOnSnapToBottom ? [...snapPointsProp, 0] : snapPointsProp;
    }, [JSON.stringify(snapPointsProp), props.dismissOnSnapToBottom]),
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
    setPosition = React.useCallback(function (next) {
      props.dismissOnSnapToBottom && next === snapPoints.length - 1 ? state.setOpen(!1) : setPositionImmediate(next);
    }, [props.dismissOnSnapToBottom, snapPoints.length, setPositionImmediate, state.setOpen]);
  process.env.NODE_ENV === "development" && (snapPointsMode === "mixed" && snapPoints.some(function (p) {
    if (typeof p == "string") {
      if (p === "fit") return !1;
      if (p.endsWith("%")) {
        var n = Number(p.slice(0, -1));
        return n < 0 || n > 100;
      }
      return !0;
    }
    return typeof p != "number" || p < 0;
  }) && console.warn('\u26A0\uFE0F Invalid snapPoint given, snapPoints must be positive numeric values, string percentages between 0-100%, or "fit" when snapPointsMode is mixed'), snapPointsMode === "mixed" && snapPoints.indexOf("fit") > 0 && console.warn('\u26A0\uFE0F Invalid snapPoint given, "fit" must be the first/largest snap point when snapPointsMode is mixed'), snapPointsMode === "fit" && (snapPoints.length !== (props.dismissOnSnapToBottom ? 2 : 1) || snapPoints[0] !== "fit") && console.warn("\u26A0\uFE0F Invalid snapPoint given, there are no snap points when snapPointsMode is fit"), snapPointsMode === "constant" && snapPoints.some(function (p) {
    return typeof p != "number" || p < 0;
  }) && console.warn("\u26A0\uFE0F Invalid snapPoint given, snapPoints must be positive numeric values when snapPointsMode is constant"), snapPointsMode === "percent" && snapPoints.some(function (p) {
    return typeof p != "number" || p < 0 || p > 100;
  }) && console.warn("\u26A0\uFE0F Invalid snapPoint given, snapPoints must be numeric values between 0 and 100 when snapPointsMode is percent")), open && props.dismissOnSnapToBottom && position === snapPoints.length - 1 && setPositionImmediate(0);
  var shouldSetPositionOpen = open && position < 0;
  React.useEffect(function () {
    shouldSetPositionOpen && setPosition(0);
  }, [setPosition, shouldSetPositionOpen]);
  var {
    animationDriver
  } = useConfiguration();
  if (!animationDriver) throw new Error(process.env.NODE_ENV === "production" ? "\u274C 008" : "Must set animations in tamagui.config.ts");
  var scrollBridge = useConstant(function () {
      var parentDragListeners = /* @__PURE__ */new Set(),
        bridge = {
          hasScrollableContent: !1,
          enabled: !1,
          y: 0,
          paneY: 0,
          paneMinY: 0,
          scrollStartY: -1,
          drag: function () {},
          release: function () {},
          scrollLock: !1,
          isParentDragging: !1,
          onParentDragging: function (cb) {
            return parentDragListeners.add(cb), function () {
              parentDragListeners.delete(cb);
            };
          },
          setParentDragging: function (val) {
            val !== bridge.isParentDragging && (bridge.isParentDragging = val, parentDragListeners.forEach(function (cb) {
              return cb(val);
            }));
          }
        };
      return bridge;
    }),
    _props_forceRemoveScrollEnabled,
    removeScrollEnabled = (_props_forceRemoveScrollEnabled = props.forceRemoveScrollEnabled) !== null && _props_forceRemoveScrollEnabled !== void 0 ? _props_forceRemoveScrollEnabled : open && props.modal,
    maxSnapPoint = snapPoints[0],
    screenSize = snapPointsMode === "percent" ? frameSize / ((typeof maxSnapPoint == "number" ? maxSnapPoint : 100) / 100) : maxContentSize,
    _props_dismissOnOverlayPress,
    _props_dismissOnSnapToBottom,
    providerProps = {
      screenSize,
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
      dismissOnOverlayPress: (_props_dismissOnOverlayPress = props.dismissOnOverlayPress) !== null && _props_dismissOnOverlayPress !== void 0 ? _props_dismissOnOverlayPress : !0,
      dismissOnSnapToBottom: (_props_dismissOnSnapToBottom = props.dismissOnSnapToBottom) !== null && _props_dismissOnSnapToBottom !== void 0 ? _props_dismissOnSnapToBottom : !1,
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
  return providerProps;
}
export { useSheetProviderProps };
//# sourceMappingURL=useSheetProviderProps.native.js.map
