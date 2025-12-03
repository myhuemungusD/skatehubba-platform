import { __awaiter } from "tslib";
import { captureException, convertIntegrationFnToClass, getClient, getCurrentScope } from '@sentry/core';
import { addExceptionMechanism, logger } from '@sentry/utils';
import { createSyntheticError, isErrorLike } from '../utils/error';
import { RN_GLOBAL_OBJ } from '../utils/worldwide';
import { checkPromiseAndWarn, polyfillPromise, requireRejectionTracking } from './reactnativeerrorhandlersutils';
const INTEGRATION_NAME = 'ReactNativeErrorHandlers';
/** ReactNativeErrorHandlers Integration */
export const reactNativeErrorHandlersIntegration = (options = {}) => {
    return {
        name: INTEGRATION_NAME,
        setupOnce: () => setup(Object.assign({ onerror: true, onunhandledrejection: true, patchGlobalPromise: true }, options)),
    };
};
/**
 * ReactNativeErrorHandlers Integration
 *
 * @deprecated Use `reactNativeErrorHandlersIntegration()` instead.
 */
// eslint-disable-next-line deprecation/deprecation
export const ReactNativeErrorHandlers = convertIntegrationFnToClass(INTEGRATION_NAME, reactNativeErrorHandlersIntegration);
function setup(options) {
    options.onunhandledrejection && setupUnhandledRejectionsTracking(options.patchGlobalPromise);
    options.onerror && setupErrorUtilsGlobalHandler();
}
/**
 * Setup unhandled promise rejection tracking
 */
function setupUnhandledRejectionsTracking(patchGlobalPromise) {
    if (patchGlobalPromise) {
        polyfillPromise();
    }
    attachUnhandledRejectionHandler();
    checkPromiseAndWarn();
}
function attachUnhandledRejectionHandler() {
    const tracking = requireRejectionTracking();
    const promiseRejectionTrackingOptions = {
        onUnhandled: (id, rejection = {}) => {
            // eslint-disable-next-line no-console
            console.warn(`Possible Unhandled Promise Rejection (id: ${id}):\n${rejection}`);
        },
        onHandled: id => {
            // eslint-disable-next-line no-console
            console.warn(`Promise Rejection Handled (id: ${id})\n` +
                'This means you can ignore any previous messages of the form ' +
                `"Possible Unhandled Promise Rejection (id: ${id}):"`);
        },
    };
    tracking.enable({
        allRejections: true,
        onUnhandled: (id, error) => {
            if (__DEV__) {
                promiseRejectionTrackingOptions.onUnhandled(id, error);
            }
            captureException(error, {
                data: { id },
                originalException: error,
                syntheticException: isErrorLike(error) ? undefined : createSyntheticError(),
            });
        },
        onHandled: (id) => {
            promiseRejectionTrackingOptions.onHandled(id);
        },
    });
}
function setupErrorUtilsGlobalHandler() {
    let handlingFatal = false;
    const errorUtils = RN_GLOBAL_OBJ.ErrorUtils;
    if (!errorUtils) {
        logger.warn('ErrorUtils not found. Can be caused by different environment for example react-native-web.');
        return;
    }
    const defaultHandler = errorUtils.getGlobalHandler && errorUtils.getGlobalHandler();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorUtils.setGlobalHandler((error, isFatal) => __awaiter(this, void 0, void 0, function* () {
        // We want to handle fatals, but only in production mode.
        const shouldHandleFatal = isFatal && !__DEV__;
        if (shouldHandleFatal) {
            if (handlingFatal) {
                logger.log('Encountered multiple fatals in a row. The latest:', error);
                return;
            }
            handlingFatal = true;
        }
        const client = getClient();
        if (!client) {
            logger.error('Sentry client is missing, the error event might be lost.', error);
            // If there is no client something is fishy, anyway we call the default handler
            defaultHandler(error, isFatal);
            return;
        }
        const hint = {
            originalException: error,
            attachments: getCurrentScope().getScopeData().attachments,
        };
        const event = yield client.eventFromException(error, hint);
        if (isFatal) {
            event.level = 'fatal';
            addExceptionMechanism(event, {
                handled: false,
                type: 'onerror',
            });
        }
        else {
            event.level = 'error';
            addExceptionMechanism(event, {
                handled: true,
                type: 'generic',
            });
        }
        client.captureEvent(event, hint);
        if (__DEV__) {
            // If in dev, we call the default handler anyway and hope the error will be sent
            // Just for a better dev experience
            defaultHandler(error, isFatal);
            return;
        }
        void client.flush(client.getOptions().shutdownTimeout || 2000).then(() => {
            defaultHandler(error, isFatal);
        }, (reason) => {
            logger.error('[ReactNativeErrorHandlers] Error while flushing the event cache after uncaught error.', reason);
        });
    }));
}
//# sourceMappingURL=reactnativeerrorhandlers.js.map