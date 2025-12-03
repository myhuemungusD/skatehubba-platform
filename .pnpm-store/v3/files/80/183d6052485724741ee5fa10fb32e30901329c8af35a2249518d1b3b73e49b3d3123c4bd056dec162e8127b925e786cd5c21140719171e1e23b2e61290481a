import { __awaiter } from "tslib";
import { convertIntegrationFnToClass } from '@sentry/core';
import { logger } from '@sentry/utils';
import { isExpoGo, notWeb } from '../utils/environment';
import { SDK_NAME, SDK_PACKAGE_NAME, SDK_VERSION } from '../version';
import { NATIVE } from '../wrapper';
const INTEGRATION_NAME = 'SdkInfo';
export const defaultSdkInfo = {
    name: SDK_NAME,
    packages: [
        {
            name: SDK_PACKAGE_NAME,
            version: SDK_VERSION,
        },
    ],
    version: SDK_VERSION,
};
/** Default SdkInfo instrumentation */
export const sdkInfoIntegration = () => {
    const fetchNativeSdkInfo = createCachedFetchNativeSdkInfo();
    return {
        name: INTEGRATION_NAME,
        setupOnce: () => {
            // noop
        },
        processEvent: (event) => processEvent(event, fetchNativeSdkInfo),
    };
};
/**
 * Default SdkInfo instrumentation
 *
 * @deprecated Use `sdkInfoIntegration()` instead.
 */
// eslint-disable-next-line deprecation/deprecation
export const SdkInfo = convertIntegrationFnToClass(INTEGRATION_NAME, sdkInfoIntegration);
function processEvent(event, fetchNativeSdkInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const nativeSdkPackage = yield fetchNativeSdkInfo();
        event.platform = event.platform || 'javascript';
        event.sdk = event.sdk || {};
        event.sdk.name = event.sdk.name || defaultSdkInfo.name;
        event.sdk.version = event.sdk.version || defaultSdkInfo.version;
        event.sdk.packages = [
            // default packages are added by baseclient and should not be added here
            ...(event.sdk.packages || []),
            ...((nativeSdkPackage && [nativeSdkPackage]) || []),
        ];
        return event;
    });
}
function createCachedFetchNativeSdkInfo() {
    if (!notWeb() || isExpoGo()) {
        return () => {
            return Promise.resolve(null);
        };
    }
    let isCached = false;
    let nativeSdkPackageCache = null;
    return () => __awaiter(this, void 0, void 0, function* () {
        if (isCached) {
            return nativeSdkPackageCache;
        }
        try {
            nativeSdkPackageCache = yield NATIVE.fetchNativeSdkInfo();
            isCached = true;
        }
        catch (e) {
            logger.warn('Could not fetch native sdk info.', e);
        }
        return nativeSdkPackageCache;
    });
}
//# sourceMappingURL=sdkinfo.js.map