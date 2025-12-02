import { __awaiter } from "tslib";
import { convertIntegrationFnToClass } from '@sentry/core';
import { NATIVE } from '../wrapper';
const INTEGRATION_NAME = 'Screenshot';
/** Adds screenshots to error events */
export const screenshotIntegration = () => {
    return {
        name: INTEGRATION_NAME,
        setupOnce: () => {
            // noop
        },
        processEvent,
    };
};
/**
 * Adds screenshots to error events
 *
 * @deprecated Use `screenshotIntegration()` instead.
 */
// eslint-disable-next-line deprecation/deprecation
export const Screenshot = convertIntegrationFnToClass(INTEGRATION_NAME, screenshotIntegration);
function processEvent(event, hint, client) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const options = client.getOptions();
        const hasException = event.exception && event.exception.values && event.exception.values.length > 0;
        if (!hasException || ((_a = options === null || options === void 0 ? void 0 : options.beforeScreenshot) === null || _a === void 0 ? void 0 : _a.call(options, event, hint)) === false) {
            return event;
        }
        const screenshots = yield NATIVE.captureScreenshot();
        if (screenshots && screenshots.length > 0) {
            hint.attachments = [...screenshots, ...((hint === null || hint === void 0 ? void 0 : hint.attachments) || [])];
        }
        return event;
    });
}
//# sourceMappingURL=screenshot.js.map