import { Compressor } from '../Main';
import { uuidv4 } from '../utils';
const base64UrlRegex = /^data:image\/.*;(?:charset=.{3,5};)?base64,/;
import { NativeEventEmitter } from 'react-native';
const ImageCompressEventEmitter = new NativeEventEmitter(Compressor);
const NativeImage = Compressor;
const Image = {
  compress: async function (value) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!value) {
      throw new Error('Compression value is empty, please provide a value for compression.');
    }
    let subscription;
    try {
      if (options !== null && options !== void 0 && options.downloadProgress) {
        const uuid = uuidv4();
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
export default Image;
//# sourceMappingURL=index.js.map