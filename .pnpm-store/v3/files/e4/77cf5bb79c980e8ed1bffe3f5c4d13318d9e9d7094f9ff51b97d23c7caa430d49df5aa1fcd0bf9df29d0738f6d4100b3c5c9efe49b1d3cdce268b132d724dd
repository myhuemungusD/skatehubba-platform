"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Main = require("../Main");
var _utils = require("../utils");
const NativeAudio = _Main.Compressor;
const Audio = {
  compress: async function (url) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.DEFAULT_COMPRESS_AUDIO_OPTIONS;
    try {
      return NativeAudio.compress_audio(url, options);
    } catch (error) {
      throw error.message;
    }
  }
};
var _default = Audio;
exports.default = _default;
//# sourceMappingURL=index.js.map