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
var useMedia_exports = {};
__export(useMedia_exports, {
  _disableMediaTouch: () => _disableMediaTouch,
  configureMedia: () => configureMedia,
  getMedia: () => getMedia,
  getMediaImportanceIfMoreImportant: () => getMediaImportanceIfMoreImportant,
  getMediaKey: () => getMediaKey,
  getMediaKeyImportance: () => getMediaKeyImportance,
  getMediaState: () => getMediaState,
  isMediaKey: () => isMediaKey,
  mediaKeyMatch: () => mediaKeyMatch,
  mediaKeyToQuery: () => mediaKeyToQuery,
  mediaKeys: () => mediaKeys,
  mediaObjectToString: () => mediaObjectToString,
  mediaQueryConfig: () => mediaQueryConfig,
  mediaState: () => mediaState,
  setMediaShouldUpdate: () => setMediaShouldUpdate,
  setupMediaListeners: () => setupMediaListeners,
  updateMediaListeners: () => updateMediaListeners,
  useMedia: () => useMedia
});
module.exports = __toCommonJS(useMedia_exports);
var import_constants = require("@tamagui/constants"),
  import_react = require("react"),
  import_config = require("../config.native.js"),
  import_matchMedia = require("../helpers/matchMedia.native.js"),
  import_pseudoDescriptors = require("../helpers/pseudoDescriptors.native.js"),
  mediaState =
  // development only safeguard
  process.env.NODE_ENV === "development" ? new Proxy({}, {
    get(target, key) {
      if (typeof key == "string" && key[0] === "$" &&
      // dont error on $$typeof
      key[1] !== "$") throw new Error(`Access mediaState should not use "$": ${key}`);
      return Reflect.get(target, key);
    }
  }) : {},
  mediaQueryConfig = {},
  getMedia = function () {
    return mediaState;
  },
  mediaKeys = /* @__PURE__ */new Set(),
  mediaKeyRegex = /\$(platform|theme|group)-/,
  isMediaKey = function (key) {
    return key[0] !== "$" ? !1 : !!(mediaKeys.has(key) || mediaKeyRegex.test(key));
  },
  getMediaKey = function (key) {
    if (key[0] !== "$") return !1;
    if (mediaKeys.has(key)) return !0;
    var match = key.match(mediaKeyRegex);
    return match ? match[1] : !1;
  },
  initState,
  mediaKeysOrdered,
  getMediaKeyImportance = function (key) {
    if (process.env.NODE_ENV === "development" && key[0] === "$") throw new Error("use short key");
    var conf = (0, import_config.getConfig)();
    return conf.settings.mediaPropOrder ? import_pseudoDescriptors.defaultMediaImportance : mediaKeysOrdered.indexOf(key) + 100;
  },
  dispose = /* @__PURE__ */new Set(),
  mediaVersion = 0,
  configureMedia = function (config) {
    var {
        media
      } = config,
      mediaQueryDefaultActive = (0, import_config.getSetting)("mediaQueryDefaultActive");
    if (media) {
      mediaVersion++;
      for (var key in media) mediaState[key] = mediaQueryDefaultActive?.[key] || !1, mediaKeys.add(`$${key}`);
      Object.assign(mediaQueryConfig, media), initState = {
        ...mediaState
      }, mediaKeysOrdered = Object.keys(media), setupMediaListeners();
    }
  };
