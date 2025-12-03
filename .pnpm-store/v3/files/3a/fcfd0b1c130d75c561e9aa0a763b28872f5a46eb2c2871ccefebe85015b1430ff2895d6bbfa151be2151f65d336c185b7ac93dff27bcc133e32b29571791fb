import { NativeEventEmitter, Platform } from 'react-native';
import { Compressor } from '../Main';
const CompressEventEmitter = new NativeEventEmitter(Compressor);
import { uuidv4 } from './index';
export const download = async (fileUrl, downloadProgress, progressDivider) => {
  let subscription;
  try {
    const uuid = uuidv4();
    if (downloadProgress) {
      subscription = CompressEventEmitter.addListener('downloadProgress', event => {
        if (event.uuid === uuid) {
          downloadProgress(event.data.progress);
        }
      });
    }
    if (Platform.OS === 'android' && fileUrl.includes('file://')) {
      fileUrl = fileUrl.replace('file://', '');
    }
    const result = await Compressor.download(fileUrl, {
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
//# sourceMappingURL=Downloader.js.map