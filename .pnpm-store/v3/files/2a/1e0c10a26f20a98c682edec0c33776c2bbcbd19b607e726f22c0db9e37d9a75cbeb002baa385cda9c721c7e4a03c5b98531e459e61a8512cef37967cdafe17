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
var getSplitStyles_exports = {};
__export(getSplitStyles_exports, {
  PROP_SPLIT: () => PROP_SPLIT,
  getSplitStyles: () => getSplitStyles,
  getSubStyle: () => getSubStyle,
  styleOriginalValues: () => styleOriginalValues,
  useSplitStyles: () => useSplitStyles
});
module.exports = __toCommonJS(getSplitStyles_exports);
var import_constants = require("@tamagui/constants"),
  import_helpers = require("@tamagui/helpers"),
  import_react = __toESM(require("react"), 1),
  import_getDynamicVal = require("./getDynamicVal.native.js"),
  import_config = require("../config.native.js"),
  import_accessibilityDirectMap = require("../constants/accessibilityDirectMap.native.js"),
  import_constants2 = require("../constants/constants.native.js"),
  import_isDevTools = require("../constants/isDevTools.native.js"),
  import_useMedia = require("../hooks/useMedia.native.js"),
  import_createMediaStyle = require("./createMediaStyle.native.js"),
  import_expandStyles = require("./expandStyles.native.js"),
  import_getCSSStylesAtomic = require("./getCSSStylesAtomic.native.js"),
  import_getGroupPropParts = require("./getGroupPropParts.native.js"),
  import_insertStyleRule = require("./insertStyleRule.native.js"),
  import_isActivePlatform = require("./isActivePlatform.native.js"),
  import_isActiveTheme = require("./isActiveTheme.native.js"),
  import_log = require("./log.native.js"),
  import_normalizeValueWithProperty = require("./normalizeValueWithProperty.native.js"),
  import_propMapper = require("./propMapper.native.js"),
  import_pseudoDescriptors = require("./pseudoDescriptors.native.js"),
  import_skipProps = require("./skipProps.native.js"),
  import_sortString = require("./sortString.native.js"),
  import_transformsToString = require("./transformsToString.native.js");
