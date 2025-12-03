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
var createComponent_exports = {};
__export(createComponent_exports, {
  Spacer: () => Spacer,
  Unspaced: () => Unspaced,
  componentSetStates: () => componentSetStates,
  createComponent: () => createComponent,
  spacedChildren: () => spacedChildren
});
module.exports = __toCommonJS(createComponent_exports);
var import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_helpers = require("@tamagui/helpers"),
  import_is_equal_shallow = require("@tamagui/is-equal-shallow"),
  import_react = __toESM(require("react"), 1),
  import_config = require("./config.cjs"),
  import_constants2 = require("./constants/constants.cjs"),
  import_isDevTools = require("./constants/isDevTools.cjs"),
  import_ComponentContext = require("./contexts/ComponentContext.cjs"),
  import_GroupContext = require("./contexts/GroupContext.cjs"),
  import_createVariable = require("./createVariable.cjs"),
  import_defaultComponentState = require("./defaultComponentState.cjs"),
  import_getSplitStyles = require("./helpers/getSplitStyles.cjs"),
  import_log = require("./helpers/log.cjs"),
  import_mergeProps = require("./helpers/mergeProps.cjs"),
  import_objectIdentityKey = require("./helpers/objectIdentityKey.cjs"),
  import_setElementProps = require("./helpers/setElementProps.cjs"),
  import_subscribeToContextGroup = require("./helpers/subscribeToContextGroup.cjs"),
  import_themeable = require("./helpers/themeable.cjs"),
  import_wrapStyleTags = require("./helpers/wrapStyleTags.cjs"),
  import_useComponentState = require("./hooks/useComponentState.cjs"),
  import_useMedia = require("./hooks/useMedia.cjs"),
  import_useTheme = require("./hooks/useTheme.cjs"),
  import_setupHooks = require("./setupHooks.cjs"),
  import_Slot = require("./views/Slot.cjs"),
  import_Theme = require("./views/Theme.cjs"),
  import_jsx_runtime = require("react/jsx-runtime");
let time, debugKeyListeners, startVisualizer;
const componentSetStates = /* @__PURE__ */new Set(),
  avoidReRenderKeys = /* @__PURE__ */new Set(["hover", "press", "pressIn", "group", "focus", "focusWithin", "media", "group"]);
