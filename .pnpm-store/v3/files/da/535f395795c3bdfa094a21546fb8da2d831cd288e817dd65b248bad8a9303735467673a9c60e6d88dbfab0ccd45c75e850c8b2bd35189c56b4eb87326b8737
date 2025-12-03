import { __awaiter } from "tslib";
import { convertIntegrationFnToClass } from '@sentry/core';
import { addContextToFrame, logger } from '@sentry/utils';
import { getFramesToPop, isErrorLike } from '../utils/error';
import { fetchSourceContext, getDevServer, parseErrorStack, symbolicateStackTrace } from './debugsymbolicatorutils';
const INTEGRATION_NAME = 'DebugSymbolicator';
// eslint-disable-next-line @sentry-internal/sdk/no-regexp-constructor
const INTERNAL_CALLSITES_REGEX = new RegExp(['ReactNativeRenderer-dev\\.js$', 'MessageQueue\\.js$'].join('|'));
/** Tries to symbolicate the JS stack trace on the device. */
export const debugSymbolicatorIntegration = () => {
    return {
        name: INTEGRATION_NAME,
        setupOnce: () => {
            /* noop */
        },
        processEvent,
    };
};
/**
 * Tries to symbolicate the JS stack trace on the device.
 *
 * @deprecated Use `debugSymbolicatorIntegration()` instead.
 */
// eslint-disable-next-line deprecation/deprecation
export const DebugSymbolicator = convertIntegrationFnToClass(INTEGRATION_NAME, debugSymbolicatorIntegration);
function processEvent(event, hint) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = event.exception) === null || _a === void 0 ? void 0 : _a.values) && isErrorLike(hint.originalException)) {
            // originalException is ErrorLike object
            const errorGroup = getExceptionGroup(hint.originalException);
            for (const [index, error] of errorGroup.entries()) {
                const symbolicatedFrames = yield symbolicate(error.stack, getFramesToPop(error));
                symbolicatedFrames && replaceExceptionFramesInException(event.exception.values[index], symbolicatedFrames);
            }
        }
        else if (hint.syntheticException && isErrorLike(hint.syntheticException)) {
            // syntheticException is Error object
            const symbolicatedFrames = yield symbolicate(hint.syntheticException.stack, getFramesToPop(hint.syntheticException));
            if (event.exception) {
                symbolicatedFrames &&
                    event.exception.values &&
                    replaceExceptionFramesInException(event.exception.values[0], symbolicatedFrames);
            }
            else if (event.threads) {
                // RN JS doesn't have threads
                symbolicatedFrames && replaceThreadFramesInEvent(event, symbolicatedFrames);
            }
        }
        return event;
    });
}
/**
 * Symbolicates the stack on the device talking to local dev server.
 * Mutates the passed event.
 */
function symbolicate(rawStack, skipFirstFrames = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedStack = parseErrorStack(rawStack);
            const prettyStack = yield symbolicateStackTrace(parsedStack);
            if (!prettyStack) {
                logger.error('React Native DevServer could not symbolicate the stack trace.');
                return null;
            }
            // This has been changed in an react-native version so stack is contained in here
            const newStack = prettyStack.stack || prettyStack;
            // https://github.com/getsentry/sentry-javascript/blob/739d904342aaf9327312f409952f14ceff4ae1ab/packages/utils/src/stacktrace.ts#L23
            // Match SentryParser which counts lines of stack (-1 for first line with the Error message)
            const skipFirstAdjustedToSentryStackParser = Math.max(skipFirstFrames - 1, 0);
            const stackWithoutPoppedFrames = skipFirstAdjustedToSentryStackParser
                ? newStack.slice(skipFirstAdjustedToSentryStackParser)
                : newStack;
            const stackWithoutInternalCallsites = stackWithoutPoppedFrames.filter((frame) => frame.file && frame.file.match(INTERNAL_CALLSITES_REGEX) === null);
            return yield convertReactNativeFramesToSentryFrames(stackWithoutInternalCallsites);
        }
        catch (error) {
            if (error instanceof Error) {
                logger.warn(`Unable to symbolicate stack trace: ${error.message}`);
            }
            return null;
        }
    });
}
/**
 * Converts ReactNativeFrames to frames in the Sentry format
 * @param frames ReactNativeFrame[]
 */
function convertReactNativeFramesToSentryFrames(frames) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all(frames.map((frame) => __awaiter(this, void 0, void 0, function* () {
            let inApp = !!frame.column && !!frame.lineNumber;
            inApp =
                inApp &&
                    frame.file !== undefined &&
                    !frame.file.includes('node_modules') &&
                    !frame.file.includes('native code');
            const newFrame = {
                lineno: frame.lineNumber,
                colno: frame.column,
                filename: frame.file,
                function: frame.methodName,
                in_app: inApp,
            };
            if (inApp) {
                yield addSourceContext(newFrame);
            }
            return newFrame;
        })));
    });
}
/**
 * Replaces the frames in the exception of a error.
 * @param event Event
 * @param frames StackFrame[]
 */
function replaceExceptionFramesInException(exception, frames) {
    if (exception === null || exception === void 0 ? void 0 : exception.stacktrace) {
        exception.stacktrace.frames = frames.reverse();
    }
}
/**
 * Replaces the frames in the thread of a message.
 * @param event Event
 * @param frames StackFrame[]
 */
function replaceThreadFramesInEvent(event, frames) {
    if (event.threads && event.threads.values && event.threads.values[0] && event.threads.values[0].stacktrace) {
        event.threads.values[0].stacktrace.frames = frames.reverse();
    }
}
/**
 * This tries to add source context for in_app Frames
 *
 * @param frame StackFrame
 * @param getDevServer function from RN to get DevServer URL
 */
function addSourceContext(frame) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let sourceContext = null;
        const segments = (_b = (_a = frame.filename) === null || _a === void 0 ? void 0 : _a.split('/')) !== null && _b !== void 0 ? _b : [];
        const serverUrl = (_c = getDevServer()) === null || _c === void 0 ? void 0 : _c.url;
        if (!serverUrl) {
            return;
        }
        for (const idx in segments) {
            if (!Object.prototype.hasOwnProperty.call(segments, idx)) {
                continue;
            }
            sourceContext = yield fetchSourceContext(serverUrl, segments, -idx);
            if (sourceContext) {
                break;
            }
        }
        if (!sourceContext) {
            return;
        }
        const lines = sourceContext.split('\n');
        addContextToFrame(lines, frame);
    });
}
/**
 * Return a list containing the original exception and also the cause if found.
 *
 * @param originalException The original exception.
 */
function getExceptionGroup(originalException) {
    const err = originalException;
    const errorGroup = [];
    for (let cause = err; isErrorLike(cause); cause = cause.cause) {
        errorGroup.push(cause);
    }
    return errorGroup;
}
//# sourceMappingURL=debugsymbolicator.js.map