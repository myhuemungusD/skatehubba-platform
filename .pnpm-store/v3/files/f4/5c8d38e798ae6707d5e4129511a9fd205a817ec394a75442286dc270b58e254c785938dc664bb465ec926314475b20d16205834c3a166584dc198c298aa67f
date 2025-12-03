export declare enum UploadType {
    BINARY_CONTENT = 0,
    MULTIPART = 1
}
export declare enum UploaderHttpMethod {
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH"
}
export declare type HTTPResponse = {
    status: number;
    headers: Record<string, string>;
    body: string;
};
export declare type HttpMethod = 'POST' | 'PUT' | 'PATCH';
export declare type UploaderOptions = ({
    uploadType?: UploadType.BINARY_CONTENT;
    mimeType?: string;
} | {
    uploadType: UploadType.MULTIPART;
    fieldName?: string;
    mimeType?: string;
    parameters?: Record<string, string>;
}) & {
    headers?: Record<string, string>;
    httpMethod?: UploaderHttpMethod | HttpMethod;
    getCancellationId?: (cancellationId: string) => void;
};
export declare const cancelUpload: (uuid?: string, shouldCancelAll?: boolean) => void;
export declare const backgroundUpload: (url: string, fileUrl: string, options: UploaderOptions, onProgress?: ((writtem: number, total: number) => void) | undefined, abortSignal?: AbortSignal) => Promise<any>;
//# sourceMappingURL=Uploader.d.ts.map