if (typeof window < "u") {
  const cancelTouches = () => {
    componentSetStates.forEach(setState => setState(prev => prev.press || prev.pressIn ? {
      ...prev,
      press: !1,
      pressIn: !1
    } : prev)), componentSetStates.clear();
  };
  addEventListener("mouseup", cancelTouches), addEventListener("touchend", cancelTouches), addEventListener("touchcancel", cancelTouches), process.env.NODE_ENV === "development" && (startVisualizer = () => {
    const devVisualizerConfig = import_config.devConfig?.visualizer;
    if (devVisualizerConfig && !globalThis.__tamaguiDevVisualizer) {
      let show = function (val) {
          clearTimeout(tm), isShowing = val, debugKeyListeners?.forEach(l => l(val)), !val && resizeListener && (window.removeEventListener("resize", resizeListener), resizeListener = null);
        },
        cancelShow = function () {
          clearTimeout(tm), resizeListener && (window.removeEventListener("resize", resizeListener), resizeListener = null);
        };
      globalThis.__tamaguiDevVisualizer = !0, debugKeyListeners = /* @__PURE__ */new Set();
      let tm,
        isShowing = !1,
        resizeListener = null;
      const options = {
        key: "Alt",
        delay: 800,
        ...(typeof devVisualizerConfig == "object" ? devVisualizerConfig : {})
      };
      window.addEventListener("blur", () => {
        show(!1);
      }), window.addEventListener("keydown", ({
        key,
        metaKey,
        defaultPrevented
      }) => {
        clearTimeout(tm), !defaultPrevented && (metaKey || key === options.key && (resizeListener || (resizeListener = () => cancelShow(), window.addEventListener("resize", resizeListener)), tm = setTimeout(() => {
          show(!0);
        }, options.delay)));
      }), window.addEventListener("keyup", ({
        defaultPrevented
      }) => {
        defaultPrevented || (cancelShow(), isShowing && show(!1));
      });
    }
  });
}
let BaseText, BaseView;
const lastInteractionWasKeyboard = {
  value: !1
};
import_constants.isWeb && typeof document < "u" && (document.addEventListener("keydown", () => {
  lastInteractionWasKeyboard.value || (lastInteractionWasKeyboard.value = !0);
}), document.addEventListener("mousedown", () => {
  lastInteractionWasKeyboard.value && (lastInteractionWasKeyboard.value = !1);
}), document.addEventListener("mousemove", () => {
  lastInteractionWasKeyboard.value && (lastInteractionWasKeyboard.value = !1);
}));
function createComponent(staticConfig) {
  const {
    componentName
  } = staticConfig;
  let config = null,
    defaultProps = staticConfig.defaultProps;
  (0, import_config.onConfiguredOnce)(conf => {
    if (config = conf, componentName) {
      const defaultForComponent = conf.defaultProps?.[componentName];
      defaultForComponent && (defaultProps = {
        ...defaultForComponent,
        ...defaultProps
      });
    }
  });
  const {
    Component,
    isText,
    isZStack,
    isHOC
  } = staticConfig;
  process.env.NODE_ENV === "development" && staticConfig.defaultProps?.debug && process.env.IS_STATIC !== "is_static" && (0, import_log.log)(`\u{1F41B} [${componentName || "Component"}]`, {
    staticConfig,
    defaultProps,
    defaultPropsKeyOrder: defaultProps ? Object.keys(defaultProps) : []
  });
  const component = import_react.default.forwardRef((propsIn, forwardedRef) => {
    const internalID = process.env.NODE_ENV === "development" ? import_react.default.useId() : "";
    process.env.NODE_ENV === "development" && startVisualizer && (startVisualizer(), startVisualizer = void 0), process.env.NODE_ENV === "test" && propsIn["data-test-renders"] && (propsIn["data-test-renders"].current ??= 0, propsIn["data-test-renders"].current += 1);
    const {
        context,
        isReactNative
      } = staticConfig,
      debugProp = propsIn.debug,
      styledContextValue = context ? import_react.default.useContext(context) : void 0;
    let overriddenContextProps = null;
    !process.env.TAMAGUI_IS_CORE_NODE && process.env.NODE_ENV === "development" && debugProp === "profile" && !time && (time = require("@tamagui/timer").timer().start(), globalThis.time = time), process.env.NODE_ENV === "development" && time && time`non-tamagui time (ignore)`;
    let props = propsIn;
    if (styledContextValue || defaultProps) {
      const [nextProps, overrides] = (0, import_mergeProps.mergeComponentProps)(defaultProps, styledContextValue, propsIn);
      nextProps && (props = nextProps), overriddenContextProps = overrides;
    }
    const componentName2 = props.componentName || staticConfig.componentName;
    process.env.NODE_ENV === "development" && import_constants.isClient && import_react.default.useEffect(() => {
      let node,
        overlay = null;
      const remove = () => {
          if (overlay) try {
            overlay.parentNode?.removeChild(overlay), overlay = null;
          } catch {}
        },
        debugVisualizerHandler = (show = !1) => {
          if (node = stateRef.current.host, !!node) if (show) {
            overlay || (overlay = document.createElement("span"), overlay.style.inset = "0px", overlay.style.zIndex = "1000000", overlay.style.position = "absolute", overlay.style.borderColor = "red", overlay.style.borderWidth = "1px", overlay.style.borderStyle = "dotted");
            const dataAt = node.getAttribute("data-at") || "",
              dataIn = node.getAttribute("data-in") || "",
              tooltip = document.createElement("span");
            tooltip.style.position = "absolute", tooltip.style.top = "0px", tooltip.style.left = "0px", tooltip.style.padding = "3px", tooltip.style.background = "rgba(0,0,0,0.75)", tooltip.style.color = "rgba(255,255,255,1)", tooltip.style.fontSize = "12px", tooltip.style.lineHeight = "12px", tooltip.style.fontFamily = "monospace", tooltip.innerText = `${componentName2 || ""} ${dataAt} ${dataIn}`.trim(), overlay.appendChild(tooltip), node.appendChild(overlay);
          } else remove();
        };
      return debugKeyListeners ||= /* @__PURE__ */new Set(), debugKeyListeners.add(debugVisualizerHandler), () => {
        remove(), debugKeyListeners?.delete(debugVisualizerHandler);
      };
    }, [componentName2]);
    const componentContext = import_react.default.useContext(import_ComponentContext.ComponentContext),
      groupContextParent = import_react.default.useContext(import_GroupContext.GroupContext),
      animationDriver = componentContext.animationDriver,
      useAnimations = animationDriver?.useAnimations,
      componentState = (0, import_useComponentState.useComponentState)(props, animationDriver?.isStub ? null : animationDriver, staticConfig, config),
      {
        disabled,
        groupName,
        hasAnimationProp,
        hasEnterStyle,
        isAnimated,
        isExiting,
        isHydrated,
        presence,
        presenceState,
        setState,
        noClass,
        state,
        stateRef,
        supportsCSS,
        willBeAnimated,
        willBeAnimatedClient,
        startedUnhydrated
      } = componentState;
    hasAnimationProp && animationDriver?.avoidReRenders && (0, import_constants.useIsomorphicLayoutEffect)(() => {
      const pendingState = stateRef.current.nextState;
      pendingState && (stateRef.current.nextState = void 0, componentState.setStateShallow(pendingState));
    });
    const allGroupContexts = (0, import_react.useMemo)(() => {
      if (!groupName || props.passThrough) return groupContextParent;
      const listeners = /* @__PURE__ */new Set();
      return stateRef.current.group?.listeners?.clear(), stateRef.current.group = {
        listeners,
        emit(state2) {
          listeners.forEach(l => l(state2));
        },
        subscribe(cb) {
          return listeners.add(cb), listeners.size === 1 && setStateShallow({
            hasDynGroupChildren: !0
          }), () => {
            listeners.delete(cb), listeners.size === 0 && setStateShallow({
              hasDynGroupChildren: !1
            });
          };
        }
      }, {
        ...groupContextParent,
        [groupName]: {
          state: {
            pseudo: import_defaultComponentState.defaultComponentStateMounted
          },
          subscribe: listener => {
            const dispose = stateRef.current.group?.subscribe(listener);
            return () => {
              dispose?.();
            };
          }
        }
      };
    }, [stateRef, groupName, groupContextParent]);
    let setStateShallow = componentState.setStateShallow;
    process.env.NODE_ENV === "development" && time && time`use-state`;
    const hasTextAncestor = !!(import_constants.isWeb && isText && componentContext.inText),
      isTaggable = !Component || typeof Component == "string",
      tagProp = props.tag,
      element = import_constants.isWeb && isTaggable && tagProp || Component,
      BaseTextComponent = BaseText || element || "span",
      BaseViewComponent = BaseView || element || (hasTextAncestor ? "span" : "div");
    let elementType = isText ? BaseTextComponent : BaseViewComponent;
    animationDriver && isAnimated &&
    // this should really be behind another prop as it's not really related to
    // "needsWebStyles" basically with motion we just animate a plain div, but
    // we still have animated.View/Text for Sheet which wants to control
    // things declaratively
    !animationDriver.needsWebStyles && (elementType = animationDriver[isText ? "Text" : "View"] || elementType);
    const disableTheme = props["data-disable-theme"] || isHOC;
    process.env.NODE_ENV === "development" && time && time`theme-props`, props.themeShallow && (stateRef.current.themeShallow = !0);
    const themeStateProps = {
      componentName: componentName2,
      disable: disableTheme,
      shallow: stateRef.current.themeShallow,
      debug: debugProp
    };
    if ("themeInverse" in props && (themeStateProps.inverse = props.themeInverse), "theme" in props && (themeStateProps.name = props.theme), typeof stateRef.current.isListeningToTheme == "boolean" && (themeStateProps.needsUpdate = () => !!stateRef.current.isListeningToTheme), process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile") {
      const name = `${componentName2 || Component?.displayName || Component?.name || "[Unnamed Component]"}`,
        type = (hasEnterStyle ? "(hasEnter)" : " ") + (isAnimated ? "(animated)" : " ") + (isReactNative ? "(rnw)" : " ") + (noClass ? "(noClass)" : " ") + (state.press || state.pressIn ? "(PRESSED)" : " ") + (state.hover ? "(HOVERED)" : " ") + (state.focus ? "(FOCUSED)" : " ") + (state.focusWithin ? "(WITHIN FOCUSED)" : " ") + (presenceState?.isPresent === !1 ? "(EXIT)" : ""),
        dataIs = propsIn["data-is"] || "",
        banner = `<${name} /> ${internalID} ${dataIs ? ` ${dataIs}` : ""} ${type.trim()} (hydrated: ${isHydrated}) (unmounted: ${state.unmounted})`,
        ch = propsIn.children;
      let childLog = typeof ch == "string" ? ch.length > 4 ? ch.slice(0, 4) + "..." : ch : "";
      childLog.length && (childLog = `(children: ${childLog})`), import_constants.isWeb ? (console.info(`%c ${banner}`, "background: green; color: white;"), import_constants.isServer ? (0, import_log.log)({
        noClass,
        isAnimated,
        isWeb: import_constants.isWeb,
        supportsCSS
      }) : (console.groupEnd(), console.groupCollapsed(`${childLog} [inspect props, state, context \u{1F447}]`), (0, import_log.log)("props in:", propsIn), (0, import_log.log)("final props:", props, Object.keys(props)), (0, import_log.log)({
        state,
        staticConfig,
        elementType,
        themeStateProps
      }), (0, import_log.log)({
        context,
        overriddenContextProps,
        componentContext
      }), (0, import_log.log)({
        presence,
        isAnimated,
        isHOC,
        hasAnimationProp,
        useAnimations
      }), console.groupEnd())) : (console.info(`

------------------------------
${banner}
------------------------------
`), (0, import_log.log)("children:", props.children), (0, import_log.log)({
        overriddenContextProps,
        styledContextValue
      }), (0, import_log.log)({
        noClass,
        isAnimated,
        isWeb: import_constants.isWeb,
        supportsCSS
      }));
    }
    process.env.NODE_ENV === "development" && time && time`pre-theme-media`;
    const [theme, themeState] = (0, import_useTheme.useThemeWithState)(themeStateProps);
    process.env.NODE_ENV === "development" && time && time`theme`, elementType = Component || elementType;
    const isStringElement = typeof elementType == "string",
      mediaState = (0, import_useMedia.useMedia)(componentContext, debugProp);
    (0, import_createVariable.setDidGetVariableValue)(!1), process.env.NODE_ENV === "development" && time && time`media`;
    const resolveValues =
      // if HOC + mounted + has animation prop, resolve as value so it passes non-variable to child
      isAnimated && !supportsCSS || isHOC && state.unmounted == !1 && hasAnimationProp ? "value" : "auto",
      styleProps = {
        mediaState,
        noClass,
        resolveValues,
        isExiting,
        isAnimated,
        willBeAnimated,
        styledContext: styledContextValue
      },
      themeName = themeState?.name || "";
    process.env.NODE_ENV === "development" && time && time`split-styles-prepare`;
    const splitStyles = (0, import_getSplitStyles.useSplitStyles)(props, staticConfig, theme, themeName, state, styleProps, null, componentContext, allGroupContexts, elementType, startedUnhydrated, debugProp),
      isPassthrough = !splitStyles;
    let contextForOverride = staticConfig.context;
    if (splitStyles?.overriddenContextProps) {
      const contextForProps = staticConfig.context || staticConfig.parentStaticConfig?.context;
      if (contextForProps) {
        for (const key in splitStyles.overriddenContextProps) overriddenContextProps ||= {}, overriddenContextProps[key] = splitStyles.overriddenContextProps[key];
        staticConfig.context || (contextForOverride = contextForProps);
      }
    }
    const groupContext = groupName && allGroupContexts?.[groupName] || null;
    if (!isPassthrough && groupContext &&
    // avoids onLayout if we don't need it
    props.containerType !== "normal") {
      const groupState = groupContext?.state;
      groupState && groupState.layout === void 0 && (splitStyles.style?.width || splitStyles.style?.height) && (groupState.layout = {
        width: fromPx(splitStyles.style.width),
        height: fromPx(splitStyles.style.height)
      });
    }
    if (!isPassthrough && (hasAnimationProp || groupName) && animationDriver?.avoidReRenders) {
      let updateGroupListeners = function () {
        const updatedState = stateRef.current.nextState;
        if (groupContext) {
          const {
            group,
            hasDynGroupChildren,
            unmounted,
            animation,
            ...childrenGroupState
          } = updatedState;
          notifyGroupSubscribers(groupContext, stateRef.current.group || null, childrenGroupState);
        }
      };
      const ogSetStateShallow = setStateShallow;
      stateRef.current.updateStyleListener = () => {
        const updatedState = stateRef.current.nextState || state,
          mediaState2 = stateRef.current.nextMedia,
          nextStyles = (0, import_getSplitStyles.getSplitStyles)(props, staticConfig, theme, themeName, updatedState, mediaState2 ? {
            ...styleProps,
            mediaState: mediaState2
          } : styleProps, null, componentContext, allGroupContexts, elementType, startedUnhydrated, debugProp),
          useStyleListener = stateRef.current.useStyleListener;
        useStyleListener?.(nextStyles?.style || {});
      }, componentContext.mediaEmit ||= next => {
        stateRef.current.nextMedia = next, stateRef.current.updateStyleListener?.();
      }, stateRef.current.setStateShallow = nextOrGetNext => {
        const prev = stateRef.current.nextState || state,
          next = typeof nextOrGetNext == "function" ? nextOrGetNext(prev) : nextOrGetNext;
        if (next === prev || (0, import_is_equal_shallow.isEqualShallow)(prev, next)) return;
        const canAvoidReRender = Object.keys(next).every(key => avoidReRenderKeys.has(key)),
          updatedState = {
            ...prev,
            ...next
          };
        stateRef.current.nextState = updatedState, canAvoidReRender ? (process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile" && (console.groupCollapsed("[\u26A1\uFE0F] avoid setState", componentName2, next, {
          updatedState,
          props
        }), console.info(stateRef.current.host), console.groupEnd()), updateGroupListeners(), stateRef.current.updateStyleListener?.()) : (process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile" && console.info("[\u{1F40C}] re-render", {
          canAvoidReRender,
          next
        }), ogSetStateShallow(next));
      }, setStateShallow = state2 => {
        stateRef.current.setStateShallow?.(state2);
      };
    }
    process.env.NODE_ENV === "development" && time && time`split-styles`, splitStyles && (props.group && props.untilMeasured === "hide" && !stateRef.current.hasMeasured && (splitStyles.style ||= {}, splitStyles.style.opacity = 0), splitStyles.dynamicThemeAccess != null && (stateRef.current.isListeningToTheme = splitStyles.dynamicThemeAccess));
    const hasRuntimeMediaKeys = splitStyles?.hasMedia && splitStyles.hasMedia !== !0,
      shouldListenForMedia = (0, import_createVariable.didGetVariableValue)() || hasRuntimeMediaKeys || noClass && splitStyles?.hasMedia === !0,
      mediaListeningKeys = hasRuntimeMediaKeys ? splitStyles.hasMedia : null;
    process.env.NODE_ENV === "development" && debugProp === "verbose" && console.info("useMedia() createComponent", shouldListenForMedia, mediaListeningKeys), (0, import_useMedia.setMediaShouldUpdate)(componentContext, shouldListenForMedia, mediaListeningKeys);
    const {
        viewProps: viewPropsIn,
        pseudos,
        style: splitStylesStyle,
        classNames,
        space,
        pseudoGroups,
        mediaGroups
      } = splitStyles || {},
      propsWithAnimation = props,
      {
        asChild,
        children,
        themeShallow,
        spaceDirection: _spaceDirection,
        onPress,
        onLongPress,
        onPressIn,
        onPressOut,
        onHoverIn,
        onHoverOut,
        onMouseUp,
        onMouseDown,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        separator,
        // ignore from here on out
        passThrough,
        forceStyle: _forceStyle,
        // @ts-ignore  for next/link compat etc
        onClick,
        theme: _themeProp,
        ...nonTamaguiProps
      } = viewPropsIn || {};
    let viewProps = nonTamaguiProps;
    !isTaggable && props.forceStyle && (viewProps.forceStyle = props.forceStyle), isHOC && (typeof _themeProp < "u" && (viewProps.theme = _themeProp), typeof passThrough < "u" && (viewProps.passThrough = passThrough)), tagProp && elementType.acceptTagProp && (viewProps.tag = tagProp);
    let animationStyles;
    const shouldUseAnimation =
    // if it supports css vars we run it on server too to get matching initial style
    (supportsCSS ? willBeAnimatedClient : willBeAnimated) && useAnimations && !isHOC;
    let animatedRef;
    if (shouldUseAnimation) {
      const useStyleEmitter = animationDriver?.avoidReRenders ? listener => {
          stateRef.current.useStyleListener = listener;
        } : void 0,
        animations = useAnimations({
          props: propsWithAnimation,
          // if hydrating, send empty style
          style: splitStylesStyle || {},
          // @ts-ignore
          styleState: splitStyles,
          useStyleEmitter,
          presence,
          componentState: state,
          styleProps,
          theme,
          pseudos: pseudos || null,
          staticConfig,
          stateRef
        });
      animations && (animations.ref && (animatedRef = animations.ref), isHydrated && animations && (animationStyles = animations.style, viewProps.style = animationStyles, animations.className && (viewProps.className = `${state.unmounted === "should-enter" ? "t_unmounted " : ""}${viewProps.className || ""} ${animations.className}`))), process.env.NODE_ENV === "development" && time && time`animations`;
    }
    process.env.NODE_ENV === "development" && props.untilMeasured && !props.group && console.warn(`You set the untilMeasured prop without setting group. This doesn't work, be sure to set untilMeasured on the parent that sets group, not the children that use the $group- prop.

If you meant to do this, you can disable this warning - either change untilMeasured and group at the same time, or do group={conditional ? 'name' : undefined}`), process.env.NODE_ENV === "development" && time && time`destructure`, !isPassthrough && groupContext &&
    // avoids onLayout if we don't need it
    props.containerType !== "normal" && (nonTamaguiProps.onLayout = (0, import_helpers.composeEventHandlers)(nonTamaguiProps.onLayout, e => {
      const layout = e.nativeEvent.layout;
      groupContext.state.layout = layout, stateRef.current.group?.emit({
        layout
      }), !stateRef.current.hasMeasured && props.untilMeasured === "hide" && setState(prev => ({
        ...prev
      })), stateRef.current.hasMeasured = !0;
    })), viewProps = import_setupHooks.hooks.usePropsTransform?.(elementType, nonTamaguiProps, stateRef, stateRef.current.willHydrate) || nonTamaguiProps, stateRef.current.composedRef || (stateRef.current.composedRef = (0, import_compose_refs.composeRefs)(x => stateRef.current.host = x, forwardedRef, import_setElementProps.setElementProps, animatedRef)), viewProps.ref = stateRef.current.composedRef, process.env.NODE_ENV === "development" && !isReactNative && !isText && import_constants.isWeb && !isHOC && import_react.default.Children.toArray(props.children).forEach(item => {
      typeof item == "string" && item !== `
` && console.error(`Unexpected text node: ${item}. A text node cannot be a child of a <${staticConfig.componentName || propsIn.tag || "View"}>.`, props);
    }), process.env.NODE_ENV === "development" && time && time`events-hooks`;
    const unPress = () => {
      setStateShallow({
        press: !1,
        pressIn: !1
      });
    };
    process.env.NODE_ENV === "development" && import_constants.isWeb && (0, import_constants.useIsomorphicLayoutEffect)(() => {
      if (debugProp === "verbose") {
        let cssStyleDeclarationToObject = function (style) {
          const styleObject = {};
          for (let i = 0; i < style.length; i++) {
            let prop = style[i];
            styleObject[prop] = style.getPropertyValue(prop);
          }
          return styleObject;
        };
        const computed = stateRef.current.host ? cssStyleDeclarationToObject(getComputedStyle(stateRef.current.host)) : {};
        console.groupCollapsed(`Rendered > (opacity: ${computed.opacity})`), console.warn(stateRef.current.host), console.warn(computed), console.groupEnd();
      }
    }), (0, import_constants.useIsomorphicLayoutEffect)(() => {
      if (state.unmounted === !0 && hasEnterStyle) {
        setStateShallow({
          unmounted: "should-enter"
        });
        return;
      }
      let tm;
      if (state.unmounted) {
        if (animationDriver?.supportsCSS || import_constants.isAndroid) return tm = setTimeout(() => {
          setStateShallow({
            unmounted: !1
          });
        }), () => clearTimeout(tm);
        setStateShallow({
          unmounted: !1
        });
        return;
      }
      return () => {
        componentSetStates.delete(setState);
      };
    }, [state.unmounted, disabled]), (0, import_constants.useIsomorphicLayoutEffect)(() => {
      if (!disabled && !(!pseudoGroups && !mediaGroups) && allGroupContexts) return (0, import_subscribeToContextGroup.subscribeToContextGroup)({
        groupContext: allGroupContexts,
        setStateShallow,
        mediaGroups,
        pseudoGroups
      });
    }, [allGroupContexts, disabled, pseudoGroups ? (0, import_objectIdentityKey.objectIdentityKey)(pseudoGroups) : 0, mediaGroups ? (0, import_objectIdentityKey.objectIdentityKey)(mediaGroups) : 0]);
    const groupEmitter = stateRef.current.group;
    (0, import_constants.useIsomorphicLayoutEffect)(() => {
      !groupContext || !groupEmitter || notifyGroupSubscribers(groupContext, groupEmitter, state);
    }, [groupContext, groupEmitter, state]);
    const runtimePressStyle = !disabled && noClass && pseudos?.pressStyle,
      runtimeFocusStyle = !disabled && noClass && pseudos?.focusStyle,
      runtimeFocusVisibleStyle = !disabled && noClass && pseudos?.focusVisibleStyle,
      attachFocus = !!(runtimePressStyle || runtimeFocusStyle || runtimeFocusVisibleStyle || onFocus || onBlur || componentContext.setParentFocusState),
      hasDynamicGroupChildren = !!(groupName && state.hasDynGroupChildren),
      attachPress = !!(hasDynamicGroupChildren || runtimePressStyle || onPress || onPressOut || onPressIn || onMouseDown || onMouseUp || onLongPress || onClick || pseudos?.focusVisibleStyle),
      runtimeHoverStyle = !disabled && noClass && pseudos?.hoverStyle,
      needsHoverState = !!(hasDynamicGroupChildren || runtimeHoverStyle),
      attachHover = import_constants.isWeb && !!(hasDynamicGroupChildren || needsHoverState || onMouseEnter || onMouseLeave),
      shouldAttach = !disabled && !props.asChild && !!(attachFocus || attachPress || attachHover || runtimePressStyle || runtimeHoverStyle || runtimeFocusStyle),
      needsPressState = !!(hasDynamicGroupChildren || runtimePressStyle);
    process.env.NODE_ENV === "development" && time && time`events-setup`, process.env.NODE_ENV === "development" && debugProp === "verbose" && (0, import_log.log)("\u{1FAA9} events()", {
      runtimeFocusStyle,
      runtimePressStyle,
      runtimeHoverStyle,
      runtimeFocusVisibleStyle,
      attachPress,
      attachFocus,
      attachHover,
      shouldAttach,
      needsHoverState,
      pseudos
    });
    const events = shouldAttach ? {
      onPressOut: attachPress ? e => {
        unPress(), onPressOut?.(e), onMouseUp?.(e);
      } : void 0,
      ...((attachHover || attachPress) && {
        onMouseEnter: e => {
          const next = {};
          needsHoverState && (next.hover = !0), needsPressState && state.pressIn && (next.press = !0), setStateShallow(next), onHoverIn?.(e), onMouseEnter?.(e);
        },
        onMouseLeave: e => {
          const next = {};
          needsHoverState && (next.hover = !1), needsPressState && (next.press = !1, next.pressIn = !1), setStateShallow(next), onHoverOut?.(e), onMouseLeave?.(e);
        }
      }),
      onPressIn: attachPress ? e => {
        needsPressState && setStateShallow({
          press: !0,
          pressIn: !0
        }), onPressIn?.(e), onMouseDown?.(e), import_constants.isWeb && componentSetStates.add(setState);
      } : void 0,
      onPress: attachPress ? e => {
        unPress(), import_constants.isWeb && onClick?.(e), onPress?.(e), onLongPress?.(e);
      } : void 0,
      ...(attachFocus && {
        onFocus: e => {
          const next = {};
          componentContext.setParentFocusState && (next.focusWithin = !0), pseudos?.focusVisibleStyle && lastInteractionWasKeyboard.value ? next.focusVisible = !0 : next.focus = !0, setStateShallow(next), onFocus?.(e);
        },
        onBlur: e => {
          componentContext.setParentFocusState && componentContext.setParentFocusState({
            focusWithin: !1
          }), setStateShallow({
            focus: !1,
            focusVisible: !1,
            focusWithin: !1
          }), onBlur?.(e);
        }
      })
    } : null;
    events && !isReactNative && Object.assign(viewProps, getWebEvents(events)), process.env.NODE_ENV === "development" && time && time`events`, process.env.NODE_ENV === "development" && debugProp === "verbose" && (0, import_log.log)("events", {
      events,
      attachHover,
      attachPress
    }), import_setupHooks.hooks.useEvents?.(viewProps, events, splitStyles, setStateShallow, staticConfig);
    const direction = props.spaceDirection || "both";
    process.env.NODE_ENV === "development" && time && time`hooks`;
    let content = !children || asChild || !splitStyles ? children : spacedChildren({
      separator,
      children,
      space,
      direction,
      isZStack,
      debug: debugProp
    });
    if (asChild) {
      elementType = import_Slot.Slot;
      {
        const passEvents = getWebEvents({
          onPress,
          onLongPress,
          onPressIn,
          onPressOut,
          onMouseUp,
          onMouseDown,
          onMouseEnter,
          onMouseLeave
        }, asChild === "web" || asChild === "except-style-web");
        Object.assign(viewProps, passEvents);
      }
    }
    process.env.NODE_ENV === "development" && time && time`spaced-as-child`, isPassthrough && (content = propsIn.children, elementType = BaseViewComponent, viewProps = {
      style: {
        display: "contents"
      }
    });
    let useChildrenResult;
    import_setupHooks.hooks.useChildren && (useChildrenResult = import_setupHooks.hooks.useChildren(elementType, content, viewProps)), process.env.NODE_ENV === "development" && time && time`use-children`, useChildrenResult ? content = useChildrenResult : content = import_react.default.createElement(elementType, viewProps, content);
    const ResetPresence = config?.animations?.ResetPresence,
      needsReset = !!(
      // not when passing down to child
      !asChild &&
      // not when passThrough
      splitStyles &&
      // not when HOC
      !isHOC && ResetPresence && willBeAnimated && (hasEnterStyle || presenceState)),
      hasEverReset = stateRef.current.hasEverResetPresence;
    if (needsReset && !hasEverReset && (stateRef.current.hasEverResetPresence = !0), (needsReset || hasEverReset) && ResetPresence && (content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(ResetPresence, {
      disabled: !needsReset,
      children: content
    })), process.env.NODE_ENV === "development" && time && time`create-element`, "focusWithinStyle" in propsIn && (content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_ComponentContext.ComponentContext.Provider, {
      ...componentContext,
      setParentFocusState: setStateShallow,
      children: content
    })), "group" in props && (content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_GroupContext.GroupContext.Provider, {
      value: allGroupContexts,
      children: content
    })), process.env.NODE_ENV === "development" && time && time`group-context`, content = disableTheme || !splitStyles ? content : (0, import_Theme.getThemedChildren)(themeState, content, themeStateProps, !1, stateRef), process.env.NODE_ENV === "development" && time && time`themed-children`, isReactNative && !asChild && (content = /* @__PURE__ */(0, import_jsx_runtime.jsx)("span", {
      className: "_dsp_contents",
      ...(!isPassthrough && isHydrated && events && getWebEvents(events)),
      children: content
    })), overriddenContextProps && contextForOverride) {
      const Provider = contextForOverride.Provider;
      for (const key in styledContextValue) key in overriddenContextProps || (overriddenContextProps[key] = styledContextValue[key]);
      debugProp && console.info("overriddenContextProps", overriddenContextProps), content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(Provider, {
        __disableMergeDefaultValues: !0,
        ...overriddenContextProps,
        children: content
      });
    }
    if (process.env.NODE_ENV === "development" && time && time`context-override`, startedUnhydrated && splitStyles && (content = /* @__PURE__ */(0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
      children: [content, isHydrated ? null : (0, import_wrapStyleTags.getStyleTags)(Object.values(splitStyles.rulesToInsert))]
    })), process.env.NODE_ENV === "development" && time && time`style-tags`, process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile") {
      const title = `render <${typeof elementType == "string" ? elementType : "Component"} /> (${internalID}) with props`;
      if (import_constants.isWeb) {
        console.groupCollapsed(title);
        try {
          (0, import_log.log)("viewProps", viewProps), (0, import_log.log)("children", content), typeof window < "u" && (0, import_log.log)({
            propsIn,
            props,
            attachPress,
            animationStyles,
            classNames,
            content,
            defaultProps,
            elementType,
            events,
            isAnimated,
            hasRuntimeMediaKeys,
            isStringElement,
            mediaListeningKeys,
            pseudos,
            shouldAttach,
            noClass,
            shouldListenForMedia,
            splitStyles,
            splitStylesStyle,
            state,
            stateRef,
            staticConfig,
            styleProps,
            themeState,
            viewProps,
            willBeAnimated,
            startedUnhydrated
          });
        } catch {} finally {
          console.groupEnd();
        }
      } else {
        (0, import_log.log)(title), (0, import_log.log)("state: ", state), import_isDevTools.isDevTools && (0, import_log.log)("viewProps", viewProps), (0, import_log.log)("final styles:");
        for (const key in splitStylesStyle) (0, import_log.log)(key, splitStylesStyle[key]);
      }
      if (debugProp === "break") debugger;
    }
    return process.env.NODE_ENV === "development" && time && (time`rest`, globalThis.willPrint || (globalThis.willPrint = !0, setTimeout(() => {
      delete globalThis.willPrint, time.print(), time = null;
    }, 50))), content;
  });
  function notifyGroupSubscribers(groupContext, groupEmitter, pseudo) {
    if (!groupContext || !groupEmitter) return;
    const nextState = {
      ...groupContext.state,
      pseudo
    };
    groupEmitter.emit(nextState), groupContext.state = nextState;
  }
  staticConfig.componentName && (component.displayName = staticConfig.componentName);
  let res = component;
  (process.env.TAMAGUI_FORCE_MEMO || staticConfig.memo) && (res = import_react.default.memo(res)), res.staticConfig = staticConfig;
  function extendStyledConfig(extended) {
    return {
      ...staticConfig,
      ...extended,
      neverFlatten: !0,
      isHOC: !0,
      isStyledHOC: !1
    };
  }
  function extractable(Component2, extended) {
    return Component2.staticConfig = extendStyledConfig(extended), Component2.styleable = styleable, Component2;
  }
  function styleable(Component2, options) {
    let out = import_constants.IS_REACT_19 && typeof Component2 == "function" && Component2.length === 1 || Component2.render?.length === 2 ? Component2 : import_react.default.forwardRef(Component2);
    const extendedConfig = extendStyledConfig(options?.staticConfig);
    return out = options?.disableTheme ? out : (0, import_themeable.themeable)(out, extendedConfig, !0), (extendedConfig.memo || process.env.TAMAGUI_MEMOIZE_STYLEABLE) && (out = import_react.default.memo(out)), out.staticConfig = extendedConfig, out.styleable = styleable, out;
  }
  return res.extractable = extractable, res.styleable = styleable, res;
}
function getWebEvents(events, webStyle = !0) {
  return {
    onMouseEnter: events.onMouseEnter,
    onMouseLeave: events.onMouseLeave,
    [webStyle ? "onClick" : "onPress"]: events.onPress,
    onMouseDown: events.onPressIn,
    onMouseUp: events.onPressOut,
    onTouchStart: events.onPressIn,
    onTouchEnd: events.onPressOut,
    onFocus: events.onFocus,
    onBlur: events.onBlur
  };
}
function Unspaced(props) {
  return props.children;
}
Unspaced.isUnspaced = !0;
const getSpacerSize = (size, {
    tokens
  }) => {
    size = size === !1 ? 0 : size === !0 ? "$true" : size;
    const sizePx = tokens.space[size] ?? size;
    return {
      width: sizePx,
      height: sizePx,
      minWidth: sizePx,
      minHeight: sizePx
    };
  },
  Spacer = createComponent({
    acceptsClassName: !0,
    memo: !0,
    componentName: "Spacer",
    validStyles: import_helpers.validStyles,
    defaultProps: {
      ...import_constants2.stackDefaultStyles,
      // avoid nesting issues
      tag: "span",
      size: !0,
      pointerEvents: "none"
    },
    variants: {
      size: {
        "...": getSpacerSize
      },
      flex: {
        true: {
          flexGrow: 1
        }
      },
      direction: {
        horizontal: {
          height: 0,
          minHeight: 0
        },
        vertical: {
          width: 0,
          minWidth: 0
        },
        both: {}
      }
    }
  });
