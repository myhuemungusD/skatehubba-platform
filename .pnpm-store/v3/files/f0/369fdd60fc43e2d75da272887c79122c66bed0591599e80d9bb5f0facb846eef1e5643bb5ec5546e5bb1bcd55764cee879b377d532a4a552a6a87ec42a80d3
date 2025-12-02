"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelUpload = exports.backgroundUpload = exports.UploaderHttpMethod = exports.UploadType = void 0;
var _reactNative = require("react-native");
var _Main = require("../Main");
var _index = require("./index");
const CompressEventEmitter = new _reactNative.NativeEventEmitter(_Main.Compressor);
let UploadType = /*#__PURE__*/function (UploadType) {
  UploadType[UploadType["BINARY_CONTENT"] = 0] = "BINARY_CONTENT";
  UploadType[UploadType["MULTIPART"] = 1] = "MULTIPART";
  return UploadType;
}({});
exports.UploadType = UploadType;
let UploaderHttpMethod = /*#__PURE__*/function (UploaderHttpMethod) {
  UploaderHttpMethod["POST"] = "POST";
  UploaderHttpMethod["PUT"] = "PUT";
  UploaderHttpMethod["PATCH"] = "PATCH";
  return UploaderHttpMethod;
}({});
exports.UploaderHttpMethod = UploaderHttpMethod;
const cancelUpload = function () {
  let uuid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let shouldCancelAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return _Main.Compressor.cancelUpload(uuid, shouldCancelAll);
};
exports.cancelUpload = cancelUpload;
const backgroundUpload = async (url, fileUrl, options, onProgress, abortSignal) => {
  const uuid = (0, _index.uuidv4)();
  let subscription;
  try {
    if (onProgress) {
      subscription = CompressEventEmitter.addListener('uploadProgress', event => {
        if (event.uuid === uuid) {
          onProgress(event.data.written, event.data.total);
        }
      });
    }
    if (_reactNative.Platform.OS === 'android' && fileUrl.includes('file://')) {
      fileUrl = fileUrl.replace('file://', '');
    }
    if (options !== null && options !== void 0 && options.getCancellationId) {
      options === null || options === void 0 ? void 0 : options.getCancellationId(uuid);
    }
    abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.addEventListener('abort', () => cancelUpload(uuid));
    const result = await _Main.Compressor.upload(fileUrl, {
      uuid,
      method: options.httpMethod,
      headers: options.headers,
      uploadType: options.uploadType,
      ...options,
      url
    });
    return result;
  } finally {
    // @ts-ignore
    if (subscription) {
      subscription.remove();
    }
    abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.removeEventListener('abort', () => cancelUpload(uuid));
  }
};
exports.backgroundUpload = backgroundUpload;
//# sourceMappingURL=Uploader.js.map