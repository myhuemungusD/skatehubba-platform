var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);
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
var import_constants = require("@tamagui/constants"), import_react = require("react"), import_config = require("../config"), import_matchMedia = require("../helpers/matchMedia"), import_pseudoDescriptors = require("../helpers/pseudoDescriptors");
let mediaState = (
  // development only safeguard
  process.env.NODE_ENV === "development" ? new Proxy(
    {},
    {
      get(target, key) {
        if (typeof key == "string" && key[0] === "$" && // dont error on $$typeof
        key[1] !== "$")
          throw new Error(`Access mediaState should not use "$": ${key}`);
        return Reflect.get(target, key);
      }
    }
  ) : {}
);
const mediaQueryConfig = {}, getMedia = () => mediaState, mediaKeys = /* @__PURE__ */ new Set(), mediaKeyRegex = /\$(platform|theme|group)-/, isMediaKey = (key) => key[0] !== "$" ? !1 : !!(mediaKeys.has(key) || mediaKeyRegex.test(key)), getMediaKey = (key) => {
  if (key[0] !== "$") return !1;
  if (mediaKeys.has(key)) return !0;
  const match = key.match(mediaKeyRegex);
  return match ? match[1] : !1;
};
let initState, mediaKeysOrdered;
const getMediaKeyImportance = (key) => {
  if (process.env.NODE_ENV === "development" && key[0] === "$")
    throw new Error("use short key");
  return (0, import_config.getConfig)().settings.mediaPropOrder ? import_pseudoDescriptors.defaultMediaImportance : mediaKeysOrdered.indexOf(key) + 100;
}, dispose = /* @__PURE__ */ new Set();
let mediaVersion = 0;
const configureMedia = (config) => {
  const { media } = config, mediaQueryDefaultActive = (0, import_config.getSetting)("mediaQueryDefaultActive");
  if (media) {
    mediaVersion++;
    for (const key in media)
      mediaState[key] = mediaQueryDefaultActive?.[key] || !1, mediaKeys.add(`$${key}`);
    Object.assign(mediaQueryConfig, media), initState = { ...mediaState }, mediaKeysOrdered = Object.keys(media), setupMediaListeners();
  }
};
function unlisten() {
  dispose.forEach((cb) => cb()), dispose.clear();
}
let setupVersion = -1;
function setupMediaListeners() {
  if (!(import_constants.isWeb && import_constants.isServer) && !process.env.IS_STATIC && setupVersion !== mediaVersion) {
    setupVersion = mediaVersion, unlisten();
    for (const key in mediaQueryConfig) {
      let update = function() {
        const next = !!getMatch().matches;
        next !== mediaState[key] && (mediaState = { ...mediaState, [key]: next }, updateMediaListeners());
      };
      const str = mediaObjectToString(mediaQueryConfig[key], key), getMatch = () => (0, import_matchMedia.matchMedia)(str), match = getMatch();
      if (!match)
        throw new Error("\u26A0\uFE0F No match");
      match.addListener(update), dispose.add(() => {
        match.removeListener(update);
      }), update();
    }
  }
}
const listeners = /* @__PURE__ */ new Set();
function updateMediaListeners() {
  listeners.forEach((cb) => cb(mediaState));
}
const States = /* @__PURE__ */ new WeakMap();
function setMediaShouldUpdate(ref, enabled, keys) {
  const cur = States.get(ref);
  (!cur || cur.enabled !== enabled || keys) && States.set(ref, {
    ...cur,
    enabled,
    keys
  });
}
function subscribe(subscriber) {
  return listeners.add(subscriber), () => {
    listeners.delete(subscriber);
  };
}
function useMedia(componentContext, debug) {
  const componentState = componentContext ? States.get(componentContext) : null, internalRef = (0, import_react.useRef)(null);
  internalRef.current || (internalRef.current = {
    keys: /* @__PURE__ */ new Set(),
    lastState: mediaState
  }), internalRef.current.pendingState && (internalRef.current.lastState = internalRef.current.pendingState, internalRef.current.pendingState = void 0);
  const { keys } = internalRef.current;
  keys.size && keys.clear();
  const state = (0, import_react.useSyncExternalStore)(
    subscribe,
    () => {
      const curKeys = componentState?.keys || keys, { lastState, pendingState } = internalRef.current;
      if (!curKeys.size)
        return lastState;
      for (const key of curKeys)
        if (mediaState[key] !== (pendingState || lastState)[key])
          return process.env.NODE_ENV === "development" && debug && console.warn("useMedia() \u270D\uFE0F", key, lastState[key], "=>", mediaState[key]), componentContext?.mediaEmit ? (componentContext.mediaEmit(mediaState), internalRef.current.pendingState = mediaState, lastState) : (internalRef.current.lastState = mediaState, mediaState);
      return lastState;
    },
    getServerSnapshot
  );
  return new Proxy(state, {
    get(_, key) {
      return !disableMediaTouch && typeof key == "string" && keys.add(key), Reflect.get(state, key);
    }
  });
}
const getServerSnapshot = () => initState;
let disableMediaTouch = !1;
function _disableMediaTouch(val) {
  disableMediaTouch = val;
}
function getMediaState(mediaGroups, layout) {
  disableMediaTouch = !0;
  let res;
  try {
    res = Object.fromEntries(
      [...mediaGroups].map((mediaKey) => [mediaKey, mediaKeyMatch(mediaKey, layout)])
    );
  } finally {
    disableMediaTouch = !1;
  }
  return res;
}
const getMediaImportanceIfMoreImportant = (mediaKey, key, styleState, isSizeMedia) => {
  const importance = isSizeMedia && !(0, import_config.getSetting)("mediaPropOrder") ? getMediaKeyImportance(mediaKey) : import_pseudoDescriptors.defaultMediaImportance, usedKeys = styleState.usedKeys;
  return !usedKeys[key] || importance > usedKeys[key] ? importance : null;
};
function camelToHyphen(str) {
  return str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`).toLowerCase();
}
const cache = /* @__PURE__ */ new WeakMap(), cachedMediaKeyToQuery = {};
function mediaObjectToString(query, key) {
  if (typeof query == "string")
    return query;
  if (cache.has(query))
    return cache.get(query);
  const res = Object.entries(query).map(([feature, value]) => (feature = camelToHyphen(feature), typeof value == "string" ? `(${feature}: ${value})` : (typeof value == "number" && /[height|width]$/.test(feature) && (value = `${value}px`), `(${feature}: ${value})`))).join(" and ");
  return key && (cachedMediaKeyToQuery[key] = res), cache.set(query, res), res;
}
function mediaKeyToQuery(key) {
  return cachedMediaKeyToQuery[key] || mediaObjectToString(mediaQueryConfig[key], key);
}
function mediaKeyMatch(key, dimensions) {
  const mediaQueries = mediaQueryConfig[key];
  return Object.keys(mediaQueries).every((query) => {
    const expectedVal = +mediaQueries[query], isMax = query.startsWith("max"), isWidth = query.endsWith("Width"), givenVal = dimensions[isWidth ? "width" : "height"];
    return isMax ? givenVal < expectedVal : givenVal > expectedVal;
  });
}
//# sourceMappingURL=useMedia.js.map
