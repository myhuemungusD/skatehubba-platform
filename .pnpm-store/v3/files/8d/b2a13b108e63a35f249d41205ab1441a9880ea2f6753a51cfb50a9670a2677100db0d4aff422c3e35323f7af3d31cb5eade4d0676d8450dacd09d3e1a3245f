"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.download = void 0;
var _reactNative = require("react-native");
var _Main = require("../Main");
var _index = require("./index");
const CompressEventEmitter = new _reactNative.NativeEventEmitter(_Main.Compressor);
const download = async (fileUrl, downloadProgress, progressDivider) => {
  let subscription;
  try {
    const uuid = (0, _index.uuidv4)();
    if (downloadProgress) {
      subscription = CompressEventEmitter.addListener('downloadProgress', event => {
        if (event.uuid === uuid) {
          downloadProgress(event.data.progress);
        }
      });
    }
    if (_reactNative.Platform.OS === 'android' && fileUrl.includes('file://')) {
      fileUrl = fileUrl.replace('file://', '');
    }
    const result = await _Main.Compressor.download(fileUrl, {
      uuid,
      progressDivider
    });
    return result;
  } finally {
    // @ts-ignore
    if (subscription) {
      subscription.remove();
    }
  }
};
exports.download = download;
//# sourceMappingURL=Downloader.js.map