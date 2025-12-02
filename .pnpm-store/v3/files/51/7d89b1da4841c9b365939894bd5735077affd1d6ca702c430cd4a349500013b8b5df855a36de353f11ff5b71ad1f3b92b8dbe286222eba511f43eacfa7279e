type qualityType = 'low' | 'medium' | 'high';
type audioCompresssionType = {
    quality?: qualityType;
    bitrate?: number;
    samplerate?: number;
    channels?: number;
};
export type defaultResultType = {
    isCorrect: boolean;
    message: string;
};
export declare const DEFAULT_COMPRESS_AUDIO_OPTIONS: audioCompresssionType;
export type AudioType = {
    compress(value: string, options?: audioCompresssionType): Promise<string>;
};
type createVideoThumbnailType = (fileUrl: string, options?: {
    headers?: {
        [key: string]: string;
    };
}) => Promise<{
    path: string;
    size: number;
    mime: string;
    width: number;
    height: number;
}>;
type clearCacheType = (cacheDir?: string) => Promise<string>;
type getImageMetaDataType = (filePath: string) => Promise<{
    ImageWidth: number;
    ImageHeight: number;
    Orientation: number;
    size: number;
    extension: string;
    exif: {
        [key: string]: string;
    };
}>;
type getVideoMetaDataType = (filePath: string) => Promise<{
    extension: string;
    size: number;
    duration: number;
    width: number;
    height: number;
}>;
type getRealPathType = (path: string, type: 'video' | 'image') => Promise<string>;
export declare const generateFilePath: any;
export declare const getRealPath: getRealPathType;
export declare const getVideoMetaData: getVideoMetaDataType;
export declare const getImageMetaData: getImageMetaDataType;
export declare const createVideoThumbnail: createVideoThumbnailType;
export declare const clearCache: clearCacheType;
export declare const getDetails: (mediaFullPath: string, extesnion?: 'mp3' | 'mp4') => Promise<any | null>;
export declare const getFileSize: (filePath: string) => Promise<string>;
export declare const uuidv4: () => string;
export * from './Downloader';
export * from './Uploader';
//# sourceMappingURL=index.d.ts.map