function spacedChildren(props) {
  const {
      isZStack,
      children,
      space,
      direction,
      spaceFlex,
      separator,
      ensureKeys
    } = props,
    hasSpace = !!(space || spaceFlex),
    hasSeparator = separator != null,
    areChildrenArray = Array.isArray(children);
  if (!ensureKeys && !(hasSpace || hasSeparator || isZStack)) return children;
  const childrenList = areChildrenArray ? children : import_react.default.Children.toArray(children);
  if (childrenList.length <= 1 && !isZStack && !childrenList[0]?.type?.shouldForwardSpace) return children;
  const final = [];
  for (let [index, child] of childrenList.entries()) {
    const isEmpty = child == null || Array.isArray(child) && child.length === 0;
    if (!isEmpty && import_react.default.isValidElement(child) && child.type?.shouldForwardSpace && (child = import_react.default.cloneElement(child, {
      // @ts-expect-error we explicitly know with shouldForwardSpace
      space,
      spaceFlex,
      separator,
      key: child.key
    })), isEmpty || !child || child.key && !isZStack ? final.push(child) : final.push(/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react.default.Fragment, {
      children: isZStack ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(AbsoluteFill, {
        children: child
      }) : child
    }, `${index}0t`)), isUnspaced(child) && index === 0 || isZStack) continue;
    const next = childrenList[index + 1];
    next && !isEmpty && !isUnspaced(next) && (separator ? (hasSpace && final.push(createSpacer({
      key: `_${index}_00t`,
      direction,
      space,
      spaceFlex
    })), final.push(/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react.default.Fragment, {
      children: separator
    }, `${index}03t`)), hasSpace && final.push(createSpacer({
      key: `_${index}01t`,
      direction,
      space,
      spaceFlex
    }))) : final.push(createSpacer({
      key: `_${index}02t`,
      direction,
      space,
      spaceFlex
    })));
  }
  return process.env.NODE_ENV === "development" && props.debug && (0, import_log.log)("  Spaced children", final, props), final;
}
function createSpacer({
  key,
  direction,
  space,
  spaceFlex
}) {
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Spacer, {
    size: space,
    direction,
    ...(typeof spaceFlex < "u" && {
      flex: spaceFlex === !0 ? 1 : spaceFlex === !1 ? 0 : spaceFlex
    })
  }, key);
}
function isUnspaced(child) {
  const t = child?.type;
  return t?.isVisuallyHidden || t?.isUnspaced;
}
const AbsoluteFill = createComponent({
    defaultProps: {
      ...import_constants2.stackDefaultStyles,
      flexDirection: "column",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      pointerEvents: "box-none"
    }
  }),
  fromPx = val => typeof val == "number" ? val : typeof val == "string" ? +val.replace("px", "") : 0;