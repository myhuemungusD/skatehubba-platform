import { __awaiter } from "tslib";
import { convertIntegrationFnToClass } from '@sentry/core';
import { NATIVE } from '../wrapper';
const INTEGRATION_NAME = 'Release';
/** Release integration responsible to load release from file. */
export const nativeReleaseIntegration = () => {
    return {
        name: INTEGRATION_NAME,
        setupOnce: () => {
            // noop
        },
        processEvent,
    };
};
/**
 * Release integration responsible to load release from file.
 *
 * @deprecated Use `nativeReleaseIntegration()` instead.
 */
// eslint-disable-next-line deprecation/deprecation
export const Release = convertIntegrationFnToClass(INTEGRATION_NAME, nativeReleaseIntegration);
function processEvent(event, _, client) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const options = client.getOptions();
        /*
          __sentry_release and __sentry_dist is set by the user with setRelease and setDist. If this is used then this is the strongest.
          Otherwise we check for the release and dist in the options passed on init, as this is stronger than the release/dist from the native build.
        */
        if (typeof ((_a = event.extra) === null || _a === void 0 ? void 0 : _a.__sentry_release) === 'string') {
            event.release = `${event.extra.__sentry_release}`;
        }
        else if (typeof (options === null || options === void 0 ? void 0 : options.release) === 'string') {
            event.release = options.release;
        }
        if (typeof ((_b = event.extra) === null || _b === void 0 ? void 0 : _b.__sentry_dist) === 'string') {
            event.dist = `${event.extra.__sentry_dist}`;
        }
        else if (typeof (options === null || options === void 0 ? void 0 : options.dist) === 'string') {
            event.dist = options.dist;
        }
        if (event.release && event.dist) {
            return event;
        }
        try {
            const nativeRelease = yield NATIVE.fetchNativeRelease();
            if (nativeRelease) {
                if (!event.release) {
                    event.release = `${nativeRelease.id}@${nativeRelease.version}+${nativeRelease.build}`;
                }
                if (!event.dist) {
                    event.dist = `${nativeRelease.build}`;
                }
            }
        }
        catch (_Oo) {
            // Something went wrong, we just continue
        }
        return event;
    });
}
//# sourceMappingURL=release.js.map