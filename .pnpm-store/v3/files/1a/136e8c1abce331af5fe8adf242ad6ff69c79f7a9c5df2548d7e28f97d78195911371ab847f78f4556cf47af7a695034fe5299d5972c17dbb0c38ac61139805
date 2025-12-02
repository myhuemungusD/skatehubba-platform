import { __awaiter } from "tslib";
import { ReactNativeLibraries } from '../utils/rnlibraries';
import { createStealthXhr, XHR_READYSTATE_DONE } from '../utils/xhr';
/**
 * Get source context for segment
 */
export function fetchSourceContext(url, segments, start) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            const fullUrl = `${url}${segments.slice(start).join('/')}`;
            const xhr = createStealthXhr();
            if (!xhr) {
                resolve(null);
                return;
            }
            xhr.open('GET', fullUrl, true);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XHR_READYSTATE_DONE) {
                    if (xhr.status !== 200) {
                        resolve(null);
                    }
                    const response = xhr.responseText;
                    if (typeof response !== 'string' ||
                        // Expo Dev Server responses with status 200 and config JSON
                        // when web support not enabled and requested file not found
                        response.startsWith('{')) {
                        resolve(null);
                    }
                    resolve(response);
                }
            };
            xhr.onerror = () => {
                resolve(null);
            };
        });
    });
}
/**
 * Loads and calls RN Core Devtools parseErrorStack function.
 */
export function parseErrorStack(errorStack) {
    if (!ReactNativeLibraries.Devtools) {
        throw new Error('React Native Devtools not available.');
    }
    return ReactNativeLibraries.Devtools.parseErrorStack(errorStack);
}
/**
 * Loads and calls RN Core Devtools symbolicateStackTrace function.
 */
export function symbolicateStackTrace(stack, extraData) {
    if (!ReactNativeLibraries.Devtools) {
        throw new Error('React Native Devtools not available.');
    }
    return ReactNativeLibraries.Devtools.symbolicateStackTrace(stack, extraData);
}
/**
 * Loads and returns the RN DevServer URL.
 */
export function getDevServer() {
    var _a;
    try {
        return (_a = ReactNativeLibraries.Devtools) === null || _a === void 0 ? void 0 : _a.getDevServer();
    }
    catch (_oO) {
        // We can't load devserver URL
    }
    return undefined;
}
//# sourceMappingURL=debugsymbolicatorutils.js.map