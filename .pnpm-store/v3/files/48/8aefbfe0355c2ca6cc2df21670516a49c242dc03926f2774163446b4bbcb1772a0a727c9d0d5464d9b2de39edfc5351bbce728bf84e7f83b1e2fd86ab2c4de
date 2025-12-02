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
var config_exports = {};
__export(config_exports, {
  configListeners: () => configListeners,
  devConfig: () => devConfig,
  getConfig: () => getConfig,
  getConfigMaybe: () => getConfigMaybe,
  getFont: () => getFont,
  getSetting: () => getSetting,
  getThemes: () => getThemes,
  getToken: () => getToken,
  getTokenObject: () => getTokenObject,
  getTokenValue: () => getTokenValue,
  getTokens: () => getTokens,
  onConfiguredOnce: () => onConfiguredOnce,
  setConfig: () => setConfig,
  setConfigFont: () => setConfigFont,
  setTokens: () => setTokens,
  setupDev: () => setupDev,
  updateConfig: () => updateConfig,
  useTokens: () => useTokens
});
module.exports = __toCommonJS(config_exports);
var import_constants = require("@tamagui/constants"), import_constants2 = require("./constants/constants"), import_loadDuplicatedConfig = require("./loadDuplicatedConfig");
let conf;
const haventCalledErrorMessage = process.env.NODE_ENV === "development" ? `
Haven't called createTamagui yet. ${import_constants2.MISSING_THEME_MESSAGE}
` : "\u274C Error 001", getSetting = (key) => {
  if (process.env.NODE_ENV === "development" && !conf)
    throw new Error(haventCalledErrorMessage);
  return conf.settings[key] ?? // @ts-expect-error
  conf[key];
}, setConfig = (next) => {
  conf = next;
}, setConfigFont = (name, font, fontParsed) => {
  if (process.env.NODE_ENV === "development" && !conf)
    throw new Error(haventCalledErrorMessage);
  conf.fonts[name] = font, conf.fontsParsed[`$${name}`] = fontParsed;
}, getConfig = () => {
  const dup = (0, import_loadDuplicatedConfig.loadDuplicatedConfig)();
  if (dup)
    return dup;
  if (!conf)
    throw new Error(
      process.env.NODE_ENV !== "production" ? "Missing tamagui config, you either have a duplicate config, or haven't set it up. Be sure createTamagui is called before rendering. Also, make sure all of your tamagui dependencies are on the same version (`tamagui`, `@tamagui/package-name`, etc.) not just in your package.json, but in your lockfile." : "Err0"
    );
  return conf;
}, getConfigMaybe = () => conf;
let tokensMerged;
function setTokens(_) {
  tokensMerged = _;
}
const getTokens = ({
  prefixed
} = {}) => {
  if (process.env.NODE_ENV === "development" && !conf)
    throw new Error(haventCalledErrorMessage);
  const { tokens, tokensParsed } = conf;
  return prefixed === !1 ? tokens : prefixed === !0 ? tokensParsed : tokensMerged;
}, getTokenObject = (value, group) => conf.specificTokens[value] ?? (group ? tokensMerged[group]?.[value] : tokensMerged[Object.keys(tokensMerged).find((cat) => tokensMerged[cat][value]) || ""]?.[value]), getToken = (value, group, useVariable = import_constants.isWeb) => {
  const token = getTokenObject(value, group);
  return useVariable ? token?.variable : token?.val;
}, getTokenValue = (value, group) => {
  if (!(value === "unset" || value === "auto"))
    return getToken(value, group, !1);
}, useTokens = getTokens, getThemes = () => conf.themes, configListeners = /* @__PURE__ */ new Set(), onConfiguredOnce = (cb) => {
  conf ? cb(conf) : configListeners.add(cb);
}, updateConfig = (key, value) => {
  Object.assign(conf[key], value);
}, getFont = (name) => {
  const conf2 = getConfig();
  return conf2.fontsParsed[name] ?? Object.entries(conf2.fontsParsed).find(
    ([k]) => conf2.fontsParsed[k]?.family?.val === name
  )?.[1];
};
let devConfig;
function setupDev(conf2) {
  process.env.NODE_ENV === "development" && (devConfig = conf2);
}
//# sourceMappingURL=config.js.map
