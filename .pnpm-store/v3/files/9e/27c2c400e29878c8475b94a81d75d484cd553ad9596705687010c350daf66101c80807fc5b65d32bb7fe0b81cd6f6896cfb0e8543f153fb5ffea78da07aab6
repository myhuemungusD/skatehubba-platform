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
var createComponent_exports = {};
__export(createComponent_exports, {
  Spacer: () => Spacer,
  Unspaced: () => Unspaced,
  componentSetStates: () => componentSetStates,
  createComponent: () => createComponent,
  spacedChildren: () => spacedChildren
});
module.exports = __toCommonJS(createComponent_exports);
var import_jsx_runtime = require("react/jsx-runtime"),
  import_compose_refs = require("@tamagui/compose-refs"),
  import_constants = require("@tamagui/constants"),
  import_helpers = require("@tamagui/helpers"),
  import_is_equal_shallow = require("@tamagui/is-equal-shallow"),
  import_react = __toESM(require("react"), 1),
  import_config = require("./config.native.js"),
  import_constants2 = require("./constants/constants.native.js"),
  import_isDevTools = require("./constants/isDevTools.native.js"),
  import_ComponentContext = require("./contexts/ComponentContext.native.js"),
  import_GroupContext = require("./contexts/GroupContext.native.js"),
  import_createVariable = require("./createVariable.native.js"),
  import_defaultComponentState = require("./defaultComponentState.native.js"),
  import_getSplitStyles = require("./helpers/getSplitStyles.native.js"),
  import_log = require("./helpers/log.native.js"),
  import_mergeProps = require("./helpers/mergeProps.native.js"),
  import_objectIdentityKey = require("./helpers/objectIdentityKey.native.js"),
  import_setElementProps = require("./helpers/setElementProps.native.js"),
  import_subscribeToContextGroup = require("./helpers/subscribeToContextGroup.native.js"),
  import_themeable = require("./helpers/themeable.native.js"),
  import_wrapStyleTags = require("./helpers/wrapStyleTags.native.js"),
  import_useComponentState = require("./hooks/useComponentState.native.js"),
  import_useMedia = require("./hooks/useMedia.native.js"),
  import_useTheme = require("./hooks/useTheme.native.js"),
  import_setupHooks = require("./setupHooks.native.js"),
  import_Slot = require("./views/Slot.native.js"),
  import_Theme = require("./views/Theme.native.js");
var time,
  debugKeyListeners,
  startVisualizer,
  componentSetStates = /* @__PURE__ */new Set(),
  avoidReRenderKeys = /* @__PURE__ */new Set(["hover", "press", "pressIn", "group", "focus", "focusWithin", "media", "group"]);
if (0) var cancelTouches;
var BaseText,
  BaseView,
  hasSetupBaseViews = !1,
  lastInteractionWasKeyboard = {
    value: !1
  };
