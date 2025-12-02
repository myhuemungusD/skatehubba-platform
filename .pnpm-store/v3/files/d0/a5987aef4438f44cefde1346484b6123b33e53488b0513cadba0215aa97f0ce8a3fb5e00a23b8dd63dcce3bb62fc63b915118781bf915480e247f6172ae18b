"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.cancelCompression = void 0;
var _reactNative = require("react-native");
var _Main = require("../Main");
var _utils = require("../utils");
const VideoCompressEventEmitter = new _reactNative.NativeEventEmitter(_Main.Compressor);
const NativeVideoCompressor = _Main.Compressor;
const cancelCompression = cancellationId => {
  return NativeVideoCompressor.cancelCompression(cancellationId);
};
exports.cancelCompression = cancelCompression;
const Video = {
  compress: async (fileUrl, options, onProgress) => {
    const uuid = (0, _utils.uuidv4)();
    let subscription;
    let subscription2;
    try {
      if (onProgress) {
        subscription = VideoCompressEventEmitter.addListener('videoCompressProgress', event => {
          if (event.uuid === uuid) {
            onProgress(event.data.progress);
          }
        });
      }
      if (options !== null && options !== void 0 && options.downloadProgress) {
        //@ts-ignore
        subscription2 = VideoCompressEventEmitter.addListener('downloadProgress', event => {
          if (event.uuid === uuid) {
            options.downloadProgress && options.downloadProgress(event.data.progress);
          }
        });
      }
      const modifiedOptions = {
        uuid
      };
      if (options !== null && options !== void 0 && options.progressDivider) modifiedOptions.progressDivider = options === null || options === void 0 ? void 0 : options.progressDivider;
      if (options !== null && options !== void 0 && options.bitrate) modifiedOptions.bitrate = options === null || options === void 0 ? void 0 : options.bitrate;
      if (options !== null && options !== void 0 && options.compressionMethod) {
        modifiedOptions.compressionMethod = options === null || options === void 0 ? void 0 : options.compressionMethod;
      } else {
        modifiedOptions.compressionMethod = 'auto';
      }
      if (options !== null && options !== void 0 && options.maxSize) {
        modifiedOptions.maxSize = options === null || options === void 0 ? void 0 : options.maxSize;
      } else {
        modifiedOptions.maxSize = 640;
      }
      if ((options === null || options === void 0 ? void 0 : options.minimumFileSizeForCompress) !== undefined) {
        modifiedOptions.minimumFileSizeForCompress = options === null || options === void 0 ? void 0 : options.minimumFileSizeForCompress;
      }
      if (options !== null && options !== void 0 && options.getCancellationId) {
        options === null || options === void 0 ? void 0 : options.getCancellationId(uuid);
      }
      const result = await NativeVideoCompressor.compress(fileUrl, modifiedOptions);
      return result;
    } finally {
      // @ts-ignore
      if (subscription) {
        subscription.remove();
      }
      //@ts-ignore
      if (subscription2) {
        subscription2.remove();
      }
    }
  },
  cancelCompression,
  activateBackgroundTask(onExpired) {
    if (onExpired) {
      const subscription = VideoCompressEventEmitter.addListener('backgroundTaskExpired', event => {
        onExpired(event);
        if (subscription) {
          subscription.remove();
        }
      });
    }
    return NativeVideoCompressor.activateBackgroundTask({});
  },
  deactivateBackgroundTask() {
    VideoCompressEventEmitter.removeAllListeners('backgroundTaskExpired');
    return NativeVideoCompressor.deactivateBackgroundTask({});
  }
};
var _default = Video;
exports.default = _default;
//# sourceMappingURL=index.js.map