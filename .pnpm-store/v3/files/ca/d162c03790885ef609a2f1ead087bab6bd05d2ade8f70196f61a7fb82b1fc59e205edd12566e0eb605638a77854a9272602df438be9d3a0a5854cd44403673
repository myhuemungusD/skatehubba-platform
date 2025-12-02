"use strict";

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
var useThemeState_exports = {};
__export(useThemeState_exports, {
  ThemeStateContext: () => ThemeStateContext,
  forceUpdateThemes: () => forceUpdateThemes,
  getRootThemeState: () => getRootThemeState,
  getThemeState: () => getThemeState,
  hasThemeUpdatingProps: () => hasThemeUpdatingProps,
  useThemeState: () => useThemeState
});
module.exports = __toCommonJS(useThemeState_exports);
var import_constants = require("@tamagui/constants"),
  import_react = require("react"),
  import_config = require("../config.native.js"),
  import_constants2 = require("../constants/constants.native.js"),
  ThemeStateContext = (0, import_react.createContext)(""),
  allListeners = /* @__PURE__ */new Map(),
  listenersByParent = {},
  HasRenderedOnce = /* @__PURE__ */new WeakMap(),
  HadTheme = /* @__PURE__ */new WeakMap(),
  PendingUpdate = /* @__PURE__ */new Map(),
  states = /* @__PURE__ */new Map(),
  localStates = /* @__PURE__ */new Map(),
  shouldForce = !1,
  forceUpdateThemes = function () {
    cacheVersion++, shouldForce = !0, allListeners.forEach(function (cb) {
      return cb();
    });
  },
  getThemeState = function (id) {
    return states.get(id);
  },
  cacheVersion = 0,
  themes = null,
  rootThemeState = null,
  getRootThemeState = function () {
    return rootThemeState;
  },
  useThemeState = function (props) {
    var isRoot = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1,
      keys = arguments.length > 2 ? arguments[2] : void 0,
      {
        disable
      } = props,
      parentId = (0, import_react.useContext)(ThemeStateContext);
    if (!parentId && !isRoot) throw new Error(import_constants2.MISSING_THEME_MESSAGE);
    if (disable) return states.get(parentId) || {
      id: "",
      name: "light",
      theme: (0, import_config.getConfig)().themes.light,
      inverses: 0
    };
    var id = (0, import_react.useId)(),
      subscribe = (0, import_react.useCallback)(function (cb) {
        var _listenersByParent, _parentId;
        return (_listenersByParent = listenersByParent)[_parentId = parentId] || (_listenersByParent[_parentId] = /* @__PURE__ */new Set()), listenersByParent[parentId].add(id), allListeners.set(id, function () {
          PendingUpdate.set(id, shouldForce ? "force" : !0), cb();
        }), function () {
          allListeners.delete(id), listenersByParent[parentId].delete(id), localStates.delete(id), states.delete(id), PendingUpdate.delete(id);
        };
      }, [id, parentId]),
      propsKey = getPropsKey(props),
      getSnapshot = function () {
        var _keys_current,
          _props_needsUpdate,
          local = localStates.get(id),
          needsUpdate = props.passThrough ? !1 : isRoot || props.name === "light" || props.name === "dark" || props.name === null ? !0 : HasRenderedOnce.get(keys) ? !(keys == null || (_keys_current = keys.current) === null || _keys_current === void 0) && _keys_current.size ? !0 : (_props_needsUpdate = props.needsUpdate) === null || _props_needsUpdate === void 0 ? void 0 : _props_needsUpdate.call(props) : !0,
          [rerender, next] = getNextState(local, props, propsKey, isRoot, id, parentId, needsUpdate, PendingUpdate.get(id));
        return PendingUpdate.delete(id), (!local || rerender) && (local = {
          ...next
        }, localStates.set(id, local)), process.env.NODE_ENV === "development" && props.debug === "verbose" && (console.groupCollapsed(` ${id} getSnapshot ${rerender}`, local.name, ">", next.name), console.info({
          props,
          propsKey,
          isRoot,
          parentId,
          local,
          next,
          needsUpdate
        }), console.groupEnd()), Object.assign(local, next), local.id = id, states.set(id, next), local;
      };
    process.env.NODE_ENV === "development" && globalThis.time && globalThis.time`theme-prep-uses`;
    var state = (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
    return (0, import_constants.useIsomorphicLayoutEffect)(function () {
      if (!HasRenderedOnce.get(keys)) {
        HasRenderedOnce.set(keys, !0);
        return;
      }
      if (!propsKey) {
        HadTheme.get(keys) && scheduleUpdate(id), HadTheme.set(keys, !1);
        return;
      }
      if (process.env.NODE_ENV === "development" && props.debug === "verbose") {
        var _states_get;
        console.warn(` \xB7 useTheme(${id}) scheduleUpdate`, propsKey, (_states_get = states.get(id)) === null || _states_get === void 0 ? void 0 : _states_get.name);
      }
      scheduleUpdate(id), HadTheme.set(keys, !0);
    }, [keys, propsKey]), state;
  },
  getNextState = function (lastState, props, propsKey) {
    var isRoot = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1,
      id = arguments.length > 4 ? arguments[4] : void 0,
      parentId = arguments.length > 5 ? arguments[5] : void 0,
      needsUpdate = arguments.length > 6 ? arguments[6] : void 0,
      pendingUpdate = arguments.length > 7 ? arguments[7] : void 0,
      {
        debug
      } = props,
      parentState = states.get(parentId);
    if (props.passThrough) return [!1, lastState || parentState || {
      name: ""
    }];
    themes || (themes = (0, import_config.getConfig)().themes);
    var name = !propsKey && (!lastState || !lastState?.isNew) ? null : getNewThemeName(parentState?.name, props, pendingUpdate === "force" ? !0 : !!needsUpdate),
      isSameAsParent = parentState && (!name || name === parentState.name),
      shouldRerender = !!(needsUpdate && (pendingUpdate || lastState?.name !== parentState?.name));
    if (process.env.NODE_ENV === "development" && debug === "verbose") {
      var message = ` \xB7 useTheme(${id}) getNextState => ${name} needsUpdate ${needsUpdate} shouldRerender ${shouldRerender}`;
      console.info(message);
    }
    if (isSameAsParent) return [shouldRerender, {
      ...parentState,
      isNew: !1
    }];
    if (!name) {
      var next = lastState ?? parentState;
      if (!next) throw new Error(import_constants2.MISSING_THEME_MESSAGE);
      if (shouldRerender) {
        var updated = {
          ...(parentState || lastState)
        };
        return [!0, updated];
      }
      return [!1, next];
    }
    var scheme = getScheme(name),
      _parentState_inverses,
      parentInverses = (_parentState_inverses = parentState?.inverses) !== null && _parentState_inverses !== void 0 ? _parentState_inverses : 0,
      isInverse = parentState && scheme !== parentState.scheme,
      inverses = parentInverses + (isInverse ? 1 : 0),
      nextState = {
        id,
        name,
        theme: themes[name],
        scheme,
        parentId,
        parentName: parentState?.name,
        inverses,
        isInverse,
        isNew: !0
      };
    if (isRoot && (rootThemeState = nextState), pendingUpdate !== "force" && lastState && lastState.name === name) return [!1, nextState];
    var shouldAvoidRerender = pendingUpdate !== "force" && lastState && !needsUpdate && nextState.name === lastState.name;
    return process.env.NODE_ENV === "development" && debug === "verbose" && (console.groupCollapsed(` \xB7 useTheme(${id}) \u23ED\uFE0F ${name} shouldAvoidRerender: ${shouldAvoidRerender}`), console.info({
      lastState,
      needsUpdate,
      nextState,
      pendingUpdate
    }), console.groupEnd()), shouldAvoidRerender ? [!1, nextState] : [!0, nextState];
  };
function scheduleUpdate(id) {
  for (var queue = [id], visited = /* @__PURE__ */new Set(); queue.length;) {
    var parent = queue.shift(),
      children = listenersByParent[parent];
    if (children) {
      var _iteratorNormalCompletion = !0,
        _didIteratorError = !1,
        _iteratorError = void 0;
      try {
        for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var childId = _step.value;
          visited.has(childId) || (visited.add(childId), queue.push(childId));
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
    }
  }
  visited.forEach(function (childId2) {
    var cb = allListeners.get(childId2);
    cb?.();
  });
}
var validSchemes = {
  light: "light",
  dark: "dark"
};
function getScheme(name) {
  return validSchemes[name.split("_")[0]];
}
function getNewThemeName() {
  var parentName = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "",
    {
      name,
      reset,
      componentName,
      inverse,
      debug
    } = arguments.length > 1 ? arguments[1] : void 0,
    forceUpdate = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  if (name && reset) throw new Error(process.env.NODE_ENV === "production" ? "\u274C004" : "Cannot reset and set a new name at the same time.");
  var {
    themes: themes2
  } = (0, import_config.getConfig)();
  if (reset) {
    var isSchemeOnly = parentName === "light" || parentName === "dark";
    if (isSchemeOnly) return parentName === "light" ? "dark" : "light";
    var lastPartIndex = parentName.lastIndexOf("_"),
      name1 = lastPartIndex <= 0 ? parentName : parentName.slice(lastPartIndex),
      scheme = parentName.slice(0, lastPartIndex),
      result = themes2[name1] ? name1 : scheme;
    return result;
  }
  var parentParts = parentName.split("_"),
    lastName = parentParts[parentParts.length - 1];
  lastName && lastName[0].toLowerCase() !== lastName[0] && parentParts.pop();
  var subNames = [name && componentName ? `${name}_${componentName}` : void 0, name, componentName].filter(Boolean),
    found = null;
  if (name) {
    var nameHasScheme = getScheme(name);
    if (nameHasScheme) {
      var _iteratorNormalCompletion = !0,
        _didIteratorError = !1,
        _iteratorError = void 0;
      try {
        for (var _iterator = subNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
          var subName = _step.value;
          if (subName in themes2) {
            found = subName;
            break;
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
    }
    if (!found && !nameHasScheme) {
      var parentScheme = getScheme(parentName);
      if (parentScheme) {
        var parentBase = parentParts.join("_"),
          withScheme = [componentName ? `${parentBase}_${name}_${componentName}` : void 0, `${parentBase}_${name}`, componentName ? `${parentScheme}_${name}_${componentName}` : void 0, `${parentScheme}_${name}`].filter(Boolean),
          _iteratorNormalCompletion1 = !0,
          _didIteratorError1 = !1,
          _iteratorError1 = void 0;
        try {
          for (var _iterator1 = withScheme[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = !0) {
            var potential = _step1.value;
            if (potential in themes2) {
              found = potential;
              break;
            }
          }
        } catch (err) {
          _didIteratorError1 = !0, _iteratorError1 = err;
        } finally {
          try {
            !_iteratorNormalCompletion1 && _iterator1.return != null && _iterator1.return();
          } finally {
            if (_didIteratorError1) throw _iteratorError1;
          }
        }
      }
    }
  }
  if (!found) if (!name && componentName) {
    var potential1 = `${parentParts.join("_")}_${componentName}`;
    potential1 in themes2 && (found = potential1);
  } else for (var max = parentParts.length, i = 0; i <= max; i++) {
    var base = (i === 0 ? parentParts : parentParts.slice(0, -i)).join("_"),
      _iteratorNormalCompletion2 = !0,
      _didIteratorError2 = !1,
      _iteratorError2 = void 0;
    try {
      for (var _iterator2 = subNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = !0) {
        var subName1 = _step2.value,
          potential2 = base ? `${base}_${subName1}` : subName1;
        if (potential2 in themes2) {
          found = potential2;
          break;
        }
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
    if (found) break;
  }
  if (inverse) {
    found || (found = parentName);
    var scheme1 = found.split("_")[0];
    found = found.replace(new RegExp(`^${scheme1}`), scheme1 === "light" ? "dark" : "light");
  }
  return !forceUpdate && found === parentName &&
  // if its a scheme only sub-theme, we always consider it "new" because it likely inverses
  // and we want to avoid reparenting
  !validSchemes[found] ? null : found;
}
var getPropsKey = function (param) {
    var {
      name,
      reset,
      inverse,
      forceClassName,
      componentName
    } = param;
    return `${name || ""}${inverse || ""}${reset || ""}${forceClassName || ""}${componentName || ""}`;
  },
  hasThemeUpdatingProps = function (props) {
    return "inverse" in props || "name" in props || "reset" in props || "forceClassName" in props;
  };
//# sourceMappingURL=useThemeState.native.js.map
