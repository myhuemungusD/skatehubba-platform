import { Compressor } from '../Main';
import { DEFAULT_COMPRESS_AUDIO_OPTIONS } from '../utils';
const NativeAudio = Compressor;
const Audio = {
  compress: async function (url) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_COMPRESS_AUDIO_OPTIONS;
    try {
      return NativeAudio.compress_audio(url, options);
    } catch (error) {
      throw error.message;
    }
  }
};
export default Audio;
//# sourceMappingURL=index.js.map