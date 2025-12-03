"use strict";

import { NativeModules } from 'react-native';
const RNMBXModule = NativeModules.RNMBXModule;
if (NativeModules.RNMBXModule == null) {
  if (global.expo != null) {
    // global.expo.modules.ExponentConstants;
    throw new Error('@rnmapbox/maps native code not available. Make sure you have linked the library and rebuild your app. See https://rnmapbox.github.io/docs/install?rebuild=expo#rebuild');
  } else {
    throw new Error('@rnmapbox/maps native code not available. Make sure you have linked the library and rebuild your app. See https://rnmapbox.github.io/docs/install');
  }
}

/**
 * Add a custom header to HTTP requests.
 * @param headerName - The name of the header
 * @param headerValue - The value of the header
 * @param options - Optional configuration. If provided with urlRegexp, the header will only be added to URLs matching the regex
 */
function addCustomHeader(headerName, headerValue, options) {
  if (options) {
    RNMBXModule.addCustomHeaderWithOptions(headerName, headerValue, options);
  } else {
    RNMBXModule.addCustomHeader(headerName, headerValue);
  }
}
export const {
  StyleURL,
  OfflinePackDownloadState,
  LineJoin,
  StyleSource,
  TileServers,
  removeCustomHeader,
  setAccessToken,
  setWellKnownTileServer,
  clearData,
  getAccessToken,
  setTelemetryEnabled,
  setConnected
} = RNMBXModule;
export { addCustomHeader };
//# sourceMappingURL=RNMBXModule.js.map