/* eslint-disable no-bitwise */
import { Compressor } from '../Main';
import { Platform } from 'react-native';
const INCORRECT_INPUT_PATH = 'Incorrect input path. Please provide a valid one';
export const DEFAULT_COMPRESS_AUDIO_OPTIONS = {
  // bitrate: 96,
  quality: 'medium'
};
export const generateFilePath = extension => {
  return new Promise((resolve, reject) => {
    Compressor.generateFilePath(extension).then(result => resolve('file://' + result)).catch(error => reject(error));
  });
};
export const getRealPath = function (path) {
  let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'video';
  return Compressor.getRealPath(path, type);
};
export const getVideoMetaData = path => {
  return Compressor.getVideoMetaData(path);
};
const unifyMetaData = exifResult => {
  const output = {};
  const isIos = Platform.OS === 'ios';
  output.ImageWidth = isIos ? exifResult === null || exifResult === void 0 ? void 0 : exifResult.PixelWidth : parseInt(exifResult.ImageWidth);
  output.ImageHeight = isIos ? exifResult === null || exifResult === void 0 ? void 0 : exifResult.PixelHeight : parseInt(exifResult.ImageLength);
  output.Orientation = isIos ? exifResult.Orientation : parseInt(exifResult.Orientation);
  output.size = exifResult.size;
  output.extension = exifResult.extension;
  output.exif = exifResult;
  return output;
};
export const getImageMetaData = async path => {
  const result = await Compressor.getImageMetaData(path);
  return unifyMetaData(result);
};
export const createVideoThumbnail = function (fileUrl) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Compressor.createVideoThumbnail(fileUrl, options);
};
export const clearCache = cacheDir => {
  return Compressor.clearCache(cacheDir);
};
const isValidUrl = url => /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(url);
const getFullFilename = path => {
  if (typeof path === 'string') {
    let _path = path;

    // In case of remote media, check if the url would be valid one
    if (path.includes('http') && !isValidUrl(path)) {
      return INCORRECT_INPUT_PATH;
    }

    // In case of url, check if it ends with "/" and do not consider it furthermore
    if (_path[_path.length - 1] === '/') _path = _path.substring(0, path.length - 1);
    const array = _path.split('/');
    return array.length > 1 ? array[array.length - 1] : INCORRECT_INPUT_PATH;
  }
  return INCORRECT_INPUT_PATH;
};
const isFileNameError = filename => {
  return filename === INCORRECT_INPUT_PATH;
};
const getFilename = path => {
  const fullFilename = getFullFilename(path);
  if (fullFilename && !isFileNameError(fullFilename)) {
    const array = fullFilename.split('.');
    return array.length > 1 ? array.slice(0, -1).join('') : array.join('');
  }
  return fullFilename;
};
const isRemoteMedia = path => {
  var _path$split;
  return typeof path === 'string' ? path === null || path === void 0 || (_path$split = path.split(':/')) === null || _path$split === void 0 || (_path$split = _path$split[0]) === null || _path$split === void 0 ? void 0 : _path$split.includes('http') : null;
};
export const getDetails = function (mediaFullPath) {
  let extesnion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'mp3';
  return new Promise(async (resolve, reject) => {
    try {
      // Since we used "-v error", a work around is to call first this command before the following
      const result = {};
      if (result !== 0) {
        throw new Error('Failed to execute command');
      }

      // get the output result of the command
      // example of output {"programs": [], "streams": [{"width": 640,"height": 360}], "format": {"size": "15804433"}}
      let mediaInfo = await {};
      mediaInfo = JSON.parse(mediaInfo);

      // execute second command
      const mediaInformation = await {};

      // treat both results
      mediaInformation.filename = getFilename(mediaFullPath);
      mediaInformation.bitrate = mediaInformation.getMediaProperties().bit_rate;
      mediaInformation.extension = extesnion;
      mediaInformation.isRemoteMedia = isRemoteMedia(mediaFullPath);
      mediaInformation.size = Number(mediaInfo.format.size);
      resolve(mediaInformation);
    } catch (e) {
      reject(e);
    }
  });
};
export const getFileSize = async filePath => {
  return Compressor.getFileSize(filePath);
};
export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = parseFloat('0.' + Math.random().toString().replace('0.', '') + new Date().getTime()) * 16 | 0,
      // eslint-disable-next-line eqeqeq
      v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
export * from './Downloader';
export * from './Uploader';
//# sourceMappingURL=index.js.map