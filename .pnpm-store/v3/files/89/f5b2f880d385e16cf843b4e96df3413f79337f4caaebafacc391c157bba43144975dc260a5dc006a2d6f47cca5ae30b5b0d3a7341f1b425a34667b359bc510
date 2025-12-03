let hasLogged = !1;
function loadDuplicatedConfig() {
  return process.env.NODE_ENV !== "production" && globalThis.__tamaguiConfig ? (hasLogged = !0, hasLogged || console.warn(`Warning: You have duplicate Tamagui dependencies which can cause major, confusing issues.
    In dev/test, we're working around this by loading a previously loaded config.
    In production, this will error.`), globalThis.__tamaguiConfig) : null;
}
export { loadDuplicatedConfig };
//# sourceMappingURL=loadDuplicatedConfig.mjs.map
