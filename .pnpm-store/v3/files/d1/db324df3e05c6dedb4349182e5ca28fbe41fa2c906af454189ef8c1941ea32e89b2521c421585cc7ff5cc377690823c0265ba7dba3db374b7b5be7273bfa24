import type { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
    image_compress(imagePath: string, optionMap: Object): Promise<string>;
    getImageMetaData(filePath: string): Promise<string>;
    compress(fileUrl: string, optionMap: Object): Promise<string>;
    cancelCompression(uuid: string): void;
    getVideoMetaData(filePath: string): Promise<string>;
    activateBackgroundTask(options: Object): Promise<string>;
    deactivateBackgroundTask(options: Object): Promise<string>;
    compress_audio(fileUrl: string, optionMap: Object): Promise<string>;
    upload(fileUrl: string, options: Object): Promise<string>;
    cancelUpload(uuid: string, shouldCancelAll: boolean): void;
    download(fileUrl: string, options: Object): Promise<string>;
    generateFilePath(_extension: string): Promise<string>;
    getRealPath(path: string, type: string): Promise<string>;
    getFileSize(filePath: string): Promise<string>;
    addListener(eventName: string): void;
    removeListeners(count: number): void;
    createVideoThumbnail(fileUrl: string, options: Object): Promise<{
        path: string;
        size: number;
        mime: string;
        width: number;
        height: number;
    }>;
    clearCache(cacheDir: string | null): Promise<string>;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeCompressor.d.ts.map