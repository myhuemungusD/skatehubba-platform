"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Compressor = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-compressor' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const CompressorModule = isTurboModuleEnabled ? require('./Spec/NativeCompressor').default : _reactNative.NativeModules.Compressor;
const Compressor = CompressorModule ? CompressorModule : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
exports.Compressor = Compressor;
//# sourceMappingURL=Main.js.map