function _type_of(obj) {
  "@swc/helpers - typeof";

  return obj && typeof Symbol < "u" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var conf,
  styleOriginalValues = /* @__PURE__ */new WeakMap(),
  PROP_SPLIT = "-";
function normalizeGroupKey(key, groupContext) {
  var parts = key.split("-"),
    plen = parts.length;
  if (
  // check if its actually a simple group selector to avoid breaking selectors
  plen === 2 || plen === 3 && import_pseudoDescriptors.pseudoPriorities[parts[parts.length - 1]]) {
    var name = parts[1];
    if (groupContext && !groupContext[name]) return key.replace("$group-", "$group-true-");
  }
  return key;
}
function isValidStyleKey(key, validStyles, accept) {
  return key in validStyles ? !0 : accept && key in accept;
}
var getSplitStyles = function (props, staticConfig, theme, themeName, componentState, styleProps, parentSplitStyles, componentContext, groupContext, elementType, startedUnhydrated, debug) {
  var _loop = function (keyOg2) {
    var keyInit = keyOg2,
      valInit = props[keyInit];
    if (keyInit === "children") return viewProps[keyInit] = valInit, "continue";
    if (process.env.NODE_ENV === "development" && debug === "profile" && time`before-prop-${keyInit}`, process.env.NODE_ENV === "test" && keyInit === "jestAnimatedStyle") return "continue";
    if (accept) {
      var accepted = accept[keyInit];
      if ((accepted === "style" || accepted === "textStyle") && valInit && (typeof valInit > "u" ? "undefined" : _type_of(valInit)) === "object") return viewProps[keyInit] = getSubStyle(styleState, keyInit, valInit, styleProps.noClass), "continue";
    }
    if (process.env.NODE_ENV, disableExpandShorthands || keyInit in shorthands && (keyInit = shorthands[keyInit]), keyInit === "className") return "continue";
    if (keyInit in import_skipProps.skipProps && !noSkip && !isHOC) {
      if (keyInit === "group" && 0) var identifier2, containerType, containerCSS;
      return "continue";
    }
    var isValidStyleKeyInit = isValidStyleKey(keyInit, validStyles, accept);
    if (0 && staticConfig.isReactNative && keyInit.startsWith("data-")) var _viewProps2, _dataSet;
    if (!isValidStyleKeyInit) {
      if (!import_constants.isAndroid && keyInit === "elevationAndroid") return "continue";
      if (keyInit === "userSelect") keyInit = "selectable", valInit = valInit !== "none";else if (keyInit.startsWith("data-")) return "continue";
    }
    if (keyInit === "dataSet") {
      for (var keyInit1 in valInit) viewProps[`data-${hyphenate(keyInit1)}`] = valInit[keyInit1];
      return "continue";
    }
    if (0 && !noExpand) var didUseKeyInit;
    var isVariant = !isValidStyleKeyInit && variants && keyInit in variants,
      isStyleLikeKey = isValidStyleKeyInit || isVariant,
      isPseudo = keyInit in import_helpers.validPseudoKeys,
      isMedia = !isStyleLikeKey && !isPseudo ? (0, import_useMedia.getMediaKey)(keyInit) : !1,
      isMediaOrPseudo = !!(isMedia || isPseudo);
    isMediaOrPseudo && isMedia === "group" && (keyInit = normalizeGroupKey(keyInit, groupContext));
    var isStyleProp = isValidStyleKeyInit || isMediaOrPseudo || isVariant && !noExpand;
    if (isStyleProp && (asChild === "except-style" || asChild === "except-style-web")) return "continue";
    var shouldPassProp = !isStyleProp && isHOC ||
      // is in parent variants
      isHOC && parentVariants && keyInit in parentVariants || inlineProps?.has(keyInit),
      parentVariant = parentVariants?.[keyInit],
      isHOCShouldPassThrough = !!(isHOC && (isValidStyleKeyInit || isMediaOrPseudo || parentVariant || keyInit in import_skipProps.skipProps)),
      shouldPassThrough = shouldPassProp || isHOCShouldPassThrough;
    if (process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(`  \u{1F511} ${keyOg2}${keyInit !== keyOg2 ? ` (shorthand for ${keyInit})` : ""} ${shouldPassThrough ? "(pass)" : ""}`), (0, import_log.log)({
      isVariant,
      valInit,
      shouldPassProp
    }), import_constants.isClient && (0, import_log.log)({
      variants,
      variant: variants?.[keyInit],
      isVariant,
      isHOCShouldPassThrough,
      usedKeys: {
        ...styleState.usedKeys
      },
      parentStaticConfig
    })), shouldPassThrough && (passDownProp(viewProps, keyInit, valInit, isMediaOrPseudo), process.env.NODE_ENV === "development" && debug === "verbose" && console.groupEnd(), !isVariant)) return "continue";
    if (!noSkip && keyInit in import_skipProps.skipProps) return process.env.NODE_ENV === "development" && debug === "verbose" && console.groupEnd(), "continue";
    (isText || isInput) && valInit && (keyInit === "fontFamily" || keyInit === shorthands.fontFamily) && valInit in conf.fontsParsed && (styleState.fontFamily = valInit);
    var disablePropMap = isMediaOrPseudo || !isStyleLikeKey;
    if ((0, import_propMapper.propMapper)(keyInit, valInit, styleState, disablePropMap, function (key4, val2, originalVal) {
      var _parentStaticConfig_variants,
        isStyledContextProp = styledContext && key4 in styledContext;
      if (!isHOC && disablePropMap && !isStyledContextProp && !isMediaOrPseudo) {
        viewProps[key4] = val2;
        return;
      }
      if (process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed("  \u{1F4A0} expanded", keyInit, "=>", key4), (0, import_log.log)(val2), console.groupEnd()), val2 != null) {
        if (key4 === "pointerEvents") {
          viewProps[key4] = val2;
          return;
        }
        if (!isHOC && isValidStyleKey(key4, validStyles, accept) || import_constants.isAndroid && key4 === "elevation") {
          mergeStyle(styleState, key4, val2, 1, !1, originalVal);
          return;
        }
        if (isPseudo = key4 in import_helpers.validPseudoKeys, isMedia = isPseudo ? !1 : (0, import_useMedia.getMediaKey)(key4), isMediaOrPseudo = !!(isMedia || isPseudo), isVariant = variants && key4 in variants, isMedia === "group" && (key4 = normalizeGroupKey(key4, groupContext)), inlineProps?.has(key4) || process.env.IS_STATIC === "is_static" && inlineWhenUnflattened?.has(key4)) {
          var _props_key;
          viewProps[key4] = (_props_key = props[key4]) !== null && _props_key !== void 0 ? _props_key : val2;
        }
        var shouldPassThrough2 = styleProps.noExpand && isPseudo || isHOC && (isMediaOrPseudo || (parentStaticConfig == null || (_parentStaticConfig_variants = parentStaticConfig.variants) === null || _parentStaticConfig_variants === void 0 ? void 0 : _parentStaticConfig_variants[keyInit]));
        if (shouldPassThrough2) {
          passDownProp(viewProps, key4, val2, isMediaOrPseudo), process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(` - passing down prop ${key4}`), (0, import_log.log)({
            val: val2,
            after: {
              ...viewProps[key4]
            }
          }), console.groupEnd());
          return;
        }
        if (isPseudo) {
          if (!val2) return;
          var pseudoStyleObject = getSubStyle(styleState, key4, val2, styleProps.noClass && process.env.IS_STATIC !== "is_static");
          if (!shouldDoClasses || process.env.IS_STATIC === "is_static") {
            var _pseudos, _key;
            if (pseudos || (pseudos = {}), (_pseudos = pseudos)[_key = key4] || (_pseudos[_key] = {}), process.env.IS_STATIC === "is_static") {
              Object.assign(pseudos[key4], pseudoStyleObject);
              return;
            }
          }
          var descriptor = import_pseudoDescriptors.pseudoDescriptors[key4],
            isEnter = key4 === "enterStyle",
            isExit = key4 === "exitStyle";
          if (!descriptor) return;
          if (shouldDoClasses && !isExit) {
            var pseudoStyles = (0, import_getCSSStylesAtomic.getStyleAtomic)(pseudoStyleObject, descriptor);
            process.env.NODE_ENV === "development" && debug === "verbose" && console.info("pseudo:", key4, pseudoStyleObject, pseudoStyles);
            var _iteratorNormalCompletion2 = !0,
              _didIteratorError2 = !1,
              _iteratorError2 = void 0;
            try {
              for (var _iterator2 = pseudoStyles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
                var psuedoStyle = _step2.value,
                  fullKey = `${psuedoStyle[import_helpers.StyleObjectProperty]}${PROP_SPLIT}${descriptor.name}`;
                addStyleToInsertRules(rulesToInsert, psuedoStyle), classNames[fullKey] = psuedoStyle[import_helpers.StyleObjectIdentifier];
              }
            } catch (err) {
              _didIteratorError2 = !0, _iteratorError2 = err;
            } finally {
              try {
                !_iteratorNormalCompletion2 && _iterator2.return != null && _iterator2.return();
              } finally {
                if (_didIteratorError2) throw _iteratorError2;
              }
            }
          }
          if (!shouldDoClasses || isExit || isEnter) {
            var descriptorKey = descriptor.stateKey || descriptor.name,
              isDisabled = componentState[descriptorKey] === !1;
            isExit && (isDisabled = !styleProps.isExiting), isEnter && componentState.unmounted === !1 && (isDisabled = !0), process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed("pseudo", key4, {
              isDisabled
            }), (0, import_log.log)({
              pseudoStyleObject,
              isDisabled,
              descriptor,
              componentState
            }), console.groupEnd());
            var importance = descriptor.priority,
              pseudoOriginalValues = styleOriginalValues.get(pseudoStyleObject);
            for (var pkey in pseudoStyleObject) {
              var _$val = pseudoStyleObject[pkey];
              if (isDisabled) applyDefaultStyle(pkey, styleState);else {
                var curImportance = styleState.usedKeys[pkey] || 0,
                  shouldMerge = importance >= curImportance;
                if (shouldMerge) {
                  if (process.env.IS_STATIC === "is_static") {
                    var _pseudos1, _key1;
                    pseudos || (pseudos = {}), (_pseudos1 = pseudos)[_key1 = key4] || (_pseudos1[_key1] = {}), pseudos[key4][pkey] = _$val;
                  }
                  mergeStyle(styleState, pkey, _$val, importance, !1, pseudoOriginalValues?.[pkey]);
                }
                process.env.NODE_ENV === "development" && debug === "verbose" && (0, import_log.log)("    subKey", pkey, shouldMerge, {
                  importance,
                  curImportance,
                  pkey,
                  val: _$val
                });
              }
            }
            if (!isDisabled) for (var _$key in val2) {
              var k = shorthands[_$key] || _$key;
              styleState.usedKeys[k] = Math.max(importance, styleState.usedKeys[k] || 0);
            }
          }
          return;
        }
        if (isMedia) {
          if (!val2) return;
          var hasSpace = val2.space,
            mediaKeyShort = key4.slice(isMedia == "theme" ? 7 : 1);
          if (hasMedia || (hasMedia = !0), (hasSpace || !shouldDoClasses || styleProps.willBeAnimated) && ((!hasMedia || typeof hasMedia == "boolean") && (hasMedia = /* @__PURE__ */new Set()), hasMedia.add(mediaKeyShort)), isMedia === "platform" && !(0, import_isActivePlatform.isActivePlatform)(key4)) return;
          process.env.NODE_ENV === "development" && debug === "verbose" && (0, import_log.log)(`  \u{1F4FA} ${key4}`, {
            key: key4,
            val: val2,
            props,
            shouldDoClasses,
            acceptsClassName,
            componentState,
            mediaState
          });
          var priority = mediaStylesSeen;
          if (mediaStylesSeen += 1, shouldDoClasses) {
            var mediaStyle = getSubStyle(styleState, key4, val2, !1);
            if (hasSpace && (delete mediaStyle.space, mediaState[mediaKeyShort])) {
              var importance1 = (0, import_useMedia.getMediaImportanceIfMoreImportant)(mediaKeyShort, "space", styleState, !0);
              importance1 && (space = val2.space, styleState.usedKeys.space = importance1, process.env.NODE_ENV === "development" && debug === "verbose" && (0, import_log.log)(`Found more important space for current media ${mediaKeyShort}: ${val2} (importance: ${importance1})`));
            }
            var mediaStyles = (0, import_getCSSStylesAtomic.getCSSStylesAtomic)(mediaStyle),
              _iteratorNormalCompletion12 = !0,
              _didIteratorError12 = !1,
              _iteratorError12 = void 0;
            try {
              for (var _iterator12 = mediaStyles[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = !0) {
                var style3 = _step12.value,
                  property = style3[import_helpers.StyleObjectProperty],
                  isSubStyle = property[0] === "$";
                if (!(isSubStyle && !(0, import_isActivePlatform.isActivePlatform)(property))) {
                  var out = (0, import_createMediaStyle.createMediaStyle)(style3, mediaKeyShort, import_useMedia.mediaQueryConfig, isMedia, !1, priority);
                  process.env.NODE_ENV === "development" && debug === "verbose" && (0, import_log.log)("\u{1F4FA} media style:", out);
                  var subKey = isSubStyle ? style3[2] : "",
                    fullKey1 = `${style3[import_helpers.StyleObjectProperty]}${subKey}${PROP_SPLIT}${mediaKeyShort}${style3[import_helpers.StyleObjectPseudo] || ""}`;
                  addStyleToInsertRules(rulesToInsert, out), classNames[fullKey1] = out[import_helpers.StyleObjectIdentifier];
                }
              }
            } catch (err) {
              _didIteratorError12 = !0, _iteratorError12 = err;
            } finally {
              try {
                !_iteratorNormalCompletion12 && _iterator12.return != null && _iterator12.return();
              } finally {
                if (_didIteratorError12) throw _iteratorError12;
              }
            }
          } else {
            let mergeMediaStyle2 = function (key5, val3, originalVal2) {
              var _styleState4;
              (_styleState4 = styleState).style || (_styleState4.style = {});
              var didMerge = mergeMediaByImportance(styleState, mediaKeyShort, key5, val3, mediaState[mediaKeyShort], importanceBump, debug, originalVal2);
              didMerge && key5 === "fontFamily" && (styleState.fontFamily = mediaStyle1.fontFamily);
            };
            var mergeMediaStyle = mergeMediaStyle2,
              isThemeMedia = isMedia === "theme",
              isGroupMedia = isMedia === "group",
              isPlatformMedia = isMedia === "platform";
            if (!isThemeMedia && !isPlatformMedia && !isGroupMedia) {
              if (!mediaState[mediaKeyShort]) {
                process.env.NODE_ENV === "development" && debug === "verbose" && (0, import_log.log)(`  \u{1F4FA} \u274C DISABLED ${mediaKeyShort}`);
                return;
              }
              process.env.NODE_ENV === "development" && debug === "verbose" && (0, import_log.log)(`  \u{1F4FA} \u2705 ENABLED ${mediaKeyShort}`);
            }
            var mediaStyle1 = getSubStyle(styleState, key4, val2, !0),
              importanceBump = 0;
            if (isThemeMedia) {
              if (dynamicThemeAccess = !0, import_constants.isIos && (0, import_config.getSetting)("fastSchemeChange")) {
                var _styleState3;
                (_styleState3 = styleState).style || (_styleState3.style = {});
                var scheme = mediaKeyShort,
                  oppositeScheme = (0, import_getDynamicVal.getOppositeScheme)(mediaKeyShort),
                  themeOriginalValues = styleOriginalValues.get(mediaStyle1);
                for (var subKey1 in mediaStyle1) {
                  var _$val1 = (0, import_getDynamicVal.extractValueFromDynamic)(mediaStyle1[subKey1], scheme),
                    oppositeVal = (0, import_getDynamicVal.extractValueFromDynamic)(styleState.style[subKey1], oppositeScheme);
                  mediaStyle1[subKey1] = (0, import_getDynamicVal.getDynamicVal)({
                    scheme,
                    val: _$val1,
                    oppositeVal
                  }), mergeStyle(styleState, subKey1, mediaStyle1[subKey1], priority, !1, themeOriginalValues?.[subKey1]);
                }
              } else if (!(themeName === mediaKeyShort || themeName.startsWith(mediaKeyShort))) return;
            } else if (isGroupMedia) {
              var _groupContext_groupName,
                _componentState_group,
                groupInfo = (0, import_getGroupPropParts.getGroupPropParts)(mediaKeyShort),
                groupName = groupInfo.name,
                groupState = groupContext == null || (_groupContext_groupName = groupContext[groupName]) === null || _groupContext_groupName === void 0 ? void 0 : _groupContext_groupName.state,
                groupPseudoKey = groupInfo.pseudo,
                groupMediaKey = groupInfo.media;
              if (!groupState) {
                process.env.NODE_ENV === "development" && debug && (0, import_log.log)(`No parent with group prop, skipping styles: ${groupName}`), pseudoGroups || (pseudoGroups = /* @__PURE__ */new Set());
                return;
              }
              var componentGroupState = (_componentState_group = componentState.group) === null || _componentState_group === void 0 ? void 0 : _componentState_group[groupName];
              if (groupMediaKey) {
                mediaGroups || (mediaGroups = /* @__PURE__ */new Set()), mediaGroups.add(groupMediaKey);
                var mediaState1 = componentGroupState?.media,
                  isActive = mediaState1?.[groupMediaKey];
                if (!mediaState1 && groupState.layout && (isActive = (0, import_useMedia.mediaKeyMatch)(groupMediaKey, groupState.layout)), process.env.NODE_ENV === "development" && debug === "verbose" && (0, import_log.log)(` \u{1F3D8}\uFE0F GROUP media ${groupMediaKey} active? ${isActive}`, {
                  ...mediaState1,
                  usedKeys: {
                    ...styleState.usedKeys
                  }
                }), !isActive) {
                  for (var pkey1 in mediaStyle1) applyDefaultStyle(pkey1, styleState);
                  return;
                }
                importanceBump = 2;
              }
              if (groupPseudoKey) {
                var _this;
                pseudoGroups || (pseudoGroups = /* @__PURE__ */new Set()), pseudoGroups.add(groupName);
                var componentGroupPseudoState = (_this = componentGroupState || groupContext?.[groupName].state) === null || _this === void 0 ? void 0 : _this.pseudo,
                  isActive1 = componentGroupPseudoState?.[groupPseudoKey],
                  priority1 = import_pseudoDescriptors.pseudoPriorities[groupPseudoKey];
                if (process.env.NODE_ENV === "development" && debug === "verbose" && (0, import_log.log)(` \u{1F3D8}\uFE0F GROUP pseudo ${groupMediaKey} active? ${isActive1}, priority ${priority1}`, {
                  componentGroupPseudoState: {
                    ...componentGroupPseudoState
                  },
                  usedKeys: {
                    ...styleState.usedKeys
                  }
                }), !isActive1) {
                  for (var pkey2 in mediaStyle1) applyDefaultStyle(pkey2, styleState);
                  return;
                }
                importanceBump = priority1;
              }
            }
            var mediaOriginalValues = styleOriginalValues.get(mediaStyle1);
            for (var subKey2 in mediaStyle1) {
              if (subKey2 === "space") {
                space = valInit.space;
                continue;
              }
              if (subKey2[0] === "$") {
                if (!(0, import_isActivePlatform.isActivePlatform)(subKey2) || !(0, import_isActiveTheme.isActiveTheme)(subKey2, themeName)) continue;
                var subOriginalValues = styleOriginalValues.get(mediaStyle1[subKey2]);
                for (var subSubKey in mediaStyle1[subKey2]) mergeMediaStyle2(subSubKey, mediaStyle1[subKey2][subSubKey], subOriginalValues?.[subSubKey]);
              } else mergeMediaStyle2(subKey2, mediaStyle1[subKey2], mediaOriginalValues?.[subKey2]);
            }
          }
          return;
        }
        if (!isVariant) {
          if (isStyledContextProp) return;
          viewProps[key4] = val2;
        }
      }
    }), process.env.NODE_ENV === "development" && debug === "verbose") {
      try {
        (0, import_log.log)(" \u2714\uFE0F expand complete", keyInit), (0, import_log.log)("style", {
          ...styleState.style
        }), (0, import_log.log)("viewProps", {
          ...viewProps
        }), (0, import_log.log)("transforms", {
          ...styleState.flatTransforms
        });
      } catch {}
      console.groupEnd();
    }
  };
  conf = conf || (0, import_config.getConfig)();
  var animationDriver = componentContext?.animationDriver || conf.animations;
  if (props.passThrough) return null;
  import_constants.isWeb && styleProps.isAnimated && animationDriver.isReactNative && !styleProps.noNormalize && (styleProps.noNormalize = "values");
  var {
      shorthands
    } = conf,
    {
      isHOC,
      isText,
      isInput,
      variants,
      isReactNative,
      inlineProps,
      inlineWhenUnflattened,
      parentStaticConfig,
      acceptsClassName
    } = staticConfig,
    viewProps = {},
    mediaState = styleProps.mediaState || import_useMedia.mediaState,
    shouldDoClasses = acceptsClassName && import_constants.isWeb && !styleProps.noClass,
    rulesToInsert = void 0,
    classNames = {},
    pseudos = null,
    space = props.space,
    hasMedia = !1,
    dynamicThemeAccess,
    pseudoGroups,
    mediaGroups,
    className = props.className || "",
    mediaStylesSeen = 0,
    validStyles = staticConfig.validStyles || (staticConfig.isText || staticConfig.isInput ? import_helpers.stylePropsText : import_helpers.validStyles);
  process.env.NODE_ENV === "development" && debug === "profile" && time`split-styles-setup`;
  var styleState = {
    classNames,
    conf,
    props,
    styleProps,
    componentState,
    staticConfig,
    style: null,
    theme,
    usedKeys: {},
    viewProps,
    context: componentContext,
    debug
  };
  if (process.env.IS_STATIC === "is_static") {
    var {
      fallbackProps
    } = styleProps;
    fallbackProps && (styleState.props = new Proxy(props, {
      get(_, key4, val2) {
        return Reflect.has(props, key4) ? Reflect.get(props, key4) : Reflect.get(fallbackProps, key4);
      }
    }));
  }
  process.env.NODE_ENV === "development" && debug === "profile" && time`style-state`, process.env.NODE_ENV === "development" && debug === "verbose" && import_constants.isClient && import_isDevTools.isDevTools && (console.groupCollapsed("\u{1F539} getSplitStyles \u{1F447}"), (0, import_log.log)({
    props,
    staticConfig,
    shouldDoClasses,
    styleProps,
    rulesToInsert,
    componentState,
    styleState,
    theme: {
      ...theme
    }
  }));
  var {
      asChild
    } = props,
    {
      accept
    } = staticConfig,
    {
      noSkip,
      disableExpandShorthands,
      noExpand,
      styledContext
    } = styleProps,
    {
      webContainerType
    } = conf.settings,
    parentVariants = parentStaticConfig?.variants;
  for (var keyOg in props) _loop(keyOg);
  process.env.NODE_ENV === "development" && debug === "profile" && time`split-styles-propsend`;
  var avoidNormalize = styleProps.noNormalize === !1;
  if (!avoidNormalize) {
    if (styleState.style && ((0, import_expandStyles.fixStyles)(styleState.style), !styleProps.noExpand && !styleProps.noMergeStyle && import_constants.isWeb && (!isReactNative || !animationDriver.supportsCSS) && (0, import_getCSSStylesAtomic.styleToCSS)(styleState.style)), styleState.flatTransforms) {
      var _styleState;
      (_styleState = styleState).style || (_styleState.style = {}), mergeFlatTransforms(styleState.style, styleState.flatTransforms);
    }
    if (parentSplitStyles) {
      if (0 && shouldDoClasses) for (var key in parentSplitStyles.classNames) var val;
      if (!shouldDoClasses) for (var key1 in parentSplitStyles.style) {
        var _styleState1;
        key1 in classNames || styleState.style && key1 in styleState.style || ((_styleState1 = styleState).style || (_styleState1.style = {}), styleState.style[key1] = parentSplitStyles.style[key1]);
      }
    }
  }
  if (0) var _styleState_style, shouldStringifyTransforms;
  if (0) {
    if (!styleProps.noMergeStyle && styleState.style && shouldDoClasses) {
      var retainedStyles, shouldRetain;
      if (!styleState.style.$$css) {
        var atomic, _iteratorNormalCompletion, _didIteratorError, _iteratorError;
        try {
          for (var _iterator, _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) var atomicStyle, _props_animateOnly, _props_animateOnly1, key2, value, identifier, isAnimatedAndAnimateOnly, nonAnimatedAnimateOnly;
        } catch (err) {} finally {}
      }
    }
    if (isReactNative) {
      if (viewProps.tabIndex === 0) var _viewProps, _accessible;
    } else if (viewProps.tabIndex == null) var _viewProps_focusable, isFocusable, role;
  }
  var styleProp = props.style;
  if (!styleProps.noMergeStyle && styleProp) if (isHOC) viewProps.style = normalizeStyle(styleProp);else for (var isArray = Array.isArray(styleProp), len = isArray ? styleProp.length : 1, i = 0; i < len; i++) {
    var style = isArray ? styleProp[i] : styleProp;
    if (style) if (style.$$css) Object.assign(styleState.classNames, style);else {
      var _styleState2;
      (_styleState2 = styleState).style || (_styleState2.style = {}), Object.assign(styleState.style, normalizeStyle(style));
    }
  }
  if (viewProps.tabIndex === 0) {
    var _viewProps1, _accessible1;
    (_accessible1 = (_viewProps1 = viewProps).accessible) !== null && _accessible1 !== void 0 || (_viewProps1.accessible = !0);
  }
  var style1 = styleState.style;
  if (style1?.fontFamily) {
    var _getFont,
      faceInfo = (_getFont = (0, import_config.getFont)(style1.fontFamily)) === null || _getFont === void 0 ? void 0 : _getFont.face;
    if (faceInfo) {
      var _faceInfo_style_fontWeight_,
        _faceInfo_style_fontWeight,
        overrideFace = (_faceInfo_style_fontWeight = faceInfo[style1.fontWeight]) === null || _faceInfo_style_fontWeight === void 0 || (_faceInfo_style_fontWeight_ = _faceInfo_style_fontWeight[style1.fontStyle || "normal"]) === null || _faceInfo_style_fontWeight_ === void 0 ? void 0 : _faceInfo_style_fontWeight_.val;
      overrideFace && (style1.fontFamily = overrideFace, styleState.fontFamily = overrideFace, delete style1.fontWeight, delete style1.fontStyle);
    }
    process.env.NODE_ENV === "development" && debug && debug !== "profile" && (0, import_log.log)(`Found fontFamily native: ${style1.fontFamily}`, faceInfo);
  }
  process.env.NODE_ENV === "development" && debug === "profile" && time`split-styles-pre-result`;
  var result = {
      space,
      hasMedia,
      fontFamily: styleState.fontFamily,
      viewProps,
      style: styleState.style,
      pseudos,
      classNames,
      rulesToInsert,
      dynamicThemeAccess,
      pseudoGroups,
      mediaGroups,
      overriddenContextProps: styleState.overriddenContextProps
    },
    asChildExceptStyleLike = asChild === "except-style" || asChild === "except-style-web";
  if (!styleProps.noMergeStyle && !asChildExceptStyleLike) {
    var style2 = styleState.style;
    if (0) {
      var _staticConfig_defaultProps, fontFamily, fontFamilyClassName, groupClassName, componentNameFinal, componentClassName, classList, finalClassName;
      if (!(styleProps.isAnimated && isReactNative)) {
        if (isReactNative) {
          var cnStyles, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1;
          try {
            for (var _iterator1, _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) var name;
          } catch (err) {} finally {}
        }
      }
    } else style2 && (viewProps.style = style2);
  }
  if (process.env.NODE_ENV === "development" && debug === "verbose" && import_constants.isClient && import_isDevTools.isDevTools) {
    console.groupEnd(), console.groupCollapsed("\u{1F539} getSplitStyles ===>");
    try {
      var logs = {
        ...result,
        className,
        componentState,
        viewProps,
        rulesToInsert,
        parentSplitStyles
      };
      for (var key3 in logs) (0, import_log.log)(key3, logs[key3]);
    } catch {}
    console.groupEnd();
  }
  return process.env.NODE_ENV === "development" && debug === "profile" && time`split-styles-done`, result;
};
function mergeFlatTransforms(target, flatTransforms) {
  Object.entries(flatTransforms).sort(function (param, param1) {
    var [a] = param,
      [b] = param1;
    return (0, import_sortString.sortString)(a, b);
  }).forEach(function (param) {
    var [key, val] = param;
    mergeTransform(target, key, val, !0);
  });
}
function mergeStyle(styleState, key, val, importance) {
  var disableNormalize = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1,
    originalVal = arguments.length > 5 ? arguments[5] : void 0,
    _staticConfig_context,
    _staticConfig_parentStaticConfig_context,
    _staticConfig_parentStaticConfig,
    {
      viewProps,
      styleProps,
      staticConfig,
      usedKeys
    } = styleState,
    existingImportance = usedKeys[key] || 0;
  if (!(existingImportance > importance)) {
    var contextProps = ((_staticConfig_context = staticConfig.context) === null || _staticConfig_context === void 0 ? void 0 : _staticConfig_context.props) || ((_staticConfig_parentStaticConfig = staticConfig.parentStaticConfig) === null || _staticConfig_parentStaticConfig === void 0 || (_staticConfig_parentStaticConfig_context = _staticConfig_parentStaticConfig.context) === null || _staticConfig_parentStaticConfig_context === void 0 ? void 0 : _staticConfig_parentStaticConfig_context.props);
    if (contextProps && key in contextProps) {
      var _styleState_originalContextPropValues, _styleState;
      (_styleState = styleState).overriddenContextProps || (_styleState.overriddenContextProps = {});
      var originalFromState = (_styleState_originalContextPropValues = styleState.originalContextPropValues) === null || _styleState_originalContextPropValues === void 0 ? void 0 : _styleState_originalContextPropValues[key],
        _ref;
      styleState.overriddenContextProps[key] = (_ref = originalVal ?? originalFromState) !== null && _ref !== void 0 ? _ref : val;
    }
    if (key in import_helpers.stylePropsTransform) {
      var _styleState1;
      (_styleState1 = styleState).flatTransforms || (_styleState1.flatTransforms = {}), usedKeys[key] = importance, styleState.flatTransforms[key] = val;
    } else {
      var shouldNormalize = import_constants.isWeb && !disableNormalize && !styleProps.noNormalize,
        out = shouldNormalize ? (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(val, key) : val;
      if (
      // accept is for props not styles
      staticConfig.accept && key in staticConfig.accept) viewProps[key] = out;else {
        var _styleState2;
        (_styleState2 = styleState).style || (_styleState2.style = {}), usedKeys[key] = importance, styleState.style[key] =
        // if you dont do this you'll be passing props.transform arrays directly here and then mutating them
        // if theres any flatTransforms later, causing issues (mutating props is bad, in strict mode styles get borked)
        key === "transform" && Array.isArray(out) ? [...out] : out;
      }
    }
  }
}
var getSubStyle = function (styleState, subKey, styleIn, avoidMergeTransform) {
    var _loop = function (key1) {
        var val = styleIn[key1];
        key1 = conf2.shorthands[key1] || key1;
        var shouldSkip = !staticConfig.isHOC && key1 in import_skipProps.skipProps && !styleProps.noSkip;
        if (shouldSkip) return key = key1, "continue";
        (0, import_propMapper.propMapper)(key1, val, styleState, !1, function (skey, sval, originalVal) {
          originalVal !== void 0 && (originalValues || (originalValues = {}), originalValues[skey] = originalVal), skey in import_helpers.validPseudoKeys && (sval = getSubStyle(styleState, skey, sval, avoidMergeTransform)), !avoidMergeTransform && skey in import_helpers.stylePropsTransform ? mergeTransform(styleOut, skey, sval) : styleOut[skey] = styleProps.noNormalize ? sval : (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(sval, key1);
        }), key = key1;
      },
      {
        staticConfig,
        conf: conf2,
        styleProps
      } = styleState,
      styleOut = {},
      originalValues;
    for (var key in styleIn) _loop(key);
    if (!avoidMergeTransform) {
      if (Array.isArray(styleOut.transform)) {
        var _styleState_style,
          parentTransform = (_styleState_style = styleState.style) === null || _styleState_style === void 0 ? void 0 : _styleState_style.transform;
        parentTransform && (styleOut.transform = [...parentTransform, ...styleOut.transform]);
      }
      styleState.flatTransforms && mergeFlatTransforms(styleOut, styleState.flatTransforms);
    }
    return styleProps.noNormalize || (0, import_expandStyles.fixStyles)(styleOut), originalValues && styleOriginalValues.set(styleOut, originalValues), styleOut;
  },
  useInsertEffectCompat = import_constants.isWeb ? import_react.default.useInsertionEffect || import_constants.useIsomorphicLayoutEffect : function () {},
  useSplitStyles = function (a, b, c, d, e, f, g, h, i, j, k, l) {
    var res = getSplitStyles(a, b, c, d, e, f, g, h, i, j, k, l);
    return res;
  };
function addStyleToInsertRules(rulesToInsert, styleObject) {
  if (0) var identifier;
}
var defaultColor = process.env.TAMAGUI_DEFAULT_COLOR || "rgba(0,0,0,0)",
  animatableDefaults = {
    ...Object.fromEntries(Object.entries(import_helpers.tokenCategories.color).map(function (param) {
      var [k, v] = param;
      return [k, defaultColor];
    })),
    opacity: 1,
    scale: 1,
    rotate: "0deg",
    rotateY: "0deg",
    rotateX: "0deg",
    x: 0,
    y: 0,
    borderRadius: 0
  },
  lowercaseHyphenate = function (match) {
    return `-${match.toLowerCase()}`;
  },
  hyphenate = function (str) {
    return str.replace(/[A-Z]/g, lowercaseHyphenate);
  },
  mergeTransform = function (obj, key, val) {
    var backwards = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1,
      _obj;
    typeof obj.transform != "string" && ((_obj = obj).transform || (_obj.transform = []), obj.transform[backwards ? "unshift" : "push"]({
      [mapTransformKeys[key] || key]: val
    }));
  },
  mapTransformKeys = {
    x: "translateX",
    y: "translateY"
  };
function passDownProp(viewProps, key, val) {
  var shouldMergeObject = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (shouldMergeObject) {
    var next = {
      ...viewProps[key],
      ...val
    };
    delete viewProps[key], viewProps[key] = next;
  } else viewProps[key] = val;
}
function mergeMediaByImportance(styleState, mediaKey, key, value, isSizeMedia, importanceBump, debugProp, originalVal) {
  var usedKeys = styleState.usedKeys,
    importance = (0, import_useMedia.getMediaImportanceIfMoreImportant)(mediaKey, key, styleState, isSizeMedia);
  if (importanceBump && (importance = (importance || 0) + importanceBump), process.env.NODE_ENV === "development" && debugProp === "verbose" && (0, import_log.log)(`mergeMediaByImportance ${key} importance usedKey ${usedKeys[key]} next ${importance}`), importance === null) return !1;
  if (key in import_pseudoDescriptors.pseudoDescriptors) {
    var descriptor = import_pseudoDescriptors.pseudoDescriptors[key],
      descriptorKey = descriptor.stateKey || descriptor.name,
      isDisabled = styleState.componentState[descriptorKey] === !1;
    if (isDisabled) return !1;
    var pseudoOriginalValues = styleOriginalValues.get(value);
    for (var subKey in value) mergeStyle(styleState, subKey, value[subKey], importance, !1, pseudoOriginalValues?.[subKey]);
  } else mergeStyle(styleState, key, value, importance, !1, originalVal);
  return !0;
}
function normalizeStyle(style) {
  var out = {};
  for (var key in style) {
    var val = style[key];
    key in import_helpers.stylePropsTransform ? mergeTransform(out, key, val) : out[key] = (0, import_normalizeValueWithProperty.normalizeValueWithProperty)(val, key);
  }
  return import_constants.isWeb && Array.isArray(out.transform) && (out.transform = (0, import_transformsToString.transformsToString)(out.transform)), (0, import_expandStyles.fixStyles)(out), out;
}
function applyDefaultStyle(pkey, styleState) {
  var defaultValues = animatableDefaults[pkey];
  defaultValues != null && !(pkey in styleState.usedKeys) && (!styleState.style || !(pkey in styleState.style)) && mergeStyle(styleState, pkey, defaultValues, 1);
}
//# sourceMappingURL=getSplitStyles.native.js.map
