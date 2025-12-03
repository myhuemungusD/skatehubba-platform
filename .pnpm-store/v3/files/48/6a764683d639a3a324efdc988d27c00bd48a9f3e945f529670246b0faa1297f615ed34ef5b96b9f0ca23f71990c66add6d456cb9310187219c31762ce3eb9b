import { URLLike } from '@opentelemetry/sdk-trace-web';
/**
 * Helper function to determine payload content length for fetch requests
 *
 * The fetch API is kinda messy: there are a couple of ways the body can be passed in.
 *
 * In all cases, the body param can be some variation of ReadableStream,
 * and ReadableStreams can only be read once! We want to avoid consuming the body here,
 * because that would mean that the body never gets sent with the actual fetch request.
 *
 * Either the first arg is a Request object, which can be cloned
 *   so we can clone that object and read the body of the clone
 *   without disturbing the original argument
 *   However, reading the body here can only be done async; the body() method returns a promise
 *   this means this entire function has to return a promise
 *
 * OR the first arg is a url/string
 *   in which case the second arg has type RequestInit
 *   RequestInit is NOT cloneable, but RequestInit.body is writable
 *   so we can chain it into ReadableStream.pipeThrough()
 *
 *   ReadableStream.pipeThrough() lets us process a stream and returns a new stream
 *   So we can measure the body length as it passes through the pie, but need to attach
 *   the new stream to the original request
 *   so that the browser still has access to the body.
 *
 * @param body
 * @returns promise that resolves to the content length of the body
 */
export declare function getFetchBodyLength(...args: Parameters<typeof fetch>): Promise<void> | Promise<number | undefined>;
/**
 * Helper function to determine payload content length for XHR requests
 * @param body
 * @returns content length
 */
export declare function getXHRBodyLength(body: Document | XMLHttpRequestBodyInit): number | undefined;
/**
 * Normalize an HTTP request method string per `http.request.method` spec
 * https://github.com/open-telemetry/semantic-conventions/blob/main/docs/http/http-spans.md#http-client-span
 */
export declare function normalizeHttpRequestMethod(method: string): string;
export declare function serverPortFromUrl(url: URLLike): number | undefined;
//# sourceMappingURL=utils.d.ts.map