function unlisten() {
  dispose.forEach(function (cb) {
    return cb();
  }), dispose.clear();
}
var setupVersion = -1;
function setupMediaListeners() {
  var _loop = function (key2) {
    var str = mediaObjectToString(mediaQueryConfig[key2], key2),
      getMatch = function () {
        return (0, import_matchMedia.matchMedia)(str);
      },
      match = getMatch();
    if (!match) throw new Error("\u26A0\uFE0F No match");
    match.addListener(update), dispose.add(function () {
      match.removeListener(update);
    });
    function update() {
      var next = !!getMatch().matches;
      next !== mediaState[key2] && (mediaState = {
        ...mediaState,
        [key2]: next
      }, updateMediaListeners());
    }
    update();
  };
  if (!(import_constants.isWeb && import_constants.isServer) && !process.env.IS_STATIC && setupVersion !== mediaVersion) {
    setupVersion = mediaVersion, unlisten();
    for (var key in mediaQueryConfig) _loop(key);
  }
}
var listeners = /* @__PURE__ */new Set();
function updateMediaListeners() {
  listeners.forEach(function (cb) {
    return cb(mediaState);
  });
}
var States = /* @__PURE__ */new WeakMap();
function setMediaShouldUpdate(ref, enabled, keys) {
  var cur = States.get(ref);
  (!cur || cur.enabled !== enabled || keys) && States.set(ref, {
    ...cur,
    enabled,
    keys
  });
}
function subscribe(subscriber) {
  return listeners.add(subscriber), function () {
    listeners.delete(subscriber);
  };
}
function useMedia(componentContext, debug) {
  var componentState = componentContext ? States.get(componentContext) : null,
    internalRef = (0, import_react.useRef)(null);
  internalRef.current || (internalRef.current = {
    keys: /* @__PURE__ */new Set(),
    lastState: mediaState
  }), internalRef.current.pendingState && (internalRef.current.lastState = internalRef.current.pendingState, internalRef.current.pendingState = void 0);
  var {
    keys
  } = internalRef.current;
  keys.size && keys.clear();
  var state = (0, import_react.useSyncExternalStore)(subscribe, function () {
    var curKeys = componentState?.keys || keys,
      {
        lastState,
        pendingState
      } = internalRef.current;
    if (!curKeys.size) return lastState;
    var _iteratorNormalCompletion = !0,
      _didIteratorError = !1,
      _iteratorError = void 0;
    try {
      for (var _iterator = curKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
        var key = _step.value;
        if (mediaState[key] !== (pendingState || lastState)[key]) return process.env.NODE_ENV === "development" && debug && console.warn("useMedia() \u270D\uFE0F", key, lastState[key], "=>", mediaState[key]), componentContext?.mediaEmit ? (componentContext.mediaEmit(mediaState), internalRef.current.pendingState = mediaState, lastState) : (internalRef.current.lastState = mediaState, mediaState);
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
    return lastState;
  }, getServerSnapshot);
  return new Proxy(state, {
    get(_, key) {
      return !disableMediaTouch && typeof key == "string" && keys.add(key), Reflect.get(state, key);
    }
  });
}
var getServerSnapshot = function () {
    return initState;
  },
  disableMediaTouch = !1;
function _disableMediaTouch(val) {
  disableMediaTouch = val;
}
function getMediaState(mediaGroups, layout) {
  disableMediaTouch = !0;
  var res;
  try {
    res = Object.fromEntries([...mediaGroups].map(function (mediaKey) {
      return [mediaKey, mediaKeyMatch(mediaKey, layout)];
    }));
  } finally {
    disableMediaTouch = !1;
  }
  return res;
}
var getMediaImportanceIfMoreImportant = function (mediaKey, key, styleState, isSizeMedia) {
  var importance = isSizeMedia && !(0, import_config.getSetting)("mediaPropOrder") ? getMediaKeyImportance(mediaKey) : import_pseudoDescriptors.defaultMediaImportance,
    usedKeys = styleState.usedKeys;
  return !usedKeys[key] || importance > usedKeys[key] ? importance : null;
};
function camelToHyphen(str) {
  return str.replace(/[A-Z]/g, function (m) {
    return `-${m.toLowerCase()}`;
  }).toLowerCase();
}
var cache = /* @__PURE__ */new WeakMap(),
  cachedMediaKeyToQuery = {};
function mediaObjectToString(query, key) {
  if (typeof query == "string") return query;
  if (cache.has(query)) return cache.get(query);
  var res = Object.entries(query).map(function (param) {
    var [feature, value] = param;
    return feature = camelToHyphen(feature), typeof value == "string" ? `(${feature}: ${value})` : (typeof value == "number" && /[height|width]$/.test(feature) && (value = `${value}px`), `(${feature}: ${value})`);
  }).join(" and ");
  return key && (cachedMediaKeyToQuery[key] = res), cache.set(query, res), res;
}
function mediaKeyToQuery(key) {
  return cachedMediaKeyToQuery[key] || mediaObjectToString(mediaQueryConfig[key], key);
}
function mediaKeyMatch(key, dimensions) {
  var mediaQueries = mediaQueryConfig[key],
    result = Object.keys(mediaQueries).every(function (query) {
      var expectedVal = +mediaQueries[query],
        isMax = query.startsWith("max"),
        isWidth = query.endsWith("Width"),
        givenVal = dimensions[isWidth ? "width" : "height"];
      return isMax ? givenVal < expectedVal : givenVal > expectedVal;
    });
  return result;
}
//# sourceMappingURL=useMedia.native.js.map
