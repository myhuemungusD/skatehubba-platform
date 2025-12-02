import { isWeb } from "@tamagui/constants";
import { MISSING_THEME_MESSAGE } from "./constants/constants.native.js";
import { loadDuplicatedConfig } from "./loadDuplicatedConfig.native.js";
var conf,
  haventCalledErrorMessage = process.env.NODE_ENV === "development" ? `
Haven't called createTamagui yet. ${MISSING_THEME_MESSAGE}
` : "\u274C Error 001",
  getSetting = function (key) {
    if (process.env.NODE_ENV === "development" && !conf) throw new Error(haventCalledErrorMessage);
    var _conf_settings_key;
    return (_conf_settings_key = conf.settings[key]) !== null && _conf_settings_key !== void 0 ? _conf_settings_key :
    // @ts-expect-error
    conf[key];
  },
  setConfig = function (next) {
    conf = next;
  },
  setConfigFont = function (name, font, fontParsed) {
    if (process.env.NODE_ENV === "development" && !conf) throw new Error(haventCalledErrorMessage);
    conf.fonts[name] = font, conf.fontsParsed[`$${name}`] = fontParsed;
  },
  getConfig = function () {
    var dup = loadDuplicatedConfig();
    if (dup) return dup;
    if (!conf) throw new Error(process.env.NODE_ENV !== "production" ? "Missing tamagui config, you either have a duplicate config, or haven't set it up. Be sure createTamagui is called before rendering. Also, make sure all of your tamagui dependencies are on the same version (`tamagui`, `@tamagui/package-name`, etc.) not just in your package.json, but in your lockfile." : "Err0");
    return conf;
  },
  getConfigMaybe = function () {
    return conf;
  },
  tokensMerged;
function setTokens(_) {
  tokensMerged = _;
}
var getTokens = function () {
    var {
      prefixed
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : (
    /**
    * Force either with $ or without $ prefix
    */
    {});
    if (process.env.NODE_ENV === "development" && !conf) throw new Error(haventCalledErrorMessage);
    var {
      tokens,
      tokensParsed
    } = conf;
    return prefixed === !1 ? tokens : prefixed === !0 ? tokensParsed : tokensMerged;
  },
  getTokenObject = function (value, group) {
    var _tokensMerged_group, _tokensMerged_, _conf_specificTokens_value;
    return (_conf_specificTokens_value = conf.specificTokens[value]) !== null && _conf_specificTokens_value !== void 0 ? _conf_specificTokens_value : group ? (_tokensMerged_group = tokensMerged[group]) === null || _tokensMerged_group === void 0 ? void 0 : _tokensMerged_group[value] : (_tokensMerged_ = tokensMerged[Object.keys(tokensMerged).find(function (cat) {
      return tokensMerged[cat][value];
    }) || ""]) === null || _tokensMerged_ === void 0 ? void 0 : _tokensMerged_[value];
  },
  getToken = function (value, group) {
    var useVariable = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : isWeb,
      token = getTokenObject(value, group);
    return useVariable ? token?.variable : token?.val;
  },
  getTokenValue = function (value, group) {
    if (!(value === "unset" || value === "auto")) return getToken(value, group, !1);
  },
  useTokens = getTokens,
  getThemes = function () {
    return conf.themes;
  },
  configListeners = /* @__PURE__ */new Set(),
  onConfiguredOnce = function (cb) {
    conf ? cb(conf) : configListeners.add(cb);
  },
  updateConfig = function (key, value) {
    Object.assign(conf[key], value);
  },
  getFont = function (name) {
    var _Object_entries_find,
      conf2 = getConfig(),
      _conf_fontsParsed_name;
    return (_conf_fontsParsed_name = conf2.fontsParsed[name]) !== null && _conf_fontsParsed_name !== void 0 ? _conf_fontsParsed_name : (_Object_entries_find = Object.entries(conf2.fontsParsed).find(function (param) {
      var [k] = param,
        _conf_fontsParsed_k_family,
        _conf_fontsParsed_k;
      return ((_conf_fontsParsed_k = conf2.fontsParsed[k]) === null || _conf_fontsParsed_k === void 0 || (_conf_fontsParsed_k_family = _conf_fontsParsed_k.family) === null || _conf_fontsParsed_k_family === void 0 ? void 0 : _conf_fontsParsed_k_family.val) === name;
    })) === null || _Object_entries_find === void 0 ? void 0 : _Object_entries_find[1];
  },
  devConfig;
function setupDev(conf2) {
  process.env.NODE_ENV === "development" && (devConfig = conf2);
}
export { configListeners, devConfig, getConfig, getConfigMaybe, getFont, getSetting, getThemes, getToken, getTokenObject, getTokenValue, getTokens, onConfiguredOnce, setConfig, setConfigFont, setTokens, setupDev, updateConfig, useTokens };
//# sourceMappingURL=config.native.js.map
