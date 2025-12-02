"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Main = require("../Main");
var _utils = require("../utils");
var _reactNative = require("react-native");
const base64UrlRegex = /^data:image\/.*;(?:charset=.{3,5};)?base64,/;
const ImageCompressEventEmitter = new _reactNative.NativeEventEmitter(_Main.Compressor);
const NativeImage = _Main.Compressor;
const Image = {
  compress: async function (value) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!value) {
      throw new Error('Compression value is empty, please provide a value for compression.');
    }
    let subscription;
    try {
      if (options !== null && options !== void 0 && options.downloadProgress) {
        const uuid = (0, _utils.uuidv4)();
        //@ts-ignore
        options.uuid = uuid;
        subscription = ImageCompressEventEmitter.addListener('downloadProgress', event => {
          if (event.uuid === uuid) {
            options.downloadProgress && options.downloadProgress(event.data.progress);
          }
        });
      }
      const cleanData = value.replace(base64UrlRegex, '');
      return await NativeImage.image_compress(cleanData, options);
    } finally {
      // @ts-ignore
      if (subscription) {
        subscription.remove();
      }
    }
  }
};
var _default = Image;
exports.default = _default;
//# sourceMappingURL=index.js.map