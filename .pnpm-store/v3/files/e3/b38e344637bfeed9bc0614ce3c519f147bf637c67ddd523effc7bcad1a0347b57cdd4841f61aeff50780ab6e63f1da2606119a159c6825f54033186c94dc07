export type compressionMethod = 'auto' | 'manual';
type videoCompresssionType = {
    bitrate?: number;
    maxSize?: number;
    compressionMethod?: compressionMethod;
    minimumFileSizeForCompress?: number;
    getCancellationId?: (cancellationId: string) => void;
    downloadProgress?: (progress: number) => void;
    /***
     * Default:0, we uses it when we use downloadProgress/onProgress
     */
    progressDivider?: number;
};
export type VideoCompressorType = {
    compress(fileUrl: string, options?: videoCompresssionType, onProgress?: (progress: number) => void): Promise<string>;
    cancelCompression(cancellationId: string): void;
    activateBackgroundTask(onExpired?: (data: any) => void): Promise<any>;
    deactivateBackgroundTask(): Promise<any>;
};
export declare const cancelCompression: (cancellationId: string) => any;
declare const Video: VideoCompressorType;
export default Video;
//# sourceMappingURL=index.d.ts.map