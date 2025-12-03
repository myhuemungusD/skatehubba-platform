import { NativeEventEmitter, Platform } from 'react-native';
import { Compressor } from '../Main';
const CompressEventEmitter = new NativeEventEmitter(Compressor);
import { uuidv4 } from './index';
export let UploadType = /*#__PURE__*/function (UploadType) {
  UploadType[UploadType["BINARY_CONTENT"] = 0] = "BINARY_CONTENT";
  UploadType[UploadType["MULTIPART"] = 1] = "MULTIPART";
  return UploadType;
}({});
export let UploaderHttpMethod = /*#__PURE__*/function (UploaderHttpMethod) {
  UploaderHttpMethod["POST"] = "POST";
  UploaderHttpMethod["PUT"] = "PUT";
  UploaderHttpMethod["PATCH"] = "PATCH";
  return UploaderHttpMethod;
}({});
export const cancelUpload = function () {
  let uuid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let shouldCancelAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return Compressor.cancelUpload(uuid, shouldCancelAll);
};
export const backgroundUpload = async (url, fileUrl, options, onProgress, abortSignal) => {
  const uuid = uuidv4();
  let subscription;
  try {
    if (onProgress) {
      subscription = CompressEventEmitter.addListener('uploadProgress', event => {
        if (event.uuid === uuid) {
          onProgress(event.data.written, event.data.total);
        }
      });
    }
    if (Platform.OS === 'android' && fileUrl.includes('file://')) {
      fileUrl = fileUrl.replace('file://', '');
    }
    if (options !== null && options !== void 0 && options.getCancellationId) {
      options === null || options === void 0 ? void 0 : options.getCancellationId(uuid);
    }
    abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.addEventListener('abort', () => cancelUpload(uuid));
    const result = await Compressor.upload(fileUrl, {
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
//# sourceMappingURL=Uploader.js.map