import_constants.isWeb && typeof document < "u" && (document.addEventListener("keydown", function () {
  lastInteractionWasKeyboard.value || (lastInteractionWasKeyboard.value = !0);
}), document.addEventListener("mousedown", function () {
  lastInteractionWasKeyboard.value && (lastInteractionWasKeyboard.value = !1);
}), document.addEventListener("mousemove", function () {
  lastInteractionWasKeyboard.value && (lastInteractionWasKeyboard.value = !1);
}));
function createComponent(staticConfig) {
  var _staticConfig_defaultProps,
    {
      componentName
    } = staticConfig,
    config = null,
    defaultProps = staticConfig.defaultProps;
  (0, import_config.onConfiguredOnce)(function (conf) {
    if (config = conf, componentName) {
      var _conf_defaultProps,
        defaultForComponent = (_conf_defaultProps = conf.defaultProps) === null || _conf_defaultProps === void 0 ? void 0 : _conf_defaultProps[componentName];
      defaultForComponent && (defaultProps = {
        ...defaultForComponent,
        ...defaultProps
      });
    }
  });
  var {
    Component,
    isText,
    isZStack,
    isHOC
  } = staticConfig;
  process.env.NODE_ENV === "development" && !((_staticConfig_defaultProps = staticConfig.defaultProps) === null || _staticConfig_defaultProps === void 0) && _staticConfig_defaultProps.debug && process.env.IS_STATIC !== "is_static" && (0, import_log.log)(`\u{1F41B} [${componentName || "Component"}]`, {
    staticConfig,
    defaultProps,
    defaultPropsKeyOrder: defaultProps ? Object.keys(defaultProps) : []
  });
  var component = /* @__PURE__ */import_react.default.forwardRef(function (propsIn, forwardedRef) {
    var _hooks_usePropsTransform,
      _hooks_useEvents,
      _config_animations,
      internalID = process.env.NODE_ENV === "development" ? import_react.default.useId() : "";
    if (process.env.NODE_ENV === "development" && startVisualizer && (startVisualizer(), startVisualizer = void 0), !hasSetupBaseViews) {
      var _hooks_getBaseViews;
      hasSetupBaseViews = !0;
      var baseViews = (_hooks_getBaseViews = import_setupHooks.hooks.getBaseViews) === null || _hooks_getBaseViews === void 0 ? void 0 : _hooks_getBaseViews.call(import_setupHooks.hooks);
      baseViews && (BaseText = baseViews.Text, BaseView = baseViews.View);
    }
    if (process.env.NODE_ENV === "test" && propsIn["data-test-renders"]) {
      var _propsIn_datatestrenders, _current, _;
      (_ = (_propsIn_datatestrenders = propsIn["data-test-renders"])[_current = "current"]) !== null && _ !== void 0 || (_propsIn_datatestrenders[_current] = 0), propsIn["data-test-renders"].current += 1;
    }
    var {
        context,
        isReactNative
      } = staticConfig,
      debugProp = propsIn.debug,
      styledContextValue = context ? import_react.default.useContext(context) : void 0,
      overriddenContextProps = null;
    if (!process.env.TAMAGUI_IS_CORE_NODE && process.env.NODE_ENV === "development" && debugProp === "profile" && !time) {
      var timer = require("@tamagui/timer").timer();
      time = timer.start(), globalThis.time = time;
    }
    process.env.NODE_ENV === "development" && time && time`non-tamagui time (ignore)`;
    var props = propsIn;
    if (styledContextValue || defaultProps) {
      var [nextProps, overrides] = (0, import_mergeProps.mergeComponentProps)(defaultProps, styledContextValue, propsIn);
      nextProps && (props = nextProps), overriddenContextProps = overrides;
    }
    var componentName2 = props.componentName || staticConfig.componentName;
    process.env.NODE_ENV === "development" && import_constants.isClient && import_react.default.useEffect(function () {
      var node,
        overlay = null,
        remove = function () {
          if (overlay) try {
            var _overlay_parentNode;
            (_overlay_parentNode = overlay.parentNode) === null || _overlay_parentNode === void 0 || _overlay_parentNode.removeChild(overlay), overlay = null;
          } catch {}
        },
        debugVisualizerHandler = function () {
          var show = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
          if (node = stateRef.current.host, !!node) if (show) {
            overlay || (overlay = document.createElement("span"), overlay.style.inset = "0px", overlay.style.zIndex = "1000000", overlay.style.position = "absolute", overlay.style.borderColor = "red", overlay.style.borderWidth = "1px", overlay.style.borderStyle = "dotted");
            var dataAt = node.getAttribute("data-at") || "",
              dataIn = node.getAttribute("data-in") || "",
              tooltip = document.createElement("span");
            tooltip.style.position = "absolute", tooltip.style.top = "0px", tooltip.style.left = "0px", tooltip.style.padding = "3px", tooltip.style.background = "rgba(0,0,0,0.75)", tooltip.style.color = "rgba(255,255,255,1)", tooltip.style.fontSize = "12px", tooltip.style.lineHeight = "12px", tooltip.style.fontFamily = "monospace", tooltip.innerText = `${componentName2 || ""} ${dataAt} ${dataIn}`.trim(), overlay.appendChild(tooltip), node.appendChild(overlay);
          } else remove();
        };
      return debugKeyListeners || (debugKeyListeners = /* @__PURE__ */new Set()), debugKeyListeners.add(debugVisualizerHandler), function () {
        remove(), debugKeyListeners?.delete(debugVisualizerHandler);
      };
    }, [componentName2]);
    var componentContext = import_react.default.useContext(import_ComponentContext.ComponentContext),
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
    hasAnimationProp && animationDriver?.avoidReRenders && (0, import_constants.useIsomorphicLayoutEffect)(function () {
      var pendingState = stateRef.current.nextState;
      pendingState && (stateRef.current.nextState = void 0, componentState.setStateShallow(pendingState));
    });
    var allGroupContexts = (0, import_react.useMemo)(function () {
        var _stateRef_current_group_listeners, _stateRef_current_group;
        if (!groupName || props.passThrough) return groupContextParent;
        var listeners = /* @__PURE__ */new Set();
        return (_stateRef_current_group = stateRef.current.group) === null || _stateRef_current_group === void 0 || (_stateRef_current_group_listeners = _stateRef_current_group.listeners) === null || _stateRef_current_group_listeners === void 0 || _stateRef_current_group_listeners.clear(), stateRef.current.group = {
          listeners,
          emit(state2) {
            listeners.forEach(function (l) {
              return l(state2);
            });
          },
          subscribe(cb) {
            return listeners.add(cb), listeners.size === 1 && setStateShallow({
              hasDynGroupChildren: !0
            }), function () {
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
            subscribe: function (listener) {
              var _stateRef_current_group2,
                dispose = (_stateRef_current_group2 = stateRef.current.group) === null || _stateRef_current_group2 === void 0 ? void 0 : _stateRef_current_group2.subscribe(listener);
              return function () {
                dispose?.();
              };
            }
          }
        };
      }, [stateRef, groupName, groupContextParent]),
      setStateShallow = componentState.setStateShallow;
    process.env.NODE_ENV === "development" && time && time`use-state`;
    var hasTextAncestor = !!(import_constants.isWeb && isText && componentContext.inText),
      isTaggable = !Component || typeof Component == "string",
      tagProp = props.tag,
      element = import_constants.isWeb && isTaggable && tagProp || Component,
      BaseTextComponent = BaseText || element || "span",
      BaseViewComponent = BaseView || element || (hasTextAncestor ? "span" : "div"),
      elementType = isText ? BaseTextComponent : BaseViewComponent;
    animationDriver && isAnimated &&
    // this should really be behind another prop as it's not really related to
    // "needsWebStyles" basically with motion we just animate a plain div, but
    // we still have animated.View/Text for Sheet which wants to control
    // things declaratively
    !animationDriver.needsWebStyles && (elementType = animationDriver[isText ? "Text" : "View"] || elementType);
    var disableThemeProp = !1,
      disableTheme = disableThemeProp || isHOC;
    process.env.NODE_ENV === "development" && time && time`theme-props`, props.themeShallow && (stateRef.current.themeShallow = !0);
    var themeStateProps = {
      componentName: componentName2,
      disable: disableTheme,
      shallow: stateRef.current.themeShallow,
      debug: debugProp
    };
    if ("themeInverse" in props && (themeStateProps.inverse = props.themeInverse), "theme" in props && (themeStateProps.name = props.theme), typeof stateRef.current.isListeningToTheme == "boolean" && (themeStateProps.needsUpdate = function () {
      return !!stateRef.current.isListeningToTheme;
    }), themeStateProps.deopt = willBeAnimated, process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile") {
      var name = `${componentName2 || Component?.displayName || Component?.name || "[Unnamed Component]"}`,
        type = (hasEnterStyle ? "(hasEnter)" : " ") + (isAnimated ? "(animated)" : " ") + (isReactNative ? "(rnw)" : " ") + (noClass ? "(noClass)" : " ") + (state.press || state.pressIn ? "(PRESSED)" : " ") + (state.hover ? "(HOVERED)" : " ") + (state.focus ? "(FOCUSED)" : " ") + (state.focusWithin ? "(WITHIN FOCUSED)" : " ") + (presenceState?.isPresent === !1 ? "(EXIT)" : ""),
        dataIs = propsIn["data-is"] || "",
        banner = `<${name} /> ${internalID} ${dataIs ? ` ${dataIs}` : ""} ${type.trim()} (hydrated: ${isHydrated}) (unmounted: ${state.unmounted})`,
        ch = propsIn.children,
        childLog = typeof ch == "string" ? ch.length > 4 ? ch.slice(0, 4) + "..." : ch : "";
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
    var [theme, themeState] = (0, import_useTheme.useThemeWithState)(themeStateProps);
    process.env.NODE_ENV === "development" && time && time`theme`, elementType = Component || elementType;
    var isStringElement = typeof elementType == "string",
      mediaState = (0, import_useMedia.useMedia)(componentContext, debugProp);
    (0, import_createVariable.setDidGetVariableValue)(!1), process.env.NODE_ENV === "development" && time && time`media`;
    var resolveValues =
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
    var splitStyles = (0, import_getSplitStyles.useSplitStyles)(props, staticConfig, theme, themeName, state, styleProps, null, componentContext, allGroupContexts, elementType, startedUnhydrated, debugProp),
      isPassthrough = !splitStyles,
      contextForOverride = staticConfig.context;
    if (splitStyles?.overriddenContextProps) {
      var _staticConfig_parentStaticConfig,
        contextForProps = staticConfig.context || ((_staticConfig_parentStaticConfig = staticConfig.parentStaticConfig) === null || _staticConfig_parentStaticConfig === void 0 ? void 0 : _staticConfig_parentStaticConfig.context);
      if (contextForProps) {
        for (var key in splitStyles.overriddenContextProps) overriddenContextProps || (overriddenContextProps = {}), overriddenContextProps[key] = splitStyles.overriddenContextProps[key];
        staticConfig.context || (contextForOverride = contextForProps);
      }
    }
    var groupContext = groupName && allGroupContexts?.[groupName] || null;
    if (!isPassthrough && groupContext &&
    // avoids onLayout if we don't need it
    props.containerType !== "normal") {
      var groupState = groupContext?.state;
      if (groupState && groupState.layout === void 0) {
        var _splitStyles_style, _splitStyles_style1;
        (!((_splitStyles_style = splitStyles.style) === null || _splitStyles_style === void 0) && _splitStyles_style.width || !((_splitStyles_style1 = splitStyles.style) === null || _splitStyles_style1 === void 0) && _splitStyles_style1.height) && (groupState.layout = {
          width: fromPx(splitStyles.style.width),
          height: fromPx(splitStyles.style.height)
        });
      }
    }
    if (!isPassthrough && (hasAnimationProp || groupName) && animationDriver?.avoidReRenders) {
      let updateGroupListeners2 = function () {
        var updatedState = stateRef.current.nextState;
        if (groupContext) {
          var {
            group,
            hasDynGroupChildren,
            unmounted,
            animation,
            ...childrenGroupState
          } = updatedState;
          notifyGroupSubscribers(groupContext, stateRef.current.group || null, childrenGroupState);
        }
      };
      var updateGroupListeners = updateGroupListeners2,
        _componentContext,
        ogSetStateShallow = setStateShallow;
      stateRef.current.updateStyleListener = function () {
        var updatedState = stateRef.current.nextState || state,
          mediaState2 = stateRef.current.nextMedia,
          nextStyles = (0, import_getSplitStyles.getSplitStyles)(props, staticConfig, theme, themeName, updatedState, mediaState2 ? {
            ...styleProps,
            mediaState: mediaState2
          } : styleProps, null, componentContext, allGroupContexts, elementType, startedUnhydrated, debugProp),
          useStyleListener = stateRef.current.useStyleListener;
        useStyleListener?.(nextStyles?.style || {});
      }, (_componentContext = componentContext).mediaEmit || (_componentContext.mediaEmit = function (next) {
        var _stateRef_current_updateStyleListener, _stateRef_current;
        stateRef.current.nextMedia = next, (_stateRef_current_updateStyleListener = (_stateRef_current = stateRef.current).updateStyleListener) === null || _stateRef_current_updateStyleListener === void 0 || _stateRef_current_updateStyleListener.call(_stateRef_current);
      }), stateRef.current.setStateShallow = function (nextOrGetNext) {
        var prev = stateRef.current.nextState || state,
          next = typeof nextOrGetNext == "function" ? nextOrGetNext(prev) : nextOrGetNext;
        if (!(next === prev || (0, import_is_equal_shallow.isEqualShallow)(prev, next))) {
          var canAvoidReRender = Object.keys(next).every(function (key3) {
              return avoidReRenderKeys.has(key3);
            }),
            updatedState = {
              ...prev,
              ...next
            };
          if (stateRef.current.nextState = updatedState, canAvoidReRender) {
            var _stateRef_current_updateStyleListener, _stateRef_current;
            process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile" && (console.groupCollapsed("[\u26A1\uFE0F] avoid setState", componentName2, next, {
              updatedState,
              props
            }), console.info(stateRef.current.host), console.groupEnd()), updateGroupListeners2(), (_stateRef_current_updateStyleListener = (_stateRef_current = stateRef.current).updateStyleListener) === null || _stateRef_current_updateStyleListener === void 0 || _stateRef_current_updateStyleListener.call(_stateRef_current);
          } else process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile" && console.info("[\u{1F40C}] re-render", {
            canAvoidReRender,
            next
          }), ogSetStateShallow(next);
        }
      }, setStateShallow = function (state2) {
        var _stateRef_current_setStateShallow, _stateRef_current;
        (_stateRef_current_setStateShallow = (_stateRef_current = stateRef.current).setStateShallow) === null || _stateRef_current_setStateShallow === void 0 || _stateRef_current_setStateShallow.call(_stateRef_current, state2);
      };
    }
    if (process.env.NODE_ENV === "development" && time && time`split-styles`, splitStyles) {
      if (props.group && props.untilMeasured === "hide" && !stateRef.current.hasMeasured) {
        var _splitStyles;
        (_splitStyles = splitStyles).style || (_splitStyles.style = {}), splitStyles.style.opacity = 0;
      }
      splitStyles.dynamicThemeAccess != null && (stateRef.current.isListeningToTheme = splitStyles.dynamicThemeAccess);
    }
    var hasRuntimeMediaKeys = splitStyles?.hasMedia && splitStyles.hasMedia !== !0,
      shouldListenForMedia = (0, import_createVariable.didGetVariableValue)() || hasRuntimeMediaKeys || noClass && splitStyles?.hasMedia === !0,
      mediaListeningKeys = hasRuntimeMediaKeys ? splitStyles.hasMedia : null;
    process.env.NODE_ENV === "development" && debugProp === "verbose" && console.info("useMedia() createComponent", shouldListenForMedia, mediaListeningKeys), (0, import_useMedia.setMediaShouldUpdate)(componentContext, shouldListenForMedia, mediaListeningKeys);
    var {
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
      } = viewPropsIn || {},
      viewProps = nonTamaguiProps;
    !isTaggable && props.forceStyle && (viewProps.forceStyle = props.forceStyle), isHOC && (typeof _themeProp < "u" && (viewProps.theme = _themeProp), typeof passThrough < "u" && (viewProps.passThrough = passThrough)), tagProp && elementType.acceptTagProp && (viewProps.tag = tagProp);
    var animationStyles,
      shouldUseAnimation =
      // if it supports css vars we run it on server too to get matching initial style
      (supportsCSS ? willBeAnimatedClient : willBeAnimated) && useAnimations && !isHOC,
      animatedRef;
    if (shouldUseAnimation) {
      var useStyleEmitter = animationDriver?.avoidReRenders ? function (listener) {
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
    props.containerType !== "normal" && (nonTamaguiProps.onLayout = (0, import_helpers.composeEventHandlers)(nonTamaguiProps.onLayout, function (e) {
      var _stateRef_current_group,
        layout = e.nativeEvent.layout;
      groupContext.state.layout = layout, (_stateRef_current_group = stateRef.current.group) === null || _stateRef_current_group === void 0 || _stateRef_current_group.emit({
        layout
      }), !stateRef.current.hasMeasured && props.untilMeasured === "hide" && setState(function (prev) {
        return {
          ...prev
        };
      }), stateRef.current.hasMeasured = !0;
    })), viewProps = ((_hooks_usePropsTransform = import_setupHooks.hooks.usePropsTransform) === null || _hooks_usePropsTransform === void 0 ? void 0 : _hooks_usePropsTransform.call(import_setupHooks.hooks, elementType, nonTamaguiProps, stateRef, stateRef.current.willHydrate)) || nonTamaguiProps, stateRef.current.composedRef || (stateRef.current.composedRef = (0, import_compose_refs.composeRefs)(function (x) {
      return stateRef.current.host = x;
    }, forwardedRef, import_setElementProps.setElementProps, animatedRef)), viewProps.ref = stateRef.current.composedRef, process.env.NODE_ENV === "development" && !isReactNative && !isText && import_constants.isWeb && !isHOC && import_react.default.Children.toArray(props.children).forEach(function (item) {
      typeof item == "string" && item !== `
` && console.error(`Unexpected text node: ${item}. A text node cannot be a child of a <${staticConfig.componentName || propsIn.tag || "View"}>.`, props);
    }), process.env.NODE_ENV === "development" && time && time`events-hooks`;
    var unPress = function () {
      setStateShallow({
        press: !1,
        pressIn: !1
      });
    };
    process.env.NODE_ENV === "development" && import_constants.isWeb && (0, import_constants.useIsomorphicLayoutEffect)(function () {
      if (debugProp === "verbose") {
        let cssStyleDeclarationToObject2 = function (style) {
          for (var styleObject = {}, i = 0; i < style.length; i++) {
            var prop = style[i];
            styleObject[prop] = style.getPropertyValue(prop);
          }
          return styleObject;
        };
        var cssStyleDeclarationToObject = cssStyleDeclarationToObject2,
          computed = stateRef.current.host ? cssStyleDeclarationToObject2(getComputedStyle(stateRef.current.host)) : {};
        console.groupCollapsed(`Rendered > (opacity: ${computed.opacity})`), console.warn(stateRef.current.host), console.warn(computed), console.groupEnd();
      }
    }), (0, import_constants.useIsomorphicLayoutEffect)(function () {
      if (state.unmounted === !0 && hasEnterStyle) {
        setStateShallow({
          unmounted: "should-enter"
        });
        return;
      }
      var tm;
      if (state.unmounted) {
        if (animationDriver?.supportsCSS || import_constants.isAndroid) return tm = setTimeout(function () {
          setStateShallow({
            unmounted: !1
          });
        }), function () {
          return clearTimeout(tm);
        };
        setStateShallow({
          unmounted: !1
        });
        return;
      }
      return function () {
        componentSetStates.delete(setState);
      };
    }, [state.unmounted, disabled]), (0, import_constants.useIsomorphicLayoutEffect)(function () {
      if (!disabled && !(!pseudoGroups && !mediaGroups) && allGroupContexts) return (0, import_subscribeToContextGroup.subscribeToContextGroup)({
        groupContext: allGroupContexts,
        setStateShallow,
        mediaGroups,
        pseudoGroups
      });
    }, [allGroupContexts, disabled, pseudoGroups ? (0, import_objectIdentityKey.objectIdentityKey)(pseudoGroups) : 0, mediaGroups ? (0, import_objectIdentityKey.objectIdentityKey)(mediaGroups) : 0]);
    var groupEmitter = stateRef.current.group;
    (0, import_constants.useIsomorphicLayoutEffect)(function () {
      !groupContext || !groupEmitter || notifyGroupSubscribers(groupContext, groupEmitter, state);
    }, [groupContext, groupEmitter, state]);
    var runtimePressStyle = !disabled && noClass && pseudos?.pressStyle,
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
    var events = shouldAttach ? {
      onPressOut: attachPress ? function (e) {
        unPress(), onPressOut?.(e), onMouseUp?.(e);
      } : void 0,
      ...((attachHover || attachPress) && {
        onMouseEnter: function (e) {
          var next = {};
          needsHoverState && (next.hover = !0), needsPressState && state.pressIn && (next.press = !0), setStateShallow(next), onHoverIn?.(e), onMouseEnter?.(e);
        },
        onMouseLeave: function (e) {
          var next = {};
          needsHoverState && (next.hover = !1), needsPressState && (next.press = !1, next.pressIn = !1), setStateShallow(next), onHoverOut?.(e), onMouseLeave?.(e);
        }
      }),
      onPressIn: attachPress ? function (e) {
        needsPressState && setStateShallow({
          press: !0,
          pressIn: !0
        }), onPressIn?.(e), onMouseDown?.(e), import_constants.isWeb && componentSetStates.add(setState);
      } : void 0,
      onPress: attachPress ? function (e) {
        unPress(), import_constants.isWeb && onClick?.(e), onPress?.(e);
      } : void 0,
      ...(attachPress && onLongPress && {
        onLongPress: function (e) {
          unPress(), onLongPress?.(e);
        }
      }),
      ...(attachFocus && {
        onFocus: function (e) {
          var next = {};
          componentContext.setParentFocusState && (next.focusWithin = !0), pseudos?.focusVisibleStyle && lastInteractionWasKeyboard.value ? next.focusVisible = !0 : next.focus = !0, setStateShallow(next), onFocus?.(e);
        },
        onBlur: function (e) {
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
    if (events && !asChild) {
      var _viewProps_focusable;
      Object.assign(events, {
        cancelable: !viewProps.rejectResponderTermination,
        disabled,
        hitSlop: viewProps.hitSlop,
        delayLongPress: viewProps.delayLongPress,
        delayPressIn: viewProps.delayPressIn,
        delayPressOut: viewProps.delayPressOut,
        focusable: (_viewProps_focusable = viewProps.focusable) !== null && _viewProps_focusable !== void 0 ? _viewProps_focusable : !0,
        minPressDuration: 0
      });
    }
    process.env.NODE_ENV === "development" && time && time`events`, process.env.NODE_ENV === "development" && debugProp === "verbose" && (0, import_log.log)("events", {
      events,
      attachHover,
      attachPress
    }), (_hooks_useEvents = import_setupHooks.hooks.useEvents) === null || _hooks_useEvents === void 0 || _hooks_useEvents.call(import_setupHooks.hooks, viewProps, events, splitStyles, setStateShallow, staticConfig);
    var direction = props.spaceDirection || "both";
    process.env.NODE_ENV === "development" && time && time`hooks`;
    var content = !children || asChild || !splitStyles ? children : spacedChildren({
      separator,
      children,
      space,
      direction,
      isZStack,
      debug: debugProp
    });
    if (asChild) if (elementType = import_Slot.Slot, 0) var webStyleEvents, passEvents;else Object.assign(viewProps, {
      onPress,
      onLongPress
    });
    process.env.NODE_ENV === "development" && time && time`spaced-as-child`, isPassthrough && (content = propsIn.children, elementType = BaseViewComponent, viewProps = {
      style: {
        display: "contents"
      }
    });
    var useChildrenResult;
    import_setupHooks.hooks.useChildren && (useChildrenResult = import_setupHooks.hooks.useChildren(elementType, content, viewProps)), process.env.NODE_ENV === "development" && time && time`use-children`, useChildrenResult ? content = useChildrenResult : content = /* @__PURE__ */import_react.default.createElement(elementType, viewProps, content);
    var ResetPresence = config == null || (_config_animations = config.animations) === null || _config_animations === void 0 ? void 0 : _config_animations.ResetPresence,
      needsReset = !!(
      // not when passing down to child
      !asChild &&
      // not when passThrough
      splitStyles &&
      // not when HOC
      !isHOC && ResetPresence && willBeAnimated && (hasEnterStyle || presenceState)),
      hasEverReset = stateRef.current.hasEverResetPresence;
    needsReset && !hasEverReset && (stateRef.current.hasEverResetPresence = !0);
    var renderReset = needsReset || hasEverReset;
    if (renderReset && ResetPresence && (content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(ResetPresence, {
      disabled: !needsReset,
      children: content
    })), process.env.NODE_ENV === "development" && time && time`create-element`, "focusWithinStyle" in propsIn && (content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_ComponentContext.ComponentContext.Provider, {
      ...componentContext,
      setParentFocusState: setStateShallow,
      children: content
    })), "group" in props && (content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(import_GroupContext.GroupContext.Provider, {
      value: allGroupContexts,
      children: content
    })), process.env.NODE_ENV === "development" && time && time`group-context`, content = disableTheme || !splitStyles ? content : (0, import_Theme.getThemedChildren)(themeState, content, themeStateProps, !1, stateRef), process.env.NODE_ENV === "development" && time && time`themed-children`, overriddenContextProps && contextForOverride) {
      var Provider = contextForOverride.Provider;
      for (var key1 in styledContextValue) key1 in overriddenContextProps || (overriddenContextProps[key1] = styledContextValue[key1]);
      debugProp && console.info("overriddenContextProps", overriddenContextProps), content = /* @__PURE__ */(0, import_jsx_runtime.jsx)(Provider, {
        __disableMergeDefaultValues: !0,
        ...overriddenContextProps,
        children: content
      });
    }
    if (process.env.NODE_ENV === "development" && time && time`context-override`, process.env.NODE_ENV === "development" && time && time`style-tags`, process.env.NODE_ENV === "development" && debugProp && debugProp !== "profile") {
      var element1 = typeof elementType == "string" ? elementType : "Component",
        title = `render <${element1} /> (${internalID}) with props`;
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
        for (var key2 in splitStylesStyle) (0, import_log.log)(key2, splitStylesStyle[key2]);
      }
      if (debugProp === "break") debugger;
    }
    return process.env.NODE_ENV === "development" && time && (time`rest`, globalThis.willPrint || (globalThis.willPrint = !0, setTimeout(function () {
      delete globalThis.willPrint, time.print(), time = null;
    }, 50))), content;
  });
  function notifyGroupSubscribers(groupContext, groupEmitter, pseudo) {
    if (!(!groupContext || !groupEmitter)) {
      var nextState = {
        ...groupContext.state,
        pseudo
      };
      groupEmitter.emit(nextState), groupContext.state = nextState;
    }
  }
  staticConfig.componentName && (component.displayName = staticConfig.componentName);
  var res = component;
  (process.env.TAMAGUI_FORCE_MEMO || staticConfig.memo) && (res = /* @__PURE__ */import_react.default.memo(res)), res.staticConfig = staticConfig;
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
    var _Component_render,
      skipForwardRef = import_constants.IS_REACT_19 && typeof Component2 == "function" && Component2.length === 1 || ((_Component_render = Component2.render) === null || _Component_render === void 0 ? void 0 : _Component_render.length) === 2,
      out = skipForwardRef ? Component2 : /* @__PURE__ */import_react.default.forwardRef(Component2),
      extendedConfig = extendStyledConfig(options?.staticConfig);
    return out = options?.disableTheme ? out : (0, import_themeable.themeable)(out, extendedConfig, !0), (extendedConfig.memo || process.env.TAMAGUI_MEMOIZE_STYLEABLE) && (out = /* @__PURE__ */import_react.default.memo(out)), out.staticConfig = extendedConfig, out.styleable = styleable, out;
  }
  return res.extractable = extractable, res.styleable = styleable, res;
}
function Unspaced(props) {
  return props.children;
}
Unspaced.isUnspaced = !0;
var getSpacerSize = function (size, param) {
    var {
      tokens
    } = param;
    size = size === !1 ? 0 : size === !0 ? "$true" : size;
    var _tokens_space_size,
      sizePx = (_tokens_space_size = tokens.space[size]) !== null && _tokens_space_size !== void 0 ? _tokens_space_size : size;
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
  var _childrenList__type,
    _childrenList_,
    {
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
  var childrenList = areChildrenArray ? children : import_react.default.Children.toArray(children),
    len = childrenList.length;
  if (len <= 1 && !isZStack && !(!((_childrenList_ = childrenList[0]) === null || _childrenList_ === void 0 || (_childrenList__type = _childrenList_.type) === null || _childrenList__type === void 0) && _childrenList__type.shouldForwardSpace)) return children;
  var final = [],
    _iteratorNormalCompletion = !0,
    _didIteratorError = !1,
    _iteratorError = void 0;
  try {
    for (var _iterator = childrenList.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
      var [index, child] = _step.value,
        _child_type,
        isEmpty = child == null || Array.isArray(child) && child.length === 0;
      if (!isEmpty && /* @__PURE__ */import_react.default.isValidElement(child) && !((_child_type = child.type) === null || _child_type === void 0) && _child_type.shouldForwardSpace && (child = /* @__PURE__ */import_react.default.cloneElement(child, {
        // @ts-expect-error we explicitly know with shouldForwardSpace
        space,
        spaceFlex,
        separator,
        key: child.key
      })), isEmpty || !child || child.key && !isZStack ? final.push(child) : final.push(/* @__PURE__ */(0, import_jsx_runtime.jsx)(import_react.default.Fragment, {
        children: isZStack ? /* @__PURE__ */(0, import_jsx_runtime.jsx)(AbsoluteFill, {
          children: child
        }) : child
      }, `${index}0t`)), !(isUnspaced(child) && index === 0) && !isZStack) {
        var next = childrenList[index + 1];
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
    }
  } catch (err) {
    _didIteratorError = !0, _iteratorError = err;
  } finally {
    try {
      !_iteratorNormalCompletion && _iterator.return != null && _iterator.return();
    } finally {
      if (_didIteratorError) throw _iteratorError;
    }
  }
  return process.env.NODE_ENV === "development" && props.debug && (0, import_log.log)("  Spaced children", final, props), final;
}
function createSpacer(param) {
  var {
    key,
    direction,
    space,
    spaceFlex
  } = param;
  return /* @__PURE__ */(0, import_jsx_runtime.jsx)(Spacer, {
    size: space,
    direction,
    ...(typeof spaceFlex < "u" && {
      flex: spaceFlex === !0 ? 1 : spaceFlex === !1 ? 0 : spaceFlex
    })
  }, key);
}
function isUnspaced(child) {
  var t = child?.type;
  return t?.isVisuallyHidden || t?.isUnspaced;
}
var AbsoluteFill = createComponent({
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
  fromPx = function (val) {
    return typeof val == "number" ? val : typeof val == "string" ? +val.replace("px", "") : 0;
  };
//# sourceMappingURL=createComponent.native.js.map
